/**
 * author: jianminlu#tencent.com
 * update: 2013-04-27 15:37
 */
/**
 * builPage JS静态模拟翻页
 * @param   {String}    容器ID
 * @param   {Number}    当前显示第几页
 * @param   {Number}    每页显示几行数据
 * -------------------------------------
 * version      1.2
 * description  ① 添加 hash 地址定位页面 
                ② 修改每行可以显示多项内容
                ③ hash 可以配置为第4个参数
 * -------------------------------------
 */
function G(s){if(typeof s=="string"){return document.getElementById(s)}else{if(typeof s=="object"){return s}}return null}function getByClass(oParent,sClass){var aTmp=[],aEle=oParent.getElementsByTagName('*');for(var i=0,l=aEle.length;i<l;i++){if(aEle[i].className.indexOf(sClass)!=-1){aTmp.push(aEle[i])}}return aTmp}function addEvent(node,type,listener){if(node.addEventListener){node.addEventListener(type,listener,false);return true}else if(node.attachEvent){node['e'+type+listener]=listener;node[type+listener]=function(){node['e'+type+listener](window.event)};node.attachEvent('on'+type,node[type+listener]);return true}return false}function getStyle(obj,attr){if(obj.currentStyle){return obj.currentStyle[attr]}else{return getComputedStyle(obj,false)[attr]}}
function builPage(id, current, count, urlNum){
    this.id = id;
    this.current = current;
    this.count = count;
    this.urlNum = urlNum;
    this.page = G(id);
    this.split = getByClass(this.page, "split");
    this.pageList = getByClass(this.page,"pageList")[0];
    this.pageCon = getByClass(this.page, "pageCon")[0];
    this.pageBtn = getByClass(this.page, "pageBtn")[0];
    this.num = Math.ceil(this.split.length);
    //this.len = Math.ceil(this.split.length / Math.floor(this.pageList.offsetWidth / (this.split[0].offsetWidth + parseInt(getStyle(this.split[0], "marginLeft")) + parseInt(getStyle(this.split[0], "marginRight")))));
    this.len = this.num*2/7;
    this.total = Math.ceil(this.num / (this.count));
}
builPage.prototype = {
    getHeight: function(sNum, eNum){
        var i, h = 0;
        eNum = eNum > this.len ? this.len : eNum;
        for(i = sNum; i < eNum; i ++){
            h +=  parseInt(this.split[i].offsetHeight) + parseInt(getStyle(this.split[i], "marginTop")) + parseInt(getStyle(this.split[i], "marginBottom"));
        }
        return h;
    },
    setConHeight: function(current, count){
        var h1 = this.getHeight((current - 1) * count, current * count);
        this.pageCon.style.height = h1 + "px";
    },
    change: function(current){
        if(window.location.hash && arguments[1]){
            var hash = parseInt(window.location.hash.substring(3));
            current = hash > this.total ? this.total : hash;
            window.location.replace(window.location.href);
        }
        this.setConHeight(current, (this.count+1)/4);
        this.pageList.style.top = - this.getHeight(0, (current - 1) * (this.count+1)/4 ) + "px"
        this.pageNum(current);
        if(this.urlNum){
            window.location.hash = "p=" + current;
            window.scrollTo(0,0);
        }
    },
    pageNum: function(current){
        var html = [],
            endPage = this.total - 2 > current ? current + 2 : this.total, 
            prevPage = current - 1, 
            nextPage = current + 1;
        if(current != 1){
            html.push("<a href='javascript:void(0);' class='prev' onclick='" + this.id + ".change(" + prevPage + ");'>上一页</a>");
        }else{
            html.push("<span class='prev'>上一页</span>");
        }
        if(current > 3){
            html.push("<a href='javascript:void(0);' onclick='" + this.id + ".change(1);'>1</a>");
            if(current > 4){
                html.push("<span>...</span>");
            }
        }
        for(var i = current - 2; i <= endPage; i++){
            if(i > 0){
                if(current != i){
                    html.push("<a href='javascript:void(0);' onclick='" + this.id + ".change(" + i + ");'>" + i + "</a>");
                }else{
                    html.push("<span class='current'>" + current + "</span>");
                }
            }
        }
        if(current < this.total - 2){
            if(current < this.total - 3){
                html.push("<span>...</span>");
            }
            html.push("<a href='javascript:void(0);' onclick='" + this.id + ".change(" + this.total + ");'>" + this.total + "</a>");
        }
        if(current != this.total){
            html.push("<a href='javascript:void(0);' class='next' onclick='" + this.id + ".change(" + nextPage + ");'>下一页</a>");
        }else{
            html.push("<span class='prev'>下一页</span>");
        }
        this.pageBtn.innerHTML = html.join("");
    },
    init: function(){
        this.change(this.current, this.urlNum);
    }
}/*  |xGv00|a7ef66a2d7ed9272fe59ec56f27a327d */