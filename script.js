let title = prompt("Как называется Ваш проект?", " КалЬкуляТор веРстки");
let screens = prompt(
  "Какие типы экранов нужно разработать?",
  "Простые, Сложные, Интерактивные"
);
let screenPrice = +prompt("Сколько будет стоить данная работа", "20000");
let rollback = 10;
let adaptive = confirm("Нужен ли адаптив на сайте");
let service1 = prompt("Какой дополнительный тип услуги нужен?", "Каталог");
let servicePrice1 = +prompt("Сколько это будет стоить?", "11000");
let service2 = prompt("Какой дополнительный тип услуги нужен?", "Каталог");
let servicePrice2 = +prompt("Сколько это будет стоить?", "11000");
let fullPrice;
let servicePercentPrice;
let allServicePrices;

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getAllServicePrices = function (ser1, ser2) {
  allServicePrices = ser1 + ser2;
  return allServicePrices;
};

function getFullPrice() {
  fullPrice = screenPrice + getAllServicePrices(servicePrice1, servicePrice2);
  return fullPrice;
}

const getServicePercentPrices = function () {
  servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));
  return servicePercentPrice;
};

const getTitle = function () {
  title = title.trim().toLowerCase();
  title = title[0].toUpperCase() + title.slice(1);
  return title;
};

const getRollbackMessage = function (price) {
  if (price >= 30000) {
    return "Даем скидку в 10%";
  } else if (price >= 15000 && price < 30000) {
    return "Даем скидку в 5%";
  } else if (price > 0 && price < 15000) {
    return "Скидка не предусмотрена";
  } else if (price < 0) {
    return "Что то пошло не так";
  }
};

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

// console.log(typeof title);
// console.log(typeof fullPrice);
// console.log(typeof adaptive);

console.log(screens.length);

console.log("Стоимость верстки экранов " + +screenPrice + " руб");
console.log("Стоимость разработки сайта " + getFullPrice() + " руб");
console.log(screens.toLowerCase());
console.log(screens.split(", "));
console.log(fullPrice + " руб");
console.log(getServicePercentPrices() + " руб");
console.log(getAllServicePrices(servicePrice1, servicePrice2));
console.log(getFullPrice());
console.log(getRollbackMessage(fullPrice));
console.log(getTitle());
