import {TRANSFER_TYPES} from "../const.js";
import {ACTIVITY_TYPES} from "../const.js";
import {PREPOSITION} from "../const.js";
import {ACTIVITY} from "../const.js";
import SmartClass from "./smart-class.js";

const OFFERS_NAME = {
  addLuggage: `Add luggage`,
  travelByTrain: `Travel by train`,
  switchToComfort: `Switch to comfort class`,
  chooseSeats: `Choose seats`,
  addMeal: `Add meal`
};
const CLASS_NAME = {
  luggage: `luggage`,
  train: `train`,
  comfort: `comfort`,
  seats: `seats`,
  meal: `meal`
};

const BLANC_TRIP = {
  type: TRANSFER_TYPES[0],
  destination: [``],
  timeIn: ``,
  timeOut: ``,
  price: 0,
  offers: [{name: ``, price: 0}],
  info: {
    description: [``],
    photo: [``]
  }
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

const getCreateChooseDestinationTemplate = (destination) => {
  return `<option value="${destination}"></option>`;
};

const getClassName = (offer) => {
  let name = CLASS_NAME.luggage;
  if (offer.title === OFFERS_NAME.addLuggage) {
    name = CLASS_NAME.luggage;
  } else if (offer.title === OFFERS_NAME.travelByTrain) {
    name = CLASS_NAME.train;
  } else if (offer.title === OFFERS_NAME.switchToComfort) {
    name = CLASS_NAME.comfort;
  } else if (offer.title === OFFERS_NAME.chooseSeats) {
    name = CLASS_NAME.seats;
  } else if (offer.title === OFFERS_NAME.addMeal) {
    name = CLASS_NAME.meal;
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

const getEditTripTemplate = (trips) => {
  const {type, destination, offers, timeIn, timeOut, basePrice, isFavorite, isOffers, isDescription, isPhoto} = trips;

  const getSubb = () => {
    let subb = PREPOSITION.to;

    if (type === ACTIVITY.check || type === ACTIVITY.sight || type === ACTIVITY.rest) {
      subb = PREPOSITION.in;
    }

    return subb;
  };

  const transferTypeTemplate = getCreateChooseTransferTypeTemplate(type);
  const activityTypeTemplate = getCreateChooseActivityTypeTemplate(type);
  const destinationTemplate = getCreateChooseDestinationTemplate(destination.name);
  const offersTemplate = getCreateChooseOffersTemplate(offers);
  const photoTemplate = getCreatePhotoTemplate(destination.pictures);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
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
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name || ``}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinationTemplate || ``}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeIn}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeOut}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>

        <button class="event__reset-btn" type="reset">Cancel</button>

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      ${destination.name ? `
      <section class="event__details">
        ${isOffers ? `
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
  constructor(trips = BLANC_TRIP) {
    super();

    this._trips = trips;
    this._data = TripEditForm.parseTripToData(trips);
    this._customSaveButtonClickHandler = this._customSaveButtonClickHandler.bind(this);
    this._customCloseButtonClickHandler = this._customCloseButtonClickHandler.bind(this);
    this._favoriteButtonClickHandler = this._favoriteButtonClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  reset(trip) {
    this.updateData(TripEditForm.parseTripToData(trip));
  }

  _customSaveButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.editSave(TripEditForm.parseDataToTrip(this._data));
  }

  _customCloseButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClose();
  }

  _favoriteButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({type: evt.currentTarget.value});
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({name: this._destinationField.value}, true);
  }

  setCustomSaveButtonClickHandler(callback) {
    this._callback.editSave = callback;
    this.getElement().addEventListener(`submit`, this._customSaveButtonClickHandler);
  }

  setCustomCloseButtonClickHandler(callback) {
    this._callback.editClose = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._customCloseButtonClickHandler);
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._customCloseButtonClickHandler);
  }

  setFavoriteButtonClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`change`, this._favoriteButtonClickHandler);
  }

  _setInnerHandlers() {
    this._typeFields = this.getElement().querySelectorAll(`.event__type-input`);
    this._typeFields.forEach((field) => field.addEventListener(`change`, this._typeChangeHandler));

    this._destinationField = this.getElement().querySelector(`#event-destination-1`);
    this._destinationField.addEventListener(`change`, this._destinationChangeHandler);
  }

  getTemplate() {
    return getEditTripTemplate(this._data);
  }

  static parseTripToData(trip) {
    return Object.assign({}, trip,
        {
          isOffers: trip.offers.length !== 0,
          isDescription: trip.destination.description.length !== 0,
          isPhoto: trip.destination.pictures.length !== 0,
        });
  }

  static parseDataToTrip(data) {
    data = Object.assign({}, data);

    if (data.name) {
      data.description.name = data.name;
      delete data.name;
    }

    delete data.isOffers;
    delete data.isDescription;
    delete data.isPhoto;

    return data;
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCustomCloseButtonClickHandler(this._callback.editClose);
    this.setCustomSaveButtonClickHandler(this._callback.editSave);
  }
}
