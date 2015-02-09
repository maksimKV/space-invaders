var Bomb = new Class({
	Implements: [Options],
	options: {
		left: 0,
		bottom: 0,
	},

	initialize : function(options) {
		this.setOptions(options);

		var bomb_html = new Element('div', {
			'class': 'bomb',
			styles: {
				position: "absolute",
				display: "block",
				bottom: this.options.bottom,
				left: this.options.left,
				width: 2,
				height: 10,
				'background-color': '#F00',
			},
		});

		bomb_html.inject(game);
	},
});

var Missile = new Class({
	Extends: Bomb,
	Implements: [Options],
	options: {
		left: 0,
		bottom: 0,
	},

	initialize : function(options) {
		this.setOptions(options);

		var missile_html = new Element('div', {
			'class': 'missile',
			styles: {
				position: "absolute",
				display: "block",
				bottom: this.options.bottom,
				left: this.options.left,
				width: 4,
				height: 10,
				'background-color': '#00F',
			},
		});

		missile_html.inject(game);
	},

	moveDown: function(){
		return this.options.bottom -= 5;
	},
});