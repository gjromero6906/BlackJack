const prompt = require('prompt-sync')({ sigint: true });
const Game = require("./game");

class App {
    constructor(playerName) {
        this.playerName = playerName;
        this.game = new Game();
    }
    start() {
        this.game.startGame();
        this.showHands();

        while (!this.game.gameOver) {
            this.promptPlayer();
            this.showHands();
        }

        const result = this.game.getGameState().result;
        console.log(`\nPlayer ${this.game.getGameState().result}!`);

        return result; // "win" | "loss" | "tie"
    }

    showHands() {
        const state = this.game.getGameState();

        console.log("\nPlayer Hand:");
        state.playerHand.forEach(card => console.log(card));
        console.log("Player Score:", state.playerScore);

        console.log("\nDealer Hand:");
        if (state.gameOver) {
        state.dealerHand.forEach(card => console.log(card));
        console.log("Dealer Score:", state.dealerScore);
        } else {
        console.log(state.dealerHand[0], "| Hidden");
        }
    }

    promptPlayer() {
        let answer ="";
        while(true){
            answer = prompt("Hit or Stand? (h/s): ").trim().toLowerCase();
            if (!answer) {
                console.log("Please enter a response.");
                continue;
            }
            if (answer !== "h" && answer !== "s") {
                console.log("Invalid input. Type 'h' to hit or 's' to stand.");
                continue;
            }
            break;
        }
        if (answer === "h") {
            this.game.playerHit();
        } else {
            this.game.playerStand();
        }
    }
}
module.exports = App;
