import {getRandomIndex, getRandomArray, getRandomInteger, getRandomArrayOfCurrentLength} from "../utils/common.js";
import {generateId} from "../utils/common.js";
import {DESTINATION} from "../const.js";

const TRIP_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

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

const DATE_FROM = [`2019-01-10T22:55:56.845Z`, `2019-02-10T22:00:00.845Z`, `2019-02-10T10:30:56.845Z`, `2019-03-10T01:15:56.845Z`];
const DATE_TO = [`2019-08-09T11:22:13.375Z`, `2019-07-10T22:00:00.845Z`, `2019-07-10T10:30:56.845Z`, `2019-07-10T01:15:56.845Z`];
const PRICES = {
  min: 20,
  max: 500
};
const DESCRIPTIONS_MAX = 5;

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

const generateDateFrom = () => {
  return DATE_FROM[getRandomIndex(DATE_FROM)];
};

const generateDateTo = () => {
  return DATE_TO[getRandomIndex(DATE_TO)];
};

export const generateTrip = () => {
  const basePrice = getRandomInteger(PRICES.min, PRICES.max);

  return {
    id: generateId(),
    type: generateType(),
    destination: generateDestination(),
    dateFrom: generateDateFrom(),
    dateTo: generateDateTo(),
    basePrice,
    offers: generateOffers(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
