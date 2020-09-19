import {Preposition} from "../const.js";
import {Activity} from "../const.js";
import AbstractClass from "./abstract-class.js";
import {formatDateToHours, formatDateToString, getDuration} from "../utils/common.js";

const MAX_RENDERED_OFFERS = 3;

const getDurationTemplate = (duration) => {
  let days = ``;
  let hours = ``;
  let minutes = ``;

  if (duration.get(`days`) !== 0) {
    days = `${duration.get(`days`)}D`;
  } else {
    days = ``;
  }

  if (duration.get(`hours`) !== 0) {
    hours = `${duration.get(`hours`)}H`;
  } else {
    hours = ``;
  }

  if (duration.get(`minutes`) !== 0) {
    minutes = `${duration.get(`minutes`)}M`;
  } else {
    minutes = ``;
  }

  return `${days} ${hours} ${minutes}`;
};

const getgetCreateOfferItemTemplate = (offers) => {
  return `
    ${offers.map((offer) => `
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
          &plus;
          &euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>
    `).slice(0, MAX_RENDERED_OFFERS).join(``)}
  `;
};

const getTripTemplate = ({type, destination, dateFrom, dateTo, basePrice, offers}) => {

  const offerItemTemplate = getgetCreateOfferItemTemplate(offers);
  const duration = getDuration(dateFrom, dateTo);
  const durationTemplate = getDurationTemplate(duration);

  const getSubb = () => {
    let subb = Preposition.TO;

    if (type === Activity.CHECK || type === Activity.SIGHT || type === Activity.REST) {
      subb = Preposition.IN;
    }

    return subb;
  };

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${getSubb()} ${destination.name}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${formatDateToString(dateFrom)}">${formatDateToHours(dateFrom)}</time>
            &mdash;
            <time class="event__end-time" datetime="${formatDateToString(dateTo)}">${formatDateToHours(dateTo)}</time>
          </p>
          <p class="event__duration">${durationTemplate}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offerItemTemplate}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Trip extends AbstractClass {
  constructor(trips) {
    super();

    this._trips = trips;
    this._customClickHandler = this._customClickHandler.bind(this);
  }

  _customClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setCustomClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._customClickHandler);
  }

  getTemplate() {
    return getTripTemplate(this._trips);
  }
}
