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
		this.attack = () => {
			if (this.selected) {
				return this.ap;
			}
			if (this.opponent) {
				return this.cp;
			}
		};
		this.takeDamage = (damage) => {
			if (this.hp > 0) {
				this.hp = this.hp - damage;
			} else {
				this.die();
			}
		};
		this.die = () => {
			if (this.selected) {
				lose();
			}
			if (this.opponent) {
				win();
			}
		};
		this.sel = () => {
			return '#' + this.id;
		}
	}
}
let darthMaul = new Character(100, 10, 20, 'darth-maul', 'assets/img/darthmaul.png', false, false);
let oldBen = new Character(100, 10, 20, 'obi-wan', 'assets/img/oldben.jpg', false, false);
let quiGon = new Character(100, 10, 20, 'qui-gon', 'assets/img/quigon.png', false, false);
let palpatine = new Character(100, 10, 20, 'palpatine', 'assets/img/palpatine.jpg', false, false);
let characters = [darthMaul, oldBen, quiGon, palpatine];

function init() {
	for (var i in characters) {
		characters[i].bindTo();
		$(characters[i].sel()).on('click', function a(event) {
			for (var i in characters) {
				$(characters[i].sel()).off('click', a);
				if (event.target.id == characters[i].id) {
					characters[i].selected = true;
					phaseTwo();
				}
			}

		});
	}
}

function phaseTwo() {
	for (var i in characters) {
		if (characters[i].selected) {
			$(characters[i].sel()).css('border-color', 'lightgreen');
			$(characters[i].sel()).detach().appendTo('#match');
		}
		$(characters[i].sel()).on('click', function b(event) {
			for (var i in characters) {
				if (event.target.id == characters[i].id) {
					characters[i].opponent = true;
					phaseThree();
				}
			}

		});
	}
}

function phaseThree() {
	$(document).off();
	for (var i in characters) {
		if (characters[i].opponent) {
			$(characters[i].sel()).css('border-color', 'lightred');
			$(characters[i].sel()).detach().appendTo('#match');
		}
	}
}


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