var img = document.querySelector("img");
let isImage = false;
let braille = true;
let threshold = 0;

window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // no longer needed, free memory
                isImage = true;
                ImageToText();
            }
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
        }
    });
  });

window.addEventListener("resize", function(){
    if (isImage) ImageToText();
})
document.addEventListener("change", function(){
    if (isImage) ImageToText();
})

function GetSize(){
    let width;
    let height;

    if (document.getElementById("DefaultHeight").checked){
        height = 0;
    }
    else{
        height = 2 * document.getElementById("Height").value;
    }

    if (height == 0 || (height > img.height * window.innerWidth / img.width / 5.7)){
        width = window.innerWidth / 5.7; 
        height = img.height * window.innerWidth / img.width / 5.7;
    }
    else{
        width = height * img.width / img.height;
    }
    width -= width % 4;
    height -= height % 4;
    if (braille) { width *= 2; height *= 2; }
    return [width, height];
}

function ImageToText()
{
    braille = document.getElementById("Braille").checked;

    if (document.getElementById("DefaultThreshold").checked){
        threshold = document.getElementById("Threshold").value;
        if (!braille) threshold =  2.5 - threshold / 127.5;
    }
    else{
        threshold = braille ? 127.5 : 1;
    }
    console.log(threshold);

    const text = document.getElementById("text");
    var Size = GetSize()
    var width = Size[0];
    var height = Size[1];

    text.style.fontSize = braille ? "7.4px" : "10.12px";

    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(img, 0,  0, width, height);
    
    var imgd = canvas.getContext("2d").getImageData(0, 0, width, height);
    var pix = imgd.data;

    if (braille) ImageToBraille(); 
    else ImageToAscii();

    function ImageToAscii(){
        text.innerHTML = "";
        for (y = 0; y < height; y+=2)
        {
            let line = "";
            for (x = 0; x < width * 4; x += 4)
            {
                n = ColorToFloat(x, y);
                line += FloatToChar(n);
            }
            text.innerHTML += line + "<br>";
        }
    
        function FloatToChar(f){
            // M N 8 O D Z I $ 7 ? + = ~ : , .

            if (f > 255 * Math.pow(0.941, threshold)) { return "M" } else
            if (f > 255 * Math.pow(0.882, threshold)) { return "N" } else
            if (f > 255 * Math.pow(0.824, threshold)) { return "8" } else
            if (f > 255 * Math.pow(0.765, threshold)) { return "O" } else
            if (f > 255 * Math.pow(0.706, threshold)) { return "D" } else
            if (f > 255 * Math.pow(0.647, threshold)) { return "Z" } else
            if (f > 255 * Math.pow(0.588, threshold)) { return "I" } else
            if (f > 255 * Math.pow(0.530, threshold)) { return "$" } else
            if (f > 255 * Math.pow(0.471, threshold)) { return "7" } else
            if (f > 255 * Math.pow(0.412, threshold)) { return "?" } else
            if (f > 255 * Math.pow(0.353, threshold)) { return "+" } else
            if (f > 255 * Math.pow(0.294, threshold)) { return "=" } else
            if (f > 255 * Math.pow(0.236, threshold)) { return "~" } else
            if (f > 255 * Math.pow(0.177, threshold)) { return ":" } else
            if (f > 255 * Math.pow(0.118, threshold)) { return "," } else
            if (f > 255 * Math.pow(0.059, threshold)) { return "." } else
            { return "&nbsp;" }
        }
    }
    
    function ImageToBraille(){
        let content = "";
        for (y = 0; y < height; y += 4)
        {
            for (x = 0; x < width * 4; x += 8)
            {
                var n = 0;
                if (ColorToFloat(x, y) > threshold) n += 1;
                if (ColorToFloat(x, y + 1) > threshold) n += 2;
                if (ColorToFloat(x, y + 2) > threshold) n += 4;
                if (ColorToFloat(x + 4, y) > threshold) n += 8;
                if (ColorToFloat(x + 4, y + 1) > threshold) n += 16;
                if (ColorToFloat(x + 4, y + 2) > threshold) n += 32;
                if (ColorToFloat(x, y + 3) > threshold) n += 64;
                if (ColorToFloat(x + 4, y + 3) > threshold) n += 128;

                if (n == 0) content += "<span id='inv'>" + String.fromCharCode(10241) + "</span>";
                else content += String.fromCharCode(10240 + n);
            }
            content += "<br>";
        }
        text.innerHTML = content;
    }
    
    function ColorToFloat(x, y){
        R = pix[y * width * 4 + x ];
        G = pix[y * width * 4 + x + 1];
        B = pix[y * width * 4 + x + 2];
        
        return R * 0.3 + G * 0.59 + B * 0.11;
    }
}


