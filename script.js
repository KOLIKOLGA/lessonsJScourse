let title = "Калькулятор верстки";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 1000;
let rollback = 25;
let fullPrice = 10000;
let adaptive = true;

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
