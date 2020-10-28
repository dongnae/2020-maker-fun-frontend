// 맵 설정 | 벽 = 9 | 플레이어 위치 기본값 (1,1)  = 5 | 동전 = 1 | 빈칸 = 0
const WALL = "U", COIN = "D", BLANK = ".", PLAYER = '5';
let mp = [];

let isGame = true;
let coinCount = 0;
let x = 0, y = 0, length;

const generateMap = mapString => {
	let split = mapString.split("\n");
	length = split.length;

	mp = [];

	for (let i = 0; i < length; i++) {
		mp[i] = [];
		for (let j = 0; j < length; j++) {
			mp[i][j] = split[i][j];
		}
	}
	
	if (mp[x][y] === COIN) {
		coinCount++;
	}
	mp[x][y] = PLAYER;
};

const fetchFromServer = async () => {
	let mapData = (await axios.post(`${location.origin}/api/game/coin/map`, '', {
		json: true
	})).data.result;
	generateMap(mapData);
};

const init = async() => {
	command = "";
	coinCount = x = y = 0;
	isGame = true;

	await fetchFromServer();

	let screen = document.querySelector("#screen");
	screen.innerHTML = "";
	screen.style.width = `${length * 20}px`;

	document.querySelector("#score").innerHTML = `획득한 동전 수 : 0`;

	for (let i = 0; i < length; i++) {
		let list = document.createElement('div');

		for (let j = 0; j < length; j++) {
			list.innerHTML += getCell(i, j);
		}
		screen.appendChild(list);
	}
};

const getCell = (i, j) => {
	let type = mp[i][j];
	i = (i | 0) < 10 ? `0${i}` : i;
	j = (j | 0) < 10 ? `0${j}` : j;
	if (type === WALL) return `<svg id="c${i}${j}" width="20px" height="20px"><rect x="0" y="0" width="20" height="20" fill="#000000"></rect></svg>`;
	else if (type === BLANK) return `<svg id="c${i}${j}" width="20px" height="20px"><rect x="0" y="0" width="20" height="20" fill="#ffffff"></rect></svg>`;
	else if (type === COIN) return `<svg id="c${i}${j}" width="20px" height="20px"><rect x="0" y="0" width="20" height="20" fill="#ffff00"></rect></svg>`;
	else if (type === PLAYER) return `<svg id="c${i}${j}" width="20px" height="20px"><rect x="0" y="0" width="20" height="20" fill="#ff0000"></rect></svg>`;
	else throw new Error("out of range");
}

const updateCell = (i, j) => {
	let x = (i | 0) < 10 ? `0${i}` : i;
	let y = (j | 0) < 10 ? `0${j}` : j;

	document.querySelector(`#c${x}${y}`).outerHTML = getCell(i, j);
};

let command = "";
const submit = async () => {
	let maximumRecord = (await axios.post(`${location.origin}/api/game/coin/submit`, JSON.stringify({
		path: command
	}), {
		json: true,
		headers: {
			'Content-Type': 'application/json'
		}
	})).data.result;

	let ret = confirm(`최고 기록 : ${maximumRecord}\n현재 기록 : ${coinCount}\n다시 플레이하겠습니까?`);
	if (ret) {
		await init();
	}
};

document.addEventListener('DOMContentLoaded', async () => {
	init();
});

window.addEventListener('keydown', e => {
	if (isGame) {
		let key = e.key;
		if (key === "ArrowDown") {
			if (x + 1 >= length) return;
			if (mp[x + 1][y] === BLANK || mp[x + 1][y] === COIN) {
				if (mp[x + 1][y] === COIN) coinCount++;
				mp[x][y] = BLANK;
				updateCell(x, y);

				mp[++x][y] = PLAYER;
				updateCell(x, y);

				command += "D";
			}
		} else if (key === "ArrowLeft") {
			if (y <= 0) return;
			if (mp[x][y - 1] === BLANK || mp[x][y - 1] === COIN) {
				if (mp[x][y - 1] === COIN) coinCount++;
				mp[x][y] = BLANK;
				updateCell(x, y);

				mp[x][--y] = PLAYER;
				updateCell(x, y);

				command += "L";
			}
		} else if (key === "ArrowRight") {
			if (y + 1 >= length) return;
			if (mp[x][y + 1] === BLANK || mp[x][y + 1] === COIN) {
				if (mp[x][y + 1] === COIN) coinCount++;
				mp[x][y] = BLANK;
				updateCell(x, y);

				mp[x][++y] = PLAYER;
				updateCell(x, y);

				command += "R";
			}
		}
		document.querySelector("#score").innerHTML = `획득한 동전 수 : ${coinCount}`;
		if (x === length - 1 && y === length - 1) {
			document.querySelector('#info').style.display = "block";
			isGame = false;
		}
	}
});
