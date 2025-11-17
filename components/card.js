class BirthdayCard extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
                    border-radius: 30px;
                    padding: 2rem;
                    max-width: 600px;
                    margin: 0 auto;
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 
                                0 6px 6px rgba(0, 0, 0, 0.1),
                                inset 0 -5px 15px rgba(255,255,255,0.4);
                    border: 5px solid white;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    transform-style: preserve-3d;
                    perspective: 1000px;
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
                    font-family: 'Comic Sans MS', cursive, sans-serif;
                    font-size: 3.5rem;
                    color: #fff;
                    text-align: center;
                    margin-bottom: 1.5rem;
                    text-shadow: 3px 3px 0 #ff6b6b, 
                                 6px 6px 0 #ff8e8e;
                    transform: rotate(-3deg);
                    animation: titleWobble 2s infinite alternate;
                }

                @keyframes titleWobble {
                    0% { transform: rotate(-3deg) scale(1); }
                    100% { transform: rotate(3deg) scale(1.05); }
                }
                .card-message {
                    background: white;
                    color: #ff6b6b;
                    font-size: 1.4rem;
                    font-weight: bold;
                    line-height: 1.6;
                    text-align: center;
                    margin-bottom: 2rem;
                    padding: 1.5rem;
                    border-radius: 20px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    border: 3px dashed #ff6b6b;
                    transform: rotate(1deg);
                    font-family: 'Comic Sans MS', cursive, sans-serif;
                }
.blinking-cursor {
                    animation: blink 1s step-end infinite;
                }
                
                @keyframes blink {
                    from, to { opacity: 1; }
                    50% { opacity: 0; }
                }
                .card-button {
                    background: linear-gradient(to right, #ff6b6b, #ff8e8e);
                    color: white;
                    border: none;
                    padding: 1rem 2.5rem;
                    border-radius: 50px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: block;
                    margin: 0 auto;
                    box-shadow: 0 5px 15px rgba(255,107,107,0.4);
                    font-size: 1.2rem;
                    font-family: 'Comic Sans MS', cursive, sans-serif;
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
                    border: 3px solid white;
                    position: relative;
                    overflow: hidden;
                }

                .card-button:hover {
                    transform: scale(1.1) rotate(5deg);
                    box-shadow: 0 8px 20px rgba(255,107,107,0.6);
                }

                .card-button::after {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: rgba(255,255,255,0.2);
                    transform: rotate(30deg);
                    transition: all 0.3s;
                }

                .card-button:hover::after {
                    left: 100%;
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