import TripsFilters from "../view/trips-filters.js";
import Date from "../view/date.js";
import TripEditForm from "../view/add-trip-form.js";
import Trip from "../view/trip.js";
import NoTripPlaceholder from "../view/no-trip-placeholder.js";
import {render, renderPosition, replace} from "../utils/render.js";
import {humanizeDate} from "../utils/common.js";

export default class TripsListPresenter {
  constructor(tripsContainer, tripsFiltersContainer, trips) {
    this._trips = trips.slice();
    this._tripsContainer = tripsContainer;
    this._tripsFiltersContainer = tripsFiltersContainer;

    this._filtersComponent = new TripsFilters();
    this._mainContentComponent = new Date(this._trips);
    this._placeholderComponent = new NoTripPlaceholder();
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

  _renderFilters() {
    render(this._tripsFiltersContainer, this._filtersComponent, renderPosition.AFTER);
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

