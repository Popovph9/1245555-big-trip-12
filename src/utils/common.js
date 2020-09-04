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

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortTripsUp = (tripA, tripB) => {
  const weight = getWeightForNullDate(tripA.date, tripB.date);

  if (weight !== null) {
    return weight;
  }

  return tripA.date.getTime() - tripB.date.getTime();
};

export const sortTripsDown = (tripA, tripB) => {
  const weight = getWeightForNullDate(tripA.date, tripB.date);

  if (weight !== null) {
    return weight;
  }

  return tripB.date.getTime() - tripA.date.getTime();
};
