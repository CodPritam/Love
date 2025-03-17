function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
}

function createGallery() {
    const gallery = document.querySelector('.gallery');
    const totalCards = 10;
    const radius = window.innerWidth < 768 ? 400 : 600;
    let currentAngle = 0;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let autoRotateInterval;

    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');

    // Array of image URLs
    const imageUrls = [
        'assets/images/mine.jpeg',
        'assets/images/she1.jpeg',
        'assets/images/she2.jpeg',
        'assets/images/she3.jpeg',
        'assets/images/she4.jpeg',
        'assets/images/she5.jpeg',
        'assets/images/she6.jpeg',
        'assets/images/she7.jpeg',
        'assets/images/she8.jpeg',
        'assets/images/she9.jpeg',
        'assets/images/mine.jpeg'
    ];

    // Create cards
    for (let i = 0; i < totalCards; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${imageUrls[i]}" alt="Romantic photo ${i + 1}">
            <div class="number">${i + 1}</div>
        `;
        gallery.appendChild(card);
    }

    function rotateGallery(direction) {
        clearInterval(autoRotateInterval);
        currentAngle += direction * 36; // 360 / 10 cards = 36 degrees per card
        updateCards();
    }

    // Navigation button click handlers
    prevButton.addEventListener('click', () => rotateGallery(1));
    nextButton.addEventListener('click', () => rotateGallery(-1));

    function updateCards(extraRotation = 0) {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            const angle = (currentAngle + extraRotation + (index * (360 / totalCards))) * (Math.PI / 180);
            const x = Math.sin(angle) * radius;
            const z = Math.cos(angle) * radius;
            const rotateY = angle * (180 / Math.PI);

            card.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${rotateY}deg)`;

            const normalizedAngle = ((currentAngle + extraRotation + (index * (360 / totalCards))) % 360 + 360) % 360;
            if (normalizedAngle > 350 || normalizedAngle < 10) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }

            const opacity = Math.max(0.2, 1 - Math.abs(normalizedAngle - 180) / 180);
            card.style.opacity = opacity;
        });
    }

    // Mouse and touch event handlers
    gallery.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        currentX = currentAngle;
        gallery.style.cursor = 'grabbing';
        clearInterval(autoRotateInterval);
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const diff = (e.clientX - startX) * 0.5;
        currentAngle = currentX + diff;
        updateCards();

        // Light up the appropriate button based on drag direction
        const dragDirection = e.movementX;
        prevButton.classList.toggle('active', dragDirection < 0);
        nextButton.classList.toggle('active', dragDirection > 0);
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        gallery.style.cursor = 'grab';
        prevButton.classList.remove('active');
        nextButton.classList.remove('active');
    });

    // Touch events
    gallery.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        currentX = currentAngle;
        clearInterval(autoRotateInterval);
        e.preventDefault();
    });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const diff = (e.touches[0].clientX - startX) * 0.5;
        currentAngle = currentX + diff;
        updateCards();

        // Light up the appropriate button based on touch direction
        const touchDirection = e.touches[0].clientX - startX;
        prevButton.classList.toggle('active', touchDirection < 0);
        nextButton.classList.toggle('active', touchDirection > 0);

        e.preventDefault();
    }, { passive: false });

    window.addEventListener('touchend', () => {
        isDragging = false;
        prevButton.classList.remove('active');
        nextButton.classList.remove('active');
    });

    // Mouse wheel handler
    window.addEventListener('wheel', (e) => {
        clearInterval(autoRotateInterval);
        const delta = e.deltaX * 0.1 || e.deltaY * 0.1;
        currentAngle += delta;
        updateCards();

        // Light up the appropriate button based on wheel direction
        prevButton.classList.toggle('active', delta > 0);
        nextButton.classList.toggle('active', delta < 0);
    });

    // Initial update
    updateCards();
}

// Initialize
createStars();
createGallery();