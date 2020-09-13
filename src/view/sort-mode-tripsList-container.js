import AbstractClass from "./abstract-class.js";

const getTripsContainerBlanckTemplate = () => {
  return (
    `<ul class="trip-events__list">
    </ul>`
  );
};

export default class SortModeTripsListContainer extends AbstractClass {
  constructor(trips) {
    super();
    this._trips = trips;
  }

  getTemplate() {
    return getTripsContainerBlanckTemplate(this._trips);
  }
}
