import {createElement} from "../util.js";

const getTripPlaceholderTemplate = () => {
  return (
    `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`
  );
};

export default class NoTripPlaceholder {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getTripPlaceholderTemplate();
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
