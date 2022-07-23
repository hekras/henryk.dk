/**
 *
 * @author Henryk Krasuski aka oldhandmixer
 * Corona Virus sweeper game again, again
 *
 */

function animateloop() {
    if ((GGG_mines === GGG_tiles) && (GGG_mines > 0) && (document.getElementById('GGG_WINNER') === null)) {
        revealAllMines();
        el = document.createElement('div');
        el.style.color = "green";
        el.style.fontSize = "100px";
        el.className = 'center';
        el.innerHTML = "You win!";
        el.id = 'GGG_WINNER';
        document.getElementById("GGG").appendChild(el);
    }

    if ((document.getElementById('GGG_WINNER') === null)) {
        hr = Math.trunc(GGG_timer / (60 * 60));
        min = Math.trunc(GGG_timer / 60) % 60;
        sec = Math.trunc(GGG_timer % 60);

        hr = (hr < 10) ? '0' + hr : hr;
        min = (min < 10) ? '0' + min : min;
        sec = (sec < 10) ? '0' + sec : sec;
        document.getElementById("GGG-TIMER").innerText = hr + ':' + min + ':' + sec;
        if (!GGG_gameover) {
            GGG_timer++;
        }
    }

    el = document.getElementById("GGG-BOOM-SIGN");
    if ((el !== null) && (GGG_mines !== GGG_tiles)) {
        s = el.getAttribute("counter");
        s = s.substr(1);
        el.setAttribute("counter", s);
        if (s.length === 0) {
            el.remove();
        }
    }
}

function revealAllMines() {
    for (i = 0; i < GGG_minelist.length;) {
        GGG_minelist.pop().innerHTML = '<img src="virus.jpg" width="' + OOO_TS + '" height="' + OOO_TS + '"></img>';
    }
}

function corona_keydown(ev) {
    console.log(ev.keyCode);
    switch (ev.keyCode) {
        case 16: // tab
            GGG_flagmode = true;
            break;
    }
}

function corona_keyup(ev) {
    switch (ev.keyCode) {
        case 16: // w
            GGG_flagmode = false;
            break;
    }
}

function startgamebutton() {
    document.getElementById("OOO").style.display = "none";
    ggg = document.getElementById("GGG");
    ggg.style.display = "block";
    ggg.innerHTML = "";

    w = window.innerWidth - 10;
    h = window.innerHeight - 10;
    xsize = Math.trunc(w / OOO_TS);
    xoff = (w - xsize * OOO_TS) / 2;

    ysize = Math.trunc((h - 40) / OOO_TS);
    yoff = 40;
    //    yoff = (h - ysize * OOO_TS) / 2;

    var GGG_board = [];
    for (j = 0; j < ysize; j++) {
        for (i = 0; i < xsize; i++) {
            x = xoff + i * OOO_TS;
            y = yoff + j * OOO_TS;

            var el = document.createElement("div");
            el.id = i + "," + j;
            el.style.border = "1px solid rgb(100,100,100)";
            el.style.width = OOO_TS + "px";
            el.style.height = OOO_TS + "px";
            el.style.left = x + "px";
            el.style.top = y + "px";
            el.style.position = "absolute";
            el.style.cursor = "pointer";
            el.style.fontSize = (OOO_TS < 30) ? OOO_TS - 5 + "px" : "28px";
            el.style.color = "black";
            el.style.backgroundColor = "beige";
            el.setAttribute('counter', '0');

            north = j - 1;
            south = j + 1;
            east = i - 1;
            west = i + 1;

            if (north >= 0) {
                el.setAttribute('north', i + ',' + north);
            }
            if (south < ysize) {
                el.setAttribute('south', i + ',' + south);
            }
            if (east >= 0) {
                el.setAttribute('east', east + ',' + j);
            }
            if (west < xsize) {
                el.setAttribute('west', west + ',' + j);
            }

            //el.innerHTML = '<span class="center" style="background-color: inherit;">1</span>';
            document.getElementById("GGG").appendChild(el);
            GGG_board.push(el);

            el.addEventListener("click", function () {
                if (GGG_gameover) {
                    return;
                }
                if (GGG_flagmode) {
                    if (this.getAttribute('tested') === null) {
                        if (this.getAttribute('flagged') === null) {
                            this.setAttribute('flagged', 'true');
                            this.innerHTML = '<img src="mineflag.jpg" width="' + OOO_TS + '" height="' + OOO_TS + '"></img>';
                        } else {
                            this.removeAttribute('flagged');
                            this.innerHTML = '';
                        }
                    }
                }
                else {
                    if (this.getAttribute('ismine') === null) {
                        fill(this);
                        for (i = 0; i < fillstack.length;) {
                            fill(fillstack.pop());
                        }
                        document.getElementById("GGG-TILES-COUNTER").innerText = (GGG_tiles - GGG_mines);
                    }
                    else if (this.getAttribute('flagged') === null) {
                        GGG_lives--;
                        document.getElementById("GGG-LIVES-COUNTER").innerText = GGG_lives;
                        if (GGG_lives === 0) {
                            el = document.createElement('div');
                            el.style.color = "red";
                            el.style.fontSize = "100px";
                            el.className = 'center';
                            el.innerHTML = "You loose!";
                            document.getElementById("GGG").appendChild(el);
                            GGG_gameover = true;
                            revealAllMines();
                        }
                        else {
                            el = document.createElement('div');
                            el.style.color = "red";
                            el.style.fontSize = "100px";
                            el.className = 'center';
                            el.innerHTML = "BOOOM";
                            el.id = "GGG-BOOM-SIGN";
                            el.setAttribute("counter", "11");
                            document.getElementById("GGG").appendChild(el);
                            this.innerHTML = '<img src="virus.jpg" width="' + OOO_TS + '" height="' + OOO_TS + '"></img>';
                        }
                    }
                }
            });

        }
    }

    GGG_tiles = xsize * ysize;
    GGG_mines = Math.trunc(OOO_MI * GGG_tiles / 100);
    GGG_minelist = [];
    for (i = 0; i < GGG_mines;) {
        el = GGG_board[Math.trunc(GGG_board.length * Math.random())];
        if (el.getAttribute('ismine') == null) {
            el.setAttribute('ismine', 'true');
            GGG_minelist.push(el);
            i++;
        }
    }

    for (i = 0; i < GGG_board.length; i++) {
        el = GGG_board[i];
        x = Number(el.id.split(',')[0]);
        y = Number(el.id.split(',')[1]);
        ya = ((y - 1) < 0) ? 0 : y - 1;
        yb = ((y + 2) > ysize) ? ysize : y + 2;
        xa = ((x - 1) < 0) ? 0 : x - 1;
        xb = ((x + 2) > xsize) ? xsize : x + 2;
        for (yy = ya; yy < yb; yy++) {
            for (xx = xa; xx < xb; xx++) {
                id = xx + ',' + yy;
                if (document.getElementById(id).getAttribute('ismine') != null) {
                    el.setAttribute('counter', 1 + Number(el.getAttribute('counter')));
                }
            }
        }
    }

    var el = document.createElement("div");
    el.style.fontSize = "28px";
    el.style.color = "white";
    el.style.width = "100%";
    el.style.height = "39px";
    el.style.left = "0px";
    el.style.top = "0px";
    el.style.position = "absolute";
    el.style.backgroundColor = "gray";
    el.innerHTML = '<div class="center" style="background-color: inherit;"><span id="GGG-TILES-COUNTER" style="background-color: inherit; color: white;">' +
        (GGG_tiles - GGG_mines) + '</span> tiles left ... Time: <span id="GGG-TIMER" style="background-color: inherit; color: white;">00:00:00</span> ... Lives: <span id="GGG-LIVES-COUNTER" style="background-color: inherit; color: white;">5</span></div>';
    //el.className = "center";
    document.getElementById("GGG").appendChild(el);
    GGG_timer = 0;
    GGG_gameover = false;
    GGG_lives = 5;
}

fillstack = [];

function fill(el) {
    if (el.getAttribute('flagged') !== null) {
        return;
    }
    if (el.getAttribute('tested') !== null) {
        return;
    }
    el.setAttribute('tested', 'true');
    el.style.backgroundColor = "rgb(150,150,150)";
    GGG_tiles--;
    if (el.getAttribute('counter') !== '0') {
        el.innerHTML = '<span class="center" style="background-color: inherit;">' + el.getAttribute('counter') + '</span>';
        return;
    }

    if ((id = el.getAttribute('north')) !== null) {
        fillstack.push(document.getElementById(id));
    }
    if ((id = el.getAttribute('south')) !== null) {
        fillstack.push(document.getElementById(id));
    }
    if ((id = el.getAttribute('east')) !== null) {
        fillstack.push(document.getElementById(id));
    }
    if ((id = el.getAttribute('west')) !== null) {
        fillstack.push(document.getElementById(id));
    }
}

function initOOO() {
    x = 10;
    n = 1;
    for (s = 10; s < 210; s *= 1.50) {
        var ss = Math.trunc(s);
        var el = document.createElement("div");
        el.id = "OOO-TS-" + n++;
        el.style.border = "1px solid red";
        el.style.width = ss + "px";
        el.style.height = ss + "px";
        el.style.left = x + "px";
        el.style.top = (120 - s / 2) + "px";
        el.style.position = "absolute";
        el.style.cursor = "pointer";
        el.style.fontSize = (ss < 30) ? ss - 5 + "px" : "28px";
        el.style.color = "yellow";
        el.style.backgroundColor = "gray";
        el.setAttribute("value", ss);
        //        el.innerHTML = '<span class="center" style="background-color: gray;">' + ss + '</span>';
        document.getElementById("OOO").appendChild(el);

        el.addEventListener("click", function () {
            for (m = 1; m < 9; m++) {
                document.getElementById("OOO-TS-" + m).style.backgroundColor = "gray";
            }
            this.style.backgroundColor = "yellow";
            OOO_TS = Number(this.getAttribute("value"));
        });

        x += ss + 15;
    }

    el = document.getElementById("OOO-TS-" + Math.trunc(1 + Math.random() * 8));
    el.style.backgroundColor = "yellow";
    OOO_TS = Number(el.getAttribute("value"));

    x = 10;
    y = 250;
    n = 1;
    for (s = 1; s < 53; s += 3) {
        r = Math.trunc(s * 255 / 53);
        g = Math.trunc((53 - s) * 255 / 53);
        var el = document.createElement("div");
        el.id = "OOO-MI-" + n++;
        el.style.border = "1px solid red";
        el.style.width = "60px";
        el.style.height = "60px";
        el.style.left = x + "px";
        el.style.top = y + "px";
        el.style.position = "absolute";
        el.style.cursor = "pointer";
        el.style.fontSize = "28px";
        el.style.color = "blue";
        el.style.backgroundColor = "rgb(" + r + "," + g + ", 0)";
        el.innerHTML = '<span class="center" style="background-color: inherit">' + s + '</span>';
        el.setAttribute("value", s);
        document.getElementById("OOO").appendChild(el);
        el.addEventListener("click", function () {
            n = 1;
            for (s = 1; s < 53; s += 3) {
                r = Math.trunc(s * 255 / 53);
                g = Math.trunc((53 - s) * 255 / 53);
                id = "OOO-MI-" + n++;
                document.getElementById(id).style.backgroundColor = 'rgb(' + r + ',' + g + ', 0)';
                //                document.getElementById(id).innerHTML = '<span class="center" style="background-color: rgb(' + r + ',' + g + ', 0);">' + s + '</span>';
            }
            this.style.backgroundColor = "yellow";
            OOO_MI = Number(this.getAttribute("value"));
        });

        x += 70;
        if (s == 25) {
            y += 75;
            x = 10;
        }
    }

    el = document.getElementById("OOO-MI-" + Math.trunc(1 + Math.random() * 18));
    el.style.backgroundColor = "yellow";
    OOO_MI = Number(el.getAttribute("value"));

}

// ===================================================
// Main - Program starts here
// ===================================================
OOO_MI = 0;
OOO_TS = 0;
GGG_mines = 0;
GGG_minelist = [];
GGG_timer = 0;
GGG_tiles = 0;
GGG_flagmode = false;
GGG_gameover = false;
GGG_lives = 5;

initOOO();

document.addEventListener("keydown", corona_keydown, false);
document.addEventListener("keyup", corona_keyup, false);
window.setInterval(animateloop, 1000);

