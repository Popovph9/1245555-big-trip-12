import moment from "moment";

export const formatDateToHours = (date) => {
  return moment(date).format(`HH:mm`);
};

export const formatDateToHumanize = (date) => {
  return moment(date).format(`MMM D`);
};

export const formatDateToString = (date) => {
  return moment(date).format(`YYYY-MM-DDTHH`);
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

export const passGen = (len) => {
  const chrs = `abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789`;
  let str = ``;
  for (let i = 0; i < len; i++) {
    const pos = Math.floor(Math.random() * chrs.length);
    str += chrs.substring(pos, pos + 1);
  }
  return str;
};


export const getUpperLetter = (str) => {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
};

export const flatten = (arr) => {
  return [].concat(...arr);
};
