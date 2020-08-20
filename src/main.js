import {generateTrip} from "./view/mocks.js";
import {getCreateRouteTemplate} from "./view/route-template.js";
import {getCreateRouteMenuTemplate} from "./view/route-menu.js";
import {getCreateRouteFiltersTemplate} from "./view/route-filters.js";
import {getCreateTripsFiltersTemplate} from "./view/trips-filters.js";
import {getCreateOneDayTemplate} from "./view/one-day.js";
import {getCreateDateTemplate} from "./view/date.js";
import {addTripTemplate} from "./view/add-trip-form.js";
import {getCreateTripTemplate} from "./view/trip.js";

const TRIPS_COUNT = 20;

const trips = new Array(TRIPS_COUNT).fill().map(generateTrip);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const routeContainer = document.querySelector(`.trip-main`);
const routeFiltersContainer = routeContainer.querySelector(`.trip-main__trip-controls`);
const routeMenuContaier = routeFiltersContainer.querySelector(`h2`);
const tripsContainer = document.querySelector(`.trip-events`);
const tripsFiltersContainer = tripsContainer.querySelector(`h2`);

render(routeContainer, getCreateRouteTemplate(trips), `afterbegin`);
render(routeMenuContaier, getCreateRouteMenuTemplate(), `afterend`);
render(routeFiltersContainer, getCreateRouteFiltersTemplate(), `beforeend`);
render(tripsFiltersContainer, getCreateTripsFiltersTemplate(), `afterend`);

render(tripsContainer, addTripTemplate(trips[0]), `beforeend`);

render(tripsContainer, getCreateOneDayTemplate(), `beforeend`);
const mainContentContainer = document.querySelector(`.trip-days`);
const dateContainer = mainContentContainer.querySelector(`.day__info`);
const tripContainer = mainContentContainer.querySelector(`.trip-events__list`);

render(dateContainer, getCreateDateTemplate(trips), `beforeend`);

for (let i = 1; i < trips.length; i++) {
  render(tripContainer, getCreateTripTemplate(trips[i]), `beforeend`);
}
