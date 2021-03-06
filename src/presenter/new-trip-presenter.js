import {UpdateType, UserAction} from "../const.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import TripEditForm from "../view/trip-edit-form.js";

export default class AddNewTripPresenter {
  constructor(tripContainer, changeData, addNewButton, destinationsModel) {
    this.destinationsModel = destinationsModel;
    this._tripContainer = tripContainer;
    this._changeData = changeData;
    this._addNewButtonComponent = addNewButton;

    this._tripEditComponent = null;

    this._escKeydownHandler = this._escKeydownHandler.bind(this);
    this._handleSubmitClick = this._handleSubmitClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init() {
    if (this._tripEditComponent !== null) {
      this._tripEditComponent = null;
    }

    this._addNewButtonComponent.disabled = true;
    const offers = this.destinationsModel.getOffers();
    const destinations = this.destinationsModel.getDestinations();
    this._tripEditComponent = new TripEditForm(offers, destinations);

    this._tripEditComponent.setCustomSaveButtonClickHandler(this._handleSubmitClick);
    this._tripEditComponent.setFormDeleteClickHandler(this._handleDeleteClick);

    render(this._tripContainer, this._tripEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeydownHandler);
  }

  _handleSubmitClick(trip) {
    this._changeData(
        UserAction.ADD_TASK,
        UpdateType.MAJOR,
        trip
    );
  }

  setSaving() {
    this._tripEditComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._tripEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._taskEditComponent.shake(resetFormState);
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeydownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }

  destroy() {
    if (this._tripEditComponent === null) {
      return;
    }

    this._addNewButtonComponent.disabled = false;

    remove(this._tripEditComponent);

    this._tripEditComponent = null;
    document.removeEventListener(`keydown`, this._escKeydownHandler);
  }
}
