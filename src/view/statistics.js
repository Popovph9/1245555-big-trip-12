import SmartClass from "./smart-class.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {makeItemsUniq} from "../utils/sorting.js";
import {TRANSFER_TYPES} from "../const.js";
import {getTripDurationH} from "../utils/common.js";
import {getTypes, getCurrentTypes} from "../utils/filter.js";

const renderMoneyChart = (moneyCtx, trips) => {
  const tripsTypes = getTypes(trips);
  const uniqTypes = makeItemsUniq(tripsTypes);

  const getCostsOfUniqTypes = (arr) => {
    const prices = [];
    for (let i = 0; i < uniqTypes.length; i++) {

      const filteredCosts = arr.filter((trip) => trip.type === uniqTypes[i]).reduce((acc, it) => acc + it.basePrice, 0);

      prices.push(filteredCosts);
    }

    return prices;
  };

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: uniqTypes,
      datasets: [{
        data: getCostsOfUniqTypes(trips),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTransportChart = (transportCtx, trips) => {
  const tripsTypes = getTypes(trips);
  const activity = getCurrentTypes(tripsTypes, TRANSFER_TYPES);
  const uniqActivity = makeItemsUniq(activity);
  const getTripsLength = (arr, type) => {
    return arr.filter((it) => it.type === type).length;
  };

  const activityCounts = uniqActivity.map((type) => getTripsLength(trips, type));

  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: uniqActivity,
      datasets: [{
        data: activityCounts,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeChart = (timeSpendCtx, trips) => {
  const tripsTypes = getTypes(trips);
  const uniqTypes = makeItemsUniq(tripsTypes);

  const getDurationOfUniqTypes = (arr) => {
    const prices = [];
    for (let i = 0; i < uniqTypes.length; i++) {

      const filteredCosts = arr.filter((trip) => trip.type === uniqTypes[i]).reduce((acc, it) => acc + getTripDurationH(it), 0);

      prices.push(filteredCosts);
    }

    return prices;
  };

  return new Chart(timeSpendCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: uniqTypes,
      datasets: [{
        data: getDurationOfUniqTypes(trips),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}H`
        }
      },
      title: {
        display: true,
        text: `TIME SPENT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};


const getStatisticsTemplate = () => {
  return `<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>

  <div class="statistics__item statistics__item--money">
    <canvas class="statistics__chart  statistics__chart--money statistic__money" width="900"></canvas>
  </div>

  <div class="statistics__item statistics__item--transport">
    <canvas class="statistics__chart  statistics__chart--transport statistic__transport" width="900"></canvas>
  </div>

  <div class="statistics__item statistics__item--time-spend">
    <canvas class="statistics__chart  statistics__chart--time statistic__time-spend" width="900"></canvas>
  </div>
</section>`;
};

export default class Statistics extends SmartClass {
  constructor(trips) {
    super();

    this._trips = trips;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeChart = null;

    this._setCharts();
  }


  getTemplate() {
    return getStatisticsTemplate(this._trips);
  }

  _setCharts() {
    if (this._moneyChart !== null) {
      this._moneyChart = null;
    }
    if (this._transportChart !== null) {
      this._transportChart = null;
    }
    if (this._timeChart !== null) {
      this._timeChart = null;
    }

    const moneyCtx = this.getElement().querySelector(`.statistic__money`);
    const transportCtx = this.getElement().querySelector(`.statistic__transport`);
    const timeSpendCtx = this.getElement().querySelector(`.statistic__time-spend`);

    const tripsTypes = getTypes(this._trips);
    const uniqTypesLength = makeItemsUniq(tripsTypes).length;
    const activity = getCurrentTypes(tripsTypes, TRANSFER_TYPES);
    const uniqActivity = makeItemsUniq(activity);
    const getTripsLength = (arr, type) => {
      return arr.filter((it) => it.type === type).length;
    };
    const activityCounts = uniqActivity.map((type) => getTripsLength(this._trips, type));
    const uniqActivityLength = activityCounts.length;

    const BAR_HEIGHT = 55;
    moneyCtx.height = BAR_HEIGHT * uniqTypesLength;
    transportCtx.height = BAR_HEIGHT * uniqActivityLength;
    timeSpendCtx.height = BAR_HEIGHT * uniqTypesLength;

    if (moneyCtx && transportCtx && timeSpendCtx) {
      this._moneyChart = renderMoneyChart(moneyCtx, this._trips);
      this._transportChart = renderTransportChart(transportCtx, this._trips);
      this._timeChart = renderTimeChart(timeSpendCtx, this._trips);
    }
  }
}
