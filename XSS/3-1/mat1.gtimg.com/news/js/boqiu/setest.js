	/* 
		update:2013.8.21
		aberli 鼠标经过分享修改
	*/
	function shareNewsStyle(){ 
		K("listZone").find(".shareBtn16").hide();
		/*
		if(!K.B.Platform.ios){
			KK(".Q-pList").each(function(obj,i){
				obj.bind("mouseover",function(){
					obj.find(".shareBtn").show();
					obj.find(".discuzBtn").show();
				})
				obj.bind("mouseout",function(){
					obj.find(".shareBtn").hide();
					obj.find(".discuzBtn").hide();	
				})
			})
		}
		*/
		KK("#listZone .shareBtn").attr("aria-pressed","false").each(function(obj,i){ 
			obj.bind("mouseover",function(){ 					
				this.addClass("shareBtnHover");
				this.css("height:110px; width:13px;")
				this.show();
				this.last().show().attr("aria-disabled",'false').attr("aria-hidden",'false').attr("tabindex",'0');
				
			})
			obj.bind("mouseout",function(){ 
				this.css("height:20px;")
				this.removeClass("shareBtnHover");
				this.last().hide().attr("aria-disabled",'true').attr("aria-hidden",'true').attr("tabindex",'-1');
			})
		}).bind("keydown",function(KEvent){ 
				this.attr("aria-pressed","true")
			}).bind("keyup",function(KEvent){ 	
				this.attr("aria-pressed","false")
		})	
		K("listZone").find(".Q-tpList li a").attr("role","button").attr("tabindex","0").attr("aria-haspopup",'true').attr("aria-pressed","false").bind("keydown",function(KEvent){ 
			this.attr("aria-pressed","true")
		}).bind("keyup",function(KEvent){ 	
			this.attr("aria-pressed","false")
		});				
		/*
		if(!K.B.Platform.ios){	
			KK(".Q-tpList").each(function(obj){
				obj.bind("mouseover",function(){ 
					obj.find(".shareBtn").show();
					obj.find(".discuzBtn").show();
				})
				obj.bind("mouseout",function(){
					obj.find(".shareBtn").hide();
					obj.find(".discuzBtn").hide();				
				})

			})	

		}
		*/
		K.ready(function(){
			KK(".s_weibo").each(function(obj){ 
				_MI.ShareArticle.build(obj.attr("id"));		
			})

		});			
	}
	shareNewsStyle();/*  |xGv00|5e7fb94e5856bef18f46c41570610452 */