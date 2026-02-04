const fs = require("fs");
const path = require("path");

class StatsManager {
  constructor() {
    this.filePath = path.join(__dirname, "../data/stats.json");

    if (!fs.existsSync(this.filePath)) {
      fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
      fs.writeFileSync(this.filePath, JSON.stringify({}));
    }

    this.stats = JSON.parse(fs.readFileSync(this.filePath, "utf-8"));
  }

  save() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.stats, null, 2));
  }

  recordResult(playerName, result) {
    if (!playerName || !result) return;

    if (!this.stats[playerName]) {
      this.stats[playerName] = { wins: 0, losses: 0, ties: 0 };
    }

    if (result === "win") this.stats[playerName].wins++;
    if (result === "loss") this.stats[playerName].losses++;
    if (result === "tie") this.stats[playerName].ties++;

    this.save();
  }

  getLeaderboard() {
    return Object.entries(this.stats)
      .map(([name, stats]) => ({ name, ...stats }))
      .sort((a, b) => b.wins - a.wins);
  }
}

module.exports = StatsManager;


module.exports = StatsManager;