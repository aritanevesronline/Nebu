// <![CDATA[
var colour = "#FFFFFF"; // color of sparkles
var sparkles = 120;

var x = 400, y = 300, ox = 400, oy = 300;
var swide = 800, shigh = 600;
var sleft = 0, sdown = 0;

var tiny = [];
var star = [];
var starv = [];
var starx = [];
var stary = [];
var tinyx = [];
var tinyy = [];
var tinyv = [];

window.onload = function () {
    if (document.getElementById) {
        for (var i = 0; i < sparkles; i++) {
            // Tiny star
            var tinyDiv = createStarDiv(2);
            tinyDiv.style.visibility = "hidden";
            document.body.appendChild(tiny[i] = tinyDiv);
            tinyv[i] = 0;

            // Main star
            var starDiv = createStarDiv(5);
            starDiv.style.visibility = "hidden";
            document.body.appendChild(star[i] = starDiv);
            starv[i] = 0;
        }
        set_width();
        sparkle();
    }
};

function sparkle() {
    if (x != ox || y != oy) {
        ox = x; oy = y;
        for (var c = 0; c < sparkles; c++) {
            if (!starv[c]) {
                starx[c] = x;
                stary[c] = y;
                star[c].style.left = starx[c] + "px";
                star[c].style.top = stary[c] + "px";
                star[c].style.visibility = "visible";
                starv[c] = 50;
                break;
            }
        }
    }
    for (var c = 0; c < sparkles; c++) {
        if (starv[c]) update_star(c);
        if (tinyv[c]) update_tiny(c);
    }
    setTimeout(sparkle, 40);
}

function update_star(i) {
    if (--starv[i] > 0) {
        stary[i] += 1 + Math.random() * 3;
        starx[i] += (i % 5 - 2) / 5;
        if (stary[i] < shigh + sdown) {
            star[i].style.top = stary[i] + "px";
            star[i].style.left = starx[i] + "px";
        } else {
            star[i].style.visibility = "hidden";
            starv[i] = 0;
        }
    } else {
        tinyv[i] = 50;
        tinyy[i] = stary[i];
        tinyx[i] = starx[i];
        tiny[i].style.top = tinyy[i] + "px";
        tiny[i].style.left = tinyx[i] + "px";
        tiny[i].style.width = "2px";
        tiny[i].style.height = "2px";
        tiny[i].style.visibility = "visible";
        star[i].style.visibility = "hidden";
    }
}

function update_tiny(i) {
    if (--tinyv[i] > 0) {
        tinyy[i] += 1 + Math.random() * 3;
        tinyx[i] += (i % 5 - 2) / 5;
        if (tinyy[i] < shigh + sdown) {
            tiny[i].style.top = tinyy[i] + "px";
            tiny[i].style.left = tinyx[i] + "px";
        } else {
            tiny[i].style.visibility = "hidden";
            tinyv[i] = 0;
        }
    } else {
        tiny[i].style.visibility = "hidden";
    }
}

document.onmousemove = function (e) {
    set_scroll();
    y = e ? e.pageY : event.y + sdown;
    x = e ? e.pageX : event.x + sleft;
};

function set_scroll() {
    if (typeof (self.pageYOffset) == "number") {
        sdown = self.pageYOffset;
        sleft = self.pageXOffset;
    } else if (document.body.scrollTop || document.body.scrollLeft) {
        sdown = document.body.scrollTop;
        sleft = document.body.scrollLeft;
    } else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
        sleft = document.documentElement.scrollLeft;
        sdown = document.documentElement.scrollTop;
    } else {
        sdown = 0;
        sleft = 0;
    }
}

window.onresize = set_width;
function set_width() {
    if (typeof (self.innerWidth) == "number") {
        swide = self.innerWidth;
        shigh = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientWidth) {
        swide = document.documentElement.clientWidth;
        shigh = document.documentElement.clientHeight;
    } else if (document.body.clientWidth) {
        swide = document.body.clientWidth;
        shigh = document.body.clientHeight;
    }
}

// Create a 4-point star div
function createStarDiv(size) {
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.width = size + "px";
    div.style.height = size + "px";
    div.style.backgroundColor = colour;
    div.style.boxShadow = `0 0 ${size}px ${colour}`; // glow effect
    div.style.clipPath = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"; // star shape
    return div;
}
// ]]>