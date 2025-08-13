// 爱心动画页面JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeHeartAnimation();
    setupLongPressDetection();
    loadCustomMessages();
    startHeartSequence();
});

// 初始化爱心动画页面
function initializeHeartAnimation() {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
    
    // 随机显示表白文字
    showRandomLoveMessage();
    
    // 定时更换表白文字
    setInterval(showRandomLoveMessage, 5000);
}

// 返回主页面
function goBack() {
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    document.body.style.transform = 'scale(0.95)';
    document.body.style.transition = 'transform 0.3s ease';
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 300);
}

// 创建爱心爆炸效果
function createHeartExplosion() {
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }
    
    const mainHeart = document.querySelector('.main-heart');
    const rect = mainHeart.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // 创建多个爱心
    for (let i = 0; i < 12; i++) {
        createFloatingHeart(centerX, centerY, i);
    }
    
    // 主爱心震动效果
    mainHeart.classList.add('shake');
    setTimeout(() => {
        mainHeart.classList.remove('shake');
    }, 500);
    
    // 显示特殊消息
    showSpecialMessage();
}

// 创建飘浮爱心
function createFloatingHeart(centerX, centerY, index) {
    const heart = document.createElement('div');
    heart.className = 'heart-explosion';
    heart.innerHTML = '💖';
    
    // 随机方向和距离
    const angle = (index * 30) * Math.PI / 180;
    const distance = 150 + Math.random() * 100;
    const endX = centerX + Math.cos(angle) * distance;
    const endY = centerY + Math.sin(angle) * distance;
    
    heart.style.left = centerX + 'px';
    heart.style.top = centerY + 'px';
    
    document.body.appendChild(heart);
    
    // 动画到目标位置
    setTimeout(() => {
        heart.style.left = endX + 'px';
        heart.style.top = endY + 'px';
    }, 50);
    
    // 清理
    setTimeout(() => {
        heart.remove();
    }, 1000);
}

// 长按检测
let longPressTimer = null;
let isLongPressing = false;

function setupLongPressDetection() {
    const container = document.querySelector('.heart-animation-container');
    
    // 触摸开始
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('mousedown', handleTouchStart);
    
    // 触摸结束
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('mouseup', handleTouchEnd);
    container.addEventListener('mouseleave', handleTouchEnd);
    
    // 触摸移动（取消长按）
    container.addEventListener('touchmove', handleTouchEnd);
}

function handleTouchStart(e) {
    if (e.target.classList.contains('main-heart')) return;
    
    longPressTimer = setTimeout(() => {
        showLongPressIndicator();
        isLongPressing = true;
        setTimeout(() => {
            if (isLongPressing) {
                showMessageInput();
            }
        }, 2000);
    }, 500);
}

function handleTouchEnd() {
    if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
    }
    isLongPressing = false;
    hideLongPressIndicator();
}

function showLongPressIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'long-press-indicator';
    indicator.id = 'longPressIndicator';
    document.body.appendChild(indicator);
}

function hideLongPressIndicator() {
    const indicator = document.getElementById('longPressIndicator');
    if (indicator) {
        indicator.remove();
    }
}

// 自定义消息管理
function showMessageInput() {
    const overlay = document.getElementById('messageInput');
    overlay.style.display = 'flex';
    
    // 震动反馈
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
    }
    
    // 聚焦到输入框
    setTimeout(() => {
        document.getElementById('customMessage').focus();
    }, 300);
}

function hideMessageInput() {
    const overlay = document.getElementById('messageInput');
    overlay.style.display = 'none';
    document.getElementById('customMessage').value = '';
}

function saveCustomMessage() {
    const message = document.getElementById('customMessage').value.trim();
    if (message) {
        // 保存到本地存储
        let customMessages = JSON.parse(localStorage.getItem('customMessages') || '[]');
        customMessages.push({
            text: message,
            date: new Date().toISOString()
        });
        localStorage.setItem('customMessages', JSON.stringify(customMessages));
        
        // 显示提示
        showToast('💕 你的心声已保存 💕');
        
        // 立即显示新消息
        document.getElementById('extraMessage').textContent = message;
        document.getElementById('extraMessage').classList.add('rainbow-text');
        
        hideMessageInput();
    } else {
        showToast('请输入你的心声~');
    }
}

function loadCustomMessages() {
    const customMessages = JSON.parse(localStorage.getItem('customMessages') || '[]');
    if (customMessages.length > 0) {
        // 显示最新的自定义消息
        const latestMessage = customMessages[customMessages.length - 1];
        document.getElementById('extraMessage').textContent = latestMessage.text;
    }
}

// 随机表白文字
const loveMessages = [
    "我的心跳只为你",
    "遇见你是我最美的意外",
    "你是我世界里最美的星",
    "每一秒都想和你在一起",
    "你的笑容是我最大的幸福",
    "爱你是我做过最对的事",
    "你是我心中永远的唯一",
    "有你在身边，每天都是情人节",
    "你是我生命中最美的奇迹",
    "愿意用一生来爱你"
];

const loveTexts = [
    "每一次心跳都在说着我爱你",
    "你的出现让我的世界充满色彩",
    "想把世界上最美的词都给你",
    "和你在一起的每一刻都是永恒",
    "你是我心中最亮的那颗星",
    "因为你，我相信了爱情",
    "你的温柔是我最大的软肋",
    "想陪你看遍世间所有美好",
    "你是我今生最美的遇见",
    "愿我们的爱情永远如初见"
];

function showRandomLoveMessage() {
    const titleElement = document.querySelector('.message-title');
    const textElement = document.querySelector('.message-text');
    
    if (titleElement && textElement) {
        const randomTitle = loveMessages[Math.floor(Math.random() * loveMessages.length)];
        const randomText = loveTexts[Math.floor(Math.random() * loveTexts.length)];
        
        // 淡出效果
        titleElement.style.opacity = '0';
        textElement.style.opacity = '0';
        
        setTimeout(() => {
            titleElement.textContent = randomTitle;
            textElement.textContent = randomText;
            
            // 淡入效果
            titleElement.style.transition = 'opacity 1s ease';
            textElement.style.transition = 'opacity 1s ease';
            titleElement.style.opacity = '1';
            textElement.style.opacity = '1';
        }, 500);
    }
}

function showSpecialMessage() {
    const messages = [
        "💕 你点亮了我的心 💕",
        "🌟 你是我的唯一 🌟",
        "💖 爱你到永远 💖",
        "✨ 你是我的小幸运 ✨",
        "💝 只想和你在一起 💝"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const extraMessage = document.getElementById('extraMessage');
    
    extraMessage.textContent = randomMessage;
    extraMessage.style.fontSize = '1.3em';
    extraMessage.style.animation = 'none';
    
    setTimeout(() => {
        extraMessage.style.animation = 'rainbow 2s ease infinite';
    }, 100);
}

// 开始心跳序列
function startHeartSequence() {
    setInterval(() => {
        createRandomFloatingHeart();
    }, 3000);
}

function createRandomFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * (window.innerWidth - 50) + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.fontSize = '1.5em';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '5';
    heart.style.animation = 'floatUp 4s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// 添加额外的CSS动画
const extraStyle = document.createElement('style');
extraStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
        }
        100% {
            transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(extraStyle); 