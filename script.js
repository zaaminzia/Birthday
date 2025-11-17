document.addEventListener('DOMContentLoaded', function() {
    // Play birthday music when page loads
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audio.loop = true;
    
    // Start music when user interacts with page
    document.body.addEventListener('click', function() {
        audio.play().catch(e => console.log('Auto-play prevented'));
    }, { once: true });

    // Typewriter effect for the card message
    const messages = [
        "You're amazing!",
        "So grateful for you!",
        "Best friend ever!",
        "Have a wonderful day!",
        "You deserve the world!"
    ];
    
    let currentMessage = 0;
    const messageElement = document.getElementById('dynamic-message');
    
    function typeWriter(text, i, callback) {
        if (i < text.length) {
            messageElement.innerHTML = text.substring(0, i + 1) + '<span class="blinking-cursor">|</span>';
            setTimeout(() => typeWriter(text, i + 1, callback), 100);
        } else if (typeof callback == 'function') {
            setTimeout(callback, 1000);
        }
    }
    
    function startTyping() {
        typeWriter(messages[currentMessage], 0, function() {
            setTimeout(() => {
                currentMessage = (currentMessage + 1) % messages.length;
                startTyping();
            }, 2000);
        });
    }
    
    if (messageElement) {
        startTyping();
    }
});

// Custom cursor effect
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    }
});