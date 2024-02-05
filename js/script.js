"use strict";
const headerTitle = document.getElementsByTagName("h1")[0];
const handlerBtnStart = document.getElementsByClassName("handler_btn")[0];
const handlerBtnReset = document.getElementsByClassName("handler_btn")[1];
const screenBtnPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");
const inputRange = document.querySelector(".rollback input");
const spanRange = document.querySelector(".rollback .range-value");
const totalInputTotal = document.getElementsByClassName("total-input")[0];
const totalInputCount = document.getElementsByClassName("total-input")[1];
const totalInputCountOther = document.getElementsByClassName("total-input")[2];
const totalInputFullCount = document.getElementsByClassName("total-input")[3];
const totalInputTotalCountRollback =
  document.getElementsByClassName("total-input")[4];
let screens = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  servicesPercent: {},
  servicesNumber: {},
  fullPrice: 0,
  servicePercentPrice: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  rollback: 0,
  screenCount: 0,

  init: function () {
    appData.addTitle();

    inputRange.addEventListener("input", appData.getRollBack);
    handlerBtnStart.addEventListener("click", appData.checkFields);

    screenBtnPlus.addEventListener("click", appData.addScreenBlock);
  },
  addTitle: function () {
    document.title = headerTitle.textContent;
  },

  checkFields: function () {
    appData.addScreens();
    let countScreen = 0;

    for (let i = 0; i < appData.screens.length; i++) {
      if (
        appData.screens[i].name === "Тип экранов" ||
        appData.screens[i].count === 0 ||
        appData.screens[i].price === 0
      ) {
        countScreen = 0;
      } else {
        countScreen++;
      }
      if (countScreen === appData.screens.length) {
        appData.start();
      }
    }
  },

  start: function () {
    appData.addServices();
    appData.addPrice();

    // appData.logger();
    appData.showResult();
  },

  showResult: function () {
    totalInputTotal.value = appData.screenPrice;
    totalInputCountOther.value =
      appData.servicePricesNumber + appData.servicePricesPercent;
    totalInputFullCount.value = appData.fullPrice;
    totalInputTotalCountRollback.value = appData.servicePercentPrice;
    totalInputCount.value = appData.screenCount;
  },

  addScreens: function () {
    screens = document.querySelectorAll(".screen");

    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });

    console.log(appData.screens);
  },

  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);

    screens[screens.length - 1].after(cloneScreen);
  },

  addPrice: function () {
    appData.screenPrice = appData.screens.reduce(function (sum, item) {
      return sum + item.price;
    }, 0);

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPercent[key] / 100);
    }
    appData.fullPrice =
      appData.screenPrice +
      appData.servicePricesNumber +
      appData.servicePricesPercent;

    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
    );
    appData.screenCount = appData.screens.reduce(function (sum, item) {
      return sum + item.count;
    }, 0);
  },
  getRollBack: function () {
    spanRange.textContent = inputRange.value;
    appData.rollback = spanRange.textContent;
  },

  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
    console.log(appData.services);
  },
};

appData.init();

// console.log(headerTitle);
// console.log(handlerBtnStart);
// console.log(handlerBtnReset);
// console.log(screenBtn);
// console.log(inputRange);
// console.log(spanRange);
// console.log(totalInputTotal);
//console.log(totalInputCount.value);
// console.log(totalInputCountOther);
// console.log(totalInputFullCount);
// console.log(totalInputTotalCountRollback);

// for (let i = 0; i < otherItemsPercent.length; i++) {
//   console.log(otherItemsPercent[i]);
// }

// for (let i = 0; i < otherItemsNumber.length; i++) {
//   console.log(otherItemsNumber[i]);
// }

// for (let i = 0; i < screens.length; i++) {
//   console.log(screens[i]);
// }
