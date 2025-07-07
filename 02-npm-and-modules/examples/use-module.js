// use-module.js - Sử dụng module đã tạo
const math = require('./math-module');

// Destructuring
const { add, subtract } = require('./math-module');

console.log('=== SỬ DỤNG MODULE ===');
console.log('5 + 3 =', math.add(5, 3));
console.log('10 - 4 =', subtract(10, 4));
console.log('6 * 7 =', math.multiply(6, 7));
console.log('15 / 3 =', math.divide(15, 3));
console.log('10 / 0 =', math.divide(10, 0)); 