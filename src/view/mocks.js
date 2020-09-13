import {getRandomIndex, getRandomArray, getRandomInteger, getRandomArrayOfCurrentLength} from "../utils/common.js";

const TRIP_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const DESTINATION = [`Amsterdam`, `Chamonix`, `Geneva`, `Saint Petersburg`];
const OFFERS = [
  {title: `Travel by train`, price: 40},
  {title: `Add luggage`, price: 30},
  {title: `Switch to comfort class`, price: 100},
  {title: `Choose seats`, price: 5},
  {title: `Add meal`, price: 15}
];
const PHOTOS = [`http://picsum.photos/248/152?r=${Math.random()}`, `http://picsum.photos/248/152?r=${Math.random()}`,
  `http://picsum.photos/248/152?r=${Math.random()}`, `http://picsum.photos/248/152?r=${Math.random()}`,
  `http://picsum.photos/248/152?r=${Math.random()}`];
const DESCRIPTIONS = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];

const HOUR = {
  min: 0,
  max: 24
};
const MINUTE = {
  min: 0,
  max: 60
};
const PRICES = {
  min: 20,
  max: 500
};
const DESCRIPTIONS_MAX = 5;

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateType = () => {
  return TRIP_TYPES[getRandomIndex(TRIP_TYPES)];
};

const generateDestination = () => {
  return {
    description: getRandomArrayOfCurrentLength(DESCRIPTIONS, DESCRIPTIONS_MAX),
    name: DESTINATION[getRandomIndex(DESTINATION)],
    pictures: [
      {
        src: PHOTOS[getRandomIndex(PHOTOS)],
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
      }
    ],
  };
};

const generateOffers = () => {
  return getRandomArray(OFFERS);
};

const generateTime = () => {
  const hours = getRandomInteger(HOUR.min, HOUR.max);
  const min = getRandomInteger(MINUTE.min, MINUTE.max);
  const time = `${hours} : ${min}`;

  return time;
};

const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};


export const generateTrip = () => {
  const basePrice = getRandomInteger(PRICES.min, PRICES.max);
  const date = generateDate();

  return {
    id: generateId(),
    type: generateType(),
    destination: generateDestination(),
    dateFrom: generateTime(),
    dateTo: generateTime(),
    basePrice,
    offers: generateOffers(),
    date,
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
