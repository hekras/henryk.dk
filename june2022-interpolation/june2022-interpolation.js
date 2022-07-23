/**
 *
 * @author Henryk Krasuski 
 * @date 2022-02-11
 *
 */


// ===================================================
// Animate interrupt
// ===================================================

var tick = 0;
var statemachine = 0;
var heart_buffer;
var heart_array = [];

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function letter(array, str, yoff) {
    dc.fillStyle = "black";
    dc.fillRect(0, 0, 1000, 150);
    dc.strokeStyle = "white";
    dc.fillStyle = "white";
    dc.lineWidth = 1.0;
    dc.font = "100px arial";
    dc.fillText(str, 0, 110);
    //    dc.fillText(str, 0,99);
    for (y = 0; y < 150; y+=4) {
        for (x = 0; x < 1000; x+=4) {
            if (dc.getImageData(x, y, 1, 1).data[0]) {
                array.push(new PVector(x*2 - 5 * 15 * str.length, y*2 + yoff));
            }
        }
    }

//    shuffle(array);
    //    alert(JSON.stringify(arr));
}

function squiggle(arr) {
    var t = 40 * Math.sin(tick / 60);
    var u = 20 * Math.sin(tick / 120);
    var z = 300;
    for (var ang = 0; ang < 6.26; ang += 6.28 / 600) {
        var x = z * Math.cos(ang) + 40 * Math.cos(ang * 6) + 40 * Math.cos(ang * 20);
        var y = -z * Math.sin(ang) - 40 * Math.sin(ang * 6) + 40 * Math.sin(ang * 20);
        arr.push(new PVector(x, y));
    }
}

var array_aa = [];
var array_ab = [];
var array_ba = [];
var array_bb = [];
var array_ca = [];
var array_cb = [];
var array_da = [];
var array_db = [];

function aline(arr, x1, y1, x2, y2, s) {
    for (i = 0; i < s; i++) {
        var b = i / s;
        var x = x1 * (1 - b) + x2 * b;
        var y = y1 * (1 - b) + y2 * b;
        arr.push(new PVector(x, y));
    }
}

function animate_array(from_array, to_array, color, d) {
    dc.fillStyle = color;

    dc.save();
    dc.translate(width / 2, height / 2);
    dc.beginPath();
    if (from_array.length > to_array.length) {
        for (var i = 0; i < from_array.length; i++) {
            var bi = Math.floor(to_array.length * i / from_array.length);
            dc.moveTo(from_array[i].x * (1 - d) + to_array[bi].x * d, from_array[i].y * (1 - d) + to_array[bi].y * d);
            dc.arc(from_array[i].x * (1 - d) + to_array[bi].x * d, from_array[i].y * (1 - d) + to_array[bi].y * d, 3, 0, 6.28);
        }
    }
    else {
        for (var i = 0; i < to_array.length; i++) {
            var ai = Math.floor(from_array.length * i / to_array.length);
            dc.moveTo(from_array[ai].x * (1 - d) + to_array[i].x * d, from_array[ai].y * (1 - d) + to_array[i].y * d);
            dc.arc(from_array[ai].x * (1 - d) + to_array[i].x * d, from_array[ai].y * (1 - d) + to_array[i].y * d, 3, 0, 6.28);
        }
    }
    dc.closePath();
    dc.fill();
    dc.restore();
}

function render_array(array, color) {
    dc.fillStyle = color;

    dc.save();
    dc.translate(width / 2, height / 2);
    dc.beginPath();
    for (var i = 0; i < array.length; i++) {
        dc.moveTo(array[i].x, array[i].y);
        dc.arc(array[i].x, array[i].y, 3, 0, 6.28);
    }
    dc.closePath();
    dc.fill();
    dc.restore();
}

function tracelog(str) {
    dc.fillStyle = "white";
    dc.strokeStyle = "white";
    dc.lineWidth = 1.0;
    dc.font = "28px arial";
    //    var xpos=width - (tick%(width*1.4));
    var xpos = 10;//(width - 400) / 2 + width * Math.sin(tick / 60) / 2;
    dc.fillText(str, xpos, 48);
//    dc.strokeText(str, xpos, 48);
}

const ppp = 200;

function animateloop() {
    switch (statemachine) {
        case 0:
            array_aa = [];
            var xxx = 0.4 * width;
            var yyy = 0.4 * height;
            var ss = 150;
            aline(array_aa,xxx,yyy,xxx,-yyy,ss);
            aline(array_aa,xxx,-yyy,-xxx,-yyy,ss);
            aline(array_aa,-xxx,-yyy,-xxx,yyy,ss);
            aline(array_aa,-xxx,yyy,xxx,yyy,ss);

            array_ab = [];
            for(var ang=0;ang<6.28;ang+=6.28/600){
                array_ab.push(new PVector(xxx*Math.cos(ang-3.14/4),-yyy*Math.sin(ang-3.14/4)));
            }

            array_ba = [];
            var xxx = 0.4 * width;
            var yyy = 0.4 * height;
            var ss = 150;
            aline(array_ba,xxx,yyy,xxx,-yyy,ss);
            aline(array_ba,xxx,-yyy,-xxx,-yyy,ss);
            aline(array_ba,-xxx,-yyy,-xxx,yyy,ss);
            aline(array_ba,-xxx,yyy,xxx,yyy,ss);
            shuffle(array_ba);

            array_bb = [];
            var r1 = 0.4*height;
            var r2 = 0.1*height;
            ss = 600/14;
            var delta_ang=6.28/12;
            for(var ang=0;ang<6.28;ang+=2*delta_ang){
                var x1 = r1 * Math.cos(ang);
                var y1 = -r1 * Math.sin(ang);
                var x2 = r2 * Math.cos(ang+delta_ang);
                var y2 = -r2 * Math.sin(ang+delta_ang);
                var x3 = r1 * Math.cos(ang+2*delta_ang);
                var y3 = -r1 * Math.sin(ang+2*delta_ang);
                aline(array_bb,x1,y1,x2,y2,ss);
                aline(array_bb,x2,y2,x3,y3,ss);
            }

            tick=0;
            statemachine++;
            break;
        case 1:
            dc.clearRect(0, 0, width, height);
            animate_array(array_aa, array_ab, "red", 0.5 + 0.5 * Math.cos(3.14 * tick / ppp));
            if (tick>ppp){
                 statemachine++;
                 tick=0;
            }
            break;
        case 2:
            dc.clearRect(0, 0, width, height);
            animate_array(array_ab, array_aa, "red", 0.5 + 0.5 * Math.cos(3.14 * tick / ppp));
            if (tick>ppp){
                statemachine++;
                tick=0;
            }
           break;
        case 3:
            dc.clearRect(0, 0, width, height);
            animate_array(array_aa, array_ab, "red", 0.5 + 0.5 * Math.cos(3.14 * tick / ppp));
            if (tick>ppp){
                statemachine++;
                tick=0;
            }
           break;
        case 4:
            dc.clearRect(0, 0, width, height);
            animate_array(array_ab, array_ba, "red", 0.5 + 0.5 * Math.cos(3.14 * tick / ppp));
            if (tick>ppp){
                statemachine++;
                tick=0;
            }
           break;
        case 5:
            dc.clearRect(0, 0, width, height);
            animate_array(array_bb, array_ab, "red", 0.5 + 0.5 * Math.cos(3.14 * tick / ppp));
            if (tick>ppp){
                statemachine++;
                tick=0;
            }
           break;
        case 6:
            dc.clearRect(0, 0, width, height);
            animate_array(array_aa, array_bb, "red", 0.5 + 0.5 * Math.cos(3.14 * tick / ppp));
            if (tick>ppp){
                statemachine=2;
                tick=0;
            }
           break;
        default:
            dc.fillStyle = "white";
            dc.strokeStyle = "white";
            dc.lineWidth = 1.0;
            dc.font = "100px arial";
            var xpos = 600;//(width - 400) / 2 + width * Math.sin(tick / 60) / 2;
            var str="0";
//            dc.fillText(str, xpos, 148);
//            dc.strokeText(str, xpos, 148);
        
        }
    tracelog("statemachine:" + statemachine + "  tick:" + tick);
    tick++;
}

function canvas_keyup(ev) {
    switch (ev.keyCode) {
        case 87: // w
            // goodboi.move_key = false;
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

/**
 * PVector class
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

// ===================================================
// Main - Program starts here
// ===================================================

const canvas = document.querySelector("canvas");
const width = canvas.width = window.innerWidth - 10;
const height = canvas.height = window.innerHeight - 10;
const dc = canvas.getContext("2d");
var mouse = new PVector(0, 0);

canvas.oncontextmenu = function (e) {
    e.preventDefault();
};
//document.addEventListener("keydown", canvas_keydown, false);
//document.addEventListener("keyup", canvas_keyup, false);
window.setInterval(animateloop, 1000 / 60);


