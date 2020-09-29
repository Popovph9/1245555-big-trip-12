import Observer from "../utils/observer.js";


export default class DestinationsModel extends Observer {
  constructor() {
    super();
    this._destinations = [];
    this._offers = [];
  }

  setDestinations(updateType, destinations) {
    this._destinations = destinations.slice();

    this._notify(updateType);
  }

  getDestinations() {
    return this._destinations;
  }

  setOffers(updateType, offers) {
    this._offers = offers.slice();

    this._notify(updateType);
  }

  getOffers() {
    return this._offers;
  }
}
