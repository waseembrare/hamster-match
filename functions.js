function shuffleCards(array) {
    let startingIndex = array.length;
    let temporaryIndex = 0;
    let randomIndex = 0;

    while (startingIndex !== 0) {
        //This random index is created by multiplying the array length (16 to start) by decimal then flooring to integer
        //15 will be the highest it can go and 0 the lowest, which corresponds to the indexes
        randomIndex = Math.floor(Math.random() * startingIndex);
        startingIndex--;
        temporaryIndex = array[startingIndex];
        array[startingIndex] = array[randomIndex];
        array[randomIndex] = temporaryIndex;
    }
    return array;
}

function onClick() {
    let slothClickArray = document.querySelectorAll('.sloth');
    this.classList.add('hide');
    this.classList.add('selected');
    if (turnCounter === 0 && clickCounter === 0) {
        startStopwatch()
    }
    if (clickCounter === 0) {
        firstClickPair = this.dataset.pair
        clickCounter++
    } else {
        clickCounter--
        turnCounter++
        displayTurnCounter(turnCounter)
        secondClickPair = this.dataset.pair
        evaluateCards()
    }
}

function addClickListener(onClick) {
    let slothClickArray = document.querySelectorAll('.sloth');
    slothClickArray.forEach(sloth => {
        sloth.addEventListener('click', onClick)
    })
}

function flipCardsBack() {
    let selectedCards = document.querySelectorAll('.selected');
    selectedCards.forEach(card => {
        card.classList.remove('hide')
        card.classList.remove('selected')
        addClickListener(onClick)
    })
}

function evaluateCards() {
    let slothClickArray = document.querySelectorAll('.sloth');
    if (firstClickPair !== secondClickPair) {
        slothClickArray.forEach(sloth => {
            sloth.removeEventListener('click', onClick)
        })
        setTimeout(flipCardsBack, 1500);
    } else {
        slothClickArray.forEach(sloth => {
            sloth.classList.remove('selected')
        })
        matchedPairs++
        isGameFinished(matchedPairs, turnCounter)
    }
}

function displayTurnCounter (currentTurn) {
    document.querySelector('.turns-box').innerHTML =  '<p>Turns: ' + currentTurn + '</p>'
}

function isGameFinished(matchedPairs, currentTurn) {
    if (matchedPairs === 8) {
        let showFinalTime = stopStopwatch()
        document.querySelector('.show-final-time').innerHTML = showFinalTime
        document.querySelector('.turns').innerHTML = currentTurn
        document.querySelector('.modal').classList.remove('hide')
    }
}

function startStopwatch() {
    clearInterval(timer);
    timer = setInterval(()=>{
        milliseconds += 10;
        let dateTimer = new Date(milliseconds);
        gameTimer.innerHTML =
            ('0'+dateTimer.getUTCMinutes()).slice(-2) + ':' +
            ('0'+dateTimer.getUTCSeconds()).slice(-2)
    },10);
}

function stopStopwatch() {
    clearInterval(timer);
    finalTime = document.querySelector('.game-timer').textContent
    return finalTime
}