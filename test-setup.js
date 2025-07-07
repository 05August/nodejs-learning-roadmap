// test-setup.js - Kiểm tra setup môi trường Node.js
console.log('🚀 === KIỂM TRA SETUP NODE.JS ===\n');

// Kiểm tra Node.js version
console.log('📌 Node.js version:', process.version);
if (parseInt(process.version.slice(1)) >= 16) {
  console.log('✅ Node.js version hợp lệ (>=16)');
} else {
  console.log('❌ Node.js version quá cũ, vui lòng cập nhật lên version 16+');
}

// Kiểm tra platform
console.log('💻 Platform:', process.platform);
console.log('🏗️  Architecture:', process.arch);

// Kiểm tra memory
const totalMemory = process.memoryUsage();
console.log('🧠 Memory usage:');
console.log('  - RSS:', Math.round(totalMemory.rss / 1024 / 1024), 'MB');
console.log('  - Heap Total:', Math.round(totalMemory.heapTotal / 1024 / 1024), 'MB');
console.log('  - Heap Used:', Math.round(totalMemory.heapUsed / 1024 / 1024), 'MB');

// Kiểm tra current working directory
console.log('📁 Current directory:', process.cwd());

// Kiểm tra environment variables
console.log('🌍 Environment:');
console.log('  - NODE_ENV:', process.env.NODE_ENV || 'không được set');
console.log('  - PATH exists:', process.env.PATH ? '✅' : '❌');

// Test ES6 features
console.log('\n🔧 === KIỂM TRA JAVASCRIPT FEATURES ===');

// Arrow functions
const testArrow = () => {
  console.log('✅ Arrow functions hoạt động');
};
testArrow();

// Destructuring
const testObj = { a: 1, b: 2 };
const { a, b } = testObj;
console.log('✅ Destructuring hoạt động:', { a, b });

// Template literals
const name = 'Node.js';
console.log(`✅ Template literals hoạt động: Hello ${name}!`);

// Promises
const testPromise = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Promise resolved'), 100);
  });
};

// Async/await
const testAsync = async () => {
  try {
    const result = await testPromise();
    console.log('✅ Async/await hoạt động:', result);
  } catch (error) {
    console.log('❌ Async/await lỗi:', error.message);
  }
};

// Test modules
console.log('\n📦 === KIỂM TRA MODULES ===');

// Built-in modules
try {
  const fs = require('fs');
  const path = require('path');
  const os = require('os');
  const crypto = require('crypto');
  
  console.log('✅ fs module loaded');
  console.log('✅ path module loaded');
  console.log('✅ os module loaded');
  console.log('✅ crypto module loaded');
  
  // Test file system
  const testFile = 'test-temp.txt';
  fs.writeFileSync(testFile, 'Hello Node.js!');
  const content = fs.readFileSync(testFile, 'utf8');
  fs.unlinkSync(testFile);
  console.log('✅ File system operations hoạt động');
  
  // Test OS info
  console.log('✅ OS info - Free memory:', Math.round(os.freemem() / 1024 / 1024), 'MB');
  
  // Test crypto
  const hash = crypto.createHash('sha256').update('test').digest('hex');
  console.log('✅ Crypto operations hoạt động');
  
} catch (error) {
  console.log('❌ Module loading error:', error.message);
}

// Test event loop
console.log('\n⏰ === KIỂM TRA EVENT LOOP ===');

let eventLoopTest = 0;

// Test setTimeout
setTimeout(() => {
  eventLoopTest++;
  console.log('✅ setTimeout hoạt động');
}, 10);

// Test setImmediate
setImmediate(() => {
  eventLoopTest++;
  console.log('✅ setImmediate hoạt động');
});

// Test process.nextTick
process.nextTick(() => {
  eventLoopTest++;
  console.log('✅ process.nextTick hoạt động');
});

// Final check
setTimeout(() => {
  console.log('\n🎉 === KẾT QUẢ KIỂM TRA ===');
  
  if (eventLoopTest === 3) {
    console.log('✅ Event loop hoạt động hoàn hảo!');
  } else {
    console.log('⚠️  Event loop có vấn đề');
  }
  
  console.log('✅ Tất cả kiểm tra cơ bản đã hoàn thành!');
  console.log('🚀 Môi trường Node.js đã sẵn sàng!');
  console.log('\n📚 Bạn có thể bắt đầu học với:');
  console.log('   npm run lesson1');
  console.log('   npm run lesson1-examples');
  console.log('   npm run help');
  
}, 100);

// Test async function
testAsync(); 