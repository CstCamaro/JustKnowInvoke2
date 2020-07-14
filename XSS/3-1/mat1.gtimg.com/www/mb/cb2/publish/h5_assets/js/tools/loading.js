/**
* Loading For HomePage
*/
var preload = {
	imgPath : "http://mat1.gtimg.com/www/mb/cb2/publish/h5_assets/images/",
	sourceArr : [
        "h5-close.png",
		"icon_play.png",
		"icon_qa_dot.png",
		"icon_qa_left.png",
		"icon_qa_repline.png",
		"icon_qa_right.png",
		"title_bg.png",
		"title_left.png",
		"title_mid.png",
		"title_right.png"
    ],

    init : function($loadFileArr, $ev){
    	preload.initDisplay();
    	preload.imgSetDomPercent(0);
    	preload.initData($loadFileArr);
    	//* for test
    	//preload.imgSetDomPercent(0.02);	
    	//return;
    	preload.imgLoader(preload.sourceArr, function(path, curNum, total){
            var percent = curNum/total;
            preload.imgSetDomPercent(percent);

            if(percent == 1){
            	//console.log("图片装载完毕");
            	//return;
            	$('#loading').remove();
            	document.dispatchEvent($ev);
				return;
			}
        });
    },

    initDisplay : function(){
    	var bodyw = document.documentElement.clientWidth;
        var bodyh = document.documentElement.clientHeight;
        document.getElementById('loading').style.height = bodyh+"px";
        $("#loading-box").css("padding-top",bodyh/2-50);
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
	init : function($list, $ev){
		loader.initPreload($list, $ev);
	},

	//* init preload
	initPreload : function($listFile, $ev){
		//* Preload Elements
		preload.init($listFile, $ev);			
	}
}
/*  |xGv00|7157ee6eca6210212816ec6c21ddc640 */