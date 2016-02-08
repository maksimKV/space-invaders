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
			speed: drop_speed,
		});

		gift_number++;
	} else if(random == 33 && power != "Advanced"){
		gifts['power' + gift_number] = new Gift({
			left: left,
			bottom: bottom,
			id: 'power' + gift_number,
			type: 'power',
			image: './img/power.png',
			speed: drop_speed,
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

		var old_position = gift_html.getStyle('bottom');
		//gift_html.setStyle('bottom', gift_object.moveDown());
		var new_position = gift_object.moveDown();
		addEffect(gift_html, 'down', old_position, new_position);
	});
}