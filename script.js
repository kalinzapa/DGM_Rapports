document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Empêche le rechargement de la page

            // Récupération des valeurs saisies par l'agent
            const matriculeSaisi = document.getElementById('matricule').value.trim();
            const passwordSaisi = document.getElementById('password').value;
            
            // CORRECTION : L'identifiant dans le HTML a été changé de 'poste' à 'commune'
            const communeSelectionnee = document.getElementById('commune').value;

            // BASE DE DONNÉES LOCALE DE TEST (Simule les comptes autorisés hors-ligne)
            const comptesAgents = [
                { matricule: "DGM-1234", password: "1234", nom: "MASUDI Patthy", role: "Chef de Bureau" },
                { matricule: "DGM-5678", password: "5678", nom: "KALI David", role: "Agent de Saisie" }
            ];

            // Recherche de l'agent dans notre liste locale
            const agentTrouve = comptesAgents.find(agent => 
                agent.matricule.toLowerCase() === matriculeSaisi.toLowerCase() && 
                agent.password === passwordSaisi
            );

            if (agentTrouve) {
                // Création de l'objet de session avec la commune choisie au moment de la connexion
                const sessionAgent = {
                    matricule: agentTrouve.matricule,
                    nom: agentTrouve.nom,
                    role: agentTrouve.role,
                    commune: communeSelectionnee // Mis à jour pour refléter le champ HTML
                };

                // Sauvegarde sécurisée dans le localStorage pour le Dashboard
                localStorage.setItem('agentConnecte', JSON.stringify(sessionAgent));

                // Redirection vers le tableau de bord
                window.location.href = "dashboard.html";
            } else {
                // Notification d'erreur si les identifiants ne correspondent pas
                // CORRECTION : Message mis à jour pour correspondre aux identifiants réels du script (DGM-1234 / 1234)
                alert("❌ Matricule ou mot de passe incorrect.");
            }
        });
    }
});
