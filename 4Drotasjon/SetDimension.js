const XY = "<button onclick='Rotate(0)'>XY</button>";
const XZ = "<button onclick='Rotate(1)'>XZ</button>";
const XW = "<button onclick='Rotate(2)'>XW</button>";
const YZ = "<button onclick='Rotate(3)'>YZ</button>";
const YW = "<button onclick='Rotate(4)'>YW</button>";
const ZW = "<button onclick='Rotate(5)'>ZW</button>";

let aP = [];

let dimensions = document.getElementById("Dimensions");

function SetDimension2D(){
    points = [
        new Point(1, 1, 0, 0), new Point(1, -1, 0, 0), new Point(-1, 1, 0, 0), new Point(-1, -1, 0, 0)];
    dimensions.innerHTML = XY;
    rP = 0;
    aP = [];
    DrawGraphics();
}
function SetDimension3D(){
    points = [
        new Point(1, 1, 1, 0), new Point(1, 1, -1, 0), new Point(1, -1, 1, 0), new Point(1, -1, -1, 0), 
        new Point(-1, 1, 1, 0), new Point(-1, 1, -1, 0), new Point(-1, -1, 1, 0), new Point(-1, -1, -1, 0)];
    dimensions.innerHTML = XY + XZ + YZ;
    rP = 1;
    aP = [0, 3];
    DrawGraphics();
}
function SetDimension4D(){
    points = [
        new Point(1, 1, 1, 1), new Point(1, 1, 1, -1), new Point(1, 1, -1, 1), new Point(1, 1, -1, -1), 
        new Point(1, -1, 1, 1), new Point(1, -1, 1, -1), new Point(1, -1, -1, 1), new Point(1, -1, -1, -1),
        new Point(-1, 1, 1, 1), new Point(-1, 1, 1, -1), new Point(-1, 1, -1, 1), new Point(-1, 1, -1, -1), 
        new Point(-1, -1, 1, 1), new Point(-1, -1, 1, -1), new Point(-1, -1, -1, 1), new Point(-1, -1, -1, -1)];
    dimensions.innerHTML = XY + XZ + YZ + XW + YW + ZW;
    rP = 5;
    aP = [0, 3];
    DrawGraphics();
}

function Rotate(n) {
    if (rP != n) aP[aP.indexOf(n)] = rP;
    rP = n;
}