/**
 *
 * @author Henryk Krasuski aka oldhandmixer
 * FDlock of dots
 *
 */
class PVector {
    //x = 0;
    //    y = 0;

    constructor(x_, y_) {
        this.x = x_;
        this.y = y_;
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
    }

    mult(f) {
        this.x *= f;
        this.y *= f;
    }

    set(x_, y_) {
        this.x = x_;
        this.y = y_;
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    div(n) {
        this.x /= n;
        this.y /= n;
    }

    normalize() {
        var m = this.mag();
        if (m != 0) {
            this.div(m);
        }
    }

    angle() {
        var ang = (Math.asin(this.y) < 0) ? Math.PI / 2 - Math.acos(this.x) + Math.PI : Math.PI / 2 + Math.acos(this.x) + Math.PI;
        return ang;
    }

    static random2D() {
        var angle = 2 * Math.PI * Math.random();
        return (new PVector(Math.cos(angle), Math.sin(angle)));
    }

    dist(p) {
        var dx = this.x - p.x;
        var dy = this.y - p.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    limit(max) {
        if (this.mag() > max) {
            this.normalize();
            this.mult(max);
        }
    }
}

// ======================================================
// ======================================================
// ======================================================

class PEntity {

    //    PVector v;
    //    String command;

    constructor(command, v) {
        this.v = v;
        this.command = command;
    }

    getVector() {
        return this.v;
    }

    getCommand() {
        return this.command;
    }
}

// ======================================================
// ======================================================
// ======================================================

class PGodboi {

    constructor() {
        this.t = new PVector(1920.0 / 2, 1080.0 / 2);
        this.pos = new PVector(0, 0);
        this.rudder = 0;
        this.shipangle = 0;
        this.d1 = 60;
        this.d2 = 20;
        this.forwardAccelleration = 0;
        this.forwardVelocity = 0;
        this.rotateAccelleration = 0;
        this.rotateVelocity = 0;
        this.v = new PVector(0, 0);
    }

    render(dc, angle, scale, colorA, colorB) {
        dc.save();
        var s = 5;
        dc.scale(scale, scale);
        dc.rotate(angle);
        if (colorB !== null) {
            var grad = dc.createLinearGradient(-s * 8, -s * 8, 2 * s * 8, 2 * s * 8);
            grad.addColorStop(0, colorA);
            grad.addColorStop(1, colorB);
            dc.strokeStyle = grad;
        }
        else {
            dc.strokeStyle = colorA;
        }
        dc.lineWidth = 5.0;
        dc.fillStyle = "black";
        dc.beginPath();
        dc.moveTo(-4 * s, -6 * s);
        dc.lineTo(0, 6 * s);
        dc.lineTo(4 * s, -6 * s);
        dc.lineTo(0 * s, -5 * s);
        dc.closePath();
        dc.fill();
        dc.stroke();
        dc.restore();

        this.rudder = angle;
        dc.save();
        dc.rotate(this.shipangle);
        var s = 5;
        dc.scale(scale, scale);
        if (colorB !== null) {
            var grad = dc.createLinearGradient(-s * 8, -s * 8, 2 * s * 8, 2 * s * 8);
            grad.addColorStop(0, colorA);
            grad.addColorStop(1, colorB);
            dc.strokeStyle = grad;
        }
        else {
            dc.strokeStyle = colorA;
        }
        dc.beginPath();
        dc.lineWidth = 5.0;
        dc.moveTo(-4 * s, 0);
        dc.lineTo(-4 * s, this.d2 * s);
        dc.lineTo(4 * s, this.d2 * s);
        dc.lineTo(4 * s, 0);
        dc.closePath();
        dc.stroke();
        dc.moveTo(-4 * s, 0);
        dc.lineTo(-4 * s, -this.d1 * s);
        dc.lineTo(4 * s, -this.d1 * s);
        dc.lineTo(4 * s, 0);
        dc.closePath();
        dc.stroke();
        dc.restore();

        /*         dc.save();
                dc.beginPath();
                dc.lineWidth = 5.0;
                dc.strokeStyle = 'red';
                dc.moveTo(40, 0);
                dc.lineTo(40, this.forwardAccelleration * 50);
                dc.stroke();
                dc.restore();
        
                dc.save();
                dc.beginPath();
                dc.lineWidth = 5.0;
                dc.strokeStyle = 'blue';
                dc.moveTo(45, 0);
                dc.lineTo(45, this.forwardVelocity * 1);
                dc.stroke();
                dc.restore();
                dc.save();
        
                dc.beginPath();
                dc.lineWidth = 5.0;
                dc.strokeStyle = 'green';
                dc.moveTo(50, 0);
                dc.lineTo(50, this.rotateAccelleration * 20);
                dc.stroke();
                dc.restore();
        
                dc.save();
                dc.beginPath();
                dc.lineWidth = 5.0;
                dc.strokeStyle = 'gray';
                dc.moveTo(55, 0);
                dc.lineTo(55, this.rotateVelocity * 40);
                dc.stroke();
                dc.restore();
         */

        dc.restore();

    }

    reflect(line) {
        var dot = this.vv.x * line.n1 + this.vv.y * line.n2;
        this.vv.x = this.vv.x - 2 * dot * line.n1;
        this.vv.y = this.vv.y - 2 * dot * line.n2;
    }

    accelerate() {
        this.forwardAccelleration = 1 * Math.cos(this.shipangle - this.rudder) - this.forwardVelocity / 250;
        this.rotateAccelleration = 1 * Math.sin(this.shipangle - this.rudder) - this.rotateVelocity / 5;
    }

    deccelerate() {
        this.forwardAccelleration = -this.forwardVelocity / 500;
        this.rotateAccelleration = - this.rotateVelocity * 2;
    }

    move() {
        this.forwardVelocity += this.forwardAccelleration;
        this.rotateVelocity += 0.005 * this.rotateAccelleration - 0.0005 * this.forwardVelocity * Math.sin(this.shipangle - this.rudder);
        this.shipangle -= 0.001 * this.rotateVelocity;
        this.pos.x -= 0.01 * this.forwardVelocity * Math.sin(this.shipangle);
        this.pos.y += 0.01 * this.forwardVelocity * Math.cos(this.shipangle);
    }
}

// ======================================================
// ======================================================
// ======================================================

class PLine {

    constructor(previous, e) {
        this.v1 = new PVector(previous.node.pos.x, previous.node.pos.y);
        this.v2 = new PVector(e.node.pos.x, e.node.pos.y);
        this.a = this.v2.y - this.v1.y;
        this.b = this.v2.x - this.v1.x;
        this.c = this.v2.x * this.v1.y - this.v1.x * this.v2.y;
        this.l = Math.sqrt(this.a * this.a + this.b * this.b);

        this.n2 = (this.l > 0.0001) ? -this.b / this.l : 99999999;
        this.n1 = (this.l > 0.0001) ? this.a / this.l : 99999999;
        this.aa = this.v1.y - this.v2.y;
        this.bb = this.v2.x - this.v1.x;
        this.cc = this.v1.x * this.v2.y - this.v2.x * this.v1.y;

        this.rx1 = (e.v.x < previous.v.x) ? e.v.x - 10 : previous.v.x - 10;
        this.rx2 = this.rx1 + Math.abs(e.v.x - previous.v.x) + 20;
        this.ry1 = (e.v.y < previous.v.y) ? e.v.y - 10 : previous.v.y - 10;
        this.ry2 = this.ry1 + Math.abs(e.v.y - previous.v.y) + 20;
    }

    foot(p1) {
        var temp = -1 * (this.aa * p1.x + this.bb * p1.y + this.cc) / (this.aa * this.aa + this.bb * this.bb);
        var x = temp * this.aa + p1.x;
        var y = temp * this.bb + p1.y;
        return new PVector(x, y);
    }

    dist(p1) {
        return Math.abs(this.a * p1.x - this.b * p1.y + this.c) / this.l;;
    }

    contains(p1) {
        return ((this.rx1 < p1.x) & (this.rx2 > p1.x) & (this.ry1 < p1.y) & (this.ry2 > p1.y));
    }

    // Given three colinear points p, q, r, the function checks if 
    // point q lies on line segment 'pr' 
    onSegment(p, q, r) {
        if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
            q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y))
            return true;

        return false;
    }

    orientation(p, q, r) {
        // See https://www.geeksforgeeks.org/orientation-3-ordered-points/ 
        // for details of below formula. 
        var val = (q.y - p.y) * (r.x - q.x) -
            (q.x - p.x) * (r.y - q.y);

        if (val == 0) return 0; // colinear 

        return (val > 0) ? 1 : 2; // clock or counterclock wise 
    }

    intersects(p2, q2) {
        // Find the four orientations needed for general and 
        // special cases 
        var o1 = this.orientation(this.v1, this.v2, p2);
        var o2 = this.orientation(this.v1, this.v2, q2);
        var o3 = this.orientation(p2, q2, this.v1);
        var o4 = this.orientation(p2, q2, this.v2);

        // General case 
        if (o1 != o2 && o3 != o4)
            return true;

        // Special Cases 
        // p1, q1 and p2 are colinear and p2 lies on segment p1q1 
        if (o1 == 0 && this.onSegment(this.v1, p2, this.v2)) return true;

        // p1, q1 and q2 are colinear and q2 lies on segment p1q1 
        if (o2 == 0 && this.onSegment(this.v1, q2, this.v2)) return true;

        // p2, q2 and p1 are colinear and p1 lies on segment p2q2 
        if (o3 == 0 && this.onSegment(p2, this.v1, q2)) return true;

        // p2, q2 and q1 are colinear and q1 lies on segment p2q2 
        if (o4 == 0 && this.onSegment(p2, this.v2, q2)) return true;

        return false; // Doesn't fall in any of the above cases 
    }
}

// ======================================================
// ======================================================
// ======================================================

class PBullit {
    constructor(x, y, dx, dy, s, range, color) {
        this.pos = new PVector(x, y);
        this.velocity = new PVector(dx, dy);
        this.s = s;
        this.range = range;
        this.color = color;
    }

    move() {
        this.pos.add(this.velocity);
        return --this.range;
    }

    render(dc) {
        dc.fillStyle = this.color;
        dc.fillRect(this.pos.x, this.pos.y, this.s, this.s);
    }

    reflect(line) {
        var dot = this.velocity.x * line.n1 + this.velocity.y * line.n2;
        this.velocity.x -= 2 * dot * line.n1;
        this.velocity.y -= 2 * dot * line.n2;
    }
}

// ======================================================
// ======================================================
// ======================================================

class PNode {
    constructor(p) {
        this.center = new PVector(p.x, p.y);
        this.angle = 2 * Math.random() * Math.PI;
        this.dangle = 0.1 - Math.random() * 0.2;
        this.radius = 50 * Math.random();
        this.s = 10;
        var x = this.center.x + this.radius * Math.cos(this.angle);
        var y = this.center.y + this.radius * Math.sin(this.angle);
        this.pos = new PVector(x, y);
        this.visible = false;
    }

    render(dc) {
        dc.fillStyle = "purple";
        dc.fillRect(this.pos.x, this.pos.y, this.s, this.s);
    }

    tick() {
        this.angle += this.dangle;
        var x = this.center.x + this.radius * Math.cos(this.angle);
        var y = this.center.y + this.radius * Math.sin(this.angle);
        this.pos.set(x, y);
    }
}

// ======================================================
// ======================================================
// ======================================================

class PRectangle {

    constructor(left, top, width, height) {
        this.p1 = new PVector(left, top);
        this.p2 = new PVector(left + width, top + height);
    }

    contains(p) {
        return ((this.p1.x < p.x) & (this.p2.x > p.x) & (this.p1.y < p.y) & (this.p2.y > p.y));
    }
}

// ======================================================
// ======================================================
// ======================================================


var mouse = new PVector(0, 0);
var goodboi = new PGodboi();
var nodes = [];    // the nodes
var sequence = []; // current level in sequence form
var level = [];    // current level in PLine form

var sequence1 = [{ command: "moveTo", x: -35, y: -20 }, { command: "lineTo", x: 35, y: -20 }, { command: "lineTo", x: 35, y: 20 }, { command: "lineTo", x: -35, y: 20 }, { command: "lineTo", x: -35, y: -20 }, { command: "moveTo", x: -25, y: -10 }, { command: "lineTo", x: -25, y: -10 }, { command: "lineTo", x: -5, y: -10 }, { command: "lineTo", x: -5, y: 10 }, { command: "lineTo", x: -25, y: 10 }, { command: "lineTo", x: -25, y: -10 }, { command: "moveTo", x: 5, y: -10 }, { command: "lineTo", x: 25, y: -10 }, { command: "lineTo", x: 25, y: 10 }, { command: "lineTo", x: 5, y: 10 }, { command: "lineTo", x: 5, y: -10 }, { command: "moveTo", x: -5, y: -18 }, { command: "lineTo", x: 0, y: -12 }, { command: "lineTo", x: 5, y: -18 }, { command: "lineTo", x: -5, y: -18 }, { command: "moveTo", x: -27, y: -17 }, { command: "lineTo", x: -33, y: -12 }, { command: "moveTo", x: -32, y: -3 }, { command: "lineTo", x: -29, y: 0 }, { command: "moveTo", x: -28, y: 7 }, { command: "lineTo", x: -31, y: 11 }, { command: "moveTo", x: -26, y: 17 }, { command: "lineTo", x: -24, y: 13 }, { command: "moveTo", x: -13, y: 13 }, { command: "lineTo", x: -4, y: 18 }, { command: "moveTo", x: -1, y: 4 }, { command: "lineTo", x: 0, y: 7 }, { command: "moveTo", x: 6, y: 17 }, { command: "lineTo", x: 10, y: 14 }, { command: "moveTo", x: 18, y: 17 }, { command: "lineTo", x: 23, y: 14 }, { command: "moveTo", x: 32, y: 18 }, { command: "lineTo", x: 27, y: 11 }, { command: "moveTo", x: 31, y: 2 }, { command: "lineTo", x: 29, y: -2 }, { command: "moveTo", x: 33, y: -8 }, { command: "lineTo", x: 30, y: -7 }, { command: "moveTo", x: 29, y: -14 }, { command: "lineTo", x: 25, y: -14 }, { command: "moveTo", x: 29, y: -18 }, { command: "lineTo", x: 34, y: -14 }, { command: "moveTo", x: 16, y: -14 }, { command: "lineTo", x: 13, y: -12 }, { command: "moveTo", x: -9, y: -19 }, { command: "lineTo", x: -12, y: -16 }, { command: "moveTo", x: -17, y: -11 }, { command: "lineTo", x: -17, y: -14 }];
var sequence2 = [{ command: "moveTo", x: -33, y: 0 }, { command: "lineTo", x: -33, y: 0 }, { command: "lineTo", x: -30, y: -7 }, { command: "lineTo", x: -26, y: -13 }, { command: "lineTo", x: -21, y: -15 }, { command: "lineTo", x: -15, y: -17 }, { command: "lineTo", x: 7, y: -17 }, { command: "lineTo", x: 19, y: -15 }, { command: "lineTo", x: 23, y: -12 }, { command: "lineTo", x: 30, y: -4 }, { command: "lineTo", x: 33, y: 5 }, { command: "lineTo", x: 32, y: 11 }, { command: "lineTo", x: 31, y: 17 }, { command: "lineTo", x: 29, y: 19 }, { command: "lineTo", x: 26, y: 21 }, { command: "lineTo", x: 23, y: 22 }, { command: "lineTo", x: 18, y: 22 }, { command: "lineTo", x: 14, y: 22 }, { command: "lineTo", x: 11, y: 18 }, { command: "lineTo", x: 10, y: 14 }, { command: "lineTo", x: 11, y: 11 }, { command: "lineTo", x: 8, y: 5 }, { command: "lineTo", x: 6, y: 2 }, { command: "lineTo", x: 2, y: 4 }, { command: "lineTo", x: 1, y: 10 }, { command: "lineTo", x: 1, y: 13 }, { command: "lineTo", x: -1, y: 17 }, { command: "lineTo", x: -4, y: 19 }, { command: "lineTo", x: -6, y: 18 }, { command: "lineTo", x: -9, y: 14 }, { command: "lineTo", x: -10, y: 11 }, { command: "lineTo", x: -13, y: 10 }, { command: "lineTo", x: -18, y: 15 }, { command: "lineTo", x: -20, y: 18 }, { command: "lineTo", x: -24, y: 20 }, { command: "lineTo", x: -27, y: 19 }, { command: "lineTo", x: -30, y: 16 }, { command: "lineTo", x: -32, y: 11 }, { command: "lineTo", x: -34, y: 7 }, { command: "lineTo", x: -34, y: 5 }, { command: "lineTo", x: -33, y: 1 }, { command: "lineTo", x: -33, y: 1 }, { command: "lineTo", x: -33, y: 0 }, { command: "moveTo", x: -23, y: -5 }, { command: "lineTo", x: -24, y: -5 }, { command: "lineTo", x: -25, y: -3 }, { command: "lineTo", x: -27, y: -2 }, { command: "lineTo", x: -27, y: 4 }, { command: "lineTo", x: -28, y: 6 }, { command: "lineTo", x: -28, y: 8 }, { command: "lineTo", x: -27, y: 10 }, { command: "lineTo", x: -26, y: 11 }, { command: "lineTo", x: -26, y: 12 }, { command: "lineTo", x: -22, y: 12 }, { command: "lineTo", x: -20, y: 11 }, { command: "lineTo", x: -19, y: 10 }, { command: "lineTo", x: -15, y: 7 }, { command: "lineTo", x: -14, y: 6 }, { command: "lineTo", x: -13, y: 6 }, { command: "lineTo", x: -10, y: 7 }, { command: "lineTo", x: -8, y: 7 }, { command: "lineTo", x: -7, y: 8 }, { command: "lineTo", x: -6, y: 8 }, { command: "lineTo", x: -5, y: 7 }, { command: "lineTo", x: -6, y: 5 }, { command: "lineTo", x: -8, y: 4 }, { command: "lineTo", x: -10, y: 2 }, { command: "lineTo", x: -12, y: 1 }, { command: "lineTo", x: -13, y: 0 }, { command: "lineTo", x: -15, y: -1 }, { command: "lineTo", x: -16, y: -2 }, { command: "lineTo", x: -17, y: -3 }, { command: "lineTo", x: -19, y: -3 }, { command: "lineTo", x: -20, y: -4 }, { command: "lineTo", x: -21, y: -4 }, { command: "lineTo", x: -22, y: -5 }, { command: "lineTo", x: -23, y: -5 }, { command: "moveTo", x: -21, y: -9 }, { command: "lineTo", x: -21, y: -9 }, { command: "lineTo", x: -20, y: -9 }, { command: "lineTo", x: -18, y: -8 }, { command: "lineTo", x: -16, y: -6 }, { command: "lineTo", x: -15, y: -5 }, { command: "lineTo", x: -13, y: -4 }, { command: "lineTo", x: -11, y: -3 }, { command: "lineTo", x: -10, y: -2 }, { command: "lineTo", x: -8, y: 0 }, { command: "lineTo", x: -7, y: 1 }, { command: "lineTo", x: -6, y: 1 }, { command: "lineTo", x: -4, y: 2 }, { command: "lineTo", x: -3, y: 2 }, { command: "lineTo", x: -2, y: 2 }, { command: "lineTo", x: -1, y: 1 }, { command: "lineTo", x: 0, y: 0 }, { command: "lineTo", x: 1, y: 0 }, { command: "lineTo", x: 3, y: -1 }, { command: "lineTo", x: 5, y: -1 }, { command: "lineTo", x: 7, y: -1 }, { command: "lineTo", x: 9, y: 1 }, { command: "lineTo", x: 10, y: 2 }, { command: "lineTo", x: 11, y: 4 }, { command: "lineTo", x: 13, y: 6 }, { command: "lineTo", x: 15, y: 10 }, { command: "lineTo", x: 15, y: 12 }, { command: "lineTo", x: 16, y: 14 }, { command: "lineTo", x: 20, y: 17 }, { command: "lineTo", x: 20, y: 17 }, { command: "lineTo", x: 23, y: 17 }, { command: "lineTo", x: 25, y: 16 }, { command: "lineTo", x: 26, y: 14 }, { command: "lineTo", x: 28, y: 12 }, { command: "lineTo", x: 29, y: 11 }, { command: "lineTo", x: 29, y: 8 }, { command: "lineTo", x: 28, y: 5 }, { command: "lineTo", x: 28, y: 3 }, { command: "lineTo", x: 26, y: 0 }, { command: "lineTo", x: 25, y: -3 }, { command: "lineTo", x: 24, y: -4 }, { command: "lineTo", x: 22, y: -6 }, { command: "lineTo", x: 19, y: -8 }, { command: "lineTo", x: 17, y: -10 }, { command: "lineTo", x: 17, y: -11 }, { command: "lineTo", x: 13, y: -13 }, { command: "lineTo", x: 12, y: -13 }, { command: "lineTo", x: 10, y: -13 }, { command: "lineTo", x: 7, y: -13 }, { command: "lineTo", x: 5, y: -14 }, { command: "lineTo", x: 0, y: -14 }, { command: "lineTo", x: -2, y: -14 }, { command: "lineTo", x: -3, y: -14 }, { command: "lineTo", x: -4, y: -14 }, { command: "lineTo", x: -5, y: -13 }, { command: "lineTo", x: -7, y: -14 }, { command: "lineTo", x: -8, y: -14 }, { command: "lineTo", x: -12, y: -13 }, { command: "lineTo", x: -14, y: -13 }, { command: "lineTo", x: -16, y: -12 }, { command: "lineTo", x: -16, y: -12 }, { command: "lineTo", x: -20, y: -11 }, { command: "lineTo", x: -20, y: -11 }, { command: "lineTo", x: -22, y: -10 }, { command: "lineTo", x: -21, y: -9 }];
var bullits = [];   // spawned bullits from the good guy

var tick = 0;
const dtick = 0.1;

function cute_invader_bot(x, y, angle, scale, colormode, colorA, colorB) {
    dc.save();
    var s = 5;
    dc.translate(x, y);
    dc.scale(scale, scale);
    dc.rotate(angle);
    if (colormode === 'gradient') {
        var grad = dc.createLinearGradient(-s * 6, -s * 6, 2 * s * 6, 2 * s * 6);
        grad.addColorStop(0, colorA);
        grad.addColorStop(1, colorB);
        dc.fillStyle = grad;
    }
    else {
        dc.fillStyle = colorA;
    }
    dc.fillRect(-4 * s, -6 * s, 8 * s, 2 * s);
    dc.fillRect(-5 * s, -5 * s, 10 * s, 9 * s);
    var xx = s * 3 * Math.sin(tick) - 5 * s;
    dc.fillRect(xx, 2 * s, 4 * s, 5 * s);
    dc.fillRect(xx + 6 * s, 2 * s, s * 4, s * 5);
    dc.fillStyle = "WHITE";
    dc.fillRect(-3 * s, -4 * s, 2 * s, 4 * s);
    dc.fillRect(1 * s, -4 * s, 2 * s, 4 * s);
    dc.fillStyle = "BLACK";
    dc.fillRect(-3 * s, -2 * s, s, 2 * s);
    dc.fillRect(1 * s, -2 * s, s, 2 * s);
    dc.restore();
}

function ufo_bot(x, y, angle, scale, colormode, colorA, colorB) {
    dc.save();
    var s = 5;
    dc.translate(x, y);
    dc.scale(scale, scale);
    dc.rotate(angle);
    if (colormode === 'gradient') {
        var grad = dc.createLinearGradient(-s * 8, -s * 8, 2 * s * 8, 2 * s * 8);
        grad.addColorStop(0, colorA);
        grad.addColorStop(1, colorB);
        dc.fillStyle = grad;
    }
    else {
        dc.fillStyle = colorA;
    }
    dc.fillRect(-4 * s, -2 * s, 8 * s, 2 * s);
    dc.fillRect(-5 * s, -1 * s, 10 * s, s);
    dc.fillRect(-7 * s, -0 * s, 14 * s, 2 * s);
    dc.fillRect(-5 * s, 2 * s, 10 * s, s);
    dc.fillRect(-4 * s, 2 * s, 8 * s, 2 * s);
    dc.fillStyle = "BLACK";
    dc.fillRect(-4 * s, 0 * s, 8 * s, 2 * s);
    dc.fillStyle = "WHITE";
    var xx = 4 * s + s * 3 * Math.sin(tick) - 5 * s;
    dc.fillRect(xx, 0 * s, 2 * s, 2 * s);
    dc.restore();
}

function hunter_bot(pos, angle, scale, colorA, colorB) {
    dc.save();
    var s = 5;
    dc.translate(pos.x, pos.y);
    dc.scale(scale, scale);
    dc.rotate(angle);
    if (colorB !== null) {
        var grad = dc.createLinearGradient(-s * 8, -s * 8, 2 * s * 8, 2 * s * 8);
        grad.addColorStop(0, colorA);
        grad.addColorStop(1, colorB);
        dc.strokeStyle = grad;
    }
    else {
        dc.strokeStyle = colorA;
    }
    dc.lineWidth = 5.0;
    dc.fillStyle = "black";
    dc.beginPath();
    dc.moveTo(-4 * s, -6 * s);
    dc.lineTo(0, 6 * s);
    dc.lineTo(4 * s, -6 * s);
    dc.lineTo(0 * s, -5 * s);
    dc.closePath();
    dc.fill();
    dc.stroke();
    dc.restore();
}

function tumbler_bot(x, y, angle, scale, colormode, colorA, colorB) {
    dc.save();
    var s = 5;
    dc.translate(x, y);
    dc.scale(scale, scale);
    dc.rotate(angle);
    if (colormode === 'gradient') {
        var grad = dc.createLinearGradient(-s * 8, -s * 8, 2 * s * 8, 2 * s * 8);
        grad.addColorStop(0, colorA);
        grad.addColorStop(1, colorB);
        dc.strokeStyle = grad;
    }
    else {
        dc.strokeStyle = colorA;
    }
    dc.lineWidth = 5.0;
    var da = 2 * Math.PI / 7;
    var a = 0;
    dc.beginPath();
    for (var i = 0; i < 7; i++) {
        var x = 6 * s * Math.cos(i * da);
        var y = 6 * s * Math.sin(i * da);
        if (i === 0) {
            dc.moveTo(x, y);
        }
        else {
            dc.lineTo(x, y);
        }
    }
    dc.closePath();
    dc.stroke();
    dc.fillStyle = "YELLOW";
    var xx = 4 * s + s * 3 * Math.sin(tick) - 5 * s;
    dc.fillRect(xx, -1 * s, 2 * s, 2 * s);

    dc.restore();
}

function star_bot(x, y, angle, scale, colormode, colorA, colorB) {
    dc.save();
    var s = 5;
    dc.translate(x, y);
    dc.scale(scale, scale);
    dc.rotate(angle);
    if (colormode === 'gradient') {
        var grad = dc.createLinearGradient(-s * 8, -s * 8, 2 * s * 8, 2 * s * 8);
        grad.addColorStop(0, colorA);
        grad.addColorStop(1, colorB);
        dc.strokeStyle = grad;
    }
    else {
        dc.strokeStyle = colorA;
    }
    dc.lineWidth = 5.0;
    var da = 2 * Math.PI / 7 * 3;
    dc.beginPath();
    for (var i = 0; i < 7; i++) {
        var x = 6 * s * Math.cos(i * da);
        var y = 6 * s * Math.sin(i * da);
        if (i === 0) {
            dc.moveTo(x, y);
        }
        else {
            dc.lineTo(x, y);
        }
    }
    dc.closePath();
    dc.stroke();
    dc.restore();
}

function power_bot(x, y, angle, scale, colormode, colorA, colorB) {
    dc.save();
    var s = 5;
    dc.translate(x, y);
    dc.scale(scale, scale);
    dc.rotate(angle);
    if (colormode === 'gradient') {
        var grad = dc.createLinearGradient(-s * 8, -s * 8, 2 * s * 8, 2 * s * 8);
        grad.addColorStop(0, colorA);
        grad.addColorStop(1, colorB);
        dc.fillStyle = grad;
    }
    else {
        dc.fillStyle = colorA;
    }
    dc.fillRect(-4 * s, -8 * s, 8 * s, 2 * s);
    dc.fillRect(-5 * s, -7 * s, 10 * s, 7 * s);
    dc.fillRect(-6 * s, -5 * s, 12 * s, 5 * s);
    dc.fillRect(-7 * s, -0 * s, 14 * s, 2 * s);
    dc.fillRect(-5 * s, 2 * s, 10 * s, s);
    dc.fillRect(-4 * s, 2 * s, 8 * s, 2 * s);
    dc.fillStyle = "BLACK";
    dc.fillRect(-4 * s, -4 * s, 8 * s, 2 * s);
    dc.fillStyle = "PINK";
    var xx = 4 * s + s * 3 * Math.sin(tick) - 5 * s;
    dc.fillRect(xx, -4 * s, 2 * s, 2 * s);
    dc.restore();
}

function rookie_bot(x, y, angle, scale, colormode, colorA, colorB) {
    dc.save();
    var s = 5;
    dc.translate(x, y);
    dc.scale(scale, scale);
    dc.rotate(angle);
    if (colormode === 'gradient') {
        var grad = dc.createLinearGradient(-s * 8, -s * 8, 2 * s * 8, 2 * s * 8);
        grad.addColorStop(0, colorA);
        grad.addColorStop(1, colorB);
        dc.fillStyle = grad;
    }
    else {
        dc.fillStyle = colorA;
    }
    dc.beginPath();
    dc.arc(0, 0, 5 * s, 0, 2 * Math.PI, true);
    dc.fill();
    dc.fillRect(-7 * s, -1 * s, 2 * s, 2 * s);
    dc.fillRect(5 * s, -1 * s, 2 * s, 2 * s);
    dc.fillStyle = "BLACK";
    dc.fillRect(-4 * s, -1 * s, 8 * s, 2 * s);
    dc.fillStyle = "YELLOW";
    var xx = 4 * s + s * 3 * Math.sin(tick) - 5 * s;
    dc.fillRect(xx, -1 * s, 2 * s, 2 * s);
    dc.restore();
}

function sergent_bot(x, y, angle, scale, colormode, colorA, colorB) {
    dc.save();
    var s = 5;
    dc.translate(x, y);
    dc.scale(scale, scale);
    dc.rotate(angle);
    if (colormode === 'gradient') {
        var grad = dc.createLinearGradient(-s * 8, -s * 8, 2 * s * 8, 2 * s * 8);
        grad.addColorStop(0, colorA);
        grad.addColorStop(1, colorB);
        dc.fillStyle = grad;
    }
    else {
        dc.fillStyle = colorA;
    }
    dc.strokeStyle = colorB;
    dc.lineWidth = 5.0;
    var da = 2 * Math.PI / 7 * 3;
    var a = 0;
    dc.beginPath();
    for (var i = 0; i < 7; i++) {
        var x = 6 * s * Math.cos(i * da);
        var y = 6 * s * Math.sin(i * da);
        if (i === 0) {
            dc.moveTo(x, y);
        }
        else {
            dc.lineTo(x, y);
        }
    }
    dc.closePath();
    dc.stroke();

    dc.rotate(-tick / 8);
    dc.beginPath();
    dc.arc(0, 0, 5 * s, 0, 2 * Math.PI, true);
    dc.fill();
    dc.fillStyle = "BLACK";
    dc.fillRect(-4 * s, -1 * s, 8 * s, 2 * s);
    dc.fillStyle = "YELLOW";
    var xx = 4 * s + s * 3 * Math.sin(tick) - 5 * s;
    dc.fillRect(xx, -1 * s, 2 * s, 2 * s);
    dc.restore();
}

function sergent_hunter_bot(x, y, angle, scale, colormode, colorA, colorB) {
    dc.save();
    var s = 5;
    dc.translate(x, y);
    dc.scale(scale, scale);
    dc.rotate(angle);
    if (colormode === 'gradient') {
        var grad = dc.createLinearGradient(-s * 8, -s * 8, 2 * s * 8, 2 * s * 8);
        grad.addColorStop(0, colorA);
        grad.addColorStop(1, colorB);
        dc.fillStyle = grad;
    }
    else {
        dc.fillStyle = colorA;
    }
    dc.lineWidth = 5.0;
    dc.beginPath();
    dc.moveTo(-4 * s, -6 * s);
    dc.lineTo(0, 6 * s);
    dc.lineTo(4 * s, -6 * s);
    dc.lineTo(0 * s, -5 * s);
    dc.closePath();
    dc.fill();
    dc.fillStyle = "BLACK";
    dc.fillRect(-1 * s, -4 * s, 2 * s, 6 * s);
    dc.fillStyle = "green";
    var xx = 3 * s + s * 2 * Math.sin(tick) - 5 * s;
    dc.fillRect(-1 * s, xx, 2 * s, 2 * s);
    dc.restore();
}

function square_bot(x, y, angle, scale, colormode, colorA, colorB) {
    dc.save();
    var s = 5;
    dc.translate(x, y);
    dc.scale(scale, scale);
    dc.rotate(angle);
    if (colormode === 'gradient') {
        var grad = dc.createLinearGradient(-s * 6, -s * 6, 2 * s * 6, 2 * s * 6);
        grad.addColorStop(0, colorA);
        grad.addColorStop(1, colorB);
        dc.fillStyle = grad;
    }
    else {
        dc.fillStyle = colorA;
    }
    dc.fillRect(-6 * s, -6 * s, 12 * s, 12 * s);
    dc.rotate(-tick / 2);
    dc.fillStyle = "BLACK";
    dc.fillRect(-4 * s, -1 * s, 8 * s, 2 * s);
    dc.fillStyle = "YELLOW";
    var xx = 4 * s + s * 3 * Math.sin(tick) - 5 * s;
    dc.fillRect(xx, -1 * s, 2 * s, 2 * s);
    dc.restore();
}

function triangle_bot(x, y, angle, scale, colormode, colorA, colorB) {
    dc.save();
    var s = 5;
    dc.translate(x, y);
    dc.scale(scale, scale);
    dc.rotate(angle);
    if (colormode === 'gradient') {
        var grad = dc.createLinearGradient(-s * 8, -s * 8, 2 * s * 8, 2 * s * 8);
        grad.addColorStop(0, colorA);
        grad.addColorStop(1, colorB);
        dc.strokeStyle = grad;
    }
    else {
        dc.strokeStyle = colorA;
    }
    dc.lineWidth = 5.0;
    var da = 2 * Math.PI / 3;
    var a = 0;
    dc.beginPath();
    for (var i = 0; i < 3; i++) {
        var x = 8 * s * Math.cos(i * da);
        var y = 8 * s * Math.sin(i * da);
        if (i === 0) {
            dc.moveTo(x, y);
        }
        else {
            dc.lineTo(x, y);
        }
    }
    dc.closePath();
    dc.stroke();
    dc.rotate(-tick / 4);
    dc.fillStyle = "YELLOW";
    var xx = 4 * s + s * 3 * Math.sin(tick) - 5 * s;
    dc.fillRect(xx, -1 * s, 2 * s, 2 * s);
    dc.restore();
}

function basic_bot(x, y, angle, scale, colormode, colorA, colorB) {
    dc.save();
    var s = 5;
    dc.translate(x, y);
    dc.scale(scale, scale);
    dc.rotate(angle);
    if (colormode === 'gradient') {
        var grad = dc.createLinearGradient(-s * 8, -s * 8, 2 * s * 8, 2 * s * 8);
        grad.addColorStop(0, colorA);
        grad.addColorStop(1, colorB);
        dc.fillStyle = grad;
    }
    else {
        dc.fillStyle = colorA;
    }

    dc.restore();
}


function init_level() {
    sequence = [];
    source = sequence1;
    var s = 50;
    //var t = new PVector(500, -2000); // for sequence 2
    var t = new PVector(0, 0); // for sequence 1
    for (var i = 0; i < source.length; i++) {
        v = new PVector(source[i].x * s, source[i].y * s);
        v.add(t);
        sequence.push(new PEntity(source[i].command, v));
    }

    var previous = null;

    do {
        splitted = false;
        for (var i = 0; i < sequence.length; i++) {
            e = sequence[i];
            if ((previous !== null) && (e.command.toLowerCase() !== "moveto")) {
                //level.push(new PLine(previous, e));
                dist = e.v.dist(previous.v);
                if (dist > 500) {
                    vector = new PVector((e.v.x + previous.v.x) / 2, (e.v.y + previous.v.y) / 2)
                    entity = new PEntity("lineTo", vector);
                    sequence.splice(i, 0, entity);
                    splitted = true;
                }
            }
            previous = e;
        }
    } while (splitted);


}

function build_level() {
    nodes = [];
    for (var i = 0; i < sequence.length; i++) {
        e = sequence[i];
        found = false;
        for (var j = 0; (j < nodes.length) && (!found); j++) {
            if (nodes[j].center.dist(e.v) < 20) {
                e.node = nodes[j];
                found = true;
            }
        }
        if (!found) {
            node = new PNode(e.v);
            e.node = node;
            nodes.push(node);
        }
    }

    level = [];
    var previous = null;
    for (var i = 0; i < sequence.length; i++) {
        e = sequence[i];
        if ((previous !== null) && (e.command.toLowerCase() !== "moveto")) {
            level.push(new PLine(previous, e));
        }
        previous = e;
    }
}

function animateloop() {
    dc.clearRect(0, 0, width, height);

}


function oldanimateloop() {
    dc.clearRect(0, 0, width, height);

    dc.translate(goodboi.t.x, goodboi.t.y);

    // render the bullits from the good guy
    dc.translate(-goodboi.pos.x, -goodboi.pos.y);
    var i = bullits.length;
    while (i--) {
        bullits[i].render(dc);
        if (bullits[i].move() < 0) {
            bullits.splice(i, 1);
        }
    }
    dc.translate(goodboi.pos.x, goodboi.pos.y);

    // move nodes and identify visible ones
    rect = new PRectangle(goodboi.pos.x - 2000, goodboi.pos.y - 1500, 4000, 3000);
    for (var i = 0; i < nodes.length; i++) {
        //        if (nodes[i].pos.dist(goodboi.pos) < 2000) {
        if (rect.contains(nodes[i].pos)) {
            //nodes[i].tick();
            nodes[i].visible = true;
        }
        else {
            nodes[i].visible = false;
        }
    }


    // render level
    if (sequence.length > 0) {
        dc.translate(-goodboi.pos.x, -goodboi.pos.y);
        dc.strokeStyle = "white";
        dc.lineWidth = 20.0;
        level = [];
        var previous = null;
        dc.beginPath();
        for (var i = 0; i < sequence.length; i++) {
            e = sequence[i];
            if (e.node.visible) {
                switch (sequence[i].getCommand()) {

                    case 'moveTo':
                        dc.moveTo(e.node.pos.x, e.node.pos.y);
                        break;
                    case 'lineTo':
                        dc.lineTo(e.node.pos.x, e.node.pos.y);
                        if (previous !== null) {
                            level.push(new PLine(previous, e));
                        }
                        break;
                }
                previous = e;
            }
            else {
                dc.moveTo(e.node.pos.x, e.node.pos.y);
                previous = e;
            }
        }
        dc.stroke();
        dc.translate(goodboi.pos.x, goodboi.pos.y);
    }

    // render nodes
    /*    dc.translate(-goodboi.pos.x, -goodboi.pos.y);
       for (var i = 0; i < nodes.length; i++) {
           if (nodes[i].visible) {
               nodes[i].render(dc);
           }
       }
       dc.translate(goodboi.pos.x, goodboi.pos.y);
    */
    // render goodboi
    d = new PVector(mouse.x, mouse.y);
    d.sub(goodboi.t);
    if (d.mag() > 1) {
        goodboi.v = new PVector(d.x, d.y);
        goodboi.v.normalize();
        goodboi.render(dc, goodboi.v.angle(), 1, 'yellow', null);
    }

    dc.translate(-goodboi.t.x, -goodboi.t.y);


    // render crosshair
    dc.fillStyle = "rgb(200,200,200)";
    dc.fillRect(mouse.x - 8, mouse.y - 1, 6, 2);
    dc.fillRect(mouse.x + 2, mouse.y - 1, 6, 2);
    dc.fillRect(mouse.x - 1, mouse.y - 8, 2, 6);
    dc.fillRect(mouse.x - 1, mouse.y + 2, 2, 6);

    // check collisions
    var collission = false;
    var pfoot = null;
    for (var i = 0; i < level.length; i++) {
        var line = level[i];
        for (var j = 0; j < bullits.length; j++) {
            var b = bullits[j];
            if ((line.contains(b.pos)) && (line.dist(b.pos) < 30.0)) {
                b.reflect(line);
                b.reflected = true;
            }
        }
        if (line.contains(goodboi.pos)) {
            // if (line.intersects(goodboi.previous, goodboi.pos)) {
            //     goodboi.reflect(line);
            // }

            pfoot = line.foot(goodboi.pos);
            pfoot.sub(goodboi.pos);
            if ((line.dist(goodboi.pos) < 20.0) && (!collission)) {
                //goodboi.reflect(line);
                //collission = true;
            }
        }
    }


    // for W - thruster control for goodboi
    if (goodboi.move_key) {
        goodboi.accelerate();
    } else {
        goodboi.deccelerate();
    }
    goodboi.move();

    // fire bullits
    if (auto_fire_trigger != 0) {
        switch (auto_fire_mode % 2) {
            case 0: // single shot
                if (auto_fire_count === 0) {
                    fire_buillit();
                    auto_fire_count = 10;
                }
                break;
            case 1: // auto fire
                if (auto_fire_count === 0) {
                    fire_buillit();
                    auto_fire_count = 1;
                }
                auto_fire_count--;
                break;
        }
    }
}

var bullit_mode = 0;
var auto_fire_trigger = 0;
var auto_fire_mode = 0;
var auto_fire_count = 0;
var bullit_angle = 0;

function fire_buillit() {
    switch (bullit_mode % 6) {
        case 0: // single
            bullits.push(new PBullit(
                goodboi.pos.x,
                goodboi.pos.y,
                goodboi.v.x * 10,
                goodboi.v.y * 10,
                5,
                200,
                "yellow"
            ));
            break;

        case 1:// lazer
            for (var j = 0; j < 10; j++) {
                var vel = 2 + Math.random() * 15;
                bullits.push(new PBullit(
                    goodboi.pos.x,
                    goodboi.pos.y,
                    goodboi.v.x * vel,
                    goodboi.v.y * vel,
                    5,
                    50 + Math.floor(50 * Math.random()),
                    "yellow"
                ));
            }
            break;

        case 2:// shotgun
            for (var j = 0; j < 10; j++) {
                var vel = 2 + Math.random() * 15;
                var ax = 0.2 - 0.4 * Math.random();
                var ay = 0.2 - 0.4 * Math.random();
                bullits.push(new PBullit(
                    goodboi.pos.x,
                    goodboi.pos.y,
                    (goodboi.v.x + ax) * vel,
                    (goodboi.v.y - ay) * vel,
                    5,
                    20 + Math.floor(20 * Math.random()),
                    "yellow"
                ));
            }
            break;

        case 3:// Sol
            for (var j = 0; j < 10; j++) {
                v = PVector.random2D();
                v.mult(2 + Math.random() * 15);
                bullits.push(new PBullit(
                    goodboi.pos.x,
                    goodboi.pos.y,
                    v.x,
                    v.y,
                    5,
                    50 + Math.floor(50 * Math.random()),
                    "yellow"
                ));
            }
            break;

        case 4:// Spiral
            for (var j = 0; j < 3; j++) {
                v = new PVector(Math.cos(bullit_angle), Math.sin(bullit_angle));
                v.mult(2 + Math.random() * 15);
                bullits.push(new PBullit(
                    goodboi.pos.x,
                    goodboi.pos.y,
                    v.x,
                    v.y,
                    5,
                    50 + Math.floor(50 * Math.random()),
                    "yellow"
                ));
                bullit_angle += 0.01;
            }
            break;

        case 5:// shotgun
            var cvel = 10;
            for (var j = 0; j < 10; j++) {
                var vel = cvel + Math.random();
                var ax = 0.2 - 0.4 * Math.random();
                var ay = 0.2 - 0.4 * Math.random();
                bullits.push(new PBullit(
                    goodboi.pos.x,
                    goodboi.pos.y,
                    (goodboi.v.x + ax) * vel,
                    (goodboi.v.y - ay) * vel,
                    25,
                    20 + Math.floor(20 * Math.random()),
                    "red"
                ));
            }
            break;
    }
}

function canvas_keydown(ev) {
    console.log(ev.keyCode);
    switch (ev.keyCode) {
        case 9: // tab
            document.getElementById('help-and-info').style.display = 'none';
            break;
        case 49: // 1
            tmouse = new PVector(mouse.x, mouse.y);
            tmouse.sub(goodboi.t);
            tmouse.add(goodboi.pos);
            entity = new PEntity('moveTo', tmouse);
            found = false;
            for (var j = 0; (j < nodes.length) && (!found); j++) {
                if (nodes[j].center.dist(entity.v) < 20) {
                    entity.node = nodes[j];
                    found = true;
                }
            }
            if (!found) {
                node = new PNode(entity.v);
                entity.node = node;
                nodes.push(node);
            }
            sequence.push(entity);
            break;
        case 50: // 2
            tmouse = new PVector(mouse.x, mouse.y);
            tmouse.sub(goodboi.t);
            tmouse.add(goodboi.pos);
            entity = new PEntity('lineTo', tmouse);
            found = false;
            for (var j = 0; (j < nodes.length) && (!found); j++) {
                if (nodes[j].center.dist(entity.v) < 20) {
                    entity.node = nodes[j];
                    found = true;
                }
            }
            if (!found) {
                node = new PNode(entity.v);
                entity.node = node;
                nodes.push(node);
            }
            sequence.push(entity);
            break;

        case 51: // 3
            build_level();
            break;
        case 52: // 4
            console.log("level.length: " + level.length);
            console.log("nodes.length: " + nodes.length);
            break;
        case 40: // DOWN
            goodboi.pos.y += 250;
            break;
        case 38: // up
            goodboi.pos.y -= 250;
            break;
        case 37: // LEFT:
            goodboi.pos.x -= 250;
            break;
        case 39: // RIGHT:
            goodboi.pos.x += 250;
            break;
        case 81: // toggle bullit mode
            bullit_mode++;
            break;
        case 65: // toggle auto fire mode
            auto_fire_mode++;
            break;
        case 87: // w
            goodboi.move_key = true;
            break;

    }
}

function canvas_keyup(ev) {
    switch (ev.keyCode) {
        case 87: // w
            goodboi.move_key = false;
            break;
    }
}

function canvas_click(ev) {
}

function canvas_mouseup(ev) {
    auto_fire_trigger = 0;
}

function canvas_mousedown(ev) {
    auto_fire_trigger = 1;
    auto_fire_count = 0;
}

function canvas_mousemove(ev) {
    mouse.set(ev.offsetX, ev.offsetY);
}

// ===================================================
// Main - Program starts here
// ===================================================


const level_scale = 150;
const canvas = document.querySelector("canvas");
const width = canvas.width = window.innerWidth - 10;
const height = canvas.height = window.innerHeight - 10;
const dc = canvas.getContext("2d");
goodboi.t.set(width / 2, height / 2);

init_level();
build_level();
canvas.oncontextmenu = function (e) {
    e.preventDefault();
};
document.addEventListener("keydown", canvas_keydown, false);
document.addEventListener("keyup", canvas_keyup, false);
window.setInterval(animateloop, 1000 / 60);

