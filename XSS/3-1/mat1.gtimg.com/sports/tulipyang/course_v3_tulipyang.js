jQuery.ajax({
    //url: 'http://mat1.gtimg.com/apps/test2/web_shasha_208_new_test.json',
    url: 'http://mat1.gtimg.com/apps/test2/web_shasha_208_new.json',
    dataType: "script",
    jsonpCallback: "matchList208Callback"
    /*success: function(){
        html = '<dt><h2>' + matches[0].roundName + '</h2></dt>';
        for( var i=0, len = matches.length; i<len; i++){
	        var zb = '';
            if(matches[i].ifHasVideo == false){
                zb = '<span class="zb zb_t"></span>';
            }else{
                zb = '<span class="zb zb_v"></span>';
            }
            if(matches[i].period == '比赛前'){
                html += '<dd><div class="team"><a href="http://sports.qq.com/kbsweb/football.htm?matchId=' + matches[i].matchId + '&competitionId=' + matches[i].competitionId + '" target="_blank"><div class="item fl"><img src="' + matches[i].homeBadge + '" alt="' + matches[i].homeName + '" height="36" width="34"><span>' + matches[i].homeName.slice(-2) + '</span></div><div class="score fl"><span class="vs">vs</span>' + zb + '</div><div class="item fr"><img src="' + matches[i].awayBadge + '" alt="' + matches[i].awayName + '" height="36" width="34"><span>' + matches[i].awayName.slice(-2) + '</span></div></a></div><p class="time">' + (matches[i].startTime.slice(5,16)) + '-未开始</p></dd>';
            }else if(matches[i].period == '比赛中'){
                html += '<dd class="on"><div class="team"><a href="http://sports.qq.com/kbsweb/football.htm?matchId=' + matches[i].matchId + '&competitionId=' + matches[i].competitionId + '" target="_blank" title="' + matches[i].homeName + '"><div class="item fl"><img src="' + matches[i].homeBadge + '" alt="' + matches[i].homeName + '" height="36" width="34"><span>' + matches[i].homeName + '</span></div><div class="score fl"><span class="vs">vs</span>' + zb + '</div><div class="item fr"><img src="' + matches[i].awayBadge + '" alt="' + matches[i].awayName + '" height="36" width="34"><span>' + matches[i].awayName + '</span></div></a></div><p class="time">' + (matches[i].startTime.slice(5,16)) + '-进行中</p></dd>';
            }else{
                html += '<dd class="end"><div class="team"><a href="http://sports.qq.com/kbsweb/football.htm?matchId=' + matches[i].matchId + '&competitionId=' + matches[i].competitionId + '" target="_blank" title="' + matches[i].homeName + '"><div class="item fl"><img src="' + matches[i].homeBadge + '" alt="' + matches[i].homeName + '" height="36" width="34"><span>' + matches[i].homeName + '</span></div><div class="score fl"><span class="bf">1:2</span>' + zb + '</div><div class="item fr"><img src="' + matches[i].awayBadge + '" alt="' + matches[i].awayName + '" height="36" width="34"><span>' + matches[i].awayName + '</span></div></a></div><p class="time">' + (matches[i].startTime.slice(5,16)) + '-已结束</p></dd>';
            }
        }
        jQuery("#course .split").eq(0).html(html)
    }*/
});
function matchList208Callback(json){
	var match = json.matches,
		round = parseInt(json.roundNumber)-1;
	for(var r=1; r<=30; r++){
		html = '<dt><h2>' + match[r][0].roundName + '</h2></dt>';
        for( var i=0, len = match[r].length; i<len; i++){
	        var zb = '';
            if(match[r][i].liveId == ''){
                zb = '<span class="zb zb_t"></span>';
            }else{
                zb = '<span class="zb zb_v"></span>';
            }
            if(match[r][i].period == '比赛取消'){
            	html += '<dd><div class="team"><a href="http://sports.qq.com/kbsweb/football.htm?matchId=' + match[r][i].matchId + '&competitionId=' + match[r][i].competitionId + '" target="_blank"><div class="item fl"><img src="' + match[r][i].homeBadge + '" alt="' + match[r][i].homeName + '" height="36" width="34"><span>' + match[r][i].homeName + '</span></div><div class="score fl"><span class="vs">vs</span>' + zb + '</div><div class="item fr"><img src="' + match[r][i].awayBadge + '" alt="' + match[r][i].awayName + '" height="36" width="34"><span>' + match[r][i].awayName + '</span></div></a></div><p class="time">' + (match[r][i].startTime.slice(5,16)) + '-' + match[r][i].period + '</p></dd>';
            }else if(match[r][i].period == '比赛前' || match[r][i].period == '比赛延期'){
                html += '<dd><div class="team"><a href="http://sports.qq.com/kbsweb/football.htm?matchId=' + match[r][i].matchId + '&competitionId=' + match[r][i].competitionId + '" target="_blank"><div class="item fl"><img src="' + match[r][i].homeBadge + '" alt="' + match[r][i].homeName + '" height="36" width="34"><span>' + match[r][i].homeName + '</span></div><div class="score fl"><span class="vs">vs</span>' + zb + '</div><div class="item fr"><img src="' + match[r][i].awayBadge + '" alt="' + match[r][i].awayName + '" height="36" width="34"><span>' + match[r][i].awayName + '</span></div></a></div><p class="time">' + (match[r][i].startTime.slice(5,16)) + '-未开始</p></dd>';
            }else if(match[r][i].period == '比赛中'){
                html += '<dd class="on"><div class="team"><a href="http://sports.qq.com/kbsweb/football.htm?matchId=' + match[r][i].matchId + '&competitionId=' + match[r][i].competitionId + '" target="_blank" title="' + match[r][i].homeName + '"><div class="item fl"><img src="' + match[r][i].homeBadge + '" alt="' + match[r][i].homeName + '" height="36" width="34"><span>' + match[r][i].homeName + '</span></div><div class="score fl"><span class="vs">vs</span>' + zb + '</div><div class="item fr"><img src="' + match[r][i].awayBadge + '" alt="' + match[r][i].awayName + '" height="36" width="34"><span>' + match[r][i].awayName + '</span></div></a></div><p class="time">' + (match[r][i].startTime.slice(5,16)) + '-进行中</p></dd>';
            }else{
                if( match[r][i].videoUrl ){
                    html += '<dd class="end"><div class="team"><a href="' + match[r][i].videoUrl + '" target="_blank" title="' + match[r][i].homeName + '"><div class="item fl"><img src="' + match[r][i].homeBadge + '" alt="' + match[r][i].homeName + '" height="36" width="34"><span>' + match[r][i].homeName + '</span></div><div class="score fl"><span class="bf">' + match[r][i].homeGoal + ':' + match[r][i].awayGoal + '</span>' + zb + '</div><div class="item fr"><img src="' + match[r][i].awayBadge + '" alt="' + match[r][i].awayName + '" height="36" width="34"><span>' + match[r][i].awayName + '</span></div></a></div><p class="time">' + (match[r][i].startTime.slice(5,16)) + '-已结束</p></dd>';
                }else{
                    html += '<dd class="end"><div class="team"><a href="http://sports.qq.com/kbsweb/football.htm?matchId=' + match[r][i].matchId + '&competitionId=' + match[r][i].competitionId + '" target="_blank" title="' + match[r][i].homeName + '"><div class="item fl"><img src="' + match[r][i].homeBadge + '" alt="' + match[r][i].homeName + '" height="36" width="34"><span>' + match[r][i].homeName + '</span></div><div class="score fl"><span class="bf">' + match[r][i].homeGoal + ':' + match[r][i].awayGoal + '</span>' + zb + '</div><div class="item fr"><img src="' + match[r][i].awayBadge + '" alt="' + match[r][i].awayName + '" height="36" width="34"><span>' + match[r][i].awayName + '</span></div></a></div><p class="time">' + (match[r][i].startTime.slice(5,16)) + '-已结束</p></dd>';
                }
            }
        }
        jQuery("#course .split").eq(r-1).html(html)
	}
	//console.log(json.matches,json.roundNumber,round,typeof(round));
	new Course("#course","click",round);
}
//course
function Course(id,event,idx) {
	this.id = jQuery(id);
	this.event = event;
	this.tabHd = this.id.find(".round");
	this.tabHdItem = this.id.find(".round_item");
	this.tabBd = this.id.find(".list");
	this.tabBdItem = this.id.find(".split");
	this.len = this.tabHdItem.length;
	this.prevBtn = this.id.find(".prev");
	this.nextBtn = this.id.find(".next");
	this.ind = idx;
	this.init();
};
Course.prototype = {
    init:function(){
        var _this = this;
        _this.tabBd.width(_this.len*1190);
        //_this.tabHdItem.eq(0).addClass("current").siblings().removeClass("current");
        //console.log(_this.num,_this.per,_this.width,_this.addNums(_this.width))
        _this.tabs(_this.ind);

        _this.tabHdItem.on(_this.event,function(){
            _this.ind = jQuery(this).index();
            _this.tabs(_this.ind);
        });
        _this.prevBtn.click(function(){
            _this.prev();
        });
        _this.nextBtn.click(function(){
            _this.next();
        });
    },
    tabs:function(ind){
        var _this = this;
        _this.tabHdItem.eq(ind).addClass("current").siblings().removeClass("current");
        _this.tabBd.animate({left:-1190*ind});
        if( ind == 0 ){
            _this.prevBtn.addClass("none");
            _this.nextBtn.removeClass("none");
        }else if(ind == _this.len-1){
            _this.nextBtn.addClass("none");
            _this.prevBtn.removeClass("none");
        }else{
            _this.prevBtn.removeClass("none");
            _this.nextBtn.removeClass("none");
        }
    },
    prev:function(){
        var _this = this;
        _this.nextBtn.removeClass("none");
        if(_this.ind == 0){
            return false;
        }else{
            _this.ind--;
            if(_this.ind == 0){
                _this.prevBtn.addClass("none"); 
            }
        }
        _this.tabs(_this.ind);
    },
    next:function(){
        var _this = this;
        _this.prevBtn.removeClass("none");
        if(_this.ind == _this.len-1){
            return false;
        }else{
            _this.ind++;
            if(_this.ind == _this.len-1){
                _this.nextBtn.addClass("none");
            }
        }
        _this.tabs(_this.ind);
    }
}


jQuery(".roundBtn").on("click",function(){
    jQuery(this).toggleClass("curBtn").next().toggle(300).hover(function(){},function(){$(this).hide()});
});/*  |xGv00|9c3bcc0ad01f794c188718a66c7988e9 */