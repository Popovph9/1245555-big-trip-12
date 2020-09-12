import TripsFilters from "../view/trips-filters.js";
import Date from "../view/date.js";
import TripPesenter from "./trip-presenter.js";
import NoTripPlaceholder from "../view/no-trip-placeholder.js";
import {render, renderPosition} from "../utils/render.js";
import {humanizeDate, updateItem} from "../utils/common.js";

import SortModeMainContainer from "../view/sort-mode-main-container.js";
import BlankListElement from "../view/blank-list.js";
import BlanckDateBlock from "../view/blanck-date.js";
import SortModeTripsListContainer from "../view/sort-mode-tripsList-container.js";
import {SORT_TYPES} from "../const.js";
import {sortTripsByPrice, sortTripsByTime} from "../utils/filters.js";

export default class TripsListPresenter {
  constructor(tripsContainer, tripsFiltersContainer) {
    this._tripPesenter = {};
    this._tripsContainer = tripsContainer;
    this._tripsFiltersContainer = tripsFiltersContainer;
    this._filtersComponent = new TripsFilters();
    this._placeholderComponent = new NoTripPlaceholder();
    this._currentSortType = SORT_TYPES.event;
    this._sortContainerComponent = new SortModeMainContainer();
    this._sortModeTripsContainer = new SortModeTripsListContainer();
    this._sortModeBlanckListComponent = new BlankListElement();
    this._blanckDateBlockConponent = new BlanckDateBlock();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleTripChange = this._handleTripChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(trips) {
    this._trips = trips.slice();
    this._sourcedTrips = trips.slice();
    this._mainContentComponent = new Date(this._trips);

    if (this._trips.length === 0) {
      this._renderPlaceholder();
      return;
    } else {
      this._renderFilters();
      this._renderTripsList();
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      this._clearTripsList();
      this._renderTripsList();
      return;
    }

    this._sortTrips(sortType);
    this._clearTripsList();
    this._renderSortContainerComponent();
    this._renderSortModeBlankList();
    this._renderBlanckDateComponent();
    this._renderSortModeTripsContainer();

    this._trips.forEach((trip) => {
      this._renderCard(this._sortModeTripsContainer, trip);
    });
  }

  _handleModeChange() {
    Object.values(this._tripPesenter).forEach((presenter) => presenter.resetView());
  }

  _handleTripChange(updatedTrip) {
    this._trips = updateItem(this._trips, updatedTrip);
    this._sourcedTrip = updateItem(this._sourcedTrips, updatedTrip);
    this._tripPesenter[updatedTrip.id].init(updatedTrip);
  }

  _renderSortContainerComponent() {
    render(this._tripsContainer, this._sortContainerComponent, renderPosition.BEFOREEND);
  }

  _renderSortModeBlankList() {
    render(this._sortContainerComponent, this._sortModeBlanckListComponent, renderPosition.BEFOREEND);
  }

  _renderBlanckDateComponent() {
    render(this._sortModeBlanckListComponent, this._blanckDateBlockConponent, renderPosition.AFTERBEGIN);
  }

  _renderSortModeTripsContainer() {
    render(this._sortModeBlanckListComponent, this._sortModeTripsContainer, renderPosition.BEFOREEND);
  }

  _sortTrips(sortType) {
    switch (sortType) {
      case SORT_TYPES.price:
        this._trips.sort(sortTripsByPrice);
        break;
      case SORT_TYPES.time:
        this._trips.sort(sortTripsByTime);
        break;
      case SORT_TYPES.event:
        this._trips = this._sourcedTrips.slice();
        break;
    }
  }

  _renderFilters() {
    render(this._tripsFiltersContainer, this._filtersComponent, renderPosition.AFTER);
    this._filtersComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }
  // WIP
  _clearTripsList() {
    this._mainContentComponent.getElement().innerHTML = ``;
    this._mainContentComponent.removeElement();

    Object.values(this._tripPesenter).forEach((presenter) => presenter.destroy());
    this._tripPesenter = {};
  }

  _renderMainContentComponent() {
    render(this._tripsContainer, this._mainContentComponent, renderPosition.BEFOREEND);
  }

  _renderCard(tripListElement, trip) {
    const tripPesenter = new TripPesenter(tripListElement, this._handleModeChange, this._handleTripChange);
    tripPesenter.init(trip);
    this._tripPesenter[trip.id] = tripPesenter;
  }
  //
  _renderCards() {
    const dateFields = this._mainContentComponent.getElement().querySelectorAll(`.day__date`);

    const tripsContainers = this._mainContentComponent.getElement().querySelectorAll(`.trip-events__list`);
    const containersArray = Array.from(tripsContainers);

    for (let i = 0; i < containersArray.length; i++) {
      const currentDateValue = dateFields[i].innerHTML;
      this._trips.filter((it) => humanizeDate(it.date).includes(currentDateValue)).forEach((trip) => {
        this._renderCard(containersArray[i], trip);
      });
    }
  }

  _renderTripsList() {
    this._renderMainContentComponent();
    this._renderCards();
  }

  _renderPlaceholder() {
    render(this._tripsContainer, this._placeholderComponent, renderPosition.BEFOREEND);
  }
}
