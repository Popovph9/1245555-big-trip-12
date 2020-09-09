import AbstractClass from "./abstract-class.js";
import {SORT_TYPES} from "../const.js";

let dayBlockHolder = `Day`;

const getTripsFiltersTemplate = () => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">

      <span class="trip-sort__item  trip-sort__item--day">${dayBlockHolder}</span>

      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" data-sort-type="${SORT_TYPES.event}" checked>

        <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" data-sort-type="${SORT_TYPES.time}" value="sort-time"}>

        <label class="trip-sort__btn" for="sort-time">
          Time
          <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" data-sort-type="${SORT_TYPES.price}">

        <label class="trip-sort__btn" for="sort-price">
          Price
          <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>

      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>

    </form>`
  );
};

export default class TripsFilters extends AbstractClass {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return getTripsFiltersTemplate();
  }

  _sortTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.sortTypeChangeHandler(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChangeHandler = callback;
    this.getElement().addEventListener(`change`, this._sortTypeChangeHandler);
  }
}
