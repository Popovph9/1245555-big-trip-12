import TripsFilters from "../view/trips-filters.js";
import Date from "../view/date.js";
import TripEditForm from "../view/add-trip-form.js";
import Trip from "../view/trip.js";
import NoTripPlaceholder from "../view/no-trip-placeholder.js";
import {render, renderPosition, replace} from "../utils/render.js";
import {humanizeDate} from "../utils/common.js";

import SortModeMainContainer from "../view/SortModeMainContainer.js";
import BlankListElement from "../view/blankList.js";
import BlanckDateBlock from "../view/blanckDate.js";
import SortModeTripsListContainer from "../view/sortModeTripsListContainer.js";
import {SORT_TYPES} from "../const.js";
import {sortTripsByPrice, sortTripsByTime} from "../utils/filters.js";

export default class TripsListPresenter {
  constructor(tripsContainer, tripsFiltersContainer, trips) {
    this._trips = trips.slice();
    this._sourcedTrips = trips.slice();

    this._tripsContainer = tripsContainer;
    this._tripsFiltersContainer = tripsFiltersContainer;
    this._filtersComponent = new TripsFilters();
    this._mainContentComponent = new Date(this._trips);
    this._placeholderComponent = new NoTripPlaceholder();
    this._currentSortType = SORT_TYPES.event;
    this._sortContainerComponent = new SortModeMainContainer();
    this._sortModeTripsContainer = new SortModeTripsListContainer();
    this._sortModeBlanckListComponent = new BlankListElement();
    this._blanckDateBlockConponent = new BlanckDateBlock();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
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
    // - Сортируем задачи
    this._sortTrips(sortType);
    // - Очищаем список
    this._clearTripsList();
    // - Рендерим список заново
    this._renderSortContainerComponent();
    this._renderSortModeBlankList();
    this._renderBlanckDateComponent();
    this._renderSortModeTripsContainer();

    this._trips.forEach((trip) => {
      this._renderCard(this._sortModeTripsContainer, trip);
    });
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

  _clearTripsList() {
    this._mainContentComponent.getElement().remove();
    this._mainContentComponent.getElement().innerHTML = ``;
    this._mainContentComponent.removeElement();

    this._sortModeTripsContainer.getElement().innerHTML = ``;
    this._sortContainerComponent.getElement().remove();
    this._sortContainerComponent.removeElement();
  }

  _renderMainContentComponent() {
    render(this._tripsContainer, this._mainContentComponent, renderPosition.BEFOREEND);
  }

  _renderCard(tripListElement, trips) {
    const tripComponent = new Trip(trips);
    const tripEditComponent = new TripEditForm(trips);

    const replaceTripToForm = () => {
      replace(tripEditComponent, tripComponent);
    };

    const replaceFormToCard = () => {
      replace(tripComponent, tripEditComponent);
    };

    tripComponent.setCustomClickHandler(() => {
      replaceTripToForm();
      document.addEventListener(`keydown`, escKeyDownHandler);
    });

    tripEditComponent.setCustomSaveButtonClickHandler(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, escKeyDownHandler);
    });

    tripEditComponent.setCustomCloseButtonClickHandler(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, escKeyDownHandler);
    });

    const escKeyDownHandler = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener(`keydown`, escKeyDownHandler);
      }
    };

    render(tripListElement, tripComponent, renderPosition.BEFOREEND);
  }

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
