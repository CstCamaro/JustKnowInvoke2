/** txplayer2.0 -> txplayer3.0 */
define(['//vm.gtimg.cn/tencentvideo/txp/js/txplayer.js'], function() {
	function VideoPlayer() {
    //this.txReady = false;
    this.isPlaying = false;      
    //
    this.playerObj = null;
    this.modPlayerId = null;
    this.vid = null;
  }

  VideoPlayer.prototype = {
  	createVideo : function ($vid, $domId, $callback, $isAutoPlay){
			this.vid = $vid;
			this.modPlayerId = $domId;
			var v_width = $('#' + $domId).width();
			var scale = 16 / 9;
      var v_height = v_width / scale;
      var isAutoPlay = this.getIsAutoPlay($domId);
      var config = {
				containerId: this.modPlayerId,
        vid: this.vid,
        width: v_width,
        height: v_height,
        autoplay : isAutoPlay
			}
      if($isAutoPlay){
        config.autoplay = true;
      }
			console.debug('txplayer3.0:' , config.vid)
      this.playerObj = new Txplayer(config);
      //* Listen : Video State Change
      var self = this;
      this.playerObj.on('playStateChange', function($state){
        var state = '';
        if($state.state || $state.state == 0){  // pc-mode return
          state = $state.state;
        }else{                                  // mobile-mode return
          state = $state;
        }      	
      	// console.debug('playStateChange:' + config.containerId + ' state:' , state)
      	$callback(state, self.modPlayerId)
      });
      this.playerObj.on('adStart',function($type){
        var state = 'adStart';
        // console.debug('playStateChange:' + config.containerId + ' state:', state)
        $callback(state, self.modPlayerId)
      })
    },

    getIsAutoPlay : function($domId){
      var isAutoPlay = false;
      var firstDomId = $('.videoSinglePlayer').eq(0).attr('id');
      if(firstDomId == $domId){
          if(cbTools.isPC){
              isAutoPlay = true;
          }else{
          	isAutoPlay = false;
          }            
      }
      return isAutoPlay;
    },

    getTxPlayerObj : function(){
      return this.playerObj;
    },

    destroy : function(){
      if(this.playerObj != null){
        this.playerObj.pause();
        this.playerObj.destroy();
        this.playerObj = null;
      }
    }
  }

	return VideoPlayer;
});
/*  |xGv00|dea2b79493ccb1411407f3ce18eeade1 */