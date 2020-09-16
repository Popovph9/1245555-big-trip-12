import moment from "moment";
import {getDuration} from "./common.js";

export const sortTripsByTime = (tripA, tripB) => {
  return getDuration(tripB.dateFrom, tripB.dateTo) - getDuration(tripA.dateFrom, tripA.dateTo);
};

export const sortTripsByPrice = (tripA, tripB) => {
  return tripB.basePrice - tripA.basePrice;
};

export const sortTripsByDate = (tripA, tripB) => {
  return moment(tripA.dateFrom) - moment(tripB.dateFrom);
};
