let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//ctx = context
let ctx = canvas.getContext('2d');

//rectangle
// ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
// //ctx.fillRectxt(x, y, width, height);
// ctx.fillRect(100, 100, 100, 100);
// ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
// ctx.fillRect(400, 100, 100, 100);
// ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
// ctx.fillRect(300, 400, 100, 100);

//line
// ctx.beginPath();
// //ctx.moveTo(x, y);
// ctx.moveTo(50, 300);
// ctx.lineTo(300, 100);
// ctx.lineTo(400,300);
// ctx.strokeStyle = "#fa34a3"
// ctx.stroke();

//Arc / Circle
//ctx.arc(x: Int, y: Int, r: Int, startingAngle: Float, endAngle: Float, drawcounterclockwise: Bool (false));
// for (var i = 0; i < 3; i++) {
// 	let colors = ["red", "blue", "green"];
// 	let x = Math.random() * window.innerWidth;
// 	let y = Math.random() * window.innerHeight;
// 	ctx.beginPath();
// 	ctx.arc(x, y, 30, 0, Math.PI * 2, false);
// 	ctx.strokeStyle = randomColor(colors);
// 	ctx.stroke();
// }

// //Used to make colors random in above for loop
// function randomColor(colors) {
// 	return colors[Math.floor(Math.random() * colors.length)];
// }

//randomising spawn locations
// let x = Math.random() * window.innerWidth;
// let y = Math.random() * window.innerHeight;
// let dx = (Math.random() - 0.5) * 10;
// let dy = (Math.random() - 0.5) * 10;
// let radius = 30;

let mouse = {
	x: undefined,
	y: undefined,
}

let maxRadius = 40;
// let minRadius = 2;

let colorArray = [
	'#2F2D38',
	'#BBF2D8',
	'#418267',
	'#E79F86',
	'#A63737'	
];

//Event listeners
window.addEventListener("mousemove", function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
});

window.addEventListener("resize", function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
});

class Circle {
	constructor(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

	this.draw = function () {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
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

	//interactivity
	if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
		if (this.radius < maxRadius) {
			this.radius += 1;
		}
	} else if (this.radius > this.minRadius) {
		this.radius -= 1;
	}

	this.draw();
		}
	}
}

let circleArray = [];

function init() {

	circleArray = [];
	for (var i = 0; i < 800; i++) {
		let radius = (Math.random() * 3 + 1);
		let x = Math.random() * (innerWidth - radius * 2) + radius;
		let y = Math.random() * (innerHeight - radius * 2) + radius;
		let dx = (Math.random() - 0.5) * 2;
		let dy = (Math.random() - 0.5) * 2;
		circleArray.push(new Circle(x, y, dx, dy, radius));
	}
}

function animate() {
	requestAnimationFrame(animate);
	//clears entire canvas
	ctx.clearRect(0, 0, innerWidth, innerHeight);

	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}

animate();