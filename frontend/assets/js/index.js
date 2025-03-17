const heartEmojis = ['💗', '💖', '💝', '💕', '♥️'];
const gradients = [
    'linear-gradient(135deg, #ffafbd, #ffc3a0, #ffdde1)',
    'linear-gradient(135deg, #e0c3fc, #8ec5fc, #c2e9fb)',
    'linear-gradient(135deg, #ff9a9e, #fad0c4, #fad0c4)',
    'linear-gradient(135deg, #a18cd1, #fbc2eb, #fad0c4)',
    'linear-gradient(135deg, #ffecd2, #fcb69f, #fad0c4)',
];

let currentGradient = 0;

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 5 + 3 + 's';
    heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    document.body.appendChild(heart);

    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

setInterval(createHeart, 600);

document.querySelector('.color-btn').addEventListener('click', () => {
    currentGradient = (currentGradient + 1) % gradients.length;
    document.body.style.background = gradients[currentGradient];
});

document.querySelector('.btn:not(.color-btn)').addEventListener('click', () => {
    const transition = document.querySelector('.page-transition');
    transition.style.opacity = '1';
    setTimeout(() => {
        window.location.href = 'gallery.html';
    }, 1000);
});

