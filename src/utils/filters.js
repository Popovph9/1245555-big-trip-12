export const sortTripsByTime = (tripA, tripB) => {
  return tripB.date.getTime() - tripA.date.getTime();
};

export const sortTripsByPrice = (tripA, tripB) => {
  return tripB.basePrice - tripA.basePrice;
};

export const sortTripsByDate = (tripA, tripB) => {
  return tripA.date.getDate() - tripB.date.getDate();
};
