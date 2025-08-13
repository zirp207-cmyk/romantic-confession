// 爱情游戏JavaScript
let gameRunning = false;
let gameTimer = null;
let heartScore = 0;
let timeLeft = 60;
let targetScore = 50;

document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    updateDisplay();
});

function initializeGame() {
    // 初始化游戏状态
    heartScore = 0;
    timeLeft = 60;
    updateDisplay();
    
    // 添加触摸震动反馈
    addHapticFeedback();
}

function startGame() {
    if (gameRunning) return;
    
    gameRunning = true;
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('pauseBtn').style.display = 'inline-block';
    document.getElementById('instructions').style.display = 'none';
    
    // 开始游戏计时
    gameTimer = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
    
    // 开始生成爱心
    startHeartGeneration();
    
    // 震动反馈
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
}

function pauseGame() {
    if (!gameRunning) return;
    
    gameRunning = false;
    clearInterval(gameTimer);
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
    
    // 显示暂停页面
    document.getElementById('pauseOverlay').style.display = 'flex';
}

function resumeGame() {
    document.getElementById('pauseOverlay').style.display = 'none';
    startGame();
}

function resetGame() {
    endGame();
    initializeGame();
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
    document.getElementById('instructions').style.display = 'block';
    document.getElementById('gameOverPage').style.display = 'none';
    document.getElementById('pauseOverlay').style.display = 'none';
    
    // 清除所有游戏元素
    clearGameElements();
}

function endGame() {
    gameRunning = false;
    clearInterval(gameTimer);
    
    // 显示游戏结束页面
    showGameOver();
}

function startHeartGeneration() {
    if (!gameRunning) return;
    
    // 生成爱心
    createHeart();
    
    // 随机时间间隔生成下一个爱心
    const nextHeartDelay = 1000 + Math.random() * 2000;
    setTimeout(startHeartGeneration, nextHeartDelay);
}

function createHeart() {
    const gameArea = document.getElementById('gameArea');
    const heart = document.createElement('div');
    
    // 随机位置
    const x = Math.random() * (gameArea.offsetWidth - 50);
    const y = Math.random() * (gameArea.offsetHeight - 50);
    
    heart.className = 'game-heart';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.innerHTML = '💖';
    
    // 随机大小
    const size = 30 + Math.random() * 30;
    heart.style.fontSize = size + 'px';
    
    // 点击收集
    heart.addEventListener('click', collectHeart);
    
    gameArea.appendChild(heart);
    
    // 3秒后消失
    setTimeout(() => {
        if (heart.parentElement) {
            heart.remove();
        }
    }, 3000);
}

function collectHeart() {
    if (!gameRunning) return;
    
    heartScore += 10;
    updateDisplay();
    
    // 震动反馈
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    // 爱心收集动画
    this.style.transform = 'scale(1.5)';
    this.style.opacity = '0';
    
    setTimeout(() => {
        this.remove();
    }, 300);
    
    // 检查是否达到目标
    if (heartScore >= targetScore) {
        endGame();
    }
}

function updateDisplay() {
    document.getElementById('heartScore').textContent = heartScore;
    document.getElementById('timeLeft').textContent = timeLeft;
    document.getElementById('targetScore').textContent = targetScore;
    
    // 更新进度条
    const progress = (heartScore / targetScore) * 100;
    document.documentElement.style.setProperty('--progress', `${Math.min(progress, 100)}%`);
}

function showGameOver() {
    const gameOverPage = document.getElementById('gameOverPage');
    const finalScore = document.getElementById('finalScore');
    const finalHearts = document.getElementById('finalHearts');
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('gameResultMessage');
    
    finalScore.textContent = heartScore;
    finalHearts.textContent = Math.floor(heartScore / 10);
    
    // 根据分数显示不同结果
    if (heartScore >= targetScore) {
        resultIcon.textContent = '💝';
        resultTitle.textContent = '恭喜通关！';
        resultMessage.innerHTML = `
            <p>🎉 你成功收集了 ${heartScore} 分！</p>
            <p>💕 你的爱意已经传达成功！</p>
            <p>🌟 愿你们的爱情永远甜蜜！</p>
        `;
    } else {
        resultIcon.textContent = '💔';
        resultTitle.textContent = '游戏结束';
        resultMessage.innerHTML = `
            <p>😔 这次只收集了 ${heartScore} 分</p>
            <p>💪 再试一次，相信你能成功！</p>
            <p>💕 爱需要坚持和努力！</p>
        `;
    }
    
    gameOverPage.style.display = 'flex';
}

function clearGameElements() {
    const gameArea = document.getElementById('gameArea');
    const hearts = gameArea.querySelectorAll('.game-heart');
    hearts.forEach(heart => heart.remove());
}

function addHapticFeedback() {
    const gameArea = document.getElementById('gameArea');
    gameArea.addEventListener('touchstart', () => {
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
    });
}

function goBack() {
    window.location.href = 'index.html';
}

function restartGame() {
    resetGame();
} 