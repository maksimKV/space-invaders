/* Start of key detection */
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
	} else if(event.key == 'enter' && !$('user')){
		beginGame();
	}

	return false;
});
/* End of key detection */

/* Start assemble functionality */
function beginGame(){
	user = new Ship;

	// Populating the aliens
	alien_left = 140;
	aliens = {};
	for(i=0; i<10; i++){
		alien_left += 60;

		aliens["alien_scout" + i] = new Alien({
			left: alien_left,
			bottom: 405,
			id: 'alien_scout' + i,
		});

		aliens["alien_fighter" + i] = new Alien({
			left: alien_left,
			bottom: 465,
			image: "./img/alien-1.png",
			height: 84,
			id: "alien_fighter" + i,
			points: 18,
		});

		aliens["alien_bomber" + i] = new Alien({
			left: alien_left,
			bottom: 551,
			image: "./img/alien-3.png",
			height: 79,
			id: "alien_bomber" + i,
			points: 26,
		});
	}

	// Starts the game sequence interval
	start = startGame.periodical(game_speed);

	// Starts the bombing interval
	bombing = dropBomb.periodical(drop_rate);
};
/* End assemble functionality */

/* Start of the game sequence functionality */
var direction = 'right';
var highest = 0;
function startGame() {

	// User has won
	if(Object.getLength(aliens) <= 0){
		stopGame('win');
		return false;
	}

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
/* End of the game sequence functionality */

/* Start of bombing functionality */
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

function checkBombs(){
	Array.each($$('.bombs'), function(bomb_html){
		var user_left = $('user').getStyle('left').toInt();
		var bomb_left = bomb_html.getStyle('left').toInt();

		if(bomb_html.getStyle('bottom').toInt() <= 80 && bomb_left >= user_left && bomb_left <= user_left + 103){
			stopGame('lose');
			return false;
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
/* End of bombing functionality */

/* Start of missiles functionality */
var missiles = {};
missile_count = 0;
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
/* End of missiles functionality */

/* Start of stop functionality */
function stopGame(condition){
	if(condition == 'win'){
		level++;
		console.log('you have won');
	} else if (condition == 'lose'){
		lives--;
	}

	clearInterval(start);
	clearInterval(bombing);

	$$('.bombs').dispose();
	delete bombs;

	$$('.missiles').dispose();
	delete missiles;

	$$('.alien').dispose();
	delete aliens;

	$('user').dispose();
	delete user;
}
/* End of stop functionality */