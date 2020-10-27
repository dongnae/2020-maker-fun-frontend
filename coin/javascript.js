let arr = create2DArray(100, 100);

for(let i=0 ; i<20 ; i++) {
    for(let j=0 ; j<20 ; j++) {
        if(i === 0 || j === 0 || i === 19 || j === 19) arr[i][j] = 9;
        if(i%2 === 0 || j%2 === 0) arr[i][j] = 1;
    }
}

function clickStart() {
    document.querySelector('#screen').innerHTML += "<br><br>";
    for(let i=0 ; i<20 ; i++) {
        for(let j=0 ; j<20 ; j++) {
            if(i === 1 && j === 1){
                document.querySelector('#screen').innerHTML += "<img src = \"charcter.png\">";
                continue;
            }
            if(i === 0 || j === 0 || i === 19 || j === 19) {
                document.querySelector('#screen').innerHTML += "<img src = \"wall.png\">";
                continue;
            }else {
                document.querySelector('#screen').innerHTML += "<img src = \"space.png\">";
            }
        }
        document.querySelector('#screen').innerHTML += "<br>";
    }
}