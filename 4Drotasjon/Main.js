let ang = 0;
function Main(){
    DrawGraphics();
    setInterval(_ => {
        ang += 0.01;
        transMatrix = TransMatrix(rP, ang);
        UpdateGraphics();
    }, 17)
}

let points;
let transMatrix;
let offsetRot;
let rP;
SetDimension4D();
Main();

function TransMatrix(n, u){
    const c = Math.cos(u);
    const s = Math.sin(u);
    switch(n){
        case 0:
            return new Matrix(  c, -s,  0,  0,
                                s,  c,  0,  0,
                                0,  0,  1,  0,
                                0,  0,  0,  1);
        case 1:
            return new Matrix(  c,  0, -s,  0,
                                0,  1,  0,  0,
                                s,  0,  c,  0,
                                0,  0,  0,  1);
        case 2:
            return new Matrix(  c,  0,  0, -s,
                                0,  1,  0,  0,
                                0,  0,  1,  0,
                                s,  0,  0,  c);
        case 3:
            return new Matrix(  1,  0,  0,  0,
                                0,  c, -s,  0,
                                0,  s,  c,  0,
                                0,  0,  0,  1);
        case 4:
            return new Matrix(  1,  0,  0,  0,
                                0,  c,  0, -s,
                                0,  0,  1,  0,
                                0,  s,  0,  c);
        case 5:
            return new Matrix(  1,  0,  0,  0,
                                0,  1,  0,  0,
                                0,  0,  c, -s,
                                0,  0,  s,  c);           
    }
}