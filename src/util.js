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

  array.forEach(function (item) {
    if (getRandomInteger(0, 1) === 1) {
      anotherArray.push(item);
    }
  });

  let slicedArray = anotherArray.slice(0, number);

  return slicedArray;
};

export const getRandomIndex = (arr) => {
  return getRandomInteger(0, arr.length - 1);
};

