// 音乐播放器JavaScript
let currentMusicIndex = 0;
let isPlaying = false;
let audioPlayer = null;

// 示例音乐列表（你可以替换为真实的音乐文件）
const musicList = [
    {
        title: "浪漫背景音乐",
        artist: "爱的旋律",
        src: "assets/music/romantic-bg.mp3",
        cover: "💕"
    },
    {
        title: "甜蜜时光",
        artist: "幸福乐章",
        src: "assets/music/sweet-time.mp3",
        cover: "🎵"
    },
    {
        title: "永恒之爱",
        artist: "浪漫交响",
        src: "assets/music/eternal-love.mp3",
        cover: "💖"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    initializeMusicPlayer();
    loadMusicList();
});

function initializeMusicPlayer() {
    // 创建音频播放器
    audioPlayer = new Audio();
    
    // 音频事件监听
    audioPlayer.addEventListener('ended', nextMusic);
    audioPlayer.addEventListener('error', handleMusicError);
    
    // 添加触摸震动反馈
    addHapticFeedback();
}

function loadMusicList() {
    const musicContainer = document.querySelector('.music-list');
    if (!musicContainer) return;
    
    musicContainer.innerHTML = '';
    
    musicList.forEach((music, index) => {
        const musicItem = document.createElement('div');
        musicItem.className = 'music-item';
        musicItem.innerHTML = `
            <div class="music-cover">${music.cover}</div>
            <div class="music-info">
                <h4>${music.title}</h4>
                <p>${music.artist}</p>
            </div>
            <button class="play-btn" onclick="playMusic(${index})">
                <i class="fas fa-play"></i>
            </button>
        `;
        
        if (index === currentMusicIndex) {
            musicItem.classList.add('active');
        }
        
        musicContainer.appendChild(musicItem);
    });
}

function playMusic(index = null) {
    if (index !== null) {
        currentMusicIndex = index;
    }
    
    const music = musicList[currentMusicIndex];
    
    if (!music) {
        showToast('没有可播放的音乐');
        return;
    }
    
    // 震动反馈
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    try {
        audioPlayer.src = music.src;
        audioPlayer.play().then(() => {
            isPlaying = true;
            updatePlayButton();
            updateMusicInfo();
            showToast(`🎵 正在播放: ${music.title}`);
        }).catch(error => {
            console.log('音乐播放失败:', error);
            handleMusicError();
        });
    } catch (error) {
        console.log('音乐加载失败:', error);
        handleMusicError();
    }
}

function pauseMusic() {
    if (audioPlayer) {
        audioPlayer.pause();
        isPlaying = false;
        updatePlayButton();
        showToast('⏸️ 音乐已暂停');
    }
}

function nextMusic() {
    currentMusicIndex = (currentMusicIndex + 1) % musicList.length;
    playMusic();
}

function prevMusic() {
    currentMusicIndex = (currentMusicIndex - 1 + musicList.length) % musicList.length;
    playMusic();
}

function updatePlayButton() {
    const playBtn = document.querySelector('.play-btn');
    if (playBtn) {
        if (isPlaying) {
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playBtn.onclick = pauseMusic;
        } else {
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            playBtn.onclick = () => playMusic();
        }
    }
}

function updateMusicInfo() {
    const music = musicList[currentMusicIndex];
    if (!music) return;
    
    // 更新当前播放的音乐信息
    const musicItems = document.querySelectorAll('.music-item');
    musicItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentMusicIndex);
    });
}

function handleMusicError() {
    showToast('❌ 音乐文件加载失败，请检查文件路径');
    isPlaying = false;
    updatePlayButton();
}

function addHapticFeedback() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('touchstart', () => {
            if (navigator.vibrate) {
                navigator.vibrate(30);
            }
        });
    });
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

function goBack() {
    window.location.href = 'index.html';
}

// 音量控制
function setVolume(volume) {
    if (audioPlayer) {
        audioPlayer.volume = volume / 100;
    }
}

// 进度控制
function seekTo(time) {
    if (audioPlayer) {
        audioPlayer.currentTime = time;
    }
}

// 循环模式
let loopMode = 'none'; // none, one, all

function toggleLoopMode() {
    const modes = ['none', 'one', 'all'];
    const currentIndex = modes.indexOf(loopMode);
    loopMode = modes[(currentIndex + 1) % modes.length];
    
    if (audioPlayer) {
        switch (loopMode) {
            case 'none':
                audioPlayer.loop = false;
                showToast('🔄 循环模式: 关闭');
                break;
            case 'one':
                audioPlayer.loop = true;
                showToast('🔄 循环模式: 单曲循环');
                break;
            case 'all':
                audioPlayer.loop = false;
                showToast('🔄 循环模式: 列表循环');
                break;
        }
    }
} 