
import {generateTrip} from "./view/mocks.js";
import TripsModel from "./model/tripModel.js";
import FilterModel from "./model/filterModel.js";
import SiteMenuPresenter from "./presenter/siteMenuPresenter";
import TripsListPresenter from "./presenter/trips-list-presenter.js";


const TRIPS_COUNT = 5;

const trips = new Array(TRIPS_COUNT).fill().map(generateTrip);

const routeContainer = document.querySelector(`.trip-main`);
const tripsContainer = document.querySelector(`.trip-events`);
const tripsFiltersContainer = tripsContainer.querySelector(`h2`);
const addNewButton = document.querySelector(`.trip-main__event-add-btn`);

const tripsModel = new TripsModel();
tripsModel.setTrips(trips);

const filterModel = new FilterModel();

const tripsListPresenter = new TripsListPresenter(tripsContainer, tripsFiltersContainer, tripsModel, filterModel, addNewButton);
const siteMenuPresenter = new SiteMenuPresenter(routeContainer, tripsModel, filterModel, tripsListPresenter, tripsContainer, addNewButton);

siteMenuPresenter.init();
tripsListPresenter.init();


addNewButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripsListPresenter.createNewTrip();
});
