define(['https://imgcache.gtimg.cn/tencentvideo_v1/tvp/js/tvp.player_v2_jq.js'], function() {
	var videoplayer = {
		playerObj : null,
	    createVideo : function ($vid, $domId){
	        var video = new tvp.VideoInfo();
	        video.setVid($vid);
	        video.setPoster(tvp.common.getVideoSnapMobile($vid));
	        videoplayer.playerObj = new tvp.Player();
	        var scale = 16 / 9;
	        var v_width = $('#' + $domId).width();
	        var v_height = v_width / scale;
	        //
	        var isAutoPlay = videoplayer.getIsAutoPlay($domId);
	        //
	        videoplayer.playerObj.create({
	            width: v_width,
	            height: v_height,
	            adplay:0,
	            video:video,
	            modId:$domId,
	            autoplay:isAutoPlay,
	            html5Preload:'none'
	        });
	    },

	    getPlayerObj : function(){
	    	return videoplayer.playerObj;
	    },

	    getIsAutoPlay : function($domId){
	        var isAutoPlay = false;
	        var firstDomId = $('.videoSinglePlayer').eq(0).attr('id');
	        if(firstDomId == $domId){
	            // console.log('First Dom Player:' + $domId)
	            if(cbTools.isPC){
	                isAutoPlay = true;
	            }else{
	            	isAutoPlay = false;
	            }            
	        }
	        return isAutoPlay;
	    }
	}
	return videoplayer;
});
/*  |xGv00|57553ffb22336cd59d005ade5d527c6c */