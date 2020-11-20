let ret;

const init = async () => {
	ret = (await axios.get(`${location.origin}/rank/`)).data;
	ret = ret.sort((a, b) => a.coin < b.coin);
	for (let i = 0; i < ret.length; i++) ret[i].coinRank = i;
	ret = ret.sort((a, b) => a.permutation < b.permutation);
	for (let i = 0; i < ret.length; i++) ret[i].permRank = i;
	console.log(ret);
};

btn1 = function () {
	ret.sort(function (a, b) {
		return (a.coinRank + a.permRank) > (b.coinRank + b.permRank);
	})
	document.getElementById('board').innerHTML = `<table border="1" 
                    style="text-align: center;font-size: 60%;height: 100%;width: 100%;border: black 1px solid; table-layout: fixed">
                    <tr>
                      <th>ID</th>
                      <th>수열</th>
                      <th>동전</th>
                    </tr>
                    <tbody id="table"></tbody>
                    </table>`;
	let t = document.getElementById('table');
	for (let i = 0; i < ret.length; i++) {
		let row = `<tr>
                   <td>${ret[i].email}</td>
                   <td>${ret[i].permutation === 999999999999999 ? "-" : ret[i].permutation}</td>
                   <td>${ret[i].coin}</td>
                   </tr>`;
		t.innerHTML += row;
	}
}
btn2 = function () {
	ret = ret.sort(function (a, b) {
		return (b["coin"] - a["coin"]);
	})
	document.getElementById('board').innerHTML = `<table border="1" 
                    style="text-align: center;font-size: 60%;height: 100%;width: 100%;border: black 1px solid; table-layout: fixed">
                    <tr>
                      <th>ID</th>
                      <th>SCORE</th>
                    </tr>
                    <tbody id="table"></tbody>
                    </table>`;
	let t = document.getElementById('table');
	for (let i = 0; i < ret.length; i++) {
		let row = `<tr>
                   <td>${ret[i].email}</td>
                   <td>${ret[i].coin}</td>
                   </tr>`;
		t.innerHTML += row;
	}
}
btn3 = function () {
	ret = ret.sort(function (a, b) {
		return a["permutation"] - b["permutation"];
	})
	document.getElementById('board').innerHTML = `<table border="1" 
                    style="text-align: center;font-size: 60%;height: 100%;width: 100%;border: black 1px solid; table-layout: fixed">
                    <tr>
                      <th>ID</th>
                      <th>SCORE</th>
                    </tr>
                    <tbody id="table"></tbody>
                    </table>`;
	let t = document.getElementById('table');
	for (let i = 0; i < ret.length; i++) {
		let row = `<tr>
                   <td>${ret[i].email}</td>
                   <td>${ret[i].permutation === 999999999999999 ? "-" : ret[i].permutation}</td>
                   </tr>`;
		t.innerHTML += row;
	}
}