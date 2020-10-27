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

let getCoin = 0;
let length = 20;
let split = map.split("\n");
for (let i = 0; i < split.length; i++) {
    mp[i] = [];
    for (let j = 0; j < length; j++) {
        mp[i][j] = split[i][j];
    }
}
let x = 1, y = 1;

function drawMap() {    // 맵 화면에 그리기
    document.querySelector('#screen').innerHTML = "<br><br>";
    for(let i=0 ; i<length ; i++) {
        for(let j=0 ; j<length ; j++) {
            if(mp[i][j] === '9') document.querySelector('#screen').innerHTML += "<img src = \"wall.png\">";
            else if(mp[i][j] === '0') document.querySelector('#screen').innerHTML += "<img src = \"space.png\">";
            else if(mp[i][j] === '1') document.querySelector('#screen').innerHTML += "<img src = \"coin.png\">";
            else if(mp[i][j] === '5') document.querySelector('#screen').innerHTML += "<img src = \"character.png\">";
        }
        document.querySelector('#screen').innerHTML += "<br>";
    }
    document.querySelector('#screen').innerHTML += `
    <br>현재 먹은 동전 수 : ${getCoin}
    `;
}

document.onkeydown = (e) => {
    let key = e.key;
    if(key === "ArrowDown") {
        if(mp[x+1][y] === '0' || mp[x+1][y] === '1') {
            if(mp[x+1][y] === "1") getCoin++;
            mp[x][y] = '0';
            x++;
            mp[x][y] = '5';
            drawMap();
            console.log("함수실행");
            console.log(x+" "+y);
        }
    }else if(key === "ArrowLeft") {
        if(mp[x][y-1] === '0' || mp[x][y-1] === '1') {
            if(mp[x][y-1] === "1") getCoin++;
            mp[x][y] = '0';
            y--;
            mp[x][y] = '5';
            drawMap();
            console.log("함수실행");
            console.log(x+" "+y);
        }
    }else if(key === "ArrowRight") {
        if(mp[x][y+1] === '0' || mp[x][y+1] === '1') {
            if(mp[x][y+1] === "1") getCoin++;
            mp[x][y] = '0';
            y++;
            mp[x][y] = '5';
            drawMap();
            console.log("함수실행");
            console.log(x+" "+y);
        }
    }
}
