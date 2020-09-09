export const sortTripsByTime = (tripA, tripB) => {
  return tripB.date.getTime() - tripA.date.getTime();
};

export const sortTripsByPrice = (tripA, tripB) => {
  return tripB.price - tripA.price;
};
