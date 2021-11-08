var tokens = localStorage.getItem("tokens")
var tokenDisplay = document.getElementById("tokens")

if (!tokens) {
	localStorage.setItem("tokens", 20)
	tokenDisplay.innerHTML += localStorage.getItem("tokens")
} else if (tokens <= 0) {
	tokenDisplay.innerHTML += "None<br>Go to one<br>of the games to<br>redeem more<br>tokens."
}
else{
	tokenDisplay.innerHTML += localStorage.getItem("tokens")
}