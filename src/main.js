
import {passGen} from "./utils/common.js";
import {PASS_LENGTH, END_POINT, UpdateType} from "./const.js";
import TripsModel from "./model/tripModel.js";
import FilterModel from "./model/filterModel.js";
import DestinationsModel from "./model/destnationsModel.js";
import SiteMenuPresenter from "./presenter/site-menu-presenter";
import TripsListPresenter from "./presenter/trips-list-presenter.js";
import Api from "./api/index.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";

const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v12`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;
const DEST_PREFIX = `bigtrip-dest-localstorage`;
const DEST_STORE_NAME = `${DEST_PREFIX}-${STORE_VER}`;
const OFF_PREFIX = `bigtrip-off-localstorage`;
const OFF_STORE_NAME = `${OFF_PREFIX}-${STORE_VER}`;


const authorization = `Basic ${passGen(PASS_LENGTH)}`;

const api = new Api(END_POINT, authorization);

const store = new Store(STORE_NAME, window.localStorage);
const destStore = new Store(DEST_STORE_NAME, window.localStorage);
const offersStore = new Store(OFF_STORE_NAME, window.localStorage);

const apiWithProvider = new Provider(api, store, destStore, offersStore);

const routeContainer = document.querySelector(`.trip-main`);
const tripsContainer = document.querySelector(`.trip-events`);
const tripsFiltersContainer = tripsContainer.querySelector(`h2`);
const addNewButton = document.querySelector(`.trip-main__event-add-btn`);

const tripsModel = new TripsModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const tripsListPresenter = new TripsListPresenter(tripsContainer, tripsFiltersContainer, tripsModel, filterModel, addNewButton, destinationsModel, apiWithProvider);
const siteMenuPresenter = new SiteMenuPresenter(routeContainer, tripsModel, filterModel, tripsListPresenter, tripsContainer, addNewButton);
tripsListPresenter.setSiteMenuPresenter(siteMenuPresenter);
apiWithProvider.getTrips().then((trips) => {
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

apiWithProvider.getDestinations().then((destinations) => {
  destinationsModel.setDestinations(UpdateType.MAJOR, destinations);
})
.catch(() => {
  destinationsModel.setDestinations(UpdateType.MAJOR, []);
});

apiWithProvider.getOffers().then((offers) => {
  destinationsModel.setOffers(UpdateType.MAJOR, offers);
})
.catch(() => {
  destinationsModel.setOffers(UpdateType.MAJOR, []);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
