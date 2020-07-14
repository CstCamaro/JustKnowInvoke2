jQuery.extend({
	'gyUser':{
		'userinfoObj':{},
		'uin':0,
		'isInit':false,
		'isFull':false,
		'checkLogin':function(){
			if(!!this.userinfoObj.uin && this.userinfoObj.uin>0) return this.userinfoObj.uin;
			if(!!global_userinfoobject.uin && global_userinfoobject.uin.replace(/[^\d]/,"")>0) return global_userinfoobject.uin;
			if(!this.isInit){
				this.init();
				return this.userinfoObj.uin;
			}	
			else
				return false;
		},'init':function(callback){
			if(this.isInit) return true;
			this.isInit = true;
			initHeaderLoginPlane(callback);
			$.gyUser.userinfoObj = global_userinfoobject;
			return global_userinfoobject;
		}
	}
});	/*  |xGv00|8a9fdea33157378c3d1523ea58da1a32 */