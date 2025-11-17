class BirthdayCard extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    padding: 2rem;
                    max-width: 600px;
                    margin: 0 auto;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }
                
                .card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
                }
                
                .card::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
                    animation: rotate 20s linear infinite;
                    z-index: -1;
                }
                
                @keyframes rotate {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
                
                .card-title {
                    font-family: 'Dancing Script', cursive;
                    font-size: 3rem;
                    color: white;
                    text-align: center;
                    margin-bottom: 1.5rem;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
                }
                
                .card-message {
                    color: white;
                    font-size: 1.2rem;
                    line-height: 1.6;
                    text-align: center;
                    margin-bottom: 2rem;
                }
                
                .blinking-cursor {
                    animation: blink 1s step-end infinite;
                }
                
                @keyframes blink {
                    from, to { opacity: 1; }
                    50% { opacity: 0; }
                }
                
                .card-button {
                    background: white;
                    color: #ff6b6b;
                    border: none;
                    padding: 0.8rem 2rem;
                    border-radius: 50px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: block;
                    margin: 0 auto;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                }
                .card-button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.15);
                }

                .cake-emoji {
                    position: absolute;
                    font-size: 2rem;
                    animation: float 3s ease-in-out infinite;
                    z-index: 10;
                    pointer-events: none;
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(10deg);
                    }
                }
            </style>
            
            <div class="card floating">
                <h2 class="card-title">For Someone Special</h2>
                <div class="card-message" id="dynamic-message"></div>
                <button class="card-button">Click for Cake! 🎂</button>
            </div>
        `;
        
        // Add button functionality
        const button = this.shadowRoot.querySelector('.card-button');
        button.addEventListener('click', () => {
            // Create floating cake emoji
            const cake = document.createElement('div');
            cake.className = 'cake-emoji';
            cake.textContent = '🎂';
            cake.style.left = `${Math.random() * 80 + 10}%`;
            cake.style.top = `${Math.random() * 60 + 20}%`;
            this.shadowRoot.querySelector('.card').appendChild(cake);

            // Remove cake after animation
            setTimeout(() => {
                cake.remove();
            }, 3000);

            // Trigger more confetti
            const event = new CustomEvent('more-confetti', { bubbles: true, composed: true });
            this.dispatchEvent(event);
        });
}
}

customElements.define('birthday-card', BirthdayCard);