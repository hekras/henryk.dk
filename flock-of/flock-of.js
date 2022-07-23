/**
 *
 * @author Henryk Krasuski aka oldhandmixer
 * Flock of dots
 *
 */
class PVector {

    constructor(x_, y_) {
        this.x = x_;
        this.y = y_;
    }

    static sub(v, u) {
        return new PVector(v.x - u.x, v.y - u.y);
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

/**
 * Particle class
 */
class PParticle {

    constructor() {
        this.loc = new PVector(width / 2, height / 2);
        this.vel = new PVector(5 * Math.random(), 5 * Math.random());
        this.col = 'rgb(' + Math.trunc(255 * Math.random()) + ', ' +
            Math.trunc(255 * Math.random()) + ', ' +
            Math.trunc(255 * Math.random()) + ')';
    }

    update() {
        var dir = PVector.sub(gloc, this.loc);
        dir.normalize();
        dir.mult(Math.random() * 0.51);
        this.acc = dir;
        this.vel.add(this.acc);
        this.vel.limit(12);
        this.loc.add(this.vel);
    }

    checkEdges() {
        if (this.loc.x > width) {
            this.loc.x = 0;
        } else if (this.loc.x < 0) {
            this.loc.x = width;
        }

        if (this.loc.y > height) {
            this.loc.y = 0;
        } else if (this.loc.y < 0) {
            this.loc.y = height;
        }
    }

    display(dc) {
        dc.fillStyle = this.col;
        dc.beginPath();
        dc.arc(this.loc.x, this.loc.y, 5, 0, 6.28);
        dc.fill();
    }
}


// ======================================================
// ======================================================
// ======================================================

function animateloop() {
    dc.clearRect(0, 0, width, height);
    /*
        dc.fillStyle = 'blue';
        dc.beginPath();
        dc.arc(gloc.x, gloc.y, 10, 0, 6.28);
        dc.fill();
    */
    var gacc = PVector.random2D();
    gvel.add(gacc);
    gvel.limit(10);
    gloc.add(gvel);

    if ((gloc.x > width) || (gloc.x < 0)) {
        gvel.x *= -1;
    }

    if ((gloc.y > height) || (gloc.y < 0)) {
        gvel.y *= -1;
    }

    for (i = 0; i < ppp.length; i++) {
        ppp[i].display(dc);
        ppp[i].update();
    }
}

function canvas_mousemove(ev) {
    gloc.set(ev.offsetX, ev.offsetY);
}


// ===================================================
// Main - Program starts here
// ===================================================


const canvas = document.querySelector("canvas");
const width = canvas.width = window.innerWidth - 10;
const height = canvas.height = window.innerHeight - 10;
const dc = canvas.getContext("2d");

var gloc = new PVector(width / 2, height / 2);
var gvel = new PVector(0, 0);
var ppp = [];

for (i = 0; i < 1000; i++) {
    ppp.push(new PParticle());
}

canvas.oncontextmenu = function (e) {
    e.preventDefault();
};
window.setInterval(animateloop, 1000 / 60);
