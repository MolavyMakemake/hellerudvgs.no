const board = document.getElementById("Board");

for (i = 0; i < 17; i++){
    for (j = 0; j < 17; j++){
        if ((i + j) % 2 == 0){
            board.innerHTML += "<div class='Checker' style='left:"+i*5+"vh;top:"+j*5+"vh;'></div>"
        }
    }
}