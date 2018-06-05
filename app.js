/*
  Game funciton:
  - Player musy guess a nymver between a min and max
  - Player gets a certain amount of guesses
  - Notify player of guesses remaining
  - Notify the player if the correct answer if loose
  - Let player choose to play again
*/
(function() {
    // Game values
    let min = 1,
        max = 10,
        winningNum = gerRandomNumber(min, max),
        // winningNum = Math.floor((Math.random() * 10 + 1)),
        guessesLeft = 3;

    // UI Elements
    const game = document.querySelector('#game'),
        minNum = document.querySelector('.min-num'),
        maxNum = document.querySelector('.max-num'),
        guessBtn = document.querySelector('#guess-btn'),
        guessInput = document.querySelector('#guess-input'),
        message = document.querySelector('.message');

    // Assign UI min and max
    minNum.textContent = min;
    maxNum.textContent = max;

    // Listen for guess
    guessBtn.addEventListener('click', function() {
        let guess = parseInt(guessInput.value);

        // Validate
        if (isNaN(guess) || guess < min || guess > max) {
            setMessage(`Please enter a number between ${min} and ${max}`, 'red')
        }

        // Check if won
        if (guess === winningNum) {
            // Game over - Won
            gameOver(true, `${winningNum} is correct, YOU WIN`);
        } else {
            // Wrong number
            guessesLeft -= 1;
            if (guessesLeft === 0) {
                // Game over - Lost
                gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
            } else {
                // Game continues - answer - wrong
                // Change border color
                guessInput.style.borderColor = 'red';
                // Clear input
                guessInput.value = '';
                // Tell user its wrong number
                setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
            }

        }
    });

    // Game over
    function gameOver(won, msg) {
        let color;
        won === true ? color = 'green' : color = 'red'
            // Disable input
        guessInput.disable = true;
        // Change border color
        guessInput.style.borderColor = color;
        // Set text color
        message.style.color = color;
        // Set message
        setMessage(msg);

        // Play again
        guessBtn.value = 'Play Again';
        guessBtn.className += 'play-again';
    }

    // Get Winning Number

    function gerRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Set message
    function setMessage(msg, color) {
        message.textContent = msg;
        message.style.color = color;
    };

    // Play again event listener
    game.addEventListener('mousedown', function(evt) {
        if (evt.target.className === 'play-again') {
            window.location.reload();
        }
    });
})();