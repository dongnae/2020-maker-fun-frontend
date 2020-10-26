let originalPermutation = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let shuffledPermutation = [9, 2, 3, 6, 8, 1, 5, 7, 10, 4];

const swap = (a, b) => {
	let t = shuffledPermutation[b];
	shuffledPermutation[b] = shuffledPermutation[a];
	shuffledPermutation[a] = t;
};

const calc = () => {
	let ret = 0;
	for (let i = 0; i < originalPermutation.length; i++) ret += Math.abs(originalPermutation[i] - shuffledPermutation[i]);
	document.querySelector("#diff").innerHTML = ret.toString();
};

let prevClick = null;

const onClick = btnIndex => () => {
	if (prevClick === null) {
		prevClick = btnIndex;
		document.querySelector(`#btn${btnIndex}`).classList.add('clicked');
	} else if (prevClick === btnIndex) {
		prevClick = null;
		document.querySelector(`#btn${btnIndex}`).classList.remove('clicked');
	} else {
		swap(prevClick, btnIndex);
		calc();

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
}

document.addEventListener("DOMContentLoaded", () => {
	write();
});
