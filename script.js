// Global variables
let selectedGame = null;
let currentPlatform = null;
let selectedCategories = new Set();
let mods = [];
let navigationHistory = [];
let currentPage = 'home';
let currentLanguage = 'en';

// DOM elements
const gameButtons = document.querySelectorAll('.game-btn');
const platformModal = document.getElementById('platformModal');
const platformCards = document.querySelectorAll('.platform-card');
const closeModal = document.querySelector('.close');
const backBtn = document.getElementById('backBtn');
const backFromPlatform = document.getElementById('backFromPlatform');
const backFromComingSoon = document.getElementById('backFromComingSoon');
const backFromFiveMComingSoon = document.getElementById('backFromFiveMComingSoon');
const backToHomeFiveM = document.getElementById('backToHomeFiveM');
const languageToggle = document.getElementById('languageToggle');
const languageMenu = document.getElementById('languageMenu');

// Translation data
const translations = {
    en: {
        // Navigation
        home: "Home",
        about: "About", 
        support: "Support",
        back: "Back",
        login: "Login",
        register: "Register",
        
        // Main page
        main_title: "Discover new worlds of modifications",
        main_description: "Welcome to Marsupilami Modz, your platform for unique GTA modifications and helpful tutorials to optimize your gaming experience.",
        gta5: "GTA 5",
        gta6: "GTA 6",
        
        // Platform descriptions
        what_is_fivem: "WHAT IS FIVEM?",
        what_is_ragemp: "WHAT IS RAGEMP?",
        fivem_desc_1: "FiveM Is A Multiplayer Mod For GTA V",
        fivem_desc_2: "Developed By Cfx.Re (Now Part Of Rockstar/Take-Two)",
        fivem_desc_3: "Focus On Community Servers With Mods And Scripts",
        fivem_desc_4: "Scripting Primarily In Lua, JavaScript, And C#",
        fivem_desc_5: "Widely Used For Roleplay Servers (GTA RP)",
        fivem_desc_6: "Large Community, Many Resources And Tutorials Available",
        fivem_desc_7: "Runs Independently Of GTA Online - So No Risk Of Ban",
        
        // Platform modal
        choose_platform: "Choose Your Platform",
        fivem_platform: "FiveM",
        ragemp_platform: "RAGE MP",
        fivem_platform_desc: "Roleplay and custom server mods",
        ragemp_platform_desc: "Multiplayer mods for RAGE MP",
        
        // Coming soon pages
        coming_soon: "Coming Soon",
        stay_tuned: "Stay Tuned for Amazing FiveM Mods!",
        stay_updated: "Stay Updated",
        notify_me: "Notify Me",
        back_to_home: "Back to Home",
        enter_email: "Enter your email address",
        
        // About page
        english: "English",
        german: "Deutsch",
        spanish: "Español", 
        french: "Français",
        our_mission: "Our Mission",
        mission_description: "We're here to bring the RageMP community together—offering free, high-quality mods, sharing knowledge, and making sure everyone has access to great content without harm or barriers.",
        community_first: "Community First",
        community_first_desc: "We support and uplift each other so modding stays fun and inclusive.",
        free_access: "Free Access",
        free_access_desc: "All our mods are free and always will be—modding belongs to everyone.",
        quality_safety: "Quality & Safety",
        quality_safety_desc: "Every release is tested and clean, so you can install with confidence.",
        
        // Authentication
        username: "Username",
        email: "Email",
        password: "Password",
        confirm_password: "Confirm Password",
        create_account: "Create an Account",
        welcome_back: "Welcome Back",
        remember_me: "Remember me",
        forgot_password: "Forgot password?",
        already_have_account: "Already have an account?",
        dont_have_account: "Don't have an account?",
        passwords_dont_match: "Passwords don't match",
        password_too_short: "Password must be at least 6 characters",
        registration_success: "Registration successful!",
        login_success: "Login successful!"
    },
    
    de: {
        // Navigation
        home: "Startseite",
        about: "Über uns",
        support: "Support",
        back: "Zurück",
        login: "Anmelden",
        register: "Registrieren",
        
        // Main page
        main_title: "Entdecke neue Welten der Modifikationen",
        main_description: "Willkommen bei Marsupilami Modz, deiner Plattform für einzigartige GTA-Modifikationen und hilfreiche Tutorials zur Optimierung deines Spielerlebnisses.",
        gta5: "GTA 5",
        gta6: "GTA 6",
        
        // Platform descriptions
        what_is_fivem: "WAS IST FIVEM?",
        what_is_ragemp: "WAS IST RAGEMP?",
        fivem_desc_1: "FiveM ist ein Multiplayer-Mod für GTA V",
        fivem_desc_2: "Entwickelt von Cfx.Re (jetzt Teil von Rockstar/Take-Two)",
        fivem_desc_3: "Fokus auf Community-Server mit Mods und Skripten",
        fivem_desc_4: "Scripting hauptsächlich in Lua, JavaScript und C#",
        fivem_desc_5: "Weit verbreitet für Roleplay-Server (GTA RP)",
        fivem_desc_6: "Große Community, viele Ressourcen und Tutorials verfügbar",
        fivem_desc_7: "Läuft unabhängig von GTA Online - daher kein Bann-Risiko",
        
        // Platform modal
        choose_platform: "Wähle deine Plattform",
        fivem_platform: "FiveM",
        ragemp_platform: "RAGE MP",
        fivem_platform_desc: "Roleplay und benutzerdefinierte Server-Mods",
        ragemp_platform_desc: "Multiplayer-Mods für RAGE MP",
        
        // Coming soon pages
        coming_soon: "Demnächst",
        stay_tuned: "Bleib dran für tolle FiveM Mods!",
        stay_updated: "Bleib auf dem Laufenden",
        notify_me: "Benachrichtigen",
        back_to_home: "Zurück zur Startseite",
        enter_email: "E-Mail-Adresse eingeben",
        
        // About page
        english: "English",
        german: "Deutsch",
        spanish: "Español",
        french: "Français",
        our_mission: "Unsere Mission",
        mission_description: "Wir sind hier, um die RageMP-Community zusammenzubringen—mit kostenlosen, hochwertigen Mods, Wissensaustausch und dem Ziel, dass jeder Zugang zu großartigen Inhalten hat, ohne Schaden oder Barrieren.",
        community_first: "Gemeinschaft zuerst",
        community_first_desc: "Wir unterstützen und stärken uns gegenseitig, damit Modding Spaß macht und inklusiv bleibt.",
        free_access: "Kostenloser Zugang",
        free_access_desc: "Alle unsere Mods sind kostenlos und werden es immer sein—Modding gehört allen.",
        quality_safety: "Qualität & Sicherheit",
        quality_safety_desc: "Jede Veröffentlichung wird getestet und ist sauber, sodass Sie mit Vertrauen installieren können.",
        
        // Authentication
        username: "Benutzername",
        email: "E-Mail",
        password: "Passwort",
        confirm_password: "Passwort bestätigen",
        create_account: "Konto erstellen",
        welcome_back: "Willkommen zurück",
        remember_me: "Angemeldet bleiben",
        forgot_password: "Passwort vergessen?",
        already_have_account: "Haben Sie bereits ein Konto?",
        dont_have_account: "Haben Sie noch kein Konto?",
        passwords_dont_match: "Passwörter stimmen nicht überein",
        password_too_short: "Passwort muss mindestens 6 Zeichen haben",
        registration_success: "Registrierung erfolgreich!",
        login_success: "Anmeldung erfolgreich!"
    },
    
    es: {
        // Navigation
        home: "Inicio",
        about: "Acerca de",
        support: "Soporte",
        back: "Atrás",
        login: "Iniciar sesión",
        register: "Registrarse",
        
        // Main page
        main_title: "Descubre nuevos mundos de modificaciones",
        main_description: "Bienvenido a Marsupilami Modz, tu plataforma para modificaciones únicas de GTA y tutoriales útiles para optimizar tu experiencia de juego.",
        gta5: "GTA 5",
        gta6: "GTA 6",
        
        // Platform descriptions
        what_is_fivem: "¿QUÉ ES FIVEM?",
        what_is_ragemp: "¿QUÉ ES RAGEMP?",
        fivem_desc_1: "FiveM es un mod multijugador para GTA V",
        fivem_desc_2: "Desarrollado por Cfx.Re (ahora parte de Rockstar/Take-Two)",
        fivem_desc_3: "Enfoque en servidores comunitarios con mods y scripts",
        fivem_desc_4: "Scripting principalmente en Lua, JavaScript y C#",
        fivem_desc_5: "Ampliamente usado para servidores de roleplay (GTA RP)",
        fivem_desc_6: "Gran comunidad, muchos recursos y tutoriales disponibles",
        fivem_desc_7: "Funciona independientemente de GTA Online - sin riesgo de baneo",
        
        // Platform modal
        choose_platform: "Elige tu plataforma",
        fivem_platform: "FiveM",
        ragemp_platform: "RAGE MP",
        fivem_platform_desc: "Mods de roleplay y servidores personalizados",
        ragemp_platform_desc: "Mods multijugador para RAGE MP",
        
        // Coming soon pages
        coming_soon: "Próximamente",
        stay_tuned: "¡Mantente atento a los increíbles mods de FiveM!",
        stay_updated: "Mantente actualizado",
        notify_me: "Notificarme",
        back_to_home: "Volver al inicio",
        enter_email: "Ingresa tu dirección de correo",
        
        // About page
        english: "English",
        german: "Deutsch",
        spanish: "Español",
        french: "Français",
        our_mission: "Nuestra Misión",
        mission_description: "Estamos aquí para unir a la comunidad de RageMP—ofreciendo mods gratuitos y de alta calidad, compartiendo conocimiento y asegurando que todos tengan acceso a contenido genial sin daño o barreras.",
        community_first: "Comunidad Primero",
        community_first_desc: "Nos apoyamos y elevamos mutuamente para que el modding siga siendo divertido e inclusivo.",
        free_access: "Acceso Gratuito",
        free_access_desc: "Todos nuestros mods son gratuitos y siempre lo serán—el modding pertenece a todos.",
        quality_safety: "Calidad y Seguridad",
        quality_safety_desc: "Cada lanzamiento es probado y limpio, para que puedas instalar con confianza.",
        
        // Authentication
        username: "Nombre de usuario",
        email: "Correo electrónico",
        password: "Contraseña",
        confirm_password: "Confirmar Contraseña",
        create_account: "Crear una Cuenta",
        welcome_back: "Bienvenido de vuelta",
        remember_me: "Recordarme",
        forgot_password: "¿Olvidaste tu contraseña?",
        already_have_account: "¿Ya tienes una cuenta?",
        dont_have_account: "¿No tienes una cuenta?",
        passwords_dont_match: "Las contraseñas no coinciden",
        password_too_short: "La contraseña debe tener al menos 6 caracteres",
        registration_success: "¡Registro exitoso!",
        login_success: "¡Inicio de sesión exitoso!"
    },
    
    fr: {
        // Navigation
        home: "Accueil",
        about: "À propos",
        support: "Support",
        back: "Retour",
        login: "Connexion",
        register: "S'inscrire",
        
        // Main page
        main_title: "Découvrez de nouveaux mondes de modifications",
        main_description: "Bienvenue sur Marsupilami Modz, votre plateforme pour des modifications GTA uniques et des tutoriels utiles pour optimiser votre expérience de jeu.",
        gta5: "GTA 5",
        gta6: "GTA 6",
        
        // Platform descriptions
        what_is_fivem: "QU'EST-CE QUE FIVEM ?",
        what_is_ragemp: "QU'EST-CE QUE RAGEMP ?",
        fivem_desc_1: "FiveM est un mod multijoueur pour GTA V",
        fivem_desc_2: "Développé par Cfx.Re (maintenant partie de Rockstar/Take-Two)",
        fivem_desc_3: "Focus sur les serveurs communautaires avec mods et scripts",
        fivem_desc_4: "Scripts principalement en Lua, JavaScript et C#",
        fivem_desc_5: "Largement utilisé pour les serveurs de roleplay (GTA RP)",
        fivem_desc_6: "Grande communauté, nombreuses ressources et tutoriels disponibles",
        fivem_desc_7: "Fonctionne indépendamment de GTA Online - aucun risque de ban",
        
        // Platform modal
        choose_platform: "Choisissez votre plateforme",
        fivem_platform: "FiveM",
        ragemp_platform: "RAGE MP",
        fivem_platform_desc: "Mods de roleplay et serveurs personnalisés",
        ragemp_platform_desc: "Mods multijoueur pour RAGE MP",
        
        // Coming soon pages
        coming_soon: "Bientôt disponible",
        stay_tuned: "Restez à l'écoute pour d'incroyables mods FiveM !",
        stay_updated: "Restez informé",
        notify_me: "Me notifier",
        back_to_home: "Retour à l'accueil",
        enter_email: "Entrez votre adresse email",
        
        // About page
        english: "English",
        german: "Deutsch", 
        spanish: "Español",
        french: "Français",
        our_mission: "Notre Mission",
        mission_description: "Nous sommes là pour rassembler la communauté RageMP—en offrant des mods gratuits et de qualité, en partageant les connaissances et en nous assurant que tout le monde a accès à du contenu génial sans préjudice ni barrières.",
        community_first: "Communauté d'abord",
        community_first_desc: "Nous nous soutenons et nous nous élevons mutuellement pour que le modding reste amusant et inclusif.",
        free_access: "Accès Gratuit",
        free_access_desc: "Tous nos mods sont gratuits et le resteront toujours—le modding appartient à tout le monde.",
        quality_safety: "Qualité et Sécurité",
        quality_safety_desc: "Chaque version est testée et propre, vous pouvez donc installer en toute confiance.",
        
        // Authentication
        username: "Nom d'utilisateur",
        email: "E-mail",
        password: "Mot de passe",
        confirm_password: "Confirmer le mot de passe",
        create_account: "Créer un Compte",
        welcome_back: "Bon retour",
        remember_me: "Se souvenir de moi",
        forgot_password: "Mot de passe oublié ?",
        already_have_account: "Vous avez déjà un compte ?",
        dont_have_account: "Vous n'avez pas de compte ?",
        passwords_dont_match: "Les mots de passe ne correspondent pas",
        password_too_short: "Le mot de passe doit contenir au moins 6 caractères",
        registration_success: "Inscription réussie !",
        login_success: "Connexion réussie !"
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    initializeLanguage();
});

function initializeApp() {
    // Add smooth scrolling
    addSmoothScrolling();
    
    // Add loading animations
    addLoadingAnimations();
}

function setupEventListeners() {
    // Game selection buttons
    gameButtons.forEach(button => {
        button.addEventListener('click', handleGameSelection);
    });
    
    // Platform selection cards
    platformCards.forEach(card => {
        card.addEventListener('click', handlePlatformSelection);
    });
    
    // Modal close
    closeModal.addEventListener('click', closeModalHandler);
    
    // Back button event listeners
    if (backBtn) {
        backBtn.addEventListener('click', goBack);
    }
    
    if (backFromPlatform) {
        backFromPlatform.addEventListener('click', goBack);
    }
    
    if (backFromComingSoon) {
        backFromComingSoon.addEventListener('click', goBack);
    }
    
    if (backFromFiveMComingSoon) {
        backFromFiveMComingSoon.addEventListener('click', goBack);
    }
    
    if (backToHomeFiveM) {
        backToHomeFiveM.addEventListener('click', goBack);
    }
    
    // RAGE MP mods back button
    const backFromRageMPMods = document.getElementById('backFromRageMPMods');
    if (backFromRageMPMods) {
        backFromRageMPMods.addEventListener('click', goBack);
    }
    
    // Language dropdown
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguageMenu);
    }
    
    if (languageMenu) {
        languageMenu.querySelectorAll('li').forEach(item => {
            item.addEventListener('click', handleLanguageSelection);
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (languageToggle && languageMenu && 
            !languageToggle.contains(event.target) && 
            !languageMenu.contains(event.target)) {
            languageMenu.style.display = 'none';
        }
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === platformModal) {
            closeModalHandler();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

function handleGameSelection(e) {
    const game = e.currentTarget.getAttribute('data-game');
    selectedGame = game;
    
    // Add to navigation history
    addToHistory('game-selection', { game: game });
    
    // Add visual feedback
    gameButtons.forEach(btn => btn.classList.remove('selected'));
    e.currentTarget.classList.add('selected');
    
    // Check if GTA 6 is selected
    if (game === 'gta6') {
        showComingSoonPage();
    } else {
        // Show platform selection modal for GTA 5
        showPlatformModal();
    }
    
    // Add click animation
    e.currentTarget.style.transform = 'scale(0.95)';
    setTimeout(() => {
        e.currentTarget.style.transform = '';
    }, 150);
}

function showPlatformModal() {
    // Add to navigation history
    addToHistory('platform-modal', { game: selectedGame });
    
    platformModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    currentPage = 'platform-modal';
    
    // Show back button
    if (backBtn) {
        backBtn.style.display = 'inline-flex';
    }
    
    // Animate platform cards
    platformCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function handlePlatformSelection(e) {
    const platform = e.currentTarget.getAttribute('data-platform');
    console.log('Platform selected:', platform);
    
    // Add visual feedback
    platformCards.forEach(card => card.classList.remove('selected'));
    e.currentTarget.classList.add('selected');
    
    // Check if FiveM is selected
    if (platform === 'fivem') {
        console.log('Showing FiveM coming soon page');
        showFiveMComingSoonPage();
        // Close modal after a short delay
        setTimeout(() => {
            closeModalHandler();
        }, 500);
    } else if (platform === 'ragemp') {
        console.log('Redirecting to RAGE MP mods page');
        // Redirect to the separate RAGE MP page
        window.location.href = 'ragemp.html';
    } else {
        console.log('Simulating navigation for platform:', platform);
        // Simulate navigation to the selected platform
        simulateNavigation(selectedGame, platform);
        // Close modal after a short delay
        setTimeout(() => {
            closeModalHandler();
        }, 500);
    }
}

function simulateNavigation(game, platform) {
    // Show loading state
    const selectedCard = document.querySelector(`[data-platform="${platform}"]`);
    const originalContent = selectedCard.innerHTML;
    
    selectedCard.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>Loading ${game.toUpperCase()} ${platform.toUpperCase()}...</p>
        </div>
    `;
    
    // Add loading spinner styles
    const style = document.createElement('style');
    style.textContent = `
        .loading-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }
        
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(168, 85, 247, 0.3);
            border-top: 3px solid #a855f7;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Simulate loading time
    setTimeout(() => {
        selectedCard.innerHTML = originalContent;
        showSuccessMessage(`Redirecting to ${game.toUpperCase()} ${platform.toUpperCase()}...`);
    }, 2000);
}

function closeModalHandler() {
    platformModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentPage = 'home';
    
    // Hide back button
    if (backBtn) {
        backBtn.style.display = 'none';
    }
    
    // Reset selections
    gameButtons.forEach(btn => btn.classList.remove('selected'));
    platformCards.forEach(card => card.classList.remove('selected'));
    
    // Remove from history
    removeFromHistory();
}

function handleKeyboardNavigation(e) {
    // Close modal with Escape key
    if (e.key === 'Escape' && platformModal.style.display === 'block') {
        closeModalHandler();
    }
    
    // Navigate with arrow keys
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const selectedButton = document.querySelector('.game-btn.selected');
        if (selectedButton) {
            const buttons = Array.from(gameButtons);
            const currentIndex = buttons.indexOf(selectedButton);
            
            if (e.key === 'ArrowRight' && currentIndex < buttons.length - 1) {
                buttons[currentIndex + 1].click();
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                buttons[currentIndex - 1].click();
            }
        }
    }
}

function addSmoothScrolling() {
    // Smooth scrolling for anchor links
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
}

function addLoadingAnimations() {
    // Add entrance animations to elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe columns for animation
    document.querySelectorAll('.column').forEach((column, index) => {
        column.style.opacity = '0';
        column.style.transform = 'translateY(30px)';
        column.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(column);
    });
    
    // Observe game buttons
    document.querySelectorAll('.game-btn').forEach(button => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        button.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(button);
    });
}

function showSuccessMessage(message) {
    // Create success message element
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .success-message {
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #10b981, #059669);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
            z-index: 3000;
            animation: slideInRight 0.3s ease;
        }
        
        .message-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 600;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(messageDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 3000);
}

// ========================================
// GLOBAL ANIMATION SYSTEM
// ========================================

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
});

function initializeAnimations() {
    // Add page load animation to body
    document.body.classList.add('page-load');
    
    // Initialize scroll-triggered animations
    initScrollAnimations();
    
    // Add hover effects to interactive elements
    addHoverEffects();
    
    // Add ripple effects to buttons
    addRippleEffects();
    
    // Add form input animations
    addFormAnimations();
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Add hover effects to cards and interactive elements
function addHoverEffects() {
    // Add hover effects to platform cards
    document.querySelectorAll('.platform-card').forEach(card => {
        card.classList.add('card-animated');
    });
    
    // Add hover effects to mod cards
    document.querySelectorAll('.mod-card').forEach(card => {
        card.classList.add('card-animated');
    });
    
    // Add hover effects to navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.add('hover-glow');
    });
    
    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.add('hover-lift');
    });
}

// Add ripple effects to buttons
function addRippleEffects() {
    document.querySelectorAll('.btn').forEach(button => {
        button.classList.add('btn-ripple');
    });
}

// Add form input animations
function addFormAnimations() {
    document.querySelectorAll('input, textarea, select').forEach(input => {
        input.classList.add('form-input-animated');
    });
}

// Utility function to add staggered animations
function addStaggeredAnimation(elements, animationClass, delay = 100) {
    elements.forEach((element, index) => {
        element.classList.add(animationClass);
        element.classList.add(`delay-${(index + 1) * delay}`);
    });
}

// Animate elements on page load
function animateOnLoad(selector, animationClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
        element.classList.add(animationClass);
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

// Smooth scroll to element
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add loading animation
function showLoadingAnimation(element) {
    element.innerHTML = '<span class="loading-dots">Loading</span>';
}

// Remove loading animation
function hideLoadingAnimation(element, content) {
    element.innerHTML = content;
}

// Add hover effects to platform cards
document.querySelectorAll('.platform-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effects to game buttons
document.querySelectorAll('.game-btn').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add parallax effect to background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.landing-page');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add typing effect to main title
function addTypingEffect() {
    const title = document.querySelector('.main-title');
    const text = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
}

// Initialize typing effect
setTimeout(addTypingEffect, 500);

// Add particle effect to background
function addParticleEffect() {
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: rgba(168, 85, 247, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        document.body.appendChild(particle);
        particles.push(particle);
    }
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0.5;
            }
            50% {
                transform: translateY(-20px) rotate(180deg);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize particle effect
setTimeout(addParticleEffect, 1000);

// Coming Soon Page Functions
function showComingSoonPage() {
    // Don't add coming-soon to history, just add the game selection that led to it
    // The coming-soon page should always go back to home
    
    const comingSoonPage = document.getElementById('comingSoonPage');
    comingSoonPage.style.display = 'block';
    document.body.style.overflow = 'hidden';
    currentPage = 'coming-soon';
    
    // Start countdown timer
    startCountdown();
    
    // Add entrance animation
    comingSoonPage.style.opacity = '0';
    comingSoonPage.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        comingSoonPage.style.transition = 'all 0.5s ease';
        comingSoonPage.style.opacity = '1';
        comingSoonPage.style.transform = 'scale(1)';
    }, 100);
}

function showFiveMComingSoonPage() {
    console.log('showFiveMComingSoonPage called');
    
    // Don't add to history, always go back to home
    
    const fivemComingSoonPage = document.getElementById('fivemComingSoonPage');
    console.log('fivemComingSoonPage element:', fivemComingSoonPage);
    
    if (fivemComingSoonPage) {
        // Hide any other pages that might be showing
        const ragempModsPage = document.getElementById('ragempModsPage');
        if (ragempModsPage) {
            ragempModsPage.style.display = 'none';
        }
        
        fivemComingSoonPage.style.display = 'block';
        document.body.style.overflow = 'hidden';
        currentPage = 'fivem-coming-soon';
        
        // Add entrance animation
        fivemComingSoonPage.style.opacity = '0';
        fivemComingSoonPage.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            fivemComingSoonPage.style.transition = 'all 0.5s ease';
            fivemComingSoonPage.style.opacity = '1';
            fivemComingSoonPage.style.transform = 'scale(1)';
        }, 100);
        
        console.log('FiveM coming soon page should be visible now');
    } else {
        console.error('fivemComingSoonPage element not found!');
    }
}

function showRageMPModsPage() {
    console.log('showRageMPModsPage called');
    
    // Add to navigation history
    addToHistory('ragemp-mods', { game: selectedGame, platform: 'ragemp' });
    
    const ragempModsPage = document.getElementById('ragempModsPage');
    console.log('ragempModsPage element:', ragempModsPage);
    
    if (ragempModsPage) {
        // Hide any other pages that might be showing
        const fivemComingSoonPage = document.getElementById('fivemComingSoonPage');
        if (fivemComingSoonPage) {
            fivemComingSoonPage.style.display = 'none';
        }
        
        ragempModsPage.style.display = 'block';
        document.body.style.overflow = 'hidden';
        currentPage = 'ragemp-mods';
        
        // Show back button
        if (backBtn) {
            backBtn.style.display = 'inline-flex';
        }
        
        // Add entrance animation
        ragempModsPage.style.opacity = '0';
        ragempModsPage.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            ragempModsPage.style.transition = 'all 0.5s ease';
            ragempModsPage.style.opacity = '1';
            ragempModsPage.style.transform = 'scale(1)';
        }, 100);
        
        console.log('RAGE MP mods page should be visible now');
    } else {
        console.error('ragempModsPage element not found!');
    }
}

function startCountdown() {
    // Set target date (example: 1 year from now)
    const targetDate = new Date();
    targetDate.setFullYear(targetDate.getFullYear() + 1);
    
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            // Countdown finished - you can add special effects here
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update countdown display
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

function hideComingSoonPage() {
    const comingSoonPage = document.getElementById('comingSoonPage');
    comingSoonPage.style.transition = 'all 0.5s ease';
    comingSoonPage.style.opacity = '0';
    comingSoonPage.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        comingSoonPage.style.display = 'none';
        document.body.style.overflow = 'auto';
        currentPage = 'home';
    }, 500);
}

function hideFiveMComingSoonPage() {
    const fivemComingSoonPage = document.getElementById('fivemComingSoonPage');
    fivemComingSoonPage.style.transition = 'all 0.5s ease';
    fivemComingSoonPage.style.opacity = '0';
    fivemComingSoonPage.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        fivemComingSoonPage.style.display = 'none';
        document.body.style.overflow = 'auto';
        currentPage = 'home';
    }, 500);
}

// Event listeners for coming soon page
document.addEventListener('DOMContentLoaded', function() {
    // Back to home button
    const backToHomeBtn = document.getElementById('backToHome');
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', function() {
            goBack();
        });
    }
    
    // Notify button for GTA VI
    const notifyBtn = document.getElementById('notifyBtn');
    const notifyEmail = document.getElementById('notifyEmail');
    
    if (notifyBtn && notifyEmail) {
        notifyBtn.addEventListener('click', function() {
            const email = notifyEmail.value.trim();
            
            if (!email) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate email subscription
            showMessage('Thank you! We\'ll notify you when GTA VI mods are available!', 'success');
            notifyEmail.value = '';
        });
        
        // Enter key support for email input
        notifyEmail.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                notifyBtn.click();
            }
        });
    }
    
    // Notify button for FiveM
    const notifyBtnFiveM = document.getElementById('notifyBtnFiveM');
    const notifyEmailFiveM = document.getElementById('notifyEmailFiveM');
    
    if (notifyBtnFiveM && notifyEmailFiveM) {
        notifyBtnFiveM.addEventListener('click', function() {
            const email = notifyEmailFiveM.value.trim();
            
            if (!email) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate email subscription
            showMessage('Thank you! We\'ll notify you when FiveM mods are available!', 'success');
            notifyEmailFiveM.value = '';
        });
        
        // Enter key support for email input
        notifyEmailFiveM.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                notifyBtnFiveM.click();
            }
        });
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add keyboard support for coming soon pages
document.addEventListener('keydown', function(e) {
    const comingSoonPage = document.getElementById('comingSoonPage');
    const fivemComingSoonPage = document.getElementById('fivemComingSoonPage');
    const ragempModsPage = document.getElementById('ragempModsPage');
    
    if (comingSoonPage.style.display === 'block' || fivemComingSoonPage.style.display === 'block' || ragempModsPage.style.display === 'block') {
        // Escape key to go back
        if (e.key === 'Escape') {
            goBack();
        }
    }
});

// Navigation History Functions
function addToHistory(page, data) {
    navigationHistory.push({
        page: page,
        data: data,
        timestamp: Date.now()
    });
}

function removeFromHistory() {
    if (navigationHistory.length > 0) {
        navigationHistory.pop();
    }
}

function goBack() {
    if (navigationHistory.length === 0) {
        // No history, go to home
        goToHome();
        return;
    }
    
    const lastPage = navigationHistory[navigationHistory.length - 1];
    
    // Remove current page from history
    navigationHistory.pop();
    
    switch (lastPage.page) {
        case 'home':
            goToHome();
            break;
        case 'game-selection':
            goToGameSelection();
            break;
        case 'platform-modal':
            goToPlatformModal();
            break;
        case 'ragemp-mods':
            goToHome();
            break;
        case 'coming-soon':
            // Don't go back to coming soon, go to home instead
            goToHome();
            break;
        default:
            goToHome();
    }
}

function goToHome() {
    // Hide all modals and pages
    if (platformModal) {
        platformModal.style.display = 'none';
    }
    
    const comingSoonPage = document.getElementById('comingSoonPage');
    if (comingSoonPage) {
        comingSoonPage.style.display = 'none';
    }
    
    const fivemComingSoonPage = document.getElementById('fivemComingSoonPage');
    if (fivemComingSoonPage) {
        fivemComingSoonPage.style.display = 'none';
    }
    
    const ragempModsPage = document.getElementById('ragempModsPage');
    if (ragempModsPage) {
        ragempModsPage.style.display = 'none';
    }
    
    document.body.style.overflow = 'auto';
    currentPage = 'home';
    
    // Hide back button
    if (backBtn) {
        backBtn.style.display = 'none';
    }
    
    // Reset selections
    gameButtons.forEach(btn => btn.classList.remove('selected'));
    platformCards.forEach(card => card.classList.remove('selected'));
    selectedGame = null;
    currentPlatform = null;
}

function goToGameSelection() {
    goToHome();
    // Game selection is already visible on home page
}

function goToPlatformModal() {
    if (selectedGame) {
        showPlatformModal();
    } else {
        goToHome();
    }
}

function goToComingSoon() {
    // Coming soon page should always go back to home
    goToHome();
}

// Language Functions
function initializeLanguage() {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
        
        // Update the dropdown button to show the saved language
        const languageItem = languageMenu.querySelector(`[data-lang="${savedLanguage}"]`);
        if (languageItem) {
            languageToggle.innerHTML = languageItem.innerHTML;
        }
    }
    
    // Apply the current language
    applyLanguage(currentLanguage);
}

function toggleLanguageMenu() {
    const isOpen = languageMenu.style.display === 'block';
    languageMenu.style.display = isOpen ? 'none' : 'block';
}

function handleLanguageSelection(e) {
    const selectedLanguage = e.currentTarget.getAttribute('data-lang');
    const selectedItem = e.currentTarget;
    
    // Update button with chosen language + flag
    languageToggle.innerHTML = selectedItem.innerHTML;
    languageMenu.style.display = 'none';
    
    currentLanguage = selectedLanguage;
    
    // Save language preference
    localStorage.setItem('selectedLanguage', selectedLanguage);
    
    // Apply the new language
    applyLanguage(selectedLanguage);
    
    // Show success message
    const languageName = getLanguageName(selectedLanguage);
    showMessage(`Language changed to ${languageName}`, 'success');
}


function applyLanguage(language) {
    if (!translations[language]) {
        console.warn(`Language ${language} not found, falling back to English`);
        language = 'en';
    }
    
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language][key]) {
            // Check if it's an input placeholder
            if (element.tagName === 'INPUT' && element.type === 'email') {
                element.placeholder = translations[language][key];
            } else {
                element.textContent = translations[language][key];
            }
        }
    });
    
    // Update specific elements that need special handling
    updateModalTitles(language);
    updateComingSoonPages(language);
}

function updateModalTitles(language) {
    // Update platform modal title
    const modalTitle = document.querySelector('#platformModal .modal-header h2');
    if (modalTitle && translations[language]['choose_platform']) {
        modalTitle.textContent = translations[language]['choose_platform'];
    }
    
    // Update platform card descriptions
    const fivemCard = document.querySelector('[data-platform="fivem"] p');
    if (fivemCard && translations[language]['fivem_platform_desc']) {
        fivemCard.textContent = translations[language]['fivem_platform_desc'];
    }
    
    const ragempCard = document.querySelector('[data-platform="ragemp"] p');
    if (ragempCard && translations[language]['ragemp_platform_desc']) {
        ragempCard.textContent = translations[language]['ragemp_platform_desc'];
    }
}

function updateComingSoonPages(language) {
    // Update GTA VI coming soon page
    const gtaComingSoonBadge = document.querySelector('#comingSoonPage .coming-soon-badge');
    if (gtaComingSoonBadge && translations[language]['coming_soon']) {
        gtaComingSoonBadge.innerHTML = `<i class="fas fa-clock"></i> ${translations[language]['coming_soon']}`;
    }
    
    // Update FiveM coming soon page
    const fivemComingSoonBadge = document.querySelector('#fivemComingSoonPage .coming-soon-badge');
    if (fivemComingSoonBadge && translations[language]['coming_soon']) {
        fivemComingSoonBadge.innerHTML = `<i class="fas fa-clock"></i> ${translations[language]['coming_soon']}`;
    }
    
    const fivemStayTuned = document.querySelector('#fivemComingSoonPage .coming-soon-message h2');
    if (fivemStayTuned && translations[language]['stay_tuned']) {
        fivemStayTuned.textContent = translations[language]['stay_tuned'];
    }
    
    // Update email placeholders
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        if (translations[language]['enter_email']) {
            input.placeholder = translations[language]['enter_email'];
        }
    });
    
    // Update notify buttons
    const notifyButtons = document.querySelectorAll('#notifyBtn, #notifyBtnFiveM');
    notifyButtons.forEach(button => {
        if (translations[language]['notify_me']) {
            const buttonText = button.querySelector('span') || button;
            if (button.querySelector('i')) {
                button.innerHTML = `<i class="fas fa-bell"></i> ${translations[language]['notify_me']}`;
            }
        }
    });
    
    // Update stay updated sections
    const stayUpdatedTitles = document.querySelectorAll('.notify-section h3');
    stayUpdatedTitles.forEach(title => {
        if (translations[language]['stay_updated']) {
            title.textContent = translations[language]['stay_updated'];
        }
    });
    
    // Update back to home buttons
    const backToHomeButtons = document.querySelectorAll('#backToHome, #backToHomeFiveM');
    backToHomeButtons.forEach(button => {
        if (translations[language]['back_to_home']) {
            button.innerHTML = `<i class="fas fa-arrow-left"></i> ${translations[language]['back_to_home']}`;
        }
    });
}

function getLanguageName(languageCode) {
    const languageNames = {
        'en': 'English',
        'de': 'Deutsch',
        'es': 'Español', 
        'fr': 'Français'
    };
    return languageNames[languageCode] || languageCode;
}

// Test function to manually show RAGE MP mods page
function testRageMPMods() {
    console.log('Testing RAGE MP mods page...');
    const ragempModsPage = document.getElementById('ragempModsPage');
    if (ragempModsPage) {
        ragempModsPage.style.display = 'block';
        ragempModsPage.style.opacity = '1';
        ragempModsPage.style.transform = 'scale(1)';
        document.body.style.overflow = 'hidden';
        console.log('RAGE MP mods page should be visible now');
    } else {
        console.error('ragempModsPage element not found!');
    }
}

// Make it available globally for testing
window.testRageMPMods = testRageMPMods;

function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Add styles for messages
    const messageStyles = `
        .message {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-weight: 500;
            z-index: 3000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        }
        
        .message.success {
            background: rgba(16, 185, 129, 0.9);
            color: white;
            border: 1px solid rgba(16, 185, 129, 0.5);
        }
        
        .message.error {
            background: rgba(239, 68, 68, 0.9);
            color: white;
            border: 1px solid rgba(239, 68, 68, 0.5);
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    // Add styles if not already added
    if (!document.getElementById('messageStyles')) {
        const style = document.createElement('style');
        style.id = 'messageStyles';
        style.textContent = messageStyles;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(messageDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 3000);
}

// ========================================
// GLOBAL ANIMATION SYSTEM
// ========================================

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
});

function initializeAnimations() {
    // Add page load animation to body
    document.body.classList.add('page-load');
    
    // Initialize scroll-triggered animations
    initScrollAnimations();
    
    // Add hover effects to interactive elements
    addHoverEffects();
    
    // Add ripple effects to buttons
    addRippleEffects();
    
    // Add form input animations
    addFormAnimations();
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Add hover effects to cards and interactive elements
function addHoverEffects() {
    // Add hover effects to platform cards
    document.querySelectorAll('.platform-card').forEach(card => {
        card.classList.add('card-animated');
    });
    
    // Add hover effects to mod cards
    document.querySelectorAll('.mod-card').forEach(card => {
        card.classList.add('card-animated');
    });
    
    // Add hover effects to navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.add('hover-glow');
    });
    
    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.add('hover-lift');
    });
}

// Add ripple effects to buttons
function addRippleEffects() {
    document.querySelectorAll('.btn').forEach(button => {
        button.classList.add('btn-ripple');
    });
}

// Add form input animations
function addFormAnimations() {
    document.querySelectorAll('input, textarea, select').forEach(input => {
        input.classList.add('form-input-animated');
    });
}

// Utility function to add staggered animations
function addStaggeredAnimation(elements, animationClass, delay = 100) {
    elements.forEach((element, index) => {
        element.classList.add(animationClass);
        element.classList.add(`delay-${(index + 1) * delay}`);
    });
}

// Animate elements on page load
function animateOnLoad(selector, animationClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
        element.classList.add(animationClass);
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

// Smooth scroll to element
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add loading animation
function showLoadingAnimation(element) {
    element.innerHTML = '<span class="loading-dots">Loading</span>';
}

// Remove loading animation
function hideLoadingAnimation(element, content) {
    element.innerHTML = content;
}
