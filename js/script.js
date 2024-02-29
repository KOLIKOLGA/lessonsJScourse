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
const checkBox = document.querySelectorAll(
  ".main-controls__checkbox input[type=checkbox]"
);

const cms = document.querySelector(".cms");
const checkBoxCms = cms.querySelector("#cms-open");
const hiddenCmsVariants = cms.querySelector(".hidden-cms-variants");
const mainControlsInput = cms.querySelector(".main-controls__input");
const inputMainControlsInput = cms.querySelector(
  ".main-controls__input input[type=text]"
);
const selectCms = hiddenCmsVariants.querySelector("select");

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
  percentValue: 0,
  wordPressValue: 0,
  invalid: false,

  init: function () {
    this.addTitle();

    handlerBtnStart.addEventListener("click", this.start.bind(this));

    inputRange.addEventListener("input", this.getRollBack.bind(this));
    screenBtnPlus.addEventListener("click", this.addScreenBlock.bind(this));
    checkBoxCms.addEventListener("change", this.addCms.bind(this));
    selectCms.addEventListener(
      "change",
      this.mainControlsInputDisplay.bind(this)
    );
    mainControlsInput.addEventListener(
      "change",
      this.addPricePercent.bind(this)
    );
    handlerBtnReset.addEventListener("click", this.reset.bind(this));
  },
  addTitle: function () {
    document.title = headerTitle.textContent;
  },

  start: function () {
    this.checkFields();

    if (!this.invalid) {
      this.addScreens();
      this.addServices();
      this.addPrice();
      this.showResult();
      this.handlerBtnStartClick();

      this.addDisabledScreens();
      this.addDisabledCheckBox();

      //this.logger();
    }
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num) && isFinite(num));
  },

  checkFields: function () {
    screens = document.querySelectorAll(".screen"); // важно обновлять список проверяемых элементов
    this.invalid = false;
    screens.forEach((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");

      if (select.value.trim() === "" || input.value.trim() === "") {
        this.invalid = true;
      }
    });
  },

  handlerBtnStartClick: function () {
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

      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });

    console.log(this.screens);
  },

  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },

  getRollBack: function () {
    spanRange.textContent = inputRange.value + " %";
    this.rollback = inputRange.value;
  },

  addDisabledScreens: function () {
    screens = document.querySelectorAll(".screen");

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
    checkBoxCms.disabled = "true";
    selectCms.disabled = "true";
    inputMainControlsInput.disabled = "true";
    inputRange.disabled = "true";
  },
  addCms: function () {
    if (checkBoxCms.checked) {
      hiddenCmsVariants.style.display = "flex";
    } else {
      hiddenCmsVariants.style.display = "none";
      mainControlsInput.style.display = "none";
      selectCms.value = "";
      this.wordPressValue = 0;
      this.percentValue = 0;
    }
  },
  mainControlsInputDisplay: function () {
    if (selectCms.selectedIndex !== 2) {
      mainControlsInput.style.display = "none";
      this.wordPressValue = 0;
      this.percentValue = 0;
    }
    if (selectCms.selectedIndex === 2) {
      mainControlsInput.style.display = "flex";
    }
    if (selectCms.selectedIndex === 1) {
      this.wordPressValue = selectCms.options[1].value;
    }
  },
  addPricePercent: function () {
    if (selectCms.selectedIndex === 2) {
      if (this.isNumber(inputMainControlsInput.value)) {
        this.wordPressValue = 0;
        this.percentValue = inputMainControlsInput.value;
      }
    }
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
      this.screenPrice +
      this.servicePricesNumber +
      this.servicePricesPercent +
      (this.screenPrice +
        this.servicePricesNumber +
        this.servicePricesPercent) *
        (this.percentValue / 100) +
      (this.screenPrice +
        this.servicePricesNumber +
        this.servicePricesPercent) *
        (+this.wordPressValue / 100);

    this.screenCount = this.screens.reduce((sum, item) => {
      return sum + item.count;
    }, 0);

    this.servicePercentPrice = Math.ceil(
      this.fullPrice - this.fullPrice * (this.rollback / 100)
    );
  },
  reset: function () {
    this.handlerBtnResetClick();
    this.resetCms();
    this.checkBoxDisabledFalse();
    this.deleteDisabledScreens();
    this.resetShowResult();
    this.resetRollBack();
    this.resetTotal();
  },
  handlerBtnResetClick: function () {
    handlerBtnStart.style.display = "flex";
    handlerBtnReset.style.display = "none";
  },
  resetCms: function () {
    hiddenCmsVariants.style.display = "none";
    mainControlsInput.style.display = "none";
    selectCms.value = "";
    selectCms.disabled = "";
    inputMainControlsInput.value = "";
    inputMainControlsInput.disabled = "";
  },
  checkBoxDisabledFalse: function () {
    checkBox.forEach((e) => {
      e.disabled = "";
      e.checked = "";
    });
  },
  deleteDisabledScreens: function () {
    screens = document.querySelectorAll(".screen");

    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");

      input.disabled = "";
      select.disabled = "";
      if (index !== 0) {
        screen.remove();
      }
      select.value = "";
      input.value = "";
    });
    screenBtnPlus.style.display = "flex";
    screens = document.querySelectorAll(".screen");
  },
  resetShowResult: function () {
    totalInputTotal.value = 0;
    totalInputCountOther.value = 0;
    totalInputFullCount.value = 0;
    totalInputTotalCountRollback.value = 0;
    totalInputCount.value = 0;
  },
  resetRollBack: function () {
    inputRange.value = 0;
    spanRange.textContent = inputRange.value + " %";
    this.rollback = inputRange.value;
    inputRange.disabled = "";
  },
  resetTotal: function () {
    this.screens = [];
    this.screenPrice = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.rollback = 0;
    this.screenCount = 0;
    this.percentValue = 0;
    this.wordPressValue = 0;
  },
  logger: function () {
    console.log(this.fullPrice);
    console.log(this.servicePercentPrice);
    console.log(this.screens);
    console.log(this.services);
  },
};

appData.init();
