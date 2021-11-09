///////////
// CARDS //
///////////

const clubs_2 = "./cards/2_of_clubs.png"
const clubs_3 = "./cards/3_of_clubs.png"
const clubs_4 = "./cards/4_of_clubs.png"
const clubs_5 = "./cards/5_of_clubs.png"
const clubs_6 = "./cards/6_of_clubs.png"
const clubs_7 = "./cards/7_of_clubs.png"
const clubs_8 = "./cards/8_of_clubs.png"
const clubs_9 = "./cards/9_of_clubs.png"
const clubs_10 = "./cards/10_of_clubs.png"
const clubs_j = "./cards/jack_of_clubs.png"
const clubs_q = "./cards/queen_of_clubs.png"
const clubs_k = "./cards/king_of_clubs.png"
const clubs_a = "./cards/ace_of_clubs.png" 

const diamonds_2 = "./cards/2_of_diamonds.png"
const diamonds_3 = "./cards/3_of_diamonds.png"
const diamonds_4 = "./cards/4_of_diamonds.png"
const diamonds_5 = "./cards/5_of_diamonds.png"
const diamonds_6 = "./cards/6_of_diamonds.png"
const diamonds_7 = "./cards/7_of_diamonds.png"
const diamonds_8 = "./cards/8_of_diamonds.png"
const diamonds_9 = "./cards/9_of_diamonds.png"
const diamonds_10 = "./cards/10_of_diamonds.png"
const diamonds_j = "./cards/jack_of_diamonds.png"
const diamonds_q = "./cards/queen_of_diamonds.png"
const diamonds_k = "./cards/king_of_diamonds.png"
const diamonds_a = "./cards/ace_of_diamonds.png" 

const hearts_2 = "./cards/2_of_hearts.png"
const hearts_3 = "./cards/3_of_hearts.png"
const hearts_4 = "./cards/4_of_hearts.png"
const hearts_5 = "./cards/5_of_hearts.png"
const hearts_6 = "./cards/6_of_hearts.png"
const hearts_7 = "./cards/7_of_hearts.png"
const hearts_8 = "./cards/8_of_hearts.png"
const hearts_9 = "./cards/9_of_hearts.png"
const hearts_10 = "./cards/10_of_hearts.png"
const hearts_j = "./cards/jack_of_hearts.png"
const hearts_q = "./cards/queen_of_hearts.png"
const hearts_k = "./cards/king_of_hearts.png"
const hearts_a = "./cards/ace_of_hearts.png"

const spades_2 = "./cards/2_of_spades.png"
const spades_3 = "./cards/3_of_spades.png"
const spades_4 = "./cards/4_of_spades.png"
const spades_5 = "./cards/5_of_spades.png"
const spades_6 = "./cards/6_of_spades.png"
const spades_7 = "./cards/7_of_spades.png"
const spades_8 = "./cards/8_of_spades.png"
const spades_9 = "./cards/9_of_spades.png"
const spades_10 = "./cards/10_of_spades.png"
const spades_j = "./cards/jack_of_spades.png"
const spades_q = "./cards/queen_of_spades.png"
const spades_k = "./cards/king_of_spades.png"
const spades_a = "./cards/ace_of_spades.png" 



/////////////////
// QUEUE SETUP //
/////////////////

function Queue() {this.elements = []}
Queue.prototype.enqueue = function (e) {this.elements.push(e)}
Queue.prototype.dequeue = function () {return this.elements.shift()}
Queue.prototype.isEmpty = function () {return this.elements.length == 0}
Queue.prototype.peek = function () {return !this.isEmpty() ? this.elements[0] : undefined}
Queue.prototype.length = function () {return this.elements.length}


///////////////
// VARIABLES //
///////////////

var DEBUG = false

const hitBtn = document.getElementById("hit-btn")
const stayBtn = document.getElementById("stay-btn")
const playBtn = document.getElementById("play-btn")
var dealerHand = document.getElementById("dealer-hand")
var playerHand = document.getElementById("player-hand")
var myWallet = document.getElementById("wal")
var myBet = document.getElementById("bet")

var playerScore = 0
var playerCardCount = 0
var playerACount = 0
var playerJCount = 0

var dealerScore = 0
var dealerCardCount = 0
var dealerACount = 0
var dealerJCount = 0


let card_imgs = 
[
clubs_2, clubs_3, clubs_4, clubs_5, clubs_6, clubs_7, clubs_8, clubs_9, clubs_10, 
clubs_j, clubs_q, clubs_k, clubs_a, diamonds_2, diamonds_3, diamonds_4, diamonds_5, 
diamonds_6, diamonds_7, diamonds_8, diamonds_9, diamonds_10, diamonds_j, diamonds_q, 
diamonds_k, diamonds_a, hearts_2, hearts_3, hearts_4, hearts_5, hearts_6, hearts_7,
hearts_8, hearts_9, hearts_10, hearts_j, hearts_q, hearts_k, hearts_a, spades_2, 
spades_3, spades_4, spades_5, spades_6, spades_7, spades_8, spades_9, spades_10,
spades_j, spades_q, spades_k, spades_a
]

///////////////
// FUNCTIONS //
///////////////

// sleeps for the given number of milliseconds
function sleep(ms){return new Promise(resolve => setTimeout(resolve, ms))}

// creates a psuedo deck using 4 sets of the numbers 2-14 for 2-A and returns it
function createDeck(){
	let cards = []
	var k = 0;
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j < 15; j++){
			cards[k] = j
			k++
		}
	}
	return cards
}

/* 
randomly enqueues both the number representations of the cards created
in the createDeck() method and the png images that will be shown. Each
card will only be enqueue's once and it will run until the entire range
of the original array have been used 
*/
function shuffleDeck(deck){
	let usedIndex = []

	while(usedIndex.length < 52){
		var rand = Math.floor(Math.random() * 52)
		if (!isUsedIndex(usedIndex, rand)){
			q.enqueue(deck[rand])
			q_img.enqueue(card_imgs[rand])
			usedIndex[usedIndex.length] = rand
		}
	}
}

// checked to see if the given random number is in the usedIndex array
function isUsedIndex(usedIndex, rand){
	for (var i = 0; i < usedIndex.length; i++){
		if (usedIndex[i] == rand){return true}
	}
	return false
}

// the dealer draws a card until their score is 17 or more
async function dealerPlays(){
	dealerScore += dealCard(dealerScore, dealerACount, dealerJCount)
	await sleep(500)
	var image = document.createElement("img")
	image.src = q_img.dequeue()
	dealerHand.appendChild(image)
	await sleep(500)
	if (dealerScore < 17){dealerPlays()}
	else {compareScores()}
}

// begins a new game by dealing two cards to the player and one to the dealer
async function newGame(){
	playerScore += dealCard(playerScore, playerACount, playerJCount)
	playerCardCount++
	await sleep(500)
	var image = document.createElement("img")
	image.src = q_img.dequeue()
	playerHand.appendChild(image)
	await sleep(500)

	dealerScore += dealCard(dealerScore, dealerACount, dealerJCount)
	dealerCardCount++
	await sleep(500)
	var image2 = document.createElement("img")
	image2.src = q_img.dequeue()
	dealerHand.appendChild(image2)
	await sleep(500)

	playerScore += dealCard(playerScore, playerACount, playerJCount)
	playerCardCount++
	await sleep(500)
	var image3 = document.createElement("img")
	image3.src = q_img.dequeue()
	playerHand.appendChild(image3)
	await sleep(500)

	hitBtn.style.visibility = "visible"
	stayBtn.style.visibility = "visible"
}

// dequeues a card, determines it numerical score value, and returns it.
function dealCard(score, scoreA, scoreJ){
	var card = q.dequeue()
	if (card == 11){scoreJ++}
	if (card == 14){scoreA++}
	var cardVal = cardValue(card, score)
	return cardVal
}

// determines the value of a given card
function cardValue(card, score){
	if (2 <= card && card <= 10){return card}
	else if (11 <= card && card <= 13){return 10}
	else if (card == 14){
		if ((score + 11) <= 21){return 11}
		else{return 1}
	}
}

// sets the game up by emptying the previously used queues and creating a new deck
function setup(){
	while(!q.isEmpty()){q.dequeue()}
	while(!q_img.isEmpty()){q_img.dequeue()}
	let deck = createDeck()
	shuffleDeck(deck)
	newGame()
}

// resets the game to its original appearance
function reset(){
	while(!q.isEmpty()){q.dequeue()}
	while(!q_img.isEmpty()){q_img.dequeue()}
	playerHand.innerHTML = ""
	dealerHand.innerHTML = ""
	resetScores()
	playBtn.style.visibility = "visible"
	myBet.value = ""
}

// sets all of the score variables to zero
function resetScores(){
	playerScore = 0
	playerCardCount = 0
	playerACount = 0
	playerJCount = 0

	dealerScore = 0
	dealerCardCount = 0
	dealerACount = 0
	dealerJCount = 0
}

// compares the scores of both the player and the dealer after
// they have both played and determines the winner.
function compareScores(){
	if (dealerScore > 21 || dealerScore < playerScore){playerWins()}
	else if (dealerScore > playerScore){dealerWins()}
	else if (dealerScore == playerScore){
		if (!isPlayerBlackjack() && !isDealerBlackjack()){tie()}
		else if (isPlayerBlackjack() && isDealerBlackjack()){tie()}
		else if (isDealerBlackjack()){dealerWins()}
		else if (isPlayerBlackjack()){playerWins()}
	}
}

// determines whether the player or the dealer have a Blackjack and returns a boolean value
function isPlayerBlackjack(){return (playerCardCount == 2 && playerACount == 1 && playerJCount == 1) ? true : false}
function isDealerBlackjack(){return (dealerCardCount == 2 && dealerACount == 1 && dealerJCount == 1) ? true : false}


////////////////////////
// WIN/LOSE FUNCTIONS //
////////////////////////

async function playerWins(){
	await sleep(500)
	alert("You beat the dealer! You Win!")
	winPayout(1)
	reset()
}

async function dealerWins(){
	await sleep(500)
	alert("The dealer beat you! You Lose!")
	reset()
}

async function bust(){
	await sleep(500)
	alert("You went over 21! You Lose!")
	reset()
}

async function tie(){
	await sleep(500)
	alert("You and the dealer tied! All bets are returned.")
	winPayout(0)
	reset()
}


// if the player wins or ties with the dealer, the appropriate tokens are given/returned.
function winPayout(win){
	if (win == 1){
		localStorage.setItem("tokens", Number(localStorage.getItem("tokens")) + Math.ceil(bet * 1.5))
		myWallet.innerHTML = localStorage.getItem("tokens")
	}
	else if (win == 0){
		localStorage.setItem("tokens", Number(localStorage.getItem("tokens")) + bet)
		myWallet.innerHTML = localStorage.getItem("tokens")
	}
}


/////////////
// BUTTONS //
/////////////

hitBtn.addEventListener("click", async function () {
	hitBtn.style.visibility = "hidden"
	stayBtn.style.visibility = "hidden"
	await sleep(500)
	playerScore += dealCard(playerScore, playerACount, playerJCount)
	playerCardCount++
	await sleep(500)
	var image = document.createElement("img")
	image.src = q_img.dequeue()
	playerHand.appendChild(image)
	await sleep(500)
	if (playerScore > 21){bust()}
	hitBtn.style.visibility = "visible"
	stayBtn.style.visibility = "visible"
})

stayBtn.addEventListener("click", async function () {
	hitBtn.style.visibility = "hidden"
	stayBtn.style.visibility = "hidden"
	await sleep(500)
	dealerPlays()
})


playBtn.addEventListener("click", async function () {
	if (localStorage.getItem("tokens") < 1){
		alert("Your obviously suck at this. Here's some more tokens, Stupid.")
		localStorage.setItem("tokens", 100)
		myWallet.innerHTML = localStorage.getItem("tokens")
	}
	bet = myBet.value
	if (myBet.value == "" || bet < 2){
		bet = 2
	}

	if (localStorage.getItem("tokens") < bet){
		alert("You don't have that many tokens! Your bet has been reduced to your current token capacity.")
		bet = localStorage.getItem("tokens")
		myWallet.innerHTML = localStorage.getItem("tokens")
	}
	
	playBtn.style.visibility = "hidden"
	await sleep(500)
	localStorage.setItem("tokens", localStorage.getItem("tokens") - bet)
	myWallet.innerHTML = localStorage.getItem("tokens")
	setup()
})


//////////
// MAIN //
//////////

let q = new Queue()
let q_img = new Queue()

if (DEBUG) {localStorage.clear()}

var globalNum = localStorage.getItem("tokens")
if (!globalNum){
	localStorage.setItem("tokens", 100)
}

var bet = 0
myWallet.innerHTML = localStorage.getItem("tokens")
hitBtn.style.visibility = "hidden"
stayBtn.style.visibility = "hidden"


