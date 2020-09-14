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

export const getDuration = (x, y) => {
  x = moment(x);
  y = moment(y);
  return moment.duration(y.diff(x));
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};
