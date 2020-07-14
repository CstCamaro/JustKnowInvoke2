			     amsCfg_baselottery_6615={
					'isQueryRole' : false, //流程的大区和角色来源请到AMS中配置
					'onBeginGetGiftEvent' : function(){
						return 0; // 抽奖前事件，返回0表示成功
					},
					'onGetGiftFailureEvent' : function(callbackObj,failedRet){// 抽奖失败事件
						alert(callbackObj.sMsg);
						//failedRet 详细见参数说明
					},
					'onGetGiftSuccessEvent' : function(callbackObj,failedRet){// 抽奖成功事件
						//failedRet 详细见参数说明
						if(!callbackObj.sPackageName){
							LotteryManager.alert(callbackObj.sMsg);
							return;
						}
						//2：cdkey
						if(callbackObj.iPackageType == 2)
						{
								LotteryManager.alert('您获得的cdkey为：' + callbackObj.sPackageOtherInfo + '<input type="button" value="复制" onclick="ExplorerManager.clipDataToBoard(\''+callbackObj.sPackageOtherInfo+'\'); alert(\'复制成功。\');">');
										return;
						}
						//1：实物
						var isRealGoods = false;
						if(callbackObj.iPackageType == 1){
							/*
							 * 0：虚拟游戏物品
							 * 1：实际物品，需要填写个人收货信息
							 * 2：cdkey
							 */
							isRealGoods = true;
						}
						var str = "恭喜您获得了 " + callbackObj.sPackageName + " !";
						if(isRealGoods){
							str += "请您准确填写个人信息，官方将有工作人员联系您。";
							// 此处添加用户填写个人信息的函数调用

						}else{
							str += "请您注意查收！";
						}
						LotteryManager.alert(str);
						return;
					}
			  
			  }
			  
			    milo.ready(function(){		
					// 抽奖领取主功能初始化
					amsCfg_43455 = milo.base.extend(amsCfg_baselottery_6615, {
						'iAMSActivityId' : '5650', // AMS活动号
						'activityId' : '6615' // 模块实例号
					});    
					// 抽奖领取主功能初始化
					amsCfg_43470 = milo.base.extend(amsCfg_baselottery_6615, {
						'iAMSActivityId' : '5650', // AMS活动号
						'activityId' : '6615' // 模块实例号
					});    
					// 抽奖领取主功能初始化
					amsCfg_43471 = milo.base.extend(amsCfg_baselottery_6615, {
						'iAMSActivityId' : '5650', // AMS活动号
						'activityId' : '6615' // 模块实例号
					});    
					// 抽奖领取主功能初始化
					amsCfg_43473 = milo.base.extend(amsCfg_baselottery_6615, {
						'iAMSActivityId' : '5650', // AMS活动号
						'activityId' : '6615' // 模块实例号
					});    
				});

			
/*  |xGv00|83134c2d83e8d7c7ee13263cc8c3bf0d */