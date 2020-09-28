import {nanoid} from "nanoid";
import TripsModel from "../model/tripModel.js";

const getSyncedTrips = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.point);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store, store1, store2) {
    this._api = api;
    this._store = store;
    this._store1 = store1;
    this._store2 = store2;
  }

  getOffers() {
    if (Provider.isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          this._store2.setItems(offers);
          return offers;
        });
    }
    const storeOffers = this._store2.getItems();

    return Promise.resolve(storeOffers);
  }

  getDestinations() {
    if (Provider.isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          this._store1.setItems(destinations);
          return destinations;
        });
    }
    const storeDestinations = this._store1.getItems();

    return Promise.resolve(storeDestinations);
  }

  getTrips() {
    if (Provider.isOnline()) {
      return this._api.getTrips()
        .then((trips) => {
          const items = createStoreStructure(trips.map(TripsModel.adaptToServer));
          this._store.setItems(items);
          return trips;
        });
    }

    const storeTasks = Object.values(this._store.getItems());

    return Promise.resolve(storeTasks.map(TripsModel.adaptToClient));
  }

  updateTrip(trip) {
    if (Provider.isOnline()) {
      return this._api.updateTrip(trip)
        .then((updatedTrip) => {
          this._store.setItem(updatedTrip.id, TripsModel.adaptToServer(updatedTrip));
          return updatedTrip;
        });
    }

    this._store.setItem(trip.id, TripsModel.adaptToServer(Object.assign({}, trip)));

    return Promise.resolve(trip);
  }

  addTrip(trip) {
    if (Provider.isOnline()) {
      return this._api.addTrip(trip)
        .then((newTrip) => {
          this._store.setItem(newTrip.id, TripsModel.adaptToServer(newTrip));
          return newTrip;
        });
    }

    const localNewTripId = nanoid();
    const localNewTrip = Object.assign({}, trip, {id: localNewTripId});

    this._store.setItem(localNewTrip.id, TripsModel.adaptToServer(localNewTrip));

    return Promise.resolve(localNewTrip);
  }

  deleteTrip(trip) {
    if (Provider.isOnline()) {
      return this._api.deleteTrip(trip)
        .then(() => this._store.removeItem(trip.id));
    }

    this._store.removeItem(trip.id);

    return Promise.resolve();
  }

  sync() {
    if (Provider.isOnline()) {
      const storeTrips = Object.values(this._store.getItems());

      return this._api.sync(storeTrips)
        .then((response) => {
          const createdTrips = getSyncedTrips(response.created);
          const updatedTrips = getSyncedTrips(response.updated);

          const items = createStoreStructure([...createdTrips, ...updatedTrips]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  static isOnline() {
    return window.navigator.onLine;
  }
}
