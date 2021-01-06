const classNames = {
    cell: 'cell',
    cellContent: 'cell-content',
    populated: 'populated'
};
const user = {
    x: 'X',
    o: 'O'
};
const winningMatrix = {
    0: [[1, 2], [3, 6], [4, 8]],
    1: [[0, 2], [4, 7]],
    2: [[0, 1], [5, 8], [4, 6]],
    3: [[0, 6], [4, 5]],
    4: [[3, 5], [1, 7], [0, 8]],
    5: [[3, 4], [2, 8]],
    6: [[7, 8], [0, 3], [2, 4]],
    7: [[6, 8], [1, 4]],
    8: [[6, 7], [2, 5], [0, 4]]
};
let cellValues = JSON.parse(localStorage.getItem('cellValues')) || ['', '', '', '', '', '', '', '', ''];
let xIsNext = true;
let winningUser, numberOfTurnsLeft = 9;
const cells = document.querySelectorAll(`.${classNames.cell}`);
const modelOverlay = document.querySelector('#model-overlay');
const winnerDetails = document.querySelector('#winner-container >span')
const restartElement = document.getElementById('new-game-button');

restartElement.addEventListener('click', function () {
    cellValues = ['', '', '', '', '', '', '', '', ''];
    localStorage.setItem('cellValues', JSON.stringify(cellValues));
    xIsNext = true;
    winningUser = '', numberOfTurnsLeft = 9;
    cells.forEach((c, i) => {
        const cellContent = c.querySelector(`.${classNames.cellContent}`);
        if (cellContent.innerHTML) {
            cellContent.innerHTML = '';
            cellContent.classList.remove(classNames.populated);
        }
    });
    closeModal();
})
const calculateWinner = (chosenIndex) => {
    const winningRanges = winningMatrix[chosenIndex];
    for (i = 0; i < winningRanges.length; i++) {
        const currentEntry = cellValues[chosenIndex];
        const firstOption = cellValues[winningRanges[i][0]];
        const secondOption = cellValues[winningRanges[i][1]];
        if (currentEntry === firstOption && firstOption === secondOption) {
            winningUser = currentEntry;
            return true;
        }
    }
    if (numberOfTurnsLeft === 0) {
        winningUser = winnerType.tie;
        return true;
    }
    return false;
};
const showModel = () => {
    winnerDetails.innerHTML = `Winner is ${winningUser}`;
    modelOverlay.style.display = 'flex'
};
const closeModal = () => {
    winnerDetails.innerHTML = '';
    modelOverlay.style.display = 'none'
}
cells.forEach((c, i) => {
    c.addEventListener('click', () => {
        // console.log('cell clicked');
        if (!cellValues[i]) {
            --numberOfTurnsLeft;
            cellValues[i] = xIsNext ? user.x : user.o;
            localStorage.setItem('cellValues', JSON.stringify(cellValues));
            xIsNext = !xIsNext;
            if (calculateWinner(i)) {
                showModel();
            }
            const cellContent = c.querySelector(`.${classNames.cellContent}`);
            cellContent.innerHTML = cellValues[i];
            cellContent.classList.add(classNames.populated);
        }
    });
});

// Render default values
cells.forEach((c, i) => {
    if (cellValues[i]) {
        const cellContent = c.querySelector(`.${classNames.cellContent}`);
        cellContent.innerHTML = cellValues[i];
        cellContent.classList.add(classNames.populated);
    }
});
