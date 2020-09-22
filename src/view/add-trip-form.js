import {TRANSFER_TYPES, ACTIVITY_TYPES, Preposition, Activity, DESTINATION} from "../const.js";
import SmartClass from "./smart-class.js";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";
import he from "he";

const BlancDest = DESTINATION;
const OffersName = {
  ADD_LUGGAGE: `Add luggage`,
  TRAVEL_BY_TRAIN: `Travel by train`,
  SWITCH_CLASS: `Switch to comfort class`,
  CHOOSE_SEATS: `Choose seats`,
  ADD_MEAL: `Add meal`
};
const ClassName = {
  LUGGAGE: `luggage`,
  TRAIN: `train`,
  COMFORT: `comfort`,
  SEATS: `seats`,
  MEAL: `meal`
};
const ResetPlaceholder = {
  DELETE: `Delete`,
  CANCEL: `Cancel`
};

const BlanckDestination = {
  description: ``,
  name: `Chamonix`,
  pictures: [
    {
      src: `http://picsum.photos/300/200?r=0.0762563005163317`,
      description: `Chamonix parliament building`
    }
  ]
};

const BlanckOffer = {
  type: [`taxi`],
  offers: [
    {
      title: `Upgrade to a business class`,
      price: 120
    }, {
      title: `Choose the radio station`,
      price: 60
    }
  ]
};

let BlancTrip = {
  type: BlanckOffer.type,
  destination: BlanckDestination,
  dateFrom: ``,
  dateTo: ``,
  basePrice: 0,
  offers: BlanckOffer.offers,
};

const getCreateChooseTransferTypeTemplate = (it) => {
  return TRANSFER_TYPES.map((type) => `
    <div class="event__type-item">

      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${it === type ? `checked` : ``}>

      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type}-1">${type}</label>

    </div>
  `).join(``);
};

const getCreateChooseActivityTypeTemplate = (it) => {
  return ACTIVITY_TYPES.map((type) => `
    <div class="event__type-item">

      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${it === type ? `checked` : ``}>

      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type}-1">${type}</label>

    </div>
  `).join(``);
};

const getCreateChooseDestinationTemplate = (arr) => {
  return arr.map((it) => `<option value="${it.name}">${it.name}</option>`);
};

const getClassName = (offer) => {
  let name = ClassName.LUGGAGE;
  if (offer.title === OffersName.ADD_LUGGAGE) {
    name = ClassName.LUGGAGE;
  } else if (offer.title === OffersName.TRAVEL_BY_TRAIN) {
    name = ClassName.TRAIN;
  } else if (offer.title === OffersName.SWITCH_CLASS) {
    name = ClassName.COMFORT;
  } else if (offer.title === OffersName.CHOOSE_SEATS) {
    name = ClassName.SEATS;
  } else if (offer.title === OffersName.ADD_MEAL) {
    name = ClassName.MEAL;
  }
  return name;
};


const getCreateChooseOffersTemplate = (arr) => {
  return arr.map((offer) => `
    <div class="event__offer-selector">

      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${getClassName(offer)}-1" type="checkbox" name="event-offer-${getClassName(offer)}">

      <label class="event__offer-label" for="event-offer-${getClassName(offer)}-1">
        <span class="event__offer-title">${offer.title}</span>&plus;&euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </label>

    </div>
  `).join(``);
};

const getCreatePhotoTemplate = (arr) => {
  return arr.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join(``);
};

const getEditTripTemplate = (trips, destinations) => {
  const {type, destination, offers, dateFrom, dateTo, basePrice, isFavorite, isOffers, isDescription, isPhoto, isNew} = trips;

  const getSubb = () => {
    let subb = Preposition.TO;

    if (type === Activity.CHECK || type === Activity.SIGHT || type === Activity.REST) {
      subb = Preposition.IN;
    }

    return subb;
  };

  const transferTypeTemplate = getCreateChooseTransferTypeTemplate(type);
  const activityTypeTemplate = getCreateChooseActivityTypeTemplate(type);
  const destinationTemplate = getCreateChooseDestinationTemplate(destinations);
  const offersTemplate = getCreateChooseOffersTemplate(offers);
  const photoTemplate = getCreatePhotoTemplate(destination.pictures);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

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
            ${type} ${getSubb()}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination"  value="${he.encode(destination.name)}" list="destination-list-1" required>
          <datalist id="destination-list-1">
            ${destinationTemplate}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}" required>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}" required>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>

        <button class="event__reset-btn" type="reset">${isNew ? ResetPlaceholder.CANCEL : ResetPlaceholder.DELETE}</button>

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
        ${isOffers || BlancTrip.offers.length > 0 ? `
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">

          ${offersTemplate}
        </section>` : ``}

        ${isDescription || isPhoto ? `
        <section class="event__section  event__section--destination">
          ${isDescription ? `
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>` : ``}

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
  constructor(trips = BlancTrip, destination = BlancDest) {
    super();

    this._datepickerFrom = null;
    this._datepickerTo = null;

    this._trips = trips;
    this._destinations = destination;
    this._uniqTypes = null;

    this._data = TripEditForm.parseTripToData(trips);
    this._customSaveButtonClickHandler = this._customSaveButtonClickHandler.bind(this);
    this._customCloseButtonClickHandler = this._customCloseButtonClickHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._favoriteButtonClickHandler = this._favoriteButtonClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);

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

  _typeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({type: evt.currentTarget.value});
    this.updateElement();
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({name: this._destinationField.value});
    TripEditForm.parseDataToTrip(this._data);
    this.updateElement();
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
      this._destinationField.addEventListener(`change`, this._destinationChangeHandler);
    }
  }

  getTemplate() {
    return getEditTripTemplate(this._data, this._destinations);
  }

  static parseTripToData(trip) {
    return Object.assign({}, trip,
        {
          isNew: !trip.id,
          isOffers: trip.offers.length !== 0,
          isDescription: trip.destination.description.length !== 0,
          isPhoto: trip.destination.pictures.length !== 0,
        });
  }

  static parseDataToTrip(data) {
    data = Object.assign({}, data);

    if (data.name) {
      data.destination.name = data.name;
      delete data.name;
    }
    delete data.isNew;
    delete data.isOffers;
    delete data.isDescription;
    delete data.isPhoto;

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
