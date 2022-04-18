let walk=0;
let walkP;
function slide(e){
    const slider = e;
    let isDown = false;
    let startX;
    let scrollLeft;
    
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    window.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    window.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    window.addEventListener('mousemove', (e) => {
        if(!isDown) {return};
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        walk = (x - startX); //scroll-fast
        
        slider.scrollLeft = scrollLeft - walk;
    });
}
function makeSlide(){
    let arra = document.getElementsByClassName("slider")
    for(i=0;i<arra.length;i++){
        slide(arra[i])
    }
}

function linkConstructor(){
    for(i=0;i<spList.length;i++){
        var wgt = document.createElement("div");
        var gp = spList[i];
        wgt.id = gp.id;
        wgt.className = 'slider-item';
        var a = document.createElement("a");
        a.id = wgt.id + "-url";
        a.href = gp.url;
        wgt.appendChild(a);

        var img = document.createElement("div");
        img.className = "slider-item-image";
        img.style.backgroundImage = "url("+gp.id+".png)";
        wgt.appendChild(img);
        var txt = document.createElement("div")
        txt.className = "slider-item-text";
        txt.innerHTML = gp.ttl;
        wgt.appendChild(txt);

        document.getElementById("spill-slider").appendChild(wgt);
    }


    for(i=0;i<prList.length;i++){
        var wgt = document.createElement("div");
        var gp = prList[i];
        wgt.id = gp.id;
        wgt.className = 'slider-item';
        var a = document.createElement("a");
        a.id = wgt.id + "-url";
        a.href = gp.url;
        wgt.appendChild(a);

        var img = document.createElement("div");
        img.className = "slider-item-image";
        img.style.backgroundImage = "url("+gp.id+".png)";
        wgt.appendChild(img);
        var txt = document.createElement("div")
        txt.className = "slider-item-text";
        txt.innerHTML = gp.ttl;
        wgt.appendChild(txt);
        document.getElementById("programmer-slider").appendChild(wgt);
    }
}

function appendLink(){
    var boxList = document.getElementsByClassName("slider-item");
    for(i=0;i<boxList.length;i++){
        boxList[i].addEventListener('click',function(){
            if(Math.abs(walk)<5||walkP==walk||Math.abs(walk-walkP)<5){
                window.open(document.getElementById(this.id + "-url").href,'_blank'); 
            }
            walkP=walk
        });
    }
}
linkConstructor()
makeSlide()
appendLink()
