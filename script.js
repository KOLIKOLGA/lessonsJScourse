let title;
let screens;
let screenPrice;
let adaptive;
let service1;
let servicePrice1;
let service2;
let servicePrice2;
let rollback = 10;
let fullPrice;
let servicePercentPrice;
let allServicePrices;

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const isNumber = function (num) {
  return !isNaN(parseFloat(num) && isFinite(num));
};

const asking = function () {
  title = prompt("Как называется Ваш проект?", "Калькулятор верстки");
  screens = prompt(
    "Какие типы экранов нужно разработать?",
    "Простые, Сложные, Интерактивные"
  );
  do {
    screenPrice = prompt("Сколько будет стоить данная работа");
  } while (
    !isNumber(screenPrice) ||
    screenPrice.trim() === "" ||
    screenPrice === null
  );
  screenPrice = Number(screenPrice);
  adaptive = confirm("Нужен ли адаптив на сайте");
};

const getAllServicePrices = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt("Какой дополнительный тип услуги нужен?");
      do {
        servicePrice1 = prompt("Сколько это будет стоить?");
      } while (
        !isNumber(servicePrice1) ||
        servicePrice1.trim() === "" ||
        servicePrice1 === null
      );
      sum += +servicePrice1;
    } else if (i === 1) {
      service2 = prompt("Какой дополнительный тип услуги нужен?");
      do {
        servicePrice2 = prompt("Сколько это будет стоить?");
      } while (
        !isNumber(servicePrice2) ||
        servicePrice1.trim() === "" ||
        servicePrice1 === null
      );
      sum += +servicePrice2;
    }
  }
  return sum;
};

function getFullPrice() {
  return screenPrice + allServicePrices;
}

const getServicePercentPrices = function () {
  return Math.ceil(fullPrice - fullPrice * (rollback / 100));
};

const getTitle = function () {
  return title.trim()[0].toUpperCase() + title.trim().substr(1).toLowerCase();
};

const getRollbackMessage = function (price) {
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
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(typeof title);
console.log(typeof screenPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " руб");
console.log("Стоимость разработки сайта " + fullPrice + " руб");
console.log(screens.toLowerCase());
console.log(screens.split(", "));
console.log(servicePercentPrice + " руб");
console.log(getRollbackMessage(fullPrice));
