# 📚 Bài 1: Node.js Basics

## 🎯 Mục Tiêu Học Tập

Sau khi hoàn thành bài học này, bạn sẽ:
- Hiểu Node.js là gì và tại sao sử dụng
- Nắm được cách hoạt động của V8 Engine và Event Loop
- Sử dụng được các Global Objects cơ bản
- Hiểu và áp dụng Callback Pattern

## ❓ Câu Hỏi Trọng Tâm

Sau khi học xong bài này, bạn phải trả lời được:

🔍 **Câu hỏi cơ bản:**


1. Node.js khác gì với JavaScript chạy trên browser?
- Khác về môi trường (nodejs chạy trên server còn js chạy trên browser ở client).
- Có các api hỗ trợ khác nhau.
- Khác nhau về mục đích sử dụng.
2. Tại sao Node.js được gọi là "non-blocking I/O"?
- Xử lý các tác vụ i/o(đọc file truy vấn csdl, call api) theo kiểu bất đồng bộ(asynchronous)
- Thay vì chờ một tác vụ hoàn thành mới tiếp tục, Node.js sử dụng callback, Promise, hoặc async/await để xử lý sau khi I/O hoàn tất.
- Nhờ đó, event loop của Node.js vẫn tiếp tục xử lý các yêu cầu khác mà không bị chặn.


👉 Điều này giúp Node.js hiệu quả và nhanh khi xử lý nhiều kết nối cùng lúc.


3. Event Loop hoạt động như thế nào?
- Call Stack: Nơi chứa các hàm đang được thực thi.
- Callback Queue: Nơi chứa các hàm callback chờ được xử lý (ví dụ: từ I/O, setTimeout...).
- Event Loop liên tục kiểm tra nếu Call Stack rỗng thì sẽ đưa callback từ Queue vào Stack để thực thi.

🔍 **Câu hỏi nâng cao:**
1. Callback Pattern giải quyết vấn đề gì?
- Callback pattern giúp xử lý tác vụ bất đồng bộ mà không chặn chương trình. Thay vì chờ kết quả, nó dùng hàm callback để xử lý sau khi hoàn thành. Nhược điểm: dễ gây callback hell nếu lồng nhiều.
2. Khi nào nên sử dụng `process.nextTick()`?
- Nên dùng process.nextTick() khi bạn muốn trì hoãn việc thực thi một hàm đến ngay sau khi vòng lặp hiện tại (event loop) kết thúc, nhưng trước khi các tác vụ async khác (như setTimeout, I/O...) chạy.
3. Tại sao Node.js phù hợp cho việc xây dựng API?
- Xử lý bất đồng bộ (Non-blocking I/O, Cho phép xử lý hàng ngàn request đồng thời mà không chặn luồng chính, Phù hợp với các API cần đọc/ghi CSDL, gọi dịch vụ ngoài (I/O nhiều)) 
- Hiệu suất cao với Event Loop (Mô hình event-driven giúp xử lý nhiều kết nối một cách nhẹ và hiệu quả, đặc biệt là RESTful API hoặc WebSocket.)
- Dễ phát triển với JavaScript
- Hệ sinh thái mạnh (npm)
- Dễ mở rộng theo chiều ngang (Phù hợp với kiến trúc microservices hoặc serverless (chia nhỏ API theo chức năng))

🔍 **Câu hỏi thực hành:**
1. Làm thế nào để xử lý command line arguments?
- Dùng process.argv để đọc đối số, hoặc thư viện như minimist để parse dễ hơn.
2. Cách lắng nghe và xử lý system events?
- process object – Dùng để lắng nghe các sự kiện hệ thống
- EventEmitter – Tự tạo và lắng nghe custom events (nội bộ app)
3. Pháp biệt giữa `setTimeout` và `setImmediate`?
- setTimeout(fn, 0) chạy sau ít nhất 0ms, sau khi các phase khác của event loop xong.
- setImmediate(fn) chạy ngay ở phase check tiếp theo, thường nhanh hơn setTimeout(0).
- setImmediate ưu tiên hơn và chạy sớm hơn setTimeout(0).

## 📖 Lý Thuyết

### 1. Node.js là gì?

Node.js là một JavaScript runtime được xây dựng trên V8 JavaScript engine của Chrome. Nó cho phép chạy JavaScript bên ngoài trình duyệt, chủ yếu để xây dựng các ứng dụng server-side.

**Đặc điểm chính:**
- **Non-blocking I/O**: Không bị chặn khi thực hiện các tác vụ I/O
- **Event-driven**: Dựa trên sự kiện
- **Single-threaded**: Chạy trên một thread chính
- **Cross-platform**: Hoạt động trên nhiều hệ điều hành

### 2. V8 Engine và Event Loop

**V8 Engine**: Là JavaScript engine mã nguồn mở của Google, biên dịch JavaScript thành machine code.

**Event Loop**: Cơ chế xử lý các sự kiện và callback functions trong Node.js.

```
┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

### 3. Global Objects

Node.js cung cấp một số global objects:

- `global`: Đối tượng global (tương tự `window` trong browser)
- `process`: Thông tin về process hiện tại
- `console`: Để in ra console
- `setTimeout`, `setInterval`: Timer functions
- `__dirname`: Đường dẫn thư mục hiện tại
- `__filename`: Đường dẫn file hiện tại

### 4. Callback Pattern

Callback là một function được truyền vào một function khác và được gọi khi tác vụ hoàn thành.

```javascript
// Callback pattern
function asyncOperation(callback) {
  setTimeout(() => {
    callback(null, 'Kết quả thành công');
  }, 1000);
}

asyncOperation((error, result) => {
  if (error) {
    console.error('Lỗi:', error);
  } else {
    console.log('Kết quả:', result);
  }
});
```

## 💻 Ví Dụ Thực Tế

### Ví dụ 1: Hello World
```javascript
// hello.js
console.log('Chào mừng bạn đến với Node.js!');
console.log('Node.js version:', process.version);
console.log('Platform:', process.platform);
```

### Ví dụ 2: Làm việc với Process
```javascript
// process-info.js
console.log('=== THÔNG TIN PROCESS ===');
console.log('Process ID:', process.pid);
console.log('Node Version:', process.version);
console.log('Platform:', process.platform);
console.log('Working Directory:', process.cwd());
console.log('Environment:', process.env.NODE_ENV || 'development');

// Lắng nghe sự kiện thoát
process.on('exit', (code) => {
  console.log(`Process thoát với mã: ${code}`);
});

// Lắng nghe SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  console.log('Đã nhận SIGINT. Thoát gracefully...');
  process.exit(0);
});
```

### Ví dụ 3: Event Loop Demo
```javascript
// event-loop.js
console.log('Bắt đầu');

// Immediate
setImmediate(() => {
  console.log('setImmediate');
});

// Timeout
setTimeout(() => {
  console.log('setTimeout');
}, 0);

// Next tick
process.nextTick(() => {
  console.log('nextTick');
});

// Microtask
Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('Kết thúc');
```

## 🚀 Bài Tập Thực Hành

### Bài Tập 1: System Information (Cơ bản)
Tạo file `system-info.js` hiển thị thông tin hệ thống:

**Yêu cầu:**
- Hiển thị thông tin CPU
- Hiển thị thông tin memory
- Hiển thị thông tin hệ điều hành
- Hiển thị thời gian uptime

**Gợi ý:**
```javascript
const os = require('os');

// Sử dụng các methods của os module
console.log('CPU:', os.cpus());
console.log('Memory:', os.totalmem(), os.freemem());
// ... thêm các thông tin khác
```

### Bài Tập 2: Command Line Calculator (Trung bình)
Tạo file `calculator.js` thực hiện tính toán từ command line:

**Yêu cầu:**
- Nhận input từ command line arguments
- Hỗ trợ các phép tính: +, -, *, /
- Xử lý lỗi khi input không hợp lệ
- Hiển thị kết quả hoặc thông báo lỗi

**Cách chạy:**
```bash
node calculator.js 10 + 5
node calculator.js 20 / 4
```

### Bài Tập 3: Simple Timer (Nâng cao)
Tạo file `timer.js` với các chức năng:

**Yêu cầu:**
- Đếm ngược từ số giây được chỉ định
- Hiển thị tiến trình đếm ngược
- Thông báo khi hoàn thành
- Có thể dừng timer bằng Ctrl+C

**Cách chạy:**
```bash
node timer.js 10  # Đếm ngược từ 10 giây
```

## 📝 Giải Pháp Mẫu

### Giải pháp Bài Tập 1:
```javascript
// system-info.js
const os = require('os');

console.log('=== THÔNG TIN HỆ THỐNG ===');
console.log('Hệ điều hành:', os.type(), os.release());
console.log('Kiến trúc:', os.arch());
console.log('Hostname:', os.hostname());
console.log('CPU cores:', os.cpus().length);
console.log('Total Memory:', (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), 'GB');
console.log('Free Memory:', (os.freemem() / 1024 / 1024 / 1024).toFixed(2), 'GB');
console.log('Uptime:', Math.floor(os.uptime() / 3600), 'giờ');
```

## 🎯 Kiểm Tra Kiến Thức

### Câu Hỏi:
1. Node.js khác gì với JavaScript chạy trên browser?
2. Event Loop hoạt động như thế nào?
3. Callback pattern có ưu nhược điểm gì?
4. Global objects nào thường được sử dụng nhất?

### Đáp Án:
1. Node.js chạy server-side, có thể truy cập file system, không có DOM/BOM
2. Event Loop xử lý callbacks theo thứ tự ưu tiên: nextTick > Promise > setTimeout > setImmediate
3. Ưu điểm: Đơn giản, không bị block. Nhược điểm: Callback hell, khó debug
4. `process`, `console`, `__dirname`, `__filename`, `global`

## 📚 Tài Liệu Tham Khảo

- [Node.js Official Documentation](https://nodejs.org/docs/)
- [Understanding Event Loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
- [Node.js Globals](https://nodejs.org/api/globals.html)

## ➡️ Bài Tiếp Theo

Sau khi hoàn thành bài này, chuyển sang **Bài 2: NPM và Modules** để học về package management và module system.

---

⏰ **Thời gian hoàn thành dự kiến**: 3-4 ngày
🎯 **Mức độ**: Cơ bản
📋 **Checklist hoàn thành**:
- [ ] Đọc và hiểu lý thuyết
- [ ] Chạy thử các ví dụ
- [ ] Hoàn thành 3 bài tập
- [ ] Trả lời câu hỏi kiểm tra 
