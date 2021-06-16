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

//Arctx / ctxirctxle
//ctx.arctx(x: Int, y: Int, r: Int, startingAngle: Float, endAngle: Float, drawctxounterctxloctxkwise: Bool (false));
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

function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;

	this.draw = function () {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.strokeStyle = "blue";
		ctx.stroke();
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

	this.draw();
	}
}

let circleArray = [];

for (var i = 0; i < 100; i++) {
	let radius = 30;
	let x = Math.random() * (innerWidth - radius * 2) + radius;
	let y = Math.random() * (innerHeight - radius * 2) + radius;
	let dx = (Math.random() - 0.5) * 10;
	let dy = (Math.random() - 0.5) * 10;
	circleArray.push(new Circle(x, y, dx, dy, radius));
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