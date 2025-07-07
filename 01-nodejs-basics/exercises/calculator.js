// calculator.js - Bài tập 2: Command Line Calculator
// Yêu cầu: Tạo máy tính từ command line
// Cách chạy: node calculator.js 10 + 5

// TODO: Lấy arguments từ command line
const args = process.argv.slice(2);

// TODO: Kiểm tra số lượng arguments
if (args.length !== 3) {
  console.log('❌ Sai cú pháp!');
  console.log('✅ Cách sử dụng: node calculator.js <số1> <phép tính> <số2>');
  console.log('📝 Ví dụ: node calculator.js 10 + 5');
  console.log('🔢 Phép tính hỗ trợ: +, -, *, /, %, **');
  process.exit(1);
}

// TODO: Parse arguments
const num1 = parseFloat(args[0]);
const operator = args[1];
const num2 = parseFloat(args[2]);

// TODO: Validate numbers
if (isNaN(num1) || isNaN(num2)) {
  console.log('❌ Lỗi: Vui lòng nhập số hợp lệ!');
  console.log('📝 Ví dụ: node calculator.js 10.5 + 2.3');
  process.exit(1);
}

// TODO: Validate operator
const validOperators = ['+', '-', '*', '/', '%', '**'];
if (!validOperators.includes(operator)) {
  console.log('❌ Lỗi: Phép tính không hợp lệ!');
  console.log('✅ Phép tính hỗ trợ:', validOperators.join(', '));
  process.exit(1);
}

// TODO: Perform calculation
let result;
let operatorName;

switch (operator) {
  case '+':
    result = num1 + num2;
    operatorName = 'cộng';
    break;
  case '-':
    result = num1 - num2;
    operatorName = 'trừ';
    break;
  case '*':
    result = num1 * num2;
    operatorName = 'nhân';
    break;
  case '/':
    if (num2 === 0) {
      console.log('❌ Lỗi: Không thể chia cho 0!');
      process.exit(1);
    }
    result = num1 / num2;
    operatorName = 'chia';
    break;
  case '%':
    if (num2 === 0) {
      console.log('❌ Lỗi: Không thể chia cho 0!');
      process.exit(1);
    }
    result = num1 % num2;
    operatorName = 'chia lấy dư';
    break;
  case '**':
    result = Math.pow(num1, num2);
    operatorName = 'lũy thừa';
    break;
  default:
    console.log('❌ Lỗi: Phép tính không được hỗ trợ!');
    process.exit(1);
}

// TODO: Display result
console.log('🧮 === CALCULATOR ===');
console.log(`📊 Phép tính: ${num1} ${operator} ${num2}`);
console.log(`📝 Mô tả: ${num1} ${operatorName} ${num2}`);
console.log(`✅ Kết quả: ${result}`);

// Bonus: Thêm thông tin chi tiết
if (operator === '/') {
  console.log(`🔢 Kết quả làm tròn: ${Math.round(result * 100) / 100}`);
}

if (operator === '**') {
  console.log(`📈 ${num1} mũ ${num2} = ${result}`);
}

// Bonus: Hiển thị thêm thông tin
console.log('\n📋 === THÔNG TIN THÊM ===');
console.log(`🔢 Kiểu dữ liệu kết quả: ${typeof result}`);
console.log(`🔢 Số có nguyên không: ${Number.isInteger(result) ? 'Có' : 'Không'}`);
console.log(`🔢 Số dương/âm: ${result > 0 ? 'Dương' : result < 0 ? 'Âm' : 'Bằng 0'}`);

// Bonus: Lưu lịch sử (nếu muốn)
const fs = require('fs');
const historyEntry = `${new Date().toISOString()}: ${num1} ${operator} ${num2} = ${result}\n`;

try {
  fs.appendFileSync('calculator-history.txt', historyEntry);
  console.log('📝 Đã lưu vào lịch sử: calculator-history.txt');
} catch (error) {
  console.log('⚠️  Không thể lưu lịch sử:', error.message);
}

// Cách chạy:
// node calculator.js 10 + 5
// node calculator.js 20 - 3
// node calculator.js 4 * 7
// node calculator.js 15 / 3
// node calculator.js 10 % 3
// node calculator.js 2 ** 8 