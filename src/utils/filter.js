import {FilterType} from "../const.js";
import {isTripPlanned, isTripExpired} from "./common.js";

export const filter = {
  [FilterType.EVERYTHING]: (trips) => trips.filter((trip) => trip),
  [FilterType.FUTURE]: (trips) => trips.filter((trip) => isTripPlanned(trip.dateTo)),
  [FilterType.PAST]: (trips) => trips.filter((trip) => isTripExpired(trip.dateTo)),
};
