// system-info.js - Bài tập 1: Hiển thị thông tin hệ thống
// Yêu cầu: Hiển thị thông tin CPU, memory, OS, uptime

// TODO: Import module os
const os = require('os');

console.log('=== THÔNG TIN HỆ THỐNG ===');

// TODO: Hiển thị thông tin hệ điều hành
console.log('Hệ điều hành:', os.type(), os.release());
console.log('Kiến trúc:', os.arch());
console.log('Hostname:', os.hostname());

// TODO: Hiển thị thông tin CPU
console.log('\n=== THÔNG TIN CPU ===');
const cpus = os.cpus();
console.log('Số lượng CPU cores:', cpus.length);
console.log('Model CPU:', cpus[0].model);
console.log('Tốc độ CPU:', cpus[0].speed, 'MHz');

// TODO: Hiển thị thông tin Memory
console.log('\n=== THÔNG TIN MEMORY ===');
const totalMemory = os.totalmem();
const freeMemory = os.freemem();
const usedMemory = totalMemory - freeMemory;

console.log('Total Memory:', (totalMemory / 1024 / 1024 / 1024).toFixed(2), 'GB');
console.log('Free Memory:', (freeMemory / 1024 / 1024 / 1024).toFixed(2), 'GB');
console.log('Used Memory:', (usedMemory / 1024 / 1024 / 1024).toFixed(2), 'GB');
console.log('Memory Usage:', ((usedMemory / totalMemory) * 100).toFixed(2), '%');

// TODO: Hiển thị thông tin Network
console.log('\n=== THÔNG TIN NETWORK ===');
const networkInterfaces = os.networkInterfaces();
Object.keys(networkInterfaces).forEach(interfaceName => {
  const interfaces = networkInterfaces[interfaceName];
  interfaces.forEach(interface => {
    if (interface.family === 'IPv4' && !interface.internal) {
      console.log(`${interfaceName}: ${interface.address}`);
    }
  });
});

// TODO: Hiển thị thông tin Uptime
console.log('\n=== THÔNG TIN UPTIME ===');
const uptime = os.uptime();
const hours = Math.floor(uptime / 3600);
const minutes = Math.floor((uptime % 3600) / 60);
const seconds = Math.floor(uptime % 60);

console.log(`System Uptime: ${hours}h ${minutes}m ${seconds}s`);

// TODO: Hiển thị thông tin User
console.log('\n=== THÔNG TIN USER ===');
const userInfo = os.userInfo();
console.log('Username:', userInfo.username);
console.log('Home Directory:', userInfo.homedir);
console.log('Shell:', userInfo.shell);

// TODO: Hiển thị thông tin Load Average (chỉ có trên Unix)
if (os.platform() !== 'win32') {
  console.log('\n=== LOAD AVERAGE ===');
  const loadAverage = os.loadavg();
  console.log('1 minute:', loadAverage[0].toFixed(2));
  console.log('5 minutes:', loadAverage[1].toFixed(2));
  console.log('15 minutes:', loadAverage[2].toFixed(2));
}

// Bonus: Hiển thị thông tin đẹp hơn
console.log('\n=== TỔNG KẾT ===');
console.log(`🖥️  ${os.hostname()} đang chạy ${os.type()} ${os.release()}`);
console.log(`💻 CPU: ${cpus[0].model} (${cpus.length} cores)`);
console.log(`🧠 RAM: ${(usedMemory / 1024 / 1024 / 1024).toFixed(2)}GB/${(totalMemory / 1024 / 1024 / 1024).toFixed(2)}GB`);
console.log(`⏰ Uptime: ${hours}h ${minutes}m ${seconds}s`);
console.log(`👤 User: ${userInfo.username}`);

// Cách chạy: node system-info.js 