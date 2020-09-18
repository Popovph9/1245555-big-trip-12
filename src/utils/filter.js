import {FILTER_TYPE} from "../const.js";
import {isTripPlanned, isTripExpired} from "./common.js";

export const filter = {
  [FILTER_TYPE.EVERYTHING]: (trips) => trips.filter((trip) => trip),
  [FILTER_TYPE.FUTURE]: (trips) => trips.filter((trip) => isTripPlanned(trip.dateTo)),
  [FILTER_TYPE.PAST]: (trips) => trips.filter((trip) => isTripExpired(trip.dateTo)),
};
