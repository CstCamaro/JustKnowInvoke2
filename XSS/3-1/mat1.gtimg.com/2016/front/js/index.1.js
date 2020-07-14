var tool = {
    // 获取精彩视频
    getWonderVideo : function(){
        var $ul = $('.jcsp_mod ul'),
            cid = $ul.data('cid');

        $.ajax({
            method: "GET",
            url: "http://data.video.qq.com/fcgi-bin/data",
            data: {
                tid: "426",
                idlist: cid,
                appid: "10001009",
                appkey: "c5a3e1529a7ba805",
                otype: "json"
            },
            dataType: "jsonp",
            cache: !0,
            scriptCharset: "utf-8"
        }).done(function(data){
            if( data.errorno==0 ){
                var videos = data.results[0].fields.videos,
                    len = videos.length,
                    len = len > 12 ? 12 : len,
                    html = '';

                for(var i=0; i<len; i++){
                    var item = videos[i],
                        time = item.c_tl,
                        minute = parseInt( time/60 ),
                        minute = minute<10 ? '0'+minute : minute,
                        second = parseInt( time%60 ),
                        t = minute +':'+second;

                    html += '<li>\
                                <a href="'+item.c_play_url+'" target="_blank">\
                                    <img src="'+item.c_pic_228_128+'" alt="'+item.c_title+'" />\
                                    <div class="shadow"><span class="time">'+t+'</span><span class="num">'+item.allnumc+'</span></div>\
                                </a>\
                                <p>'+item.c_title+'</p>\
                            </li>';
                }

                $ul.html( html );
            }
        })
    },
	
	getProjectVideo : function(){
		var $category = $('.categorywrapper .category');
		
		$category.each(function(){
			var $category_c_leftcon = $(this).find('.category-c-leftcon'),
				_url = $category_c_leftcon.data('url');
			
			if( _url ){
				$.ajax({
					url : _url,
					type : 'get',
					// data : {c_column_id : columnid},
					dataType : 'jsonp'
				}).done(function(data){
					if( data.total>0 && data.ret==0 ){
					
						var results = data.jsonvalue.results,
							len = results.length,
							html = '';
							
						if( len>0 ){
							var fields = results[0].fields;
							html += '<a class="category-c-top-img" href="'+fields.url+'" target="_blank">\
										<img src="'+fields.pic496x280+'" alt="" ></img>\
										<p>视频：'+fields.title+'</p>\
										<em></em>\
									</a>';
						}
						if( len>1 ){
							var fields = results[1].fields;
							html += '<a class="category-c-bottom-img" href="'+fields.url+'" target="_blank">\
										<p>\
											<img src="'+fields.pic_228_128+'" alt=""></img>\
											<span><em></em></span>\
										</p>\
										<div>视频：'+fields.title+'</div>\
									</a>';
						}

						$category_c_leftcon.append( html );
					}
					
				})
			}
		})
	},
	
	// 获取星彩云集的视频
	getXingVideo : function(){
		$.ajax({
			url : 'http://matchweb.sports.qq.com/qQLiveProgram/videoList?num=18',
			dataType : 'jsonp',
			type : 'get'
		}).done(function(result){
			if( result.code==0 ){
				var html = '',
					list = result.data.list,
					len = list.length,
					len = len>12 ? 12 : len;
					
				for(var i=0; i<len; i++){
					var item = list[i],
						minu = ('00'+parseInt( item.liveVidInfo.duration/60 )).substr(-2),
						second = ('00'+item.liveVidInfo.duration%60).substr(-2),
						time = minu+':'+second;
					
					html += '<li>\
								<a href="'+item.liveVidInfo.url+'" target="_blank" title="'+item.liveVidInfo.title+'" class="pic">\
									<img src="'+item.image+'" alt="">\
									<div class="shadow"><span class="time">'+time+'</span><span class="num">'+item.liveVidInfo.view+'</span></div>\
								</a>\
								<p><a href="'+item.liveVidInfo.url+'" target="_blank" title="'+item.liveVidInfo.title+'">'+item.liveVidInfo.title+'</a></p>\
							</li>';
							
					var j = len<5 ? len-1 : 5;
					if( i==j ){
						$('.xcyj_mod .tab-bd-item').find('.big ul').html( html );
					}
				}
				
				$('.jcsp_mod .pvinner').html( html );
			}
		})
	},

    init : function(){
        // this.getWonderVideo();
		this.getProjectVideo();
		this.getXingVideo();
    }
}

tool.init();

$("#focus_05").length && $("#focus_05").qqfocus({
    effect: 'fade',
    prev: ".prevBtn",
    next: ".nextBtn"
});

$("#scroll_jzt").length && $("#scroll_jzt").qqScroll({
    direction:"right",
    prev:".prev-btn",
    next:".next-btn",
    auto:false,
    step:5
});

$(".dkzk_mod .scroll_B").length && $(".dkzk_mod .scroll_B").qqScroll({
    direction:"right",
    prev:".prev-btn",
    next:".next-btn",
    auto:false,
    step:6
});

$('.tab').on('click', '.tab-hd-item', function(){
    var $this = $(this),
        index = $this.index(),
        $tab_bd = $this.parents('.tab').find('.tab-bd'),
        $tab_bd_item = $tab_bd.find('.tab-bd-item');

    $this.addClass('active').siblings().removeClass('active');
    $tab_bd_item.removeClass('show').eq(index).addClass('show');
})

var _data = { "one":{ "title":"里约会议中心", "data":[ { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/99/78/2053/133516314.png",
"address":"里约会议中心2号馆", "item" :"举重", "num" :9000, "summary":"里约会议中心是当地主要的会展中心，临近奥运村，距离巴拉奥林匹克公园只有5分钟的路程。" }, { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/100/78/2053/133516315.jpg",
"address":"里约会议中心3号馆", "item" :"乒乓球", "num" :7000, "summary":"里约会议中心是当地主要的会展中心，临近奥运村，距离巴拉奥林匹克公园只有5分钟的路程。" }, { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/98/141/2053/133532378.jpg",
"address":"里约会议中心4号馆", "item" :"羽毛球", "num" :6500, "summary":"里约会议中心是当地主要的会展中心，临近奥运村，距离巴拉奥林匹克公园只有5分钟的路程。" }, { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/99/141/2053/133532379.jpg",
"address":"里约会议中心6号馆", "item" :"拳击", "num" :6500, "summary":"里约会议中心是当地主要的会展中心，临近奥运村，距离巴拉奥林匹克公园只有5分钟的路程。" } ] }, "two":{ "title":"巴拉奥林匹克公园",
"data":[ { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/47/80/2053/133516772.jpg", "address":"卡里奥卡体育馆1号馆", "item" :"篮球",
"num" :16000, "summary":"该馆位于巴拉奥林匹克公园，距离奥运村五分钟路程。在奥运会期间，它将举办篮球比赛，残奥会时进行轮椅篮球和轮椅橄榄球比赛。" }, { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/112/141/2053/133532392.jpg",
"address":"卡里奥卡体育馆2号馆", "item" :"柔道、摔跤", "num" :10000, "summary":"2号馆位于巴拉奥林匹克公园，距离奥运村五分钟路程。在奥运会期间，它将举办摔跤、柔道比赛。奥运会结束后，它将成为奥林匹克训练中心的一部分。"
}, { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/113/141/2053/133532393.jpg", "address":"卡里奥卡体育馆3号馆", "item" :"击剑、跆拳道",
"num" :10000, "summary":"3号馆位于巴拉奥林匹克公园，距离奥运村五分钟路程。在奥运会期间，它将举办击剑、跆拳道比赛。奥运会结束后，它将成为奥林匹克训练中心的一部分。" }, { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/203/143/2053/133532993.jpg",
"address":"里约奥林匹克体育馆", "item" :"竞技体操、艺术体操、蹦床", "num" :12000, "summary":"里约奥林匹克体育馆是为2007年的泛美运动会所建，它是里约最大的室内体育馆，广泛用于大型体育赛事、音乐会和各种文化活动。"
}, { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/251/141/2053/133532531.jpg", "address":"玛利亚-伦克水上运动中心", "item" :"跳水、花样游泳、水球",
"num" :6500, "summary":"玛利亚-伦克水上运动中心是巴西为了2007年泛美运动会所建，将会在里约奥运会期间用于跳水、花样游泳和水球的比赛。" }, { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/16/142/2053/133532551.jpg",
"address":"奥林匹克水上运动中心", "item" :"游泳、水球", "num" :18000, "summary":"奥林匹克水上运动中心位于巴拉奥林匹克公园的心脏地带，距离奥运村有10分钟的路程。" }, { "imgUrl"
:"http://img1.gtimg.com/sports/pics/hv1/34/142/2053/133532569.jpg", "address":"奥林匹克网球中心", "item" :"网球", "num" :18250, "summary":"奥林匹克网球中心将为巴西体育运动留下宝贵遗产，奥运结束之后，除了成为奥林匹克训练中心一部分，还将举行顶级网球赛事。残奥会期间，它还会举办五人制足球的比赛。"
}, { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/72/142/2053/133532607.jpg", "address":"未来体育馆", "item" :"手球", "num"
:12000, "summary":"未来体育馆是一座临时建筑，在奥运会结束后将被拆除，然后在4所公立学校中重新搭建成小型体育设施。组委会称这项举动将会留下宝贵的社会遗产。" } ] }, "three":{ "title":"奥林匹克高尔夫球场",
"data":[ { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/233/82/2053/133517468.jpg", "address":"里约热内卢巴拉地区", "item" :"高尔夫",
"num" :15000, "summary":"奥林匹克高尔夫球场距离奥运村约5公里。奥运会结束后，它将成为一个公共课程和培训中心，目的是促进巴西和南美洲高尔夫运动发展，同时还会举办顶级赛事。" } ] }, "four":{ "title":"奥运村",
"data":[ { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/132/150/2054/133599732.jpeg", "address":"里约热内卢西部", "item" :"奥运村",
"num" :10160, "summary":"里约奥运村总共拥有３１栋楼房（每栋１７层）、3604个套间和10160个床位。在奥运会期间，其内部设施还将包括餐厅、医疗和健身中心等临时建筑。" } ] }, "five":{ "title":"彭特尔海滩",
"data":[ { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/232/83/2053/133517722.jpg", "address":"里约热内卢西部", "item" :"竞走、自行车计时赛",
"num" :5000, "summary":"彭特尔是里约热内卢巴拉地区西部一处美丽的海滩，曾经被巴西传奇音乐家提姆迈亚写进歌曲中。奥运会期间，它会是自行车计时赛和田径竞走比赛的起点和终点。" } ] }, "six":{ "title":"德奥多罗奥林匹克公园",
"data":[ { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/129/84/2053/133517874.jpg", "address":"山地自行车中心", "item" :"山地自行车",
"num" :5000, "summary":"山地自行车中心位于德奥多罗奥林匹克公园里的X-公园，赛段全长4.8公里，将会保证每名选手在观众面前骑行经过不止一次。" }, { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/149/142/2053/133532684.jpg",
"address":"BMX小轮车中心", "item" :"BMX小轮车", "num" :7500, "summary":"BMX小轮车中心位于X-公园内，所建成的永久赛道长度在350米到400米之间。" }, { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/150/142/2053/133532685.jpg",
"address":"白水体育场", "item" :"皮划艇激流回旋 ", "num" :8000, "summary":"白水体育场将会有一条250米长的永久赛道，奥运会结束后除了继续为运动员提供皮划艇激流回旋训练场地，也会用于公众休闲游戏。"
} ] }, "serven":{ "title":"青年体育馆", "data":[ { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/169/84/2053/133517914.jpg",
"address":"德奥多罗奥林匹克公园", "item" :"篮球、现代五项", "num" :5000, "summary":"青年体育馆将举办篮球比赛和现代五项中的击剑比赛，青年体育馆、德奥多罗体育场、德奥多罗水上运动中心这三座场馆被合称为德奥多罗现代五项公园。"
} ] }, "eight":{ "title":"奥林匹克曲棍球中心", "data":[ { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/43/85/2053/133518043.jpg",
"address":"德奥多罗奥林匹克公园", "item" :"曲棍球", "num" :14000, "summary":"奥林匹克曲棍球中心是为2007年的泛美运动会而建，目前是巴西国家队的训练基地。" } ] }, "nine":{
"title":"德奥多罗体育场", "data":[ { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/103/85/2053/133518103.jpg", "address":"德奥多罗奥林匹克公园",
"item" :"七人制橄榄球、现代五项", "num" :15000, "summary":"德奥多罗体育场是在现有的马球场基础上进行搭建。除了现代五项的马术和跑射联项部分，还会举行七人制橄榄球比赛。" } ] }, "ten":{ "title":"德奥多罗水上运动中心",
"data":[ { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/156/85/2053/133518156.jpg", "address":"德奥多罗奥林匹克公园", "item" :"现代五项",
"num" :2000, "summary":"该馆将会举行现代五项中的游泳比赛部分，击剑在青年体育馆进行，马术、跑射联项在德奥多罗体育场进行，三个场馆相隔不过300米，对选手们非常方便。" } ] }, "eleven":{ "title":"奥林匹克马术中心",
"data":[ { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/209/85/2053/133518209.jpg", "address":"德奥多罗奥林匹克公园", "item" :"马术",
"num" :14000, "summary":"奥林匹克马术中心是为2007年的泛美运动会而建，为了迎接里约奥运会进行了翻新和扩大，它会在奥运会期间进行马术项目的所有比赛。" } ] }, "twelve":{ "title":"奥林匹克射击中心",
"data":[ { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/234/85/2053/133518234.jpg", "address":"德奥多罗奥林匹克公园", "item" :"射击",
"num" :8500, "summary":"奥林匹克射击中心是为2007年的泛美运动会而建，目前成为高水平选手所钟爱的训练场所。这座场馆设计上考虑周到，为奥运会只需要做出很小的修改就行。" } ] }, "thirteen":{ "title":"森巴竞技场",
"data":[ { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/50/86/2053/133518305.jpg", "address":"马拉卡纳地区", "item" :"射击、田径",
"num" :36000, "summary":"是传说中里约狂欢节游行的起点，已在2016年里约奥运会前进行了重大的变革。这里将成为奥运会马拉松比赛的起点和终点，同时将举办奥运会和残奥会的射箭赛事。" } ] }, "fourteen":{
"title":"奥林匹克体育馆", "data":[ { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/24/143/2053/133532814.jpg", "address":"马拉卡纳地区西部",
"item" :"足球、田径 ", "num" :60000, "summary":"奥林匹克体育场是为2007泛美运动会而建，该体育场在奥运会和残奥会期间举办足球比赛和田径田径比赛，同时将把45,000的容量暂时增加至60,000人次。"
} ] }, "fifteen":{ "title":"马拉卡纳体育场地区", "data":[ { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/143/86/2053/133518398.jpg",
"address":"马拉卡纳地区", "item" :"足球、开闭幕式", "num" :90000, "summary":"马拉卡纳体育场最初是为了1950年世界杯而建，2014年世界杯时，它又举行了7场比赛，其中就包括最后的决赛。奥运会期间，这里除了男足和女足的比赛，还会上演盛大的开闭幕式。"
}, { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/39/143/2053/133532829.jpg", "address":"小马拉卡纳体育馆", "item" :"足球", "num"
:12000, "summary":"小马拉卡纳体育馆临近著名的马拉卡纳体育场，是巴西排球传统的大本营。为了2007年的泛美运动会，小马拉卡纳体育馆曾经进行过彻底的翻新。" } ] }, "sixteen":{ "title":"拉戈阿体育场",
"data":[ { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/176/86/2053/133518431.jpg", "address":"罗德里格环礁", "item" :"赛艇、皮划艇静水",
"num" :5000, "summary":"拉戈阿体育场坐落在市中心壮观的山脉间，与著名的耶稣像遥望。这里将会举办奥运会传统的赛艇项目，再加上皮划艇静水的比赛。" } ] }, "seventeen":{ "title":"科帕卡巴纳堡",
"data":[ { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/14/87/2053/133518524.jpg", "address":"科帕卡巴纳海滩", "item" :"游泳公开水域、公路自行车、铁人三项",
"num" :5000, "summary":"科帕卡巴纳堡由军事基地变成向公众开放的历史博物馆。公路自行车比赛将会以此作为起点和终点。残奥会的马拉松比赛也将以此作为起点和终点。" } ] }, "eighteen":{ "title":"格洛丽亚码头",
"data":[ { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/185/87/2053/133518695.jpg", "address":"弗拉明戈公园", "item" :"帆船帆板",
"num" :10000, "summary":"格洛丽亚码头靠近市中心和弗拉明戈公园，以风景壮丽的面包山及科尔科瓦多山为背景。这里还曾经举行了2014年世界杯的抽签仪式。" } ] }, "nineteen":{ "title":"科帕卡巴纳体育场",
"data":[ { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/84/88/2053/133518849.jpg", "address":"科帕卡巴纳海滩", "item" :"沙滩排球",
"num" :12000, "summary":"里约奥运会的沙排赛场位于著名的科帕卡巴纳海滩，曾举办过2007年泛美运动会的沙排、铁人三项和公开水域比赛。" } ] }, "twenty":{ "title":"米内罗体育场", "data":[
{ "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/138/88/2053/133518903.png", "address":"贝洛奥里藏特市", "item" :"足球", "num" :74000,
"summary":"米内罗球场1965年由巴西著名的已故设计师奥斯卡·尼迈耶设计，之后被巴西评定为文化遗产。为了迎接2014年世界杯，该球场于2012年完成了翻修工程。" } ] }, "twentyone":{ "title":"巴西利亚国家体育场",
"data":[ { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/199/89/2053/133519219.jpg", "address":"巴西利亚市", "item" :"足球",
"num" :76000, "summary":"巴西利亚国家体育场坐落于奠定巴西利亚城市基本格局的中央轴线之上。“体育场碗状看台”由一个环形的广场围绕，全部交通连接设置于广场之内，广场的“柱林”之上由屋面覆盖。" } ] }, "twentytwo":{
"title":"亚马逊体育场", "data":[ { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/199/91/2053/133519729.jpg", "address":"玛瑙斯市",
"item" :"足球", "num" :40549, "summary":"亚马逊球场为2014年世界杯而建，之后成为韦瓦尔朗足球俱乐部的主场。世界杯期间，来这里比赛的球员却对湿热的天气、时常出没的有毒动物抱怨不堪。" } ] }, "twentythree":{
"title":"马拉卡纳体育场", "data":[ { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/143/86/2053/133518398.jpg", "address":"马拉卡纳地区",
"item" :"足球、开闭幕式", "num" :90000, "summary":"马拉卡纳体育场最初是为了1950年世界杯而建，2014年世界杯时，它又举行了7场比赛，其中就包括最后的决赛。奥运会期间，这里除了男足和女足的比赛，还会上演盛大的开闭幕式。"
} ] }, "twentyfour":{ "title":"新水源竞技场", "data":[ { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/27/97/2053/133521087.jpg",
"address":"萨尔瓦多市", "item" :"足球", "num" :20000, "summary":"新水源竞技场于1951年1月28日开放，多次举办巴伊亚和维多利亚体育俱乐部间的德比。2007年11月关闭三年后拆除。新球场在旧址上修建，仿造它的前身，覆盖了轻型金属顶棚。"
} ] }, "twentyfive":{ "title":"科林蒂安体育场", "data":[ { "imgUrl" :"http://img1.gtimg.com/sports/pics/hv1/46/97/2053/133521106.jpg",
"address":"圣保罗市", "item" :"足球", "num" :48000, "summary":"科林蒂安体育场是为2014年世界杯而建，当时揭幕战就是在此球场举行，随后成为巴甲豪门科林蒂安队的主场。" } ] } }


;(function(){
    var obj = $("#map-scroll");
    var address = $("#map-address");
    function inintScroll(){
        var config = {
            direction: "right",
            step: 1,
            speed:800,
            time:4000,
            auto:false
        };
        $("#map-scroll").paraScroll(config);
    }
    function initData(data,text){
        var tmp = _data[data].data;
        if(tmp == " ") return false;
        var title = _data[data].title;
        var length = tmp.length;
        var html = "";
        obj.find("h2").html('<em>'+text+'</em>'+title);
        obj.find(".inner").html('<ul class="list"></ul>');
        for(var i=0;i<length;i++){
            var _tdata = tmp[i];
            html += '<li class="split">'
            +'<a href="javascript:void(0)">'
            +'<img src="'+_tdata.imgUrl+'">'
            +'</a>'
            +'<p class="s-top"><span>地理位置：</span>'+_tdata.address+'</p>'
            +'<p><span>比赛项目：</span>'+_tdata.item+'</p>'
            +'<p><span>容纳观众数：</span>'+_tdata.num+'</p>'
            +'<p class="s-bottom">'+_tdata.summary+'</p>'
            +'</li>';
        }
        obj.find(".list").html(html);
        if(length > 1){
            $("#map-scroll").find(".btn").show();
            inintScroll()
        }else{
            $("#map-scroll").find(".btn").hide();
        };
        obj.fadeIn();
    }
    initData(address.find(".current").attr("data-id"),address.find(".current").text());

    $("#map-address span").each(function(){
        var _index = $(this);
        _index.on("click",function(){
            if(!_index.hasClass("current")){
                $("#map-address span").removeClass("current");
                _index.addClass("current");
                var data = _index.attr("data-id");
                var text = _index.text();
                initData(data,text);
            }
        })

    })
})();

var d1 = new Date().getTime(),
    d2 = new Date("2016/08/06 07:00").getTime(),
    dayNum = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));

$('.empty_area').html('<strong>' + dayNum + '</strong>');/*  |xGv00|691fa81d298f0a8567b6aaf75bcc78a4 */