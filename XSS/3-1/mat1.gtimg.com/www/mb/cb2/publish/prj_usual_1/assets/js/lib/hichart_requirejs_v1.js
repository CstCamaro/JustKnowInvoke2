/*
      hichart 图表模块 20160720
       
*/
define(['lib/mainChart','lib/json2','global-tools/highcharts'], function() {
	var hiChart = {
	    init : function ($chartDom){
            //alert("图表模块");
            //读取后台json图表数据，转义结构
            var len = chartDataArr.length;
            if(len>=0){
                  var id = $chartDom.index(".hiChart");
                  //if (typeof (JSON) == 'undefined') {
                        //alert("浏览器不支持json")
                       //如果浏览器不支持JSON，则载入json2.js
                       //$.getScript('http://mat1.gtimg.com/www/mb/cb2/global/assets/js/tools/json2.js');
                    
                  //}
                  var hiChartData = JSON.parse(chartDataArr[id]);
                  var chartObj = new MainChart(hiChartData);
                  chartObj.buildInit($chartDom,id);  
            }

	    }
	}
	return hiChart;
});
/*  |xGv00|78d3c089164298a10bce66b39920e411 */