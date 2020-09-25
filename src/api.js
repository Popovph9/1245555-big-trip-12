import TripsModel from "./model/tripModel.js";

const Method = {
  GET: `GET`,
  PUT: `PUT`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);
    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}
    )
    .then(Api.checkStatus)
    .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN &&
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static catchError(err) {
    throw err;
  }

  static toJSON(response) {
    return response.json();
  }

  getTrips() {
    return this._load({url: `points`})
      .then(Api.toJSON)
      .then((trips) => trips.map(TripsModel.adaptToClient));
  }

  updateTrips(trip) {
    return this._load({
      url: `points/${trip.id}`,
      method: Method.PUT,
      body: JSON.stringify(TripsModel.adaptToServer(trip)),
      headers: new Headers({"Content-Type": `application/json`})
    }).then(Api.toJSON).then(TripsModel.adaptToClient);
  }

  getDestinations() {
    return this._load({url: `destinations`})
      .then(Api.toJSON);
  }

  getOffers() {
    return this._load({url: `offers`})
      .then(Api.toJSON);
  }
}
