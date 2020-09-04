import AbstractClass from "./abstract-class.js";
import {humanizeDate} from "../utils/common.js";

const RENDERED_DESTINATIONS = 3;

const getCreateDestinationTempalte = (arr) => {
  if (arr.length <= RENDERED_DESTINATIONS) {
    return arr.map((it) => `${it.destination}`).join(` — `);
  } else {
    const shortArr = [];
    const first = arr[0];
    const last = arr[arr.length - 1];
    shortArr.push(first);
    shortArr.push(last);
    return shortArr.map((it) => `${it.destination}`).join(` —...— `);
  }
};

const getCreateTripDurationTemplate = (arr) => {
  const shortArr = [];
  const first = arr[0];
  const last = arr[arr.length - 1];
  shortArr.push(first);
  shortArr.push(last);
  return shortArr.map((it) => `${humanizeDate(it.date)}`).join(` — `);
};

const getPrice = (arr) => {
  return arr.reduce((acc, it) => acc + it.price, 0);
};

const getRouteTemplate = (trips) => {
  const destinationTempalte = getCreateDestinationTempalte(trips);
  const tripDurationTemplate = getCreateTripDurationTemplate(trips);
  const price = getPrice(trips);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${destinationTempalte}</h1>


        <p class="trip-info__dates">${tripDurationTemplate}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
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
