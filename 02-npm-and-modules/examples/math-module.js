// math-module.js - Ví dụ về CommonJS modules
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b !== 0 ? a / b : 'Cannot divide by zero';

// Export nhiều functions
module.exports = {
  add,
  subtract,
  multiply,
  divide
};

// Hoặc export từng function riêng
// module.exports.add = add;
// module.exports.subtract = subtract; 