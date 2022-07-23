/**
 *
 * @author Henryk Krasuski 
 * @date 2022-02-11
 *
 */


// ===================================================
// Animate interrupt
// ===================================================

var tick=0;
var statemachine=0;
var heart_buffer;
var heart_array=[];

function render_heart(x, y, angle){
    dc.save();
    dc.translate(x,y);
    dc.rotate(angle);
    dc.drawImage(heart_buffer, -30, -30);
    dc.restore();
}

function render_blowing_hearts(){
    for(var i=0;i<heart_array.length;i++){
        render_heart(heart_array[i].pos.x,heart_array[i].pos.y,heart_array[i].angle);
        heart_array[i].pos.add(heart_array[i].delta);
        if ((heart_array[i].pos.x>width)||(heart_array[i].pos.y>height)){
            if (Math.random()<0.5){
                heart_array[i].pos.x = 0;
                heart_array[i].pos.y = Math.random()*height;
            }
            else{
                heart_array[i].pos.x = Math.random()*width;
                heart_array[i].pos.y = 0;
            }
            heart_array[i].delta= new PVector( 1+Math.random()*3, 1+Math.random()*5);
        }
        heart_array[i].angle += heart_array[i].delta_angle;
    }
}

function init_blowing_hearts(){
    heart_buffer = document.createElement("canvas");
    heart_buffer.width = 60;
    heart_buffer.height = 60;
    var tdc = heart_buffer.getContext("2d");
    var xoffset=30;
    var yoffset=30;
    tdc.strokeStyle = tdc.fillStyle = "pink";
    var grad = dc.createLinearGradient(0,0,60,60);
    grad.addColorStop(0, "red");
    grad.addColorStop(1, "pink");
    tdc.fillStyle = grad;
    var dmyt = 6.0 / 300.0;
    var sinmyt = Math.sin(-3);
    tdc.lineWidth = 1.0;
    tdc.beginPath();
    tdc.moveTo(xoffset+18 * sinmyt *sinmyt *sinmyt, 
        yoffset-(14 * Math.cos(myt) - 5 * Math.cos(2 * myt) - 3 * Math.cos(3 * myt) - Math.cos(4 * myt)));
//        dc.moveTo(xoffset,yoffset);
    for(var myt = -3;myt < 3.1;myt += dmyt){
        sinmyt = Math.sin(myt);
        tdc.lineTo(xoffset+18 * sinmyt *sinmyt *sinmyt, 
                  yoffset-(14 * Math.cos(myt) - 5 * Math.cos(2 * myt) - 3 * Math.cos(3 * myt) - Math.cos(4 * myt)));
    }
    tdc.closePath();
    tdc.stroke();
    tdc.fill()

    for(var i=0;i<50;i++){
        heart_array[i] = {
                          pos: new PVector( Math.random()*width, Math.random()*height),
                          delta: new PVector( 1+Math.random()*3, 1+Math.random()*5),
                          angle: Math.random()*0.2 - 0.1,
                          delta_angle: Math.random()*0.2 - 0.1
                        };
    }
}

function render_pointer(){
    // render crosshair
    dc.fillStyle = "rgb(200,200,200)";
    dc.fillRect(mouse.x - 8, mouse.y - 1, 6, 2);
    dc.fillRect(mouse.x + 2, mouse.y - 1, 6, 2);
    dc.fillRect(mouse.x - 1, mouse.y - 8, 2, 6);
    dc.fillRect(mouse.x - 1, mouse.y + 2, 2, 6);
}

function animated_heart(){
    var grad = dc.createLinearGradient(0,0,0,height);
    grad.addColorStop(0, "red");
    grad.addColorStop(1, "pink");
    dc.fillStyle = grad;

    var dmyt = 6.0 / 150.0;
    var xoffset = width/2;
    var yoffset = height/2;
    var scale = 25+5*Math.sin(tick/60);
    var sinmyt = Math.sin(-3);
    dc.beginPath();
    dc.moveTo(xoffset+scale * 18 * sinmyt *sinmyt *sinmyt, 
        yoffset-scale * (14 * Math.cos(myt) - 5 * Math.cos(2 * myt) - 3 * Math.cos(3 * myt) - Math.cos(4 * myt)));
//        dc.moveTo(xoffset,yoffset);
    for(var myt = -3;myt < 3.1;myt += dmyt){
        sinmyt = Math.sin(myt);
        scale = 25+5*Math.sin(myt+tick/60);
        dc.lineTo(xoffset+scale * 18 * sinmyt *sinmyt *sinmyt, 
                  yoffset-scale * (14 * Math.cos(myt) - 5 * Math.cos(2 * myt) - 3 * Math.cos(3 * myt) - Math.cos(4 * myt)));
    }
    dc.closePath();
    dc.fill()
}

function animated_scroller(){
    var grad = dc.createLinearGradient(0,0,0,98);
    grad.addColorStop(0, "red");
    grad.addColorStop(1, "yellow");
    dc.fillStyle = grad;
    dc.strokeStyle = "white";
    dc.lineWidth = 2.0;
    dc.font = "98px arial";
    var str = "henryk.dk";
//    var xpos=width - (tick%(width*1.4));
    var xpos=(width-400)/2 + width*Math.sin(tick/60)/2;
    dc.fillText(str, xpos, 98);
    dc.strokeText(str, xpos, 98);
}

function animateloop() {
    dc.clearRect(0, 0, width, height);
    switch(statemachine){
        case 0:
            init_blowing_hearts();
            statemachine++;
            break;
        case 1:
            animated_scroller();
            render_blowing_hearts();
            animated_heart();
        }
    render_pointer();
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


