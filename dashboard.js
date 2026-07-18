        // Masquer les boutons d'action si l'agent n'a pas les droits
        // Si l'utilisateur est un simple "Agent de Saisie", il ne peut pas lancer de recherche critique
        if (agent.role === "Agent de Saisie") {
            const btnAlerte = document.querySelector('.btn-action.alert');
            if (btnAlerte) btnAlerte.style.display = "none"; // Masque le bouton de recherche globale
        }
    } else {
        // Sécurité stricte : Si personne n'est connecté en mémoire, on renvoie au login
        alert("⚠️ Accès refusé : Veuillez vous connecter d'abord.");
        window.location.href = "index.html";
    }
}

/**
 * ACTUAlISATION : Traduction et formatage propre des communes de Kinshasa
 * Associe la valeur du menu déroulant HTML à son nom officiel pour l'affichage du Dashboard
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
        'kinshasa': "Commune de Kinshasa",
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

// 2. LOGIQUE DES CALCULS EN TEMPS RÉEL (HORS-LIGNE)
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
    if (countTotal) countTotal.textContent = total;

    const valides = listeVoyageurs.filter(v => v.statut === "VALIDE").length;
    if (countValide) countValide.textContent = valides;

    const expires = listeVoyageurs.filter(v => v.statut === "EXPIRÉ").length;
    if (countExpire) countExpire.textContent = expires;

    if (countRecent) countRecent.textContent = total;
}

// Bouton d'action pour ouvrir le formulaire
function ouvrirFormulaire() {
    window.location.href = "formulaire.html";
}
