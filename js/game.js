displayMessage();
insertInfo();

/* Start of key detection */
var key_down;
$(document.body).addEvent('keydown', function(event){
	if(event.key == 'left' && user.options.left > 0){
		var old_position = $('user').getStyle('left');
		//$('user').setStyle('left', user.moveLeft());
		var new_position = user.moveLeft();
		addEffect($('user'), 'left', old_position, new_position);
	} else if(event.key == 'right' && user.options.left < 895){
		var old_position = $('user').getStyle('left');
		//$('user').setStyle('left', user.moveRight());
		var new_position = user.moveRight();
		addEffect($('user'), 'right', old_position, new_position);
	} else if(event.key == 'space' && key_down != 'space') {
		fireMissile();
		key_down = event.key;

	} else if(event.key == 'enter' && !$('user') && level < 11 && lives > 0){
		removeMessage();
		beginGame();
	}

	return false;
});

function allowSpace(){ return key_down = null; };
var allow_fire = allowSpace.periodical(800); // Limit the missile launch to 800ms
/* End of key detection */

/* Start assemble functionality */
function beginGame(){
	resetConfig();

	user = new Ship;

	// Populating the aliens
	alien_left = 140;
	aliens = {};
	for(i=0; i<10; i++){
		alien_left += 60;

		aliens["alien_scout" + i] = new Alien({
			left: alien_left,
			bottom: 445,
			id: 'alien_scout' + i,
			speed: speed,
			drop_speed: drop_speed,
		});

		aliens["alien_fighter" + i] = new Alien({
			left: alien_left,
			bottom: 505,
			image: "./img/alien-1.png",
			height: 84,
			id: "alien_fighter" + i,
			points: 18,
			speed: speed,
			drop_speed: drop_speed,
		});

		aliens["alien_bomber" + i] = new Alien({
			left: alien_left,
			bottom: 591,
			image: "./img/alien-3.png",
			height: 79,
			id: "alien_bomber" + i,
			points: 26,
			speed: speed,
			drop_speed: drop_speed,
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
var lowest = 1000;
function startGame() {

	// User has won
	if(Object.getLength(aliens) <= 0){
		stopGame('win');
		return false;
	}

	checkBombs();
	checkMissiles();
	checkGifts();

	if(direction == 'right'){
		Array.each($$('.alien'), function(class_img){
			Object.each(aliens, function(alien_class){
				if(class_img.get('id') == alien_class.options.id){
					var old_position = class_img.getStyle('left');
					//class_img.setStyle('left', alien_class.moveRight());
					var new_position = alien_class.moveRight();
					addEffect(class_img, direction, old_position, new_position);
				}
			});

			// Getting the postion of the furthest element
			if(class_img.getStyle('left').toInt() > highest){
				highest = class_img.getStyle('left').toInt();
			}

			// Changing direction
			if(highest >= 940){
				direction = 'left';

				// Moving down the enemies
				Array.each($$('.alien'), function(class_img){
					checkLowest(class_img);

					Object.each(aliens, function(alien_class){
						if(class_img.get('id') == alien_class.options.id){
							var old_position = class_img.getStyle('bottom');
							//class_img.setStyle('bottom', alien_class.moveDown());
							var new_position = alien_class.moveDown();
							addEffect(class_img, 'down', old_position, new_position);
						}
					});
				});
			}
		});
	} else if(direction == 'left'){
		Array.each($$('.alien'), function(class_img){
			Object.each(aliens, function(alien_class){
				if(class_img.get('id') == alien_class.options.id){
					var old_position = class_img.getStyle('left');
					//class_img.setStyle('left', alien_class.moveLeft());
					var new_position = alien_class.moveLeft();
					addEffect(class_img, direction, old_position, new_position);
				}
			});

			// Getting the postion of the furthest element
			if(class_img.getStyle('left').toInt() < highest){
				highest = class_img.getStyle('left').toInt();
			}

			// Changing direction
			if(highest <= 0){
				direction = 'right';
				checkLowest(class_img);

				// Moving down the enemies
				Object.each(aliens, function(alien_class){
					if(class_img.get('id') == alien_class.options.id){
						var old_position = class_img.getStyle('bottom');
						//class_img.setStyle('bottom', alien_class.moveDown());
						var new_position = alien_class.moveDown();
						addEffect(class_img, 'down', old_position, new_position);
					}
				});
			}
		});
	}
};
/* End of the game sequence functionality */

/* Start of stop functionality */
function stopGame(condition){
	if(condition == 'win'){
		if (level < 10){ 
			level++; 
		}
	} else if (condition == 'lose'){
		lives--;
		if(power == 'Advanced'){
			power == 'Intermediate';
		} else if(power == 'Intermediate'){
			power = 'Basic';
		}
	}

	clearInterval(start);
	clearInterval(bombing);

	$$('.bombs').dispose();
	bombs = {};

	$$('.missiles').dispose();
	missiles = {};

	$$('.alien').dispose();
	aliens = {};

	$('user').dispose();
	delete user;

	$$('.gifts').dispose();
	gifts = {};

	insertInfo();
	displayMessage();
}
/* End of stop functionality */

/* Start of aliens bottom position check */
function checkLowest(html_element){
	// Getting the position of the element closest to the bottom
	if(html_element.getStyle('bottom').toInt() < lowest){
		lowest = html_element.getStyle('bottom').toInt();
	}

	if(lowest <= 105){
		stopGame('lose');
		return false;
	}
}
/* End of aliens bottom position check */

/* Start of message functionality */
function displayMessage(){
	if (level < 11 && lives > 0) {
		var title = new Element('h2', {
			id: 'message_title',
			text: 'Level ' + level,
		});

		var subtitle = new Element ('p', {
			id: 'message_subtitle',
			text: 'Press Enter to start',
		});
	} else if(level > 10) {
		var title = new Element('h2', {
			id: 'message_title',
			text: 'Victory',
		});

		var subtitle = new Element ('p', {
			id: 'message_subtitle',
			text: 'Well done! Refresh to play again',
		});
	} else if(lives < 1){
		var title = new Element('h2', {
			id: 'message_title',
			text: 'Defeat',
		});

		var subtitle = new Element ('p', {
			id: 'message_subtitle',
			text: 'Refresh to try again',
		});
	}

	title.inject(game);
	subtitle.inject(game);
}

function removeMessage(){
	$('message_title').dispose();
	$('message_subtitle').dispose();
}
/* End of message functionality */

/* Start of game info functionality */
function insertInfo(){
	$('level').set('text', 'Level: ' + level);
	$('lives').set('text', 'Lives: ' + lives);
	$('power').set('text', 'Power: ' + power);
	$('score').set('text', 'Score: ' + score);
}
/* End of game info functionality */

/* Start of animations functionality */
function addEffect(element, direction, old_position, new_position){
	var effect = new Fx.Morph(element, {
	    duration: game_speed,
	    transition: Fx.Transitions.Sine.easeOut
	});

	if(direction == 'left' || direction == 'right'){
		effect.start({
		    'left': [old_position, new_position],
		});

	} else if(direction == 'down' || direction =='up'){
		effect.start({
		    'bottom': [old_position, new_position],
		});
	}
}
/* End of animations functionality */