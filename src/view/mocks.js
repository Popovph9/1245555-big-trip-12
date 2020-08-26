import {getRandomIndex} from "../util.js";
import {getRandomArray} from "../util.js";
import {getRandomInteger} from "../util.js";
import {getRandomArrayOfCurrentLength} from "../util.js";

const TRIP_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const DESTINATION = [`Amsterdam`, `Chamonix`, `Geneva`, `Saint Petersburg`];
const OFFERS = [
  {name: `Travel by train`, price: 40},
  {name: `Add luggage`, price: 30},
  {name: `Switch to comfort class`, price: 100},
  {name: `Choose seats`, price: 5},
  {name: `Add meal`, price: 15}
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

const generateType = () => {
  return TRIP_TYPES[getRandomIndex(TRIP_TYPES)];
};

const generateDestination = () => {
  return DESTINATION[getRandomIndex(DESTINATION)];
};

const generateOffers = () => {
  return getRandomArray(OFFERS);
};

const generateInfo = () => {
  return {
    description: getRandomArrayOfCurrentLength(DESCRIPTIONS, DESCRIPTIONS_MAX),
    photo: getRandomArray(PHOTOS)
  };
};

const generateTime = () => {
  const hours = getRandomInteger(HOUR.min, HOUR.max);
  const min = getRandomInteger(MINUTE.min, MINUTE.max);
  const time = `${hours} : ${min}`;

  return time;
};

const getDate = () => {
  return new Date();
};

const date = getDate();

const humanizeDate = (longDate) => {
  return longDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`});
};

export const generateTrip = () => {
  const price = getRandomInteger(PRICES.min, PRICES.max);

  return {
    type: generateType(),
    destination: generateDestination(),
    timeIn: generateTime(),
    timeOut: generateTime(),
    price,
    offers: generateOffers(),
    info: generateInfo(),
    date: humanizeDate(date)
  };
};
