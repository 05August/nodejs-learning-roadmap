// npm-packages.js - Sử dụng external packages
// Cần chạy: npm install lodash moment chalk

const _ = require('lodash');
const moment = require('moment');
const chalk = require('chalk');

console.log(chalk.blue('=== NPM PACKAGES DEMO ==='));

// Lodash utilities
const numbers = [1, 2, 3, 4, 5];
console.log('Original:', numbers);
console.log('Sum:', _.sum(numbers));
console.log('Max:', _.max(numbers));
console.log('Shuffled:', _.shuffle(numbers));

// Moment.js for dates
console.log('\n' + chalk.green('=== DATE FORMATTING ==='));
const now = moment();
console.log('Current time:', now.format('YYYY-MM-DD HH:mm:ss'));
console.log('From now:', now.fromNow());
console.log('Add 7 days:', now.add(7, 'days').format('YYYY-MM-DD'));

// Chalk for colored output
console.log('\n' + chalk.red('Red text'));
console.log(chalk.green('Green text'));
console.log(chalk.yellow.bold('Bold yellow text'));
console.log(chalk.blue.underline('Underlined blue text')); 