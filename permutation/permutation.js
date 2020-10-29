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

	document.querySelector("#diff").innerHTML = res.result;
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
		let child = document.createElement("button");
		child.classList.add("btn");
		child.id = `btn${i}`;
		child.innerText = shuffledPermutation[i].toString();
		child.onclick = onClick(i);
		list.appendChild(child);
	}

	calc();
};

document.addEventListener("DOMContentLoaded", () => {
	setTimeout(() => intro.marginLeft = `${after}px`, 500);
	setTimeout(() => intro.margin = "0 auto", 1000);
	write();
});
