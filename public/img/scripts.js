// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

function toggleMoveOptions() {
    let opponentChecked = document.getElementById('opponent').checked;
    let selectedGameType = document.querySelector('input[name="game-type"]:checked').id;

    if (opponentChecked && selectedGameType === 'rpsls') {
        $('.move').show();
        $('.rpsls').show();
        $('.rps').show();
    } else if (opponentChecked && selectedGameType === 'rps') {
        $('.move').show();
        $('.rps').show();
        $('.rpsls').hide();
    } else {
        $('.move').hide();
    }
    console.log(selectedGameType);
    console.log(opponentChecked);
}

function clearAndReset() {
    document.getElementById('userinput').reset();
    $('#results').hide();
    $('#userinput').show();
    $('#play').show();
    toggleMoveOptions();
}

async function playGame() {
    $('#userinput').hide();
    $('#play').hide();

    let gameType = $('input[type=radio][name=game-type]:checked').val();
    let againstOpponent = document.querySelector('#opponent').checked;
    let chosenMove = $('input[type=radio][name=move]:checked').val();

    let baseURL = window.location.href + 'app/'
    let requestURL = baseURL + gameType + '/play'

    if (againstOpponent) {
        requestURL += '/' + chosenMove
    }

    let response = await fetch(requestURL);
    let gameOutcome = await response.json();

    if (againstOpponent) {
        $('#results').show();
        document.getElementById("results").innerText = 'You: ' + gameOutcome.player +
            '\n\nYour opponent: ' + gameOutcome.opponent +
            '\n\nResult: you ' + gameOutcome.result.toUpperCase() +'\n';
    } else {
        $('#results').show();
        document.getElementById("results").innerText = 'Your random draw is: ' + gameOutcome.opponent;
    }
    console.log(requestURL);
    console.log(gameOutcome);
    console.log(gameOutcome.result);
}

function displayRules() {
    document.getElementById("rules").innerText =
    `Rules for Rock Paper Scissors:
    - Scissors CUTS Paper
    - Paper COVERS Rock
    - Rock CRUSHES Scissors
    
    Rules for the Lizard-Spock Expansion of Rock Paper Scissors:
    - Scissors CUTS Paper
    - Paper COVERS Rock
    - Rock SMOOSHES Lizard
    - Lizard POISONS Spock
    - Spock SMASHES Scissors
    - Scissors DECAPITATES Lizard
    - Lizard EATS Paper
    - Paper DISPROVES Spock
    - Spock VAPORIZES Rock
    - Rock CRUSHES Scissors`;
    document.getElementById("rules-btn").hidden = true;
    document.getElementById("rules").hidden = false;
    document.getElementById("hide-rules-btn").hidden = false;
}

function hideRules() {
    document.getElementById("rules").hidden = true;
    document.getElementById("hide-rules-btn").hidden = true;
    document.getElementById("rules-btn").hidden = false;
}
