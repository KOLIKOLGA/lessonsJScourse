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
  invalid: false,

  init: function () {
    appData.addTitle();

    handlerBtnStart.addEventListener("click", appData.start);
    handlerBtnStart.addEventListener("click", appData.addDisabledScreens);
    handlerBtnStart.addEventListener("click", appData.addDisabledCheckBox);
    inputRange.addEventListener("input", appData.getRollBack);
    screenBtnPlus.addEventListener("click", appData.addScreenBlock);
  },
  addTitle: function () {
    document.title = headerTitle.textContent;
  },

  start: function () {
    appData.checkFields();

    if (!appData.invalid) {
      appData.addScreens();
      appData.addServices();
      appData.addPrice();
      appData.showResult();
      // appData.getDisabled();
      //appData.logger();
    }
  },

  checkFields: function () {
    screens = document.querySelectorAll(".screen"); // важно обновлять список проверяемых элементов
    appData.invalid = false;
    screens.forEach((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");

      if (select.value.trim() === "" || input.value.trim() === "") {
        appData.invalid = true;
      }
    });
    handlerBtnStart.style.display = "none";
    handlerBtnReset.style.display = "flex";
  },

  showResult: function () {
    totalInputTotal.value = this.screenPrice;
    totalInputCountOther.value =
      this.servicePricesNumber + this.servicePricesPercent;
    totalInputFullCount.value = this.fullPrice;
    totalInputTotalCountRollback.value = this.servicePercentPrice;
    totalInputCount.value = this.screenCount;
  },

  addScreens: function () {
    screens = document.querySelectorAll(".screen");

    screens.forEach((screen, index) => {
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
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
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
    this.screenPrice = this.screens.reduce((sum, item) => {
      return sum + item.price;
    }, 0);

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }
    this.fullPrice =
      this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

    this.servicePercentPrice = Math.ceil(
      this.fullPrice - this.fullPrice * (this.rollback / 100)
    );
    this.screenCount = this.screens.reduce((sum, item) => {
      return sum + item.count;
    }, 0);
  },
  getRollBack: function () {
    spanRange.textContent = inputRange.value;
    appData.rollback = spanRange.textContent;
  },

  addDisabledScreens: function () {
    screens = document.querySelectorAll(".screen");
    console.log(screens);
    screens.forEach((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");

      input.disabled = "true";
      select.disabled = "true";
    });
    screenBtnPlus.style.display = "none";
  },
  addDisabledCheckBox: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      check.disabled = "true";
    });
    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      check.disabled = "true";
    });
  },
  logger: function () {
    console.log(this.fullPrice);
    console.log(this.servicePercentPrice);
    console.log(this.screens);
    console.log(this.services);
  },
};

appData.init();
