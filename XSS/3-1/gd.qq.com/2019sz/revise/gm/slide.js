/**
 * Created by Administrator on 2017/5/25.
 */
$.fn.slider=function(){

    var pUl = this.find('ul');
    var pLi = pUl.children();
    var oLi = this.find('ol li');

    var wid = this.width();
    var hei = this.height();

    this.find('ul li').css({'width':wid,'height':hei})
    pUl.css('width', oLi.length*pLi.width()+'px');
    //this.find('ol').css('margin-left',-0.5*(this.find("ol").width()-5));
    //this.find('ol').css('margin-left',-(wid-oLi.length*oLi.width)/2+"px");

    //mouseover in ol
    var curNum = 0; //current image flag
    oLi.click(function(){
        curNum = $(this).index();
        tab();
    });
    function tab(){
        //change index
        oLi.removeClass('current');
        oLi.addClass('normal');
        oLi.eq(curNum).addClass('current');

        //change image
        pUl.stop().animate({left: -curNum*pLi.width()+'px'});
    }

    //aoto change image
    setInterval(changeImg, 9000);

    function changeImg(){
        if(curNum == oLi.length-1){
            curNum=0;
        }
        else{
            curNum++;
        }

        //change flag
        oLi.removeClass('current');
        oLi.addClass('normal');
        oLi.eq(curNum).addClass('current');

        //chage image
        pUl.stop().animate({left: -curNum*pLi.width()+'px'});
    }

//prev image
    $("#prev").click(function(){
        console.log(1);
        if(curNum != 0){
            curNum--;
            tab();
        }
    });
    $("#prev").mousedown(function(){
        return false;
    });

//next image
    $("#next").click(function(){
        console.log(0);
        if(curNum != oLi.length-1){
            curNum++;
            tab();
        }
    });
    $("#next").mousedown(function(){
        return false;
    });
}/*  |xGv00|dce1971cf4fada4a13b7e7c77cd20cf2 */