$(function(){
$("#hudon>a").mouseover(function(){
    $("#hudon>a").attr("class",'pn');
	$(this).addClass("px");
    var target = $('#' + this.rel);
    if (target.size() > 0) {
        $('#test6>div').hide();
        target.show();
    } else {
        alert('There is no such container.');
    }
});
});



$(function(){
$("#toutiao>a").mouseover(function(){
    $("#toutiao>a").attr("class",'sxn');
	$(this).addClass("sxx");
    var target = $('#' + this.rel);
    if (target.size() > 0) {
        $('#test>div').hide();
        target.show();
    } else {
        alert('There is no such container.');
    }
});
});

$(function(){
$("#gdjy>a").mouseover(function(){
    $("#gdjy>a").attr("class",'pxn');
	$(this).addClass("pxx");
    var target = $('#' + this.rel);
    if (target.size() > 0) {
        $('#test1>div').hide();
        target.show();
    } else {
        alert('There is no such container.');
    }
});
});

$(function(){
$("#peixun>a").mousedown(function(){
     
    var target = $('#' + this.rel);
    if (target.size() > 0) {
        $('#test2>div').hide();
        target.show();
    } else {
        alert('There is no such container.');
    }
});
});

$(function(){
$("#fuxao>a").mouseover(function(){
    $("#fuxao>a").attr("class",'bxn');
	$(this).addClass("bxx");
    var target = $('#' + this.rel);
    if (target.size() > 0) {
        $('#test3>div').hide();
        target.show();
    } else {
        alert('There is no such container.');
    }
});
});

$(function(){
$("#fuzou>a").mouseover(function(){
    $("#fuzou>a").attr("class",'cxn');
	$(this).addClass("cxx");
    var target = $('#' + this.rel);
    if (target.size() > 0) {
        $('#test4>div').hide();
        target.show();
    } else {
        alert('There is no such container.');
    }
});
});


$(function(){
$("#main>a").mouseover(function(){
    $("#main>a").attr("class",'pon');
	$(this).addClass("pox");
    var target = $('#' + this.rel);
    if (target.size() > 0) {
        $('#test5>div').hide();
        target.show();
    } else {
        alert('There is no such container.');
    }
});
});

/*  |xGv00|9f956179cd1119262da916dfe4a5ff6f */