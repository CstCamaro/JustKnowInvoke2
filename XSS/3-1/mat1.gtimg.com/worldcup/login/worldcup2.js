//Ò³¿¨
function tab(tabw, cw, cn, n){
    var em = $(tabw).getElementsByTagName('span');
    var c_n = [];
    var ct = $(cw).getElementsByTagName('table');
    for (var i = 0, l = ct.length; i < l; i++) {
        var cnn = ct[i].className;
        if (cnn.indexOf(cn) > -1) {
            c_n.push(ct[i]);
        }
    }
    for (var i = 0; i < em.length; i++) {
        em[i].className = i == n ? "on" : "";
        c_n[i].className = cn + (i == n ? " show" : " none");
    }
}

//ÉÏÏÂ¹ö¶¯
function boxmove(d1, d2, e, obj){
    var speed = 30;
    var demo = document.getElementById(d1);
    var demo1 = document.getElementById(d2);
    //var demo2 = document.getElementById(d3);
    //demo2.innerHTML = demo1.innerHTML;
    function boxTop(){
        if (demo.scrollTop < (demo1.offsetHeight - demo.offsetHeight)) {
             demo.scrollTop++
        }
    }
    function boxBottom(){
        if (demo.scrollTop > 0) {
            demo.scrollTop--
        }
    }
    if (e == "top") {
        MoveTop = setInterval(boxTop, speed)
        obj.onmouseout = function(){
            clearInterval(MoveTop);
        }
    }
    if (e == "bottom") {
        MoveBottom = setInterval(boxBottom, speed)
        obj.onmouseout = function(){
            clearInterval(MoveBottom);
        }
    }
}

/*
var aspeaId = 30;
var amaId = document.getElementById("apicaId");
var ama1Id = document.getElementById('apica1Id');
var ama2Id = document.getElementById('apica2Id');
ama2Id.innerHTML = ama1Id.innerHTML;
function aMarqueeaId(){
    if (ama2Id.offsetWidth - amaId.scrollLeft <= 0) {
        amaId.scrollLeft -= ama1Id.offsetWidth;
    }
    else {
        amaId.scrollLeft++;
    }
}

var aka1Id;
function astartmarqueeaId(){
    aka1Id = setInterval(aMarqueeaId, aspeaId)
}

window.setTimeout('astartmarqueeaId()', 1000);
amaId.onmouseover = function(){
    clearInterval(aka1Id)
}
amaId.onmouseout = function(){
    aka1Id = setInterval(aMarqueeaId, aspeaId)
}*//*  |xGv00|1133c42a892c71c3a54727d78575efff */