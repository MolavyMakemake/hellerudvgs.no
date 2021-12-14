let boxList = []
let crossBoxes = []
let naughtBoxes = []
let playerTurn = true
let gameLive = false
let winChecking = false
let windex = 0;
let winningSpaces = []
let loseSpaces = []
let abc = ["OOOOOOOOH", "DAMN, THAT IS BAD!", "Nice one!", "Shit..."]
let typing = false
let wins = undefined




function tictoeInit(){
    boxList = []
    crossBoxes = []
    naughtBoxes = []
    playerTurn = true
    gameLive = false
    winChecking = false
    windex = 0;
    winningSpaces = []
    loseSpaces = []
    wins = undefined
    abc = ["Oooooooh", "DAMN, THAT IS BAD!", "Nice one!", "Shit..."]
    typing = false

    //document.getElementById("textbox").style.textAlign="right";
    var ticcon = document.createElement("div");
    ticcon.id = "tacbody";
    ticcon.className = "tacbody";
    var taccon = document.createElement("div");
    taccon.id = "taccon";
    taccon.className = "taccon";
    taccon.appendChild(ticcon)
    var gametext = document.createElement("div");
    gametext.id = "gametextbox"
    gametext.className = "gametextbox"
    taccon.appendChild(gametext)
    
    for(i=0;i<9;i++){
        n = i+1;
        var toc = document.createElement("div");
        toc.id = n
        ticcon.appendChild(toc)
    }
    document.getElementById("narrator").appendChild(taccon)


    gameLive = true
    for(j=0; j < 9; j++){
        var boxx = document.getElementById(j+1);
        boxList.push(boxx);
    }
    for(l=0; l<boxList.length;l++){
        var boxx = document.getElementById(l+1);
        boxx.addEventListener("click",playerClick)
    }
}

function playerClick(){
    if(playerTurn && gameLive && !typing){
        document.getElementById("gametextbox").innerHTML="";
        boxList.splice(boxList.indexOf(this), 1)
        crossBoxes.push(this.id)

        this.removeEventListener("click",playerClick)

        this.className = "cross";

        playerTurn = false
        winCheck(crossBoxes)
        letterIndex=0
        clearInterval(eyeInterval);
        clearInterval(textInterval);
        var rand = Math.floor(Math.random()*abc.length);
        if(boxList.length!=0){
        textInterval = setInterval(function(){textgen(abc[rand])},20);
        }
        setTimeout(() => {
            if(boxList.length!=0 && gameLive){
                var ra = Math.floor(Math.random()*boxList.length)
                var r = boxList[ra]
                winChecking=true
                loseCheck()
                if(winningSpaces.length>0){
                    r = winningSpaces[0]
                    ra = boxList.indexOf(r)
                    winningSpaces = [];
                }else if(loseSpaces.length>0){
                    r=loseSpaces[0]
                    ra = boxList.indexOf(r)
                    loseSpaces = [];
                }

                r.className = "naught";
                r.removeEventListener("click",playerClick)
                boxList.splice(ra,1)
                naughtBoxes.push(r.id)
                playerTurn = true
                winCheck(naughtBoxes)
            }else if (wins==undefined){
                letterIndex=0
                clearInterval(eyeInterval);
                clearInterval(textInterval);
                document.getElementById("gametextbox").innerHTML="";
                textInterval = setInterval(function(){textgen('Draw! Let\'s try again!')},20);

                window.addEventListener("click",draw)
            }
        }, 1000);
    }
}

function winCheck(x){
        if(x.includes('1')){
            if(x.includes('2')){
                if(x.includes('3')){
                    win(x)
            }
        } else if(x.includes('4')){
                if(x.includes('7')){
                    win(x)
                }
            }
        }if(x.includes('5')){
            if(x.includes('1')){
                if(x.includes('9')){
                    win(x)
                }

            }if(x.includes('2')){
                if(x.includes('8')){
                    win(x)
                }

            }if(x.includes('3')){
                if(x.includes('7')){
                    win(x)
                }

            }if(x.includes('4')){
                if(x.includes('6')){
                    win(x)
                }
            }
        }if(x.includes('9')){
            if(x.includes('8')){
                if(x.includes('7')){
                    win(x)
                }
            }if(x.includes('6')){
                if(x.includes('3')){
                    win(x)
                }
            }
        }
}

function win(y){
    if(!winChecking){
        if(y==crossBoxes){
            //console.log("crossBoxes "+"won")
            wins=true
            letterIndex=0;
            clearInterval(eyeInterval);
            clearInterval(textInterval);
            document.getElementById("gametextbox").innerHTML="";
            textInterval = setInterval(function(){textgen('Yuckkkk... You\'re no fun!')},20);
            window.addEventListener("click",winLose)
        }else 
        if(y==naughtBoxes){
            //console.log("crossBoxes "+"won")
            wins=false
            letterIndex=0;
            clearInterval(eyeInterval);
            clearInterval(textInterval);
            document.getElementById("gametextbox").innerHTML="";
            textInterval = setInterval(function(){textgen('Damn... you\'re actually bad, huh?')},20);
            window.addEventListener("click",winLose)
        }else if(boxList.length==0){

        }
    }  else{
       windex= true
    } 
}

function loseCheck(){
    if(winChecking){
        for(k=0; k<boxList.length; k++){
            winChecking = true
            windex = 0;
            var checkList = 0;
            var boes = boxList[k];
            var checkList = [...crossBoxes];
            checkList.push(boes.id);
            winCheck(checkList)

            if(windex){
                loseSpaces.push(boes)
                //console.log(winningSpaces)
            }
            winChecking = false;
    }
    for(k=0; k<boxList.length; k++){
        windex = 0;
        var checkList = 0;
        var boes = boxList[k];
        winChecking = true
        var checkList = [...naughtBoxes];
        checkList.push(boes.id);
        winCheck(checkList)
        
        if(windex){
            winningSpaces.push(boes)
            //console.log(winningSpaces)
        }
        winChecking = false;
    }}
}

function draw() {
    clearInterval(textInterval)
    gameLive = false;
    window.removeEventListener("click",draw)
    document.getElementById("taccon").innerHTML="";
    document.getElementById("taccon").remove();
    tictoeInit()
}

function winLose(){
    
    
    gameLive = false;
    window.removeEventListener("click",winLose)
    document.getElementById("taccon").innerHTML="";
    document.getElementById("taccon").remove();
    if(wins){
        libStage=18
    } else if(!wins){
        libStage=11
    }
    skipContinue = false
    
    textAdv()
}