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
    if (clickCounter === 0) {
        firstClickPair = this.dataset.pair
        clickCounter++
    } else {
        clickCounter--
        turnCounter++
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
        setTimeout(flipCardsBack, 2000);
    } else {
        slothClickArray.forEach(sloth => {
            sloth.classList.remove('selected')
        })
        matchedPairs++
    }
}
