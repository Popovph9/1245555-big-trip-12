import AbstractClass from "./abstract-class.js";

const getMainContainerTemplate = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};

export default class MainContainer extends AbstractClass {
  constructor(trips) {
    super();
    this._trips = trips;
  }

  getTemplate() {
    return getMainContainerTemplate(this._trips);
  }
}
