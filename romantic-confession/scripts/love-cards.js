// 表白卡片JavaScript
const loveCardsData = [
    {
        icon: "💕",
        title: "初次相遇",
        front: "点击翻开卡片",
        back: "还记得第一次见到你的那个瞬间，我的心就被你深深吸引了",
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
    },
    {
        icon: "🌟",
        title: "你的笑容",
        front: "发现更多惊喜",
        back: "你的笑容是我见过最美的风景，照亮了我整个世界",
        gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
    },
    {
        icon: "💖",
        title: "心动时刻",
        front: "轻触感受爱意",
        back: "每当看到你，我的心跳就会不由自主地加速",
        gradient: "linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)"
    },
    {
        icon: "🎵",
        title: "我们的歌",
        front: "继续我们的故事",
        back: "想和你一起听遍世界上所有的情歌",
        gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
    },
    {
        icon: "🌙",
        title: "夜晚思念",
        front: "夜深人静时",
        back: "每个夜晚都想和你一起看月亮数星星",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
        icon: "🌹",
        title: "浪漫约会",
        front: "美好的约定",
        back: "想带你去看遍世界上最美的花朵",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
        icon: "💝",
        title: "珍贵回忆",
        front: "我们的时光",
        back: "和你在一起的每一刻都是我最珍贵的回忆",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
        icon: "🎁",
        title: "小惊喜",
        front: "为你准备",
        back: "想给你准备无数个小惊喜，看到你开心的样子",
        gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
        icon: "🌈",
        title: "美好未来",
        front: "我们的明天",
        back: "想和你一起走过春夏秋冬，看遍人间美景",
        gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    },
    {
        icon: "💍",
        title: "永恒承诺",
        front: "最后的话",
        back: "愿意用一生一世来爱你，保护你，陪伴你",
        gradient: "linear-gradient(135deg, #ffd89b 0%, #19547b 100%)",
        special: true
    }
];

let currentCardIndex = 0;
let totalCards = loveCardsData.length;
let cardsGenerated = false;

document.addEventListener('DOMContentLoaded', function() {
    initializeLoveCards();
    setupSwipeGestures();
    updateProgress();
});

// 初始化卡片
function initializeLoveCards() {
    if (!cardsGenerated) {
        generateCards();
        cardsGenerated = true;
    }
    
    // 页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
}

// 生成卡片
function generateCards() {
    const cardsStack = document.getElementById('cardsStack');
    cardsStack.innerHTML = '';
    
    // 只显示前4张卡片来创建堆叠效果
    const visibleCards = Math.min(4, totalCards - currentCardIndex);
    
    for (let i = 0; i < visibleCards; i++) {
        const cardData = loveCardsData[currentCardIndex + i];
        const card = createCard(cardData, i);
        cardsStack.appendChild(card);
    }
}

// 创建单个卡片
function createCard(data, index) {
    const card = document.createElement('div');
    card.className = `love-card ${data.special ? 'special' : ''}`;
    card.style.zIndex = 10 - index;
    
    if (index > 0) {
        const scale = 1 - (index * 0.05);
        const translateY = index * 10;
        card.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        if (index > 2) card.style.opacity = '0.8';
    }
    
    card.innerHTML = `
        <div class="card-face card-front" style="background: ${data.gradient}">
            <div class="card-number">${currentCardIndex + index + 1}/${totalCards}</div>
            <div class="card-icon">${data.icon}</div>
            <div class="card-title">${data.title}</div>
            <div class="card-content">${data.front}</div>
        </div>
        <div class="card-face card-back">
            <div class="card-number">${currentCardIndex + index + 1}/${totalCards}</div>
            <div class="card-icon">${data.icon}</div>
            <div class="card-title">${data.title}</div>
            <div class="card-content">${data.back}</div>
        </div>
        <div class="swipe-indicator left">👈</div>
        <div class="swipe-indicator right">👉</div>
    `;
    
    // 只为最顶层的卡片添加事件监听
    if (index === 0) {
        setupCardEvents(card);
    }
    
    return card;
}

// 设置卡片事件
function setupCardEvents(card) {
    // 点击翻转
    card.addEventListener('click', function(e) {
        if (!e.target.closest('.swipe-indicator')) {
            flipCard(card);
        }
    });
    
    // 触摸反馈
    card.addEventListener('touchstart', function() {
        card.classList.add('touching');
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
    });
    
    card.addEventListener('touchend', function() {
        card.classList.remove('touching');
    });
}

// 翻转卡片
function flipCard(card) {
    card.classList.toggle('flipped');
    
    // 震动反馈
    if (navigator.vibrate) {
        navigator.vibrate([50, 30, 50]);
    }
    
    // 播放翻转音效
    playFlipSound();
}

// 播放翻转音效（模拟）
function playFlipSound() {
    // 这里可以添加音效文件
    console.log('播放翻转音效');
}

// 设置滑动手势
function setupSwipeGestures() {
    const cardsStack = document.getElementById('cardsStack');
    let startX, startY, currentX, currentY;
    let isDragging = false;
    let startTime;
    
    cardsStack.addEventListener('touchstart', handleTouchStart, { passive: false });
    cardsStack.addEventListener('touchmove', handleTouchMove, { passive: false });
    cardsStack.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    // 鼠标事件（用于桌面测试）
    cardsStack.addEventListener('mousedown', handleMouseStart);
    cardsStack.addEventListener('mousemove', handleMouseMove);
    cardsStack.addEventListener('mouseup', handleMouseEnd);
    cardsStack.addEventListener('mouseleave', handleMouseEnd);
    
    function handleStart(x, y) {
        startX = x;
        startY = y;
        currentX = x;
        currentY = y;
        isDragging = true;
        startTime = Date.now();
    }
    
    function handleMove(x, y) {
        if (!isDragging) return;
        
        currentX = x;
        currentY = y;
        
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;
        
        // 只响应水平滑动
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            const topCard = cardsStack.querySelector('.love-card:first-child');
            if (topCard) {
                const rotation = deltaX * 0.1;
                topCard.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
                
                // 显示滑动指示器
                const leftIndicator = topCard.querySelector('.swipe-indicator.left');
                const rightIndicator = topCard.querySelector('.swipe-indicator.right');
                
                if (deltaX < -50) {
                    leftIndicator.classList.add('show');
                    rightIndicator.classList.remove('show');
                } else if (deltaX > 50) {
                    rightIndicator.classList.add('show');
                    leftIndicator.classList.remove('show');
                } else {
                    leftIndicator.classList.remove('show');
                    rightIndicator.classList.remove('show');
                }
            }
        }
    }
    
    function handleEnd() {
        if (!isDragging) return;
        isDragging = false;
        
        const deltaX = currentX - startX;
        const deltaTime = Date.now() - startTime;
        const velocity = Math.abs(deltaX) / deltaTime;
        
        const topCard = cardsStack.querySelector('.love-card:first-child');
        if (topCard) {
            // 清除指示器
            topCard.querySelectorAll('.swipe-indicator').forEach(indicator => {
                indicator.classList.remove('show');
            });
            
            // 判断是否应该滑走卡片
            if (Math.abs(deltaX) > 100 || velocity > 0.5) {
                if (deltaX > 0) {
                    swipeCard('right');
                } else {
                    swipeCard('left');
                }
            } else {
                // 返回原位
                topCard.style.transform = '';
            }
        }
    }
    
    function handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        handleStart(touch.clientX, touch.clientY);
    }
    
    function handleTouchMove(e) {
        e.preventDefault();
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            handleMove(touch.clientX, touch.clientY);
        }
    }
    
    function handleTouchEnd(e) {
        e.preventDefault();
        handleEnd();
    }
    
    function handleMouseStart(e) {
        handleStart(e.clientX, e.clientY);
    }
    
    function handleMouseMove(e) {
        handleMove(e.clientX, e.clientY);
    }
    
    function handleMouseEnd(e) {
        handleEnd();
    }
}

// 滑走卡片
function swipeCard(direction) {
    const topCard = document.querySelector('.love-card:first-child');
    if (!topCard) return;
    
    // 添加滑走动画
    topCard.classList.add(`swiped-${direction}`);
    
    // 震动反馈
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
    
    setTimeout(() => {
        nextCard();
    }, 600);
}

// 下一张卡片
function nextCard() {
    currentCardIndex++;
    updateProgress();
    
    if (currentCardIndex >= totalCards) {
        showCompletion();
    } else {
        generateCards();
    }
}

// 更新进度
function updateProgress() {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    const progress = ((currentCardIndex + 1) / totalCards) * 100;
    progressBar.style.setProperty('--progress', `${progress}%`);
    progressText.textContent = `${currentCardIndex + 1} / ${totalCards}`;
    
    // 更新CSS变量
    const style = document.createElement('style');
    style.textContent = `.progress-bar::before { width: ${progress}%; }`;
    document.head.appendChild(style);
}

// 重新洗牌
function shuffleCards() {
    // 洗牌算法
    for (let i = loveCardsData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [loveCardsData[i], loveCardsData[j]] = [loveCardsData[j], loveCardsData[i]];
    }
    
    currentCardIndex = 0;
    updateProgress();
    generateCards();
    
    showToast('🔀 卡片已重新洗牌！');
    
    // 震动反馈
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }
}

// 显示所有卡片
function showAllCards() {
    const allCardsView = document.getElementById('allCardsView');
    const cardsGrid = document.getElementById('cardsGrid');
    
    // 清空网格
    cardsGrid.innerHTML = '';
    
    // 生成网格卡片
    loveCardsData.forEach((data, index) => {
        const gridCard = document.createElement('div');
        gridCard.className = 'grid-card';
        gridCard.style.background = data.gradient;
        
        gridCard.innerHTML = `
            <div class="card-icon">${data.icon}</div>
            <div class="card-title">${data.title}</div>
            <div class="card-content">${data.back}</div>
        `;
        
        // 添加延迟动画
        gridCard.style.opacity = '0';
        gridCard.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            gridCard.style.transition = 'all 0.5s ease';
            gridCard.style.opacity = '1';
            gridCard.style.transform = 'translateY(0)';
        }, index * 100);
        
        cardsGrid.appendChild(gridCard);
    });
    
    allCardsView.style.display = 'block';
    
    // 震动反馈
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

// 隐藏所有卡片视图
function hideAllCards() {
    const allCardsView = document.getElementById('allCardsView');
    allCardsView.style.display = 'none';
}

// 显示完成页面
function showCompletion() {
    const completionPage = document.getElementById('completionPage');
    const finalMessage = document.getElementById('finalMessage');
    
    // 随机最终消息
    const finalMessages = [
        "每一张卡片都承载着我对你的爱意",
        "希望我们的爱情像这些卡片一样永恒",
        "你是我生命中最美好的存在",
        "愿我们的故事永远充满甜蜜",
        "你就是我心中的那个唯一"
    ];
    
    const randomMessage = finalMessages[Math.floor(Math.random() * finalMessages.length)];
    finalMessage.textContent = randomMessage;
    
    completionPage.style.display = 'flex';
    
    // 创建花瓣雨效果
    createPetalRain();
    
    // 震动反馈
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200, 100, 200]);
    }
}

// 创建花瓣雨
function createPetalRain() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createFloatingPetal();
        }, i * 100);
    }
}

function createFloatingPetal() {
    const petal = document.createElement('div');
    petal.innerHTML = '🌸';
    petal.style.position = 'fixed';
    petal.style.left = Math.random() * window.innerWidth + 'px';
    petal.style.top = '-50px';
    petal.style.fontSize = '1.5em';
    petal.style.pointerEvents = 'none';
    petal.style.zIndex = '9999';
    petal.style.animation = 'petalFall 4s ease-out forwards';
    
    document.body.appendChild(petal);
    
    setTimeout(() => {
        petal.remove();
    }, 4000);
}

// 重新开始
function restartCards() {
    currentCardIndex = 0;
    updateProgress();
    generateCards();
    
    const completionPage = document.getElementById('completionPage');
    completionPage.style.display = 'none';
    
    showToast('💕 重新开始我们的旅程！');
}

// 返回主页
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

// 添加花瓣下落动画
const style = document.createElement('style');
style.textContent = `
    @keyframes petalFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 