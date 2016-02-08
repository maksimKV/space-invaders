var Ship = new Class ({
	Implements: [Options],
	options: {
		image: "./img/user.png",
		height: 80,
		width: 104,
		left: 460,
		bottom: 0,
		id: "user",
		speed: 5,
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
		return this.options.left -= this.options.speed;
	},

	moveRight: function(){
		return this.options.left += this.options.speed;
	},
});

var Alien = new Class({
	Extends: Ship,
	Implements: [Options],
	options: {
		image: "./img/alien-2.png",
		height: 60,
		width: 60,
		left: 0,
		bottom: 0,
		id: "scout",
		points: 12,
		drop_speed: 5,
		speed: 1,
	},

	initialize : function(options) {
		this.setOptions(options);

		var ship_image = new Element('img', {
			src: this.options.image,
			'class': 'alien',
			id: this.options.id,
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

	moveDown: function(){
		return this.options.bottom -= this.options.drop_speed;
	},
})