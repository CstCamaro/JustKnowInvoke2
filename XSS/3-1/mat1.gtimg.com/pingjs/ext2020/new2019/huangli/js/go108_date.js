function DateSelector(selYear, selMonth, selDay)                      
{    
    this.selYear = selYear;      
    this.selMonth = selMonth;    
    this.selDay = selDay;        
    this.selYear.Group = this;   
    this.selMonth.Group = this;
	  //默认为阳历
	  this.Calendar = 1;
    // 给年份、月份下拉菜单添加处理onchange事件的函数
    if(window.document.all != null) // IE 
    {
        this.selYear.attachEvent("onchange", DateSelector.Onchange);  
        this.selMonth.attachEvent("onchange", DateSelector.OnMonthchange);
    }
    else // Firefox              
    {
        this.selYear.addEventListener("change", DateSelector.Onchange, false); 
        this.selMonth.addEventListener("change", DateSelector.OnMonthchange, false);
    }

    if(arguments.length == 4) // 如果传入参数个数为4，最后一个参数必须为Date对象                           
        this.InitSelector(arguments[3].getFullYear(), arguments[3].getMonth() + 1, arguments[3].getDate());
    else if(arguments.length == 6) // 如果传入参数个数为6，最后三个参数必须为初始的年月日数值              
        this.InitSelector(arguments[3], arguments[4], arguments[5]);
	else if(arguments.length == 8) // 如果传入参数个数为8，最后五个参数必须为初始的年月日和阴阳历数值              
    {
		this.selCalendar = arguments[6];
		this.selCalendar.Group = this;
		if(window.document.all != null)
		{
			this.selCalendar.attachEvent("onchange", DateSelector.Onchange);
		}else
		{
			this.selCalendar.addEventListener("change", DateSelector.Onchange, false);
		}
		this.InitSelector(arguments[3], arguments[4], arguments[5], arguments[7]);
	}
    else // 默认使用当前日期
    {
        var dt = new Date();
        this.InitSelector(dt.getFullYear(), dt.getMonth() + 1, dt.getDate());  
    }
}    

// 增加一个最大年份的属性        
DateSelector.prototype.MinYear =(new Date()).getFullYear()-1;    

// 增加一个最大年份的属性        
DateSelector.prototype.MaxYear = (new Date()).getFullYear()+1;          

// 初始化年份                    
DateSelector.prototype.InitYearSelect = function()                    
{    
    // 循环添加OPION元素到年份select对象中
    for(var i = this.MaxYear; i >= this.MinYear; i--)                 
    {
        // 新建一个OPTION对象    
        var op = window.document.createElement("OPTION");             

        // 设置OPTION对象的值    
        op.value = i;            

        // 设置OPTION对象的内容  
        op.innerHTML = i;

        // 添加到年份select对象  
        this.selYear.appendChild(op);
    }
};

// 初始化月份                    
DateSelector.prototype.InitMonthSelect = function()                   
{
	var mon = Number(this.selMonth.value);

	var numOfMon = 12;
	
	//阴历闰月
	var pre_m = leapMonth(this.preYear);
	var m = leapMonth(parseInt(this.selYear.value));
	
	// 清空原有的选项
    this.selMonth.options.length = 0;
    // 循环添加OPION元素到月份select对象中
    for(var i = 1; i <= numOfMon; i++)
    {
        // 新建一个OPTION对象
        var op = window.document.createElement("OPTION");

        // 设置OPTION对象的值
        op.value = i;

        // 设置OPTION对象的内容
        op.innerHTML = i;

		//默认为上一次的月份值
		if(i == mon || (mon <= 0 && pre_m == i))
			op.selected = true;

        // 添加到月份select对象
        this.selMonth.appendChild(op);
		
		//阴历
		if(this.Calendar == 0 && m > 0 && m == i)
		{
			op = window.document.createElement("OPTION");
			op.value = -m;
			op.innerHTML = m + "(闰)";
			op.style.color = "#cc0000";
			this.selMonth.appendChild(op);
		}
    }
	
};

// 根据年份与月份获取当月的天数  
DateSelector.DaysInMonth = function(year, month, Calendar)                      
{
	var num;
	if(Calendar == 0)
	{
		//闰月
		if(0 == month)
			num = leapDays(year);
		else
			num = monthDays(year,month);
	}else
	{
		var date = new Date(year, month, 0);  
		num = date.getDate();
	}
	return num;
};

// 初始化天数                    
DateSelector.prototype.InitDaySelect = function()                     
{    
    // 使用parseInt函数获取当前的年份和月份                           
    var year = parseInt(this.selYear.value);                          
    var month = parseInt(this.selMonth.value);
	var day = Number(this.selDay.value);

    // 获取当月的天数            
    var daysInMonth = DateSelector.DaysInMonth(year, month, this.Calendar);          

	this.daysInMonth = daysInMonth;
	
    // 清空原有的选项
    this.selDay.options.length = 0;
    // 循环添加OPION元素到天数select对象中
    for(var i = 1; i <= daysInMonth ; i++)
    {
        // 新建一个OPTION对象    
        var op = window.document.createElement("OPTION");             

        // 设置OPTION对象的值    
        op.value = i;            

        // 设置OPTION对象的内容  
        op.innerHTML = i;
		
		if(i == day)
			op.selected = true;

        // 添加到天数select对象  
        this.selDay.appendChild(op);      
    }
};

// 初始化阴阳历
DateSelector.prototype.InitCalendarSelect = function()                   
{
	var cal = {"1":'阳历',"0":'阴历'};
  for(var el in cal){
 		var op = window.document.createElement("OPTION");
		op.value = el;
		op.innerHTML = cal[el];
		if(el == this.Calendar){
			op.selected = true;
		}
		this.selCalendar.appendChild(op);
  }
};

// 处理年份和阴阳历onchange事件的方法，它获取事件来源对象（即selYear或selMonth） 
// 并调用它的Group对象（即DateSelector实例，请见构造函数）提供的InitDaySelect方法重新初始化天数            
// 参数e为event对象
DateSelector.Onchange = function(e)
{    
    var selector = window.document.all != null ? e.srcElement : e.target;
	
	if(selector.Group.selCalendar)
	{
		selector.Group.Calendar = selector.Group.selCalendar.value;
	}

	selector.Group.InitMonthSelect();
	selector.Group.InitDaySelect();
	
	selector.Group.preYear = selector.Group.selYear.value;
};

DateSelector.OnMonthchange = function(e)       
{    
    var selector = window.document.all != null ? e.srcElement : e.target;
	selector.Group.InitDaySelect();
};

// 根据参数初始化下拉菜单选项    
DateSelector.prototype.InitSelector = function(year, month, day)      
{    
    // 由于外部是可以调用这个方法，因此我们在这里也要将selYear和selMonth的选项清空掉                       
    // 另外因为InitDaySelect方法已经有清空天数下拉菜单，因此这里就不用重复工作了                           
    this.selYear.options.length = 0;      
    this.selMonth.options.length = 0;
	
    // 初始化年              
    this.InitYearSelect();
	this.selYear.selectedIndex = this.MaxYear - year;
	this.preYear = this.selYear.value;

	if(arguments.length == 4)
	{
		// 初始化阴阳历		
		this.InitCalendarSelect();
		//this.selCalendar.selectedIndex = arguments[3];
		this.Calendar = arguments[3];
	}
	
	// 初始化月
    this.InitMonthSelect();
	this.selMonth.selectedIndex = month - 1; 
           

    // 初始化天数                
    this.InitDaySelect();        
    this.selDay.selectedIndex = day - 1;
	
};

function InitHourSelect(selHour,stype)
{    
	// 清空原有的选项 
	selHour.options.length = 0; 
	if(stype==1)   
	{                         
    // 循环添加OPION元素到小时select对象中   
    // 新建一个OPTION对象    
        var op = window.document.createElement("OPTION"); 
        // 设置OPTION对象的值    
        op.value = 0;       
        op.innerHTML = "00:00~00:59 (早子)";  
        selHour.appendChild(op);                  
    for(var i = 1; i <= 23; i=i+2)                 
    {
        // 新建一个OPTION对象    
        var op = window.document.createElement("OPTION");             

        // 设置OPTION对象的值    
        op.value = i;            

        // 设置OPTION对象的内容   
        switch(i)
        {
        	case 1:
        	 op.innerHTML = "01:00~02:59 (丑)";
        	 break;
        	case 3:
        	 op.innerHTML = "03:00~04:59 (寅)";
        	 break;
        	case 5:
        	 op.innerHTML = "05:00~06:59 (卯)";
        	 break;
        	case 7:
        	 op.innerHTML = "07:00~08:59 (辰)";
        	 break;
        	case 9:
        	 op.innerHTML = "09:00~10:59 (巳)";
        	 break;
        	case 11:
        	 op.innerHTML = "11:00~12:59 (午)";
        	 break;
        	case 13:
        	 op.innerHTML = "13:00~14:59 (未)";
        	 break;
        	case 15:
        	 op.innerHTML = "15:00~16:59 (申)";
        	 break;
        	case 17:
        	 op.innerHTML = "17:00~18:59 (酉)";
        	 break;
        	case 19:
        	 op.innerHTML = "19:00~20:59 (戌)";
        	 break;
        	case 21:
        	 op.innerHTML = "21:00~22:59 (亥)";
        	 break;
        	case 23:
        	 op.innerHTML = "23:00~23:59 (晚子)";
        	 break;       	                        
        }  
        // 添加到小时select对象  
        selHour.appendChild(op);  
 
    }
     if(arguments.length == 3){ // 如果传入参数个数为3，最后一个参数是时辰   
       	 if(arguments[2]< 24)
         selHour.selectedIndex = Math.round(arguments[2]/2);    
       }      
   }else
   	{
      // 循环添加OPION元素到小时select对象中
      for(var i = 0; i <= 23; i++)                 
      {
          // 新建一个OPTION对象    
          var op = window.document.createElement("OPTION");             
  
          // 设置OPTION对象的值    
          op.value = i;            
  
          // 设置OPTION对象的内容   
          op.innerHTML = i;      
          // 添加到小时select对象  
          selHour.appendChild(op);     
      }  
      if(arguments.length == 3) {// 如果传入参数个数为3，最后一个参数是时辰  
        if(arguments[2]< 24)
        selHour.selectedIndex = arguments[2];
      }
    }  
}


///////////////////////////////////////////////////
//
// lunarInfo
//
///////////////////////////////////////////////////

// base data about chinese year informace
// 保存公历农历之间的转换信息:以任意一年作为起点，
// 把从这一年起若干年(依需要而定)的农历信息保存起来。 要保存一年的信息，只要两个信息就够了: 1)农历每个月的大小;2)今年是否有闰月，闰几月以及闰月的大小。 用一个整数来保存这些信息就足够了。 具体的方法是:用一位来表示一个月的大小，大月记为1，小月记为0，
// 这样就用掉12位(无闰月)或13位(有闰月)，再用高四位来表示闰月的月份，没有闰月记为0。 ※-----例----: 2000年的信息数据是0xc96，化成二进制就是110010010110B，
// 表示的含义是:1、2、5、8、10、11月大，其余月份小。 2001年的农历信息数据是0x1a95(因为闰月，所以有13位)，
// 具体的就是1、2、4、5、8、10、12月大， 其余月份小(0x1a95=1101010010101B)，
// 4月的后面那一个0表示的是闰4月小，接着的那个1表示5月大。 这样就可以用一个数组来保存这些信息。在这里用数组lunarInfo[]来保存这些信息
var lunarInfo=new Array(
0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,
0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,
0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,
0x14b63);  

//====================================== 返回农历 y年的闰月的天数
function leapDays(y) {
	if(leapMonth(y)) return((lunarInfo[y-1900] & 0x10000)? 30: 29);
	else return(0);
}

//====================================== 返回农历 y年闰哪个月 1-12，没闰返回 0
function leapMonth(y) {
	return(lunarInfo[y-1900] & 0xf);
}

//====================================== 返回农历 y年m月的总天数
function monthDays(y,m) {
	return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
}/*  |xGv00|874a22f9172c69b2d57f2db43342b9bc */