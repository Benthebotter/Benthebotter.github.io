// Smooth Scrolling für Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Bonus Cards Interaktion
document.querySelectorAll('.bonus-card').forEach(card => {
    card.addEventListener('click', function(e) {
        if (!e.target.closest('button')) {
            this.classList.toggle('selected');
        }
    });
});

// Game Cards Hover Effekte
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Registration Modal
function openRegistrationModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Jetzt Registrieren</h2>
            <form id="registration-form">
                <div class="form-group">
                    <label for="username">Benutzername</label>
                    <input type="text" id="username" required>
                </div>
                <div class="form-group">
                    <label for="email">E-Mail</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Passwort</label>
                    <input type="password" id="password" required>
                </div>
                <div class="form-group">
                    <label for="wallet">Crypto Wallet (optional)</label>
                    <input type="text" id="wallet">
                </div>
                <button type="submit" class="btn btn-primary">Registrieren</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    document.getElementById('registration-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Registrierung erfolgreich! Du erhältst 75 Free Spins.');
        document.body.removeChild(modal);
    });
}

// Event Listener für Registrier-Buttons
document.querySelectorAll('.btn-primary').forEach(button => {
    if (button.textContent.includes('Registrieren') || button.textContent.includes('Jetzt Registrieren')) {
        button.addEventListener('click', openRegistrationModal);
    }
});

// Animationen beim Laden
window.addEventListener('load', function() {
    // Fade-in Animation für alle Cards
    const cards = document.querySelectorAll('.feature-card, .game-card, .bonus-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });
});

// Crypto Price Ticker
function initCryptoTicker() {
    const ticker = document.createElement('div');
    ticker.className = 'crypto-ticker';
    ticker.innerHTML = `
        <div class="ticker-content">
            <span>Bitcoin: $43,250</span>
            <span>Ethereum: $2,450</span>
            <span>Tether: $1.00</span>
            <span>Bitcoin: $43,250</span>
            <span>Ethereum: $2,450</span>
            <span>Tether: $1.00</span>
        </div>
    `;
    
    document.body.appendChild(ticker);
    
    // Simulierte Preisanpassungen
    setInterval(() => {
        const prices = ticker.querySelectorAll('span');
        prices.forEach(price => {
            const parts = price.textContent.split(': ');
            const symbol = parts[0];
            let value = parseFloat(parts[1].replace('$', '').replace(',', ''));
            
            // Zufällige kleine Schwankung
            value += (Math.random() - 0.5) * 10;
            price.innerHTML = `${symbol}: $${value.toFixed(2)}`;
        });
    }, 5000);
}

// Initialisiere den Ticker
initCryptoTicker();

// Mobile Navigation Toggle
let mobileNavToggle = document.createElement('button');
mobileNavToggle.className = 'mobile-toggle';
mobileNavToggle.innerHTML = '☰';
mobileNavToggle.onclick = function() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    }
};

// Füge Mobile Toggle zu Navigation hinzu
const navContainer = document.querySelector('.nav-container');
if (navContainer) {
    navContainer.insertBefore(mobileNavToggle, navContainer.firstChild);
}

// Add mobile styles dynamically
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            display: none !important;
            position: absolute;
            top: 60px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .nav-menu.show {
            display: flex !important;
        }
        
        .mobile-toggle {
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            margin-right: 1rem;
        }
    }
`;
document.head.appendChild(style);