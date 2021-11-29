document.getElementById("Text").innerHTML = document.getElementById("Copy").innerHTML

document.addEventListener("keydown", logKey);

function logKey(e){
    var l = document.getElementById("Text");
    document.getElementById("Cursor").style.left = "0px";
    if (e.key.length > 1) 
    { 
        if (e.key == "Enter") { 
            var c = document.getElementById("Copy");
            var s = l.innerHTML.substring(c.innerHTML.length, l.innerHTML.length)
            document.getElementById("Unchangable").innerHTML += l.innerHTML + "<br>";

            if (s.substring(0, 2) == "cd"){
                if (s == "cd Proging") window.open("https://proging.no/");
                else if (s == "cd BildeTilTekst") window.open("BildeTilTekst/BildeTilTekst.html");
                else if (s == "cd 3påRad") window.open("3påRad/3påRad.html");
                else if (s == "cd Snake") window.open("Snake/Snake.html");
                if (c[c.lenght - 1] != "/") {c.querySelector("#Directory").innerHTML += "/"}
                c.querySelector("#Directory").innerHTML += s.substring(3, l.innerHTML.lenght) + "/";
            }
            else if (s.substring(0, 2) == "ls"){
                yoshiTick = 0;
                yoshi = setInterval(bigYoshi, 500)
            }

            l.innerHTML = c.innerHTML;
        }
        else if (e.key == "Backspace" && l.innerHTML.length > 20){
            l.innerHTML = l.innerHTML.substring(
                0, l.innerHTML.length - 1
            )
        }
        return; 
    }
    if (e.key == " "){
        document.getElementById("Cursor").style.left = "8px";
        e.preventDefault();
    }
    l.innerHTML += e.key;
}

setInterval(cursorAnimation, 450);

function cursorAnimation(){
    if ($("#Cursor").is(":visible")) {
        $("#Cursor").hide();
    }
    else { $("#Cursor").show(); }
}

function bigYoshi(){
    if (yoshiTick == big.length) { clearInterval(yoshi) }
    else{
        document.getElementById("Unchangable").innerHTML += "<br><span id='Yoshi'>" + big[yoshiTick] + "</span>";
        yoshiTick++;
    }
}
yoshiTick = 0;
const big = [
    sp(13) + "⠴⢿⣧⣤⣄", 
    sp(9) + "⢀⣴⣿⣧⣆⣘⡄⢹⣿⣷⣆",
    sp(8) + "⣴⣿⣿⣿⣿⣿⣿⣷⣾⣿⣿⣿⣷⡀",
    sp(7) + "⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⢿⣷",
    sp(7) + "⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⣴⣿⣿",
    sp(7) + "⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣴⣿⣿⣿⣿⡀",
    sp(2) + "⢀⣀⡀⣾⡿⠀⠉⠉⠛⠋⠛⠛⠚⣿⣿⣿⣿⣿⣿⣷⣄",
    sp(1) + "⢠⣍⠹⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⣿⣿⡿",
    sp(2) + "⢿⣷⣾⣿⣿⠀⠀⠀⠀⠀⠀⢀⣴⣾⣿⣿⣿⣿⣿⣿⣷",
    sp(3) + "⢹⣟⢻⣿⣄⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇",
    sp(4) + "⠻⠿⠟⠁⠑⢶⣤⣴⣿⣿⣿⣷⣶⣬⣿⣿⣿⡿",
    sp(10) + "⠈⠙⠛⠛⢛⣿⣿⣿⣿⡿⠛⠁",
    sp(16) + "⠻⢿⡿⠟<br>"
];

/*
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠴⢿⣧⣤⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣧⣆⣘⡄⢹⣿⣷⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣷⣾⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⢿⣷⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⣴⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣴⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣀⡀⣾⡿⠀⠉⠉⠛⠋⠛⠛⠚⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀
⠀⠀⠀⢠⣍⠹⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⣿⣿⡿⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢿⣷⣾⣿⣿⠀⠀⠀⠀⠀⠀⢀⣴⣾⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢹⣟⢻⣿⣄⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠻⠿⠟⠁⠑⢶⣤⣴⣿⣿⣿⣷⣶⣬⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠛⠛⢛⣿⣿⣿⣿⡿⠛⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⢿⡿⠟
*/

function sp(len){
    msg = "";
    msg += "&emsp;".repeat(Math.floor(len / 2));
    if (len % 2 == 1) {msg += "&ensp;";}
    return msg;
}
