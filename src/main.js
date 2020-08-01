import {createRouteTemplate} from "./view/route-template.js";
import {createRouteMenuTemplate} from "./view/route-menu.js";
import {createRouteFiltersTemplate} from "./view/route-filters.js";
import {createTripsFiltersTemplate} from "./view/trips-filters.js";
import {createOneDayTemplate} from "./view/one-day.js";
import {createDateTemplate} from "./view/date.js";
import {addTripTemplate} from "./view/add-trip-form.js";
import {createTripTemplate} from "./view/trip.js";

const TRIPS_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const routeContainer = document.querySelector(`.trip-main`);
const routeFiltersContainer = routeContainer.querySelector(`.trip-main__trip-controls`);
const routeMenuContaier = routeFiltersContainer.querySelector(`h2`);
const tripsContainer = document.querySelector(`.trip-events`);
const tripsFiltersContainer = tripsContainer.querySelector(`h2`);

render(routeContainer, createRouteTemplate(), `afterbegin`);
render(routeMenuContaier, createRouteMenuTemplate(), `afterend`);
render(routeFiltersContainer, createRouteFiltersTemplate(), `beforeend`);
render(tripsFiltersContainer, createTripsFiltersTemplate(), `afterend`);

render(tripsContainer, addTripTemplate(), `beforeend`);

render(tripsContainer, createOneDayTemplate(), `beforeend`);
const mainContentContainer = document.querySelector(`.trip-days`);
const dateContainer = mainContentContainer.querySelector(`.day__info`);
const tripContainer = mainContentContainer.querySelector(`.trip-events__list`);

render(dateContainer, createDateTemplate(), `beforeend`);

for (let i = 0; i < TRIPS_COUNT; i++) {
  render(tripContainer, createTripTemplate(), `beforeend`);
}
