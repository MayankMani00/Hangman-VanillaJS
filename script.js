const wordEl = $('#word');
const wrongLettersEl = $('#wrong-letters');
const playAgainBtn = $('#play-again');
const popup = $('#popup-container');
const notification = $('#notification-container');
const finalMessage = $('#final-message');

const figurePart = document.querySelectorAll('.figure-part');

const words = [
	'application',
	'programming',
	'interface',
	'wizard'
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//Displays word and checks for success
function displayWord() {
	wordEl[0].innerHTML = `${selectedWord
		.split('')
		.map(
			(letter) =>
				`<span class="letter">${correctLetters.includes(letter)
					? letter
					: ''}</span>`
		)
		.join('')}`;

	const innerWord = wordEl[0].innerText.replace(/\n/g, '');
	if (innerWord == selectedWord) {
		finalMessage[0].innerText = 'Congratulations! You won! :)';
		popup[0].style.display = 'flex';
	}
}

//Updates wrong letters on screen and checks for loss
function updateWrongLettersEl() {
	//Display wrong letters
	wrongLettersEl[0].innerHTML = `${wrongLetters.length > 0
		? '<p>Wrong</p>'
		: ''}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}`;

	//Display parts
	figurePart.forEach((part, index) => {
		if (index < wrongLetters.length) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	});

	if (wrongLetters.length === figurePart.length) {
		finalMessage[0].innerText = 'You lost :(';
		popup[0].style.display = 'flex';
	}
}

// What do you think
function showNotification() {
	notification[0].classList.add('show');

	setTimeout(() => notification[0].classList.remove('show'), 2000);
}

//Detects key pressed and decides correctness
window.addEventListener('keypress', (e) => {
	if (e.keyCode >= 97 && e.keyCode <= 122) {
		const letter = e.key;
		if (selectedWord.includes(letter)) {
			if (!correctLetters.includes(letter)) {
				correctLetters.push(letter);

				displayWord();
			} else {
				showNotification();
			}
		} else {
			if (!wrongLetters.includes(letter)) {
				wrongLetters.push(letter);
				updateWrongLettersEl();
			} else {
				showNotification();
			}
		}
	}
});

playAgainBtn.click(() => {
	correctLetters.splice(0);
	wrongLetters.splice(0);

	selectedWord = words[Math.floor(Math.random() * words.length)];

	displayWord();
	updateWrongLettersEl();
	popup[0].style.display = 'none';
});

displayWord();
