document.addEventListener("DOMContentLoaded", function() {
    // 1. RÉCUPÉRATION DE LA SESSION ET SÉCURITÉ
    const sessionData = localStorage.getItem('agentConnecte');

    // Si aucune session n'est en mémoire, rejet immédiat vers la page de connexion
    if (!sessionData) {
        alert("⚠️ Accès refusé : Veuillez vous connecter d'abord.");
        window.location.href = "index.html";
        return;
    }

    const agent = JSON.parse(sessionData);

    // 2. INJECTION DYNAMIQUE ET PERSONNALISATION DU TABLEAU DE BORD
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

    // 3. GESTION DES DROITS ET RESTRICTIONS DE L'INTERFACE
    // Si l'utilisateur est un simple "Agent de Saisie", il ne peut pas lancer de recherche critique
    if (agent.role === "Agent de Saisie") {
        const btnAlerte = document.querySelector('.btn-action.alert');
        if (btnAlerte) {
            btnAlerte.style.display = "none"; // Masque le bouton de recherche globale
        }
    }

    // 4. CHARGEMENT DES STATISTIQUES EN TEMPS RÉEL
    mettreAjourLesStatistiques();

    // 5. GESTIONNAIRE DE DÉCONNEXION
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', function() {
            localStorage.removeItem('agentConnecte');
            window.location.href = "index.html";
        });
    }
});

/**
 * Fonction utilitaire pour afficher proprement le nom officiel de la commune sur l'écran
 */
function traduireNomPoste(codeCommune) {
    const communes = {
        'bandalungwa': "Commune de Bandalungwa",
        'barumbu': "Commune de Barumbu",
        'bumbu': "Commune de Bumbu",
        'gombe': "Commune de la Gombe",
        'kalamu': "Commune de Kalamu",
        'kasa-vubu': "Commune de Kasa-Vubu",
        'kimbanseke': "Commune de Kimbanseke",
        'kinshasa': "Commune de Kinshasa (Centre)",
        'kintambo': "Commune de Kintambo",
        'kisenso': "Commune de Kisenso",
        'lemba': "Commune de Lemba",
        'limete': "Commune de Limete",
        'lingwala': "Commune de Lingwala",
        'makala': "Commune de Makala",
        'maluku': "Commune de Maluku",
        'masina': "Commune de Masina",
        'matete': "Commune de Matete",
        'mont-ngafula': "Commune de Mont-Ngafula",
        'ndjili': "Commune de N'djili",
        'ngaba': "Commune de Ngaba",
        'ngaliema': "Commune de Ngaliema",
        'ngiri-ngiri': "Commune de Ngiri-Ngiri",
        'nsele': "Commune de la N'sele",
        'selembao': "Commune de Selembao"
    };
    return communes[codeCommune] || "Commune / Antenne Non Spécifiée";
}

/**
 * LOGIQUE DES CALCULS EN TEMPS RÉEL (HORS-LIGNE)
 * Lit le registre local et met à jour les 4 compteurs du tableau de bord
 */
function mettreAjourLesStatistiques() {
    let registreLocal = localStorage.getItem('registreDGM');
    let listeVoyageurs = [];
    
    if (registreLocal !== null) {
        listeVoyageurs = JSON.parse(registreLocal);
    }

    const countTotal = document.getElementById('countTotal');
    const countValide = document.getElementById('countValide');
    const countExpire = document.getElementById('countExpire');
    const countRecent = document.getElementById('countRecent');

    const total = listeVoyageurs.length;
    if (countTotal) countTotal.textContent = total.toLocaleString();

    const valides = listeVoyageurs.filter(v => v.statut === "VALIDE").length;
    if (countValide) countValide.textContent = valides.toLocaleString();

    const expires = listeVoyageurs.filter(v => v.statut === "EXPIRÉ").length;
    if (countExpire) countExpire.textContent = expires.toLocaleString();

    if (countRecent) countRecent.textContent = total.toLocaleString(); 
}

/**
 * Redirection vers le formulaire d'enregistrement d'un étranger
 */
function ouvrirFormulaire() {
    window.location.href = "formulaire.html";
}
