// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver


// type of play
let gameType = null

// Whether to play against an opponent
let isOpponent = null

// Gesture type
let gestureType = null

function isOption(param) {
    switch (param) {
        // type of play
        case 'gameTypeRock':
            gameType = 'gameTypeRock'
            document.querySelectorAll('.rockType')
                .forEach((d) => {
                    d.style.display = 'block'
                })
            document.querySelectorAll('.spockType')
                .forEach((d) => {
                    d.style.display = 'none'
                })
            break;
        case 'gameTypeSpock':
            gameType = 'gameTypeSpock'
            document.querySelectorAll('.rockType')
                .forEach((d) => {
                    d.style.display = 'block'
                })
            document.querySelectorAll('.spockType')
                .forEach((d) => {
                    d.style.display = 'block'
                })
            break;

        // Whether to play against an opponent
        case 'opponent':
            isOpponent = 'opponent'
            break;

        // Gesture type
        case 'gestureTypeRock':
            gestureType = 'rock'
            break;
        case 'gestureTypePaper':
            gestureType = 'paper'
            break;
        case 'gestureTypeScissors':
            gestureType = 'scissors'
            break;
        case 'gestureTypeLizard':
            gestureType = 'lizard'
            break;
        case 'gestureTypeSpock':
            gestureType = 'spock'
            break;

    }
}

function play() {
    const you = document.getElementById('you')
    const youOpponent = document.getElementById('youOpponent')
    const result = document.getElementById('result')

    const optionsPage = document.getElementById('optionsPage')
    const resultPage = document.getElementById('resultPage')
    const playBtn = document.getElementById('playBtn')

    const hint = document.getElementById('hint')
    const hint__shade = document.getElementById('hint__shade')

    if (gameType == null) {
        hint.textContent = '请选择游戏'
        hint__shade.style.display = 'block'

        setTimeout(() => {
            hint__shade.style.display = 'none'
        }, 1000);
        return
    }

    if (gestureType == null) {
        hint.textContent = '请选择手势'
        hint__shade.style.display = 'block'

        setTimeout(() => {
            hint__shade.style.display = 'none'
        }, 1000);
        return
    }

    if (gameType != null && gestureType != null) {

        if (gameType === 'gameTypeRock') {
            send('rps', gestureType).then(res => {
                you.textContent = res.player
                youOpponent.textContent = res.opponent
                result.textContent = res.result
            })
        }

        if (gameType === 'gameTypeSpock') {
            send('rpsls', gestureType).then(res => {
                you.textContent = res.player
                youOpponent.textContent = res.opponent
                result.textContent = res.result
            })
        }

        optionsPage.style.display = 'none'
        resultPage.style.display = 'block'
        playBtn.style.display = 'none'

    }


}

// deselect
function startOver() {
    gameType = null
    isOpponent = null
    gestureType = null

    const gameTypeRadio = document.querySelector('input[type=radio][name=gameType]:checked')
    const opponentRadio = document.querySelector('input[type=radio][name=opponent]:checked')
    const gestureTypeRadio = document.querySelector('input[type=radio][name=gestureType]:checked')
    if (gameTypeRadio) gameTypeRadio.checked = false;
    if (opponentRadio) opponentRadio.checked = false;
    if (gestureTypeRadio) gestureTypeRadio.checked = false;

    document.querySelectorAll('.rockType')
        .forEach((d) => {
            d.style.display = 'none'
        })
    document.querySelectorAll('.spockType')
        .forEach((d) => {
            d.style.display = 'none'
        })


    document.getElementById('optionsPage').style.display = 'block'
    document.getElementById('resultPage').style.display = 'none'
    document.getElementById('playBtn').style.display = 'block'
}

function send(url, shot) {
    return new Promise(async (resolve, reject) => {

        // 请求
        fetch(`http://localhost:9000/app/${url}/play/${shot}`)
            .then(res => {
                return res.json();
            })
            .then(res => {
                // result = res
                resolve(res);
            })
            .catch(error => console.error("Error:", error));
    })

}