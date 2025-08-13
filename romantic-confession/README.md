# 💕 浪漫表白工具

> 专为情人节设计的浪漫表白工具，为你和心爱的人创造美好回忆

## ✨ 功能特色

### 🎯 六大浪漫功能
1. **💖 爱心动画** - 浪漫的爱心特效和飘落花瓣
2. **💌 表白卡片** - 互动式滑动表白卡片体验
3. **🎮 爱情游戏** - 收集爱心的趣味小游戏
4. **📸 回忆相册** - 上传和管理美好照片回忆
5. **🎵 浪漫音乐** - 专属的爱情音乐播放器
6. **⚙️ 个性设置** - 自定义表白内容和主题

### 📱 移动端优化
- 🎯 专为iPhone优化的响应式设计
- 📲 PWA支持，可安装到主屏幕
- 🔄 离线缓存，随时随地表达爱意
- 📳 震动反馈增强互动体验
- 🎨 优雅的动画和过渡效果

### 💾 本地存储功能
- 📝 自定义表白消息保存
- 📷 照片本地存储和管理
- ⚙️ 个人设置持久化
- 🎵 音乐偏好记忆

## 🚀 快速开始

### 方法一：GitHub Pages部署（推荐）

1. **Fork 或下载项目**
   ```bash
   git clone https://github.com/yourusername/romantic-confession.git
   cd romantic-confession
   ```

2. **上传到你的GitHub仓库**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **开启GitHub Pages**
   - 进入仓库设置 → Pages
   - Source选择"Deploy from a branch"
   - Branch选择"main"，文件夹选择"/ (root)"
   - 保存设置

4. **获取链接**
   - 几分钟后访问: `https://yourusername.github.io/romantic-confession`
   - 生成二维码分享给女朋友

### 方法二：Vercel部署

1. **访问 [Vercel](https://vercel.com)**
2. **导入GitHub仓库**
3. **一键部署**
4. **获取自定义域名**

### 方法三：Netlify部署

1. **访问 [Netlify](https://netlify.com)**
2. **拖拽文件夹到部署区域**
3. **自动部署完成**

## 📦 本地运行

由于浏览器安全限制，直接打开HTML文件可能无法正常使用所有功能。建议使用本地服务器：

### 使用Python（推荐）
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### 使用Node.js
```bash
# 安装http-server
npm install -g http-server

# 启动服务器
http-server
```

### 使用PHP
```bash
php -S localhost:8000
```

然后访问 `http://localhost:8000`

## 🎨 个性化定制

### 1. 修改表白内容

编辑 `scripts/heart-animation.js` 中的文字：
```javascript
const loveMessages = [
    "我的心跳只为你",
    "遇见你是我最美的意外",
    // 添加你的专属情话
];
```

### 2. 自定义卡片内容

编辑 `scripts/love-cards.js` 中的卡片数据：
```javascript
const loveCardsData = [
    {
        icon: "💕",
        title: "初次相遇",
        back: "还记得第一次见到你的那个瞬间...",
        // 写下你们的专属回忆
    }
];
```

### 3. 添加背景音乐

将音乐文件放入 `assets/music/` 文件夹，并在HTML中引用：
```html
<audio id="backgroundMusic" loop>
    <source src="assets/music/your-song.mp3" type="audio/mpeg">
</audio>
```

### 4. 更换主题颜色

修改 `styles/main.css` 中的颜色变量：
```css
:root {
    --primary-color: #ff69b4;    /* 主色调 */
    --secondary-color: #ff1493;  /* 辅助色 */
    --accent-color: #ffc0cb;     /* 强调色 */
}
```

## 📱 PWA安装指南

### iPhone/iPad
1. 用Safari浏览器打开网站
2. 点击底部分享按钮
3. 选择"添加到主屏幕"
4. 确认添加

### Android
1. 用Chrome浏览器打开网站
2. 点击右上角菜单
3. 选择"安装应用"或"添加到主屏幕"
4. 确认安装

## 🎁 使用场景

- 💝 **情人节表白** - 完美的情人节礼物
- 💒 **求婚专用** - 创造浪漫的求婚时刻
- 🎂 **纪念日庆祝** - 记录美好的恋爱时光
- 💌 **日常表达** - 随时向TA表达爱意
- 📷 **回忆珍藏** - 保存两人的美好瞬间

## 🔧 技术栈

- **前端**: HTML5 + CSS3 + Vanilla JavaScript
- **动画**: CSS Animations + JavaScript
- **存储**: LocalStorage
- **PWA**: Service Worker + Manifest
- **部署**: 静态网站托管

## 📄 浏览器支持

- ✅ Chrome 60+
- ✅ Safari 12+
- ✅ Firefox 55+
- ✅ Edge 79+
- ✅ iOS Safari 12+
- ✅ Android Chrome 60+

## 💡 使用技巧

1. **最佳时机**: 在特殊日子（生日、纪念日、情人节）使用
2. **环境准备**: 选择安静浪漫的环境
3. **个性化**: 提前添加你们的专属照片和音乐
4. **互动体验**: 引导对方体验每个功能
5. **惊喜元素**: 可以结合实体礼物一起使用

## 🆘 常见问题

### Q: 为什么音乐无法自动播放？
A: 现代浏览器限制自动播放，需要用户主动点击音乐按钮。

### Q: 照片上传后在哪里保存？
A: 照片保存在浏览器的本地存储中，不会上传到服务器。

### Q: 如何备份我的数据？
A: 可以使用浏览器的导出功能，或手动复制LocalStorage数据。

### Q: 可以在微信中使用吗？
A: 可以，但某些功能（如PWA安装）可能受限。

## 🎉 更新日志

### v1.0.0 (2024-02-14)
- 🎉 初始版本发布
- ✨ 六大核心功能完成
- 📱 PWA支持
- 🎨 美观的UI设计
- 📱 移动端优化

## 💌 贡献与反馈

如果你有任何建议或发现了问题，欢迎：
- 提交Issue
- 发起Pull Request
- 分享使用心得

## 📜 许可证

MIT License - 可自由使用、修改和分发

---

## 💕 特别鸣谢

感谢所有为爱情付出的人们，愿每一份真挚的感情都能得到美好的回应。

**制作不易，如果这个工具帮到了你，请给个⭐️支持一下！**

---

*用代码编织爱情，用技术传递温暖* 💝 