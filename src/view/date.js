import AbstractClass from "./abstract-class.js";
import {humanizeDate} from "../utils/common.js";
import {sortTripsByDate} from "../utils/filters.js";

const getPeriodTemplate = (arr) => {
  return `${arr.map((it) => `<li class="trip-days__item  day">
  <div class="day__info">
    <span class="day__counter">${arr.indexOf(it) + 1}</span>

    <time class="day__date" datetime="2019-03-18">${humanizeDate(it)}</time>
  </div>

  <ul class="trip-events__list"></ul>
</li>`).join(``)}`;
};

const getDateTemplate = (trips) => {
  const sortedTrips = trips.sort(sortTripsByDate);
  const getUniqueDates = Array.from(new Set(sortedTrips.map((it) => humanizeDate(it.date))));
  const periodTemplate = getPeriodTemplate(getUniqueDates);
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
