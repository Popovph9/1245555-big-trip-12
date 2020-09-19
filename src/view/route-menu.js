import AbstractClass from "./abstract-class.js";
import {MenuItem} from "../const.js";

const ACTIVE_CLASS = `trip-tabs__btn--active`;

const getRouteMenuTemplate = (menuItem) => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn ${menuItem === MenuItem.TABLE ? ACTIVE_CLASS : ``}" href="#">${MenuItem.TABLE}</a>
      <a class="trip-tabs__btn ${menuItem === MenuItem.STATISTICS ? ACTIVE_CLASS : ``}" href="#">${MenuItem.STATISTICS}</a>
    </nav>`
  );
};

export default class RouteMenu extends AbstractClass {
  constructor(menuItem) {
    super();
    this._menuItem = menuItem;
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return getRouteMenuTemplate(this._menuItem);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._menuItem = evt.target.textContent;
    this._callback.menuClick(evt.target.textContent);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }
}

