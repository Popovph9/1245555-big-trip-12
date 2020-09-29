import {FilterType} from "../const.js";
import {isTripPlanned, isTripExpired} from "./common.js";

export const filter = {
  [FilterType.EVERYTHING]: (trips) => trips.filter((trip) => trip),
  [FilterType.FUTURE]: (trips) => trips.filter((trip) => isTripPlanned(trip.dateTo)),
  [FilterType.PAST]: (trips) => trips.filter((trip) => isTripExpired(trip.dateTo)),
};

export const getTypes = (arr) => {
  return arr.map((it) => it.type);
};

export const getCurrentTypes = (arr, types) => {
  const newArr = [];
  for (let i = 0; i < types.length; i++) {
    const newItem = arr.filter((it) => it === types[i].toLowerCase());
    newArr.push(...newItem);
  }
  return newArr;
};

export const getElementOfCurrentType = (arr, type) => {
  return arr.filter((it) => it.type === type);
};

export const getElementOfCurrentName = (arr, name) => {
  return arr.filter((it) => it.name === name);
};
