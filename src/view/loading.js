import AbstractClass from "./abstract-class.js";

const createLoading = () => {
  return `<p class="trip-events__msg">Loading...</p>`;
};

export default class Loading extends AbstractClass {
  getTemplate() {
    return createLoading();
  }
}
