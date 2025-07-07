# 🛠️ Hướng Dẫn Setup Node.js Learning Roadmap

## 📋 Mục Lục
- [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
- [Cài Đặt Node.js](#cài-đặt-nodejs)
- [Cài Đặt Công Cụ Hỗ Trợ](#cài-đặt-công-cụ-hỗ-trợ)
- [Thiết Lập IDE](#thiết-lập-ide)
- [Kiểm Tra Setup](#kiểm-tra-setup)
- [Chạy Bài Học Đầu Tiên](#chạy-bài-học-đầu-tiên)
- [Khắc Phục Sự Cố](#khắc-phục-sự-cố)

## 💻 Yêu Cầu Hệ Thống

### Hệ Điều Hành:
- ✅ Windows 10/11
- ✅ macOS 10.15+
- ✅ Linux (Ubuntu 18.04+, CentOS 7+)

### Phần Cứng:
- 🧠 RAM: Tối thiểu 4GB (khuyến nghị 8GB+)
- 💾 Ổ cứng: Tối thiểu 10GB dung lượng trống
- 🖥️ CPU: Dual-core 2.0GHz+

## 🚀 Cài Đặt Node.js

### Cách 1: Tải từ Website Chính Thức (Khuyến nghị)

1. **Truy cập trang chủ Node.js**
   ```
   https://nodejs.org/
   ```

2. **Tải version LTS (Long Term Support)**
   - Chọn phiên bản LTS (ví dụ: 18.x.x LTS)
   - Tránh version Current (có thể không ổn định)

3. **Cài đặt**
   - **Windows**: Chạy file `.msi` và làm theo hướng dẫn
   - **macOS**: Chạy file `.pkg` và làm theo hướng dẫn
   - **Linux**: Xem hướng dẫn chi tiết bên dưới

### Cách 2: Sử dụng Package Manager

#### Windows (với Chocolatey):
```powershell
# Cài đặt Chocolatey trước (nếu chưa có)
Set-ExecutionPolicy Bypass -Scope Process -Force
iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Cài đặt Node.js
choco install nodejs
```

#### macOS (với Homebrew):
```bash
# Cài đặt Homebrew trước (nếu chưa có)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Cài đặt Node.js
brew install node
```

#### Linux (Ubuntu/Debian):
```bash
# Cập nhật package list
sudo apt update

# Cài đặt Node.js và npm
sudo apt install nodejs npm

# Hoặc cài version mới nhất
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## 🔧 Cài Đặt Công Cụ Hỗ Trợ

### 1. Cài Đặt Global Packages
```bash
# Nodemon - Tự động restart khi có thay đổi
npm install -g nodemon

# npm-check-updates - Cập nhật dependencies
npm install -g npm-check-updates

# Live Server - Chạy server đơn giản
npm install -g live-server

# PM2 - Process manager (sẽ dùng trong bài deployment)
npm install -g pm2
```

### 2. Cài Đặt Git (Nếu chưa có)
```bash
# Windows
choco install git

# macOS
brew install git

# Linux
sudo apt install git
```

## 📝 Thiết Lập IDE

### VS Code (Khuyến nghị)

1. **Tải VS Code**
   ```
   https://code.visualstudio.com/
   ```

2. **Cài đặt Extensions cần thiết**
   
   Mở VS Code và cài đặt các extensions sau:
   
   ```
   - Node.js Extension Pack
   - ESLint
   - Prettier - Code formatter
   - REST Client
   - Thunder Client
   - Auto Rename Tag
   - Bracket Pair Colorizer
   - GitLens
   - Material Icon Theme
   - Dracula Official (theme)
   ```

3. **Cấu hình VS Code**
   
   Tạo file `.vscode/settings.json` trong thư mục project:
   ```json
   {
     "editor.fontSize": 14,
     "editor.tabSize": 2,
     "editor.insertSpaces": true,
     "editor.formatOnSave": true,
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     },
     "emmet.includeLanguages": {
       "javascript": "javascriptreact"
     },
     "files.autoSave": "afterDelay",
     "terminal.integrated.fontSize": 14
   }
   ```

### Cấu Hình Terminal

#### Windows:
```powershell
# Sử dụng PowerShell hoặc Command Prompt
# Hoặc cài đặt Windows Terminal (khuyến nghị)
```

#### macOS/Linux:
```bash
# Sử dụng Terminal mặc định
# Hoặc cài đặt Oh My Zsh để có trải nghiệm tốt hơn
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## ✅ Kiểm Tra Setup

### 1. Kiểm tra Node.js và npm
```bash
# Kiểm tra version Node.js
node --version
# Kết quả mong đợi: v18.x.x hoặc cao hơn

# Kiểm tra version npm
npm --version
# Kết quả mong đợi: 8.x.x hoặc cao hơn

# Kiểm tra đường dẫn cài đặt
which node
# Windows: where node

# Kiểm tra global packages
npm list -g --depth=0
```

### 2. Kiểm tra Git
```bash
git --version
# Kết quả mong đợi: git version 2.x.x
```

### 3. Chạy Test Script
Tạo file `test-setup.js`:
```javascript
// test-setup.js
console.log('✅ Node.js đang hoạt động!');
console.log('📌 Version:', process.version);
console.log('💻 Platform:', process.platform);
console.log('🏠 Home:', require('os').homedir());

// Test ES6 features
const testES6 = () => {
  console.log('✅ ES6 Arrow Functions hoạt động!');
};

testES6();

// Test async/await
const testAsync = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('✅ Async/Await hoạt động!');
      resolve();
    }, 100);
  });
};

testAsync().then(() => {
  console.log('🎉 Setup hoàn tất!');
});
```

Chạy test:
```bash
node test-setup.js
```

## 🎯 Chạy Bài Học Đầu Tiên

### 1. Clone hoặc Navigate đến thư mục
```bash
# Nếu bạn có git repository
git clone <repository-url>
cd nodejs-learning-roadmap

# Hoặc navigate đến thư mục đã tạo
cd nodejs-learning-roadmap
```

### 2. Chạy bài học đầu tiên
```bash
# Chạy hello world
node 01-nodejs-basics/examples/hello.js

# Chạy event loop demo
node 01-nodejs-basics/examples/event-loop.js

# Chạy process demo
node 01-nodejs-basics/examples/process-demo.js
```

### 3. Thử các bài tập
```bash
# Bài tập 1: System Info
node 01-nodejs-basics/exercises/system-info.js

# Bài tập 2: Calculator
node 01-nodejs-basics/exercises/calculator.js 10 + 5

# Bài tập 3: Timer
node 01-nodejs-basics/exercises/timer.js 10
```

## 🔧 Khắc Phục Sự Cố

### Lỗi thường gặp:

#### 1. "node: command not found"
```bash
# Kiểm tra PATH
echo $PATH

# Thêm Node.js vào PATH (Linux/macOS)
export PATH=$PATH:/usr/local/bin

# Windows: Thêm vào Environment Variables
```

#### 2. "Permission denied" (Linux/macOS)
```bash
# Cài đặt Node.js với quyền user
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Thêm vào ~/.bashrc hoặc ~/.zshrc
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
```

#### 3. "npm ERR! EACCES"
```bash
# Sửa lỗi permissions cho npm
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

#### 4. Version Node.js cũ
```bash
# Gỡ cài đặt version cũ
sudo apt remove nodejs npm  # Linux
brew uninstall node        # macOS

# Cài đặt lại version mới
```

### Công cụ hỗ trợ debug:

#### 1. Kiểm tra cấu hình npm
```bash
npm config list
npm config get prefix
npm config get registry
```

#### 2. Clear npm cache
```bash
npm cache clean --force
```

#### 3. Reinstall npm
```bash
npm install -g npm@latest
```

## 🆘 Hỗ Trợ

### Nếu gặp vấn đề:
1. **Kiểm tra lại các bước setup**
2. **Tìm kiếm lỗi trên Google với từ khóa chính xác**
3. **Tham khảo documentation chính thức**
4. **Hỏi trên Stack Overflow hoặc Reddit**

### Tài liệu tham khảo:
- [Node.js Official Documentation](https://nodejs.org/docs/)
- [npm Documentation](https://docs.npmjs.com/)
- [VS Code Documentation](https://code.visualstudio.com/docs)

---

## 🎉 Xin Chúc Mừng!

Bạn đã setup thành công môi trường Node.js! 🚀

**Bước tiếp theo:**
1. Đọc `README.md` để hiểu roadmap
2. Bắt đầu với `01-nodejs-basics/`
3. Làm các bài tập theo thứ tự
4. Thực hành thường xuyên

**Chúc bạn học tập vui vẻ!** 💪✨ 