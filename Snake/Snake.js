const game = document.getElementById("Game");
let legacy = false;
let gameSpeed = 120;
let main;
Main();

function Main(){
    document.getElementById("Apple").innerHTML = '<div style="left:60vh;top:40vh"></div>';
    let applePos = [12, 8];
    let playerPos = [3, 8];
    let playerTail = [[2, 8], [3, 8]];
    let paused = false;
    let inp = 39;
    let nextInp = 39;
    let queuedInp = 0;
    let score = 0;

    main = setInterval(MainLoop, gameSpeed);
    function MainLoop(){
        if (paused) {return;}

        if (inp != nextInp){
            inp = nextInp;
            if (queuedInp != 0){
                nextInp = queuedInp;
                queuedInp = 0;
            }
        }
        
        if (playerPos[0] == applePos[0] && playerPos[1] == applePos[1]){
            score += Math.round(144000000 / (gameSpeed * gameSpeed)) / 100;
            document.getElementById("Score").innerHTML = "Score: " + score;
            playerTail.splice(0, 0, playerTail[0]);
            CreateApple();
        }
        

        let snake = document.getElementById("Snake");
        snake.innerHTML = "<div class='SP' id='ah' style='left:"+playerPos[0]*5+"vh;top:"+playerPos[1]*5+"vh;'></div>"

        if (legacy){
            document.getElementById("ah").style.borderRadius = "50%";
            for (i = 0; i < playerTail.length - 1; i++){
                pos = playerTail[i];
                snake.innerHTML += "<div class='SP' id='a"+i+"' style='left:"+pos[0]*5+"vh;top:"+pos[1]*5+"vh;border-radius:50%;'></div>"
            }
        }
        else{
            for (i = 0; i < playerTail.length; i++){
                pos = playerTail[i];
                snake.innerHTML += "<div class='SP' id='a"+i+"' style='left:"+pos[0]*5+"vh;top:"+pos[1]*5+"vh;'></div>"
            }
        }

        UpdatePos();
        UpdateTail();

        if (playerPos[0] < 0 || playerPos[0] > 16 || playerPos[1] < 0 || playerPos[1] > 16){
            clearInterval(main);
            Main();
            return;
        }
        for (i = 1; i < playerTail.length - 1; i++){
            var pos = playerTail[i];
            if (pos[0] == playerPos[0] && pos[1] == playerPos[1]){
                clearInterval(main);
                Main();
                return;
            }
        }

        $("#ah").animate({
            left: playerPos[0] * 5 + "vh",
            top: playerPos[1] * 5 + "vh"}, gameSpeed, "linear");
        if (legacy){
            for (i = 0; i < playerTail.length; i++){
                var pos = playerTail[i];
                $("#a"+i).animate({
                    left: pos[0] * 5 + "vh",
                    top: pos[1] * 5 + "vh" }, gameSpeed, "linear");
            }
        }
        else{
            $("#a0").animate({
                left: playerTail[0][0] * 5 + "vh",
                top: playerTail[0][1] * 5 + "vh"}, gameSpeed, "linear");
        }
    }

    function CreateApple(){
        let x = Math.floor(Math.random() * 17);
        let y = Math.floor(Math.random() * 17);
        applePos = [x, y];
        document.getElementById("Apple").innerHTML = "<div style='left:"+x*5+"vh;top:"+y*5+"vh;'></div>"
    }

    document.addEventListener("keydown", KeyDown);
    function KeyDown(e){
        switch(e.keyCode){
            case 37:
                if (inp != 39) { nextInp = 37; }
                else if (nextInp != 39) { queuedInp = 37; }
                break;
            case 38:
                if (inp != 40) { nextInp = 38; }
                else if (nextInp != 40) { queuedInp = 38; }
                break;
            case 39:
                if (inp != 37) { nextInp = 39; }
                else if (nextInp != 37) { queuedInp = 39; }
                break;
            case 40:
                if (inp != 38) { nextInp = 40; }
                else if (nextInp != 38) { queuedInp = 40; }
                break;
            case 27: //escape
                paused = !paused;
                break;
            case 190: //.
                if (gameSpeed < 80) break; 
                gameSpeed -= 5;
                document.getElementById("Speed").innerHTML = "Speed: " + Math.round(120000 / gameSpeed) / 100;
                clearInterval(main);
                main = setInterval(MainLoop, gameSpeed);
                break;
            case 188: //,
                if (gameSpeed > 250) break; 
                gameSpeed += 5;
                document.getElementById("Speed").innerHTML = "Speed: " + Math.round(120000 / gameSpeed) / 100;
                clearInterval(main);
                main = setInterval(MainLoop, gameSpeed);
                break;
            case 76: //l
                legacy = !legacy;
                break;
        }
    }

    function UpdatePos(){
        switch(inp){
            case 37: //left
                playerPos[0] -= 1;
                break;
            case 38: //up
                playerPos[1] -= 1;
                break;
            case 39: //right
                playerPos[0] += 1;
                break;
            case 40: //down
                playerPos[1] += 1;
                break;
        }
    }

    function UpdateTail(){
        for (i = 0; i < playerTail.length - 1; i++){
            playerTail[i] = playerTail[i + 1].slice(0);
        }
        playerTail[playerTail.length - 1] = playerPos.slice(0);
    }
}