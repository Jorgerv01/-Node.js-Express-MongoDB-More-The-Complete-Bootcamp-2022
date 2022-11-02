// console.log(arguments);
// console.log(require("module").wrapper);

// MODULE.EXPORTS
const C = require("./test-module-1");

const calculator = new C();
console.log(calculator.add(3, 5));
console.log(calculator.multiply(3, 5));
console.log(calculator.divide(3, 5));

// EXPORTS

// const calculator2 = require("./test-module-2");
const { add, multiply, divide } = require("./test-module-2");

console.log(add(3, 5));
console.log(multiply(3, 5));
console.log(divide(15, 5));

// console.log(calculator2.add(2, 5));
// console.log(calculator2.multiply(2, 5));
// console.log(calculator2.divide(2, 5));

// CACHING
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
