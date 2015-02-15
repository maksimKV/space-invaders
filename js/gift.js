var Gift = new Class({
	Implements: [Options],
	options: {
		left: 0,
		bottom: 0,
		id: 'live',
		image: './img/heart.png',
		type: 'live',
		speed: 5,
	},

	initialize : function(options) {
		this.setOptions(options);

		var gift_html = new Element('img', {
			'class': 'gifts',
			'id': this.options.id,
			src: this.options.image,
			styles: {
				position: "absolute",
				display: "block",
				bottom: this.options.bottom,
				left: this.options.left,
				width: 20,
				height: 20,
			},
		});

		gift_html.inject(game);
	},

	moveDown: function(){
		return this.options.bottom -= this.options.speed;
	},
});