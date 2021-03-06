import AbstractClass from "./abstract-class.js";
import {formatDateToHumanize} from "../utils/common.js";
import {sortTripsByDate} from "../utils/sorting.js";

const RENDERED_DESTINATIONS = 3;

const getCreateDestinationTemplate = (arr) => {
  arr.sort(sortTripsByDate);
  if (arr.length <= RENDERED_DESTINATIONS) {
    return arr.map((it) => `${it.destination.name}`).join(` — `);
  } else {
    const shortList = [];
    const first = arr[0];
    const last = arr[arr.length - 1];
    shortList.push(first);
    shortList.push(last);
    return shortList.map((it) => `${it.destination.name}`).join(` —...— `);
  }
};

const getCreateTripDurationTemplate = (arr) => {
  const shortList = [];
  const first = arr[0];
  const last = arr[arr.length - 1];
  shortList.push(first);
  shortList.push(last);
  return shortList.map((it) => `${formatDateToHumanize(it.dateFrom)}`).join(` — `);
};

const getPrice = (arr) => {
  return arr.reduce((acc, it) => acc + it.basePrice, 0);
};

const getRouteTemplate = (trips) => {
  if (trips.length > 0) {
    const destinationTemplate = getCreateDestinationTemplate(trips);
    const tripDurationTemplate = getCreateTripDurationTemplate(trips);
    const price = getPrice(trips);

    return (
      `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${destinationTemplate}</h1>


          <p class="trip-info__dates">${tripDurationTemplate}</p>
        </div>

        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${Math.ceil(price)}</span>
        </p>
      </section>`
    );
  }
  return (
    `<section class="trip-main__trip-info  trip-info">
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
      </p>
    </section>`
  );
};

export default class Route extends AbstractClass {
  constructor(trips) {
    super();

    this._trips = trips;
  }

  getTemplate() {
    return getRouteTemplate(this._trips);
  }
}
