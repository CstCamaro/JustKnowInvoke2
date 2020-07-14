function aStyle(id, n, cur_class ,tag){
		var tds = document.getElementById(id).getElementsByTagName(tag);
		var cur_td = cur_tem_td = tds[n-1];
		cur_td.className = cur_class;
			(function(){
				
				for(var i=0; i<tds.length; i++){
					tds[i].onmouseover = function(){
						if(cur_tem_td != this){
							cur_tem_td.className = '';
							this.className = cur_class;
							cur_tem_td = this;
						}
					}

					tds[i].onmouseout = function(){
						if(cur_td != this){
							this.className = '';
							cur_td.className = cur_class;
							cur_tem_td = cur_td;
						}
					}
				}
			})();
		};
	





	
	/*  |xGv00|32cb46834be0affe7f78715165a6cf01 */