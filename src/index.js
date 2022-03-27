const canvas = document.querySelector('.block');
const counter = document.querySelector('.lives');
const body = document.querySelector('.body');
const point = document.querySelector('.points');
const button = document.querySelector('.button');
const wrapper = document.querySelector('.wrap');
const button_left = document.querySelector('.button_left');
const button_right = document.querySelector('.button_right');
const ctx = canvas.getContext('2d');
let platformHeight = 7;
let platformWidth = 60;
let platformX = (canvas.width - platformWidth) / 2;
let x = canvas.width / 2;
let y = canvas.height - 12;
let ballRadius = 5;
let dx = 1;
let dy = -1;
let count = 3;
let points = 0;

const platform = () => {
	ctx.beginPath();
	ctx.rect(
		platformX,
		canvas.height - platformHeight,
		platformWidth,
		platformHeight
	);
	ctx.fillStyle = '#0095DD';
	ctx.fill();
	ctx.closePath();
};

const ball = () => {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = '#0095DD';
	ctx.fill();
	ctx.closePath();
};

platform();
ball();

button.addEventListener('click', () => {
	let interval = setInterval(draw, 25);

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		platform();
		ball();
		if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
			dx = -dx;
		}
		if (
			y + dy > canvas.height - ballRadius - 3 &&
			platformX < x &&
			x < platformX + platformWidth
		) {
			points += 10;
			dy += 0.2;
			point.textContent = `Количество очков: ${points}`;
			dy = -dy;
		}
		if (y + dy < ballRadius) {
			dy = -dy;
		}
		if (y + dy > canvas.height - ballRadius) {
			count--;
			if (count <= 0) {
				counter.textContent = 'Вы проиграли! Игра окончена!';
				counter.classList = 'finish_lives';
				point.classList = 'finish_points';
				wrapper.classList = 'wrapper';
				setTimeout(clearInterval(interval));
				canvas.remove();
			}
			if (count > 0) {
				counter.textContent = `Количество жизней: ${count}`;
				platformX = (canvas.width - platformWidth) / 2;
				x = canvas.width / 2;
				y = canvas.height - platformHeight;
			}
		}
		x += dx;
		y += dy;
	}

	const transferPlatform = (e) => {
		if (e.key === 'ArrowRight') {
			if (platformX >= canvas.width - platformWidth) {
				platformX = canvas.width - platformWidth;
			} else {
				platformX += 7;
			}
		}
		if (e.key === 'ArrowLeft') {
			if (platformX === 0) {
				platformX = 0;
			} else {
				platformX -= 7;
			}
		}
	};

	button_left.addEventListener('click', () => {
		if (platformX === 0) {
			platformX = 0;
		} else {
			platformX -= 7;
		}
	});
	button_right.addEventListener('click', () => {
		if (platformX >= canvas.width - platformWidth) {
			platformX = canvas.width - platformWidth;
		} else {
			platformX += 7;
		}
	});
	body.addEventListener('keydown', transferPlatform);
});
