let data = [
    {'name' : 'aaa', 'coin' : 70, 'permutation' : 30},
    {'name' : 'bbb', 'coin' : 20, 'permutation' : 70},
    {'name' : 'ccc', 'coin' : 40, 'permutation' : 40},
    {'name' : 'ddd', 'coin' : 20, 'permutation' : 50},
    {'name' : 'eee', 'coin' : 50, 'permutation' : 10},
]

btn1 = function() {
    data.sort(function(a, b) {
        return (b["coin"]+b["permutation"])-(a["coin"]+a["permutation"]);
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
    for(let i=0 ; i<data.length ; i++) {
        let row = `<tr>
                   <td>${data[i].name}</td>
                   <td>${data[i].coin + data[i].permutation}</td>
                   </tr>`;
        t.innerHTML += row;
    }
}
btn2 = function() {
    data.sort(function(a, b) {
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
    for(let i=0 ; i<data.length ; i++) {
        let row = `<tr>
                   <td>${data[i].name}</td>
                   <td>${data[i].coin}</td>
                   </tr>`;
        t.innerHTML += row;
    }
}
btn3 = function() {
    data.sort(function(a, b) {
        return b["permutation"] - a["permutation"];
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
    for(let i=0 ; i<data.length ; i++) {
        let row = `<tr>
                   <td>${data[i].name}</td>
                   <td>${data[i].permutation}</td>
                   </tr>`;
        t.innerHTML += row;
    }
}