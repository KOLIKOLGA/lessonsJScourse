let title = prompt("Как называется Ваш проект?", "Калькулятор верстки");
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
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));

if (fullPrice >= 30000) {
  console.log("Даем скидку в 10%");
} else if (fullPrice >= 15000 && fullPrice < 30000) {
  console.log("Даем скидку в 5%");
} else if (fullPrice > 0 && fullPrice < 15000) {
  console.log("Скидка не предусмотрена");
} else if (fullPrice < 0) {
  console.log("Что то пошло не так");
}

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log("Стоимость верстки экранов " + +screenPrice + " руб");

console.log("Стоимость разработки сайта " + +fullPrice + " руб");
console.log(screens.toLowerCase());
console.log(screens.split(", "));
console.log(fullPrice + " руб");
console.log(servicePercentPrice) + " руб";
