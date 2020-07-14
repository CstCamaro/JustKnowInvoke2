


function gE(e) {
    return document.querySelector(e)
}

function pop(e) {
    if (!gE('#pop-mask')) {
        gE(e).style.display = "block";
        var popH = gE(e).offsetHeight,
            popW = gE(e).offsetWidth;
        gE(e).style.cssText = "position:fixed;left:50%;display:block;top:50%;z-index:999;"+"margin-left:-"+popW/2+"px;"+"margin-top:-"+popH/2+"px;"
        var bgObj = document.createElement("div");
        bgObj.setAttribute('id', 'pop-mask');
        document.body.appendChild(bgObj);
        var conH = document.body.scrollHeight,
            viewH = document.documentElement.clientHeight;
        if (conH > viewH) {
            gE('#pop-mask').style.height = conH + "px";
        } else {
            gE('#pop-mask').style.height = viewH + "px";
        }
        hidePop(e);
    }
}

function hidePop(e) {
    gE('#pop-mask').addEventListener('click', function() {
        gE(e).style.display = "none";
        var bgObj = gE("#pop-mask");
        document.body.removeChild(bgObj);
    });
}

function hidePopOk(e) {
    gE(e).style.display = "none";
    var bgObj = gE("#pop-mask");
    document.body.removeChild(bgObj);
}