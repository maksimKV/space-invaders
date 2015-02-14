displayMessage();
insertInfo();

/* Start of key detection */
$(document.body).addEvent('keydown', function(event){
	if(event.key == 'left' && user.options.left > 0){
		$('user').setStyle('left', user.moveLeft());
	} else if(event.key == 'right' && user.options.left < 895){
		$('user').setStyle('left', user.moveRight());
	} else if(event.key == 'space') {
		
		// The user can only shoot 10 times
		if(power == 'Basic' && Object.getLength(missiles) < 10){
			fireMissile();
		} else if (power == 'Intermediate' && Object.getLength(missiles) < 20){
			fireMissile();
		} else if (power == 'Advanced' && Object.getLength(missiles) < 40){
			fireMissile();
		}

	} else if(event.key == 'enter' && !$('user') && level < 11 && lives > 0){
		removeMessage();
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
					checkLowest(class_img);

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
				checkLowest(class_img);

				// Moving down the enemies
				Object.each(aliens, function(alien_class){
					if(class_img.get('id') == alien_class.options.id){
						class_img.setStyle('bottom', alien_class.moveDown());
					}
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

function fireMissile(){
	if (power == "Basic"){
		missiles["missile" + missile_count] = new Missile({
				left: $('user').getStyle('left').toInt() + 50,
				bottom: $('user').getStyle('bottom').toInt() + 84,
				id: "missile" + missile_count,
		});
		missile_count++;

	}else if(power == "Intermediate"){
		missiles["missile" + missile_count] = new Missile({
				left: $('user').getStyle('left').toInt() + 32,
				bottom: $('user').getStyle('bottom').toInt() + 84,
				id: "missile" + missile_count,
		});

		missiles["missile" + missile_count + 1] = new Missile({
				left: $('user').getStyle('left').toInt() + 70,
				bottom: $('user').getStyle('bottom').toInt() + 84,
				id: "missile" + missile_count + 1,
		});

		missile_count += 2;
	} else if(power == "Advanced"){
		missiles["missile" + missile_count] = new Missile({
				left: $('user').getStyle('left').toInt() + 6,
				bottom: $('user').getStyle('bottom').toInt() + 34,
				id: "missile" + missile_count,
		});

		missiles["missile" + missile_count + 1] = new Missile({
				left: $('user').getStyle('left').toInt() + 32,
				bottom: $('user').getStyle('bottom').toInt() + 84,
				id: "missile" + missile_count + 1,
		});

		missiles["missile" + missile_count + 2] = new Missile({
				left: $('user').getStyle('left').toInt() + 70,
				bottom: $('user').getStyle('bottom').toInt() + 84,
				id: "missile" + missile_count + 2,
		});

		missiles["missile" + missile_count + 3] = new Missile({
				left: $('user').getStyle('left').toInt() + 95,
				bottom: $('user').getStyle('bottom').toInt() + 34,
				id: "missile" + missile_count + 3,
		});

		missile_count += 4;
	}
}

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

				score += aliens[alien_html.get('id')].options.points;
				insertInfo();

				// Trigers the gifts chance
				dropGift(alien_left, alien_bottom);
				
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

	$$('.gifts').dispose;
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

/* Start of gifts functionality */
var gifts = {};
var gift_number = 1;
function dropGift(left, bottom){
	var top_value = 50;
	var random = Math.floor((Math.random() * top_value) + 1);

	// There is a 2% chance that the user will recieve a gift
	if(random == 11 && lives < 6){
		gifts['live' + gift_number] = new Gift({
			left: left,
			bottom: bottom,
			id: 'live' + gift_number,
		});

		gift_number++;
	} else if(random == 33 && power != "Advanced"){
		gifts['power' + gift_number] = new Gift({
			left: left,
			bottom: bottom,
			id: 'power' + gift_number,
			type: 'power',
			image: './img/power.png',
		});

		gift_number++;
	}
}

function checkGifts(){
	Array.each($$('.gifts'), function(gift_html){
		var user_left = $('user').getStyle('left').toInt();
		var gift_left = gift_html.getStyle('left').toInt();

		var gift_object = gifts[gift_html.get('id')];

		if(gift_html.getStyle('bottom').toInt() <= 80 && gift_left >= user_left && gift_left <= user_left + 103){
			
			if(gift_object.options.type == 'live' && lives < 6){
				lives++;
				insertInfo();

			} else if(gift_object.options.type == 'power'){
				if(power == 'Intermediate'){ power = 'Advanced'; } else if(power == 'Basic') { power = 'Intermediate'; }
				insertInfo();
			}

			gift_html.dispose();
			delete gifts[gift_html.get('id')];

			return false;		
		}

		if(gift_html.getStyle('bottom').toInt() <= 10){
			gift_html.dispose();
			delete gifts[gift_html.get('id')];

			return false;
		}

		gift_html.setStyle('bottom', gift_object.moveDown());
	});
}
/* End of gifts functionality */