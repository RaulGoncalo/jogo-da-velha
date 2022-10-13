let houses = document.querySelectorAll(".house");
let resetBtn = document.getElementById("resetGame");
let turnPlayers = document.getElementById("turnPlayers");
let popup = document.querySelector(".popup");
let message = document.getElementById("message");
let btnNewGame = document.getElementById("newGame");

let playerX = 0;
let playerO = 0;
let playsWins = [
	[0, 1, 2],
	[0, 4, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[2, 4, 6],
	[3, 4, 5],
	[6, 7, 8],
];

const toggleHidePopup = (hide) => {
	cleanBoard();
	if (hide) {
		popup.classList.add("hide");
		return;
	}
	popup.classList.remove("hide");
};

const cleanBoard = () => {
	playerX = 0;
	playerO = 0;
	turnPlayers.innerText = "É a vez do Jogador: X";
	houses.forEach((house) => {
		house.innerText = "";
	});
};

const winFunction = (playerWin) => {
	setTimeout(() => {
		if (playerWin == "X") {
			message.innerHTML = "&#x1F389 <br/> X ganhou!";
		} else {
			message.innerHTML = "&#x1F389 <br/> O ganhou!";
		}
		toggleHidePopup();
	}, 400);
};

const handlePlayerClick = (e) => {
	let house = e.target;

	if (playerX === 4 && playerO === 4) {
		setTimeout(() => {
			message.innerHTML = "&#x1F60E <br/> Empatou!";
			toggleHidePopup();
		}, 400);
	}

	if (house.textContent === "") {
		if (playerX === playerO) {
			turnPlayers.innerText = "É a vez do Jogador: O";
			playerX++;
			house.innerText = "X";
		} else {
			turnPlayers.innerText = "É a vez do Jogador: X";
			house.innerText = "O";
			playerO++;
		}

		for (i of playsWins) {
			if (
				houses[i[0]].textContent !== "" &&
				houses[i[0]].textContent === houses[i[1]].textContent &&
				houses[i[0]].textContent === houses[i[2]].textContent
			) {
				winFunction(houses[i[0]].textContent);
			}
		}
	} else {
		alert("O jogador " + house.textContent + " já selecionou essa casa");
	}
};

houses.forEach((house) => {
	house.addEventListener("click", handlePlayerClick);
});

resetBtn.addEventListener("click", cleanBoard);
btnNewGame.addEventListener("click", () => {
	toggleHidePopup(true);
});
