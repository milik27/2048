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
        return false
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
//todo refactor arr links
const sumCell = row => {
    let newRow = row.filter(count => !!count)
    newRow.forEach((cell, i) => {
        if (i + 1 < newRow.length && cell === newRow[i + 1]) {
            newRow[i] = cell * 2
            newRow[i + 1] = 0
        }
    })
    newRow = newRow.filter(count => !!count)
    for (let i = newRow.length; i < row.length; i++) {
        newRow.push(0)
    }
    return newRow
}

//
const createNewField = (side, arr) => {
    let newField = arr.map(row => row.map(cell => cell))
    if (side === 'down' || side === 'up') {
        arr[arr.length - 1].forEach((cell, j) => {
            let newRow
            if (side === 'down') {
                newRow = sumCell(arr.map(row => row[j]).reverse()).reverse()
            } else {
                newRow = sumCell(arr.map(row => row[j]))
            }
            for (let i = arr.length - 1; i >= 0; i--) {
                newField[i][j] = newRow[i]
            }
        })
    } else if (side === 'left' || side === 'right') {
        arr.forEach((row, i) => {
            if (side === 'left') {
                newField[i] = [...sumCell(row)]
            } else {

                newField[i] = [...sumCell(row.reverse()).reverse()]
            }
        })
    }

    return newField
}

const checkGameOver = () => {
    const check = (newField2) => {
        return newField2.join() !== field.join();
    }
    let checkField
    checkField = createNewField('down', field)
    if (check(checkField)) return false

    console.log(1)
    checkField = createNewField('up', field)
    if (check(checkField)) return false

    console.log(2)
    checkField = createNewField('left', field)
    if (check(checkField)) return false

    console.log(3)
    checkField = createNewField('right', field)
    if (check(checkField)) return false
    console.log(123)
    gameOver = true

}

// event arrow key press
document.addEventListener('keydown', e => {
    const {code} = e
    let newField
    if (code === 'ArrowDown' || code === 'KeyS') {
        newField = createNewField('down', field)
    } else if (code === 'ArrowRight' || code === 'KeyD') {
        newField = createNewField('right', field)
    } else if (code === 'ArrowUp' || code === 'KeyW') {
        newField = createNewField('up', field)
    } else if (code === 'ArrowLeft' || code === 'KeyA') {
        newField = createNewField('left', field)
    }

//todo refactor arr links
    if (newField && field.join() !== newField.join()) {
        field = newField.map(row => row.map(cell => cell))
        randomNewCell()
        print()
        checkGameOver()
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
