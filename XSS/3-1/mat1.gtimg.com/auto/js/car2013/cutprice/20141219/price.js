//(typeof jQuery != 'undefined' && typeof window[jQuery.widgetName] === 'object') && jQuery(document).ready(function($){
    (typeof jQuery != 'undefined' && typeof window[jQuery.widgetName] === 'object') && (function($){
		var self,op;
        $.extend(window[jQuery.widgetName],{
        	dealerOption: function(){
	        	var _opt = {
	        		data:{
						_refer: function(data){
							var oBack = $('#back_url');
							if(oBack.length){
								oBack.triggerHandler('click');
							}						
					    }
	        		},
	        		tpl:{
						//询价弹窗浮层
						askprice:'<div id="serial_askprice">\
									<div class="bd">\
										<form class="form_askprice" method="post" action="">\
											<input type="hidden" name="brand_id" value="{brand_id}">\
											<input type="hidden" value="{ip}" name="ip">\
											<input type="hidden" value="{ip_city}" name="ip_city">\
											<input type="hidden" value="{ip_province}" name="ip_province">\
											<input type="hidden" name="manu_id" value="{manu_id}">\
											<input type="hidden" name="model_id" value="{model_id}">\
											<input type="hidden" value="{province}" name="province">\
											<input type="hidden" value="{qq}" name="qq">\
											<input type="hidden" name="serial_id" value="{serial_id}">\
											<input type="hidden" value="{source_title}" name="source_title">\
											<input type="hidden" value="{source_url}" name="source_url">\
											<input type="hidden" value="" name="source_url">\
											<input type="hidden" value="lowprice" name="type">\
											<input type="hidden" value="{act_id}" name="act_id">\
											<p id="login_td" style="text-align:center;"><span class="nick"></span>您好！输入手机号，立即获取 <em class="red1">'+ '' +'{model_name}</em> 优惠信息</p>\
											<table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="table-layout:fixed;">\
											   <tbody>\
												 <tr>\
												   	<td width="80" valign="top" height="32" align="right"></td>\
													<td valign="top" width="330"></td>\
													 <td width="10" valign="top">&nbsp;</td>\
												 </tr>\
												 <tr>\
													 <td valign="top" align="right" class="fontl22">您的手机：</td>\
													 <td valign="top"><input type="text" autoComplete="off" class="inputtxt" name="phone" match="mobile" id="price_phone"></td>\
													 <td valign="top">&nbsp;</td>\
												 </tr>\
												 <tr>\
													<td></td>\
													<td height="18" class="fontl22 gary666" colspan="2"><div class="errorMsg"></div></td>\
												  </tr>\
												 <tr>\
													 <td valign="top" align="right" class="fontl22">您的姓名：</td>\
													 <td valign="top"><input type="text" autoComplete="off" class="inputtxt" name="name" match="name" id="price_name" maxlength="10" placeholder="请输入姓名">&nbsp;&nbsp;&nbsp;&nbsp;<label><input type="radio" name="sex" value="0" checked="checked"> 先生</label>&nbsp;&nbsp;<label><input type="radio" name="sex" value="1"> 女士</label></td>\
													 <td valign="top">&nbsp;</td>\
												 </tr>\
												 <tr>\
													<td></td>\
													<td height="18" class="fontl22 gary666" colspan="2"><div class="errorMsg"></div></td>\
												  </tr>\
												 <tr>\
													 <td valign="top" align="right" class="fontl22">所在地区：</td>\
													 <td valign="top"><select id="priceProvince" name="province"><option value="">选择省份</option></select> &nbsp;&nbsp;<select id="priceCity" name="city" match="must"><option value="">选择城市</option></select></td>\
													 <td valign="top">&nbsp;</td>\
												 </tr>\
												 <tr>\
													<td></td>\
													<td height="18" class="fontl22 gary666" colspan="2"><div class="errorMsg"></div></td>\
												  </tr>\
												 <tr>\
												   <td valign="top" height="32" align="right" class="fontl22">意向车型：</td>\
												   <td valign="top">\
													 <select name="model_id" class="carmodel">\
														<option value="">选择车型(可不选)</option>\
														{selectedModel}\
													 </select>\
												   </td>\
												 </tr>\
												 <tr>\
													<td></td>\
													<td height="18" class="fontl22 gary666" colspan="2"><div class="errorMsg"></div></td>\
												  </tr>\
												 <tr>\
												   <td height="30"></td>\
												   <td valign="top" colspan="2">\
													 <table width="100%">\
													   <tbody><tr>\
														 <td><input type="submit" value="提交询价" style="font-size:12px; position:relative; padding:1px 5px;"></td>\
														 <td width="10"></td>\
														 <td valign="middle" style="padding-top:0px;padding-top:2px\\9;*padding-top:3px;_padding-top:3px;" id="information"><em class="red1">说明：</em>提交询价后，会有该车型的经销商与您联系，请耐心等待</td>\
													   </tr>\
													 </tbody></table>\
												   </td>\
												 </tr>\
												 <tr>\
													<td></td>\
													<td height="18" class="fontl22 gary666" id="alert_sum" colspan="2"><div class="errorMsg"></div></td>\
												</tr>\
											   </tbody></table>\
										</form>\
									</div>',
						priceList : '<tr>\
										<td width = "414px">\
											<div style = "width:auto;">\
												<div class = "imgContainer"><a  target="_blank" href="http://wecar.qq.com/dealer/promotion/detail/id/{sdealer_id}/article_id/{sarticle_id}"><img  width="120" height="80" src = {smodel_pic} onerror = "this.src=\'http://img1.gtimg.com/auto/pics/hv1/112/202/1695/110268997.png\'" bossZone = "cxtp" autobussboss="photo|onsale_model|6" onclick="registerZone2(this,1)" /></a></div>\
											<div class = "conContainer" >\
												<ul>\
													<li class = "txt_l name" bossZone = "cxmc" autobussboss="model|onsale_model|6"><a  target="_blank" href="http://wecar.qq.com/dealer/promotion/detail/id/{sdealer_id}/article_id/{sarticle_id}" title = "{modelnameall}">{smodel_name}</a>\
													</li>\
													<li class = "txt_l dealer clearfix" bossZone = "sjdp" autobussboss="dealer|onsale_model|6">\
														<em><span class = "area">{sorder_area}</span><span class = "gapLine">|</span><span class = "carCount">{stock}</span></em>\
													</li>\
													<li class = "txt_l phoneLi clearfix"><em>{vip}<a href = "http://wecar.qq.com/{sdealer_id}" target="_blank" autobussboss = "dealer|onsale_model|6">{sdealer_name}</a><span class = "phone"></span></em></li>\
													{phone400}\
												</ul>\
											</div>\
											</div>\
										</td>\
										<td width = "100px">\
											<ul>\
												<li class = "txt_c" ><span class = "priceCur">{sdiscount_price}万</span></li>\
												<li class = "txt_c pricePre">{sguide_price}万</li>\
											</ul>\
										</td>\
										<td width = "90px">\
											<ul>\
												<li class = "txt_c priceDec"><span>{sdiscount_amount}万</span><em></em></li>\
												<li class = "txt_c time"><span class = "txt_c timeLeft">剩余{time}</span></li>\
											</ul>\
										</td>\
										<td width = "86px" style = "vertical-align:inherit;">\
											<ul>\
												<li class="priceAsk"><span onclick="registerZone2(this,1)"  bossZone = "xjrk" autobussboss="askprice|onsale_model|6" class = "txt_c"  ip = "{ip}" ip_province = "{ip_province}" ip_city = "{ip_city}" qq = "{qq}" city = "{}" source_url = "{source_url}" source_title = "{source_title}" city = "{city}" manu_id = "{smanu_id}" brand_id = "{sbrand_id}" model_id = "{smodel_id}" serial_id = "{sserial_id}" dealer_id = "{sdealer_id}">询问底价</span>\
												</li>\
											</ul>\
										</td>\
									</tr>',
						priceListSerialTwoLeft:'<div class = "serialCon clearfix">\
											<div class = "serialLeft">\
												<a href = "http://auto.qq.com/price.htm?cityid={scity_realid}&brandid={sbrand_id}&serialid={sserial_id}" target="_blank"><img src = "{FSerialPic}" onclick = "registerZone2(this,1)" bossZone = "cxitp" autobussboss="photo|onsale_price|6"/></a><br/>\
												<span class = "serialName"><a href = "http://auto.qq.com/price.htm?cityid={scity_realid}&brandid={sbrand_id}&serialid={sserial_id}" target="_blank" onclick = "registerZone2(this,1)" bossZone = "cximc" autobussboss="serial|onsale_price|6">{FName}</a></span>\
												<span class = "serialPrice"><span class = "color">{sdiscount_price}万</span>起售</span>\
											</div>\
											<table class = "serial">\
												<tbody id = "list">',
						priceListSerialTwo:'<tr class = "up">\
														<td width = "245px">\
															<div style = "width:auto;">\
															<div class = "conContainer" >\
																<ul>\
																<li class = "txt_l name" ><a  target="_blank" 	href="http://wecar.qq.com/dealer/promotion/detail/id/{sdealer_id}/article_id/{sarticle_id}" onclick = "registerZone2(this,1)" bossZone = "cxcxmc" autobussboss="model|onsale_price|6" title = "{modelnameall}">{smodel_name}</a>\
																	</li>\
																	<li class = "txt_l dealer clearfix">\
																		<em><span class = "area" title = "{sorder_area_str}">{sorder_area}</span><span class = "gapLine">|</span><span class = "carCount">{stock}</span></em>\
																	</li>\
																	<li class = "txt_l phoneLi clearfix"><em>{vip}<a href = "http://wecar.qq.com/{sdealer_id}" target="_blank" onclick = "registerZone2(this,1)" bossZone = "cxsjdp" autobussboss="dealer|onsale_price|6" >{sdealer_name}</a></em></li>\
																	{phone400}\
																</ul>\
															</div>\
															</div>\
														</td>\
														<td width = "100px">\
															<ul>\
																<li class = "txt_c" ><span class = "priceCur">{sdiscount_price}万</span></li>\
																<li class = "txt_c pricePre">{sguide_price}万</li>\
															</ul>\
														</td>\
														<td width = "90px">\
															<ul>\
																<li class = "txt_c priceDec"><span>{sdiscount_amount}万</span><em></em></li>\
																<li class = "txt_c time"><span class = "txt_c timeLeft">剩余{time}</span></li>\
															</ul>\
														</td>\
														<td width = "86px" style = "vertical-align:inherit;">\
															<ul>\
																<li class="priceAsk"><span onclick="registerZone2(this,1)"  bossZone = "cxxjrk" autobussboss="askprice|onsale_price|6" class = "txt_c"  ip = "{ip}" ip_province = "{ip_province}" ip_city = "{ip_city}" qq = "{qq}" city = "{}" source_url = "{source_url}" source_title = "{source_title}" city = "{city}" manu_id = "{smanu_id}" brand_id = "{sbrand_id}" model_id = "{smodel_id}" serial_id = "{sserial_id}" dealer_id = "{sdealer_id}">询问底价</span>\
																</li>\
																				<!--<li class = "txt_c recCount">最近有{sorder_num}笔订单</li>-->\
															</ul>\
														</td>\
													</tr>',
						priceListSerialR:'</tbody>\
											</table>\
											<a onclick = "registerZone2(this,1)" bossZone = "qbcx" autobussboss="match|onsale_price|6" href = "http://auto.qq.com/price.htm?cityid={scity_realid}&brandid={sbrand_id}&serialid={sserial_id}" class = "all" target="_blank"></a>\
										</div>',
						priceListSerialOneLeft:'<div class = "serialConSingle clearfix">\
												<div class = "serialLeft">\
												<a href = "http://auto.qq.com/price.htm?cityid={scity_realid}&brandid={sbrand_id}&serialid={sserial_id}" target="_blank"><img src = "{FSerialPic}" onclick = "registerZone2(this,1)" bossZone = "cxitp" autobussboss="photo|onsale_price|6"/></a><br/>\
												<span class = "serialName"><a href = "http://auto.qq.com/price.htm?cityid={scity_realid}&brandid={sbrand_id}&serialid={sserial_id}" target="_blank" onclick = "registerZone2(this,1)" bossZone = "cximc" autobussboss="model|onsale_price|6">{FName}</a></span>\
												</div>',
						priceListSerialOneRight:'<table class = "serial">\
													<tbody id = "list">\
														<tr class = "middle">\
															<td width = "245px">\
																<div style = "width:auto;">\
																<div class = "conContainer" >\
																	<ul>\
																		<li class = "txt_l name" onclick = "registerZone2(this,1)" bossZone = "cxcxmc" autobussboss="model|onsale_price|6"><a  target="_blank" href="http://wecar.qq.com/dealer/promotion/detail/id/{sdealer_id}/article_id/{sarticle_id}" title = "{modelnameall}">{smodel_name}</a>\
																		</li>\
																		<li class = "txt_l dealer clearfix">\
																			<em><span class = "area" title = {sorder_area_str}>{sorder_area}</span><span class = "gapLine">|</span><span class = "carCount">{stock}</span></em>\
																		</li>\
																		<li class = "txt_l phoneLi clearfix"><em>{vip}<a onclick = "registerZone2(this,1)" bossZone = "cxsjdp" href = "http://wecar.qq.com/{sdealer_id}" target="_blank" autobussboss="dealer|onsale_price|6" >{sdealer_name}</a><span class = "phone">{s400code}</span></em></li>\
																	</ul>\
																</div>\
																</div>\
															</td>\
															<td width = "100px">\
																<ul>\
																	<li class = "txt_c" ><span class = "priceCur">{sdiscount_price}万</span></li>\
																	<li class = "txt_c pricePre">{sguide_price}万</li>\
																</ul>\
															</td>\
															<td width = "90px">\
																<ul>\
																	<li class = "txt_c priceDec"><span>{sdiscount_amount}万</span><em></em></li>\
																	<li class = "txt_c time"><span class = "txt_c timeLeft">剩余{time}</span></li>\
																</ul>\
															</td>\
															<td width = "86px" style = "vertical-align:inherit;">\
																<ul>\
																	<li class="priceAsk"><span onclick="registerZone2(this,1)"  bossZone = "cxxjrk" autobussboss="askprice|onsale_price|6" class = "txt_c"  ip = "{ip}" ip_province = "{ip_province}" ip_city = "{ip_city}" qq = "{qq}" city = "{}" source_url = "{source_url}" source_title = "{source_title}" city = "{city}" manu_id = "{smanu_id}" brand_id = "{sbrand_id}" model_id = "{smodel_id}" serial_id = "{sserial_id}" dealer_id = "{sdealer_id}">询问底价</span>\
																	</li>\
																					<!--<li class = "txt_c recCount">最近有{sorder_num}笔订单</li>-->\
																</ul>\
															</td>\
														</tr>\
													</tbody>\
												</table>\
											</div>'
					},
	        		api:{
						IP_Url: 'http://fw.qq.com:80/ipaddress', //获取本地IP、城市
						dealer_IP_Url: window.TXCAR_infomation.host +'/api/askprice/getprovinceandcity', //获取本地IP、城市
						car_Brand_Url: 'http://js.data.auto.qq.com/car_public/1/manufacturer_list_json.js',//品牌
						car_Serial_Url: function(id){
							return 'http://js.data.auto.qq.com/car_manufacturer/'+id+'/serial_list_json.js';//车系
						},
						car_Model_Url: function(id){
							return 'http://js.data.auto.qq.com/car_serial/'+id+'/model_list.js';//车型
						},
						price_Model_Url: function(id){
	        				return window.TXCAR_infomation.host + '/api/askprice/getcarmodels/serial_id/'+id;//指定车系下车型
	        			},
						//serial_askPrice_submit_Url:'http://crm.wecar.qq.com/api/activity/serialapply', //询底价提交
						serial_askPrice_submit_Url:'http://wecar.qq.com/Api/activity/clueSignup',
						serial_province_Url: 'http://wecar.qq.com/dealer/inter/index/method/citys/type/1', //省份
						serial_citys_Url: function(id){
							return 'http://wecar.qq.com/dealer/inter/index/method/citys/type/2/pid/'+id;//城市
						},
						price_Order_Url:function(str){
							return 'http://wecar.qq.com/api/lowprice/priceList/?'+str;//条件查询普通模板接口
							
						},
						price_Order_Url_Serial:function(str){
							return 'http://wecar.qq.com/api/lowprice/priceListBySerial?'+str;								//条件查询车系分类模板接口
							//return 'http://wecar.qq.com/api/lowprice/priceList/?'+str;
						},
						dealer_List_Url:function(cityid){
							return 'http://wecar.qq.com/api/lowprice/recommDealerList?cityid='+cityid;
						}
	        		}
		        };
		        $.extend(true,op,_opt);
        	},
			_proxyHandler: function(name,options){//dom,oTip,def
				var data = null;
				switch(name){
					case 'getSerialData'://车系数据
						data = window.oManufacturerSerialData.arrSerial ;
						delete window.oManufacturerSerialData.arrSerial;
						data && self._creatSelectList(data,options);
						break;
					case 'getModelData': //车型数据
						data = window.oSameSerialModelData.arrModel   ;
						delete window.oSameSerialModelData.arrModel;
						data && self._creatSelectList(data,options);
						break;
					case 'getManusData': //厂商数据
					case 'getCityData': //市
					case 'getAreaData': //地区
					case 'getLogActionData': //动作
					case 'getManusProv'://获取厂商省份
						data = options.data;
						delete options.data;
						data && self._creatSelectList(data,options);
						break;
					case 'getBrandData'://品牌数据
						data = window.oManufacturerData.arrManufacturer;
						delete window.oManufacturerData.arrManufacturer;
						data && self._creatSelectList(data,options);
						break;
					case 'getProvinceData': //省份
					case 'getLogTypeData': //操作类型
					case 'getAllManus': //上级分配 所有厂商
						if(!op.data[name]){
							op.data[name] = options.data;
							delete options.data;
						}
						op.data[name] && self._creatSelectList(op.data[name],options);
						break;
					default:return;
				}
			},
			_proxyAjax: function(api,options){
				if(options.charset){
					$.ajaxSetup({scriptCharset:options.charset});
				}
				var url = (typeof api.url == 'function') ? api.url(options.value) : api.url;
				switch(api.act){
					case 'getProvinceData':
					case 'getBrandData':
					case 'getLogTypeData':
					if(op.data[api.act]){
						op.data.doQueue = false;
						delete op.data.doQueue;
						options.data = op.data[api.act];
						return self._proxyHandler(api.act,options);
					}
					default:break;
				}
				switch(api.type){
					case 'script':
						$.getScript(url,function(){
						
							self._proxyHandler(api.act,options);
						});
						break;
					case 'json':
						self.crossAjax(url,function(ret){
							
							if(!ret.data){
								options = null;
								return (!op.data.doQueue && $(document).dequeue('getDataList'));
							}
							options.data = ret.data;
							self._proxyHandler(api.act,options);
						},{data:options.value});
						break;
					default:break;
				}
			},
			_creatSelectList: function(data,options){
				var dom = options.dom;
				var pri = options.pri;
				if($.isArray(data)){
					var def = options.def ? $.isArray(options.def) ? options.def : [parseInt(options.def)] : [];
					var _type = typeof options.type != 'undefined' ? options.type : 'single';
					var multi = dom.attr('list');
					if(multi == 'multiple'){
						_type = multi;
					}
					var checkall = dom.attr('checkall');
					var excep = options.excep ? options.excep : [];
					if(!dom || !dom.length){return;}
					dom.is('select') ? (dom[0].length = 1) : dom.empty();
					var list  = '';
					var _name = (dom.attr('name')==undefined) ? (dom.closest('form:not([target])').length ? 'IDs' : 'IDs[]') : dom.attr('name');
					var sellist = [];
					if(checkall == 'carmodelall'){
						list += '<label class = "modelall"><input type = "checkbox" class = "checkAll"/> 全选</label><br/>';
					}
					$.each(data,function(n){
							var ID   = parseInt(this.ID || this.FID);
							var Name = this.Name || this.FName || '';
							if(!ID || !Name){
								return;
							}
							if(_type == 'multiple'){
								list += '<label class="boxlist"><input type="checkbox" name="'+ _name +'" value="'+ID+'"';
								if(def.length && $.inArray(ID, def) != -1 && !pri){
									list += ' checked="checked"';
								}
								list += '> '+Name+'</label>';
								//dom = dom.parent();
							}
							else{
								if(excep.length && $.inArray(ID, excep) != -1){
									return;
								}
								if(pri !== 'undefined' && pri == 'regional')
								{
									if(this.ID == def){
										var opt = '<option value="'+ ID +'"';
										if(def.length && $.inArray(ID, def) != -1){
											opt += ' selected="selected"';
										}
										opt += '>';
										if(this.FirstLetter || this.FFirstLetter){
											opt +=  (this.FirstLetter || this.FFirstLetter) + '　';
										}
										opt += Name;
										opt += '</option>\t';
										list += opt;
									}
									dom.find('option').eq(0).remove();  //区域管理员在选择省市时将“请选择”删除
								}else{
									var opt = '<option value="'+ ID +'"';
										if((def.length && $.inArray(ID, def) != -1) || (data.length==1 && n==0)){
											opt += ' selected="selected"';
										}
										opt += '>';
										if(this.FirstLetter || this.FFirstLetter){
											opt +=  (this.FirstLetter || this.FFirstLetter) + '　';
										}
										opt += Name;
										opt += '</option>\t';
										list += opt;
								}
							}
					});
					dom.append(list);
					dom.is('select') && (dom.children().length==2) && dom.trigger('change');//列表为1时选中
					//全选
					if(checkall == 'carmodelall'){
						var _my = $("#actadd .multiple");
						var checkAll = _my.find('.checkAll');
						var boxchildren = _my.find('.boxlist input');
						checkAll.length && checkAll.unbind().click(function(){
							var flag = checkAll.prop('checked');
							boxchildren.length && boxchildren.prop('checked',flag);
							boxchildren.length && !!flag && boxchildren.click(function(){
							checkAll.prop('checked',false);
							});
						});
						
					}
					_name=null,list=null,def=null,_type=null,excep=null,data=null;
				}
				(typeof options.callback == 'function') && options.callback.call(dom);
				dom=null,options=null;
			},
			setPostForm: function(dom){
				dom = $(dom);
				var oForm = dom.length ? dom.find('form') : $('form');
				oForm.attr('accept-charset','utf-8');
				var oValidator = null;
				
				oForm.submit(function(e){
					if($.browser.msie){
						document.charset='utf-8';
					}
					var _this = $(this);
					
					if(self.posted == true){
						//self._stopEvent(e);
						return false;
					}
					self.posted = true;
					
					var DOM    = arguments[1];
					var conf   = op.validator;
					var status = false;
					var pNode  = null;
					!DOM && $.each(conf,function(key,value){
						var oEl = _this.find('[match="'+ key +'"]');
						(oEl.length && !oEl.siblings('.errorMsg:visible').length) && oEl.trigger('blur',[true]);
						if(oEl.is(':checkbox') && oEl.attr('match') == 'must'){
							!pNode && (pNode = oEl.first());
							!oEl.filter(':checked').length && (status = true);
						}
					});
					var oErr = _this.find('.errorMsg:visible:not(.succMsg)');
					if(!oErr.length && !status || !!DOM){
						var oCont = _this.find('input[name="content"]');
						oCont.length && oCont.val(_this.find('.info').html());
						var elements = this.elements;
						$.each(elements,function(){
							if(this.value == this.placeholder){
								this.value = '';
								$(this).removeAttr('placeholder');
							}
							if(!!DOM && !$(this).closest(DOM[0]).length){
								this.disabled = true;
							}
						});
						var _act = _this.attr('action');
						var flag = _this.attr('target');
						var url  = _act.indexOf('http://') > -1 ? _act : op.pageInfo.host + _act;
						if(flag == '_self'){
							(!!op.token && !_this.find('input[name="token"]').length) && _this.append('<input name="token" type="hidden" value="'+self.getToken()+'"/>');
							self.pop({load:true});
							_this.attr('action',url);
						}else if(flag == '_uploader' || flag == 'uploader'){
							self.pop({load:true});
							!DOM ? self._createIframe(flag,function(oRet){
							
								if(oRet.ret == 0){
									self.pop({content:'<span class="succ">'+oRet.info+'</span>',autoHide:true,refer: $('#actadd').length ? '': op.data._refer});
									$('#actadd').length && self.setPreview('#act_preview',oRet);
								}else{
									self.pop({content:'<span class="fail">'+oRet.info+'</span>',autoHide:true});
								}
							}) : (op.token == true && !_this.find('input[name="token"]').length) && _this.append('<input name="token" type="hidden" value="'+ self.getToken() +'"/>');
						}else{
							self._stopEvent(e);
							(op.token == true && !_this.find('input[name="token"]').length) && _this.append('<input name="token" type="hidden" value="'+ self.getToken() +'"/>');
							var elem = _this.serializeArray();
							var data = self.formatParam(elem,_this,'object');
							self.crossAjax(url,function(oRet){
								if(oRet.code == 0){
									if($('#regList').length){
										self.setRegprevShow('#regList',oRet);//报名预览
									}else{
										self.pop({content:'<span class="succ">'+oRet.msg+'</span>',autoHide:true}); 
									}
									
								}else{
									self.pop({content:'<span class="fail">'+oRet.msg+'</span>',autoHide:true});
								}
							},{data:data,load:true});
							return false;
						}
					}else{
						self._stopEvent(e);
						//var top = oErr.first().offset().top - 50;
						//$('html,body').scrollTop(top);
						if(status && pNode && oValidator){
							var oMsg = oValidator.getErr(pNode);
							oMsg.html('至少得选择一项').show();
						}
						self.posted = false;
						delete self.posted;
						return false;
					}
				});
				var oUploader = oForm.find('.uploader');
				oUploader.length && this.setUploader(oUploader);
				
				oValidator = self.setValidator(oForm);
				var oDate = oForm.find('.time');
				oDate.length && $.getScript(op.jsRoot + 'jquery-datepicker-min.js',function(){
					function setLimit(dom){
						var oPrev = dom.prevAll('.time').length ? dom.prevAll('.time') : dom.parents('tr').prevAll('tr').find('.time');
						var oNext = dom.nextAll('.time').length ? dom.nextAll('.time') : dom.parents('tr').nextAll('tr').find('.time');
						if(oNext.length){
							var next = $.trim(oNext.val());
							/*op.data.pick.minDate = dom.is('.ago') ? null : new Date();
							op.data.pick.maxDate = (next == '' || (next != '' && new Date(next.replace(/-/g,'/')) == 'NaN')) ? dom.is('.ago') ? new Date() : null : new Date(next.replace(/-/g,'/'));*/
							op.data.pick.minDate = null;
							op.data.pick.maxDate = (next != '' && new Date(next.replace(/-/g,'/')) != 'NaN') ? new Date(next.replace(/-/g,'/')) : null;
						}
						if(oPrev.length){
							var prev = $.trim(oPrev.val());
							op.data.pick.minDate = (prev != '' && new Date(prev.replace(/-/g,'/')) != 'NaN') ? new Date(prev.replace(/-/g,'/')) : null;
							op.data.pick.maxDate = null;
							/*op.data.pick.minDate = (prev == '' || (prev != '' && new Date(prev.replace(/-/g,'/')) == 'NaN')) ? null : new Date(prev.replace(/-/g,'/'));
							op.data.pick.maxDate = dom.is('.ago') ? new Date() : null;*/
						}
						$.datepicker.setDefaults(op.data.pick);
					}
					op.data.pick.onSelect = function(){
						var _this = $(this);
						setLimit(_this);
						oDate.siblings('.errorMsg').hide();
					}
					op.data.pick.beforeShow=function(){
						var _this = $(this);
						setLimit(_this);
					}
					$.datepicker.setDefaults(op.data.pick);
			    	oDate.datepicker();
			    });				
			},
			getCarData: function(oSel,api){
				if(op.data.doQueue == true){return;}
				op.data.doQueue = true;
				if(!oSel.length){return;}
				var oBrand = oSel.first();
				var oApi   = api[oBrand.attr('id') || oBrand.attr('class')];//api.carProvince
				var content = api.content ? api.content : '';
				var charset = $.browser.ie6 ? 'gb2312' : 'utf-8';
				if(top.TXCAR_infomation == undefined){
					var val = '';
				}else{
					var val = top.TXCAR_infomation.info.id;
				};						
				self._proxyAjax(oApi,{value:val,dom:oBrand,def: oApi.def,excep:oApi.excep,pri:api.pri,charset:charset,callback:function(){
					run(oSel,this);
				}});
				function run(_oSel,dom){
					var _val = $.trim(dom.val()) || '';
					(!_oSel.siblings('#'+_oSel.attr('id')+'_container').length && _oSel.parents('.select').length) ? $.getScript(op.jspath + 'jQselect.js',function(){
						(_oSel.length) && _oSel.selectbox({
											change: function(){
												setChange(this,_oSel);
											}
										 });
						((_val != '' && _val != 0) || !!oApi.def) ? setChange(dom,_oSel) : $(document).dequeue('getDataList');
					}) : (function(){
						_oSel.change(function(e){
							setChange(this,_oSel);
						});
						((_val != '' && _val != 0) || !!oApi.def) ? dom.trigger('change',[_oSel]) : $(document).dequeue('getDataList');
					})();
				}
				function setChange(sel,allSel){
					var val   = $(sel).val();
					var index = allSel.index(sel);
					var next  = allSel.filter(':gt('+ (index)+')');
					var nextAll = next;
					if(!next.length){
						return $(document).dequeue('getDataList');
					}		
					if(val == ''){
						next.length && $.each(next,function(){
							var _this = $(this);
							if(_this.children().length > (_this.is('select') ? 1 : 0)){
								_this.is('select') ? (this.length = 1) : _this.empty();
								setContainer(_this);
							}
						});
						!op.data.doQueue && $(document).dequeue('getDataList');
					}else{
					
						next = next.first();
						oApi = $.extend({},api[next.attr('id') || next.attr('class')]);
						var _def  = oApi.def;
						var _type = oApi.list ? oApi.list : next.attr('class') ? next.attr('class') : '';
						self._proxyAjax(oApi,{value:val,dom: next,def: oApi.def,type:_type,excep:oApi.excep,charset:charset,callback:function(){
							if(!!_def){
								setChange(this,allSel);delete oApi.def;
								//(this.trigger('change',allSel),delete oApi.def);
							}else{
								setChange(this,allSel);delete oApi.def;
								($(document).dequeue('getDataList'));
							}
							setContainer(this);
						}});						
					}
				}
				function setContainer(select){
					var box = select.siblings('.selectbox-wrapper').find('ul').empty();
					var list = select.attr('list');
					if(box.length){
						$.each(select.children('option:not([style])'),function(){
							var oInput = select.siblings('.label').find('#'+select.attr('id')+'_input');
							var li = $('<li id="'+oInput.attr('id') + '_' + $(this).val()+'">'+$(this).html()+'</li>');
							if ($(this).is(':selected')) {
								oInput.val($(this).html());
								li.addClass('selected');
							}
							box.append(li);
						});	
					}
				}
			},
			getSelectList:function(dom){
				var api  = {
					allbrand: {url:op.api.car_Brand_Url,act:'getBrandData',type:'script'},
					allserial: {url:op.api.car_Serial_Url,act:'getSerialData',type:'script'},
					allmodel: {url:op.api.car_Model_Url,act:'getModelData',type:'script'},
					priceProvince: {url:op.api.serial_province_Url,act:'getProvinceData',type:'json'},
					priceCity: {url:op.api.serial_citys_Url,act:'getCityData',type:'json'}
				};
				var conf = ["#priceProvince,#priceCity","#allbrand,#allserial,#allmodel"];
				if(!$(conf.join(',')).length){
					return;
				}
				$.each(conf,function(i,v){
					var oSel  = $(v);
					if(!oSel.length){return;}
					var API   = $.extend({},api); //返回各个请求的URL
					var list  = function(){
						$.each(oSel,function(){
							var _this  = $(this);
							var _api   = API[_this.attr('id')];
							var _def   = [];
							if(_api.list == 'multiple' || _this.is('.multiple')){
								var _list = _this.find('input:checked');
								_list.length && $.each(_list,function(){
									!!$(this).val() && _def.push(parseInt($(this).val()));
								});
							}else{
								var _val = _this.find('option:selected').attr('value');
								(!!_val && _val != '0') && _def.push(parseInt(_val));
							}
							_def.length && (_api.def = _def);
						});
						oSel.length && self.getCarData(oSel,API);
					};
					$(document).queue('getDataList',list);
				});
				!op.data.doQueue && $(document).dequeue('getDataList');
				
			},
			setAskPrice: function(o){
				o = $(o);
				if(!o.length) return;
				o.unbind('click').click(function(e){
					self._stopEvent(e);
					var that  = $(this),
						href  = that.attr('href'),
						sid   = self.getParam('sid',href),
						mid   = self.getParam('mid',href),
						mname = that.closest('tr').find('.name a').html() || '',
						content = op.tpl.askprice; 
					var data = {};
						data.brand_id = that.attr("brand_id");
						data.city = that.attr("city");
						data.ip = that.attr("ip");
						data.ip_city = that.attr("ip_city");
						data.ip_province = that.attr("ip_province");
						data.manu_id = that.attr("manu_id");
						data.name = that.attr("name");
						data.phone = that.attr("phone");
						data.province = that.attr("province");
						data.qq = that.attr("qq");
						data.serial_id = that.attr("serial_id");
						data.sex = that.attr("sex");
						data.source_title = that.attr("source_title");
						data.source_url	 = that.attr("source_url");
						data.act_id = that.attr("dealer_id");
						data.model_name =mname;
						content = self._parseTpl(data,op.tpl.askprice);
					self.pop({width: 604,
						title: '询底价',
						content:content,
						show:function(){
							var _this   = this;
							var dom     = this.element.content;
							var oForm = dom.find('.form_askprice');
							var province = oForm.find('#priceProvince');
							var city = oForm.find('#priceCity');
							var model = oForm.find('.carmodel');
							oForm.attr('action',op.api.serial_askPrice_submit_Url);
							!$('#logined').is(":hidden") && oForm.find('.nick').html($('#userName').html()+',');
							if(IPData){
								cityList();
							}
							else{
								$.getScript(op.api.IP_Url,cityList);
							}
							function cityList(){
								var ip = IPData[0];
								self.crossAjax(op.api.dealer_IP_Url,function(oRet){
									if(oRet.ret == 0 ){
										var data = oRet.data;
										//data = {"cityid":"54","cityname":"北京","provinceid":"4","provincename":"北京"}
										if(data.cityid != ''){
											province.append('<option  value="'+data.provinceid+'" selected="selected">'+data.provincename+'</option>');
											city.append('<option  value="'+data.cityid+'" selected="selected">'+data.cityname+'</option>');
										}
										
									}else{
										return self.pop({content:'<span class="fail">'+oRet.info+'</span>',autoHide:true,refer: op.data._refer});
									}
									
									self.getSelectList(dom);
								},{data:{ip:ip},proxy:'/index/index/proxy'});
							}
							//指定车系下车型
							 var queue = function(){
								var sid = that.attr('serial_id');
								var mid = that.attr('model_id');
								var url = op.api.price_Model_Url(sid);
								return self.crossAjax(url,function(oRet){
									if(oRet.ret == 0){
										var data = oRet.data;
										if(data[0].length){
											$.each(data[0],function(i){
												if((!!mid ? (this.FID==mid) : (i==0))){
													model.append('<option value="'+this.FID+'" selected="selected">'+this.FName+'</option>');
												}else{
													model.append('<option value="'+this.FID+'">'+this.FName+'</option>');
												}
											})
										}
										!op.data.doQueue && $(document).dequeue('getDataList');
									}else{
										!op.data.doQueue && $(document).dequeue('getDataList');
										return self.pop({content:'<span class="fail">'+oRet.info+'</span>',autoHide:true,refer: op.data._refer});
									}
								},{data:{},proxy:'/index/index/proxy'});
								
							};
							$(document).queue('getDataList',queue);
							!op.data.doQueue && $(document).dequeue('getDataList');	 
							
							self.setPostForm(dom);
						}
					});
				});
			},
			getPriceList:function(dom,urlObj){
				var o = dom;
				var urlstr = urlObj.url;
				if(urlObj.type == "model"){
					var priceUrl = op.api.price_Order_Url(urlstr);
				}
				else if(urlObj.type == "serial"){
					var priceUrl = op.api.price_Order_Url_Serial(urlstr);
				}
				function transferData(key,value){
					value.serial = value.sserial_name;
					value.model = value.smodel_name;
					if(value.model.length>30){
							value.smodel_name  = value.model.substr(0,28)+'...';
							value.modelnameall = value.model;
						}
						else{
							value.smodel_name  = value.smodel_name;
							value.modelnameall = value.model;
						}
					value.phone = value.s400code;
					value.phone400 = value.s400code ? '<li class = "txt_l phone400 clearfix"><em>电话:<span class = "phone">'+value.s400code+'</span></em></li>':'';
					value.dealer_name = value.sdealer_name;
					value.ip = IPData[0];
					value.ip_province = IPData[3] == "" ? IPData[2].split('市')[0] : IPData[2].split('省')[0] ;
					value.ip_city = IPData[3] == "" ? IPData[2].split('市')[0] : IPData[3].split('市')[0];
					value.qq = op.QQ.uin();
					value.source_url = document.location.href;
					value.source_title = document.title;
					//value.scity_realid = $("#cityId").attr('city_id');
					switch(value.sorder_area)
						{
							case "1":
								 value.sorder_area = '售全国';
								break;
							case "2":
								 value.sorder_area ='售本省';
								break;
							case "3":
								value.sorder_area ='售本市';
								break;
							case "4":
								 value.sorder_area ='售多地';
								break;
							default:
								break;

						}
					switch(value.sstock_type){
						case "0":
							 value.stock = "现车充足";
							break;
						case "1":
							 value.stock = "少量现车";
							break;
						case "2":
							 value.stock = "需提前预定";
							break;
						default:
							break;

					}
					switch(value.sdealer_level){
						case "1":
							 value.vip = '<span></span>';
							 break;
						case "2":
							 value.vip = '<span class = "vip"></span>';
							 break;
						default:
							 break;
					}	
					var currentTime = new Date(); 
					var leftTime = Math.ceil((value.send_time-currentTime/1000)/86400);
					value.time = leftTime + '天';
				}
				$.getScript(priceUrl,function(){
					if(!low_price){
						return;
					}
					var ret = low_price.ret;
					var data = low_price.data;
					var total = data.total;
					var pages = data.pages;
					var page = data.page;
					var datalist = {};
					if(data.list != ''){
						$('#noData').hide();
						if(ret == 0){
							if(!!data.list[0].models){
								$.each(data.list,function(index,item){
									$.each(item.models.list,function(m,n){
										transferData(m,n);
									});
									item.scity_realid = $("#cityId").attr('city_id');
								})
							}
							else{
								$.each(data.list,function(index,item){
									transferData(index,item);
								});
							}
							
							
							
						}else{
							return self.pop({content:'<span class="fail">'+ret.info+'</span>',autoHide:true});
						}
						if(urlObj.type == "model"){
							var tmpmodel = '';
							$('#serialList').empty();
							$('#noData').hide();
							
							if(!!data.list){
								$.each(data.list,function(index,item){
									tmpmodel += self._parseTpl(item,op.tpl.priceList);
									$('#loadData').hide();
									$('#list').html(tmpmodel);
								})
							}
							
							
						}
						else if(urlObj.type == "serial"){
							var datatmp = data.list[0];
							var tmp = '';
							$.each(data.list,function(key,value){
								if(value.models.list.length == 1){
									tmp += self._parseTpl(value,op.tpl.priceListSerialOneLeft);
									$.each(value.models.list,function(index,item){
										tmp += self._parseTpl(value.models.list,op.tpl.priceListSerialOneRight);
									});	
								}
								else{
									tmp += self._parseTpl(value,op.tpl.priceListSerialTwoLeft);
									$.each(value.models.list,function(index,item){ 
										if(index == 1){
											var tpl = self._parseTpl(item,op.tpl.priceListSerialTwo).replace(/up/,'middle');
										}
										else{
											var tpl = self._parseTpl(item,op.tpl.priceListSerialTwo);	
										}
										tmp += tpl;
									});
									//alert(value.models.show_more);
									if(value.models.show_more){
										var tpl = self._parseTpl(value,op.tpl.priceListSerialR);
									}
									else{
										var tpl = self._parseTpl(value,op.tpl.priceListSerialR).replace(/all/,'');
									}
									tmp += tpl;
								}
							});
							$("#list").empty();
							$("#noData").hide();
							$("#loadData").hide();
							$('#serialList').html(tmp);
							tmp = '';
							//动态设置高度
							var tableList = $('#serialList').find('table');
							$.each(tableList,function(key,value){
								var height = $(this).height();
								$(this).parent().find('.serialLeft').css('height',height+10);
							
							});
							//var heigth = $('#serialList').height();
							
							
						}
						self.setAskPrice(".priceAsk span");//询价
						setpage(pages,page);
					}
					else{
						$("#serialList").empty();
						$("#list").empty();
						$("#loadData").hide();
						$("#noData").show();
						$('.pageNav').html('');
					}
					
					
				});
				
				var pageNav = $('.pageNav');
				var setpage = function(pages,index){
					var html= '';
					var pages = pages;
					if(index != 1){
						html+='<a class="pageBtn" href="javascript:void(0)"  onfocus="this.blur();" page="'+parseInt(index-1)+'">上一页</a><a href="javascript:void(0)" onfocus="this.blur();" page="1">1</a>'
					}else{
						html+='<a class="disabled" href="javascript:void(0)"  onfocus="this.blur();">上一页</a><strong>1</strong>'
					}
					if((index-1) > 3){
						html+='<span>...</span>';
					}
						for(i=(index-2); i<=index; i++){
							if(i>1 && i<pages){
								if(i!=index){
									html+='<a onfocus="this.blur();" href="#" page="'+i+'">'+i+'</a>';
								}else{
									html+='<strong>'+i+'</strong>';
								}
							}	
						}
						for(i=(index+1); i<(index+3)&&i<pages; i++){
							html+='<a onfocus="this.blur();" href="#" page="'+i+'">'+i+'</a>';
						}

					
					if((pages-index) >3){
							html+='<span>...</span>';
					}
					if(pages>1){
						if(pages != index){
							html+='<a onfocus="this.blur();" href="#" page="'+pages+'">'+pages+'</a><a class="pageBtn" onfocus="this.blur();" href="#" page="'+parseInt(index+1)+'">下一页</a>';
						}else{
							html+='<strong>'+pages+'</strong><a class="disabled" href="javascript:void(0)"  onfocus="this.blur();" >下一页</a>';
						}
					}
					else{
						html+='<a class="disabled" href="javascript:void(0)"  onfocus="this.blur();" >下一页</a>';
					}
					pageNav.html(html).find('a').unbind().click(function(){
						var page = $(this).attr('page'); 
						var p = page;
						if(p != undefined){
							var urlObj = self.getParams();
							urlObj.url = urlObj.url + "&p=" +p;
							$('#list').empty();
							$("#serialList").empty();
							$('#loadData').show();
							self.getPriceList(o,urlObj);
							$(document).scrollTop($('.priceSelect').offset().top);
							return false;
						}
					})
					
				}
				
			},
			_parseTpl:function(list,tpl){
				if(!list||!tpl)return '';
				// var sublist='';
				// tpl=tpl.replace(/\<foreach (\w+)\>(.+)\<\/foreach\>/g,function(){
					// sublist=arguments[2]||'';
					// return '{'+arguments[1]+'}';
				// });
				var rs=[];
				Object.prototype.toString.call(list)!="[object Array]"&&(list=new Array(list));
				$.each(list,function(index,item){
					(typeof item.index=='undefined')&&(item.index=index+1);
					rs.push(_make(tpl,item));		
				});
				return rs.join('');
				function _make(tpl,data){
					var subTpl={};
				    tpl=tpl.replace(/\<foreach (\w+)\>(.+?)\<\/foreach\>/g,function(){
						subTpl[arguments[1]]=arguments[2]||'';
						return '{'+arguments[1]+'}';
					});
					tpl=tpl.replace(/{if (\w+) = ([\w\d.]+)}(.+?){\/if}/g,function(){
						return data[arguments[1]]==arguments[2]?arguments[3]:''
					});					
					return tpl.replace(/\{(\w+)\}/g,function($1,$2){
						var rs=typeof data[$2]!='undefined'?data[$2]:'';
						return typeof rs!='object'?rs:(function(){
							var tp='',sTpl=subTpl[$2];
							$.each(rs,function(i,item){
								tp+=_make(sTpl,item)
							});
							return tp;
						})();
					});
				}
			},
			getNewsList:function(){
				var tit = $('.titleGroup a');
				var con = $('.bodyGroup div');
				tit.hover(function(){
					var _this = $(this);
					_this.addClass('now').siblings().removeClass('now');
					con.eq(_this.index()).show().siblings().hide();
				})
				
			},
			_stopEvent:function(event){
				if(!event){
					return null;
				}
				(event && event.stopPropagation) ? event.stopPropagation() : (event.cancelBubble = true);
				(event && event.preventDefault) ? event.preventDefault() : (event.returnValue = false);
			},
			queryOption:function(o){
				var o = $(o);
				var cityList = o.find('.cityLayer a').not('.close');
				var cityId = $("#cityId");
					$.ajax({
						url:op.api.IP_Url,
						dataType: "script",
						scriptCharset: "gb2312",
						success:function(){
							//var IPData = new Array("113.141.119.105","","陕西省","汉中市");
							if(IPData[3] == '')
							{
								var cityName = IPData[2].split('市')[0];
							}
							else
							{
								var cityName = IPData[3].split('市')[0];
							}
							
							cityList.length && $.each(cityList,function(index,item){
								if(cid != null){
									$.each(cityList,function(index,item){
										if($(item).attr('id') == cid){
											cityId.attr('city_id',cid);
											$('.citySelect cite').html($(item).html());
										}
								
									});
								 }
								 else{
									 if($(item).html() == cityName)
									{
										cityId.attr('city_id',$(item).attr('id'));
										$('.citySelect cite').html(cityName);
										return false;
									}
									else
									{
										cityId.attr('city_id',0);
										$('.citySelect cite').html("全国");
									}
								 }
								
								
							}); 
							var id = cityId.attr('city_id');
							self.getDealerList(id);
							var urlstr = self.getParams();
							self.getPriceList(o,urlstr);
						}
					});
				
				var citySelect = $('.citySelect');
				citySelect.length && citySelect.unbind().click(function(e){
					self._stopEvent(e);
					var _this = $(this);
					var cityLayer = _this.parent().find('.cityLayer');
					if(!_this.hasClass('citySelected'))
					{
						_this.addClass('citySelected');
						cityLayer.show();
					}
					else{
						_this.removeClass('citySelected');
						cityLayer.hide();
					}
				});
				var cityLayer = $('.cityLayer');
				cityLayer.children().find('a').not('.close').click(function(){
					citySelect.find('cite').html($(this).html());
					var city_id = $(this).attr('id');
					$("#cityId").attr('city_id',city_id);
					$('#list').empty();
					$("#serialList").empty();
					$('#loadData').show();
					var urlstr = self.getParams();
					self.getPriceList(o,urlstr);
				});
				$('body').click(function(e){
					var _this = $(e.target || e.srcElement);
					if(!_this.parent().hasClass('cityLayer'))
					{
						$('.cityLayer').hide();
						$('.citySelect').removeClass('citySelected');
					}
					if(!_this.parents().hasClass('.selectbox-wrapper') && !_this.parent().hasClass('label'))
					{
						$('body').find('.selectbox-wrapper').hide();
					}
				});
				$(".priceBtn").length && $(".priceBtn").click(function(){
					/* var bid = $("#allbrand option:selected").val();
					var sid = $("#allserial option:selected").val();
					var mid = $("#allmodel option:selected").val();
					if(bid==0 && sid==0 && mid ==0) return; */
					var urlstr = self.getParams();
					self.getPriceList(o,urlstr);
				});
				$(".hdDiv span").not('.citySelect').unbind().click(function(){
					$(this).addClass('on').siblings().removeClass('on').removeClass('dec').removeClass('inc');

					if(($(this).hasClass('price') || $(this).hasClass('pubTime')) && $(this).hasClass('on'))
					{
						if(!$(this).hasClass('inc') || $(this).hasClass('dec'))
						{
							$(this).removeClass('dec').addClass('inc');
						}
						else if($(this).hasClass('inc'))
						{
							$(this).removeClass('inc').addClass('dec');
						}
					}
					
					var urlstr = self.getParams();
					self.getPriceList(o,urlstr);
					
				});
				var bid = self.getParam('brandid');
				var sid = self.getParam('serialid');
				var mid = self.getParam('modelid');
				var cid = self.getParam('cityid');
				var oid = self.getParam('order');
				if(bid != null){
					$("#allbrand").append('<option value="'+bid+'" selected="selected"></option>').children().eq(0).attr('selected',false); 
				}
				if(sid != null){
					$("#allserial").append('<option value="'+sid+'" selected="selected"></option>').children().eq(0).attr('selected',false); 
				}
				if(mid != null){
					$("#allmodel").append('<option value="'+mid+'" selected="selected"></option>').children().eq(0).attr('selected',false); 
				}
				if(oid != null){
					var orderObj = $(".hdDiv span").not('.citySelect');
					switch(oid){
						case '2': //降幅
							orderObj.eq(1).trigger('click');
							break;
						default:
							break;
					}
				}
				self.setQueueList();//设置ajax接口队列
				self.getParams();
				
				
			},
			getParams: function(){
				var urlArr = [];
				var urlObj = {};
				var cityid = $("#cityId").attr('city_id');
					urlArr.push('cityid='+cityid);
				
				var brandid = $("#allbrand option:selected").val();
					if(brandid){ urlArr.push('brandid='+brandid);}
				var serialid = $("#allserial option:selected").val();
					if(brandid && serialid){ urlArr.push('serialid='+serialid);}
				var modelid = $("#allmodel option:selected").val();
					if(brandid && serialid && modelid){ urlArr.push('modelid='+modelid);}
				var orderOn =  $(".hdDiv span.on").not('.citySelect');
				if(orderOn.hasClass("default"))
				{
					var order = 0;
				}
				else if(orderOn.hasClass("decrease"))
				{
					var order = 2;
				}
				else if(orderOn.hasClass("price") && orderOn.hasClass("inc"))
				{
					var order = 3;
				}
				else if(orderOn.hasClass("price") && orderOn.hasClass("dec"))
				{
					var order = 4;
				}
				else if(orderOn.hasClass("pubTime") && orderOn.hasClass("inc"))
				{
					var order = 5;
				}
				else if(orderOn.hasClass("pubTime") && orderOn.hasClass("dec"))
				{
					var order = 6;
				}
				urlArr.push('order='+order);
				if(brandid && serialid || brandid && serialid && modelid){
					urlArr = ['order='+order,'cityid='+cityid,'brandid='+brandid,'serialid='+serialid];
					if(modelid){
						urlArr.push('modelid='+modelid);
					}
					urlObj.url = urlArr.join('&')
					urlObj.type = 'model';
				
				}
				else{
					urlObj.url = urlArr.join('&');
					urlObj.type = "serial"
				}
				return urlObj;
				
			},
			setQueueList: function(){
				self.getSelectList();
				!op.data.doQueue && $(document).dequeue('getDataList');				
			},
			getDealerList:function(cityid){
				var url = op.api.dealer_List_Url(cityid);
				var tpl = op.tpl.dealerList;
				$.ajax({
					url:url,
					dataType:'script',
					scriptCharset:'gb2312',
					success:function(){
						var dealerList = low_price_recommend_dealer.data;
						var result = '';
						$.each(dealerList,function(key,value){
							result += '<li class =';
							if(key == 0 || key == 1){
								result += "bb";
							}
							result +='>'	
									+'<a autobussboss="dealer|onsale_dealer|6" target="_blank" href="http://wecar.qq.com/'+value.sdealer_id+'"><img border="0" alt='+value.sdealer_name+' src="http://img1.gtimg.com/datalib_img/'+ value.slogo+'"></a>'
									+'<p><a autobussboss="dealer|onsale_dealer|6" target="_blank" href="http://wecar.qq.com/'+value.sdealer_id+'">'+value.sdealer_name+'</a></p>'
									+'<p>'+value.s400code+'</p>'
									+'<a autobussboss="askprice|onsale_dealer|6" class="online_ask_btn" target="_blank" href="http://wecar.qq.com/dealer/askpricedrive/index/id/'+value.sdealer_id+'">在线咨询</a>'
									+'<em class="line"></em>'
									+'</li>';
						});
						$('.top').html(result);

					}
				});
			},
        	initPrice: function(){
				self  = this;
				op    = this.options;
				self.dealerOption();
				self.setPostForm(); //表单验证
				self.getNewsList();
				self.queryOption('.priceList');//条件筛选 
			//	self.getDealerList('54');
			}
        })
    })(jQuery);
//});
/*  |xGv00|095ba17c31b7f0c00bdd129ee8a5bdd7 */