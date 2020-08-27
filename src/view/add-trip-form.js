import {TRANSFER_TYPES} from "../const.js";
import {ACTIVITY_TYPES} from "../const.js";
import {PREPOSITION} from "../const.js";
import {ACTIVITY} from "../const.js";
import {createElement} from "../util.js";

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
  if (offer.name === OFFERS_NAME.addLuggage) {
    name = CLASS_NAME.luggage;
  } else if (offer.name === OFFERS_NAME.travelByTrain) {
    name = CLASS_NAME.train;
  } else if (offer.name === OFFERS_NAME.switchToComfort) {
    name = CLASS_NAME.comfort;
  } else if (offer.name === OFFERS_NAME.chooseSeats) {
    name = CLASS_NAME.seats;
  } else if (offer.name === OFFERS_NAME.addMeal) {
    name = CLASS_NAME.meal;
  }
  return name;
};


const getCreateChooseOffersTemplate = (arr) => {
  return arr.map((offer) => `
    <div class="event__offer-selector">

      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${getClassName(offer)}-1" type="checkbox" name="event-offer-${getClassName(offer)}">

      <label class="event__offer-label" for="event-offer-${getClassName(offer)}-1">
        <span class="event__offer-title">${offer.name}</span>&plus;&euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </label>

    </div>
  `).join(``);
};

const getCreatePhotoTemplate = (arr) => {
  return arr.photo.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join(``);
};

const getEditTripTemplate = (trips) => {

  const {type, destination, offers, info, timeIn, timeOut, price} = trips;

  const getSubb = () => {
    let subb = PREPOSITION.to;

    if (type === ACTIVITY.check || type === ACTIVITY.sight || type === ACTIVITY.rest) {
      subb = PREPOSITION.in;
    }

    return subb;
  };

  const transferTypeTemplate = getCreateChooseTransferTypeTemplate(type);
  const activityTypeTemplate = getCreateChooseActivityTypeTemplate(type);
  const destinationTemplate = getCreateChooseDestinationTemplate(destination);
  const offersTemplate = getCreateChooseOffersTemplate(offers);
  const photoTemplate = getCreatePhotoTemplate(info);


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
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinationTemplate}
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
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>

      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">

          ${offersTemplate}
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${info.description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${photoTemplate}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
};

export default class TripEditForm {
  constructor(trips = BLANC_TRIP) {
    this._trips = trips;
    this._element = null;
  }

  getTemplate() {
    return getEditTripTemplate(this._trips);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
