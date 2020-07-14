function Changeimg() {

this.create = function(elementId,imgListId,temp) {
	this.id = document.getElementById(elementId);
	this.list = document.getElementById(imgListId);
	var divA = "divA"+temp;
	var divT ="divT"+temp;
	var divImg = "divImg"+temp;
	var imgUrl = "imgUrl"+temp;

	if(!this.id || !this.list) return false;
	this.span = this.list.getElementsByTagName('span');
    this.p = this.list.getElementsByTagName('p');
	this.length = this.span.length;
	this.$href = /href=(\"|\')[^\'\"\s]*/;
    this.$src = /src=(\"|\')[^\'\"\>\s]*/;
	this.data = {href:[],src:[],text:[]};
	this.numA = '';
    for(var i=0; i<this.length; i++) {
        var temphref = this.span[i].innerHTML.match(this.$href);
	    var tempsrc = this.span[i].innerHTML.match(this.$src);
		var temp_i = i + 1;
        this.data.href[i] = temphref[0].substr(6,temphref[0].length-6).replace(/&amp;/gi, '&').replace(/&gt;/gi, '>');
	    this.data.src[i] = tempsrc[0].substr(5,tempsrc[0].length-5);
		this.data.text[i] = (this.p.length == 0)?'':this.p[i].innerHTML;
        this.numA += '<a href="#" class="styleA" onclick="Imgs.change_img('+ i +'); return false;" onfocus="if(this.blur)this.blur()">'+ temp_i +'</a>';
    }
    this.tempA = '<div id="'+divA+'" class="divA">'+ this.numA + '</div>';
	this.tempT = '<div class="divT"><p id="'+divT+'"></p></div>';
	this.tempD = '<div class="divBox sta_img"><a id="'+imgUrl+'" href="" target="_blank"><img id="'+divImg+'" class="divImg" src="'+this.data.src[0]+'"/></a></div>';
    this.id.innerHTML = this.tempD + this.tempA + this.tempT;
	this.aList = document.getElementById(divA).getElementsByTagName('a');
    this.tText = document.getElementById(divT);
    this.Href = document.getElementById(imgUrl);
    this.Src = document.getElementById(divImg);
	if(this.length > 1){
		this.play();
	}else{
		this.Href.setAttribute('href',this.data.href[0]);
		this.Src.setAttribute('src',this.data.src[0]);
		this.Src.setAttribute('alt',this.data.text[0]);
		this.tText.innerHTML = '<a href="'+ this.data.href[0] +'" target="_blank">' + this.data.text[0] + '</a>';	
	}
}

this.flag = 0;
this.play = function() {

	this.Href.setAttribute('href',this.data.href[this.flag]);
	this.tText.innerHTML = '<a href="'+ this.data.href[this.flag] +'" target="_blank">' + this.data.text[this.flag] + '</a>';

	if(navigator.appName.indexOf("Explorer") != -1) {
		this.Src.filters[0].Apply();
		this.Src.filters[0].Transition=23;
	    this.Src.filters[0].Play();
	}

	this.Src.setAttribute('src',this.data.src[this.flag]);
	this.Src.setAttribute('alt',this.data.text[this.flag]);

	for(var i=0; i<this.length; i++){this.aList[i].className = 'styleA';}
	this.aList[this.flag].className = 'styleB';
	this.flag += 1;
	if(this.flag >= this.length) {this.flag = 0}
	this.timer = setTimeout('Imgs.play()',5000);

}

this.change_img = function(i) {
	clearInterval(this.timer);
	this.flag = i;
    this.play();
}

} //end
var Imgs = new Changeimg();/*  |xGv00|0a00d799eca405043883a80ed3a81ab8 */