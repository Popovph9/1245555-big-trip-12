import {createElement} from "../util.js";

const getDateTemplate = () => {
  return (
    `<div class="day__info">
      <span class="day__counter">1</span>

      <time class="day__date" datetime="2019-03-18">MAR 18</time>
    </div>`
  );
};

export default class Date {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getDateTemplate();
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
