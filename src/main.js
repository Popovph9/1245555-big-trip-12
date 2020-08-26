import {render, renderPosition} from "./util.js";
import {generateTrip} from "./view/mocks.js";
import Route from "./view/route-template.js";
import RouteMenu from "./view/route-menu.js";
import RouteFilters from "./view/route-filters.js";
import TripsFilters from "./view/trips-filters.js";
import OneDayContainer from "./view/one-day.js";
import Date from "./view/date.js";
import TripEditForm from "./view/add-trip-form.js";
import Trip from "./view/trip.js";

const TRIPS_COUNT = 20;

const trips = new Array(TRIPS_COUNT).fill().map(generateTrip);

const routeContainer = document.querySelector(`.trip-main`);
const routeFiltersContainer = routeContainer.querySelector(`.trip-main__trip-controls`);
const routeMenuContaier = routeFiltersContainer.querySelector(`h2`);
const tripsContainer = document.querySelector(`.trip-events`);
const tripsFiltersContainer = tripsContainer.querySelector(`h2`);

render(routeContainer, new Route(trips).getElement(), renderPosition.AFTERBEGIN);
render(routeMenuContaier, new RouteMenu().getElement(), renderPosition.AFTER);
render(routeFiltersContainer, new RouteFilters().getElement(), renderPosition.BEFOREEND);
render(tripsFiltersContainer, new TripsFilters().getElement(), renderPosition.AFTER);

const renderTrip = (tripListElement, trip) => {
  const tripComponent = new Trip(trip);
  const tripEditComponent = new TripEditForm(trip);
  const editButton = tripComponent.getElement().querySelector(`.event__rollup-btn`);
  const saveButton = tripEditComponent.getElement().querySelector(`.event__save-btn`);

  const replaceTripToForm = () => {
    tripListElement.replaceChild(tripEditComponent.getElement(), tripComponent.getElement());
  };

  const replaceFormToCard = () => {
    tripListElement.replaceChild(tripComponent.getElement(), tripEditComponent.getElement());
  };

  const editButtonClickHandler = () => {
    replaceTripToForm();
    editButton.removeEventListener(`click`, editButtonClickHandler);
    saveButton.addEventListener(`click`, saveButtonClickHandler);
  };


  const saveButtonClickHandler = (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    editButton.addEventListener(`click`, editButtonClickHandler);
    saveButton.removeEventListener(`click`, editButtonClickHandler);
  };

  editButton.addEventListener(`click`, editButtonClickHandler);


  render(tripListElement, tripComponent.getElement(), renderPosition.BEFOREEND);
};

const mainContentContainer = new OneDayContainer();

render(tripsContainer, mainContentContainer.getElement(), renderPosition.BEFOREEND);

const dateContainer = mainContentContainer.getElement().querySelector(`.trip-days__item`);
const tripContainer = mainContentContainer.getElement().querySelector(`.trip-events__list`);

render(dateContainer, new Date().getElement(), renderPosition.AFTERBEGIN);

for (let i = 1; i < trips.length; i++) {
  renderTrip(tripContainer, trips[i]);
}
