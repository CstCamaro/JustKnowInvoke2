//<![CDATA[ 
define(function(require, exports, module) {
Comment_Api = {}
document.domain="qq.com";

Comment_Api = {
  create:function(dom_id){
    var iframe = document.createElement('iframe')
    iframe.setAttribute('frameborder','no',0)
    iframe.setAttribute('id','commentIframe')
    iframe.setAttribute('src','http://www.qq.com/coral/coralBeta2/coralMainDom2.0.htm');
    iframe.setAttribute('scrolling','no')
    iframe.setAttribute('width','100%')
    iframe.setAttribute('height','200')
    document.getElementById(dom_id).appendChild(iframe)
    return iframe
  }
}
module.exports = Comment_Api

});
/*  |xGv00|c4ddb6160439db4bc583e91b768563e9 */