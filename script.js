// Stockage des stats des personnages
const characters = {
    Guerrier: { vie: 100, attaque: 15, defense: 10 },
    Mage: { vie: 80, attaque: 20, defense: 5 },
    Voleur: { vie: 90, attaque: 12, defense: 8 }
};

let playerCharacter = null;

// Fonction pour choisir un personnage
function chooseCharacter(character) {
    playerCharacter = { ...characters[character] }; // Copie pour éviter la modification de l'original

    // Mise à jour de l'affichage 
    document.getElementById("character-name").innerText = `Classe : ${character}`;
    document.getElementById("character-stats").innerText = `Vie : ${playerCharacter.vie}, Attaque : ${playerCharacter.attaque}, Défense : ${playerCharacter.defense}`;

    // Afficher les stats du personnage choisi
    document.getElementById("character-info").style.display = "block";
}

// Création d'un ennemi aléatoire
const enemy = {
    nom: "Gobelin",
    vie: 60,
    attaque: 10
};

// Fonction pour démarrer un combat
function startCombat() {
    if (!playerCharacter) {
        alert("Choisissez un personnage avant de combattre !");
        return;
    }

    // Affichage des HP
    document.getElementById("player-hp").innerText = `👤 Joueur - PV : ${playerCharacter.vie}`;
    document.getElementById("enemy-hp").innerText = `👾 ${enemy.nom} - PV : ${enemy.vie}`;

    // Affichage de la section de combat 
    document.getElementById("combat-section").style.display = "block";
}

// Fonction pour attaquer l'ennemi 
function playerAttack() {
    if (enemy.vie <= 0 || playerCharacter.vie <= 0) {
        alert("Le combat est terminé !");
        return;
    }

    // Dégâts du joueur 
    let damage = Math.floor(Math.random() * playerCharacter.attaque) + 1;
    enemy.vie -= damage;

    // Affichage des nouvelles valeurs
    document.getElementById("enemy-hp").innerText = `👾 ${enemy.nom} - PV : ${enemy.vie}`;
    logCombat(`💥 Vous infligez ${damage} dégâts au ${enemy.nom}!`);

    // Vérification de la victoire 
    if (enemy.vie <= 0) {
        logCombat("🏆 Victoire ! L'ennemi est vaincu !");
        return;
    }

    // Attaque de l'ennemi (si toujours en vie)
    setTimeout(enemyAttack, 1000);
}

// Fonction pour l'ennemi qui attaque 
function enemyAttack() {
    if (playerCharacter.vie <= 0) return;

    let damage = Math.floor(Math.random() * enemy.attaque) + 1;
    playerCharacter.vie -= damage;

    document.getElementById("player-hp").innerText = `👤 Joueur - PV : ${playerCharacter.vie}`;
    logCombat(`🔥 Le ${enemy.nom} vous inflige ${damage} dégâts !`);

    // Vérification de la défaite
    if (playerCharacter.vie <= 0) {
        logCombat("💀 Défaite ! Vous êtes mort...");
    }
}

// Fonction pour afficher les logs du combat
function logCombat(message) {
    let log = document.getElementById("combat-log");
    log.innerHTML += `<p>${message}</p>`;
    log.scrollTop = log.scrollHeight;
}
