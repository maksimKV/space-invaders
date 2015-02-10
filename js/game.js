var user = new Ship;

// Populating the aliens
var alien_left = 140;
var aliens = {};
for(i=0; i<10; i++){
	alien_left += 60;

	aliens["alien_scout" + i] = new Alien({
		left: alien_left,
		bottom: 405,
		id: 'scout' + i,
	});

	aliens["alien_fighter" + i] = new Alien({
		left: alien_left,
		bottom: 465,
		image: "./img/alien-1.png",
		height: 84,
		id: "fighter" + i,
		points: 18,
	});

	aliens["alien_bomber" + i] = new Alien({
		left: alien_left,
		bottom: 551,
		image: "./img/alien-3.png",
		height: 79,
		id: "bomber" + i,
		points: 26,
	});
}

//$('game').setAttribute("tabindex", 0);

var missiles = {};
missile_count = 0;

// The movement functionality for the user ship
$(document.body).addEvent('keydown', function(event){
	if(event.key == 'left' && user.options.left > 0){
		$('user').setStyle('left', user.moveLeft());
	} else if(event.key == 'right' && user.options.left < 895){
		$('user').setStyle('left', user.moveRight());
	} else if(event.key == 'space' && Object.getLength(missiles) < 10) {

		missiles["missile" + missile_count] = new Missile({
			left: $('user').getStyle('left').toInt() + 50,
			bottom: $('user').getStyle('bottom').toInt() + 84,
			id: "missile" + missile_count,
		});
		missile_count++;
	}

	return false;
});


// The game functionality
var direction = 'right';
var highest = 0;
function startGame() {
	checkBombs();
	checkMissiles();

	if(direction == 'right'){
		Array.each($$('.alien'), function(class_img){
			Object.each(aliens, function(alien_class){
				if(class_img.get('id') == alien_class.options.id){
					class_img.setStyle('left', alien_class.moveRight());
				}
			});

			// Getting the postion of the furthest element
			if(class_img.getStyle('left').toInt() > highest){
				highest = class_img.getStyle('left').toInt();
			}

			// Changing direction
			if(highest == 940){
				direction = 'left';

				// Moving down the enemies
				Array.each($$('.alien'), function(class_img){
					Object.each(aliens, function(alien_class){
						if(class_img.get('id') == alien_class.options.id){
							class_img.setStyle('bottom', alien_class.moveDown());
						}
					});
				});
			}
		});
	} else if(direction == 'left'){
		Array.each($$('.alien'), function(class_img){
			Object.each(aliens, function(alien_class){
				if(class_img.get('id') == alien_class.options.id){
					class_img.setStyle('left', alien_class.moveLeft());
				}
			});

			// Getting the postion of the furthest element
			if(class_img.getStyle('left').toInt() < highest){
				highest = class_img.getStyle('left').toInt();
			}

			// Changing direction
			if(highest == 0){
				direction = 'right';

				// Moving down the enemies
				Array.each($$('.alien'), function(class_img){
					Object.each(aliens, function(alien_class){
						if(class_img.get('id') == alien_class.options.id){
							class_img.setStyle('bottom', alien_class.moveDown());
						}
					});
				});
			}
		});
	}
}; 

// Creates the game interval
var start = startGame.periodical(600);
//clearInterval(start);


 /* Bombing functionality */
var bombs = {};
var bomb_count = 0;
function dropBomb() {
	// Finding a random alien out of the array
	var random_alien = $$('.alien')[Math.floor(Math.random()*$$('.alien').length)];

	bombs['bomb' + bomb_count] = new Bomb({
		left: random_alien.getStyle('left').toInt(),
		bottom: random_alien.getStyle('bottom').toInt(),
		id: "bomb" + bomb_count,
	});

	bomb_count++;
};
var bombing = dropBomb.periodical(10000);
/* End of bombing */

function checkBombs(){
	Array.each($$('.bombs'), function(bomb_html){
		var user_left = $('user').getStyle('left').toInt();
		var bomb_left = bomb_html.getStyle('left').toInt();

		if(bomb_html.getStyle('bottom').toInt() <= 80 && bomb_left >= user_left && bomb_left <= user_left + 103){
			//bomb_html.dispose();
			//$('user').dispose();

			//delete bombs[bomb_html.get('id')];
			//delete user;

			clearInterval(start);
			clearInterval(bombing);
		}

		Object.each(bombs, function(bombs_class){
			if(bomb_html.getStyle('bottom').toInt() <= 10){
				bomb_html.dispose();
				delete bombs[bomb_html.get('id')];
			}

			if(bomb_html.get('id') == bombs_class.options.id){
				bomb_html.setStyle('bottom', bombs_class.moveDown());
			}
		});
	});
};

function checkMissiles(){
	Array.each($$('.missiles'), function(missiles_html){
		Array.each($$('.alien'), function(alien_html){
			var alien_left = alien_html.getStyle('left').toInt();
			var alien_bottom = alien_html.getStyle('bottom').toInt();

			var alien_height = alien_html.getStyle('height').toInt();
			var missile_bottom = missiles_html.getStyle('bottom').toInt() + 10;
			var missile_left = missiles_html.getStyle('left').toInt();
			if(missile_bottom >= alien_bottom && missile_bottom <= alien_bottom + alien_height && 
				missile_left >= alien_left && missile_left <= alien_left + 59){
				alien_html.dispose();
				delete aliens[alien_html.get('id')];

				console.log('impact');

				missiles_html.dispose();
				delete missiles[missiles_html.get('id')];
			}
		});

		if(missiles_html.getStyle('bottom').toInt() >= 640){
				missiles_html.dispose();
				delete missiles[missiles_html.get('id')];
		}

		Object.each(missiles, function(missiles_class){
			if(missiles_html.get('id') == missiles_class.options.id){
				missiles_html.setStyle('bottom', missiles_class.moveUp());
			}
		});
	});
}