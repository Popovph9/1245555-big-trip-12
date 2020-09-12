import {render, renderPosition, replace, remove} from "../utils/render.js";
import TripEditForm from "../view/add-trip-form.js";
import Trip from "../view/trip.js";

const mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class TripPesenter {
  constructor(tripContainer, changeMode, changeData) {
    this._tripContainer = tripContainer;
    this._changeMode = changeMode;
    this._changeData = changeData;

    this._tripComponent = null;
    this._tripEditComponent = null;
    this._mode = mode.DEFAULT;

    this._escKeydownHandler = this._escKeydownHandler.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleSulbmitClick = this._handleSulbmitClick.bind(this);
    this._handleResetClick = this._handleResetClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(trip) {
    this._trip = trip;

    const prevTripComponent = this._tripComponent;
    const prevTripEditComponent = this._tripEditComponent;

    this._tripComponent = new Trip(trip);
    this._tripEditComponent = new TripEditForm(trip);

    this._tripComponent.setCustomClickHandler(this._handleEditClick);
    this._tripEditComponent.setCustomSaveButtonClickHandler(this._handleSulbmitClick);
    this._tripEditComponent.setCustomCloseButtonClickHandler(this._handleResetClick);
    this._tripEditComponent.setFavoriteButtonClickHandler(this._handleFavoriteClick);

    if (prevTripComponent === null || prevTripEditComponent === null) {
      render(this._tripContainer, this._tripComponent, renderPosition.BEFOREEND);
      return;
    }
    if (this._mode === mode.DEFAULT) {
      replace(this._tripComponent, prevTripComponent);
    }
    if (this._mode === mode.EDITING) {
      replace(this._tripEditComponent, prevTripEditComponent);
    }

    remove(prevTripComponent);
    remove(prevTripEditComponent);
  }

  _replaceCardToForm() {
    replace(this._tripEditComponent, this._tripComponent);
    document.addEventListener(`keydown`, this._escKeydownHandler);
    this._changeMode();
    this._mode = mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._tripComponent, this._tripEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = mode.DEFAULT;
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleSulbmitClick(trip) {
    this._changeData(trip);
    this._replaceFormToCard();
  }

  _handleResetClick() {
    this._tripEditComponent.reset(this._trip);
    this._replaceFormToCard();
  }

  _handleFavoriteClick() {
    this._changeData(Object.assign({}, this._trip, {isFavorite: !this._trip.isFavorite}));
  }

  _escKeydownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._tripEditComponent.reset(this._trip);
      this._replaceFormToCard();
    }
  }

  destroy() {
    remove(this._tripComponent);
    remove(this._tripEditComponent);
  }

  resetView() {
    if (this._mode !== mode.DEFAULT) {
      this._tripEditComponent.reset(this._trip);
      this._replaceFormToCard();
    }
  }
}
