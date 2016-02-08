var bombs = {};
var bomb_count = 0;
function dropBomb() {
	// Finding a random alien out of the array
	var random_alien = $$('.alien')[Math.floor(Math.random()*$$('.alien').length)];

	bombs['bomb' + bomb_count] = new Bomb({
		left: random_alien.getStyle('left').toInt(),
		bottom: random_alien.getStyle('bottom').toInt(),
		id: "bomb" + bomb_count,
		speed: drop_speed,
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
				var old_position = bomb_html.getStyle('bottom');
				//class_img.setStyle('bottom', bombs_class.moveDown());
				var new_position = bombs_class.moveDown();
				addEffect(bomb_html, 'down', old_position, new_position);
			}
		});
	});
};