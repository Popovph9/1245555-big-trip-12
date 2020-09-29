import AbstractClass from "./abstract-class.js";

const getSortModeMainContainerTemplate = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};

export default class SortModeMainContainer extends AbstractClass {
  constructor(trips) {
    super();
    this._trips = trips;
  }

  getTemplate() {
    return getSortModeMainContainerTemplate(this._trips);
  }
}
