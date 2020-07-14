/**
* Loading For HomePage
*/
var preload = {
	imgPath : "http://mat1.gtimg.com/www/mb/cb2/publish/book_assets/images/",        // Server : "http://mat1.gtimg.com/www/mb/cb2/publish/book_assets/images/" 
	sourceArr : [
        "icon_play.png",
		"btn_close.png",
		"btn_close_hover.png"
    ],

    init : function($loadFileArr, $callback){
    	preload.initDisplay();
    	preload.imgSetDomPercent(0);
    	preload.initData($loadFileArr);
    	//* for test
    	//preload.imgSetDomPercent(0.80);	
    	//return;
    	preload.imgLoader(preload.sourceArr, function(path, curNum, total){
            var percent = curNum/total;
            preload.imgSetDomPercent(percent);

            if(percent == 1){
            	//console.log("图片装载完毕");
            	//return;
            	$('#loading').remove();
            	$callback();
				return;
			}
        });
    },

    initDisplay : function(){
    	var bodyw = document.documentElement.clientWidth;
        var bodyh = document.documentElement.clientHeight;
        document.getElementById('loading').style.height = bodyh+"px";
        $("#loading-box").css("padding-top",bodyh/2-50);
        $("#loading").height(bodyh);
		$("#loading").show();
    },

    initData : function($loadFileArr){
    	for (var i = 0; i < preload.sourceArr.length; i++) {
                preload.sourceArr[i] = (preload.imgPath + preload.sourceArr[i]);
        };
        preload.sourceArr = preload.sourceArr.concat($loadFileArr); 
    },

    imgSetDomPercent : function (percent){
        document.getElementById('loadingPerdent').style.width= Math.floor(percent*100)+"%";
        $('#loadingPerdent i').html(Math.floor(percent*100)+"<em>%</em>");
        document.getElementById('loadw').style.width = Math.floor(percent*100)+"%";
    },

    loadImage : function(path, callback){
        var img = new Image();
        img.onload = function(){
            img.onload = null;
            callback(path);
        }
        img.src = path;
    },

    imgLoader : function(imgs, callback){
        var len = imgs.length, i = 0;
        while(imgs.length){
            preload.loadImage(imgs.shift(), function(path){
                callback(path, ++i, len);
            });
        }
    }           

}

var loader = {
	init : function($list, $callback){
		loader.initPreload($list, $callback);
	},

	//* init preload
	initPreload : function($listFile, $callback){
		//* Preload Elements
		preload.init($listFile, $callback);			
	}
}
/*  |xGv00|b1c432f792ae1931588d6b99e70c43b8 */