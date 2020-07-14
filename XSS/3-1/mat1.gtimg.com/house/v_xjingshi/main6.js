// 新房&资讯搜索tab切换
$('.newHouse_tab').on('click', function () {
  $('.newHouse_tab').addClass('tab_check');
  $('.info_tab').removeClass('tab_check');
  $('.newHouse_wrap').show();
  $('.info_wrap').hide();
});
$('.info_tab').on('click', function () {
  $('.info_tab').addClass('tab_check');
  $('.newHouse_tab').removeClass('tab_check');
  $('.info_wrap').show();
  $('.newHouse_wrap').hide();
});

// tab滑入事件
$('.promotion_tab li').on('mouseover', function () {
  var ind = $(this).data(ind).ind;
  $(this).addClass('moveIn').siblings().removeClass('moveIn');
  $('.promotion_content ul').eq(ind).show().siblings().hide();
});

// 新房文字逻辑
$('.new_house_list dl').map(function (ind, val) {
  var txt = $(val).find('.price_txt').data('text');
  var txtArr = txt.split(',');
  var htmlStr = '<span><i>' + txtArr[0] + '</i></span><span>' + txtArr[1] + '</span>';
  $(val).find('.price_txt').html(htmlStr);
})

// 热门楼盘文字逻辑
$('.hot_l li').map(function (ind, val) {
  var txt = $(val).data('span');
  var txtArr = txt.split(',');
  var htmlStr = '<span>' + txtArr[0] + '</span><span>' + txtArr[1] + '</span>';
  $(val).append(htmlStr);
})
$('.hot_r li').map(function (ind, val) {
  var txt = $(val).data('span');
  var txtArr = txt.split(',');
  var htmlStr = '<span>' + txtArr[0] + '</span><span>' + txtArr[1] + '</span>';
  $(val).append(htmlStr);
})

var newPriceDl = document.getElementById("newPriceDl");
var dt = newPriceDl.getElementsByTagName("dt");
var dd = newPriceDl.getElementsByTagName("dd");
for (var i = 0; i < dt.length; i++) {
  dt[i].index = i;
  dt[i].onmouseover = function () {
    for (var i = 0; i < dd.length; i++) {
      dd[i].style.display = "none"
    }
    dd[this.index].style.display = "block"
  }
}

//开盘日历js开始
if (typeof (HTMLElement) != "undefined") //给firefox定义contains()方法，ie下不起作用
{
  HTMLElement.prototype.contains = function (obj) {
    while (obj != null && typeof (obj.tagName) != "undefind") { //通过循环对比来判断是不是obj的父元素
      if (obj == this) return true;
      obj = obj.parentNode;
    }
    return false;
  };
}
var ua = navigator.userAgent;
Test = {
  version: (ua.match(/.+(?:rv|it|ra|ie|me)[\/: ]([\d.]+)/i) || [])[1],
  ie: /msie/i.test(ua) && !/opera/i.test(ua),
  op: /opera/i.test(ua),
  sa: /version.*safari/i.test(ua),
  ch: /chrome/.test(ua),
  ff: /gecko/i.test(ua) && !/webkit/i.test(ua),
  wk: /webkit/i.test(ua),
  mz: /mozilla/i.test(ua) && !/(compatible|webkit)/i.test(ua)
}

function addEvent(el, type, fn) {
  (el.attachEvent) ? (el.attachEvent("on" + type, fn)) : (el.addEventListener(type, fn, false));
};

function fixMouseWheel(elem, fn, self) {
  var mousewheel = Test.ff ? "DOMMouseScroll" : "mousewheel";
  (elem == null || elem == window) && (elem = document);
  return {
    type: mousewheel,
    elem: elem,
    fn: function (e) {
      var delta = 0;
      e = e || window.event;
      if (e.wheelDelta) {
        delta = event.wheelDelta / 120;
        if (Test.op && Test.version < 10) delta = -delta;
      } else if (e.detail) {
        delta = -e.detail / 3;
      }
      e.delta = Math.round(delta);
      fn.call(elem, e, self);
    }
  }
}

//模拟滚动条  
function scroll(id) {
  var self = this;
  self.id = id;
  self.obj = document.getElementById(id);
  self.content = self.obj.getElementsByTagName('div')[0];
  self.barBgColor = document.createElement('div');
  self.barBgColor.className = "scrollBarBg";
  self.bar = document.createElement('div');
  self.bar.className = 'scrollBar';
  self.barBg = document.createElement('p');
  self.barBg.className = 'barBg';
  self.topBg = document.createElement('p');
  self.topBg.className = 'topBg';
  self.bar.style.marginTop = 0;
  self.bar.style.height = parseInt((self.content.scrollHeight <= self.obj.offsetHeight ? 1 : self.obj
    .offsetHeight / self.content.scrollHeight) * self.obj.offsetHeight) + 'px';
  self.obj.appendChild(self.barBgColor);
  self.barBgColor.appendChild(self.bar);
  self.bar.appendChild(self.barBg);
  self.barBg.appendChild(self.topBg);
  self.bar.y;
  self.srcElement;
  self.marginTop = 0;
  self.bar.onmousedown = function (e) {
    self.mousedown(e);
  }
  self.mosueScroll = fixMouseWheel(self.obj, self.onmousewheel, self);
  addEvent(self.mosueScroll.elem, self.mosueScroll.type, self.mosueScroll.fn);
}
scroll.prototype = {
  mousedown: function (e) {
    var self = this;
    var e = e || window.event;
    self.bar.y = e.clientY;
    self.bar.t = parseInt(self.bar.style.marginTop);
    document.onmousemove = function (e) {
      self.mousemove(e);
    }
    stopDefault(e);
  },
  mousemove: function (e) {
    if (this.content.scrollHeight <= this.obj.offsetHeight) {
      return false;
    }
    var e = e || window.event;

    var m, eObj = e.srcElement ? e.srcElement : e.target;
    if (!this.obj.contains(eObj)) {
      return;
    }
    this.marginTop = this.bar.t + (e.clientY - this.bar.y);
    if (this.marginTop < 0) {
      this.marginTop = 0;
    }
    if (this.marginTop > this.obj.offsetHeight - parseInt(this.bar.style.height)) {
      this.marginTop = this.obj.offsetHeight - parseInt(this.bar.style.height);
    }
    //document.getElementById("output").innerHTML = self.obj.offsetHeight - self.bar.offsetHeight;
    this.bar.style.marginTop = this.marginTop + 'px';
    m = this.marginTop / this.obj.offsetHeight * this.content.scrollHeight;
    this.content.style.top = -m + 'px';
    this.content.style.height = "auto";
    setCurrTag(this.id, parseInt(m));
    this.content.scrollTop = (this.content.scrollHeight - this.obj.offsetHeight) * parseInt(this
      .marginTop) / (this.obj.clientHeight - this.bar.clientHeight);
    document.onmouseup = function (e) {
      document.onmousemove = null;
    }
    stopDefault(e);

  },
  onmousewheel: function (e, self) {
    if (self.content.scrollHeight <= self.obj.offsetHeight) {

      return false;
    }
    var e = e || window.event;
    var m, n, eObj = e.srcElement ? e.srcElement : e.target;

    if (e.delta > 0) {
      self.marginTop = parseInt(self.bar.style.marginTop) - 10;
    } else if (e.delta < 0) {
      self.marginTop = parseInt(self.bar.style.marginTop) + 10;
    }

    if (self.marginTop < 0) {
      self.marginTop = 0;
    }
    if (self.marginTop > self.obj.offsetHeight - parseInt(self.bar.style.height)) {
      self.marginTop = self.obj.offsetHeight - parseInt(self.bar.style.height);
    }
    self.bar.style.marginTop = self.marginTop + 'px';
    m = self.marginTop / self.obj.offsetHeight * self.content.scrollHeight;
    self.content.style.top = -m + 'px';
    self.content.style.height = "auto";
    setCurrTag(self.id, parseInt(m));
    self.content.scrollTop = (self.content.scrollHeight - self.obj.offsetHeight) * parseInt(self
      .marginTop) / (self.obj.clientHeight - self.bar.clientHeight);
    //document.onmouseup = function(e){ document.onmousemove = null; }  
    stopDefault(e);

  }
}



function stopDefault(e) {
  if (e && e.preventDefault)
    e.preventDefault();
  else
    window.event.returnValue = false;
  return false;
}

var p = new scroll('scrollBox1');
var p = new scroll('scrollBoxC2');
var p = new scroll('scrollBox3');

//选择id
var calendarTab = document.getElementById("calendarTab");
var calendarUl = calendarTab.getElementsByTagName("ul"),
  calendarUlLi = calendarTab.getElementsByTagName("li"),
  num = 1,
  prev = document.getElementById('leftBtn'),
  next = document.getElementById('rightBtn'),
  tab = document.getElementById('calendarTab'),
  list = tab.getElementsByTagName('ul'),
  wid = Number(tab.style.width.replace('px', '')),
  calendarCon = document.getElementById('calendarCon'),
  inner = document.getElementById('inner'),
  innerTitleLi = inner.getElementsByTagName("li"),
  innerCon = document.getElementById('innerCon');
var innerConUl = innerCon.getElementsByTagName('ul'),
  content2Ul = document.getElementById("content2").getElementsByTagName("ul"),
  calendarMonth = document.getElementById("calendarMonth"),
  cid = Number(calendarCon.style.width.replace('px', '')),

  scrollBoxC2 = document.getElementById("scrollBoxC2");
var scrollBoxUl2 = scrollBoxC2.getElementsByTagName("ul"),
  scrollBoxLi2 = scrollBoxC2.getElementsByTagName("li"),

  currentUl_two = document.getElementById('currentUl_two');
var currentUl_two_Li = currentUl_two.getElementsByTagName("li"),


  scrollBox1 = document.getElementById("scrollBox1");
var scrollBoxUl1 = scrollBox1.getElementsByTagName("ul"),
  scrollBoxLi1 = scrollBox1.getElementsByTagName("li"),

  currentUl_one = document.getElementById('currentUl_one');
var currentUl_one_Li = currentUl_one.getElementsByTagName("li"),


  scrollBox3 = document.getElementById("scrollBox3");
var scrollBoxUl3 = scrollBox3.getElementsByTagName("ul"),
  scrollBoxLi3 = scrollBox3.getElementsByTagName("li"),

  currentUl_three = document.getElementById('currentUl_three');
var currentUl_three_Li = currentUl_three.getElementsByTagName("li");


//获取scrollTop函数
function getHeight1(len) {
  if (len == 5 && scrollBoxUl1[5].offsetHeight <= scrollBox1.offsetHeight) {
    if (scrollBoxUl1[4].offsetHeight + scrollBoxUl1[5].offsetHeight <= scrollBox1.offsetHeight) {
      return scrollBoxUl1[4].offsetTop;
    }
    return scrollBoxUl1[5].offsetTop - (sscrollBoxUl1[4].offsetHeight - scrollBox1.offsetHeight);
  }
  return scrollBoxUl1[len].offsetTop;
}

function getHeight2(len) {

  //if (len == 5 && scrollBoxUl2[5].offsetHeight<=scrollBoxC2.offsetHeight) {
  //if (scrollBoxUl2[4].offsetHeight+scrollBoxUl2[5].offsetHeight<=scrollBoxC2.offsetHeight)
  //{
  //return scrollBoxUl2[4].offsetTop;
  //}
  //return scrollBoxUl2[5].offsetTop-(scrollBoxUl2[4].offsetHeight-scrollBoxC2.offsetHeight);
  //}
  return scrollBoxUl2[len].offsetTop;
}

function getHeight3(len) {
  if (len == 5 && scrollBoxUl3[5].offsetHeight <= scrollBox3.offsetHeight) {
    if (scrollBoxUl3[4].offsetHeight + scrollBoxUl3[5].offsetHeight <= scrollBox3.offsetHeight) {
      return scrollBoxUl3[4].offsetTop;
    }
    return scrollBoxUl3[5].offsetTop - (scrollBoxUl3[4].offsetHeight - scrollBox3.offsetHeight);
  }
  return scrollBoxUl3[len].offsetTop;
}

function setCurrTag(tagIndex, m) {
  var n, j;
  switch (tagIndex) {
    case "scrollBox1":
      n = 1;
      break;
    case "scrollBoxC2":
      n = 2;
      break;
    case "scrollBox3":
      n = 3;
      break;
  }
  switch (n) {
    case 1:
      if (m >= 0 && m < scrollBoxUl1[1].offsetTop) {
        j = 0;
      } else if (m >= scrollBoxUl1[1].offsetTop && m < scrollBoxUl1[2].offsetTop) {
        j = 1;
      } else if (m >= scrollBoxUl1[2].offsetTop && m < scrollBoxUl1[3].offsetTop) {
        j = 2;
      } else if (m >= scrollBoxUl1[3].offsetTop && m < scrollBoxUl1[4].offsetTop) {
        j = 3;
      } else if (m >= scrollBoxUl1[4].offsetTop && m < (scrollBoxUl1[5].offsetHeight <= scrollBox1
          .offsetHeight ? scrollBoxUl1[5].offsetTop - (scrollBoxUl1[4].offsetHeight - scrollBoxUl1[5]
            .offsetHeight) : scrollBoxUl1[5].offsetTop)) {
        j = 4;
      } else {
        j = 5;
      }

      for (var i = currentUl_one_Li.length; i--;) {
        if (i == j) {
          currentUl_one_Li[i].className = "calendarOn";
        } else {
          currentUl_one_Li[i].className = "";
        }

      }
      break;
    case 2:
      if (m >= 0 && m < scrollBoxUl2[1].offsetTop) {
        j = 0;
      } else if (m >= scrollBoxUl2[1].offsetTop && m < scrollBoxUl2[2].offsetTop) {
        j = 1;
      } else if (m >= scrollBoxUl2[2].offsetTop && m < scrollBoxUl2[3].offsetTop) {
        j = 2;
      } else if (m >= scrollBoxUl2[3].offsetTop && m < scrollBoxUl2[4].offsetTop) {
        j = 3;
      } else if (m >= scrollBoxUl2[4].offsetTop && m < (scrollBoxUl2[5].offsetHeight <= scrollBox1
          .offsetHeight ? scrollBoxUl2[5].offsetTop - (scrollBoxUl2[4].offsetHeight - scrollBoxUl2[5]
            .offsetHeight) : scrollBoxUl2[5].offsetTop)) {
        j = 4;
      } else {
        j = 5;
      }
      for (var i = currentUl_two_Li.length; i--;) {
        if (i == j) {
          currentUl_two_Li[i].className = "calendarOn";
        } else {
          currentUl_two_Li[i].className = "";
        }

      }
      break;
    case 3:
      if (m >= 0 && m < scrollBoxUl3[1].offsetTop) {
        j = 0;
      } else if (m >= scrollBoxUl3[1].offsetTop && m < scrollBoxUl3[2].offsetTop) {
        j = 1;
      } else if (m >= scrollBoxUl3[2].offsetTop && m < scrollBoxUl3[3].offsetTop) {
        j = 2;
      } else if (m >= scrollBoxUl3[3].offsetTop && m < scrollBoxUl3[4].offsetTop) {
        j = 3;
      } else if (m >= scrollBoxUl3[4].offsetTop && m < (scrollBoxUl3[5].offsetHeight <= scrollBox1
          .offsetHeight ? scrollBoxUl3[5].offsetTop - (scrollBoxUl3[4].offsetHeight - scrollBoxUl3[5]
            .offsetHeight) : scrollBoxUl3[5].offsetTop)) {
        j = 4;
      } else {
        j = 5;
      }
      for (var i = currentUl_three_Li.length; i--;) {
        if (i == j) {
          currentUl_three_Li[i].className = "calendarOn";
        } else {
          currentUl_three_Li[i].className = "";
        }

      }
      break;
  }

}


//判断当前月
for (var r = 0; r < calendarUl[1].getElementsByTagName("li").length; r++) {
  if (parseInt($("#calendarMonth").html()) == parseInt(calendarUl[1].getElementsByTagName("li")[r]
      .innerHTML)) {
    for (var a = 0; a < calendarUlLi.length; a++) {
      calendarUlLi[a].className = "";
    }
    calendarUl[1].getElementsByTagName("li")[r].className = "calendarOn";

    $("#scrollBoxC2 .scrollContent").css("top", -getHeight2(r) + "px").css("height", 180 + getHeight2(r) +
      "px");
	if(scrollBoxC2 == undefined || scrollBoxLi2[0] == undefined){
		
	}else{
		$("#scrollBoxC2 .scrollBar").css("margin-top", parseInt((getHeight2(r) / (scrollBoxLi2.length *
      scrollBoxLi2[0].offsetHeight)) * scrollBoxC2.offsetHeight) + "px");
	}
    
  }

}
//center
for (var i = 0; i < currentUl_two_Li.length; i++) {
  //设置索引值
  currentUl_two_Li[i].index = i;

  currentUl_two_Li[i].onmouseover = function () {
    if (scrollBoxUl2[this.index].innerHTML == "") {
      return false;
    }
    for (var a = 0; a < currentUl_two_Li.length; a++) {
      currentUl_two_Li[a].className = "";
    }
    this.className = "calendarOn";
    $("#scrollBoxC2 .scrollContent").css("top", -getHeight2(this.index) + "px").css("height", 180 +
      getHeight2(this.index) + "px");
    $("#scrollBoxC2 .scrollBar").css("margin-top", parseInt((getHeight2(this.index) / (scrollBoxLi2
      .length * scrollBoxLi2[0].offsetHeight)) * scrollBoxC2.offsetHeight) + "px");
  }

}
//pre
for (var x = 0; x < currentUl_one_Li.length; x++) {
  //设置索引值
  currentUl_one_Li[x].index = x;
  currentUl_one_Li[x].onmouseover = function () {

    if (scrollBoxUl1[this.index].innerHTML == "") {
      return false;
    }
    for (var a = 0; a < currentUl_one_Li.length; a++) {
      currentUl_one_Li[a].className = "";
    }
    this.className = "calendarOn";

    $("#scrollBox1 .scrollContent").css("top", -getHeight1(this.index) + "px").css("height", 180 +
      getHeight1(this.index) + "px");
    $("#scrollBox1 .scrollBar").css("margin-top", parseInt((getHeight1(this.index) / (scrollBoxLi1
      .length * scrollBoxLi1[0].offsetHeight)) * scrollBox1.offsetHeight) + "px");
  }

}
//next
for (var d = 0; d < currentUl_three_Li.length; d++) {
  //设置索引值
  currentUl_three_Li[d].index = d;
  currentUl_three_Li[d].onmouseover = function () {
    if (scrollBoxUl3[this.index].innerHTML == "") {
      return false;
    }
    for (var a = 0; a < currentUl_three_Li.length; a++) {
      currentUl_three_Li[a].className = "";
    }
    this.className = "calendarOn";
    $("#scrollBox3 .scrollContent").css("top", -getHeight3(this.index) + "px").css("height", 180 +
      getHeight3(this.index) + "px");
    $("#scrollBox3 .scrollBar").css("margin-top", parseInt((getHeight3(this.index) / (scrollBoxLi3
      .length * scrollBoxLi3[0].offsetHeight)) * scrollBox3.offsetHeight) + "px");
  }

}

//点击向左箭头
prev.onclick = function () {
  if (num > 0) {
    inner.style.marginLeft = Number(inner.style.marginLeft.replace('px', '')) + wid + 'px';
    innerCon.style.marginLeft = Number(innerCon.style.marginLeft.replace('px', '')) + cid + 'px';
    num--;
    for (var a = 0; a < calendarUlLi.length; a++) {
      calendarUlLi[a].className = "";
    }
    list[num].getElementsByTagName('li')[0].className = "calendarOn";
    if (inner.style.marginLeft === "0px") {
      $("yearTitle").html($("currentUl_one").attr("year"));
      prev.style.display = "none";
      next.style.display = "block";
    }
    if (inner.style.marginLeft === "-216px") {
      $("yearTitle").html($("currentUl_two").attr("year"));
      prev.style.display = "block";
      next.style.display = "block";
    }
  }
  $("#scrollBox1 .scrollContent").css("top", -getHeight1(0) + "px").css("height", 180 + getHeight1(0) +
    "px");
  $("#scrollBox1 .scrollBar").css("margin-top", parseInt((getHeight1(0) / (scrollBoxLi2.length *
    scrollBoxLi2[0].offsetHeight)) * scrollBoxC2.offsetHeight) + "px");
};
//点击向右箭头
next.onclick = function () {
  if (num < list.length - 1) {
    inner.style.marginLeft = Number(inner.style.marginLeft.replace('px', '')) - wid + 'px';
    innerCon.style.marginLeft = Number(innerCon.style.marginLeft.replace('px', '')) - cid + 'px';
    num++;
    for (var a = 0; a < calendarUlLi.length; a++) {
      calendarUlLi[a].className = "";
    }
    list[num].getElementsByTagName('li')[0].className = "calendarOn";
    if (inner.style.marginLeft === "-216px") {
      $("yearTitle").html($("currentUl_two").attr("year"));
      next.style.display = "block";
      prev.style.display = "block";
    }
    if (inner.style.marginLeft === "-432px") {
      $("yearTitle").html($("currentUl_three").attr("year"));
      next.style.display = "none";
      prev.style.display = "block";
    }
  }
  $("#scrollBoxC2 .scrollContent").css("top", -getHeight2(0) + "px").css("height", 180 + getHeight2(0) +
    "px");
  $("#scrollBoxC2 .scrollBar").css("margin-top", parseInt((getHeight2(0) / (scrollBoxLi2.length *
    scrollBoxLi2[0].offsetHeight)) * scrollBoxC2.offsetHeight) + "px");
};
$(".calendarBox").each(function () {
  $("#calendarCon").hover(function () {
    $(this).find(".scrollBarBg").show();
  }, function () {
    $(this).find(".scrollBarBg").hide();
  })
});

for (var w = 0; w < innerConUl.length; w++) {
  if (innerConUl[w].innerHTML == "") {
    innerTitleLi[w].style.color = "#cfd7e7";

  }
}
//开盘日历js结束

// 二手房
// 内容渲染
$.ajax({
  url: '//openapi.house.qq.com/index.php?mod=beike&act=houseFilter&callback=jsonp1576659820867&quantity=6&city=bj&_=',
  method: 'GET',
  dataType: 'jsonp',
  jsonpCallback: 'jsonp1576659820867',
  success: function (res) {
    var houseData = [];
    for (var i = 0; i < res.data.length; i += 6) {
      houseData.push(res.data.slice(i, i + 6))
    }
    houseData.map(function (val, ind) {
      if (ind === 0 || ind === 2 || ind === 4) {
        var htmlStr = '<div class="house_page page_inner">';
      } else {
        var htmlStr = '<div class="house_page">';
      }
      val.map(function (item, key) {
        htmlStr += '<a target="_blank" href="' + item.url.pc_url + '"><dl><dt><img src="' + item.head_image.pc_url.replace('https:', '') + '" alt="' + item.resblock_name + '"><p>' + item.resblock_name + '</p></dt><dd><p>' + item.price_unit_avg + item.price_unit_avg_unit + '</p><p>' + item.room_num + ' ' + item.house_area + item.house_area_unit + '</p></dd></dl></a>';
      })
      htmlStr += '</div>';
      $('.house_tab').eq(ind).parents('.house_item').append(htmlStr);
    })
  }
})

// tab切换
$('.house_tab').on('mouseover', function () {
  $(this).addClass('tab_inner').siblings().removeClass('tab_inner');
  var page = $(this).data('page') - 1;
  $('.house_page').eq(page).addClass('page_inner').siblings().removeClass('page_inner');
});

// 租房
function renderHtml(item) {
  var str = '<a target="_blank" href="' + item.detail_url + '"><dl><dt><img src="' + item.picture.replace('https:', '') + '" alt="' + item.resblock_name + '"><p>' + item.resblock_name + '</p></dt><dd><p>' + item.price_desc + '</p><p>' + item.circle_name + ' ' + item.house_room_type + '</p></dd></dl></a>';
  return str;
}

// 内容渲染
$.ajax({
  url: '//openapi.house.qq.com/index.php?mod=beike&act=rentHouseList&callback=jsonp1576659820866&city=bj&_=',
  method: 'GET',
  dataType: 'jsonp',
  jsonpCallback: 'jsonp1576659820866',
  success: function (res) {
    console.log(res);
    var data = res.data;
    var low_price = '<div class="rent_page rentpage_inner">';
    data.low_price.list.map(function (val, ind) {
      low_price += renderHtml(val);
    })
    low_price += '</div>';
    $('.rent_item').eq(0).append(low_price);

    var mouth_rent = '<div class="rent_page">';
    data.mouth_rent.list.map(function (val, ind) {
      mouth_rent += renderHtml(val);

    })
    mouth_rent += '</div>';
    $('.rent_item').eq(0).append(mouth_rent);

    var one_bedroom = '<div class="rent_page rentpage_inner">';
    data.one_bedroom.list.map(function (val, ind) {
      one_bedroom += renderHtml(val);

    })
    one_bedroom += '</div>';
    $('.rent_item').eq(1).append(one_bedroom);

    var two_bedroom = '<div class="rent_page">';
    data.two_bedroom.list.map(function (val, ind) {
      two_bedroom += renderHtml(val);

    })
    two_bedroom += '</div>';
    $('.rent_item').eq(1).append(two_bedroom);

    var three_bedroom = '<div class="rent_page rentpage_inner">';
    data.three_bedroom.list.map(function (val, ind) {
      three_bedroom += renderHtml(val);

    })
    three_bedroom += '</div>';
    $('.rent_item').eq(2).append(three_bedroom);

    var available_time = '<div class="rent_page">';
    data.available_time.list.map(function (val, ind) {
      available_time += renderHtml(val);

    })
    available_time += '</div>';
    $('.rent_item').eq(2).append(available_time);
  }
})

// tab切换
$('.rent_tab').on('mouseover', function () {
  $(this).addClass('rent_inner').siblings().removeClass('rent_inner');
  var page = $(this).data('page') - 1;
  $('.rent_page').eq(page).addClass('rentpage_inner').siblings().removeClass('rentpage_inner');
})

// 加载更多
function addMore(x) {
  var areaItem = $(".list_content").eq(x);
  var lilen = areaItem.find("li").length;
  var numb = 5;
  var scrhei = 1100;
  if (lilen > numb) {
    areaItem.find('.load_state').show();
  } else {
    areaItem.find('.load_state').text('没有更多了...');
  }

  var load = function (num) {
    for (var i = 0; i < num; i++) {
      // 显示
      areaItem.find('li').eq(i).addClass('hover');
    }
    if (num >= lilen) {
      areaItem.find('.load_state').text('没有更多了...');
    }
  }
  load(numb);

  areaItem.find('.load_state').on("click", function () {
    numb += 5;
    if (numb < lilen) {
      load(numb);
      return;
    }
    load(lilen);
  });

  $(window).scroll(function () {
    //加载更多
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

    if (scrollTop > 2300) {
      $('.goTop').show();
    } else {
      $('.goTop').hide();
    }

    if (scrollTop + windowHeight == scrollHeight) {
      //加载数据
      areaItem.find('.load_state').trigger("click");

    } else {
      return;
    }
  });
}

// 信息流
var $tab = $(".houseinfo_tab");
var $tab_li = $tab.find('li');
var $tab_num = $tab_li.length;
var $Item = $(".list_content");
var _index;
var $li_item;
var arr_name = []; //存放接口名称
var promiseArray = [];
var scrollHeight = 1400;
var initNum = 10;
var count = 1; //点击次数
var API = '//pacaio.match.qq.com/irs/rcd?';

// 获取各类频道名称
for (var i = 1; i < $tab_li.length; i++) {
  arr_name.push({
    name: $tab_li.eq(i).attr('data_name'),
    num: $tab_li.eq(i).attr('data_num')
  });
}

// 解决IE8不支持forEach
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function forEach(callback, thisArg) {
    var T, k;
    if (this == null) {
      throw new TypeError("this is null or not defined");
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    if (arguments.length > 1) {
      T = thisArg;
    }
    k = 0;
    while (k < len) {
      var kValue;
      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
      k++;
    }
  };
}

// 创建Promise
var createPromise = function (url) {
  var p = new Promise(function (resolve, reject) {
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'jsonp',
      success: function (data) {
        resolve(data);
      },
      error: function () {
        resolve();
      }
    });
  });
  return p;
}

// 拼接接口地址
arr_name.forEach(function (key) {
  var searchAPI = API + 'cid=52&token=8f6b50e1667f130c10f981309e1d8200&ext=' + encodeURIComponent(key.name) + '&num=' + key.num;
  promiseArray.push(createPromise(searchAPI));
});

// 请求数据并处理，数据中不包含第一个tab，头条

  Promise.all(promiseArray).then(function (res) {
    // 去掉不符合条件的数据
    // for (var i = 0; i < res.length; i++) {
    //     var list = [];
    //     for (var j = 0; j < res[i].data.length; j++) {
    //         if (res[i].data[j].category == "house" || res[i].data[j].category_chn == "房产") {
    //             list.push(res[i].data[j]);
    //         }
    //     }
    //     res[i].data = list;
    // }
    // 渲染页面
    
    for (var i = 0; i < res.length; i++) {
      var _htm = '';
      for (j = 0; j < res[i].data.length; j++) {        
        _htm += '<li><a target="_blank" class="picture" href="'+ res[i].data[j].vurl +'"><img src="'+ res[i].data[j].img +'" alt="'+ res[i].data[j].title +'"></a><div class="detail"><h3><a target="_blank" href="'+ res[i].data[j].vurl +'">'+ res[i].data[j].title +'</a></h3><div class="binfo cf"><div class="fl"><span class="time">'+ res[i].data[j].publish_time +'</span></div><div class="fr"><div class="i-share" data-url="'+ res[i].data[j].vurl +'" data-img="'+ res[i].data[j].img +'" data-tit="'+ res[i].data[j].title +'"><span class="t">分享</span><div class="panel"><a class="share_item qzone">QQ空间</a><a class="share_item qq">QQ好友</a><a class="share_item sina">新浪微博</a></div></div><a class="cmt" href="//coral.qq.com/'+ res[i].data[j].comment_id +'" target="_blank">'+ res[i].data[j].comment_num +'</a></div></div></div></li>';
      }

      // 渲染页面
      $(".arealist").eq(i + 1).append(_htm);
      $(".arealist").eq(i + 1).find('.i-share .t').html("分享")
      if ($(".arealist").eq(i + 1).find('.i-share .t').html() == "undefined") {
        $(".arealist").eq(i + 1).find('.i-share .t').hide();
      }
      if ($(".arealist").eq(i + 1).find(".time").html() == "undefined") {
        $(".arealist").eq(i + 1).find(".time").hide();
      }
    }
  
  });



// 初始化 - 默认显示第一个tab信息
var dataInit = function () {
  $.ajax({
    url: '//i.match.qq.com/tubdhotinterface?site=aiotwf&type=img&app=aio&child=news_news_house',
    type: 'get',
    dataType: 'jsonp',
  }).done(function (res) {
    var data = res.data.hot_data;
    data.splice(0, 13); //截取后10条
    var str = "";
    for (var i = 0; i < data.length; i++) {
      str += '<li><a target="_blank" class="picture" href="'+ data[i].vurl +'"><img src="'+ data[i].img +'" alt="'+ data[i].title +'"></a><div class="detail"><h3><a target="_blank" href="'+ data[i].vurl +'">'+ data[i].title +'</a></h3><div class="binfo cf"><div class="fl"><span class="time">'+ data[i].publish_time +'</span></div><div class="fr"><div class="i-share" data-url="'+ data[i].vurl +'" data-img="'+ data[i].img +'" data-tit="'+ data[i].title +'"><span class="t">分享</span><div class="panel"><a class="share_item qzone">QQ空间</a><a class="share_item qq">QQ好友</a><a class="share_item sina">新浪微博</a></div></div><a class="cmt" href="//coral.qq.com/'+ data[i].comment_id +'" target="_blank">'+ data[i].comment_num +'</a></div></div></div></li>';
    }

    // 渲染页面
    $(".arealist").eq(0).append(str);
    $(".arealist").eq(0).find('.i-share .t').html("分享")
    if ($(".arealist").eq(0).find('.cmt').html() == "undefined") {
      $(".arealist").eq(0).find('.cmt').hide();
    }
    if ($(".arealist").eq(0).find(".time").html() == "undefined") {
      $(".arealist").eq(0).find(".time").hide();
    }
    addMore(0);
  });
}

// 鼠标移入时，显示数据
$tab_li.on('mouseenter', function (event) {
  scrollHeight = 1400;
  _index = $(this).index();
  $(this).addClass('info_inner').siblings().removeClass('info_inner');
  $Item.removeClass('list_inner');
  $Item.eq(_index).addClass('list_inner');
  addMore(_index);
});

dataInit();

// 分享
$('.list_content').on('mouseover', '.i-share', function () {
  $(this).children('.panel').show()
})
$('.list_content').on('mouseout', '.i-share', function () {
  $(this).children('.panel').hide()
})

$('.list_content').on('click', '.qzone', function () {
  var serviceUrl = '//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey';
  var f_tag = $(this).parents('.i-share');
  var title = encodeURIComponent(f_tag.data('tit'));
  var summary = encodeURIComponent('推荐: ' + f_tag.data('tit'));
  var curUrl = encodeURIComponent(f_tag.data('url'));
  var pic = encodeURIComponent(f_tag.data('img'));
  var url = serviceUrl + '?to=qzone&url=' + curUrl + '&title=' + title + '&summary=' + summary + '&pics=' + pic
  window.open(
    url,
    'shareQzone',
    'height=540,width=580,top=' + (window.screen.height - 540) / 2 + ',left=' + (window.screen.width - 580) / 2 + ',toolbar=no,menubar=no,resizable=yes,location=yes,status=no'
  )
})

$('.list_content').on('click', '.qq', function () {
  var serviceUrl = '//connect.qq.com/widget/shareqq/index.html';
  var f_tag = $(this).parents('.i-share');
  var title = encodeURIComponent(f_tag.data('tit'));
  var summary = encodeURIComponent('给你推荐个：' + f_tag.data('tit'));
  var curUrl = encodeURIComponent(f_tag.data('url'));
  var pic = encodeURIComponent(f_tag.data('img'));
  var url = serviceUrl + '?url=' + curUrl + '&showcount=0&title=' + title + '&desc=&summary=' + summary + '&pics=' + pic + '&style=203&width=19&height=22'
  window.open(
    url,
    'shareQzone',
    'height=600,width=780,top=' + (window.screen.height - 600) / 2 + ',left=' + (window.screen.width - 780) / 2 + ',toolbar=no,menubar=no,resizable=yes,location=yes,status=no'
  )
})

$('.list_content').on('click', '.sina', function () {
  var serviceUrl = '//service.weibo.com/share/share.php';
  var f_tag = $(this).parents('.i-share');
  var title = encodeURIComponent(f_tag.data('tit'));
  var curUrl = encodeURIComponent(f_tag.data('url'));
  var pic = encodeURIComponent(f_tag.data('img'));
  var url = serviceUrl + '?url=' + curUrl + '&title=' + title + '&pic=' + pic + '&appkey=&ralateUid=&language=&searchPic=' + !1
  // 若微博无配图窗口高度450， 有配图高度为700
  window.open(
    url,
    'shareSinawb',
    'height=700,width=650,top=' + (window.screen.height - 700) / 2 + ',left=' + (window.screen.width - 650) / 2 + ',toolbar=no,menubar=no,resizable=yes,location=yes,status=no'
  )
})

// 切换城市
$('.pull_down').on('click', function () {
  $('.cityBox').show()
})

$('.city_tab').on('mouseover', function () {
  $(this).addClass('over').siblings().removeClass('over');
  var tab = $(this).data('tab');
  $('.scrollContent').eq(tab).addClass('over_in').siblings().removeClass('over_in');
})

$('.close').on('click', function () {
  $('.cityBox').hide()
})

// 热门专题查看更多
var step_num = 2;
$('.topic_more').on('click', function () {
  step_num += 2;
  var li_num = $('#topic_ul li').length;
  if (step_num <= li_num) {
    for (var i = 0; i < step_num; i++) {
      $('#topic_ul li').eq(i).show();
    }
  } else {
    $(this).text('没有更多了')
  }
});