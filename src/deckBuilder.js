class DeckBuilder{
    getDeck=()=>{
        const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
        const ranks = ["Ace", "2", "3", "4", "5", "6", "7",
                    "8", "9", "10", "Jack", "Queen", "King"]
        let deck =[];
        for(const suit of suits){
            for(const rank of ranks){
                deck.push(`${rank} of ${suit}`)
            }
        }
        return deck;
    }
    displayCards=(cards)=>{
        for(const card of cards){
            console.log(`| ${card} |`);
        }
    }
    shuffleDeck=(cards)=>{
        for(let i = 0; i<cards.length;i++){
            let savedCard = cards[i];
            let randomIndex = Math.floor(Math.random() * cards.length);
            cards[i] = cards[randomIndex];
            cards[randomIndex] = savedCard;
        }
        return cards;
    }
    dealCards=(cards,count)=>{
        return cards.slice(0,count);
    }
    deleteCardsFromDeck=(deck,cards)=>{
        for (let i = deck.length - 1; i >= 0; i--) {
            if (cards.includes(deck[i])) {
            deck.splice(i, 1);
            }
        }
    }
}
module.exports = DeckBuilder;
/*const deckBuilder = new DeckBuilder();
console.log(`Deck`);
let deck = deckBuilder.getDeck();
deckBuilder.displayCards(deck);
console.log(`Shuffled Deck`);
deckBuilder.shuffleDeck(deck);
deckBuilder.displayCards(deck);

console.log('hand of 2 cards');
let hand = deckBuilder.dealCards(deck,2);
deckBuilder.displayCards(hand);
deckBuilder.deleteCardsFromDeck(deck,hand);
console.log(`eliminated hand from deck`);
deckBuilder.displayCards(deck);*/