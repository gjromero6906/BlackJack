const DeckBuilder = require('./deckBuilder');
class Game{
    constructor(){
       this.deckBuilder = new DeckBuilder();
        this.deck = this.deckBuilder.shuffleDeck(this.deckBuilder.getDeck());
        this.playerHand = [];
        this.dealerHand = [];
        this.gameOver = false;
        this.result = null;
    }
    startGame(){
        this.playerHand = this.deckBuilder.dealCards(this.deck,2);
        this.deckBuilder.deleteCardsFromDeck(this.deck,this.playerHand);

        this.dealerHand = this.deckBuilder.dealCards(this.deck,2);
        this.deckBuilder.deleteCardsFromDeck(this.deck,this.dealerHand);
    }
    

    playerHit() {
        const card = this.deckBuilder.dealCards(this.deck, 1);
        this.deckBuilder.deleteCardsFromDeck(this.deck, card);
        this.playerHand.push(card[0]);

        if (this.calculateHandValue(this.playerHand) > 21) {
            this.gameOver = true;
            this.result = "loss";   // <-- standardized for stats
            console.log("Player busts! Dealer wins."); // optional for display
        }
    }

    playerStand() {
        this.dealerTurn();
        this.determineWinner();
        this.gameOver = true;
    }

    dealerTurn() {
        while (this.calculateHandValue(this.dealerHand) < 17) {
        const card = this.deckBuilder.dealCards(this.deck, 1);
        this.deckBuilder.deleteCardsFromDeck(this.deck, card);
        this.dealerHand.push(card[0]);
        }
    }

    calculateHandValue(hand) {
        let value = 0;
        let aces = 0;

        for (const card of hand) {
            const rank = card.split(" ")[0];

            if (["Jack", "Queen", "King"].includes(rank)) {
                value += 10;
            } else if (rank === "Ace") {
                value += 11;
                aces++;
            } else {
                value += parseInt(rank);
            }
        }

        while (value > 21 && aces > 0) {
        value -= 10;
        aces--;
        }

        return value;
    }

    determineWinner() {
        const playerScore = this.calculateHandValue(this.playerHand);
        const dealerScore = this.calculateHandValue(this.dealerHand);

        if (dealerScore > 21 || playerScore > dealerScore) {
            this.result = "win";  // player wins
            console.log("Player wins!");
        } else if (playerScore < dealerScore) {
            this.result = "loss"; // dealer wins
            console.log("Dealer wins!");
        } else {
            this.result = "tie";  // push
            console.log("Push (tie).");
        }
    }

    getGameState() {
        return {
            playerHand: this.playerHand,
            dealerHand: this.dealerHand,
            playerScore: this.calculateHandValue(this.playerHand),
            dealerScore: this.calculateHandValue(this.dealerHand),
            gameOver: this.gameOver,
            result: this.result
        }
    }
}
module.exports = Game;