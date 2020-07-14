function getJsonLength(jsonData){
		var jsonLength = 0;
		for(var item in jsonData){jsonLength++;}
		      return jsonLength;
		}
var Snow = {}
Snow.getId=function(){
	var url=window.location.href;
	var txt=url.split("?");
	var data={};
	if(txt){
		txt=txt[1];
		if(txt){
			var dataTxt=txt.split(/[&,?,#]/);
			for(var i=0,ii=dataTxt.length;i<ii;i++){
				var dataS=dataTxt[i].split("=");
				data[dataS[0]]=dataS[1];
			}

		}
	}
	return data;
}
var tpl =[]
var tpl2 =[]
var tpl3 =[]
    jQuery.getScript('//mat1.gtimg.com/apps/test2/web_wcevent.json',function(){

	      var _i =jQuery("#sjsj").attr("competitionId")+"_"+jQuery("#sjsj").attr("matchId");
	      // var _i = "5_738759";
	      var _url = 'http://sports.qq.com/kbsweb/football.htm?matchId='+jQuery("#sjsj").attr("matchId")+'&competitionId='+jQuery("#sjsj").attr("competitionId");
               var _size =  wcevent[_i].goals.length;
               
                  //  console.log(wcevent[_i].goals[0].name)
					if (wcevent[_i].param)
					  {
						  	
						//模版读取
						  jsonp = {
									h_name : wcevent[_i].homeName,
									a_name : wcevent[_i].awayName,
									h_shemen : wcevent[_i].param.home.totalScoringAtt,
									a_shemen : wcevent[_i].param.away.totalScoringAtt,
									h_shemenz : wcevent[_i].param.home.ontargetScoringAtt,
									a_shemenz : wcevent[_i].param.away.ontargetScoringAtt,
									h_chuanqiu : wcevent[_i].param.home.totalPass,
									a_chuanqiu : wcevent[_i].param.away.totalPass,
									h_kongql : wcevent[_i].param.home.possessionPercentage,
									a_kongql : wcevent[_i].param.away.possessionPercentage,
									h_fangui : wcevent[_i].param.home.fkFoulLost,
									a_fangui : wcevent[_i].param.away.fkFoulLost,
									h_jiaoqiu : wcevent[_i].param.home.wonCorners,
									a_jiaoqiu : wcevent[_i].param.away.wonCorners,
									h_url:_url
							        //h_cqcgv : wcevent[_i].param.home.possessionPercentage,
						    	    //a_cqcgv : wcevent[_i].param.away.possessionPercentage,
							};
							tpl.push((template.render("qishu", jsonp)));
					        tpl = tpl.join("");
							jQuery('#sjsj').html(tpl);

					//g_vs
					jsonp5 = {
									picUlr : wcevent[_i].homeBadge,
									picName : wcevent[_i].homeName,
									picUlr2 : wcevent[_i].awayBadge,
									picName2 : wcevent[_i].awayName,
									score : wcevent[_i].param.home.score,
									score2 : wcevent[_i].param.away.score
							       
							};
							tpl2.push((template.render("g_vs", jsonp5)));
					        tpl2 = tpl2.join("");
							jQuery('#g_vs2').html(tpl2);
				
			
			
/*

{
	"time": "63",
	"playerId": "50023",
	"teamId": "111",
	"type": "点球",
	"homeGoal": "1",
	"awayGoal": "0",
	"index": "0",
	"eventPeriod": "SecondHalf",
	"vid": "",
	"playUrl": "",
	"newsId": "",
	"newsAppUrl": "",
	"name": "戈麦斯"
}

*/						var _homeId = wcevent[_i].homeId;
						var _awayId = wcevent[_i].awayId;
						var _class = "";
						var _home = "";
						var _html = "";
						var _html2 = "";
						var _d = "'";
						 var awayResult= "";
                         var homeResult= "";
                           if(wcevent[_i].penalty) {
							//点球
								for (var i = 0; i <wcevent[_i].penalty.length; i++) {
							    //数据吐出
									if(wcevent[_i].penalty[i].homeResult=="1"){
									  homeResult = "num n_zq";
								    }else {
									   homeResult = "num n_x"; 
								    }
								    if(wcevent[_i].penalty[i].awayResult=="1"){
									awayResult = "num n_zq";
								    }else {
									   awayResult = "num n_x"; 
								    }
								
									_html2 += '<tr>'
										+'<td class="r"><span class="'+homeResult+'"></span></td>'
										+'<td class="col2">'+wcevent[_i].penalty[i].homePlayer+'</td>'												
										+'<td class="f14">'+wcevent[_i].penalty[i].round+'</td>'									
										+'<td>'+wcevent[_i].penalty[i].awayPlayer+'</td>'
									    +'<td class="l"><span class="'+awayResult+'"></span></td>'
									+'</tr>';
							
								}	
	                        }
	                      	jQuery('#kbs123').html(_html2);
						 jQuery("#kbs123  tr:odd").addClass("hui");
		                        //比赛中
							for (var i = 0; i <_size; i++) {
								
								if(wcevent[_i].goals[i].type=="红牌"){
									_class = "num";
								}
								if(wcevent[_i].goals[i].type=="进球"){
									_class = "num n_zq";
								}
								if(wcevent[_i].goals[i].type=="乌龙"){
									_class = "num n_wl";
								}
								if(wcevent[_i].goals[i].type=="点球"){
									_class = "num n_dq";
								}
								if(wcevent[_i].goals[i].teamId == _homeId){
									_home = true;
								}
								if(wcevent[_i].goals[i].teamId == _awayId){
									_home = false;
								}
								if(wcevent[_i].goals[i].type=="黄牌"){
									if (_home) {
										_class = "num hs";
										} else {_class = "num hs";}
									
								}
								jsonp3 = {
									ishome: _home,
									time: wcevent[_i].goals[i].time,
									playerId: wcevent[_i].goals[i].playerId,
									teamId: wcevent[_i].goals[i].teamId,
									type: wcevent[_i].goals[i].type,
									name: wcevent[_i].goals[i].name,
									vid: wcevent[_i].goals[i].vid
								};
								if(wcevent[_i].goals[i].teamId == _homeId){
									_html += '<tr>'
										+'<td class="r"><span class="'+_class+'"></span></td>'
										+'<td width="90" class="col2"><a href="javascript:void(0)" vid="'+wcevent[_i].goals[i].vid+'" class="vidPlay">'+wcevent[_i].goals[i].name+'</a></td>'												
										+'<td class="f14">'+wcevent[_i].goals[i].time +_d+'</td>'									
										+'<td width="94" class="ln"><a class="vidPlay"></a></td>'
									    +'<td width="31" class="l"><span></span></td>'
									+'</tr>';
								}else{
								
									_html += '<tr>'
										+'<td class="r"><span class=""></span></td>'
										+'<td width="90" class="col2"></td>'												
										+'<td class="f14">'+wcevent[_i].goals[i].time+_d+'</td>'									
										+'<td width="94" class="ln"><a href="javascript:void(0)" vid="'+wcevent[_i].goals[i].vid+'" class="vidPlay">'+wcevent[_i].goals[i].name+'</a></td>'
									    +'<td width="31" class="l"><span class="'+_class+'"></span></td>'
									+'</tr>';
									
								}
						}
						//看比赛比赛中...结束
				

						//var _htmlTpl  = template.render("kbs12_tpl", jsonp3) ;
						jQuery('#kbs12').html(_html);
						 jQuery("#kbs12  tr:even").addClass("hui");
								    
								jQuery(".vidPlay").bind("mouseover", function(){
										var _vid =jQuery(this).attr("vid");
if (_vid==""){}else {
									        // 弹出视频
									        var video = new tvp.VideoInfo();
									        video.setVid(_vid);
									        var player2 = new tvp.Player(300, 220);
									        player2.setCurVideo(video);
									        player2.addParam("adplay","0");
									        player2.addParam("autoplay","0");
									        player2.addParam("wmode", "transparent");
									        player2.write("mod_player2");
									        jQuery(".mod_player2").append('<a href="javascript:;"  id="closep" class="closep">关闭</a>');

									        jQuery(".mod_player2").css({"display":"block"});
									        jQuery("#tips_bg").removeClass("undis").addClass("dis");
									      }
								    });
								jQuery(".mod_player2").bind("click",function(){
									 jQuery(".mod_player2").css({"display":"none"});
									jQuery(".mod_player2 a").remove(".closep");
									jQuery("#mod_player2").html("");
									
								})
					  }   

					

					  							
    })

/*  |xGv00|aa5f784a467df45ef0c9924fa0598e0d */