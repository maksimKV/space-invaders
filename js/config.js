level = 1;
lives = 3;
score = 0;
power = 'Basic';
game_speed = 100;

// Resetting the config
function resetConfig(){
	switch(true){
		case(level == 2):
			drop_rate = 9000;
		break;

		case(level == 3):
			drop_rate = 8000;
			speed = 2;
		break;

		case(level == 4):
			drop_rate = 7000;
			drop_speed = 6;
		break;

		case(level == 5):
			drop_rate = 6000;
			speed = 3;
		break;

		case(level == 6):
			drop_rate = 5000;
			drop_speed = 7;
		break;

		case(level == 7):
			drop_rate = 4000;
		break;

		case(level == 8):
			drop_rate = 3000;
			drop_speed = 8;
			speed = 4;
		break;

		case(level == 9):
			drop_rate = 2000;
			drop_speed = 9;
		break;

		case(level == 10):
			drop_rate = 1000;
			drop_speed = 10;
			speed = 5;
		break;

		default:
			drop_rate = 10000;
			speed = 1;
			drop_speed = 5;
	}
}