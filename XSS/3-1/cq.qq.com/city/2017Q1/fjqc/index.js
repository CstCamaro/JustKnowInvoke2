var w=$('.main').width();
var h;
h=w*4;
$('.main').css('height',h+'px');
$('.main').css('background-size',w+'px '+h+'px');

$('.lunb').css('margin-top',(h*0.1876)+'px');
$('.lunb').css('height',(h*0.035)+'px');
$('.lunb').css('width',(w*0.231)+'px');

$('.lunb a img').css('height',(h*0.035)+'px');
$('.lunb a img').css('width',(w*0.231)+'px');

$('.lunshell').css('height',(h*0.035)+'px');
$('.lunshell').css('width',((w*0.231)*3)+'px');
$('.left').css('margin-top','-'+(h*0.035)+'px');
$('.right').css('margin-top','-'+(h*0.035)+'px');
$('.right').css('margin-left',((w*0.231)-60)+'px');

$('.button1').css('margin-top',(h*0.6955)+'px');
$('.button1').css('margin-left',(w*0.43)+'px');

$('.left img').css('margin-top',(((h*0.035)/2)-30)+'px');
$('.right img').css('margin-top',(((h*0.035)/2)-30)+'px');

$('.lunb').css('margin-left',(w*0.249)+'px');

console.log(w);



$(window).resize(function() {	//监测浏览器改变时设置数组中的DIV高度  	
    var bw=$('.main').width();
    var bh,i;
    bh=bw*4;
    $('.main').css('height',bh+'px');
    $('.main').css('background-size',bw+'px '+bh+'px');
    
    $('.lunb').css('margin-top',(bh*0.1876)+'px');
    $('.lunb').css('height',(bh*0.035)+'px');
    $('.lunb').css('width',(bw*0.231)+'px');
    
    $('.lunb a img').css('height',(bh*0.035)+'px');
    $('.lunb a img').css('width',(bw*0.231)+'px');
    
    $('.lunshell').css('height',(bh*0.035)+'px');
    $('.lunshell').css('width',((bw*0.231)*3)+'px');
    i=$('.left').attr('i');
    i=parseInt(i);
    i=i-1;
    $('.lunshell').css('margin-left','-'+(i*(bw*0.231))+'px');
    
    $('.left').css('margin-top','-'+(bh*0.035)+'px');
    $('.right').css('margin-top','-'+(bh*0.035)+'px');
    $('.right').css('margin-left',((bw*0.231)-60)+'px');
    
    $('.button1').css('margin-top',(bh*0.6955)+'px');
    $('.button1').css('margin-left',(bw*0.43)+'px');
    
    
    $('.left img').css('margin-top',(((bh*0.035)/2)-30)+'px');
    $('.right img').css('margin-top',(((bh*0.035)/2)-30)+'px');
    
    $('.lunb').css('margin-left',(bw*0.249)+'px');
    //console.log(bw);
});

$('.left').click(function(){
	
	var ki=$('.left').attr('ki');
$('.left').attr('ki','0');
ki=parseInt(ki);
if(ki==1){
	var lnw,fln,i;
	lnw=$('.lunshell').css('width');
	fln=$('.lunshell').css('margin-left');
	
	
	fln=parseInt(fln);
	lnw=parseInt(lnw);
	if((-fln)<(((lnw/3)*2)-10)){
	  $('.lunshell').animate({marginLeft:(fln-(lnw/3))+'px'},300);
	  i=$('.left').attr('i');
	  i=parseInt(i);
	  i=i+1;
	  $('.left').attr('i',i);
	}else{
	  $('.lunshell').animate({marginLeft:'0px'},300);
	  i=1;
	  $('.left').attr('i',i);
	}
	}

setTimeout(function(){
		$('.left').attr('ki','1');
	},300);
	
});

$('.right').click(function(){
var ki=$('.right').attr('ki');
$('.right').attr('ki','0');
ki=parseInt(ki);
if(ki==1){
		var lnw,fln,i;
	lnw=$('.lunshell').css('width');
	fln=$('.lunshell').css('margin-left');
	
	
	fln=parseInt(fln);
	lnw=parseInt(lnw);
	if(fln==0 || (fln<10 && fln>-10)){
	  $('.lunshell').animate({marginLeft:'-'+(lnw/3)*2+'px'},300);
	  i=3;
	  $('.left').attr('i',i);
	}else{
	 	  
	  $('.lunshell').animate({marginLeft:(fln+(lnw/3))+'px'},300);
	  i=$('.left').attr('i');
	  i=parseInt(i);
	  i=i-1;
	  $('.left').attr('i',i);
	}
	setTimeout(function(){
		$('.right').attr('ki','1');
	},300);
	}	


});
/*  |xGv00|7e0191aaf3b3bc0f000ef1dd58e8d30f */