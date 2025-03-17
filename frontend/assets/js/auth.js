const submitBtn = document.getElementById('submit-btn');
const errorMsg = document.getElementById('error-msg');

submitBtn.addEventListener('click', async () => {
    const inputPassword = document.getElementById('password').value;

    try {
        // Send the password to the server for validation
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: inputPassword }),
        });

        const data = await response.json();

        if (data.success) {
            window.location.href = 'index.html'; // Redirect to the main page
        } else {
            errorMsg.classList.add('show'); // Show error message
            setTimeout(() => {
                errorMsg.classList.remove('show');
            }, 3000);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Create floating hearts
const heartEmojis = ['💗', '💖', '💝', '💕', '♥️'];
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