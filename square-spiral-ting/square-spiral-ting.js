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

    dc.save();
    var grad = dc.createLinearGradient(0,0,0,height);
    grad.addColorStop(0, "rgb(255,0,0)");
    grad.addColorStop(1, "rgb(0,0,255)");
    dc.strokeStyle = "white";
    dc.lineWidth = 2;
    dc.beginPath();
    var radius=10;
    var delta_radius=20 + 15*Math.sin(tick/32);
    var ang = tick/20;// 6.28 + 6.28*Math.sin(tick/150);
    var ang2 = tick/150;//0.5*Math.sin(tick/150);
    var delta_ang=0.3*Math.sin(tick/500);
    for (var t=1;t<30;t++){
        radius = t*20;
        var off = 15*Math.cos(ang+t*0.5)
        var x1 = radius*Math.cos(ang2) + off;
        var y1 = radius*Math.sin(ang2) + off;
        dc.moveTo(width/2+x1,height/2+y1);
        dc.lineTo(width/2+y1,height/2-x1);
        dc.lineTo(width/2-x1,height/2-y1);
        dc.lineTo(width/2-y1,height/2+x1);
        dc.lineTo(width/2+x1,height/2+y1);
//        ang += delta_ang;
//        radius += delta_radius;
    }
    dc.fillStyle = 'blue';
//    dc.fill('evenodd');
    dc.stroke();
    dc.restore();

/*    dc.beginPath();
    var r1 = 0.7*((width>height) ? height: width);
    var start_ang = 3.14*Math.sin(tick/320);
    var ang=2*Math.PI+start_ang;
    dc.moveTo(width/2+r1*Math.cos(ang),height/2-r1*Math.sin(ang));
    for(var a=0;a<15;a+=2){
        var ang=2*Math.PI*a/14+start_ang;
        dc.lineTo(width/2+r1*Math.cos(ang),height/2-r1*Math.sin(ang));
        var ang=2*Math.PI*(a+1)/14+start_ang;
        dc.lineTo(width/2+r1*0.5*Math.cos(ang),height/2-r1*0.5*Math.sin(ang));
    }
    dc.lineWidth = 2;
    dc.fillStyle = 'black';
    dc.moveTo(-5,-5);
    dc.lineTo(width+5,-5);
    dc.lineTo(width+5,height+5);
    dc.lineTo(-5,height+5);
    dc.lineTo(-5,-5);
    dc.fill('evenodd');    

    var grad = dc.createLinearGradient(0,0,0,height);
    grad.addColorStop(0, "rgb(255,0,0)");
    grad.addColorStop(1, "rgb(0,0,255)");
    dc.strokeStyle = grad;
    dc.stroke();
*/
//    render_text((width-300)/2,10,"henryk.dk",98, "red", "yellow");
}

function hypno_demoloop_square_2_star() {
    canvas.style.background = 'black';
    dc.clearRect(0, 0, width, height);

    dc.save();
    var grad = dc.createLinearGradient(0,0,0,height);
    grad.addColorStop(0, "rgb(255,0,0)");
    grad.addColorStop(1, "rgb(0,0,255)");
    dc.strokeStyle = "white";
    dc.lineWidth = 2;
    dc.beginPath();
    var radius=10;
    var delta_radius=20 + 15*Math.sin(tick/32);
    var ang=6.28 + 6.28*Math.sin(tick/350);
    var delta_ang=0.3*Math.sin(tick/500);
    for (var t=0;t<20;t++){
 //       radius = ang*5;
        var x1 = radius*Math.cos(ang+Math.PI/4);
        var y1 = radius*Math.sin(ang+Math.PI/4);
        dc.moveTo(width/2+x1,height/2+y1);
        dc.lineTo(width/2+y1,height/2-x1);
        dc.lineTo(width/2-x1,height/2-y1);
        dc.lineTo(width/2-y1,height/2+x1);
        dc.lineTo(width/2+x1,height/2+y1);
        ang += delta_ang;
        radius += delta_radius;
    }
    dc.fillStyle = 'blue';
    dc.stroke();
    dc.restore();

/*    dc.beginPath();
    var r1 = 0.7*((width>height) ? height: width);
    var start_ang = 3.14*Math.sin(tick/320);
    var ang=2*Math.PI+start_ang;
    dc.moveTo(width/2+r1*Math.cos(ang),height/2-r1*Math.sin(ang));
    for(var a=0;a<15;a+=2){
        var ang=2*Math.PI*a/14+start_ang;
        dc.lineTo(width/2+r1*Math.cos(ang),height/2-r1*Math.sin(ang));
        var ang=2*Math.PI*(a+1)/14+start_ang;
        dc.lineTo(width/2+r1*0.5*Math.cos(ang),height/2-r1*0.5*Math.sin(ang));
    }
    dc.lineWidth = 2;
    dc.fillStyle = 'black';
    dc.moveTo(-5,-5);
    dc.lineTo(width+5,-5);
    dc.lineTo(width+5,height+5);
    dc.lineTo(-5,height+5);
    dc.lineTo(-5,-5);
    dc.fill('evenodd');    

    var grad = dc.createLinearGradient(0,0,0,height);
    grad.addColorStop(0, "rgb(255,0,0)");
    grad.addColorStop(1, "rgb(0,0,255)");
    dc.strokeStyle = grad;
    dc.stroke();
*/
//    render_text((width-300)/2,10,"henryk.dk",98, "red", "yellow");
}

function saved_hypno_demoloop() {
    canvas.style.background = 'black';
    dc.clearRect(0, 0, width, height);

    dc.save();
    var grad = dc.createLinearGradient(0,0,0,height);
    grad.addColorStop(0, "rgb(255,0,0)");
    grad.addColorStop(1, "rgb(0,0,255)");
    dc.strokeStyle = grad;
    dc.lineWidth = 2;
    dc.beginPath();
    var radius=0;
    var ang=6.28 + 6.28*Math.sin(tick/150);
    var delta_ang=Math.PI/(2+1*Math.sin(tick/500));
    for (var t=0;t<100;t++){
        radius = ang*5;
        var x = width/2 + radius*Math.cos(ang);
        var y = height/2 - radius*Math.sin(ang);
        dc.lineTo(x,y);
        ang += delta_ang;
    }
    dc.stroke();
    dc.restore();

    dc.beginPath();
    var r1 = 0.7*((width>height) ? height: width);
    var start_ang = 3.14*Math.sin(tick/320);
    var ang=2*Math.PI+start_ang;
    dc.moveTo(width/2+r1*Math.cos(ang),height/2-r1*Math.sin(ang));
    for(var a=0;a<15;a+=2){
        var ang=2*Math.PI*a/14+start_ang;
        dc.lineTo(width/2+r1*Math.cos(ang),height/2-r1*Math.sin(ang));
        var ang=2*Math.PI*(a+1)/14+start_ang;
        dc.lineTo(width/2+r1*0.5*Math.cos(ang),height/2-r1*0.5*Math.sin(ang));
    }
    dc.lineWidth = 2;
    dc.fillStyle = 'black';
    dc.moveTo(-5,-5);
    dc.lineTo(width+5,-5);
    dc.lineTo(width+5,height+5);
    dc.lineTo(-5,height+5);
    dc.lineTo(-5,-5);
    dc.fill('evenodd');    

    var grad = dc.createLinearGradient(0,0,0,height);
    grad.addColorStop(0, "rgb(255,0,0)");
    grad.addColorStop(1, "rgb(0,0,255)");
    dc.strokeStyle = grad;
    dc.stroke();

    render_text((width-300)/2,10,"henryk.dk",98, "red", "yellow");
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
window.setInterval(animateloop, 1000 / 60);


