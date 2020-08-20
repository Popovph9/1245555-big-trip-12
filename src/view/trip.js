import {PREPOSITION} from "../const.js";
import {ACTIVITY} from "../const.js";

const MAX_RENDERED_OFFERS = 3;

const getgetCreateOfferItemTemplate = (offers) => {
  return `${offers.map((offer) => `<li class="event__offer">
  <span class="event__offer-title">${offer.name}</span>
  &plus;
  &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
</li>`).slice(0, MAX_RENDERED_OFFERS).join(``)}`;
};

export const getCreateTripTemplate = (trips) => {
  const {type, destination, timeIn, timeOut, price, offers} = trips;

  const offerItemTemplate = getgetCreateOfferItemTemplate(offers);

  const getSubb = () => {
    let subb = PREPOSITION.to;

    if (type === ACTIVITY.check || type === ACTIVITY.sight || type === ACTIVITY.rest) {
      subb = PREPOSITION.in;
    }

    return subb;
  };

  return (`<li class="trip-events__item">
  <div class="event">
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${getSubb()} ${destination}</h3>

    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">${timeIn}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">${timeOut}</time>
      </p>
      <p class="event__duration">30M</p>
    </div>

    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>

    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${offerItemTemplate}
    </ul>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`);
};
