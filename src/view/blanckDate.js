import AbstractClass from "./abstract-class.js";

const getBlanckDateBlockTemplate = () => {
  return (
    `<div class="day__info">
      <span class="day__counter"></span>
      <time class="day__date" datetime="2019-03-18"></time>
    </div>`
  );
};

export default class BlanckDateBlock extends AbstractClass {
  constructor(trips) {
    super();
    this._trips = trips;
  }

  getTemplate() {
    return getBlanckDateBlockTemplate(this._trips);
  }
}
