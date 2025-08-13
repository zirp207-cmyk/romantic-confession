// 主页面功能
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    updateDateDisplay();
    setupServiceWorker();
    setupInstallPrompt();
});

// 初始化页面
function initializePage() {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
    
    // 添加触摸震动反馈
    addHapticFeedback();
    
    // 初始化本地存储
    initializeStorage();
}

// 页面导航
function navigateTo(page) {
    // 添加震动反馈
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    // 页面切换动画
    document.body.style.transform = 'scale(0.95)';
    document.body.style.transition = 'transform 0.3s ease';
    
    setTimeout(() => {
        window.location.href = page;
    }, 300);
}

// 背景音乐控制
let isPlaying = false;
let backgroundMusic = null;

function toggleBackgroundMusic() {
    backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    if (!isPlaying) {
        playBackgroundMusic();
    } else {
        pauseBackgroundMusic();
    }
}

function playBackgroundMusic() {
    if (backgroundMusic) {
        backgroundMusic.play().then(() => {
            isPlaying = true;
            const musicToggle = document.getElementById('musicToggle');
            musicToggle.classList.add('playing');
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
            
            // 保存音乐状态
            localStorage.setItem('musicPlaying', 'true');
        }).catch(error => {
            console.log('音乐播放失败:', error);
            // 如果自动播放失败，显示提示
            showMusicPrompt();
        });
    }
}

function pauseBackgroundMusic() {
    if (backgroundMusic) {
        backgroundMusic.pause();
        isPlaying = false;
        const musicToggle = document.getElementById('musicToggle');
        musicToggle.classList.remove('playing');
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        
        // 保存音乐状态
        localStorage.setItem('musicPlaying', 'false');
    }
}

function showMusicPrompt() {
    const prompt = document.createElement('div');
    prompt.className = 'music-prompt';
    prompt.innerHTML = `
        <div class="prompt-content">
            <p>🎵 点击开启浪漫背景音乐 🎵</p>
            <button onclick="this.parentElement.parentElement.remove(); playBackgroundMusic();">开启音乐</button>
        </div>
    `;
    document.body.appendChild(prompt);
    
    // 3秒后自动隐藏
    setTimeout(() => {
        if (prompt.parentElement) {
            prompt.remove();
        }
    }, 3000);
}

// 日期显示
function updateDateDisplay() {
    const dateDisplay = document.getElementById('dateDisplay');
    if (dateDisplay) {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        const dateString = now.toLocaleDateString('zh-CN', options);
        dateDisplay.textContent = `${dateString} - 为你而制`;
        
        // 如果是情人节，显示特殊消息
        if (now.getMonth() === 1 && now.getDate() === 14) {
            dateDisplay.innerHTML += '<br/>💕 情人节快乐，我的最爱！💕';
            createSpecialEffect();
        }
    }
}

// 情人节特殊效果
function createSpecialEffect() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createFloatingHeart();
        }, i * 200);
    }
}

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.fontSize = '2em';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.animation = 'floatUp 3s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// 添加触摸震动反馈
function addHapticFeedback() {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.addEventListener('touchstart', () => {
            if (navigator.vibrate) {
                navigator.vibrate(30);
            }
        });
    });
}

// 本地存储管理
function initializeStorage() {
    // 初始化用户设置
    if (!localStorage.getItem('userSettings')) {
        const defaultSettings = {
            name: '亲爱的',
            theme: 'pink',
            musicEnabled: true,
            customMessages: []
        };
        localStorage.setItem('userSettings', JSON.stringify(defaultSettings));
    }
    
    // 恢复音乐状态
    const musicState = localStorage.getItem('musicPlaying');
    if (musicState === 'true') {
        setTimeout(() => {
            playBackgroundMusic();
        }, 1000);
    }
}

// Service Worker 注册
function setupServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('SW 注册成功:', registration);
            })
            .catch(error => {
                console.log('SW 注册失败:', error);
            });
    }
}

// PWA 安装提示
function setupInstallPrompt() {
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallPrompt();
    });
    
    function showInstallPrompt() {
        const installPrompt = document.createElement('div');
        installPrompt.className = 'install-prompt';
        installPrompt.innerHTML = `
            <span>💝 添加到主屏幕，随时表达爱意</span>
            <button onclick="installApp()">安装</button>
            <button onclick="this.parentElement.remove()">取消</button>
        `;
        document.body.appendChild(installPrompt);
        installPrompt.style.display = 'block';
        
        window.installApp = function() {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((result) => {
                    if (result.outcome === 'accepted') {
                        console.log('用户安装了 PWA');
                    }
                    deferredPrompt = null;
                    installPrompt.remove();
                });
            }
        };
    }
}

// 工具函数
function getUserSettings() {
    return JSON.parse(localStorage.getItem('userSettings') || '{}');
}

function saveUserSettings(settings) {
    localStorage.setItem('userSettings', JSON.stringify(settings));
}

function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 105, 180, 0.9);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        z-index: 10000;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease';
        setTimeout(() => toast.remove(), 500);
    }, duration);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .music-prompt {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.95);
        padding: 20px;
        border-radius: 20px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        z-index: 10000;
        text-align: center;
    }
    
    .music-prompt button {
        background: #ff69b4;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        cursor: pointer;
        margin-top: 10px;
    }
`;
document.head.appendChild(style); 