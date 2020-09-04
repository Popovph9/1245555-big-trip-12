import AbstractClass from "./abstract-class.js";

const getTripPlaceholderTemplate = () => {
  return (
    `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`
  );
};

export default class NoTripPlaceholder extends AbstractClass {
  getTemplate() {
    return getTripPlaceholderTemplate();
  }
}
