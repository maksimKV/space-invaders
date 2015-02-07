var Ship = new Class ({
	Implements: [Options],
	options: {
		image: "./img/user.png",
		height: 80,
		width: 104,
		left: 460,
		bottom: 0,
		id: "user",
	},

	initialize : function(options) {
		this.setOptions(options);

		var ship_image = new Element('img', {
			src: this.options.image,
			'id': this.options.id,
			styles: {
				position: "absolute",
				display: "block",
				bottom: this.options.bottom,
				left: this.options.left,
				width: this.options.width,
				height: this.options.height,
			},
		});

		ship_image.inject(game);
	},

	moveLeft: function(){
		return this.options.left = this.options.left - 5;
	},

	moveRight: function(){
		return this.options.left = this.options.left + 5;
	},

	fireMissile: function(){

	},
});

var user = new Ship;

//$('game').setAttribute("tabindex", 0);

// The movement functionality for the user ship
$('game').addEvent('keydown', function(event){
	if(event.key == 'left' && user.options.left > 0){
		$('user').setStyle('left', user.moveLeft());
	} else if(event.key == 'right' && user.options.left < 1000){
		$('user').setStyle('left', user.moveRight());
	}
	return false;
});