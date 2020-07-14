function inHref(str)
{
    return (window.location.href.indexOf(str) != -1) ? true : false;
}
if(typeof(pgvMain) == 'function')
{
    /*
    pgv_qiche_serial 车系页
    pgv_qiche_model 车型页
    pgv_qiche_sl_news 车系相关资讯  
    pgv_qiche_sl_news_zh 车系综合新闻
    pgv_qiche_sl_news_dg 车系导购
    pgv_qiche_sl_news_hq 车系行情
    pgv_qiche_sl_news_sj 车系试驾
    pgv_qiche_sl_news_xd 车系心得
    pgv_qiche_sl_cp 同系车型对比
    pgv_qiche_sl_ml 车系、车型汇总
    pgv_qiche_search 车型库搜索
    pgv_qiche_compare 对比工具
    pgv_qiche_ml_zc 在产车型
    pgv_qiche_ml_tc 停产车型
    pgv_qiche_fuelcost 车系油耗
    pgv_qiche_wom 车系口碑(总)
    pgv_qiche_wom_new 车系口碑新
    pgv_qiche_wom_good 车系口碑好评
    pgv_qiche_wom_bad 车系口碑坏评
    pgv_qiche_wom_list 车系口碑列表
    pgv_qiche_wom_detail 点评详情页面
    pgv_qiche_rank 排行榜页面
    pgv_qiche_compare_data 对比工具_参数配置
    pgv_qiche_compare_pic  对比工具_图片
    pgv_qiche_compare_wom  对比工具_点评
    pgv_qiche_fuelaccount 油耗统计
    pgv_qiche_user 个人中心
    pgv_qiche_user_custom 个人中心客人页面
    pgv_qiche_wom_tag 点评tag页卡
    pgv_qiche_userset 个人设置页面
    pgv_qiche_fuel_custom 油耗客人页
    pgv_qiche_wbwom_list 车系微评列表
    pgv_qiche_carbrand_index 车型大全首页
    pgv_qiche_carbrand_index_price 车型大全首页按价格页
    pgv_qiche_carbrand_index_type 车型大全首页按级别页
    pgv_qiche_carbrand_index_use 车型大全首页按用途页
    pgv_qiche_carbrand_index_country 车型大全首页按国别页
    pgv_qiche_hq_all 行情中心汇总
    pgv_qiche_hq_index 行情中心首页
    pgv_qiche_hq_index_area 行情中心地区页
    pgv_qiche_hq_index_manufacturer 行情中心品牌页
    pgv_qiche_hq_index_serial 行情中心车系页
	pgv_qiche_yp_all 用品汇总
    pgv_qiche_yp_index 用品首页
    pgv_qiche_yp_brand 用品品牌页
    pgv_qiche_yp_model 用品型号页
    pgv_qiche_hq_search 用品搜索页

    pgv_qiche_eva_all 评测中心汇总
    pgv_qiche_eva_index 评测中心首页
    pgv_qiche_eva_serial_index 评测中心车系页首页
    pgv_qiche_eva_serial_cxwg 评测中心车系页车型外观
    pgv_qiche_eva_serial_nspz 评测中心车系页内饰配置
    pgv_qiche_eva_serial_cxkj 评测中心车系页车型空间
    pgv_qiche_eva_serial_jszd 评测中心车系页加速制动
    pgv_qiche_eva_serial_yhzy 评测中心车系页油耗噪音
    
    pgv_qiche_carvideo_all 视频中心汇总
    pgv_qiche_carvideo_index 视频中心首页
    pgv_qiche_carvideo_serial 视频中心车系页
	
	
	pgv_qiche_purchases_all 导购中心汇总
	pgv_qiche_purchases_index 导购中心首页
	pgv_qiche_purchases_search 导购中心搜索页
	pgv_qiche_purchases_gcsc 导购中心购车手册
	pgv_qiche_purchases_txrw 导购中心腾讯任务
	pgv_qiche_purchases_cxdg 导购中心车型导购
	pgv_qiche_purchases_pk 导购中心捉对PK
	pgv_qiche_purchases_picture 导购中心到店实拍
	pgv_qiche_purchases_hmc 导购中心会买车
	pgv_qiche_purchases_xqmc 导购中心小强买车
	
	pgv_qiche_person_all 人物库汇总
	pgv_qiche_person_index 人物库汇总
	pgv_qiche_person_list 人物汇总
	pgv_qiche_person_detail 底层页
	pgv_qiche_person_brand  人物关系页
	
	
    */
    if(inHref("car_brand") && inHref("index.shtml"))
    {
        vsPgvCol = "pgv_qiche_carbrand_index";
    }else if(inHref("car_public/1") && inHref("index_price"))
    {
        vsPgvCol = "pgv_qiche_carbrand_index_price";
    }else if(inHref("car_public/1") && inHref("index_type"))
    {
        vsPgvCol = "pgv_qiche_carbrand_index_type";
    }else if(inHref("car_public/1") && inHref("index_use"))
    {
        vsPgvCol = "pgv_qiche_carbrand_index_use";
    }else if(inHref("car_public/1") && inHref("index_country"))
    {
        vsPgvCol = "pgv_qiche_carbrand_index_country"
    }else if(inHref("serial") && inHref("index.shtml"))
    {
        vsPgvCol = "pgv_qiche_serial;pgv_qiche_sl_ml;";
    }else if(inHref("serial") && inHref("news.shtml"))
    {
        vsPgvCol = "pgv_qiche_sl_news_zh;pgv_qiche_sl_news;pgv_qiche_sl_ml;";
    }else if(inHref("serial") && inHref("news_dg.shtml"))
    {
        vsPgvCol = "pgv_qiche_sl_news_dg;pgv_qiche_sl_news;pgv_qiche_sl_ml;";
    }else if(inHref("serial") && inHref("news_hq.shtml"))
    {
        vsPgvCol = "pgv_qiche_sl_news_hq;pgv_qiche_sl_news;pgv_qiche_sl_ml;";
    }else if(inHref("serial") && inHref("news_sj.shtml"))
    {
        vsPgvCol = "pgv_qiche_sl_news_sj;pgv_qiche_sl_news;pgv_qiche_sl_ml;";
    }else if(inHref("serial") && inHref("news_xd.shtml"))
    {
        vsPgvCol = "pgv_qiche_sl_news_xd;pgv_qiche_sl_news;pgv_qiche_sl_ml;";
    }else if(inHref("serial") && inHref("modelscompare.shtml"))
    {
        vsPgvCol = "pgv_qiche_sl_cp;pgv_qiche_sl_ml;";
    }else if(inHref("models") && inHref("index.shtml"))
    {
        vsPgvCol = "pgv_qiche_model;pgv_qiche_sl_ml;";
        if (typeof STATUS != "undefined")
        {
            if(STATUS == "在产")
            {
                vsPgvCol = "pgv_qiche_model;pgv_qiche_sl_ml;pgv_qiche_ml_zc;";
            }
            else if (STATUS == "停产")
            {
                vsPgvCol = "pgv_qiche_model;pgv_qiche_sl_ml;pgv_qiche_ml_tc;";
            }
        }
    }else if(inHref("cgi.data.auto.qq.com/php/search.php"))
    {
        vsPgvCol = "pgv_qiche_search;";
    }else if(inHref("serial") && inHref("fuelcost.shtml"))
    {
        vsPgvCol = "pgv_qiche_fuelcost;";
    }else if (inHref("car_public") && (inHref("fuelcostrank.shtml") || inHref("fuelcostrank_2.shtml")))
    {
        vsPgvCol = "pgv_qiche_fuelcost;pgv_qiche_rank;";
    }else if (inHref("car_public") && inHref("ratingrank.shtml"))
    {
        vsPgvCol = "pgv_qiche_rank;";
    }else if(inHref("serial") && inHref("wom.shtml"))
    {
        vsPgvCol = "pgv_qiche_wom;";
    }else if(inHref("car_public") && inHref("wom.shtml"))
    {
        vsPgvCol = "pgv_qiche_wom;";
    }else if (inHref("cgi.data.auto.qq.com") && inHref("mod=womreply"))
    {
        vsPgvCol = "pgv_qiche_wom;pgv_qiche_wom_detail;";
    }else if (inHref("cgi.data.auto.qq.com") && inHref("mod=wom") && !inHref("list=1"))
    {
        vsPgvCol = "pgv_qiche_wom;pgv_qiche_wom_new;";
    }else if (inHref("cgi.data.auto.qq.com") && inHref("mod=wom") && !inHref("list=1") && inHref("class=1"))
    {
        vsPgvCol = "pgv_qiche_wom;pgv_qiche_wom_new;pgv_qiche_wom_good;";
    }else if (inHref("cgi.data.auto.qq.com") && inHref("mod=wom") && !inHref("list=1") && inHref("class=2"))
    {
        vsPgvCol = "pgv_qiche_wom;pgv_qiche_wom_new;pgv_qiche_wom_bad;";
    }else if (inHref("cgi.data.auto.qq.com") && inHref("mod=wom") && inHref("list=1") && inHref("tag=") && !inHref("tag!=100"))
    {
        vsPgvCol = "pgv_qiche_wom;pgv_qiche_wom_new;pgv_qiche_wom_list;pgv_qiche_wom_tag;";
    }else if (inHref("cgi.data.auto.qq.com") && inHref("mod=wom") && inHref("list=1") && inHref("class=4"))
    {
        vsPgvCol = "pgv_qiche_wom;pgv_qiche_wom_new;pgv_qiche_wbwom_list;";
    }else if (inHref("cgi.data.auto.qq.com") && inHref("mod=wom") && inHref("list=1"))
    {
        vsPgvCol = "pgv_qiche_wom;pgv_qiche_wom_new;pgv_qiche_wom_list;";
    }else if (inHref("car_public") && inHref("pic_compare.shtml"))
    {
        vsPgvCol = "pgv_qiche_compare;pgv_qiche_compare_pic;";
    }else if (inHref("car_public") && inHref("womcompare.shtml"))
    {
        vsPgvCol = "pgv_qiche_compare;pgv_qiche_compare_wom;";
    }else if (inHref("car_public") && inHref("compare.shtml"))
    {
        vsPgvCol = "pgv_qiche_compare;pgv_qiche_compare_data;";
    }else if (inHref("cgi.data.auto.qq.com") && inHref("mod=userset"))
    {
        vsPgvCol = "pgv_qiche_wom;pgv_qiche_userset;pgv_qiche_user;";
    }else if (inHref("cgi.data.auto.qq.com") && inHref("mod=user") && inHref("u="))
    {
        vsPgvCol = "pgv_qiche_wom;pgv_qiche_user;pgv_qiche_user_custom;";
    }else if (inHref("cgi.data.auto.qq.com") && inHref("mod=user"))
    {
        vsPgvCol = "pgv_qiche_wom;pgv_qiche_user;";
    }else if (inHref("cgi.data.auto.qq.com") && inHref("mod=fuelaccount") && inHref("u="))
    {
        vsPgvCol = "pgv_qiche_wom;pgv_qiche_fuelaccount;pgv_qiche_user;pgv_qiche_fuel_custom;";
    }else if (inHref("cgi.data.auto.qq.com") && inHref("mod=fuelaccount"))
    {
        vsPgvCol = "pgv_qiche_wom;pgv_qiche_fuelaccount;pgv_qiche_user;";
    }
    else if (inHref("car_public/1") && inHref("hq.shtml"))
    {
        vsPgvCol = "pgv_qiche_hq_all;pgv_qiche_hq_index;";
    }
    else if (inHref("car_public/hq") && inHref("areanewslist_"))
    {
        vsPgvCol = "pgv_qiche_hq_all;pgv_qiche_hq_index_area;";
    }
    else if (inHref("car_manufacturer") && inHref("hq_manu_list"))
    {
        vsPgvCol = "pgv_qiche_hq_all;pgv_qiche_hq_index_manufacturer;";
    }
    else if (inHref("car_serial") && inHref("hangqing_serial.shtml"))
    {
        vsPgvCol = "pgv_qiche_hq_all;pgv_qiche_hq_index_serial;";
    }
    else if (inHref("accessories/index.shtml"))
    {
	vsPgvCol = "pgv_qiche_yp_all;pgv_qiche_yp_index;";
    }
    else if (inHref("accessories/brands"))
    {
	vsPgvCol = "pgv_qiche_yp_all;pgv_qiche_yp_brand;";
    }
    else if (inHref("accessories/models"))
    {
	vsPgvCol = "pgv_qiche_yp_all;pgv_qiche_yp_model;";
    }
    else if (inHref("accessories/search.shtml"))
    {
	vsPgvCol = "pgv_qiche_yp_all;pgv_qiche_yp_search;";
    }
    else if (inHref("car_evaluat/index.shtml"))
    {
        vsPgvCol = "pgv_qiche_eva_all;pgv_qiche_eva_index;";
    }
    else if (inHref("car_evaluat/")&& inHref("index_"))
    {
        vsPgvCol = "pgv_qiche_eva_all;pgv_qiche_eva_serial_index;";
    }
    else if (inHref("car_evaluat/")&& inHref("cxwg_"))
    {
        vsPgvCol = "pgv_qiche_eva_all;pgv_qiche_eva_serial_cxwg;";
    }
    else if (inHref("car_evaluat/")&& inHref("nspz_"))
    {
        vsPgvCol = "pgv_qiche_eva_all;pgv_qiche_eva_serial_nspz;";
    }
    else if (inHref("car_evaluat/")&& inHref("cxkj_"))
    {
        vsPgvCol = "pgv_qiche_eva_all;pgv_qiche_eva_serial_cxkj;";
    }
    else if (inHref("car_evaluat/")&& inHref("jszd_"))
    {
        vsPgvCol = "pgv_qiche_eva_all;pgv_qiche_eva_serial_jszd;";
    }
    else if (inHref("car_evaluat/")&& inHref("yhzy_"))
    {
        vsPgvCol = "pgv_qiche_eva_all;pgv_qiche_eva_serial_yhzy;";
    }
    else if (inHref("car_video/index.shtml"))
    {
        vsPgvCol = "pgv_qiche_carvideo_all;pgv_qiche_carvideo_index;";
    }
    else if (inHref("car_video")&& inHref("serialvideos.shtml"))
    {
        vsPgvCol = "pgv_qiche_carvideo_all;pgv_qiche_carvideo_serial;";
    }
	
	else if (inHref("car_purchases")&& inHref("index.shtml"))
    {
        vsPgvCol = "pgv_qiche_purchases_all;pgv_qiche_purchases_index;";
    }    
	else if (inHref("car_purchases")&& inHref("car_search.shtml"))
    {
        vsPgvCol = "pgv_qiche_purchases_all;pgv_qiche_purchases_search;";
    }
	else if (inHref("car_purchases")&& inHref("gcsc/car_column_1.shtml"))
    {
        vsPgvCol = "pgv_qiche_purchases_all;pgv_qiche_purchases_gcsc;";
    }
	else if (inHref("car_purchases")&& inHref("txrw/car_column_1.shtml"))
    {
        vsPgvCol = "pgv_qiche_purchases_all;pgv_qiche_purchases_txrw;";
    }
	else if (inHref("car_purchases")&& inHref("cxdg/car_column_1.shtml"))
    {
        vsPgvCol = "pgv_qiche_purchases_all;pgv_qiche_purchases_cxdg;";
    }
	else if (inHref("car_purchases")&& inHref("pk/car_column_1.shtml"))
    {
        vsPgvCol = "pgv_qiche_purchases_all;pgv_qiche_purchases_pk;";
    }
	else if (inHref("car_purchases")&& inHref("picture/car_column_1.shtml"))
    {
        vsPgvCol = "pgv_qiche_purchases_all;pgv_qiche_purchases_picture;";
    }
	else if (inHref("car_purchases")&& inHref("hmc/car_column_1.shtml"))
    {
        vsPgvCol = "pgv_qiche_purchases_all;pgv_qiche_purchases_hmc;";
    }
	else if (inHref("car_purchases")&& inHref("xqmc/car_column_1.shtml"))
    {
        vsPgvCol = "pgv_qiche_purchases_all;pgv_qiche_purchases_xqmc;";
    }
	else if (inHref("auto.qq.com/person"))
    {
        vsPgvCol = "pgv_qiche_person_all;pgv_qiche_person_index;";
    }
	else if (inHref("auto.qq.com/person/searchSort") || inHref("auto.qq.com/person/searchLetter"))
    {
        vsPgvCol = "pgv_qiche_person_all;pgv_qiche_person_list;";
    }
	else if (inHref("auto.qq.com/d/person"))
    {
        vsPgvCol = "pgv_qiche_person_all;pgv_qiche_person_detail;";
    }
	else if (inHref("auto.qq.com/d/brand"))
    {
        vsPgvCol = "pgv_qiche_person_all;pgv_qiche_person_brand;";
    }
	
	if(window.location.href.indexOf('?')!=-1){
        pvCurUrl = window.location.href.substring(window.location.href.indexOf(".com") + 4).split('?')[0];
    }else{
		pvCurUrl = window.location.href.substring(window.location.href.indexOf(".com") + 4);
	}
	
	
	//人物库分别统计到data.auto.qq.com和auto.qq.com为了解决AIO不显示统计数的问题
	//if(inHref("auto.qq.com/person") || inHref("auto.qq.com/d/person") || inHref("auto.qq.com/d/brand")){
	//	pvCurDomain = "auto.qq.com";
	//	pvRepeatCount = 1;
	//	pgvMain();
	//}
	
	pvCurDomain = "data.auto.qq.com";
	//pvRepeatCount = 1;
	pgvMain();
	
}
/*  |xGv00|15ffc75faa4eabb983cc5c50c3ba9d02 */