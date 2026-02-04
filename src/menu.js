const prompt = require("prompt-sync")({ sigint: true });
const App = require("./app");
const StatsManager = require("./statsManager");

class Menu {
    constructor() {
        this.stats = new StatsManager();
        this.playerName = null;
    }

    start() {
        console.clear();
        console.log("♠️ Welcome to Blackjack ♠️");

        this.playerName = this.askPlayerName();

        while (true) {
            const choice = this.mainMenu();

            if (choice === "play") {
                const app = new App(this.playerName);
                const result = app.start(); // "win" | "loss" | "tie"
                this.stats.recordResult(this.playerName, result);
            }

            if (choice === "leaderboard") {
                this.showLeaderboard();
            }

            if (choice === "quit") {
                this.exit();
            }
        }
    }

    mainMenu() {
        while (true) {
        console.log("\nWhat would you like to do?");
        console.log("1. Play Blackjack");
        console.log("2. View Leaderboard");
        console.log("3. Quit");

        const choice = prompt("Choose an option (1-3): ").trim();

        if (choice === "1") return "play";
        if (choice === "2") return "leaderboard";
        if (choice === "3") return "quit";

        console.log("Invalid choice. Please select 1, 2, or 3.");
        }
    }

    askPlayerName() {
        while (true) {
        const name = prompt("Enter player name: ").trim();
        if (name) return name;
        console.log("Name cannot be empty.");
        }
    }

    showLeaderboard() {
        const leaderboard = this.stats.getLeaderboard();

        if (leaderboard.length === 0) {
            console.log("\nNo games played yet.");
            return;
        }

        console.log("\n🏆 Leaderboard");
        console.log("----------------");
        leaderboard.forEach((p, i) => {
        console.log(
            `${i + 1}. ${p.name} | Wins: ${p.wins} | Losses: ${p.losses} | Ties: ${p.ties}`
        );
        });
    }

  exit() {
    console.log("\n🏁 Final Leaderboard");
    this.showLeaderboard();
    console.log("\nThanks for playing! 👋");
    process.exit(0);
  }
}

module.exports = Menu;
const menu = new Menu();
menu.start();