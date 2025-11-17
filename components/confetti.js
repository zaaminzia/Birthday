class BirthdayConfetti extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .confetti {
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    background-color: #f00;
                    opacity: 0.7;
                    animation: fall linear infinite;
                    z-index: 1000;
                }
                
                @keyframes fall {
                    to {
                        transform: translateY(100vh) rotate(360deg);
                    }
                }
            </style>
        `;
        
        this.createConfetti();
    }
    
    createConfetti() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Random properties
            const size = Math.random() * 10 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * window.innerWidth;
            const animationDuration = Math.random() * 3 + 2;
            const animationDelay = Math.random() * 5;
            const shape = Math.random() > 0.5 ? '50%' : '0';
            
            // Apply styles
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.left = `${left}px`;
            confetti.style.top = `-10px`;
            confetti.style.borderRadius = shape;
            confetti.style.animationDuration = `${animationDuration}s`;
            confetti.style.animationDelay = `${animationDelay}s`;
            
            this.shadowRoot.appendChild(confetti);
        }
    }
}

customElements.define('birthday-confetti', BirthdayConfetti);