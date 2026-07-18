document.addEventListener("DOMContentLoaded", function() {
    // 1. RÉCUPÉRATION DE LA SESSION ET SÉCURITÉ IM MÉDIATE
    const sessionData = localStorage.getItem('agentConnecte');

    // Si aucune session n'est en mémoire, rejet immédiat vers la page de connexion
    if (!sessionData) {
        alert("⚠️ Accès refusé : Veuillez vous connecter d'abord.");
        window.location.href = "index.html";
        return;
    }

    const agent = JSON.parse(sessionData);

    // 2. GESTION DE L'INACTIVITÉ (DÉCONNEXION AUTOMATIQUE APRÈS 5 MINUTES)
    let inactivityTimeout;
    const fiveMinutes = 5 * 60 * 1000; // 300 000 millisecondes

    function logout() {
        localStorage.removeItem('agentConnecte'); // Efface les données de session
        alert("⏱️ Session expirée : Vous avez été déconnecté pour inactivité.");
        window.location.href = "index.html";
    }

    function resetInactivityTimer() {
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(logout, fiveMinutes);
    }

    // Liste des actions de l'utilisateur qui réinitialisent le compteur
    const userEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    
    // Attache les écouteurs d'événements pour surveiller l'activité
    userEvents.forEach(event => {
        document.addEventListener(event, resetInactivityTimer);
    });

    // Initialisation du premier minuteur dès le chargement de la page
    resetInactivityTimer();

    // 3. INJECTION DYNAMIQUE ET PERSONNALISATION DU TABLEAU DE BORD
    if (document.getElementById('userMatricule')) {
        document.getElementById('userMatricule').textContent = agent.matricule;
    }
    if (document.getElementById('userRole')) {
        document.getElementById('userRole').textContent = agent.role;
    }
    if (document.getElementById('agentNom')) {
        document.getElementById('agentNom').textContent = agent.nom;
    }
    
    // Récupération et traduction de la commune sélectionnée au login
    if (document.getElementById('currentPoste') && agent.commune) {
        document.getElementById('currentPoste').textContent = traduireNomPoste(agent.commune);
    }

    // 4. GESTION DES DROITS ET RESTRICTIONS DE L'INTERFACE
    // Si l'utilisateur est un simple "Agent de Saisie", il ne peut pas lancer de recherche critique
    if (agent.role === "Agent de Saisie") {
        const btnAlerte = document.querySelector('.btn-action.alert');
        if (btnAlerte) {
            btnAlerte.style.display = "none"; // Masque le bouton de recherche globale
        }
    }
});
