class Character {
	constructor(a, b, c, d, e, f, g) {
		this.hp = a;
		this.ap = b;
		this.cap = c;
		this.id = d;
		this.img = e;
		this.selected = f;
		this.opponent = g;
		this.bindTo = () => {
			let div = "<div class='char' id='" + this.id + "' style='background-image:url(" + this.img + ")'></div>";
			$("#game").append(div);

			$(this.sel()).html("<ul style='margin-top:10vw;position:absolute;display:block;background-color:lightgray;'>" + this.id.toUpperCase() + "<li>hp:" + this.hp +
				"</li><li>attack:" + this.ap +
				"</li><li>counter:" + this.cap + "</li></ul>");
		};
		this.update = () => {
			$(this.sel()).html("<ul style='margin-top:10vw;position:absolute;display:block;background-color:lightgray;'>" + this.id.toUpperCase() + "<li>hp:" + this.hp +
				"</li><li>attack:" + this.ap +
				"</li><li>counter:" + this.cap + "</li></ul>");
		};
		this.attack = () => {
			if (this.selected) {
				return this.ap;
			}
			if (this.opponent) {
				return this.cap;
			}
		};
		this.takeDamage = (damage) => {
			if (this.hp - damage > 0) {
				this.hp = this.hp - damage;
			} else {
				this.hp = 0;
			}
		};
		this.sel = () => {
			return '#' + this.id;
		}
	}
}
let darthMaul;
let oldBen;
let quiGon;
let palpatine;
let characters = [];

function init() {
	darthMaul = new Character(130, 2, 30, 'darth-maul', 'assets/img/darthmaul.png', false, false);
	oldBen = new Character(110, 4, 10, 'obi-wan', 'assets/img/oldben.jpg', false, false);
	quiGon = new Character(120, 6, 12, 'qui-gon', 'assets/img/quigon.png', false, false);
	palpatine = new Character(100, 2, 20, 'palpatine', 'assets/img/palpatine.jpg', false, false);
	characters = [darthMaul, oldBen, quiGon, palpatine];
	$("#banner").html('choose your fighter!');
	for (var i in characters) {
		characters[i].bindTo();
		$(characters[i].sel()).on('click', function a(event) {
			for (var j in characters) {
				if (event.target.id == characters[j].id) {
					characters[j].selected = true;
					$(characters[j].sel()).css('border-color', 'lightgreen');
					$(characters[j].sel()).detach().appendTo('#match');
				}
				$(characters[j].sel()).off('click');
			}
			phaseTwo();
		});
	}
}

function phaseTwo() {
	$("#banner").html('choose your opponent!');
	for (var i in characters) {
		if (!(characters[i].selected)) {
			defenders.push(characters[i]);
		}
		$(characters[i].sel()).on('click', function b(event) {
			$("#banner").html('FIGHT!');
			for (var j in characters) {
				if (event.target.id == characters[j].id) {
					characters[j].opponent = true;
					$(characters[j].sel()).css('border-color', 'red');
					$(characters[j].sel()).detach().appendTo('#match');
				}
				$(characters[j].sel()).off('click');
			}
			phaseThree();
		});
	}
	console.log(defenders);
}
let defenders = [];
let player;

function phaseThree() {
	let computer;
	let actionBtn = "<button id='action'>ATTACK</button>";
	let removeDefenders = (op) => {
		for (var i in defenders) {
			if (defenders[i] == op) {
				$(defenders[i].sel()).remove();
				defenders.splice(i, 1);
				console.log(defenders);
			}
		}
	}
	$('#match').append(actionBtn);
	for (var i in characters) {
		if (characters[i].opponent) {
			computer = characters[i];
		}
		if (characters[i].selected) {
			player = characters[i];
		}
	}
	$('#action').on('click', function c() {

		computer.takeDamage(player.attack());
		computer.update();
		$('#banner').html(player.id + ' hit ' + computer.id + ' for ' + player.ap + 'hp!');
		timeOut = setTimeout(function () {
			player.takeDamage(computer.attack())
			player.ap *= 2;
			player.update();
			$('#banner').html(computer.id + ' hit ' + player.id + ' for ' + computer.cap + 'hp!');
		}, 1000);
		if (player.hp === 0) {
			lose();
			clearTimeout(timeOut);
		}
		if (computer.hp === 0) {
			computer.opponent = false;
			removeDefenders(computer);
			if (defenders.length > 0) {
				phaseFour();
			}
			if (defenders.length === 0) {
				win();
				clearTimeout(timeOut);
			}
			clearTimeout(timeOut);
		}
	})
}

function phaseFour() {
	$('#action').remove();
	$("#banner").html('choose your next opponent!');
	for (var i in characters) {
		$(characters[i].sel()).on('click', function b(event) {
			$("#banner").html('FIGHT!');
			for (var j in characters) {
				if (event.target.id == characters[j].id) {
					characters[j].opponent = true;
					$(characters[j].sel()).css('border-color', 'red');
					$(characters[j].sel()).detach().appendTo('#match');
				}
				$(characters[j].sel()).off('click');
			}
			phaseThree();
		});
	}
}





function lose() {
	$("#banner").html('you lost');
	reset();
}

function win() {
	$("#banner").html('you win');
	reset();

}

function reset() {
	let newGame = "<button id='new-game'>New Game</button>";
	defenders = [];
	$('#banner').append(newGame);
	$('#new-game').on('click', function () {
		$('#game').html('');
		$('#match').html('');
		init();

	})
}
// function phaseThree() {
// 	for (var i in characters) {
// 		if (characters[i].opponent) {
// 			$(characters[i].sel()).css('border-color', 'lightred');
// 			$(characters[i].sel()).detach().appendTo('#match');
// 		}
// 	}
// }


init();


//function win
//function lose
//function pick opponent
//		character moves to profile position;
// 		all other characters move to defender positions;
//function fight
//select character
//select opponent

//event( user clicks div w character){
// 		character.selected = true;
// 		function pick opponent
// 		event(user click div w character){
// 			character.opponent = true;
// 			character moves to opponent position;
//			function fight
// 		}
// }
//init();