// Stockage des stats des personnages
const characters = {
    Guerrier: { vie: 100, attaque: 15, defense: 10},
    Mage: { vie: 80, attaque: 20, defense: 5},
    Voleur: { vie: 90, attaque: 12, defense: 8}
};

let playCharacter = null;

// Fonction pour choisir un personnage

function chooseCharacter(character) {
    playCharacter = characters[character];

    // Mise à jour de l'affichage 
    document.getElementById("character-name").innerText = `Classe : ${character}`;
    document.getElementById("character-stats").innerText = `Vie : ${playCharacter.vie}, Attaque : ${playCharacter.attaque}, Défense : ${playCharacter.defense}`;

    // Afficher les stats du personnage choisi
    document.getElementById("character-info").style.display = "block";
}