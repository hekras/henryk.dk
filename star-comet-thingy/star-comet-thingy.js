/**
 *
 * @author Henryk Krasuski 
 * @date 2022-03-07
 *
 */


// ===================================================
// Animate interrupt
// ===================================================

const sz=20; // mesh size
const sr=9; // mesh size

var tick=0;
var statemachine=0;
var items=[];
var ang_tick=0;

function initItems(){
    for(var a=0;a<100;a++){
        ang = 2*Math.PI*Math.random();
        r = 1 + 5*Math.random();
        items.push({
            x:width*Math.random(), 
            y:height*Math.random(),
            dx:r*Math.cos(ang),
            dy:r*Math.sin(ang),
            ang:Math.floor(640*Math.random()),
            t:5+Math.floor(25*Math.random())
        });
    }
}

function render_text(x, y, str, scale, colorA, colorB) {
    var grad = dc.createLinearGradient(0,y,0,y+scale);
    grad.addColorStop(0, colorA);
    grad.addColorStop(1, colorB);
    dc.fillStyle = grad;
    dc.strokeStyle = "white";
    dc.lineWidth = 2.0;
    dc.font = scale + "px Bebas Neue";
    dc.fillText(str, x, y+scale);
    dc.strokeText(str, x, y+scale);
}

function hypno_demoloop() {
    canvas.style.background = 'black';
    dc.clearRect(0, 0, width, height);

    dc.beginPath();
    items.forEach(item => {
        var r1 = 0.015*((width>height) ? height: width);
        var start_ang = 3.14*Math.sin((tick+item.ang)/150);
        var ang=2*Math.PI+start_ang;
        dc.moveTo(item.x+r1*Math.cos(ang),item.y-r1*Math.sin(ang));
        for(var a=0;a<15;a+=2){
            var ang=2*Math.PI*a/14+start_ang;
            dc.lineTo(item.x+r1*Math.cos(ang),item.y-r1*Math.sin(ang));
            var ang=2*Math.PI*(a+1)/14+start_ang;
            dc.lineTo(item.x+r1*0.5*Math.cos(ang),item.y-r1*0.5*Math.sin(ang));
        }
        item.x += item.dx;
        item.y += item.dy;
        item.t--;
        if ((item.y<0)||(item.x<0)||(item.y>height)||(item.x>width)||(item.t<0)){
            item.x=width/2+width*0.3*Math.cos((tick+ang_tick)/50);
            item.y=height/2+height*0.3*Math.sin((tick+ang_tick)/50);
            ang = 2*Math.PI*Math.random();
            r = 1 + 5*Math.random();
            item.dx=r*Math.cos(ang);
            item.dy=r*Math.sin(ang);
            item.t=5+Math.floor(50*Math.random());
            ang_tick++;
        }
    });
    dc.lineWidth = 2;
    dc.strokeStyle = "white";
    dc.stroke();
//    render_text((width-300)/2,10,"henryk.dk",98, "red", "yellow");
}



function animateloop(){
    hypno_demoloop();
    tick++;
}

// ===================================================
// Main - Program starts here
// ===================================================

const canvas = document.querySelector("canvas");
const width = canvas.width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);;
const height = canvas.height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
canvas.style.backgroundColor = 'white';
const dc = canvas.getContext("2d");

canvas.oncontextmenu = function (e) {
    e.preventDefault();
};
initItems();
window.setInterval(animateloop, 1000 / 60);


