import moment from "moment";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArray = function (array) {
  let anotherArray = [];

  array.forEach(function (item) {
    if (getRandomInteger(0, 1) === 1) {
      anotherArray.push(item);
    }
  });

  return anotherArray;
};

export const getRandomArrayOfCurrentLength = function (array, number) {
  let anotherArray = [];
  let slicedArray = [];

  array.forEach(function (item) {
    if (getRandomInteger(0, 1) === 1) {
      anotherArray.push(item);
    }
  });

  slicedArray = anotherArray.slice(0, number);

  return slicedArray;
};

export const getRandomIndex = (arr) => {
  return getRandomInteger(0, arr.length - 1);
};

export const humanizeDate = (longDate) => {
  return longDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`});
};

export const formatDateToHours = (date) => {
  return moment(date).format(`HH:mm`);
};

export const formatDateToHumanize = (date) => {
  return moment(date).format(`MMM D`);
};

export const formatDateToString = (date) => {
  return moment(date).format(`YYYY-MM-DDTHH`);
};

export const formatDateToServer = (date) => {
  return moment(date).format(`YYYY-MM-DDTHH:mm:SS.ZZ`);
};

export const getDuration = (x, y) => {
  x = moment(x);
  y = moment(y);
  return moment.duration(y.diff(x));
};


export const getTripDurationH = (trip) => {
  const x = moment(trip.dateTo);
  const y = moment(trip.dateFrom);
  return Math.ceil(x.diff(y, `hours`));
};

export const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);

  return new Date(currentDate);
};


export const isTripExpired = (date) => {
  const currentDate = getCurrentDate();

  return moment(currentDate).isAfter(date);
};

export const isTripPlanned = (date) => {
  const currentDate = getCurrentDate();

  return moment(currentDate).isBefore(date);
};

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const passGen = (len) => {
  const chrs = `abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789`;
  let str = ``;
  for (let i = 0; i < len; i++) {
    let pos = Math.floor(Math.random() * chrs.length);
    str += chrs.substring(pos, pos + 1);
  }
  return str;
};
