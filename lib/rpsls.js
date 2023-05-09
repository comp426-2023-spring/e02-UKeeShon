module.exports = { rps, rpsls };

let rps_moves = ['rock', 'paper', 'scissors']
let rpsls_moves = ['rock', 'paper', 'scissors', 'lizard', 'spock']

function get_random(list) {
	return list[Math.floor((Math.random()*list.length))]
}

function rps(shot) {

	if (shot == null){
		return {player:get_random(rps_moves)}
	}
	let computer = get_random(rps_moves);
	let move = shot.toLowerCase();

	if(!rps_moves.includes(move)){
		console.error("Error:Move must be either rock, paper, or scissors.")
		throw new RangeError()
	}

	if(move === computer) {
		result = 'tie'
	}else if (move === 'rock' && computer === 'paper' || move === 'paper' && computer === 'scissors' || move === 'scissors' && computer === 'rock'){
		result = 'lose'
	}else{
		result = 'win'
	}

	return {player:move,
		opponent:computer,
		result:result
	};
}

function rpsls(shot) {

	if ( shot == null ) {
		return { player : get_random(rpsls_moves) }
	}

	let computer = get_random(rpsls_moves);
	let move = shot.toLowerCase();

	if (!rpsls_moves.includes(move)) {
		console.error("Error: Move must be either rock, paper, scissors, lizard, or spock.")
		throw new RangeError();
	}

	let result = ''

	if (move === computer) {
		result = 'tie'
	}else if (move === 'rock' && (computer === 'paper' || computer === 'spock') || move === 'paper'  && (computer === 'scissors' || computer === 'lizard') || move === 'scissors' && (computer === 'rock' || computer === 'spock')) {
		result = 'lose'
	}else if (move === 'lizard' && (computer === 'rock' || computer === 'scissors' ) || move === 'spock' && (computer === 'lizard' || computer === 'paper')){
		result = 'lose'
	}else{
		result = 'win'
	}

	return { player: move,
		opponent: computer,
		result
	};
}

		

