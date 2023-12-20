let title = "Калькулятор верстки";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 1000;
let rollback = 25;
let fullPrice = 10000;
let adaptive = true;

//alert("Hello friend! How are you?");
console.log("Hello world!!!");
//1)
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
//2)
console.log(screens.length);
let concot = "Стоимость верстки экранов " + screenPrice + " $";
console.log(concot);
concot = "Стоимость разработки сайта " + fullPrice + " $";
console.log(concot);
console.log(screens.toLowerCase());
console.log(screens.split(", "));
console.log(fullPrice * (rollback / 100));
