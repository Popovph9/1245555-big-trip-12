import Observer from "../utils/observer.js";
import {formatDateToServer} from "../utils/common.js";

export default class TripsModel extends Observer {
  constructor() {
    super();
    this._trips = [];
  }

  setTrips(updateType, trips) {
    this._trips = trips.slice();

    this._notify(updateType);
  }

  getTrips() {
    return this._trips;
  }

  updateTrip(updateType, update) {
    const index = this._trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting trip`);
    }

    this._trips = [
      ...this._trips.slice(0, index),
      update,
      ...this._trips.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addTrip(updateType, update) {
    this._trips = [
      update,
      ...this._trips
    ];

    this._notify(updateType, update);
  }

  deleteTrip(updateType, update) {
    const index = this._trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting trip`);
    }

    this._trips = [
      ...this._trips.slice(0, index),
      ...this._trips.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(trip) {
    const adaptedTask = Object.assign(
        {},
        trip,
        {
          dateFrom: trip.date_from,
          dateTo: trip.date_to,
          basePrice: trip.base_price,
          isFavorite: trip.is_favorite,
        }
    );

    delete adaptedTask.date_from;
    delete adaptedTask.date_to;
    delete adaptedTask.is_favorite;
    delete adaptedTask.base_price;

    return adaptedTask;
  }

  static adaptToServer(trip) {
    const adaptedTask = Object.assign(
        {},
        trip,
        {
          "date_from": formatDateToServer(trip.dateFrom),
          "date_to": formatDateToServer(trip.dateTo),
          "is_favorite": trip.isFavorite,
          "base_price": trip.basePrice
        }
    );

    delete adaptedTask.dateFrom;
    delete adaptedTask.dateTo;
    delete adaptedTask.basePrice;
    delete adaptedTask.isFavorite;

    return adaptedTask;
  }
}
