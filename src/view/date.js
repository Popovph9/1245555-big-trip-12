import AbstractClass from "./abstract-class.js";
import {sortTripsByDate} from "../utils/sorting.js";
import {formatDateToHumanize} from "../utils/common.js";

const getPeriodTemplate = (arr) => {
  return `${arr.map((it) => `<li class="trip-days__item  day">
  <div class="day__info">
    <span class="day__counter">${arr.indexOf(it) + 1}</span>

    <time class="day__date" datetime="2019-03-18">${it}</time>
  </div>

  <ul class="trip-events__list"></ul>
</li>`).join(``)}`;
};

const getDateTemplate = (trips) => {
  trips.sort(sortTripsByDate);
  const formatedTrips = Array.from(new Set(trips.map((it) => formatDateToHumanize(it.dateFrom))));
  const periodTemplate = getPeriodTemplate(formatedTrips);

  return (
    `<ul class="trip-days">
      ${periodTemplate}
    </ul>`
  );
};

export default class Date extends AbstractClass {
  constructor(trips) {
    super();
    this._trips = trips;
  }

  getTemplate() {
    return getDateTemplate(this._trips);
  }
}
