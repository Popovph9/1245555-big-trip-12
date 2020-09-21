import AbstractClass from "./abstract-class.js";

const getFilters = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return (`<div class="trip-filters__filter">
  <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${currentFilterType === type ? `checked` : ``}  ${count === 0 ? `disabled` : ``}>

  <label class="trip-filters__filter-label" for="filter-${type}">${name}</label>
</div>`);
};

const getRouteFiltersTemplate = (filters, currentFilterType) => {
  const filtersTemplate = filters.map((filter) => getFilters(filter, currentFilterType)).join(``);

  return (
    `<form class="trip-filters" action="#" method="get">

      ${filtersTemplate}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class RouteFilters extends AbstractClass {
  constructor(filters, currentFilterType) {
    super();

    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return getRouteFiltersTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
