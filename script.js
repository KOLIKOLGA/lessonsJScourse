let title = prompt("Как называется Ваш проект?", " КалЬкуляТор веРстки");
let screens = prompt(
  "Какие типы экранов нужно разработать?",
  "Простые, Сложные, Интерактивные"
);
let screenPrice = +prompt("Сколько будет стоить данная работа", "20000");
let adaptive = confirm("Нужен ли адаптив на сайте");
let service1 = prompt("Какой дополнительный тип услуги нужен?", "Каталог");
let servicePrice1 = +prompt("Сколько это будет стоить?", "11000");
let service2 = prompt("Какой дополнительный тип услуги нужен?", "Каталог");
let servicePrice2 = +prompt("Сколько это будет стоить?", "11000");
let rollback = 10;
let fullPrice;
let servicePercentPrice;
let allServicePrices;

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getAllServicePrices = function () {
  return servicePrice1 + servicePrice2;
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
console.log("Стоимость разработки сайта " + getFullPrice() + " руб");
console.log(screens.toLowerCase());
console.log(screens.split(", "));
console.log(fullPrice + " руб");
console.log(servicePercentPrice + " руб");
console.log(getRollbackMessage(fullPrice));
