const cherry = "./cherry.png"
const bell = "./bell.png"
const watermelon = "./watermelon.png"
const lucky_seven = "./lucky-seven.png"
const lemon = "./lemon.png"

// Array that holds all slot images (will be used for spinning animation)
const slotSymbols = [cherry, bell, watermelon, lucky_seven, lemon]

// Array that holds varying numbers of each slot image (used to increase/decrease the chances 
// of the player landing on a particular slot)
const slotSymbols_chance = [cherry, cherry, cherry, cherry, cherry,
							watermelon, watermelon, watermelon, watermelon, watermelon,
					 		lucky_seven, lucky_seven, 
					 		lemon, lemon, lemon, lemon, lemon,
					 		bell, bell, bell] 

// Grabbing the play button and adding a click event listener to it 
var spinButton = document.getElementById("play-btn")
spinButton.addEventListener("click", play)

// Variables that will be used to count the number of sevens and bells
// (used for result calculations/payouts)
var numOfSevens = 0
var numOfBells = 0

// Element that will display the results of the spin to the user 
var slotResult = document.getElementById("slotResults")

// Grabbing the loser button and adding a click event listener to it 
var loserButton = document.getElementById("loser-btn")
loserButton.style.visibility = "hidden"
loserButton.addEventListener("click", loser)

// Element that tells the user how many tokens they currently have
var tokenDisplay = document.getElementById("token_display")

// Grabbing the 'tokens' item from local storage
var tokens = localStorage.getItem("tokens")

// If the 'tokens' item does not exist then initialize it with a value of 20
if (!tokens){
	localStorage.setItem("tokens", 100)
	tokenDisplay.innerHTML = localStorage.getItem("tokens")
}
// If 'tokens' does exist but the player has run out of them then hide the play button 
// and display the loser button
 else if (tokens <= 0) {
	spinButton.style.visibility = "hidden"
	loserButton.style.visibility = "visible"
	tokenDisplay.innerHTML = "None...The spin button will decide your fate"

// If 'tokens' already exists then display it to the user
} else{
	tokenDisplay.innerHTML = tokens
}

// Sleep function that allows the program to timeout during execution
// source: https://www.tutorialspoint.com/javascript-sleep-function
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// Function that will run when the player clicks the spin button 
async function play() {

	// Resetting the results from the previous spin 
	resetResults()

	// If the user has enough tokens 
	if (localStorage.getItem("tokens") >= 1) {

		// Hide the spin button so the user cannot click it multiple times 
		spinButton.style.visibility = "hidden"

		// Subtract the number of tokens it costs to play and display it to the user
		localStorage.setItem("tokens", Number(localStorage.getItem("tokens")) - 1)
		tokenDisplay.innerHTML = localStorage.getItem("tokens")


		var reel = document.getElementById("results")
		var slot1 = document.createElement("img")
		var slot2 = document.createElement("img")
		var slot3 = document.createElement("img")

		reel.appendChild(slot1)
		reel.appendChild(slot2)
		reel.appendChild(slot3)

		var firstRandNum = getRandNum(slotSymbols.length)
		var secondRandNum = getRandNum(slotSymbols.length)
		var thirdRandNum = getRandNum(slotSymbols.length)

		// Counter variable that will be used for the spinning animation 
		var counter = 0

		// Spinning Animation
		while (counter < 20){
			slot1.src = slotSymbols[firstRandNum]
			slot2.src = slotSymbols[secondRandNum]
			slot3.src = slotSymbols[thirdRandNum]

			firstRandNum = getRandNum(slotSymbols.length)
			secondRandNum = getRandNum(slotSymbols.length)
			thirdRandNum = getRandNum(slotSymbols.length)

			await sleep(100)

			counter++
		}

		// Slot symbol choice 
		firstRandNum = getRandNum(slotSymbols_chance.length)
		secondRandNum = getRandNum(slotSymbols_chance.length)
		thirdRandNum = getRandNum(slotSymbols_chance.length)

		slot1.src = slotSymbols_chance[firstRandNum]
		slot2.src = slotSymbols_chance[secondRandNum]
		slot3.src = slotSymbols_chance[thirdRandNum]

		checkForLuckySevenAndBells(slotSymbols_chance[firstRandNum])
		checkForLuckySevenAndBells(slotSymbols_chance[secondRandNum])
		checkForLuckySevenAndBells(slotSymbols_chance[thirdRandNum])

		blinkingResult()
		displayResult(firstRandNum, secondRandNum, thirdRandNum)

		spinButton.style.visibility = "visible"

		// If the user has not run out of tokens on this spin then display their remaining tokens 
		if (localStorage.getItem("tokens") > 0){
			tokenDisplay.innerHTML = localStorage.getItem("tokens")
		}
		// The user has run out of tokens...the spin button must be pressed once more
		else{
			tokenDisplay.innerHTML = "None...The spin button will decide your fate"
		}

	// User does not have enough tokens to play upon pressing the spin button 
	} else {

		// Hide the spin button and display the loser button 
		spinButton.style.visibility = "hidden"
		loserButton.style.visibility = "visible"
	}
}

// Function that returns a random number. The range of the random numbers depends
// on the parameter passed into this function
function getRandNum(range) {
	return Math.floor(Math.random() * range)
}

// Function that resets the results from a previous spin 
function resetResults() {

	// Ensuring the past payout result is blank
	slotResult.innerHTML = ""

	// Grabbing the div containing the past result images (or slot images)
	// and removing them
	var results = document.getElementById("results");
	while(results.firstChild)
    	results.removeChild(results.firstChild);

    // Resetting the number of sevens and bells 
    numOfSevens = 0
    numOfBells = 0
}

// Function that checks if a slot is a lucky seven or a bell. The number of sevens and bells
// are incremented accordingly
function checkForLuckySevenAndBells(slot){
	if (slot == lucky_seven)
		numOfSevens++
	else if (slot == bell)
		numOfBells++
}

// Displaying the payout result to the user and incrementing the number of tokens given that the 
// user won during the spin 
function displayResult(firstRandNum, secondRandNum, thirdRandNum) {
	var slotResult = document.getElementById("slotResults")

	if(numOfSevens == 3){
		slotResult.innerHTML = "Jackpot! That's 25 Tokens!"
		localStorage.setItem("tokens", Number(localStorage.getItem("tokens")) + 25)
	}
	else if (numOfSevens == 2){
		slotResult.innerHTML = "2 Sevens! That's 10 Tokens!"
		localStorage.setItem("tokens", Number(localStorage.getItem("tokens")) + 10)
	}
	else if (numOfBells == 3){
			slotResult.innerHTML = "3 Bells! That's 15 Tokens!"
			localStorage.setItem("tokens", Number(localStorage.getItem("tokens")) + 15)
		}
	else if (numOfBells == 2){
		slotResult.innerHTML = "Two Bells! That's 5 Tokens!"
		localStorage.setItem("tokens", Number(localStorage.getItem("tokens")) + 5)
	}
	else if (numOfSevens == 1){
		slotResult.innerHTML = "Tokens Refunded!"
		localStorage.setItem("tokens", Number(localStorage.getItem("tokens")) + 1)
	}

	// Checking if all three of the images are the same (i.e., 3-Of-A-Kind)
	else if ((slotSymbols_chance[firstRandNum] == slotSymbols_chance[secondRandNum])
		&& (slotSymbols_chance[secondRandNum] == slotSymbols_chance[thirdRandNum])
		&& (slotSymbols_chance[firstRandNum] == slotSymbols_chance[thirdRandNum])) {
			slotResult.innerHTML = "3 Of-A-Kind! That's 5 Tokens!"
			localStorage.setItem("tokens", Number(localStorage.getItem("tokens")) + 5)
	}
	
	// User did not win anything
	else {
		slotResult.innerHTML = "WELP. No Tokens :/"
	}
}

// Function that plays an 'animation' where the result blinks rapidly for
// a few seconds before returning to normal 
async function blinkingResult() {

	for (let i = 0; i < 24; i++) {

		if (slotResult.style.opacity == 1) {
			slotResult.style.opacity = 0
		}
		else
			slotResult.style.opacity = 1

		await sleep(100)
	}

	slotResult.style.opacity = 1
}

// Function that is executed when the user presses the 'loser' button
function loser() {

	// Resetting the tokens 
	localStorage.setItem("tokens", 100)
	tokenDisplay.innerHTML = localStorage.getItem("tokens")

	// Hiding the loser button and showing the spin button again
	loserButton.style.visibility = "hidden"
	spinButton.style.visibility = "visible"
}
