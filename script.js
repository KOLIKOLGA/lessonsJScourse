let title = prompt("Как называется Ваш проект?", "Калькулятор верстки");
let screens = prompt(
  "Какие типы экранов нужно разработать?",
  "Простые, Сложные, Интерактивные"
);
let screenPrice = prompt("Сколько будет стоить данная работа", "12000");
let rollback = 25;
let fullPrice = 10000;
let adaptive = confirm("Нужен ли адаптив на сайте");
let service1 = prompt("Какой дополнительный тип услуги нужен?", "Каталог");
let servicePrice1 = prompt("Сколько это будет стоить?", "1000");
let service2 = prompt("Какой дополнительный тип услуги нужен?", "Каталог");
let servicePrice2 = prompt("Сколько это будет стоить?", "1000");

console.log("Hello world!!!");

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log("Стоимость верстки экранов " + screenPrice + " $");

console.log("Стоимость разработки сайта " + fullPrice + " $");
console.log(screens.toLowerCase());
console.log(screens.split(", "));
console.log(fullPrice * (rollback / 100));
