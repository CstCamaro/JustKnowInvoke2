
$(window).scroll(function() {
		var winH = $(window).scrollTop();
//		var tru = true;
		if(winH >= $("#m_wrap").offset().top -65 && winH <= $("#m_wrap").offset().top + 25 ){
			tru = false;
			show();
//			tru();
		}
	}) 
//	function tru(){
//		setTimeout(tru = true,500)
//	}
	function movie1(){
		($("#main .r11").addClass("moveInRight"));
		($("#main .vs1").addClass("fadeIn"));
		($("#main .r12").addClass("moveInLeft"));
	}
	function movie2(){
		($("#main1 .r21").addClass("moveInRight"));
		($("#main1 .vs2").addClass("fadeIn"));
		($("#main1 .r22").addClass("moveInLeft"));
	}
	function show(){
		movie1();
		var self = $("#m_wrap");
		self.index= 0;
		$('body').bind('mousewheel', function(event, delta) { 
			var $this = $(this),
				timeoutId = $this.data('timeoutId');
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			$this.data('timeoutId', setTimeout(function() {
				if (delta > 0) {
					// 往上滚
					self.index--;
				 } else if (delta < 0) {
					 // 往下
					 self.index++;					 
				 } else {
					return; 
				 }
				switch (self.index)
				{
				case 0:
				  $("#main1").hide();
				  $("#main").fadeIn(100)
				  $("#main2").hide();
				  movie1();
				  break;
				case 1:
				  $("#main").hide();
				  $("#main1").fadeIn(100)
				  $("#main2").hide();
				  movie2();
				  break;
				case 2:
				  $("#main1").hide();
				  $("#main2").fadeIn(100)
				  $("#main").hide();
				  break;
				case -2:
				  $("#main").hide();
				  $("#main1").fadeIn(100)
				  $("#main2").hide();
				  movie2();
				  break;
				case -1:
				  $("#main").hide();
				  $("#main2").fadeIn(100)
				  $("#main1").hide();
				  break;
				case -3:
				  $("#main1").hide();
				  $("#main").fadeIn(200)
				  $("#main2").hide();
				  movie1();
				  break;
				default:
				  $('body').unbind();
				  break;
				}

				
				$this.removeData('timeoutId');
				$this = null
			}, 300));
            return false; 
        });  
	}
	
/*  |xGv00|e680958f9ce493af0cbb119ee4e7aee8 */