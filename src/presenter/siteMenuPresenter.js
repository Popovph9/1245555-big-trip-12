import {remove, render, RENDER_POSITION, replace} from "../utils/render.js";
import {FILTER_TYPE, UPDATE_TYPE} from "../const.js";
import RouteMenu from "../view/route-menu.js";
import Route from "../view/route-template.js";
import RouteFilters from "../view/route-filters.js";

export default class SiteMenuPresenter {
  constructor(routeContainer, tripsModel, filterModel) {
    this._routeContainer = routeContainer;
    this._tripsModel = tripsModel;
    this._filterModel = filterModel;
    this._currentFilterType = FILTER_TYPE.EVERYTHING;

    this._siteMenu = new RouteMenu();
    this._routeComponent = null;
    this._filterComponent = new RouteFilters(this._currentFilterType);

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._filterComponent.setFilterTypeChangeHandler(this._filterTypeChangeHandler);

    this._tripsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderSiteMenu();
    this._renderRoute();
    this._renderFilters();
  }

  _handleModelEvent() {
    this.init();
  }


  _renderSiteMenu() {
    this._siteMenuContainer = this._routeContainer.querySelector(`h2`);
    render(this._siteMenuContainer, this._siteMenu, RENDER_POSITION.AFTER);
  }

  _renderRoute() {
    const prevRouteComponent = this._routeComponent;

    this._routeComponent = new Route(this._tripsModel.getTrips());

    if (prevRouteComponent === null) {
      render(this._routeContainer, this._routeComponent, RENDER_POSITION.AFTERBEGIN);
      return;
    }

    replace(this._routeComponent, prevRouteComponent);
    remove(prevRouteComponent);
  }

  _renderFilters() {
    this.routeFiltersContainer = this._routeContainer.querySelector(`.trip-main__trip-controls`);
    render(this.routeFiltersContainer, this._filterComponent, RENDER_POSITION.BEFOREEND);
  }

  _filterTypeChangeHandler(filterType) {
    this._currentFilterType = filterType;
    this._filterModel.setFilter(UPDATE_TYPE.MAJOR, filterType);
  }
}
