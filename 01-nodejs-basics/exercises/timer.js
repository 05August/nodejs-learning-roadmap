// timer.js - Bài tập 3: Simple Timer
// Yêu cầu: Tạo timer đếm ngược
// Cách chạy: node timer.js 10

// TODO: Lấy argument từ command line
const args = process.argv.slice(2);

// TODO: Kiểm tra input
if (args.length !== 1) {
  console.log('❌ Sai cú pháp!');
  console.log('✅ Cách sử dụng: node timer.js <số giây>');
  console.log('📝 Ví dụ: node timer.js 10');
  process.exit(1);
}

// TODO: Parse và validate input
const seconds = parseInt(args[0]);

if (isNaN(seconds) || seconds <= 0) {
  console.log('❌ Lỗi: Vui lòng nhập số giây hợp lệ (số nguyên dương)!');
  console.log('📝 Ví dụ: node timer.js 30');
  process.exit(1);
}

// TODO: Validate reasonable range
if (seconds > 3600) {
  console.log('⚠️  Cảnh báo: Timer lớn hơn 1 giờ, bạn có chắc không?');
  console.log('💡 Nhấn Ctrl+C để hủy trong 5 giây...');
  
  let confirmSeconds = 5;
  const confirmInterval = setInterval(() => {
    process.stdout.write(`\r⏰ ${confirmSeconds} giây... `);
    confirmSeconds--;
    
    if (confirmSeconds < 0) {
      clearInterval(confirmInterval);
      console.log('\n✅ Bắt đầu timer...\n');
      startTimer(seconds);
    }
  }, 1000);
} else {
  startTimer(seconds);
}

// TODO: Hàm chính để chạy timer
function startTimer(totalSeconds) {
  let currentSeconds = totalSeconds;
  
  console.log(`⏰ Timer bắt đầu: ${totalSeconds} giây`);
  console.log('💡 Nhấn Ctrl+C để dừng\n');
  
  // Hiển thị tiến trình ban đầu
  displayProgress(currentSeconds, totalSeconds);
  
  // Tạo interval để đếm ngược
  const timerInterval = setInterval(() => {
    currentSeconds--;
    
    // Clear dòng trước và hiển thị tiến trình mới
    process.stdout.write('\r');
    displayProgress(currentSeconds, totalSeconds);
    
    // Kiểm tra khi hoàn thành
    if (currentSeconds <= 0) {
      clearInterval(timerInterval);
      console.log('\n\n🎉 Timer đã hoàn thành!');
      console.log('✅ Thời gian đã hết!');
      
      // Bonus: Âm thanh thông báo (nếu có thể)
      console.log('\a'); // Bell sound
      
      // Bonus: Thống kê
      const endTime = new Date();
      console.log(`📊 Thời gian kết thúc: ${endTime.toLocaleTimeString('vi-VN')}`);
      
      process.exit(0);
    }
  }, 1000);
  
  // Lắng nghe Ctrl+C để dừng timer
  process.on('SIGINT', () => {
    clearInterval(timerInterval);
    console.log('\n\n⏸️  Timer đã bị dừng!');
    console.log(`⏰ Thời gian còn lại: ${currentSeconds} giây`);
    console.log(`📊 Đã trôi qua: ${totalSeconds - currentSeconds} giây`);
    process.exit(0);
  });
}

// TODO: Hàm hiển thị tiến trình
function displayProgress(current, total) {
  const percentage = ((total - current) / total) * 100;
  const progressBarLength = 20;
  const filledLength = Math.round((progressBarLength * percentage) / 100);
  const emptyLength = progressBarLength - filledLength;
  
  const progressBar = '█'.repeat(filledLength) + '░'.repeat(emptyLength);
  const timeFormatted = formatTime(current);
  
  process.stdout.write(`⏰ ${timeFormatted} [${progressBar}] ${percentage.toFixed(1)}%`);
}

// TODO: Hàm format thời gian
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}

// Bonus: Hiển thị thông tin khi bắt đầu
console.log('⏰ === SIMPLE TIMER ===');
console.log(`🚀 Khởi động timer cho ${args[0]} giây`);
console.log(`📅 Thời gian bắt đầu: ${new Date().toLocaleTimeString('vi-VN')}`);
console.log(`🎯 Thời gian kết thúc dự kiến: ${new Date(Date.now() + parseInt(args[0]) * 1000).toLocaleTimeString('vi-VN')}`);
console.log('─'.repeat(50));

// Cách chạy:
// node timer.js 10
// node timer.js 60
// node timer.js 300 