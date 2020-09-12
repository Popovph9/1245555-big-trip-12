import AbstractClass from "./abstract-class.js";

const getBlankListTemplate = () => {
  return (
    `<li class="trip-days__item  day">
    </li>`
  );
};

export default class BlankListElement extends AbstractClass {
  constructor(trips) {
    super();
    this._trips = trips;
  }

  getTemplate() {
    return getBlankListTemplate(this._trips);
  }
}
