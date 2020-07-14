function AlbumM(a){this.next=!0,this.pre=!0,this.close=!0,this.position={x:0,y:0},this.isImageTitle=!1,this.cellWidth=52,this.cellHeight=52,this.cellData=[],this.category=null,this.cells=[],this.select=0,this.onCellClick=null,Util.mix(this,a)}var ap=AlbumM.prototype;ap.getCells=function(){return this.cellData},ap._initCells=function(a){for(var b=0;b<a.length;b++)this.cells.push(new Cell(a[b]))};function Cell(a){this.title=a.title||"",this.imgUrl=a.imgUrl||"",this.className=a.className||""}function AlbumV(a,b){this.padding=[40,0],this.cellPadding=[5,0],this.albumLeft=0,this._minAlbumLeft=0,this._maxAlbumLeft=0,this.box={w:0,h:0},this.model=a,this._init(),this.selectIndex=-1,this.onCellClick=b.onCellClick,this.onCateClick=b.onCateClick}var viewP=AlbumV.prototype,CELLTEMPLATE='<a class="aCell" ids="@I"><img class="aImg" src="@U" style="width:@width;height:@height;"><div class="title">@T</div></a>';viewP._init=function(){var a=this;this.container=Util.createNode("div",{className:"acon",style:"width:100%;overflow:hidden;"}),this.cellOuterContainer=Util.createNode("div",{className:"cellContainer",style:"position:absolute;overflow:hidden;left:"+this.padding[0]+"px"},this.container),this.cellInnerContainer=Util.createNode("div",{style:"position:absolute;top:0;left:0;"},this.cellOuterContainer),$(this.container).click(function(b){var c=b.target;if("aImg"==c.className){var d=c.parentNode,e=parseInt(d.getAttribute("ids"));a.onCellClick&&a.onCellClick(e)}}),this.category=Util.createNode("div",{className:"albumCate"},this.container),$(this.category).click(function(b){var c=b.target;if("albumCateItem"==c.className){var d=c,e=parseInt(d.getAttribute("ids"));a.onCateClick&&a.onCateClick(e)}}),this.pre=Util.createNode("div",{className:"albumPre"},this.container),this.next=Util.createNode("div",{className:"albumNext"},this.container),$(this.pre).bind("mouseover",function(){a.animi(0)}),$(this.pre).bind("mouseout",function(){a.stopAnimi()}),$(this.next).bind("mouseover",function(){a.animi(1)}),$(this.next).bind("mouseout",function(){a.stopAnimi()})},viewP.animi=function(a){var b=this;this.timerId||(this.timerId=setInterval(function(){b.scroll(a?++b.albumLeft:--b.albumLeft)},10))},viewP.stopAnimi=function(){this.timerId&&(clearInterval(this.timerId),this.timerId=null)},viewP.resize=function(a,b){this.cellOuterContainer.style.width=a-2*this.padding[0]+"px",this.cellOuterContainer.style.height=this.model.cellHeight+4+"px",this.box={w:a,h:b}},viewP.setCateData=function(a){if(this.cateData!==a){this.cateData=a;for(var b="",c=0;c<a.length;c++)b+='<div id="cate_'+c+'" ids="'+c+'" class="albumCateItem">'+a[c].name+"</div>";this.category.innerHTML=b,this.selectCateIndex=-1}},viewP.setCellData=function(a){if(this.data!==a){this.data=a;for(var b="",c=0;c<this.data.length;c++)this.data[c].index=c,b+=this._createCell(this.data[c]);this.cellInnerContainer.innerHTML=b,this.cellInnerContainer.style.width=this.data.length*(this.model.cellWidth+2*this.cellPadding[0]+4)+"px",this._maxAlbumLeft=this.data.length*(this.model.cellWidth+2*this.cellPadding[0]+4)}this.selectIndex=-1},viewP.scroll=function(a){return 0>=a?$(this.pre).css("display","none"):$(this.pre).css("display",""),0>a?void(this.albumLeft=0):(a>this._maxAlbumLeft&&(a=this._maxAlbumLeft),$(this.cellOuterContainer).scrollLeft(a),this.albumLeft=a,void(this.box.w+a-2*this.padding[0]>=this._maxAlbumLeft?$(this.next).css("display","none"):$(this.next).css("display","")))},viewP.setAlbumLeft=function(a,b){var c=this.cellInnerContainer.style;if(b)c.webkitTransition="-webkit-transform 1s ease-in-out",c.MozTransition="-moz-transform 1s ease-in-out",c.OTransition="-o-transform 1s ease-in-out",c.transition="transform 1s ease-in-out";else{var c=this.cellInnerContainer.style;c.webkitTransition=c.MozTransition=c.OTransition=c.transition=""}Math.abs(this.albumLeft-a)<1||(this.albumLeft=Math.min(Math.max(a,-(this._maxAlbumLeft-this.box.w+10)),this._minAlbumLeft),c.webkitTransform=c.MozTransform=c.OTransform=c.transform="translate("+this.albumLeft+"px,0) translateZ(0)")},viewP._createCell=function(a){return CELLTEMPLATE.replace("@U",a.imgUrl).replace("@I",a.index).replace("@T",a.title).replace(/@width/g,this.model.cellWidth+"px").replace(/@height/g,this.model.cellHeight+"px")},viewP.addCells=function(a){this.cellInnerContainer.innerHTML=a},viewP.setCellsData=function(a,b){var c=$(this.cellInnerContainer).children(".aCell"),d=$(c[a]).children(".aImg")[0];b.imgUrl&&(d.src=b.imgUrl)},viewP.select=function(a){var b=$(this.cellInnerContainer).children(".aCell"),c=b[a];this.selectIndex!==a&&(c.className+=" select",-1!=this.selectIndex&&(b[this.selectIndex].className=b[this.selectIndex].className.replace(" select","")),this.selectIndex=a)},viewP.selectCate=function(a){var b=$(this.category).children(".albumCateItem"),c=b[a];this.selectCateIndex!==a&&(c.className+=" albumCateItemSelect",-1!=this.selectCateIndex&&void 0!==this.selectCateIndex&&(b[this.selectCateIndex].className=b[this.selectCateIndex].className.replace(" albumCateItemSelect","")),this.selectCateIndex=a)},viewP.scrollTo=function(a){var b=a*(this.model.cellWidth+2*this.padding);this.setAlbumLeft(-b,!0)},viewP.createPreNextControl=function(){},viewP.show=function(a){this.parentCon=a,a.appendChild(this.container)},viewP.hide=function(){this.parentCon&&this.parentCon.removeChild(this.container)};function Album(a){this.model=new AlbumM(a);var b=this;this.view=new AlbumV(this.model,{onCellClick:this.onCellClick,onCateClick:function(a){b.onCateClick(a)}})}var acp=Album.prototype;acp._initListener=function(){},acp.onCellClick=function(a){this.select(a),this.model.onCellClick&&this.model.onCellClick(a)},acp.onCateClick=function(a){this.selectCate(a)},acp.selectCate=function(a){this.view.selectCate(a),this.view.scroll(0),pano&&pano.setPano(this.model.category[a].svid)},acp.show=function(a){var b=Util.box(a),c=this.view;this.view.resize(b.w,b.h),this.model.category?(this.view.setCateData(this.model.category),this.selectCate(0)):this.view.setCellData(this.model.getCells()),this.view.show(a)},acp.hide=function(){this.view.hide()},acp.open=function(){this.view.open()},acp.close=function(){this.view.close()},acp.setPosition=function(a){this.view.setPosition(a),this.model.position=a},acp.select=function(a){this.view.select(a),this.model.select=a};