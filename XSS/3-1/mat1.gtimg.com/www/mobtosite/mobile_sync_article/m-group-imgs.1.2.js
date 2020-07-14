require(['jquery'], function ($) {

var hd_photos_datas = null,hd_photos_data = null;
var load_photo_data = function(){
        if(!window.json_group_imgs) return;
		var data = [];
        for(var i=0;i<json_group_imgs.length;i++){
          var img_group = json_group_imgs[i];
          var title = img_group.title;
          var group = [];
          for(var j=0;j<img_group.content.length;j++){
            var photo = {};
            var item = img_group.content[j];
            photo.img = item.imgurl;
            photo['abstract'] = item.desc;
            photo.title = title;
            group.push(photo);
          }
          data.push(group);
        }
        return data;
}
var _reset = function(_index){
	hd_photos_data = hd_photos_datas[_index-1];
	hdPhoto.index = 0;
	$(".hd-column-count-list a").removeClass("active").eq(_index-1).addClass('active');
	$('#hd-photos h3 a').html(hd_photos_data[0].title);
	$('#hd-photos .img img').attr('src',hd_photos_data[0].img);
	$('#hd-photos .abstract').html(hd_photos_data[0].abstract);
	$('#hd-photos .number').html('<b>1</b><i>/</i><em>'+hd_photos_data.length+'</em>');
	$('#preArrow_A').hide();
	$('#nextArrow_A').hide();
	hdPhotoReset();
};
var hdPhoto=function(){
	hd_photos_datas = load_photo_data();
	var count_link = '';
	for(var i=0;i<hd_photos_datas.length;i++){
		count_link +='<a href="javascript:;">'+(i+1)+'</a>'
	}
	$(".hd-column-count-list").html(count_link);
	hd_photos_data = hd_photos_datas[0];
	$(".hd-column-count-list").on('click','a',function(){
	    var _m = $(this);
		if(_m.hasClass('active')){
			return;
		}else{
			_m.addClass('active');
		}
		var _index = parseInt($(this).html());
		_reset(_index);
	});
	
	_reset(1);
	
	$('#hd-photos .hd-photos-btn-prev').mouseover(function(){
		$('#preArrow_A').show();
	});
	$('#hd-photos .hd-photos-btn-prev').mouseout(function(){
		$('#preArrow_A').hide();
	});
	$('#hd-photos .hd-photos-btn-prev').click(function(){
		if(hdPhoto.index>0){
			hdPhoto.index--;
		}
		
		$('#hd-photos .img img').attr('src',hd_photos_data[hdPhoto.index].img);
		$('#hd-photos .abstract').html(hd_photos_data[hdPhoto.index].abstract);
		$('#hd-photos .number').html('<b>'+(hdPhoto.index+1)+'</b><i>/</i><em>'+hd_photos_data.length+'</em>');
		hdPhotoReset();
	});
	$('#hd-photos .hd-photos-btn-next').mouseover(function(){
		$('#nextArrow_A').show();
	});
	$('#hd-photos .hd-photos-btn-next').mouseout(function(){
		$('#nextArrow_A').hide();
	});
	$('#hd-photos .hd-photos-btn-next').click(function(){
		
		if(hdPhoto.index<hd_photos_data.length-1){
			hdPhoto.index++;
		}
		$('#hd-photos .img img').attr('src',hd_photos_data[hdPhoto.index].img);
		$('#hd-photos .abstract').html(hd_photos_data[hdPhoto.index].abstract);
		$('#hd-photos .number').html('<b>'+(hdPhoto.index+1)+'</b><i>/</i><em>'+hd_photos_data.length+'</em>');
		hdPhotoReset();
	});
}
var hdPhotoReset=function(){
	var prev = $('#hd-photos .hd-photos-btn-prev');
	var next = $('#hd-photos .hd-photos-btn-next')
	if(hd_photos_data.length==1){
		prev.addClass('hd-photos-btn-prev-hidden');
		next.addClass('hd-photos-btn-next-hidden');
	}else{
		if(hdPhoto.index == 0){
			prev.addClass('hd-photos-btn-prev-hidden');
			next.removeClass('hd-photos-btn-next-hidden');
		}else if(hdPhoto.index == hd_photos_data.length-1){
			prev.removeClass('hd-photos-btn-prev-hidden');
			next.addClass('hd-photos-btn-next-hidden');
		}else{
			prev.removeClass('hd-photos-btn-prev-hidden');
			next.removeClass('hd-photos-btn-next-hidden');
		}
	}

}
hdPhoto.index=0;
hdPhoto();

});/*  |xGv00|29a4a6a37982a1c1f343b359d677a421 */