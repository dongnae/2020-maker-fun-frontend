// 맵 설정 | 벽 = 9 | 플레이어 위치 기본값 (1,1)  = 5 | 동전 = 1 | 빈칸 = 0
let mp = [];
let map = `99999999999999999999
95000000000000000009
90000000000000900009
90000000000000000009
90001000000000000009
90000000000000000009
90000000009001000009
90000010090000000009
90000000000000000009
90000000000000000009
90000090000100000009
90000000000000000009
90000000100900000009
90000000000000000009
90000000000000000009
90000100900000000009
90000000000000000009
90000000000000000009
90000000000000000009
99999999999999999999`;

let isGame = true;
let coinCount = 0;
let length = 20;
let split = map.split("\n");
for (let i = 0; i < split.length; i++) {
	mp[i] = [];
	for (let j = 0; j < length; j++) {
		mp[i][j] = split[i][j];
	}
}
let x = 1, y = 1;

const getCell = (i, j) => {
	let type = mp[i][j];
	i = (i | 0) < 10 ? `0${i}` : i;
	j = (j | 0) < 10 ? `0${j}` : j;
	if (type === '9') return `<svg id="c${i}${j}" width="20px" height="20px"><rect x="0" y="0" width="20" height="20" fill="#000000"></rect></svg>`;
	else if (type === '0') return `<svg id="c${i}${j}" width="20px" height="20px"><rect x="0" y="0" width="20" height="20" fill="#ffffff"></rect></svg>`;
	else if (type === '1') return `<svg id="c${i}${j}" width="20px" height="20px"><rect x="0" y="0" width="20" height="20" fill="#ffff00"></rect></svg>`;
	else if (type === '5') return `<svg id="c${i}${j}" width="20px" height="20px"><rect x="0" y="0" width="20" height="20" fill="#ff0000"></rect></svg>`;
	else throw new Error("out of range");
}

const updateCell = (i, j) => {
	let x = (i | 0) < 10 ? `0${i}` : i;
	let y = (j | 0) < 10 ? `0${j}` : j;

	document.querySelector(`#c${x}${y}`).outerHTML = getCell(i, j);
}

document.addEventListener('DOMContentLoaded', () => {
	let screen = document.querySelector("#screen");
	screen.innerHTML = "";

	for (let i = 0; i < length; i++) {
		let list = document.createElement('div');

		for (let j = 0; j < length; j++) {
			list.innerHTML += getCell(i, j);
		}
		screen.appendChild(list);
	}
});

window.addEventListener('keydown', e => {
	if (isGame) {
		let key = e.key;
		if (key === "ArrowDown") {
			if (mp[x + 1][y] === '0' || mp[x + 1][y] === '1') {
				if (mp[x + 1][y] === "1") coinCount++;
				mp[x][y] = '0';
				updateCell(x, y);

				mp[++x][y] = '5';
				updateCell(x, y);
			}
		} else if (key === "ArrowLeft") {
			if (mp[x][y - 1] === '0' || mp[x][y - 1] === '1') {
				if (mp[x][y - 1] === "1") coinCount++;
				mp[x][y] = '0';
				updateCell(x, y);

				mp[x][--y] = '5';
				updateCell(x, y);
			}
		} else if (key === "ArrowRight") {
			if (mp[x][y + 1] === '0' || mp[x][y + 1] === '1') {
				if (mp[x][y + 1] === "1") coinCount++;
				mp[x][y] = '0';
				updateCell(x, y);

				mp[x][++y] = '5';
				updateCell(x, y);
			}
		}
		document.querySelector("#score").innerHTML = `획득한 동전 수 : ${coinCount}`;
		if (x === length - 2 && y === length - 2) {
			document.querySelector('#screen').innerHTML += "<h1>끝</h1>";
			isGame = false;
		}
	}
});
