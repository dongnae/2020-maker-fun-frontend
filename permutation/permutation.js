let shuffledPermutation = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const calc = async () => {
	let res = (await axios.post(`${location.origin}/api/game/perm/diff`, JSON.stringify({
		permutation: shuffledPermutation
	}), {
		json: true,
		headers: {
			'Content-Type': 'application/json'
		}
	})).data;

	if (res.status) {
		alert("오류가 발생했습니다.\n개발자에게 알려주세요.");
		return;
	}

	if (!res.result.diff) {
		document.querySelector(".submit-btn").classList.add('active');
	}

	document.querySelector("#diff").innerHTML = res.result.diff;
	document.querySelector("#move").innerHTML = res.result.cnt;
};

const submit = async () => {
	if (document.querySelector(".submit-btn").classList.contains("active")) {
		let res = (await axios.post(`${location.origin}/api/game/perm/submit`, JSON.stringify({
			permutation: shuffledPermutation
		}), {
			json: true,
			headers: {
				'Content-Type': 'application/json'
			}
		})).data;

		if (res.status) {
			alert("오류가 발생했습니다.\n개발자에게 알려주세요.");
			return;
		}

		let ret = confirm(`게임을 종료하였습니다.\n현재 기록 : ${res.result.cnt}\n최고 기록 : ${res.result.best} (이동 횟수)`);
		if (ret) {
			shuffledPermutation = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			write();
		}
	}
};

const swap = (a, b) => {
	let t = shuffledPermutation[b];
	shuffledPermutation[b] = shuffledPermutation[a];
	shuffledPermutation[a] = t;
};

let prevClick = null;

const onClick = btnIndex => async () => {
	if (prevClick === null) {
		prevClick = btnIndex;
		document.querySelector(`#btn${btnIndex}`).classList.add('clicked');
	} else if (prevClick === btnIndex) {
		prevClick = null;
		document.querySelector(`#btn${btnIndex}`).classList.remove('clicked');
	} else {
		swap(prevClick, btnIndex);
		await calc();

		document.querySelector(`#btn${prevClick}`).classList.remove('clicked');
		prevClick = null;

		write();
	}

	return false;
};

const write = () => {
	let list = document.querySelector("#permutation");
	list.innerHTML = "";

	for (let i = 0; i < shuffledPermutation.length; i++) {
		let child = document.createElement("div");
		child.classList.add("box");
		child.id = `btn${i}`;
		child.innerHTML = `<p class='num'>${shuffledPermutation[i].toString()}</p>`;
		child.onclick = onClick(i);
		list.appendChild(child);
	}

	calc();
};

const setContainerSize = () => {
	document.querySelector(".container").style.height = (window.innerHeight - parseInt(getComputedStyle(document.querySelector(".title").nextElementSibling).height)) + "px";
};

window.addEventListener('resize', () => setContainerSize());

document.addEventListener("DOMContentLoaded", () => {
	setContainerSize();
	write();
});
