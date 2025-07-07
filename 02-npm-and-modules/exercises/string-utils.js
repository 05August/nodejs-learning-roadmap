// string-utils.js - Bài tập 1: Tạo module string utilities
// TODO: Tạo các functions xử lý string

const capitalize = (str) => {
  // TODO: Viết hoa chữ cái đầu
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const reverseString = (str) => {
  // TODO: Đảo ngược string
  return str.split('').reverse().join('');
};

const isPalindrome = (str) => {
  // TODO: Kiểm tra palindrome
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
};

const countWords = (str) => {
  // TODO: Đếm số từ
  return str.trim().split(/\s+/).filter(word => word.length > 0).length;
};

const truncate = (str, maxLength) => {
  // TODO: Cắt ngắn string
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
};

// Export module
module.exports = {
  capitalize,
  reverseString,
  isPalindrome,
  countWords,
  truncate
};

// Test the functions
if (require.main === module) {
  console.log('=== STRING UTILS TEST ===');
  console.log('capitalize("hello world"):', capitalize("hello world"));
  console.log('reverseString("hello"):', reverseString("hello"));
  console.log('isPalindrome("racecar"):', isPalindrome("racecar"));
  console.log('countWords("Hello world test"):', countWords("Hello world test"));
  console.log('truncate("Long text here", 10):', truncate("Long text here", 10));
} 