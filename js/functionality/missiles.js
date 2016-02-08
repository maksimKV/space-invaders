var missiles = {};
missile_count = 0;

function fireMissile(){
	if (power == "Basic"){
		missiles["missile" + missile_count] = new Missile({
				left: $('user').getStyle('left').toInt() + 50,
				bottom: $('user').getStyle('bottom').toInt() + 84,
				id: "missile" + missile_count,
				speed: drop_speed,
		});
		missile_count++;

	}else if(power == "Intermediate"){
		missiles["missile" + missile_count] = new Missile({
				left: $('user').getStyle('left').toInt() + 32,
				bottom: $('user').getStyle('bottom').toInt() + 84,
				id: "missile" + missile_count,
				speed: drop_speed,
		});

		missiles["missile" + missile_count + 1] = new Missile({
				left: $('user').getStyle('left').toInt() + 70,
				bottom: $('user').getStyle('bottom').toInt() + 84,
				id: "missile" + missile_count + 1,
				speed: drop_speed,
		});

		missile_count += 2;
	} else if(power == "Advanced"){
		missiles["missile" + missile_count] = new Missile({
				left: $('user').getStyle('left').toInt() + 6,
				bottom: $('user').getStyle('bottom').toInt() + 34,
				id: "missile" + missile_count,
				speed: drop_speed,
		});

		missiles["missile" + missile_count + 1] = new Missile({
				left: $('user').getStyle('left').toInt() + 32,
				bottom: $('user').getStyle('bottom').toInt() + 84,
				id: "missile" + missile_count + 1,
				speed: drop_speed,
		});

		missiles["missile" + missile_count + 2] = new Missile({
				left: $('user').getStyle('left').toInt() + 70,
				bottom: $('user').getStyle('bottom').toInt() + 84,
				id: "missile" + missile_count + 2,
				speed: drop_speed,
		});

		missiles["missile" + missile_count + 3] = new Missile({
				left: $('user').getStyle('left').toInt() + 95,
				bottom: $('user').getStyle('bottom').toInt() + 34,
				id: "missile" + missile_count + 3,
				speed: drop_speed,
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
				var old_position = missiles_html.getStyle('bottom');
				//missiles_html.setStyle('bottom', missiles_class.moveUp());
				var new_position = missiles_class.moveUp();
				addEffect(missiles_html, 'up', old_position, new_position);
			}
		});
	});
}