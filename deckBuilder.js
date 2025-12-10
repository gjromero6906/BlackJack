function getDeck(){
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
function displayCards(cards){
    for(const card of cards){
        console.log(`| ${card} |`);
    }
}
function shuffleDeck(cards){
    for(let i = 0; i<cards.length;i++){
        let savedCard = cards[i];
        let randomIndex = Math.floor(Math.random() * deck.length);
        cards[i] = cards[randomIndex];
        cards[randomIndex] = savedCard;
    }
}
function dealCards(cards,count){
    let hand = cards.slice(0,count);
    return hand;
}
console.log(`Deck`);
let deck = getDeck();
displayCards(deck);
console.log(`Shuffled Deck`);
shuffleDeck(deck);
displayCards(deck);

console.log('hand of 2 cards');
let hand = dealCards(deck,2);
displayCards(hand);

