// file-operations.js - Ví dụ về file operations
const fs = require('fs');
const path = require('path');

// Tạo file test
const testFile = 'test-data.txt';
const testContent = 'Hello Node.js File System!\nThis is a test file.';

console.log('=== FILE OPERATIONS DEMO ===');

// 1. Write file (sync)
fs.writeFileSync(testFile, testContent);
console.log('✅ File written successfully');

// 2. Read file (sync)
const data = fs.readFileSync(testFile, 'utf8');
console.log('📄 File content:', data);

// 3. Check file exists
if (fs.existsSync(testFile)) {
  console.log('✅ File exists');
}

// 4. Get file stats
const stats = fs.statSync(testFile);
console.log('📊 File size:', stats.size, 'bytes');
console.log('📅 Created:', stats.birthtime);
console.log('📝 Modified:', stats.mtime);

// 5. Append to file
fs.appendFileSync(testFile, '\nAppended text');
console.log('✅ Text appended');

// 6. Read file (async)
fs.readFile(testFile, 'utf8', (err, data) => {
  if (err) {
    console.error('❌ Error reading file:', err);
    return;
  }
  console.log('📄 Async read result:', data);
});

// 7. Delete file after 2 seconds
setTimeout(() => {
  fs.unlinkSync(testFile);
  console.log('🗑️ File deleted');
}, 2000); 