function MainChart(__chartDataJson){
    
    this.buildInit = __buildInit;

    var isPc = $(window).width()>768?true:false;

    //饼图适配PC版本---------------------

    var pie_label_positoin = isPc?10:2;//饼图支出说明文字
    var pie_chartMarginLeft = isPc?-400:0;
    var pie_legend = isPc?{align: 'right',floating: true,width:300,x: -25,y: -40}:{}
    var pie_chartSize = isPc?250:180;
    var pcLegend = {
                        enabled: true,
                        align: 'right',
                        width:300,
                        floating: true,
                        x: -25,
                        y: -40,
                        layout: 'horizontal',//'vertical',
                        verticalAlign: 'bottom'
                    }
    var mobileLegend = {enabled: true}
    var bar_legend = isPc?pcLegend:mobileLegend;
    var bar_marginRight = isPc?360:0;
    //-----------------------------------
    //标准数据
    //饼图
    var pie_dataObj_nomal = {
                extendData: {
                    isHaveUint: ""
                },
                chart: {
                    marginLeft: pie_chartMarginLeft,
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text:''// 'Browser market shares at a specific website, 2010'
                },
                tooltip: {
                    //pointFormat: '<b>{point.percentage:.1f}%</b>'
                    formatter: function() {
                        return '<b>数据：</b>'+
                                     Highcharts.numberFormat(this.y, 0, ',') +' <br>'+'<b>'+ this.point.name +'</b>: '+ Highcharts.numberFormat(this.percentage, 1)+'%';
                    }
                },
                legend: pie_legend,
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        colors: ['#ff6633', '#0d233a', '#8bbc21', '#910000', '#1aadce','#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
                        size: pie_chartSize,
                        dataLabels: {
                            enabled: true,
                            distance: pie_label_positoin,
                            color: '#000000',
                            connectorColor: '#000000',
                            //format: '<b>{point.name}</b><br>{point.percentage:.1f} %'
                            format: '<b>{point.name}</b>'
                        },
                        showInLegend: true,
                        point : {
                            events : {
                                legendItemClick: function() {
                                    return false;
                                }
                            }
                        }
                    },
                    series:{
                        animation: true
                    }
                },
                series: [{
                    type: 'pie',
                    name: '',
                    data: [
                        ['Firefox',   45.0],
                        ['IE',       26.8],
                        ['Chrome',    22],
                        ['Safari',    8.5],
                        ['Opera',     6.2],
                        ['Others',   0.7]
                    ]
                }]
            }
    //中心图片形式饼图 center pictrue mode
    var pie_dataObj_haveCenterPic = {
                extendData: {
                    isHaveUint: "",
                    centerPic: ''
                },
                chart: {
                    type: 'pie',
                    marginLeft: pie_chartMarginLeft,
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text:''// 'Browser market shares at a specific website, 2010'
                },
                tooltip: {
                    //pointFormat: '{this.y}<br><b>{point.percentage:.1f}%</b>'
                    formatter: function() {
                        return '<b>数据：</b>'+
                                     Highcharts.numberFormat(this.y, 0, ',') +' <br>'+'<b>'+ this.point.name +'</b>: '+ Highcharts.numberFormat(this.percentage, 1)+'%';
                    }
                },
                legend: pie_legend,
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        colors: ['#ff6633', '#0d233a', '#8bbc21', '#910000', '#1aadce','#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
                        center: ["50%", 120],
                        size: pie_chartSize,
                        innerSize:'75%',
                        dataLabels: {
                            enabled: true,
                            distance: pie_label_positoin
                        },
                        showInLegend: true,
                        point:{
                            events:{
                                legendItemClick:function(){
                                    this.select();
                                    this.show();
                                }
                            }
                        },
                        point : {
                            events : {
                                legendItemClick: function() {
                                    return false;
                                }
                            }
                        }
                    },
                    series:{
                        animation: true
                    }
                },
                series: [{
                    type: 'pie',
                    name: '',
                    data: [
                        ['Firefox',   44.2],
                        ['IE7',       26.6],
                        ['IE6',       20],
                        ['Chrome',    3.1],
                        ['Firefox',   44.2],
                        ['IE7',       26.6],
                        ['IE6',       20],
                        ['Chrome',    3.1],
                        ['Other',    5.4]
                    ]
                }]
            }

    //柱状图(单柱, 横向)
    var bar_dataObj_onebar_horizontal = {
                extendData: {
                    isHaveUint: ""
                },
                colors: ['#cccccc', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
                chart: {
                    type: 'bar',
                    marginRight: bar_marginRight,
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                title: {
                    text: ''//'Stacked bar chart'
                },
                xAxis: {
                    categories: ['Tokyo柱状图',
                        'Jakarta柱状图',
                        'New York柱状图',
                        'Seoul柱状图',
                        'Manila柱状图',
                        'Mumbai柱状图',
                        'Sao Paulo柱状图',
                        'Mexico City柱状图',
                        'Dehli柱状图',
                        'Osaka柱状图',
                        'Cairo柱状图',
                        'Kolkata柱状图',
                        'Los Angeles柱状图',
                        'Shanghai柱状图',
                        'Moscow柱状图',
                        'Beijing柱状图',
                        'Buenos Aires柱状图',
                        'Guangzhou柱状图',
                        'Shenzhen柱状图',
                        'Istanbul柱状图'],
                    lineColor: '#333',
                    lineWidth: 1,
                    tickColor: '#f1f1f1',
                    tickWidth: 1
                },
                yAxis: {
                    min: 0,
                    title: {
                        text:'',// 'Total fruit consumption'
                        align: 'high'
                    },
                    gridLineDashStyle: 'ShortDot',
                    labels: {
                        overflow: 'justify'
                    }
                },
                legend: bar_legend,
                tooltip: {
                    //pointFormat: '<b>数据：</b>{point.y:.1f}'
                    formatter: function() {
                        return '<b>'+ this.point.name +'</b><br>'+'<b>数据：</b>'+
                                     Highcharts.numberFormat(this.y, 0, ',') +' <br>';
                    }
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true,
                            rotation: 0,
                            color: '#000',
                            align: 'left',
                            x: 4,
                            y: 2,
                            style: {
                                fontSize: '8px',
                                fontFamily: 'Verdana, sans-serif',
                                textShadow: '0 0 3px white'
                            }
                        }
                    },
                    series: {
                        animation: true,
                        borderWidth:0,
                        events: {
                            legendItemClick: function(e) {
                                return false; // 直接 return false 即可禁用图例点击事件
                            }
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    data: [34.4, 21.8, 20.1, 20, 19.6, 19.5, 19.1, 18.4, 18,
                    17.3, 16.8, 14, 14.7, 14.5, 13.3, 12.8, 12.4, 11.8,
                    11.7, 11.2]
                }]
            }
    //柱状图(单柱, 竖直)
    var bar_dataObj_onebar_vertical = {
                extendData: {
                    isHaveUint: ""
                },
                colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
                chart: {
                    type: 'column',
                    marginRight: bar_marginRight,
                    backgroundColor: 'rgba(0,0,0,0)'
                    //margin: [ 50, 50, 100, 0]
                },
                title: {
                        text:'',// 'Total fruit consumption'
                        align: 'high'
                    },
                xAxis: {
                    categories: [
                        'Tokyo柱状图',
                        'Jakarta柱状图',
                        'New York柱状图',
                        'Seoul柱状图',
                        'Manila柱状图',
                        'Mumbai柱状图',
                        'Sao Paulo柱状图',
                        'Mexico City柱状图',
                        'Dehli柱状图',
                        'Osaka柱状图',
                        'Cairo柱状图',
                        'Kolkata柱状图',
                        'Los Angeles柱状图',
                        'Shanghai柱状图',
                        'Moscow柱状图',
                        'Beijing柱状图',
                        'Buenos Aires柱状图',
                        'Guangzhou柱状图',
                        'Shenzhen柱状图',
                        'Istanbul柱状图'
                    ],

                    lineColor: '#333',
                    lineWidth: 1,
                    tickColor: '#f1f1f1',
                    tickWidth: 1,

                    labels: {
                        //rotation: -65,
                        align: 'right',
                        style: {
                            fontSize: '8px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    enabled: false,
                    min: 0,
                    title: {
                        text: ''//'Population (millions)'
                    },
                    gridLineDashStyle: 'ShortDot'
                },
                legend: bar_legend,
                tooltip: {
                    pointFormat: '<b>数据：</b>{point.y:.1f}'
                },
                plotOptions: {
                    series: {
                        borderWidth:0
                    },
                    series: {
                        events: {
                            legendItemClick: function(e) {
                                return false; // 直接 return false 即可禁用图例点击事件
                            }
                        }
                    } 
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: '',
                    data: [34.4, 21.8, 20.1, 20, 19.6, 19.5, 19.1, 18.4, 18,
                        17.3, 16.8, 15, 14.7, 14.5, 13.3, 12.8, 12.4, 11.8,
                        11.7, 11.2],
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#000',
                        align: 'higth',
                        x: 0,
                        y: -4,
                        distance: 30,
                        crop:false,
                        //formatter:  function () {
                        //    return   this .y > 5 ?  this .y :  null ;
                        //},
                        style: {
                            fontSize: '8px',
                            fontFamily: 'Verdana, sans-serif',
                            textShadow: '0 0 0px white'
                        }
                    }
                }]
            }
    //柱状图(组类型，竖直)
    var bar_dataObj_manybar_vertical = 
            {
                extendData: {
                    isHaveUint: ""
                },
                colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
                chart: {
                    type: 'column',
                    marginRight: bar_marginRight,
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: ''//'Monthly Average Rainfall'
                },
                subtitle: {
                    text: ''//'Source: WorldClimate.com'
                },
                xAxis: {
                    categories: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec'
                    ],
                    lineColor: '#333',
                    lineWidth: 1,
                    tickColor: '#f1f1f1',
                    tickWidth: 1,

                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '',//'Population (millions)',
                        //align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    },
                    gridLineDashStyle: 'ShortDot'
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    },
                    series: {
                        events: {
                            legendItemClick: function(e) {
                                return false; // 直接 return false 即可禁用图例点击事件
                            }
                        }
                    }
                },
                legend: bar_legend,
                series: [{
                    name: 'Tokyo',
                    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                    ,dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '{series.color}',
                        align: 'higth',
                        x: 0,
                        y: -4,
                        crop:false,
                        distance: 30,
                        style: {
                            fontSize: '8px',
                            fontFamily: 'Verdana, sans-serif',
                            textShadow: '0 0 0px white'
                        }
                    }    
                }, {
                    name: 'New York',
                    data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
                    ,dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '{series.color}',
                        align: 'higth',
                        x: 0,
                        y: -4,
                        style: {
                            fontSize: '8px',
                            fontFamily: 'Verdana, sans-serif',
                            textShadow: '0 0 0px white'
                        }
                    } 
                }]
            }
    //柱状图(组类型, 横向)
    var bar_dataObj_manybar_horizontal = {
                extendData: {
                    isHaveUint: ""
                },
                colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
                chart: {
                    type: 'bar',
                    marginRight: bar_marginRight,
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                title: {
                    text:  ''//'Historic World Population by Region'
                },
                subtitle: {
                    text: ''//'Source: Wikipedia.org'
                },
                xAxis: {
                    categories: ['非洲', '美洲', '亚洲', '欧洲', '大洋洲'],
                    title: {
                        text: null
                    },
                    lineColor: '#333',
                    lineWidth: 1,
                    tickColor: '#f1f1f1',
                    tickWidth: 1,

                    gridLineDashStyle: 'ShortDot'
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '',//'Population (millions)',
                        //align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    //valueSuffix: ' millions'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true,
                            rotation: 0,
                            color: '#000',
                            align: 'higth',
                            x: 0,
                            y: 0,
                            crop:false,
                            distance: 30,
                            style: {
                                fontSize: '8px',
                                fontFamily: 'Verdana, sans-serif',
                                textShadow: '0 0 3px white'
                            }
                        }
                    },
                    series: {
                        borderWidth:0
                    } 
                },
                legend: bar_legend, /*{
                    enabled:true,
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 100,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: '#FFFFFF',
                    shadow: true
                }*/
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Year 1800',
                    data: [107, 31, 635, 203, 2]
                }, {
                    name: 'Year 1900',
                    data: [133, 156, 947, 408, 6]
                }]
            }
    //-----------------------------------

    var chartDataItemObj = __chartDataJson;
    var isHaveData = chartDataItemObj.hasOwnProperty('data'); 
    var newSeriesDataArr = []; 

    if(isHaveData){

        //拆分数据
        var chartDataObj = {} 
        switch(chartDataItemObj.id){
            //饼图
            case "3_18":

                var len = chartDataItemObj.data.length;
                for(var i=0;i<len;i++){
                    var cData = chartDataItemObj.data[i];
                    if(cData.title!="" && cData.scale!=""){
                        newSeriesDataArr.push([cData.title,Number(cData.scale)]);
                    }
                }

                

                if(chartDataItemObj.type==0){
                    // trace("没有中心图片的饼图")
                    //设置数据-----
                    pie_dataObj_nomal.series[0].data = newSeriesDataArr;
                    //设置颜色-----
                    var dataColorsStr = chartDataItemObj.colorCfg;
                    pie_dataObj_nomal.plotOptions.series.animation = chartDataItemObj.isAnimation;
                    pie_dataObj_nomal.plotOptions.pie.colors = dataColorsStr.split(",");
                    chartDataObj = pie_dataObj_nomal;
                   
                }else if(chartDataItemObj.type==1){
                    //trace("有图片的饼图");
                    //设置数据-----
                    pie_dataObj_haveCenterPic.series[0].data = newSeriesDataArr;
                    //
                    pie_dataObj_haveCenterPic.extendData.centerPic=chartDataItemObj.image;
                    //设置颜色-----
                    var dataColorsStr = chartDataItemObj.colorCfg;
                    pie_dataObj_haveCenterPic.plotOptions.series.animation = chartDataItemObj.isAnimation;
                    pie_dataObj_haveCenterPic.plotOptions.pie.colors = dataColorsStr.split(",");
                    
                    chartDataObj = pie_dataObj_haveCenterPic;
                }


                

                //trace(chartDataItemObj.colorCfg);

   
                break;

            case "3_19":

                //type 0 为单柱状   1为双柱状
                //isEndwise true 为竖着的   false为横着的

                //
                if(chartDataItemObj.type==0){
                    //为单柱状
                    var oneBarNameData = [];
                    //单柱颜色
                    var oneColorStr = chartDataItemObj.color;
                    var isAnimation = chartDataItemObj.isAnimation;
                    var isEndwise = chartDataItemObj.isEndwise;
                    var isUnit = chartDataItemObj.isUnit;
                    var dataObj = chartDataItemObj.data;

                    var len = dataObj.length;
                    for(var i=0;i<len;i++){
                        var cData = chartDataItemObj.data[i];
                        if(cData.title!="" && cData.scale!=""){
                            newSeriesDataArr.push([cData.title,Number(cData.scale)]);
                            oneBarNameData.push([cData.title]);
                        }
                    }
                    
                    if(chartDataItemObj.isEndwise=="true"){
                        //柱状图为竖着
                        
                        //设置数据-----
                        bar_dataObj_onebar_vertical.series[0].data = newSeriesDataArr;
                        bar_dataObj_onebar_vertical.colors = oneColorStr.split(",")
                        bar_dataObj_onebar_vertical.xAxis.categories = [];  
                        bar_dataObj_onebar_vertical.xAxis.categories = oneBarNameData;
                        bar_dataObj_onebar_vertical.legend = {enabled: false}
                        chartDataObj = bar_dataObj_onebar_vertical;
                        
                    }else{
                        //柱状图为横着  
                        //设置数据-----
                        bar_dataObj_onebar_horizontal.series[0].data = newSeriesDataArr;
                        bar_dataObj_onebar_horizontal.colors = oneColorStr.split(",")
                        bar_dataObj_onebar_horizontal.xAxis.categories = [];  
                        bar_dataObj_onebar_horizontal.xAxis.categories = oneBarNameData;
                        bar_dataObj_onebar_horizontal.legend = {enabled: false}
                        chartDataObj = bar_dataObj_onebar_horizontal;
                    }
                    

                    //trace(chartDataItemObj.isEndwise)
                    //trace(oneColorStr)

                }else if(chartDataItemObj.type==1){
                    //1为双柱状
                    //单柱颜色
                    var colorAStr = chartDataItemObj.colorA;
                    var colorBStr = chartDataItemObj.colorB;
                    var titleA = chartDataItemObj.titleA;
                    var titleB = chartDataItemObj.titleB;
                    var isAnimation = chartDataItemObj.isAnimation;
                    var isEndwise = chartDataItemObj.isEndwise;
                    var isUnit = chartDataItemObj.isUnit;
                    var dataObj = chartDataItemObj.data;

                    if(chartDataItemObj.isEndwise=="true"){
                        //柱状图为竖着
                        //trace("双柱状")

                        var oneTitleNameData = [];
                        var oneScaleAData = [];
                        var oneScaleBData = [];
                        var len = chartDataItemObj.data.length;
                        for(var i=0;i<len;i++){
                            var cData = dataObj[i];
                            if(cData.title!="" && cData.scale!=""){
                                //newSeriesDataArr.push([cData.title,Number(cData.scale)]);
                                oneTitleNameData.push(cData.title);
                                oneScaleAData.push(Number(cData.scaleA));
                                oneScaleBData.push(Number(cData.scaleB));
                            }
                        }

                        bar_dataObj_manybar_vertical.series[0].name = titleA;
                        bar_dataObj_manybar_vertical.series[0].color = colorAStr;
                        bar_dataObj_manybar_vertical.series[0].data = oneScaleAData;

                        bar_dataObj_manybar_vertical.series[1].name = titleB;
                        bar_dataObj_manybar_vertical.series[1].color = colorBStr;
                        bar_dataObj_manybar_vertical.series[1].data = oneScaleBData;
                        
                        //bar_dataObj_manybar_vertical.colors = oneColorStr.split(",")
                        bar_dataObj_manybar_vertical.xAxis.categories = [];  
                        bar_dataObj_manybar_vertical.xAxis.categories = oneTitleNameData;

                      

                        chartDataObj = bar_dataObj_manybar_vertical;

                    }else{
                        //柱状图为横着  

                        var oneTitleNameData = [];
                        var oneScaleAData = [];
                        var oneScaleBData = [];
                        var len = chartDataItemObj.data.length;
                        for(var i=0;i<len;i++){
                            var cData = dataObj[i];
                            if(cData.title!="" && cData.scale!=""){
                                //newSeriesDataArr.push([cData.title,Number(cData.scale)]);
                                oneTitleNameData.push(cData.title);
                                oneScaleAData.push(Number(cData.scaleA));
                                oneScaleBData.push(Number(cData.scaleB));
                            }
                        }

                        bar_dataObj_manybar_horizontal.series[0].name = titleA;
                        bar_dataObj_manybar_horizontal.series[0].color = colorAStr;
                        bar_dataObj_manybar_horizontal.series[0].data = oneScaleAData;

                        bar_dataObj_manybar_horizontal.series[1].name = titleB;
                        bar_dataObj_manybar_horizontal.series[1].color = colorBStr;
                        bar_dataObj_manybar_horizontal.series[1].data = oneScaleBData;
                        
                        //bar_dataObj_manybar_vertical.colors = oneColorStr.split(",")
                        bar_dataObj_manybar_horizontal.xAxis.categories = [];  
                        bar_dataObj_manybar_horizontal.xAxis.categories = oneTitleNameData;

                        chartDataObj = bar_dataObj_manybar_horizontal;
                    }

                    

                    //chartDataObj = bar_dataObj_onebar_vertical
                }

                

                

                break;
        }
        


    }

    
    //------------------------------------
    


    function __buildInit(_$target,_id){
        var indexId = _id;
        var $tagDom = _$target;
        //     
        var $tag = $tagDom.find(".content .chart");
        var dataObj = chartDataObj;
        $tag.highcharts(dataObj);
        //
        var extendData = dataObj.hasOwnProperty('extendData'); 
        if(extendData){
            var centerPic = dataObj.extendData.hasOwnProperty('centerPic'); 
            if(centerPic){
                var centerPicUrl = dataObj.extendData.centerPic
                var htmlStr = '<div class="centerImg"><img src="'+centerPicUrl+'"></div>';
                $tag.prepend(htmlStr);
            }  

            //是否有单位
            var isHaveUint = dataObj.extendData.hasOwnProperty('isHaveUint');
            if(isHaveUint){
                var isHave = dataObj.extendData.isHaveUint;
                if(isHave!=""){
                    $tagDom.find(".uint").show();
                    //trace("显示");
                }else{
                    $tagDom.find(".uint").hide();
                    //trace("隐藏");
                }

            }
        }

        //console.log(_id+" chartDom hiChart图表......");
    }


    function trace(__str){
        //console.log(__str)
    }


}/*  |xGv00|2a3a0546fb29bfb948938550da640790 */