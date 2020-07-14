/**
 * 汽车商城js
 **/
;(function($){
	document.domain = 'qq.com';
	var _form   = util.createPostContainer_flag('//automall.qq.com/api/data/get_hot_list?callback=call',function(_data){
		var i=0;
		var shop1 = "",shop2="";
		/*console.log(_data);*/
		for(var o in _data){
			if(i<5){
				shop1 += '<li><div class="con">';
				shop1 += '<a class="imglink" href="' + _data[o].web_url + '" target="_blank"><img src="' + _data[o].cover_img;
				shop1 += '" alt="' + _data[o].series_name + _data[o].model_name + '"></a>';
				shop1 += '<div class="tips cf">';

				switch (_data[o].card_type){
					case 'card_youhui':
						shop1 += '<a class="yhj share10-yhqbg" href="javascript:void(0);"></a></div>';
						shop1 += '<div class="dec"><a class="nametext" href="' + _data[o].web_url +'" target="_blank">' + _data[o].name + '</a></div>';
						shop1 += '<div class="price"><span class="now"><em>' + _data[o].mall_price_million + '</em>万</span>';
						shop1 += '<span class="old">'+ _data[o].market_price_million  +'万</span></div>';
						break;
					case 'card_daijin':
						shop1 += '<a class="yhj share10-djqbg" href="javascript:void(0);"></a></div>';
						shop1 += '<div class="dec"><a class="nametext" href="' + _data[o].web_url +'" target="_blank">' + _data[o].name + '</a></div>';
						shop1 += '<div class="price"><span class="now"><em>' + _data[o].buy_price + '</em>元</span>';
						shop1 += '<span class="old1">抵'+ _data[o].relief  +'元</span></div>';
						break;
					case 'card_zhekou':
						shop1 += '<a class="yhj share10-zkqbg" href="javascript:void(0);"></a></div>';
						shop1 += '<div class="dec"><a class="nametext" href="' + _data[o].web_url +'" target="_blank">' + _data[o].name + '</a></div>';
						shop1 += '<div class="price"><span class="now"><em>' + _data[o].mall_price_million + '</em>万</span>';
						shop1 += '<span class="old">'+ _data[o].market_price_million  +'</span></div>';
						break;
					case 'shangou':
						shop1 += '<a class="yhj share10-sgbg" href="javascript:void(0);"></a></div>';
						shop1 += '<div class="dec"><a class="nametext" href="' + _data[o].web_url +'" target="_blank">' + _data[o].name + '</a></div>';
						shop1 += '<div class="price"><span class="now"><em>' + _data[o].mall_price_million + '</em>万</span>';
						shop1 += '<span class="old">'+ _data[o].market_price_million  +'</span></div>';
						break;
					case 'paimai':
						shop1 += '<a class="yhj share10-pmbg" href="javascript:void(0);"></a></div>';
						shop1 += '<div class="dec"><a class="nametext" href="' + _data[o].web_url +'" target="_blank">' + _data[o].name + '</a></div>';
						shop1 += '<div class="price"><span>起拍价:</span><span class="now"><em>' + _data[o].mall_price_million + '</em>万</span>';
						shop1 += '<span class="old">'+ _data[o].market_price_million  +'</span></div>';
						break;
					case 'card_new_car'://2016.7.1增加
						shop1 += '<a class="yhj card_new_car" href="javascript:void(0);"></a></div>';
						shop1 += '<div class="dec"><a class="nametext" href="' + _data[o].web_url +'" target="_blank">' + _data[o].name + '</a></div>';
						shop1 += '<div class="price"><span class="now"><em>' + _data[o].buy_price + '</em>元</span></div>';
						break;
					case 'card_pre_sale':
						shop1 += '<a class="yhj share10-ysbg" href="javascript:void(0);"></a></div>';
						shop1 += '<div class="dec"><a class="nametext" href="' + _data[o].web_url +'" target="_blank">' + _data[o].name + '</a></div>';
						shop1 += '<div class="price"><span class="now"><em>' + _data[o].buy_price + '</em>元</span></div>';
						break;
					case 'card_test_drive'://2016.7.1增加
						shop1 += '<a class="yhj card_test_drive" href="javascript:void(0);"></a></div>';
						shop1 += '<div class="dec"><a class="nametext" href="' + _data[o].web_url +'" target="_blank">' + _data[o].name + '</a></div>';
						shop1 += '<div class="price"><span class="now"><em>' + _data[o].buy_price + '</em>元</span></div>';
						break;
					case 'card2'://2017.8.2增加
						shop1 += '</div>';
						shop1 += '<div class="dec"><a class="nametext" href="' + _data[o].web_url +'" target="_blank">' + _data[o].name + '</a></div>';
						var card2_price_str = '';
						if(_data[o].price_type == 'custom'){ //自定义价格
							switch (_data[o].price_def_type){
								case 1:
									card2_price_str = '<span class="now"><em>' + _data[o].price_def_million + '</em>万</span>'; //显示指定价格price_def_million
									break;
								case 2:
									card2_price_str = '<span class="now"><em>' + _data[o].price_def_million + ' - ' + _data[o].price_def_high_million + '</em>万</span>'; //显示区间价格price_def - price_def_section
									break;
								case 3:
									card2_price_str = '<span class="now"><em>暂无报价</em></span>'; //显示暂无报价
									break;
							}
						}else{ //非自定义价格
							switch (_data[o].market_price_type){
								case 1:
									card2_price_str = '<span class="now"><em>' + _data[o].market_price_million + '</em>万</span>'; //显示market_price_million
									break;
								case 2:
									card2_price_str = '<span class="now"><em>' + _data[o].market_price_million + ' - ' + _data[o].market_high_price_million + '</em>万</span>'; //显示market_price_million - market_high_price_million
									break;
								default:
									card2_price_str = '<span class="now"><em>暂无报价</em></span>'; //显示暂无报价
									break;
							}
						}
						shop1 += '<div class="price">' + card2_price_str + '</div>';
						break;
					default:
						shop1 += '</div>';
						shop1 += '<div class="dec"><a class="nametext" href="' + _data[o].web_url +'" target="_blank">' + _data[o].name + '</a></div>';
						shop1 += '<div class="price"></div>';
						break;
				}
				shop1 += '<span class="buying share10-buybg"><a class="buylink" href="' + _data[o].web_url +'" target="_blank">抢购中</a></span></div></li>';
			}else if(i<11){
				shop2 += '<li><div class="con">';
				shop2 += '<a class="imglink" href="' + _data[o].web_url + '" target="_blank"><img src="' + _data[o].cover_img;
				shop2 += '" alt="' + _data[o].series_name + _data[o].model_name + '"></a>';
				shop2 += '<div class="tips cf">';
				switch (_data[o].card_type){
					case 'card_youhui':
						shop2 += '<a class="yhj share10-yhqbg" href="javascript:void(0);"></a></div>';
						shop2 += '<div class="dec"><a class="nametext" href="' + _data[o].web_url +'" target="_blank">' + _data[o].name + '</a></div>';
						shop2 += '<div class="price"><span class="now"><em>' + _data[o].mall_price_million + '</em>万</span>';
						shop2 += '<span class="old">'+ _data[o].market_price_million  +'万</span></div>';
						break;
					case 'card_daijin':
						shop2 += '<a class="yhj share10-djqbg" href="javascript:void(0);"></a></div>';
						shop2 += '<div class="dec"><a class="nametext" href="' + _data[o].web_url +'" target="_blank">' + _data[o].name + '</a></div>';
						shop2 += '<div class="price"><span class="now"><em>' + _data[o].buy_price + '</em>元</span>';
						shop2 += '<span class="old1">抵'+ _data[o].relief  +'元</span></div>';
						break;
					case 'card_zhekou':
						shop2 += '<a class="yhj share10-zkqbg" href="javascript:void(0);"></a></div>';
						shop2 += '<div class="dec"><a class="nametext" href="' + _data[o].web_url +'" target="_blank">' + _data[o].name + '</a></div>';
						shop2 += '<div class="price"><span class="now"><em>' + _data[o].mall_price_million + '</em>万</span>';
						shop2 += '<span class="old">'+ _data[o].market_price_million  +'</span></div>';
						break;
					case 'shangou':
						shop2 += '<a class="yhj share10-sgbg" href="javascript:void(0);"></a></div>';
						shop2 += '<div class="dec"><a class="nametext" href="' + _data[o].web_url +'" target="_blank">' + _data[o].name + '</a></div>';
						shop2 += '<div class="price"><span class="now"><em>' + _data[o].mall_price_million + '</em>万</span>';
						shop2 += '<span class="old">'+ _data[o].market_price_million  +'</span></div>';
						break;
					case 'paimai':
						shop2 += '<a class="yhj share10-pmbg" href="javascript:void(0);"></a></div>';
						shop2 += '<div class="dec"><a class="nametext" href="' + _data[o].web_url +'" target="_blank">' + _data[o].name + '</a></div>';
						shop2 += '<div class="price"><span>起拍价:</span><span class="now"><em>' + _data[o].mall_price_million + '</em>万</span>';
						shop2 += '<span class="old">'+ _data[o].market_price_million  +'</span></div>';
						break;
					case 'card_new_car'://2016.7.1增加
						shop2 += '<a class="yhj card_new_car" href="javascript:void(0);"></a></div>';
						shop2 += '<div class="dec"><a class="nametext" href="' + _data[o].web_url +'" target="_blank">' + _data[o].name + '</a></div>';
						shop2 += '<div class="price"><span class="now"><em>' + _data[o].buy_price + '</em>元</span></div>';
						break;
					case 'card_pre_sale':
						shop2 += '<a class="yhj share10-ysbg" href="javascript:void(0);"></a></div>';
						shop2 += '<div class="dec"><a class="nametext" href="' + _data[o].web_url +'" target="_blank">' + _data[o].name + '</a></div>';
						shop2 += '<div class="price"><span class="now"><em>' + _data[o].buy_price + '</em>元</span></div>';
						break;
					case 'card_test_drive'://2016.7.1增加
						shop2 += '<a class="yhj card_test_drive" href="javascript:void(0);"></a></div>';
						shop2 += '<div class="dec"><a class="nametext" href="' + _data[o].web_url +'" target="_blank">' + _data[o].name + '</a></div>';
						shop2 += '<div class="price"><span class="now"><em>' + _data[o].buy_price + '</em>元</span></div>';
						break;
					case 'card2'://2017.8.2增加
						shop2 += '</div>';
						shop2 += '<div class="dec"><a class="nametext" href="' + _data[o].web_url +'" target="_blank">' + _data[o].name + '</a></div>';
						var card2_price_str = '';
						if(_data[o].price_type == 'custom'){ //自定义价格
							switch (_data[o].price_def_type){
								case 1:
									card2_price_str = '<span class="now"><em>' + _data[o].price_def_million + '</em>万</span>'; //显示指定价格price_def_million
									break;
								case 2:
									card2_price_str = '<span class="now"><em>' + _data[o].price_def_million + ' - ' + _data[o].price_def_high_million + '</em>万</span>'; //显示区间价格price_def - price_def_section
									break;
								case 3:
									card2_price_str = '<span class="now"><em>暂无报价</em></span>'; //显示暂无报价
									break;
							}
						}else{ //非自定义价格
							switch (_data[o].market_price_type){
								case 1:
									card2_price_str = '<span class="now"><em>' + _data[o].market_price_million + '</em>万</span>'; //显示market_price_million
									break;
								case 2:
									card2_price_str = '<span class="now"><em>' + _data[o].market_price_million + ' - ' + _data[o].market_high_price_million + '</em>万</span>'; //显示market_price_million - market_high_price_million
									break;
								default:
									card2_price_str = '<span class="now"><em>暂无报价</em></span>'; //显示暂无报价
									break;
							}
						}
						shop2 += '<div class="price">' + card2_price_str + '</div>';
						break;
					default:
						shop2 += '</div>';
						shop2 += '<div class="dec"><a class="nametext" href="' + _data[o].web_url +'" target="_blank">' + _data[o].name + '</a></div>';
						shop2 += '<div class="price"></div>';
						break;
				}
				shop2 += '<span class="buying share10-buybg"><a class="buylink" href="' + _data[o].web_url +'" target="_blank">抢购中</a></span></div></li>';
			}else{
				break;
			}
			i++;
		}

		$("#shopl1").append(shop1);
		$("#shopl2").html(shop2);
		$("#shopl1 li").last().addClass("last");
		$("#shopl2 li").last().addClass("last");
		$("#shopAD")&& $("#shopAD").show();

	},'','','shop');

	_form.submit();

})(jQuery);/*  |xGv00|29ca3273683461d02ee94e432691c44c */