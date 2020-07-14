
;{
	var util = {
		createPostContainer_flag:function(_url,func,container,errFunc,flag,method){
				if( method == undefined){
					method = "post"
				}
				var self = this;
				var oArea = (container && container.length) ? container : $(document.body);
				var oFrame = $('#_messagepost_'+flag).size() ? $('#_messagepost_'+flag) : $('<iframe id="_messagepost_' + flag + '" name="_messagepost_' + flag + '" style="display:none"></iframe>').appendTo(oArea);
				oFrame.unbind().bind('load',function(result){
					try{
						if(this.contentWindow.data){
							var oData = this.contentWindow.data;
							if(oData){
								typeof func === 'function' && func(oData);
							}else{
								if(typeof errFunc === 'function'){
									return errFunc(oData);
								}
							}
						}
						oFrame.remove();
					}catch(err){
						//alert(err);
					}
				});

				var _form = $('#_messageform_'+flag);
					(_form && _form.size()) ?(function(){
						_form.attr('action',_url);
						_form.get(0).reset();
					})() : _form = $('<form action="'+ _url +'" method="'+ method +'" target="_messagepost_' + flag + '" id="_messageform_' + flag + '" style="display:none;"></form>').appendTo(oArea);
				return _form;
			}
	}
}/*  |xGv00|e8aefd0d29995b4bf8e285a09ce068eb */