// Stockage des stats des personnages
const characters = {
    Guerrier: { vie: 100, attaque: 15, defense: 10 },
    Mage: { vie: 80, attaque: 20, defense: 5 },
    Voleur: { vie: 90, attaque: 12, defense: 8 }
};

let playerCharacter = null;

let potions = 3; // Nombre de potions disponibles
const potionHeal = 30; // Valeur de soin

let playerMana = 50;
const specialCost = 20;

let playerGold = 0; // Or du joueur
let playerXP = 0; // Expérience du joueur

// Fonction pour choisir un personnage
function chooseCharacter(character) {
    playerCharacter = { ...characters[character] }; // Copie pour éviter la modification de l'original
    playerCharacter.classe =character; // Ajout de la classe choisie

    // Mise à jour de l'affichage 
    document.getElementById("character-name").innerText = `Classe : ${character}`;
    document.getElementById("character-stats").innerText = `Vie : ${playerCharacter.vie}, Attaque : ${playerCharacter.attaque}, Défense : ${playerCharacter.defense}`;

    // Afficher les stats du personnage choisi
    document.getElementById("character-info").style.display = "block";

    updateBars();
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

    // Chance de coup critique (20% de chance)
    let isCritical = Math.random() < 0.2;
    let damage = Math.floor(Math.random() * playerCharacter.attaque) + 1;

    if (isCritical) {
        damage = Math.floor(damage * (1.5 + Math.random() * 0.5)); // 1.5x à 2x
        logCombat("⚡ Coup critique! Dégâts doublés !");
    }

    enemy.vie -= damage;

    // Affichage des nouvelles valeurs
    document.getElementById("enemy-hp").innerText = `👾 ${enemy.nom} - PV : ${enemy.vie}`;
    logCombat(`💥 Vous infligez ${damage} dégâts au ${enemy.nom} !`);

    // Vérification de la victoire 
    if (enemy.vie <= 0) {
        let goldEarned = Math.floor(Math.random() * 20) + 10; // Entre 10 et 30 or
        let xpEarned = Math.floor(Math.random() * 15) + 5; // Entre 5 et 20 XP

        playerGold += goldEarned;
        playerXP += xpEarned;

        logCombat(`🏆 Victoire ! Vous gagnez ${goldEarned} or et ${xpEarned} XP !`);

        // Mise à jour de l'affichage de l'or et de l'XP
        document.getElementById("player-gold").innerText = `💰 Or : ${playerGold}`;
        document.getElementById("player-xp").innerText = `⭐ XP : ${playerXP}`;

        updateBars();
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

    updateBars();

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

// Fonction potion de heal 
function usePotion() {
    if (potions > 0) {
        playerCharacter.vie += potionHeal;
        potions--;

        document.getElementById("player-hp").innerText = `👤 Joueur - PV : ${playerCharacter.vie}`;
        logCombat(`🧪 Vous utilisez une potion et récupérez ${potionHeal} PV ! (Potions restantes : ${potions})`);

        updateBars()
    } else {
        logCombat("❌ Plus de potions disponibles !");
    }
}

// Fonction pour l'attaque spéciale
function specialAttack() {
    if (playerMana < specialCost) {
        logCombat("❌ Pas assez de mana !");
        return;
    }

    playerMana -= specialCost;

    let damage = Math.floor(playerCharacter.attaque * 1.8 + Math.random() * 5);
    enemy.vie -= damage;

    document.getElementById("player-mana").innerText = `🔵 Mana : ${playerMana}`;
    document.getElementById("enemy-hp").innerText = `👾 ${enemy.nom} - PV : ${enemy.vie}`;

    logCombat(`🔥 Attaque spéciale ! Vous infligez ${damage} dégâts au ${enemy.nom} !`);

    updateBars();
    
    if (enemy.vie <= 0) {
        logCombat("🏆 Victoire ! L'ennemi est vaincu !");
        return;
    }

    setTimeout(enemyAttack, 1000);
}

// Fonctions d'achats 
function buyPotion() {
    if (playerGold >= 10) {
        playerGold -= 10;
        potions++;
        logCombat("🧪 Vous avez acheté une potion !");
    } else {
        logCombat("❌ Pas assez d'or !");
    }
    updateShopDisplay();
}

function upgradeAttack() {
    if (playerGold >= 30) {
        playerGold -= 30;
        playerCharacter.attaque += 2;
        logCombat("⚔️ Votre attaque a été améliorée !");
    } else {
        logCombat("❌ Pas assez d'or !");
    }
    updateShopDisplay();
}

function upgradeDefense() {
    if (playerGold >= 30) {
        playerGold -= 30;
        playerCharacter.defense += 2;
        logCombat("🛡️ Votre défense a été améliorée !");
    } else {
        logCombat("❌ Pas assez d'or !");
    }
    updateShopDisplay();
}

function updateShopDisplay() {
    document.getElementById("player-gold").innerText = `💰 Or : ${playerGold}`;
}


// Fonction pour les bars
function updateBars() {
    if (!playerCharacter || !playerCharacter.classe) return; // vérification avant mise à jour

    document.getElementById("player-hp-bar").style.width = `${(playerCharacter.vie / characters[playerCharacter.classe].vie) * 100}%`;
    document.getElementById("player-mana-bar").style.width = `${(playerMana / 50) * 100}%`;
}