const prompt = require("prompt-sync")();

const typesCartes = ["Eau", "Feu", "Plante"];

function choixAleatoire() {
  const robotRandom = Math.floor(Math.random() * typesCartes.length);
  return typesCartes[robotRandom];
}

function getResult(choixJoueur, choixRobot) {
  if (choixJoueur === choixRobot) {
    return "Egalité";
  } else if (
    (choixJoueur === "Eau" && choixRobot === "Feu") ||
    (choixJoueur === "Feu" && choixRobot === "Plante") ||
    (choixJoueur === "Plante" && choixRobot === "Eau")
  ) {
    return "Victoire";
  } else {
    return "Défaite";
  }
}

function decoAscii(typesCartes) {
  switch (typesCartes) {
    case "Eau": 
    console.log(`
        💧💧💧💧💧        💧💧         💧       💧
        💧              💧  💧         💧       💧
        💧             💧    💧        💧       💧
        💧💧💧💧💧     💧💧💧💧💧      💧       💧
        💧           💧        💧      💧       💧
        💧          💧          💧     💧       💧
        💧💧💧💧💧  💧            💧   💧 💧 💧 💧 
       `);
      break;
    case "Feu": 
    console.log(`
    🔥🔥🔥🔥🔥   🔥🔥🔥🔥🔥   🔥      🔥    
    🔥           🔥           🔥      🔥  
    🔥           🔥           🔥      🔥  
    🔥🔥🔥🔥🔥   🔥🔥🔥🔥🔥   🔥      🔥        
    🔥           🔥           🔥      🔥
    🔥           🔥           🔥      🔥  
    🔥           🔥🔥🔥🔥🔥   🔥🔥🔥🔥🔥                  
   `);
      break;
    case "Plante":
      console.log(`
        🌿🌿🌿🌿     🌿                 🌿       🌿        🌿   🌿🌿🌿🌿🌿🌿   🌿🌿🌿🌿🌿 
        🌿       🌿  🌿               🌿 🌿     🌿🌿      🌿        🌿         🌿
        🌿       🌿  🌿              🌿   🌿    🌿  🌿    🌿        🌿         🌿
        🌿🌿🌿🌿     🌿            🌿🌿🌿🌿    🌿   🌿   🌿          🌿         🌿🌿🌿🌿🌿
        🌿           🌿            🌿       🌿  🌿    🌿  🌿         🌿        🌿
        🌿           🌿           🌿         🌿 🌿      🌿🌿         🌿        🌿
        🌿           🌿🌿🌿🌿🌿 🌿           🌿 🌿      🌿          🌿         🌿🌿🌿🌿🌿
       `);
      break;
    default:
      console.log("Carte non reconnue");
  }
}

function victoireAscii() {
  console.log("T'as gagné");
}

function defaiteAscii() {
  console.log("T'as perdu");
}

function displayTieAscii() {
  console.log("Egalité");
}

function displayWelcomeMessage() {
  console.log(`
  ╔════════════════════════╗
  ║                          ║
  ║  💫 Bienvenue dans le   ║
  ║    Jeu de Cartes! 💫      ║
  ║                          ║
  ║  Vous allez affronter   ║
  ║  le robot dans une      ║
  ║  bataille de cartes.    ║
  ║  Eau bat le feu, feu    ║
  ║  bat la plante, et      ║
  ║  plante bat l'eau.      ║
  ║                          ║
  ║  Que le meilleur gagne! ║
  ║   🏆🏆🏆🏆🏆🏆🏆🏆🏆      ║
  ╚════════════════════════╝
  `);
}

function aurevoir(pseudo, playerScore, robotScore) {
  console.log(`
  🏆 Résultat final : ${pseudo} ${playerScore} - ${robotScore} Robot 🤖
  Merci d'avoir joué, ${pseudo}! Au revoir. 👋
  `);
}

function askToReplay() {
  const replayChoice = prompt("Voulez-vous rejouer ? (oui/non): ");
  return replayChoice === "oui";
}

function statGame() {
  console.log("Le Robot vous a battu précédement !");
}

function startGame() {
  let playAgain = true;

  while (playAgain) {
    displayWelcomeMessage();

    const pseudo = prompt("Veuillez saisir votre pseudo moussaillon: ");

    let playerScore = 0;
    let robotScore = 0;

    for (let round = 1; round <= 3; round++) {
      console.log(`\n🌈 Manche ${round} 🌈`);

      const indexChoixJoueur = +prompt(
        "Choisissez votre carte (1: Eau, 2: Feu, 3: Plante): "
      );
      const choixJoueur = typesCartes[indexChoixJoueur - 1];

      const choixRobot = choixAleatoire();

      console.log(`${pseudo} a choisi:`);
      decoAscii(choixJoueur);

      console.log("Le robot a choisi:");
      decoAscii(choixRobot);

      const result = getResult(choixJoueur, choixRobot);
      console.log(`Résultat de la manche : ${result}`);

      switch (result) {
        case "Victoire":
          victoireAscii();
          playerScore++;
          break;
        case "Défaite":
          defaiteAscii();
          robotScore++;
          break;
        case "Egalité":
          displayTieAscii();
          break;
        default:
          break;
      }
    }

    aurevoir(pseudo, playerScore, robotScore);

    if (playerScore == robotScore) {
      playAgain = askToReplay();
      if (playAgain) {
        statGame();
      }
    } else {
      playAgain = false;
    }
  }
}

startGame();
