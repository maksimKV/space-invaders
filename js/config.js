level = 1;
lives = 3;

switch(true){
	case(level == 2):
		drop_rate = 9000;
	break;

	case(level == 3):
		drop_rate = 8000;
		game_speed = 400;
	break;

	case(level == 4):
		drop_rate = 7000;
	break;

	case(level == 5):
		drop_rate = 6000;
		game_speed = 300;
	break;

	case(level == 6):
		drop_rate = 5000;
	break;

	case(level == 7):
		drop_rate = 4000;
		game_speed = 200;
	break;

	case(level == 8):
		drop_rate = 3000;
	break;

	case(level == 9):
		drop_rate = 2000;
	break;

	case(level == 10):
		drop_rate = 1000;
		game_speed = 100;
	break;

	default:
		drop_rate = 10000;
		game_speed = 500;
}