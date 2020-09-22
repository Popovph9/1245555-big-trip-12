import {UpdateType, UserAction} from "../const.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {generateId} from "../utils/common.js";
import TripEditForm from "../view/add-trip-form.js";

export default class AddNewTripPesenter {
  constructor(tripContainer, changeData, addNewButton, destinationsModel) {
    this.destinationsModel = destinationsModel;
    this._tripContainer = tripContainer;
    this._changeData = changeData;
    this._addNewButtonComponent = addNewButton;

    this._tripEditComponent = null;

    this._escKeydownHandler = this._escKeydownHandler.bind(this);
    this._handleSulbmitClick = this._handleSulbmitClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init() {

    if (this._tripEditComponent !== null) {
      this._tripEditComponent = null;
    }

    this._addNewButtonComponent.disabled = true;

    this._tripEditComponent = new TripEditForm();

    this._tripEditComponent.setCustomSaveButtonClickHandler(this._handleSulbmitClick);
    this._tripEditComponent.setFormDeleteClickHandler(this._handleDeleteClick);

    render(this._tripContainer, this._tripEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeydownHandler);
  }

  _handleSulbmitClick(trip) {
    this._changeData(
        UserAction.ADD_TASK,
        UpdateType.MAJOR,
        Object.assign({id: generateId()}, trip)
    );
    this.destroy();
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
