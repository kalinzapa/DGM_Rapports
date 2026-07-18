document.addEventListener("DOMContentLoaded", function() {
    // 1. RÉCUPÉRATION DE LA SESSION ET SÉCURITÉ IMMÉDIATE
    const sessionData = localStorage.getItem('agentConnecte');

    // Si aucune session n'est en mémoire, rejet immédiat vers la page de connexion
    if (!sessionData) {
        alert("⚠️ Accès refusé : Veuillez vous connecter d'abord.");
        window.location.href = "index.html";
        return;
    }

    const agent = JSON.parse(sessionData);

    // Fonction centralisée de déconnexion
    function logout(isAutomatic = false) {
        localStorage.removeItem('agentConnecte'); // Nettoie la session
        if (isAutomatic) {
            alert("⏱️ Session expirée : Vous avez été déconnecté pour inactivité.");
        } else {
            alert("👋 Déconnexion réussie. À bientôt !");
        }
        window.location.href = "index.html";
    }

    // 2. GESTION DE L'INACTIVITÉ (DÉCONNEXION AUTOMATIQUE APRÈS 5 MINUTES)
    let inactivityTimeout;
    const fiveMinutes = 5 * 60 * 1000; // 300 000 ms

    function resetInactivityTimer() {
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(() => logout(true), fiveMinutes);
    }

    // Événements utilisateur qui réinitialisent le compteur d'inactivité
    const userEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    userEvents.forEach(event => {
        document.addEventListener(event, resetInactivityTimer);
    });

    resetInactivityTimer(); // Initialisation au chargement

    // 3. ÉCOUTEUR SUR LE BOUTON DE DÉCONNEXION MANUELLE
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', function() {
            logout(false); // Déconnexion manuelle volontaire
        });
    }

    // 4. INJECTION DYNAMIQUE ET PERSONNALISATION DU TABLEAU DE BORD
    if (document.getElementById('userMatricule')) {
        document.getElementById('userMatricule').textContent = agent.matricule;
    }
    if (document.getElementById('userRole')) {
        document.getElementById('userRole').textContent = agent.role;
    }
    if (document.getElementById('agentNom')) {
        document.getElementById('agentNom').textContent = agent.nom;
    }
    
    if (document.getElementById('currentPoste') && agent.commune) {
        document.getElementById('currentPoste').textContent = traduireNomPoste(agent.commune);
    }

    // 5. GESTION DES DROITS ET RESTRICTIONS DE L'INTERFACE
    if (agent.role === "Agent de Saisie") {
        const btnAlerte = document.querySelector('.btn-action.alert');
        if (btnAlerte) {
            btnAlerte.style.display = "none";
        }
    }
});
