var letterIndex=0;
var libStage =0;
var lib = ["Hello...","Testing... Testing...", "Is this thing on?","OH, it is!","6","6","Hmmm...","What should we play...","Hmmmmmm...","Tic-tac-toe sounds fun!","","I didn't expect you to be that bad, I'm a little dissapointed.","But... it doesn't matter anyways.","Time to die!","","","","How surprising, I didn't expect you win...","I bet a lot of money on that game...","Shit...","","",""]
var dlib = [["Good! Do want to play a game?", "Sure!", "No.", "Good.", "Too bad."],["Please leave...","Ok...","I don\'t want to...", "...","Then die..."]]
var txt = "";
var eyeState = "L";
var textInterval = 0;
var eyeInterval = 0;
var skipContinue = false;
let answer = NaN;




function textgen(x){
    typing = true
    if(letterIndex<x.length){
        if(gameLive){
            document.getElementById("gametextbox").innerHTML += x[letterIndex];
            
        }else{
        document.getElementById("textbox").innerHTML += x[letterIndex];
        }
        letterIndex++
    }else{
        if(gameLive){
            typing=false
            clearInterval(textInterval)
            textInterval=0;
            eyeInterval = setInterval(eyeLook, 1200)
        }else{
            typing=false
            eyeInterval = setInterval(eyeLook, 1200)
            clearInterval(textInterval);
            if(!skipContinue&&wins==undefined){
                document.getElementById("textbox").innerHTML += "<br><br><br><br> CLICK TO CONTINUE."
                window.addEventListener("click",textAdv)
            } else if(!skipContinue&&wins!=undefined){
                
                document.getElementById("textbox").innerHTML += "<br><br><br><br> CLICK TO CONTINUE."
                setTimeout(() => {
                    window.addEventListener("click",textAdv)
                }, 500); 
            }
        }
    }
}

function textAdv(a){
    skipContinue = false;
    var tb = document.getElementById("textbox");
    document.getElementById("textcon").innerHTML = '<p id="textbox"></p>';
    if(isNaN(a)){
        txt = lib[libStage];
    }
    libAction()
    
    if(wins==undefined){
        document.getElementById("eyes").style.backgroundImage= "url(eyesW.png)";
    }
    
    window.removeEventListener("click",textAdv)
    clearInterval(eyeInterval);
    clearInterval(textInterval);
    tb.innerHTML = "";
    letterIndex=0;

    libStage++
    libStage%=lib.length
    
    textInterval = setInterval(function(){textgen(txt)},20);
}

function mouthStage(x){ 
    var N = "url(mouth" + x + ".png)";
    //console.log(N)
    document.getElementById("mouth").style.backgroundImage = N;
}

function libAction(){
    switch (libStage) {
        case 0:
            mouthStage(0)
            break;
            
        case 5:
            mouthStage(1)
            break;

        case 4:
            question(0)
            mouthStage(0)
            break;
        
        case 6:
            mouthStage(0)
            break;
        case 9:
            mouthStage(1)
            break;
        case 10:
            tictoeInit()
            skipContinue = true;
            break;
        case 11:
            mouthStage(0)
            
            document.getElementById("eyes").style.backgroundImage="url(eyesW.png)"
            break;
        case 13:
            mouthStage(1)
            setTimeout(function(){window.close()},1500)
            document.getElementById("eyes").style.backgroundImage="url(eyesF.png)"
            skipContinue = true;
            break;
        case 18:
            mouthStage(0)
            document.getElementById("eyes").style.backgroundImage="url(eyesW.png)"
            break;
        case 19:
            mouthStage(0)
            
            document.getElementById("eyes").style.backgroundImage="url(eyesW.png)"
            break;
        case 20:
        question(1)
        break;
        case 21:
        if(answer){
            mouthStage(0)
            clearInterval(eyeInterval)
            document.getElementById("eyes").style.backgroundImage="url(eyesB.png)"
            skipContinue = true;
            setTimeout(function(){window.addEventListener("click",function(){window.close()})},200)
        }else{
            mouthStage(1)
            document.getElementById("eyes").style.backgroundImage="url(eyesF.png)"
            setTimeout(function(){window.close()},1000)
            skipContinue = true;
        }
        break;
    }
}

function question(x){
    skipContinue = true;
    txt = dlib[x][0]
    var a1 = document.createElement("div");
    a1.innerHTML = dlib[x][1];
    a1.addEventListener("click", function(){answer=true;txt=dlib[x][3];libStage-=0;textAdv(1);})
    
    var a2 = document.createElement("div");
    a2.innerHTML = dlib[x][2];
    a2.addEventListener("click",function(){answer=false;txt=dlib[x][4];libStage-=0;textAdv(1);})

    var aRow = document.createElement("div");

    aRow.className="answer";
    aRow.appendChild(a1);
    aRow.appendChild(a2);
    document.getElementById("textcon").appendChild(aRow);
}


function eyeLook(){
    var eyes = document.getElementById("eyes");
    if(wins==undefined){
        if(eyeState == "L"){
            eyeState = "R";
            eyes.style.backgroundImage = "url(" + "eyesR.png" + ")";
        } else if(eyeState == "R"){
            eyeState = "L";
            eyes.style.backgroundImage = "url(" + "eyesL.png" + ")";
        }
    }
}
textAdv()