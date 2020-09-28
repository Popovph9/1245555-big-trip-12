import {TRANSFER_TYPES, ACTIVITY_TYPES, Preposition, Activity, DESTINATIONS} from "../const.js";
import {getUpperLetter, flatten} from "../utils/common.js";
import {getTypes, getCurrentTypes, getElemntOfCurrentType, getElemntOfCurrentName} from "../utils/filter.js";
import SmartClass from "./smart-class.js";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";
import he from "he";

const CLASS_EXSEPTION = `class`;

const BlancDest = DESTINATIONS;

const ResetPlaceholder = {
  DELETE: `Delete`,
  DELETING: `Deleting…`,
  CANCEL: `Cancel`
};

const BlanckDestination = {
  description: ``,
  name: ``,
  pictures: [
    {
      src: ``,
      description: ``
    }
  ]
};

const BlanckOffer = {
  type: TRANSFER_TYPES[0].toLowerCase(),
  offers: []
};

const BlancTrip = {
  type: BlanckOffer.type,
  destination: BlanckDestination,
  dateFrom: ``,
  dateTo: ``,
  basePrice: ``,
  offers: BlanckOffer.offers,
  isFavorite: false,
  isDisabled: false,
  isSaving: false,
  isDeleting: false
};

const getResetButtonTemplate = (isNew, isDeleting, isDisabled) => {
  if (isNew) {
    return (`<button class="event__reset-btn" ${isDisabled ? `disabled` : ``} type="reset">${isDeleting ? ResetPlaceholder.DELETING : ResetPlaceholder.CANCEL}</button>`);
  }


  return (`<button class="event__reset-btn" ${isDisabled ? `disabled` : ``} type="reset">${isDeleting ? ResetPlaceholder.DELETING : ResetPlaceholder.DELETE}</button>`);
};

const getCreateChooseTransferTypeTemplate = (it, arr) => {
  return arr.map((type) => `
    <div class="event__type-item">

      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${it === type ? `checked` : ``}>

      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type}-1">${getUpperLetter(type)}</label>

    </div>
  `).join(``);
};

const getCreateChooseActivityTypeTemplate = (it, arr) => {
  return arr.map((type) => `
    <div class="event__type-item">

      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${it === type ? `checked` : ``}>

      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type}-1">${getUpperLetter(type)}</label>

    </div>
  `).join(``);
};

const getCreateChooseDestinationTemplate = (arr) => {
  return arr.map((it) => `<option value="${it.name}">${it.name}</option>`);
};

const getClassName = (offer) => {
  let title = offer.title.split(` `).pop();
  if (title === CLASS_EXSEPTION) {
    const newSplit = offer.title.split(` `);
    title = newSplit[newSplit.length - 2];
  }
  return title;
};

const getCreateChooseOffersTemplate = (arr, type, tripOffers, isEdit, isDisabled) => {
  if (isEdit) {
    const offersOfChoosenType = getElemntOfCurrentType(tripOffers, type);
    const currentOffers = offersOfChoosenType.map((offer) => offer.offers);
    const mergedOffers = flatten(currentOffers);
    return mergedOffers.map((offer) => `
    <div class="event__offer-selector">

      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${getClassName(offer)}-1" type="checkbox" ${isDisabled ? `disabled` : ``} name="event-offer-${getClassName(offer)}">

      <label class="event__offer-label" for="event-offer-${getClassName(offer)}-1">
        <span class="event__offer-title">${offer.title}</span>&plus;&euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </label>

    </div>
  `).join(``);
  }

  return arr.map((offer) => `
    <div class="event__offer-selector">

      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${getClassName(offer)}-1" type="checkbox" ${isDisabled ? `disabled` : ``}  name="event-offer-${getClassName(offer)}">

      <label class="event__offer-label" for="event-offer-${getClassName(offer)}-1">
        <span class="event__offer-title">${offer.title}</span>&plus;&euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </label>

    </div>
  `).join(``);
};

const getCreatePhotoTemplate = (arr, name, destinations, isEdit) => {
  if (isEdit) {
    const destinationOfCurrentName = getElemntOfCurrentName(destinations, name);
    const currentOffers = destinationOfCurrentName.map((it) => it.pictures);
    const mergedPhotos = flatten(currentOffers);

    return mergedPhotos.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join(``);
  }

  return arr.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join(``);
};

const getCreateDescriptionTemplate = (it, name, destinations, isEdit) => {
  if (isEdit) {
    const destinationOfCurrentName = getElemntOfCurrentName(destinations, name);
    const currentDescription = destinationOfCurrentName.map((point) => point.description);
    if (currentDescription) {
      return (`<p class="event__destination-description">${currentDescription}</p>`);
    }
  }

  return `<p class="event__destination-description">${it.description}</p>`;
};

const getEditTripTemplate = (tripOffers, destinations, trips) => {
  const {type, destination, offers, dateFrom, dateTo, basePrice, isFavorite, isPhoto, isNew, isEdit, isDisabled, isSaving, isDeleting} = trips;
  const getSubb = () => {
    let subb = Preposition.TO;

    if (type === Activity.CHECK || type === Activity.SIGHT || type === Activity.REST) {
      subb = Preposition.IN;
    }

    return subb;
  };

  const actualTypes = getTypes(tripOffers);
  const actualTransportTypes = getCurrentTypes(actualTypes, TRANSFER_TYPES);
  const actualActivityTypes = getCurrentTypes(actualTypes, ACTIVITY_TYPES);
  const transferTypeTemplate = getCreateChooseTransferTypeTemplate(type, actualTransportTypes);
  const activityTypeTemplate = getCreateChooseActivityTypeTemplate(type, actualActivityTypes);
  const destinationTemplate = getCreateChooseDestinationTemplate(destinations);
  const offersTemplate = getCreateChooseOffersTemplate(offers, type, tripOffers, isEdit, isDisabled);
  const photoTemplate = getCreatePhotoTemplate(destination.pictures, destination.name, destinations, isEdit);
  const descriptionTemplate = getCreateDescriptionTemplate(destination, destination.name, destinations, isEdit);
  const resetButtonTemplate = getResetButtonTemplate(isNew, isDeleting, isDisabled);

  let offersTemplateTriger = false;
  if (offersTemplate) {
    offersTemplateTriger = true;
  }

  let descriptionTemplateTriger = false;
  if (descriptionTemplate) {
    descriptionTemplateTriger = true;
  }

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle visually-hidden" ${isDisabled ? `disabled` : ``} id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              ${transferTypeTemplate}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              ${activityTypeTemplate}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${getUpperLetter(type)} ${getSubb()}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" autocomplete="off" value="${he.encode(destination.name)}" list="destination-list-1"  ${isDisabled ? `disabled` : ``} required>
            <datalist id="destination-list-1">
              ${destinationTemplate}
            </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}" ${isDisabled ? `disabled` : ``} required>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}" ${isDisabled ? `disabled` : ``} required>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" autocomplete=OFF onkeyup="this.value = !isNaN(parseInt(this.value)) ? parseInt(this.value) : ''" name="event-price" value="${basePrice}" ${isDisabled ? `disabled` : ``} required>
        </div>

        <button class="event__save-btn  btn  btn--blue" ${isDisabled ? `disabled` : ``}  type="submit">${isSaving ? `Saving...` : `Save`}</button>

        ${resetButtonTemplate}

        ${isNew ? `` : `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>`}
      </header>

      ${destination.name !== `` ? `
      <section class="event__details">
        ${offersTemplateTriger ? `
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">

          ${offersTemplate}
        </section>` : ``}

        ${descriptionTemplateTriger || isPhoto ? `
        <section class="event__section  event__section--destination">
          ${descriptionTemplateTriger ? `
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          ${descriptionTemplate}` : ``}

          ${isPhoto ? `
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${photoTemplate}
            </div>
          </div>` : ``}

        </section>` : ``}

      </section>` : ``}
    </form>`
  );
};

export default class TripEditForm extends SmartClass {
  constructor(tripOffers, destination, trips = BlancTrip) {
    super();
    this._trips = trips || BlancTrip;
    this._datepickerFrom = null;
    this._datepickerTo = null;

    this._tripOffers = tripOffers || BlanckOffer;
    this._destinations = destination || BlancDest;
    this._uniqTypes = null;

    this._data = TripEditForm.parseTripToData(trips);
    this._customSaveButtonClickHandler = this._customSaveButtonClickHandler.bind(this);
    this._customCloseButtonClickHandler = this._customCloseButtonClickHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._favoriteButtonClickHandler = this._favoriteButtonClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._costChangeHandler = this._costChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);
    this._offersHandler = this._offersHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepickerTo();
    this._setDatepickerFrom();
  }

  setDestinations(destinations) {
    this._destinations = destinations;
  }

  reset(trip) {
    this.updateData(TripEditForm.parseTripToData(trip));
    this.updateElement();
  }

  _dateFromChangeHandler([userDate]) {
    this.updateData({dateFrom: userDate});
    this.updateElement();
  }

  _dateToChangeHandler([userDate]) {
    this.updateData({dateTo: userDate});
    this.updateElement();
  }

  _customSaveButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.editSave(TripEditForm.parseDataToTrip(this._data));
  }

  _customCloseButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClose();
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(TripEditForm.parseDataToTrip(this._data));
  }

  _favoriteButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _costChangeHandler(evt) {
    this._costField.value = evt.target.value;
    this.updateData({basePrice: Number(this._costField.value)});
  }

  _offersHandler(evt) {
    evt.preventDefault();

    this._offersLabel = this.getElement().querySelector(`[for="${evt.target.id}"]`);
    this._priseField = this._offersLabel.querySelector(`.event__offer-price`);
    this._offerPrice = Number(this._priseField.textContent);
    this.updateData({offerPrice: this._offerPrice += this._data.offerPrice});

    if (evt.target.checked) {
      evt.target.setAttribute(`checked`, true);
    } else {
      evt.target.removeAttribute(`checked`);
      this.updateData({offerPrice: this._offerPrice -= this._offerPrice});
    }
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();

    const offersOfChoosenType = getElemntOfCurrentType(this._tripOffers, evt.currentTarget.value);
    const currentOffers = offersOfChoosenType.map((offer) => offer.offers);
    const mergedOffers = flatten(currentOffers);

    this.updateData({
      offers: mergedOffers,
      isEdit: true,
      type: evt.currentTarget.value,
    });
    this.updateElement();
  }

  _destinationChangeHandler(evt) {
    this._destinationField.value = evt.currentTarget.value;
    const corretionCheck = this._options.filter((option) => option.value === evt.currentTarget.value);

    const destinationOfCurrentName = getElemntOfCurrentName(this._destinations, this._destinationField.value);
    const currentOffers = destinationOfCurrentName.map((it) => it.pictures);
    const currentDescriptions = destinationOfCurrentName.map((it) => it.description);
    const currentDescription = currentDescriptions[0];
    const mergedPhotos = flatten(currentOffers);

    if (corretionCheck.length > 0) {
      this.updateData({
        isEdit: true,
        destination: Object.assign(
            {},
            this._data.destination,
            {name: this._destinationField.value,
              description: currentDescription,
              pictures: mergedPhotos,
            }
        )
      });
      this.updateElement();
    }
  }

  _setDatepickerFrom() {
    if (this._datepickerFrom) {
      this._datepickerFrom.destroy();
      this._datepickerFrom = null;
    }

    if (this.getElement().querySelector(`#event-start-time-1`)) {
      this._datepickerFrom = flatpickr(
          this.getElement().querySelector(`#event-start-time-1`),
          {
            dateFormat: `d/m/Y H:i`,
            enableTime: true,
            minuteIncrement: 1,
            defaultDate: this._data.dateFrom,
            onChange: this._dateFromChangeHandler
          }
      );
    }
  }

  _setDatepickerTo() {
    if (this._datepickerTo) {
      this._datepickerTo.destroy();
      this._datepickerTo = null;
    }

    if (this.getElement().querySelector(`#event-end-time-1`)) {
      this._datepickerTo = flatpickr(
          this.getElement().querySelector(`#event-end-time-1`),
          {
            dateFormat: `d/m/Y H:i`,
            enableTime: true,
            minuteIncrement: 1,
            defaultDate: this._data.dateTo,
            minDate: this._data.dateFrom,
            onChange: this._dateToChangeHandler
          }
      );
    }
  }

  removeElement() {
    super.removeElement();

    if (this._datepickerFrom) {
      this._datepickerFrom.destroy();
      this._datepickerFrom = null;
    }

    if (this._datepickerTo) {
      this._datepickerTo.destroy();
      this._datepickerTo = null;
    }
  }

  updateElement() {
    super.updateElement();
  }

  setCustomSaveButtonClickHandler(callback) {
    this._callback.editSave = callback;
    this.getElement().addEventListener(`submit`, this._customSaveButtonClickHandler);
  }

  setCustomCloseButtonClickHandler(callback) {
    if (this._data.isNew) {
      return;
    }

    this._callback.editClose = callback;

    const customCloseButton = this.getElement().querySelector(`.event__rollup-btn`);
    if (customCloseButton) {
      customCloseButton.addEventListener(`click`, this._customCloseButtonClickHandler);
    }
  }

  setFormDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;

    const formDeleteButton = this.getElement().querySelector(`.event__reset-btn`);
    if (formDeleteButton) {
      formDeleteButton.addEventListener(`click`, this._formDeleteClickHandler);
    }
  }

  setFavoriteButtonClickHandler(callback) {
    if (this._data.isNew) {
      return;
    }

    this._callback.favoriteClick = callback;

    const favoriteButton = this.getElement().querySelector(`.event__favorite-checkbox`);
    if (favoriteButton) {
      favoriteButton.addEventListener(`change`, this._favoriteButtonClickHandler);
    }
  }

  _setInnerHandlers() {
    this._typeFields = this.getElement().querySelectorAll(`.event__type-input`);
    if (this._typeFields) {
      this._typeFields.forEach((field) => field.addEventListener(`change`, this._typeChangeHandler));
    }

    this._destinationField = this.getElement().querySelector(`#event-destination-1`);
    if (this._destinationField) {
      this._destinationField.addEventListener(`input`, this._destinationChangeHandler);

      this._options = Array.from(this.getElement().querySelectorAll(`#destination-list-1 option`));
    }

    this._costField = this.getElement().querySelector(`#event-price-1`);
    if (this._costField) {
      this._costField.addEventListener(`change`, this._costChangeHandler);
    }

    this._offersCheckboxes = this.getElement().querySelectorAll(`.event__offer-checkbox`);
    if (this._offersCheckboxes) {
      this._offersCheckboxes.forEach((box) => box.addEventListener(`change`, this._offersHandler));
    }
  }

  getTemplate() {
    return getEditTripTemplate(this._tripOffers, this._destinations, this._data);
  }

  static parseTripToData(trip) {
    return Object.assign({}, trip,
        {
          offerPrice: 0,
          isEdit: false,
          isNew: !trip.id,
          isPhoto: trip.destination.pictures.length !== 0,
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        });
  }

  static parseDataToTrip(data) {
    data = Object.assign({}, data);

    if (data.offerPrice) {
      data.basePrice = data.basePrice += data.offerPrice;
      delete data.offerPrice;
    }

    delete data.isEdit;
    delete data.isNew;
    delete data.isOffers;
    delete data.isDescription;
    delete data.isPhoto;
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCustomCloseButtonClickHandler(this._callback.editClose);
    this.setCustomSaveButtonClickHandler(this._callback.editSave);
    this._setDatepickerFrom();
    this._setDatepickerTo();
    this.setFormDeleteClickHandler(this._callback.deleteClick);
  }
}
