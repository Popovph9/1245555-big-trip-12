import {render, renderPosition} from "./utils/render";
import {generateTrip} from "./view/mocks.js";
import Route from "./view/route-template.js";
import RouteMenu from "./view/route-menu.js";
import RouteFilters from "./view/route-filters.js";
import TripsListPresenter from "./presenter/trips-list-presenter.js";

const TRIPS_COUNT = 5;

const trips = new Array(TRIPS_COUNT).fill().map(generateTrip);

const routeContainer = document.querySelector(`.trip-main`);
const routeFiltersContainer = routeContainer.querySelector(`.trip-main__trip-controls`);
const routeMenuContaier = routeFiltersContainer.querySelector(`h2`);
const tripsContainer = document.querySelector(`.trip-events`);
const tripsFiltersContainer = tripsContainer.querySelector(`h2`);

render(routeMenuContaier, new RouteMenu(), renderPosition.AFTER);
render(routeContainer, new Route(trips), renderPosition.AFTERBEGIN);
render(routeFiltersContainer, new RouteFilters(), renderPosition.BEFOREEND);

const tripsPresenter = new TripsListPresenter(tripsContainer, tripsFiltersContainer);
tripsPresenter.init(trips);
