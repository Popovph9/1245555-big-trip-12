import {SORT_TYPES, USER_ACTION, UPDATE_TYPE, FILTER_TYPE} from "../const.js";
import {sortTripsByPrice, sortTripsByTime} from "../utils/sorting.js";
import {filter} from "../utils/filter.js";
import {formatDateToHumanize} from "../utils/common.js";

import TripsFilters from "../view/trips-filters.js";
import Date from "../view/date.js";
import TripPesenter from "./trip-presenter.js";
import AddNewTripPesenter from "../presenter/addNewTripPresenter.js";
import NoTripPlaceholder from "../view/no-trip-placeholder.js";
import {render, RENDER_POSITION} from "../utils/render.js";

import SortModeMainContainer from "../view/sort-mode-main-container.js";
import BlankListElement from "../view/blank-list.js";
import BlanckDateBlock from "../view/blanck-date.js";
import SortModeTripsListContainer from "../view/sort-mode-tripsList-container.js";

export default class TripsListPresenter {
  constructor(tripsContainer, tripsFiltersContainer, tripsModel, filterModel, addNewButton) {
    this._tripPesenter = {};
    this._tripsContainer = tripsContainer;
    this._tripsFiltersContainer = tripsFiltersContainer;
    this._addNewButton = addNewButton;
    this._tripsModel = tripsModel;
    this._filterModel = filterModel;

    this._currentSortType = SORT_TYPES.EVENT;

    this._filtersComponent = null;
    this._placeholderComponent = new NoTripPlaceholder();
    this._sortContainerComponent = new SortModeMainContainer();
    this._sortModeTripsContainer = new SortModeTripsListContainer();
    this._sortModeBlanckListComponent = new BlankListElement();
    this._blanckDateBlockConponent = new BlanckDateBlock();


    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._tripsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._addNewTaskPresenter = new AddNewTripPesenter(this._tripsContainer, this._handleViewAction, this._addNewButton);
  }

  init() {
    this._mainContentComponent = new Date(this._getTrips());

    if (this._tripsModel.getTrips().length === 0) {
      if (this._filtersComponent !== null) {
        this._filtersComponent.getElement().remove();
        this._filtersComponent.removeElement();
        this._filtersComponent = null;
      }

      this._renderPlaceholder();
      return;
    } else {
      this._renderFilters();
      this._renderTripsList();
    }
  }

  _getTrips() {
    const filterType = this._filterModel.getFilter();
    const trips = this._tripsModel.getTrips();
    const filtredTrips = filter[filterType](trips);

    switch (this._currentSortType) {
      case SORT_TYPES.EVENT:
        return filtredTrips;

      case SORT_TYPES.TIME:
        return filtredTrips.sort(sortTripsByTime);

      case SORT_TYPES.PRICE:
        return filtredTrips.sort(sortTripsByPrice);

    }
    return filtredTrips;
  }

  _handleSortTypeChange(sortType) {
    this._currentSortType = sortType;

    if (this._filtersComponent !== null) {
      this._filtersComponent.setSortType(this._currentSortType);
    }

    if (sortType === SORT_TYPES.EVENT) {
      this._currentSortType = sortType;
      this._clearTripsList();
      this._renderFilters();
      this._renderTripsList();
      return;
    }

    this._clearTripsList();
    this._renderFilters();

    this._renderSortContainerComponent();
    this._renderSortModeBlankList();
    this._renderBlanckDateComponent();
    this._renderSortModeTripsContainer();


    this._getTrips(this._currentSortType).forEach((trip) => {
      this._renderCard(this._sortModeTripsContainer, trip);
    });
  }

  _handleModeChange() {
    this._addNewTaskPresenter.destroy();
    Object.values(this._tripPesenter).forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case USER_ACTION.UPDATE_TASK:
        this._tripsModel.updateTrip(updateType, update);
        break;
      case USER_ACTION.ADD_TASK:
        this._tripsModel.addTrip(updateType, update);
        break;
      case USER_ACTION.DELETE_TASK:
        this._tripsModel.deleteTrip(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        this._tripPesenter[data.id].init(data);
        break;
      case UPDATE_TYPE.MINOR:
        this._tripPesenter[data.id].init(data);
        break;
      case UPDATE_TYPE.MAJOR:
        this._currentSortType = SORT_TYPES.EVENT;
        this._clearTripsList();
        this.init();
        break;
    }
  }

  _renderSortContainerComponent() {
    render(this._tripsContainer, this._sortContainerComponent, RENDER_POSITION.BEFOREEND);
  }

  _renderSortModeBlankList() {
    render(this._sortContainerComponent, this._sortModeBlanckListComponent, RENDER_POSITION.BEFOREEND);
  }

  _renderBlanckDateComponent() {
    render(this._sortModeBlanckListComponent, this._blanckDateBlockConponent, RENDER_POSITION.AFTERBEGIN);
  }

  _renderSortModeTripsContainer() {
    render(this._sortModeBlanckListComponent, this._sortModeTripsContainer, RENDER_POSITION.BEFOREEND);
  }

  _renderFilters() {
    if (this._filtersComponent !== null) {
      this._filtersComponent.getElement().remove();
      this._filtersComponent.removeElement();
      this._filtersComponent = null;
    }

    this._filtersComponent = new TripsFilters(this._currentSortType);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    render(this._tripsFiltersContainer, this._filtersComponent, RENDER_POSITION.AFTER);
    this._filtersComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _clearTripsList() {
    this._addNewTaskPresenter.destroy();
    this._mainContentComponent.getElement().innerHTML = ``;
    this._mainContentComponent.removeElement();

    Object.values(this._tripPesenter).forEach((presenter) => presenter.destroy());
    this._tripPesenter = {};
  }

  _renderMainContentComponent() {
    render(this._tripsContainer, this._mainContentComponent, RENDER_POSITION.BEFOREEND);
  }

  createNewTrip() {
    if (this._placeholderComponent !== null) {
      this._placeholderComponent.getElement().remove();
      this._placeholderComponent.removeElement();
      this._placeholderComponent = null;
    }

    this._handleSortTypeChange();
    this._filterModel.setFilter(UPDATE_TYPE.MAJOR, FILTER_TYPE.EVERYTHING);
    this._currentSortType = SORT_TYPES.EVENT;
    this._addNewTaskPresenter.init();
    Object.values(this._tripPesenter).forEach((presenter) => presenter.resetView());
  }

  _renderCard(tripListElement, trip) {
    const tripPesenter = new TripPesenter(tripListElement, this._handleModeChange, this._handleViewAction);
    tripPesenter.init(trip);
    this._tripPesenter[trip.id] = tripPesenter;
  }

  _renderCards() {
    const dateFields = this._mainContentComponent.getElement().querySelectorAll(`.day__date`);

    const tripsContainers = this._mainContentComponent.getElement().querySelectorAll(`.trip-events__list`);
    const containersArray = Array.from(tripsContainers);

    for (let i = 0; i < containersArray.length; i++) {
      const currentDateValue = dateFields[i].innerHTML;
      this._getTrips().filter((it) => formatDateToHumanize(it.dateFrom).includes(currentDateValue)).forEach((trip) => {
        this._renderCard(containersArray[i], trip);
      });
    }
  }

  _renderTripsList() {
    this._renderMainContentComponent();
    this._renderCards();
  }

  _renderPlaceholder() {
    render(this._tripsContainer, this._placeholderComponent, RENDER_POSITION.BEFOREEND);
  }
}
