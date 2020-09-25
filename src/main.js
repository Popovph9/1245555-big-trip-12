
import {passGen} from "./utils/common.js";
import {PASS_LENGTH, END_POINT, UpdateType} from "./const.js";
import TripsModel from "./model/tripModel.js";
import FilterModel from "./model/filterModel.js";
import DestinationsModel from "./model/destnationsModel.js";
import SiteMenuPresenter from "./presenter/siteMenuPresenter";
import TripsListPresenter from "./presenter/trips-list-presenter.js";
import Api from "./api.js";

const authorization = `Basic ${passGen(PASS_LENGTH)}`;

const api = new Api(END_POINT, authorization);

const routeContainer = document.querySelector(`.trip-main`);
const tripsContainer = document.querySelector(`.trip-events`);
const tripsFiltersContainer = tripsContainer.querySelector(`h2`);
const addNewButton = document.querySelector(`.trip-main__event-add-btn`);

const tripsModel = new TripsModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const tripsListPresenter = new TripsListPresenter(tripsContainer, tripsFiltersContainer, tripsModel, filterModel, addNewButton, destinationsModel);
const siteMenuPresenter = new SiteMenuPresenter(routeContainer, tripsModel, filterModel, tripsListPresenter, tripsContainer, addNewButton);
tripsListPresenter.setSiteMenuPresenter(siteMenuPresenter);

api.getTrips().then((trips) => {
  tripsModel.setTrips(UpdateType.INIT, trips);
})
  .catch(() => {
    tripsModel.setTrips(UpdateType.INIT, []);
  });

addNewButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripsListPresenter.createNewTrip();
});

siteMenuPresenter.init();
tripsListPresenter.init();

api.getDestinations().then((destinations) => {
  destinationsModel.setDestinations(UpdateType.MAJOR, destinations);
});

api.getOffers().then((offers) => {
  destinationsModel.setOffers(UpdateType.MAJOR, offers);
});
