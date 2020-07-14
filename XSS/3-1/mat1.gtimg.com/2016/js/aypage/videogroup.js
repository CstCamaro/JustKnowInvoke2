
//拉取专辑id的视频列表
 	var cid = $("#mod_con").attr("data-vid");

	//这里来填写视频列表的专辑id
	jQuery.getScript('http://sns.video.qq.com/fcgi-bin/dlib/dataout_ex?auto_id=137&cid=' + cid + '&otype=json&callback=videoLs', {});
	window.videoLs = function(data) {
		$("#title").html(data.videos[0].tt);
		var vList = "";
		for (var i = 0, l = data.videos.length; i < l; i++) {
			var _title = data.videos[i].tt;
    		if(_title.length>16){
    			_title = _title.substring(0,14) + "...";
    		}
			vList += '<li class="split" vid="' + data.videos[i].vid + '"><a href="javascript:void(0);"><img src="' + data.videos[i].pic + '" alt="' + data.videos[i].tt + '"><p>' + _title + '</p></a></li>';
		}
		jQuery('#mod_con').html(vList);
		var config03 = {
			direction: "right",
			step: 3,
			speed:400,
			inner:'.vinner',
			auto:0
		};
		$("#videolistNav").paraScroll(config03);
	};

	var video = new tvp.VideoInfo();
	var player =new tvp.Player();
	setTimeout(function() {
		//播放器开始
		var vidcur = 0,
			yuncur = 0;
		var liObj=jQuery('#videolistNav li');
		videos = [], vnum = liObj.length;
		titleList=[];
		for (var i = 0, l = vnum; i < l; i++) {
			var myId = jQuery('#videolistNav li').eq(i).attr('vid');
			titUrl= 'http://v.qq.com/cover/' + cid.substring(0, 1) + '/' + cid+ '.html?vid='+ myId;
			titleList.push(titUrl);
			videos.push(liObj.eq(i).attr("vid"));
		}
		var str_sr = window.location.href.split('?vid=')[1];
		if (str_sr != undefined) {
			str_sr = str_sr.substring(0, 11);
		};
		var str_sr = window.location.href.split('?vid=')[1];
		if (str_sr != undefined) {
			str_sr = str_sr.substring(0, 11);
		};
		function addCName(n) {
			liObj.eq(n).addClass('current').siblings().removeClass('current');
		}
		addCName(0);
		var firstVid = liObj.eq(0).attr('vid');
		var nameTitle=liObj.eq(0).find(".video_tit").text();
		var nameQishu=liObj.eq(0).attr("title");
		jQuery("#shipinTitle").text(nameTitle);
		jQuery("#shipinTitle").attr("href",titleList[0]);
		
		function setPlayer(){
			video.setVid(firstVid);
			for (var _Oi = 0; _Oi < liObj.length; _Oi++) {
				if (liObj.eq(_Oi).attr('vid') == str_sr) {
					vidcur = _Oi;
					addCName(_Oi);
					video.setVid(liObj.eq(_Oi).attr('vid'));
				}
			}
			player.ongetnext = function(){
				var nextvid = "";
				nextvid = videos[vidcur + 1];

				if (vidcur < vnum - 1) {
					vidcur++;
					video.clear();
					video.setVid(nextvid);
					addCName(vidcur);
					jQuery("#shipinTitle").text(liObj.eq(vidcur).find(".video_tit").text());
					jQuery("#shipinTitle").attr("href",titleList[vidcur]);
					goto(liObj.eq(vidcur));
					return video;
				} else {
					addCName(vnum - 1);
					jQuery("#shipinTitle").text(liObj.eq(vnum - 1).find(".video_tit").text());
					jQuery("#shipinTitle").attr("href",titleList[vnum - 1]);
					goto(liObj.eq(vidcur-1));
				}
			}
			player.create({
				width: 400,
				height: 300,
				video:video,
				modId:"videolistplay", //mod_player是刚刚在页面添加的div容器
				autoplay:1,
				pic:$("#videopic").val() || "",
				flashWmode:"transparent",
				isMute:!0,
				vodFlashExtVars: {
		            clientbar: 0
		        },
		        oninited:function(){
		        	player.getPlayer().mute();
		        },
		        onplaying:function(){
		        	player.getPlayer().mute();
		        },
		        plugins: {
		            AppBanner: !1,
		            AppRecommend: !1,
		            AppFollow: !1
		        },
				onended: function() {

				}
			});

			setTimeout(function(){
				player.create({
					width: 100+"%",
					height: 226,
					modId:"videolistplay", 
				})
			},50)
			
			liObj.bind("click", function() {
				vidcur = jQuery(this).index();
				addCName(vidcur);
				video.setVid(jQuery(this).attr("vid"));
				jQuery("#shipinTitle").text(jQuery(this).find(".video_tit").text());
				jQuery("#shipinTitle").attr("href",titleList[vidcur]);
				player.play(video);
				goto(jQuery(this));
			});
		}

		function getFirstVid(){
			if(firstVid != '' && firstVid != undefined){
				setPlayer();
				return;
			}else{
				setTimeout("getFirstVid()",1000);
			}
		}
		getFirstVid();
		jQuery("#btn_player_expand").show();

	}, 1500);
//滚动条控制
	function goto(obj){
		var posTop=jQuery(obj).position() || 0;
		jQuery("#playlist").scrollTop(posTop.top);
	}



/*  |xGv00|69066b79316feab8ddfd7f040a2de359 */