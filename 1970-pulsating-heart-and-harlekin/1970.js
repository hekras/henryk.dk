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

function heart_fade_in() {
    dc.clearRect(0, 0, width, height);

    if (tick>600){
        statemachine=1;
    }
    dc.lineWidth = 5;
    var grad = dc.createLinearGradient(0,0,0,height);
    var r = 255*tick/601;
    grad.addColorStop(0, 'rgb('+r+',0,0)');
    grad.addColorStop(1, 'rgb('+r+','+r+','+r+')');
    canvas.style.background = 'rgb('+r+','+r+','+r+')';
    dc.fillStyle = grad;
    render_heart()
}

function heart_demoloop() {
    dc.clearRect(0, 0, width, height);
    if (tick>1500){
        statemachine=2;
    }
    var grad = dc.createLinearGradient(0,0,0,height);
    grad.addColorStop(0, 'red');
    grad.addColorStop(1, 'white');
    dc.fillStyle = grad;
    render_heart()
}

function heart_fade_out() {
    dc.clearRect(0, 0, width, height);

    if (tick>1800){
        statemachine=3;
    }
    dc.lineWidth = 5;
    var grad = dc.createLinearGradient(0,0,0,height);
    var r = 255-255*(tick-1500)/300;
    grad.addColorStop(0, 'rgb('+r+',0,0)');
    grad.addColorStop(1, 'rgb('+r+','+r+','+r+')');
    canvas.style.background = 'rgb('+r+','+r+','+r+')';
    dc.fillStyle = grad;
    render_heart()
}


function render_heart() {
    dc.clearRect(0, 0, width, height);
    if (tick>3600){
        statemachine=2;
    }

    dc.save();
    dc.lineWidth = 5;
    dc.beginPath();

    var t=2*Math.PI*Math.sin(tick/160);
    var x=-height;
    var u=x+height;
    for (;x<width;){
        b =  sz+sr*Math.sin(t);
        x += b;
        u += b;
        t+=0.1;
        dc.lineTo(x, 0);
        dc.lineTo(u, height);
        b =  sz+sr*Math.sin(t);
        x += b;
        u += b;
        t+=0.1;
        dc.lineTo(u, height);
        dc.lineTo(x, 0);
    }
    
    var t=2*Math.PI*Math.sin(tick/160);
    var x=3*height;
    var u=x-height;
    for (;x>-width;){
        b =  sz+sr*Math.sin(t);
        x -= b;
        u -= b;
        t+=0.1;
        dc.lineTo(x, 0);
        dc.lineTo(u, height);
        b =  sz+sr*Math.sin(t);
        x -= b;
        u -= b;
        t+=0.1;
        dc.lineTo(u, height);
        dc.lineTo(x, 0);
    }

    dc.fill('evenodd');
    dc.restore();

    dc.beginPath();
    var t = tick/68;
    var dmyt = 6.0 / 60.0;
    var myt = -3.5;
    var x0 = 18 * Math.pow(Math.sin(myt), 3);
    var y0 = 14 * Math.cos(myt) - 5 * Math.cos(2 * myt) - 3 * Math.cos(3 * myt) - Math.cos(4 * myt);
    for (var myt = -3.5; myt < 3; myt += dmyt) {
        x = width/2 + (15+3*Math.sin(t))*(18 * Math.pow(Math.sin(myt), 3));
        y = height/2 - (15+3*Math.sin(t))*(14 * Math.cos(myt) - 5 * Math.cos(2 * myt) - 3 * Math.cos(3 * myt) - Math.cos(4 * myt));
        t +=0.1;
        dc.lineTo(x, y);
    }
    dc.moveTo(0,0);
    dc.lineTo(width,0);
    dc.lineTo(width,height);
    dc.lineTo(0,height);
    dc.lineTo(0,0);
    dc.fillStyle = 'black';
    dc.fill('evenodd');

    render_text((width-300)/2,10,"henryk.dk",98, "red", "yellow");

}

function hypno_fadein() {
    var r=255*tick/300;
    statemachine = (tick<300) ? 4 : 5;
    hypno_demoloop(r);
}

function hypno_demo() {
    statemachine = (tick<1200) ? 5 : 6;
    hypno_demoloop(255);
}

function hypno_fadeout() {
    var r=255-255*(tick-1200)/300;
    if (tick>1500){
        statemachine=7;
    }
    hypno_demoloop(r);
}

function hypno_demoloop(r) {
    canvas.style.background = 'black';
    dc.clearRect(0, 0, width, height);

    dc.save();
    dc.strokeStyle = "rgb("+r+","+r+","+r+")";
    dc.lineWidth = 5;
    dc.beginPath();
    var t=2*Math.PI*Math.sin(tick/160);
    var u=2*Math.PI*Math.sin(tick/60);
    var x=0;
    for (;x<3*width/4;){
        x += 20+9*Math.sin(t);
        t+=0.1;
        u+=0.05;
        dc.moveTo(width/2+x+29*Math.sin(u),height/2+29*Math.cos(u));
        dc.arc(width/2+29*Math.sin(u),height/2+29*Math.cos(u),x,0,2*Math.PI);
    }
    dc.stroke();
    dc.restore();

    dc.beginPath();
    var r1 = 0.45*((width>height) ? height: width);
    var start_ang = tick/100;
    var ang=2*Math.PI+start_ang;
    dc.moveTo(width/2+r1*Math.cos(ang),height/2-r1*Math.sin(ang));
    for(var a=0;a<15;a+=2){
        var ang=2*Math.PI*a/14+start_ang;
        dc.lineTo(width/2+r1*Math.cos(ang),height/2-r1*Math.sin(ang));
        var ang=2*Math.PI*(a+1)/14+start_ang;
        dc.lineTo(width/2+r1*0.5*Math.cos(ang),height/2-r1*0.5*Math.sin(ang));
    }
    dc.lineWidth = 5;
    dc.fillStyle = 'black';
    dc.moveTo(-5,-5);
    dc.lineTo(width+5,-5);
    dc.lineTo(width+5,height+5);
    dc.lineTo(-5,height+5);
    dc.lineTo(-5,-5);
    dc.fill('evenodd');    

    dc.strokeStyle = "rgb("+r+",0,0)";
    dc.stroke();

    render_text((width-300)/2,10,"henryk.dk",98, "red", "yellow");
}



function squiggle_fade_in() {
    dc.clearRect(0, 0, width, height);

    if (tick>600){
        statemachine=9;
    }
    var grad = dc.createLinearGradient(0,0,0,height);
    var r = 255*tick/601;
    grad.addColorStop(0, 'rgb('+r+',0,0)');
    grad.addColorStop(1, 'rgb('+r+','+r+',0)');
    dc.fillStyle = grad;
    squiggle()
}

function squiggle_demoloop() {
    dc.clearRect(0, 0, width, height);
    if (tick>1500){
        statemachine=10;
    }
    var grad = dc.createLinearGradient(0,0,0,height);
    grad.addColorStop(0, 'red');
    grad.addColorStop(1, 'yellow');
    dc.fillStyle = grad;
    squiggle()
}

function squiggle_fade_out() {
    dc.clearRect(0, 0, width, height);

    if (tick>1800){
        statemachine=0;
        tick=-1;
    }
    var grad = dc.createLinearGradient(0,0,0,height);
    var r = 255-255*(tick-1500)/300;
    grad.addColorStop(0, 'rgb('+r+',0,0)');
    grad.addColorStop(1, 'rgb('+r+','+r+',0)');
    dc.fillStyle = grad;
    squiggle()
}

function squiggle(){
    dc.beginPath();
    var ang = tick/60;
    var t= 40*Math.sin(tick/60);
    var u= 20*Math.sin(tick/120);
    var z= height*Math.sin(tick/600)/2;
    for(var a=0;a<300;a++){
        var x = width/2 + z * Math.cos(ang) + 40 * Math.cos(ang*6) + u * Math.cos(ang*20);
        var y = height/2 -z * Math.sin(ang) - t * Math.sin(ang*6) + 20 * Math.sin(ang*20);
        var r = 15 + 12*Math.sin(ang);
        ang += 0.01;
        dc.moveTo(x,y);
        dc.arc(x,y,r,0,6.28);
    }
    dc.fill();    

    render_text((width-300)/2,10,"henryk.dk",98, "red", "yellow");
}

function animateloop(){
        switch(statemachine){
        case 0:
            heart_fade_in();
            break;
        case 1:
            heart_demoloop()
            break;
        case 2:
            heart_fade_out();
            break;
        case 3:
            tick=-1;
            statemachine = 4;
            break;
        case 4:
            hypno_fadein();
            break;
        case 5:
            hypno_demo();
            break;
        case 6:
            hypno_fadeout();
            break;
        case 7:
            tick=-1;
            statemachine = 8;
            break;
        case 8:
            squiggle_fade_in();
            break;
        case 9:
            squiggle_demoloop();
            break
        case 10:
            squiggle_fade_out();
            break;
        }
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


