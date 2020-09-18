import {FILTER_TYPE} from "../const.js";
import Observer from "../utils/observer.js";

export default class FilterModel extends Observer {
  constructor() {
    super();
    this._activeFilter = FILTER_TYPE.EVERYTHING;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
