define('automall.qq.com_h5:static/comp/footer-tab/footer-tab.vue', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
  	value: true
  });
  
  var _vue = require('automall.qq.com_h5:node_modules/vue/dist/vue');
  
  var _vue2 = _interopRequireDefault(_vue);
  
  var _jquery = require('automall.qq.com_h5:node_modules/jquery/dist/jquery');
  
  var _jquery2 = _interopRequireDefault(_jquery);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  exports["default"] = {
  	props: ['homeUrl', 'searchUrl', 'ucUrl', 'active'],
  	data: function data() {
  		console.log(this.active + 'a');
  		return {
  			// activeClass:this.active
  			activeClass: this.active
  		};
  	},
  
  	methods: {
  		clickTab: function clickTab(type) {
  			console.log('click');
  			// if(!!type){
  			// 	this._data.activeClass = type;
  			// }
  		}
  	},
  	created: function created() {
  		console.log('footer-tab');
  	}
  };
  
  var _vueTemplateString = "<div class=\"automall-footer-tab\">\n\t<div class=\"flex\">\n\t\t<div class=\"tab home\" :class=\"activeClass == 'home'?'on':''\" @click=\"clickTab('home')\">\n\t\t\t<a :href=\"homeUrl\" bosszone=\"tabh5\">\n\t\t\t\t<em class=\"icon\"></em>\n\t\t\t\t<span class=\"text\">首页</span>\n\t\t\t</a>\n\t\t</div>\n\t\t<div class=\"tab search\" :class=\"activeClass == 'search'?'on':''\" @click=\"clickTab('search')\">\n\t\t\t<a :href=\"searchUrl\" bosszone=\"tabh5\">\n\t\t\t\t<em class=\"icon\"></em>\n\t\t\t\t<span class=\"text\">选车</span>\n\t\t\t</a>\n\t\t</div>\n\t\t<div class=\"tab uc\" :class=\"activeClass == 'uc'?'on':''\" @click=\"clickTab('uc')\">\n\t\t\t<a :href=\"ucUrl\" bosszone=\"tabh5\">\n\t\t\t\t<em class=\"icon\"></em>\n\t\t\t\t<span class=\"text\">我的</span>\n\t\t\t</a>\n\t\t</div>\n\t</div>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports["default"] && (exports["default"].template = _vueTemplateString);

});
