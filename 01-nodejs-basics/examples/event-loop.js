// event-loop.js - Demo Event Loop trong Node.js
console.log('🚀 Bắt đầu demo Event Loop');

// Immediate callback
setImmediate(() => {
  console.log('3️⃣ setImmediate - chạy trong check phase');
});

// Timeout với delay 0
setTimeout(() => {
  console.log('2️⃣ setTimeout - chạy trong timers phase');
}, 0);

// Next tick callback (ưu tiên cao nhất)
process.nextTick(() => {
  console.log('1️⃣ nextTick - chạy sau mỗi phase');
});

// Microtask (Promise)
Promise.resolve().then(() => {
  console.log('🔄 Promise - chạy sau nextTick');
});

// Sync code
console.log('✅ Sync code - chạy ngay lập tức');

// Thêm một ví dụ phức tạp hơn
setTimeout(() => {
  console.log('\n--- Ví dụ phức tạp ---');
  process.nextTick(() => {
    console.log('NextTick trong setTimeout');
  });
  
  Promise.resolve().then(() => {
    console.log('Promise trong setTimeout');
  });
}, 10);

console.log('🏁 Kết thúc sync code');

// Kết quả mong đợi:
// 1. Sync code chạy trước
// 2. NextTick
// 3. Promise
// 4. setTimeout
// 5. setImmediate 