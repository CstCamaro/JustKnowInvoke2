<!--文字从下往上滚动-->
var timeScroll= false;

window.onload = function() {
 dMarquee('scroll',timeScroll);
}

function dMarquee(id,timer){
 var speed=30; //速度
 var stop=2000; //停止时间 

 var ul = document.getElementById(id);
 var rows=ul.getElementsByTagName('li').length;
 var height = ul.getElementsByTagName('li')[0].offsetHeight;

 ul.innerHTML += ul.innerHTML;
 var contain=ul.innerHTML;
 
 var play = function() {
  ul.scrollTop++;

  if(ul.scrollTop==rows*height){
   ul.scrollTop=0;
  }

  if(ul.scrollTop%height==0) {
   timer = setTimeout(play,stop);
  }else{
   timer = setTimeout(play,speed);
  } 
 }

 timer = setTimeout(play,stop);

 ul.onmouseover = function() {clearTimeout(timer);}
 ul.onmouseout = play;
} 
<!--测试码,-->



/*  |xGv00|1e64cf1dd525ed819f1afae54cd7fdb3 */