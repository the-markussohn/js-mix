/*
GAME FUNCTION:
- Player must guess a number between min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player play again
*/

let min = 1,
    max = 10,
    winningNum = 2,
    guessesLeft = 3;

const game = document.querySelector('.game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

guessBtn.addEventListener('click', () => {
    let guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    if (guess === winningNum) {
        gameOver(true, `${winningNum} is correct, YOU WIN!`);
    } else {
        guessesLeft--;
        if (guessesLeft === 0) {
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
        } else {
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
            setMessage(`${guess} is not correct. Guesses remaining: ${guessesLeft}`, 'red');
        }
    }
});

function gameOver(won, msg) {
    guessInput.disabled = true;
    guessInput.style.borderColor = won ? 'green' : 'red';
    guessBtn.disabled = true;
    setMessage(msg, won ? 'green' : 'red');
}

function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}