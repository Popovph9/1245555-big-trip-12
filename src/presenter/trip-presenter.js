import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {UpdateType, UserAction} from "../const.js";
import TripEditForm from "../view/add-trip-form.js";
import Trip from "../view/trip.js";

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`,
};

export default class TripPesenter {
  constructor(tripContainer, changeMode, changeData, destinationsModel) {
    this._tripContainer = tripContainer;
    this._changeMode = changeMode;
    this._changeData = changeData;
    this.destinationsModel = destinationsModel;

    this._tripComponent = null;
    this._tripEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._escKeydownHandler = this._escKeydownHandler.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleSulbmitClick = this._handleSulbmitClick.bind(this);
    this._handleResetClick = this._handleResetClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(trip) {
    this._trip = trip;

    const prevTripComponent = this._tripComponent;
    const prevTripEditComponent = this._tripEditComponent;

    this._tripComponent = new Trip(trip);

    const destinations = this.destinationsModel.getDestinations();
    const offers = this.destinationsModel.getOffers();
    this._tripEditComponent = new TripEditForm(offers, destinations, trip);

    this._tripComponent.setCustomClickHandler(this._handleEditClick);
    this._tripEditComponent.setCustomSaveButtonClickHandler(this._handleSulbmitClick);
    this._tripEditComponent.setCustomCloseButtonClickHandler(this._handleResetClick);
    this._tripEditComponent.setFavoriteButtonClickHandler(this._handleFavoriteClick);
    this._tripEditComponent.setFormDeleteClickHandler(this._handleDeleteClick);

    if (prevTripComponent === null || prevTripEditComponent === null) {
      render(this._tripContainer, this._tripComponent, RenderPosition.BEFOREEND);
      return;
    }
    if (this._mode === Mode.DEFAULT) {
      replace(this._tripComponent, prevTripComponent);
    }
    if (this._mode === Mode.EDITING) {
      replace(this._tripComponent, prevTripEditComponent);
      this._mode = Mode.DEFAULT;
    }

    remove(prevTripComponent);
    remove(prevTripEditComponent);
  }

  _replaceCardToForm() {
    replace(this._tripEditComponent, this._tripComponent);
    document.addEventListener(`keydown`, this._escKeydownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._tripComponent, this._tripEditComponent);
    document.removeEventListener(`keydown`, this._escKeydownHandler);
    this._mode = Mode.DEFAULT;
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleSulbmitClick(trip) {
    this._changeData(UserAction.UPDATE_TASK, UpdateType.MINOR, trip);
  }

  _handleResetClick() {
    this._tripEditComponent.reset(this._trip);
    this._replaceFormToCard();
  }

  _handleDeleteClick(trip) {
    this._changeData(UserAction.DELETE_TASK, UpdateType.MAJOR, trip);
  }

  _handleFavoriteClick() {
    this._changeData(UserAction.UPDATE_TASK, UpdateType.PATCH, Object.assign({}, this._trip, {isFavorite: !this._trip.isFavorite}));
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
    if (this._mode !== Mode.DEFAULT) {
      this._tripEditComponent.reset(this._trip);
      this._replaceFormToCard();
    }
  }

  setViewState(state) {
    const resetFormState = () => {
      this._tripEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    switch (state) {
      case State.SAVING:
        this._tripEditComponent.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.DELETING:
        this._tripEditComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        this._tripComponent.shake(resetFormState);
        this._tripEditComponent.shake(resetFormState);
        break;
    }
  }
}
