import {createElement} from "../util.js";

const getOneDayContainerTemplate = () => {
  return (
    `<ul class="trip-days">
      <li class="trip-days__item  day">
        <div class="day__info">
        </div>

        <ul class="trip-events__list"></ul>
      </li>
    </ul>`
  );
};

export default class OneDayContainer {
  constructor(trips) {
    this._trips = trips;
    this._element = null;
  }

  getTemplate() {
    return getOneDayContainerTemplate(this._trips);
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
