// process-demo.js - Demo làm việc với process
console.log('=== THÔNG TIN PROCESS ===');
console.log('Process ID:', process.pid);
console.log('Parent Process ID:', process.ppid);
console.log('Node Version:', process.version);
console.log('Platform:', process.platform);
console.log('Architecture:', process.arch);
console.log('Working Directory:', process.cwd());
console.log('Executable Path:', process.execPath);

// Environment variables
console.log('\n=== ENVIRONMENT VARIABLES ===');
console.log('NODE_ENV:', process.env.NODE_ENV || 'không được set');
console.log('PATH:', process.env.PATH ? 'Có PATH' : 'Không có PATH');
console.log('HOME:', process.env.HOME || process.env.USERPROFILE);

// Command line arguments
console.log('\n=== COMMAND LINE ARGUMENTS ===');
console.log('Arguments:', process.argv);
console.log('Script name:', process.argv[1]);
if (process.argv.length > 2) {
  console.log('User arguments:', process.argv.slice(2));
} else {
  console.log('Không có arguments nào từ user');
}

// Memory usage
console.log('\n=== MEMORY USAGE ===');
const memoryUsage = process.memoryUsage();
console.log('RSS (Resident Set Size):', Math.round(memoryUsage.rss / 1024 / 1024), 'MB');
console.log('Heap Total:', Math.round(memoryUsage.heapTotal / 1024 / 1024), 'MB');
console.log('Heap Used:', Math.round(memoryUsage.heapUsed / 1024 / 1024), 'MB');
console.log('External:', Math.round(memoryUsage.external / 1024 / 1024), 'MB');

// CPU usage
console.log('\n=== CPU USAGE ===');
const startUsage = process.cpuUsage();
// Tạo một tác vụ nặng để test CPU
for (let i = 0; i < 100000; i++) {
  Math.random();
}
const endUsage = process.cpuUsage(startUsage);
console.log('CPU User Time:', endUsage.user, 'microseconds');
console.log('CPU System Time:', endUsage.system, 'microseconds');

// Event listeners
console.log('\n=== EVENT LISTENERS ===');
console.log('Đang lắng nghe sự kiện...');

// Lắng nghe sự kiện exit
process.on('exit', (code) => {
  console.log(`\n👋 Process đang thoát với mã: ${code}`);
});

// Lắng nghe SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  console.log('\n⚠️  Nhận tín hiệu SIGINT (Ctrl+C)');
  console.log('Đang thoát một cách graceful...');
  process.exit(0);
});

// Lắng nghe uncaught exception
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message);
  process.exit(1);
});

// Lắng nghe unhandled promise rejection
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Promise Rejection:', reason);
  process.exit(1);
});

console.log('\n✅ Demo hoàn tất. Nhấn Ctrl+C để thoát.');
console.log('💡 Thử chạy: node process-demo.js arg1 arg2 arg3');

// Giữ process chạy
setInterval(() => {
  // Do nothing, chỉ để process không thoát
}, 1000); 