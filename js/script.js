"use strict";
const h1 = document.getElementsByTagName("h1")[0];
const handlerBtnStart = document.getElementsByClassName("handler_btn")[0];
const handlerBtnReset = document.getElementsByClassName("handler_btn")[1];
const screenBtn = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(
  ".other-items" + ".percent"
);
const otherItemsNumber = document.querySelectorAll(".other-items" + ".number");
const inputRange = document.querySelector(
  ".rollback > .main-controls__range > input"
);
const spanRange = document.querySelector(
  ".rollback > .main-controls__range > span"
);
const totalInputTotal = document.getElementsByClassName("total-input")[0];
const totalInputCount = document.getElementsByClassName("total-input")[1];
const totalInputCountOther = document.getElementsByClassName("total-input")[2];
const totalInputFullCount = document.getElementsByClassName("total-input")[3];
const totalInputTotalCountRollback =
  document.getElementsByClassName("total-input")[4];
let screens = document.querySelectorAll(
  ".screen > .main-controls__select > select > option"
)[4];

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  services: {},
  fullPrice: 0,
  servicePercentPrice: 0,
  allServicePrices: 0,
  rollback: 10,

  start: function () {
    appData.asking();
    appData.addPrice();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.getTitle();
    appData.logger();
  },

  isNumber: function (num) {
    return !isNaN(parseFloat(num) && isFinite(num));
  },
  isString: function (str) {
    return !isNaN(str) || str === "" || str === null;
  },

  asking: function () {
    do {
      appData.title = prompt("Как называется Ваш проект?");
    } while (appData.isString(appData.title));

    for (let i = 0; i < 2; i++) {
      let name;
      let price = 0;
      do {
        name = prompt("Какие типы экранов нужно разработать?");
      } while (appData.isString(name));

      do {
        price = prompt("Сколько будет стоить данная работа");
      } while (!appData.isNumber(price));
      price = Number(price.replaceAll(" ", ""));

      appData.screens.push({ id: i, name: name, price: price });
    }

    for (let i = 0; i < 2; i++) {
      let name;
      let price = 0;

      do {
        name = prompt("Какой дополнительный тип услуги нужен?");
      } while (appData.isString(name));

      do {
        price = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(price));
      price = Number(price.replaceAll(" ", ""));

      appData.services[`${name}${i}`] = price;
    }
    appData.adaptive = confirm("Нужен ли адаптив на сайте");
  },

  addPrice: function () {
    appData.screenPrice = appData.screens.reduce(function (sum, item) {
      return sum + item.price;
    }, 0);

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },

  getFullPrice: function () {
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
  },
  getServicePercentPrices: function () {
    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
    );
  },
  getTitle: function () {
    appData.title =
      appData.title.trim()[0].toUpperCase() +
      appData.title.trim().substr(1).toLowerCase();
  },
  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return "Даем скидку в 10%";
    }
    if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
    }
    if (price > 0 && price < 15000) {
      return "Скидка не предусмотрена";
    } else {
      return "Что то пошло не так";
    }
  },
  logger: function () {
    // for (let key in appData) {
    //   console.log("Ключ: " + key + " значение: " + appData[key]);
    // }
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
    console.log(appData.services);
  },
};

appData.start();

console.log(h1);
console.log(handlerBtnStart);
console.log(handlerBtnReset);
console.log(screenBtn);
console.log(inputRange);
console.log(spanRange);
console.log(totalInputTotal);
console.log(totalInputCount);
console.log(totalInputCountOther);
console.log(totalInputFullCount);
console.log(totalInputTotalCountRollback);

for (let i = 0; i < otherItemsPercent.length; i++) {
  console.log(otherItemsPercent[i]);
}

for (let i = 0; i < otherItemsNumber.length; i++) {
  console.log(otherItemsNumber[i]);
}

for (let i = 0; i < screens.length; i++) {
  console.log(screens[i]);
}
