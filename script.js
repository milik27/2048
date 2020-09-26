const root = document.querySelector('#root')
const btnStart = document.querySelector('.js-start')
let field = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const print = () => {
    root.innerHTML = field.reduce((sumRow, row) => {
        const res = row.reduce((sumCell, cell) => (sumCell + `<div class="cell">${cell ? cell : ''}</div>`), '')
        return sumRow + `<div class="row">${res}</div>`
    }, '')
}

// random new cell
const randomNewCell = (count = 1) => {
    for (let i = 0; i < count; i++) {
        let maxCount = 0
        field.forEach(row => {
            row.forEach(cell => {
                if (cell === 0) {
                    maxCount++
                }
            })
        })

        const newCellPosition = randomInteger(1, maxCount)
        let position = 0
        field = field.map((row) => {
            return row.map((cell) => {
                if (cell === 0) {
                    position++
                    if (position === newCellPosition) {
                        return 2
                    }
                }
                return cell
            })
        })
        print()
    }
}

//
const moveCell = side => {
    let isMove = false
    if (side === 'down' || side === 'right') {
        field.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (side === 'down') {
                    if (cell !== 0 && i < field.length - 1) {
                        if (field[i + 1][j] === 0) {
                            field[i][j] = 0
                            field[i + 1][j] = cell
                            isMove = true
                        } else if(field[i + 1][j] === cell) {
                            field[i][j] = 0
                            field[i + 1][j] = cell * 2
                            isMove = true
                        }
                    }
                } else {
                    if (cell !== 0 && j < row.length - 1) {
                        if (field[i][j + 1] === 0) {
                            field[i][j] = 0
                            field[i][j + 1] = cell
                            isMove = true
                        } else if (field[i][j + 1] === cell) {
                            field[i][j] = 0
                            field[i][j + 1] = cell * 2
                            isMove = true
                        }
                    }
                }
            })
        })
    } else {
        for (let i = field.length - 1; i >= 0; i--) {
            for(let j = field[i].length - 1; j >= 0; j--) {
                if (side === 'up') {
                    if (field[i][j] !== 0 && i > 0) {
                        if (field[i - 1][j] === 0) {
                            field[i - 1][j] = field[i][j]
                            field[i][j] = 0
                            isMove = true
                        } else if (field[i -1][j] === field[i][j]) {
                            field[i -1][j] = field[i][j] * 2
                            field[i][j] = 0
                            isMove = true
                        }
                    }
                } else {
                    if (field[i][j] !== 0 && j > 0) {
                        if (field[i][j - 1] === 0) {
                            field[i][j - 1] = field[i][j]
                            field[i][j] = 0
                            isMove = true
                        } else if (field[i][j - 1] === field[i][j]) {
                            field[i][j - 1] = field[i][j] * 2
                            field[i][j] = 0
                            isMove = true
                        }
                    }
                }
            }
        }
    }
    if (isMove) randomNewCell()

    print()
}

// event arrow key press
document.addEventListener('keydown', e => {
    const { code } = e
    if (code === 'ArrowDown' || code === 'KeyS') {
        moveCell('down')
    } else if (code === 'ArrowRight' || code === 'KeyD') {
        moveCell('right')
    } else if (code === 'ArrowUp' || code === 'KeyW') {
        moveCell('up')
    } else if (code === 'ArrowLeft' || code === 'KeyA') {
        moveCell('left')
    }
})

// start game
btnStart.addEventListener('click', () => {
    field = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    randomNewCell(2)
})

print()
