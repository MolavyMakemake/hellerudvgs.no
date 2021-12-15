function DrawGraphics(){
    let content = "";
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            if (!points[i].Nearby(points[j])) continue;
            content += '<line class="Line" x1="0" y1="0" x2="0" y2="0"/>'
        }
    }
    document.getElementById("Graphics").innerHTML = content;
}
function UpdateGraphics(){
    let lines = document.querySelectorAll(".Line");
    let c = 0;
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            if (!points[i].Nearby(points[j])) continue;
            var p1 = transMatrix.Mul(points[i]);
            var p2 = transMatrix.Mul(points[j]);
            aP.forEach(n => {
                p1 = TransMatrix(n, offset).Mul(p1);
                p2 = TransMatrix(n, offset).Mul(p2);
            });
            lines[c].setAttribute("x1", 50 + 250 * (p1.x) / (p1.z + 4) / (p1.w + 4) + "vh")
            lines[c].setAttribute("x2", 50 + 250 * (p2.x) / (p2.z + 4) / (p2.w + 4) + "vh")
            lines[c].setAttribute("y1", 50 - 250 * (p1.y) / (p1.z + 4) / (p1.w + 4) + "vh")
            lines[c].setAttribute("y2", 50 - 250 * (p2.y) / (p2.z + 4) / (p2.w + 4)  + "vh")
            c++;
        }
    }
}

class Point{
    constructor(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    Nearby(p){
        return ((p.x == this.x) + (p.y == this.y) + (p.z == this.z) + (p.w == this.w)) == 3;
    }
}

class Matrix{
    constructor(a0, a1, a2, a3, b0, b1, b2, b3, c0, c1, c2, c3, d0, d1, d2, d3){
        this.a0 = a0
        this.a1 = a1
        this.a2 = a2
        this.a3 = a3
        this.b0 = b0
        this.b1 = b1
        this.b2 = b2
        this.b3 = b3
        this.c0 = c0
        this.c1 = c1
        this.c2 = c2
        this.c3 = c3
        this.d0 = d0
        this.d1 = d1
        this.d2 = d2
        this.d3 = d3
    }
    Mul(p){
        return new Point(
            p.x * this.a0 + p.y * this.b0 + p.z * this.c0 + p.w * this.d0,
            p.x * this.a1 + p.y * this.b1 + p.z * this.c1 + p.w * this.d1,
            p.x * this.a2 + p.y * this.b2 + p.z * this.c2 + p.w * this.d2,
            p.x * this.a3 + p.y * this.b3 + p.z * this.c3 + p.w * this.d3);
    }
}

let offset = 0.8;
document.addEventListener("keydown", function _(e) {
    switch (e.key){
        case ".":
            offset += 0.1;
            break;
        case ",":
            offset -= 0.1;
            break;
    }
})
