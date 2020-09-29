const root = document.querySelector('#root')
const btnStart = document.querySelector('.js-start')
const COLOR = '120,50,1'
let field = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]
let gameOver = false

const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const getColor = (count) => {
    switch (count) {
        case 0:
            return `${COLOR}, 0`
        case 2:
            return `${COLOR}, 0.1`
        case 4:
            return `${COLOR}, 0.2`
        case 8:
            return `${COLOR}, 0.3`
        case 16:
            return `${COLOR}, 0.4`
        case 32:
            return `${COLOR}, 0.5`
        case 64:
            return `${COLOR}, 0.6`
        case 128:
            return `${COLOR}, 0.7`
        case 256:
            return `${COLOR}, 0.8`
        case 512:
            return `${COLOR}, 0.9`
        case 1024:
            return `${COLOR}, 1`
        default:
            return '255,23,91,1'
    }
}

const print = () => {
    if (gameOver) {
        root.innerHTML = `<h1>GAME OVER</h1>`
    }
    root.innerHTML = field.reduce((sumRow, row) => {
        const res = row.reduce((sumCell, cell) => (sumCell + `<div style="background-color: rgba(${getColor(cell)})" class="cell">${cell ? cell : ''}</div>`), '')
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
    if (isMove) {
        if (randomInteger(1, 20) === 20) {
            gameOver = true
        }
        randomNewCell()
    }

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
    gameOver = false
    field = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    randomNewCell(2)
})

print()
