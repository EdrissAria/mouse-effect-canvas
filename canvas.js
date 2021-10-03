var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var colorArray = [
	'#2c3e50',
	'#e74c6c',
	'#ecf0f1',
	'#3498db',
	'#2980b9'
]
var mouse = {
	x: undefined,
	y: undefined
}

var maxRadius = 40;

window.addEventListener('mousemove', (event) => {
	mouse.x = event.x;
	mouse.y = event.y;
})

window.addEventListener('resize', () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
})

function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.colors = colorArray[Math.floor(Math.random() * colorArray.length)];

	this.draw = function () {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.colors;
		c.fill();
	}

	this.update = function () {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		if (mouse.x - this.x < 50 && mouse.x - this.x > -50
			&& mouse.y - this.y < 50 && mouse.y - this.y > -50) {
			if (this.radius < maxRadius) {
				this.radius += 3;
			}

		} else if (this.radius > this.minRadius) {
			this.radius -= 1;
		}

		this.draw();
	}

}

var circleArray = [];

function init() {
	circleArray = []
	for (var i = 0; i < 3000; i++) {
		var radius = Math.random() * 4 + 1;
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = Math.random() * (innerHeight - radius * 2) + radius;
		var dx = (Math.random() - 0.5) * 3;
		var dy = (Math.random() - 0.5) * 3;
		circleArray.push(new Circle(x, y, dx, dy, radius));
	}
}

function animate() {
	requestAnimationFrame(animate)
	c.clearRect(0, 0, innerWidth, innerHeight);

	for (i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}
init();
animate();