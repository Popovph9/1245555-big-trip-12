import {remove, render, RenderPosition, replace} from "../utils/render.js";
import {FilterType, UpdateType, MenuItem} from "../const.js";
import RouteMenu from "../view/route-menu.js";
import Route from "../view/route-template.js";
import RouteFilters from "../view/route-filters.js";
import Statistics from "../view/statistics.js";

export default class SiteMenuPresenter {
  constructor(routeContainer, tripsModel, filterModel, tripsListPresenter, tripsContainer, addNewButton) {
    this._routeContainer = routeContainer;
    this._tripsModel = tripsModel;
    this._filterModel = filterModel;
    this._tripsListPresenter = tripsListPresenter;
    this._newTripsListPresenter = tripsListPresenter;
    this._statisticsContainer = tripsContainer;
    this._addNewButtonComponent = addNewButton;
    this._currentFilterType = FilterType.EVERYTHING;

    this._currentMenuValue = MenuItem.TABLE;


    this._routeComponent = null;
    this._filterComponent = null;
    this._siteMenu = null;
    this._statisticsComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._handleSiteMenuClick = this._handleSiteMenuClick.bind(this);

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

  _handleSiteMenuClick(menuItem) {
    this._currentMenuValue = menuItem;

    switch (menuItem) {
      case MenuItem.TABLE:
        this._addNewButtonComponent.disabled = false;
        this._renderTripsList();
        this._rerenderSiteMenu();
        this._currentFilterType = FilterType.EVERYTHING;
        this._renderFilters();
        break;
      case MenuItem.STATISTICS:
        if (this._tripsListPresenter !== null) {
          this._removeTripsList();
        }
        this._addNewButtonComponent.disabled = true;
        this._renderStatistics();
        this._rerenderSiteMenu();
        break;
    }
  }

  _renderSiteMenu() {
    if (this._siteMenu === null) {
      this._siteMenuContainer = this._routeContainer.querySelector(`h2`);

      if (this._siteMenuContainer) {
        this._siteMenu = new RouteMenu(this._currentMenuValue);

        render(this._siteMenuContainer, this._siteMenu, RenderPosition.AFTER);

        this._siteMenu.setMenuClickHandler(this._handleSiteMenuClick);
      }
    } else {
      this._rerenderSiteMenu();
    }
  }

  _rerenderSiteMenu() {
    if (this._siteMenu !== null) {
      remove(this._siteMenu);
      this._siteMenu = null;
      this._renderSiteMenu();
    }
  }

  _renderRoute() {
    const prevRouteComponent = this._routeComponent;

    this._routeComponent = new Route(this._tripsModel.getTrips());

    if (prevRouteComponent === null) {
      render(this._routeContainer, this._routeComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._routeComponent, prevRouteComponent);
    remove(prevRouteComponent);
  }

  _renderFilters() {
    if (this._filterComponent === null) {
      this._filterComponent = new RouteFilters(this._currentFilterType);

      this.routeFiltersContainer = this._routeContainer.querySelector(`.trip-main__trip-controls`);

      if (this.routeFiltersContainer) {
        render(this.routeFiltersContainer, this._filterComponent, RenderPosition.BEFOREEND);

        this._filterComponent.setFilterTypeChangeHandler(this._filterTypeChangeHandler);
      }
    } else {
      this._rerenderfilters();
    }
  }

  _rerenderfilters() {
    if (this._filterComponent !== null) {
      remove(this._filterComponent);
      this._filterComponent = null;
      this._renderFilters();
    }
  }

  _renderTripsList() {
    if (this._tripsListPresenter !== null) {
      return;
    }

    this._removeStatistics();
    this._tripsListPresenter = this._newTripsListPresenter;
    this._tripsListPresenter.init();
  }

  _removeTripsList() {
    this._tripsListPresenter.destroy();
    this._tripsListPresenter = null;
  }

  _renderStatistics() {
    if (this._statisticsComponent !== null) {
      return;
    }
    this._statisticsComponent = new Statistics(this._tripsModel.getTrips());
    render(this._statisticsContainer, this._statisticsComponent, RenderPosition.BEFOREEND);
  }

  _removeStatistics() {
    if (this._statisticsComponent === null) {
      return;
    }

    remove(this._statisticsComponent);

    this._statisticsComponent = null;
  }

  _filterTypeChangeHandler(filterType) {
    this._currentFilterType = filterType;
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}
