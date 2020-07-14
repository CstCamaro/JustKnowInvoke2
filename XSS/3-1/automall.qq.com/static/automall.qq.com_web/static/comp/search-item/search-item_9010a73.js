define('automall.qq.com_web:static/comp/search-item/search-item.vue', function(require, exports, module) {

  'use strict';
  
  var _jquery = require('automall.qq.com_web:node_modules/jquery/dist/jquery');
  
  var _jquery2 = _interopRequireDefault(_jquery);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
  // import SortItem from '../sort-item/sort-item.vue';
  module.exports = _defineProperty({
  	props: ['hotBrandList', 'marketPriceList', 'levelList', 'tagList', 'selectedItems'],
  	// components:{SortItem},
  	data: function data() {
  		var keyword = this.selectedItems.keywordOpt.value;
  		var brand_id = this.selectedItems.brandOpt.value;
  		var level = this.selectedItems.levelOpt.value;
  		var market_price = this.selectedItems.priceOpt.value;
  		var tag_id = this.selectedItems.tagOpt.value;
  		var brandAllIsActive = true;
  		var priceAllIsActive = true;
  		var levelAllIsActive = true;
  		var tagAllIsActive = true;
  		var selectedObj = this.selectedItems;
  		var noneSelected;
  		if (keyword == '' && brand_id == '' & level == '' & market_price == '' & tag_id == '') {
  			noneSelected = true;
  		} else {
  			noneSelected = false;
  		}
  		selectedObj['keywordOpt']['text'] = keyword;
  		for (var i = 0; i < this.hotBrandList.length; i++) {
  			if (this.hotBrandList[i].id == brand_id) {
  				brandAllIsActive = false;
  				this.hotBrandList[i]['isCur'] = true;
  				selectedObj['brandOpt']['text'] = this.hotBrandList[i].name;
  			}
  		}
  		for (var i = 0; i < this.marketPriceList.length; i++) {
  			if (this.marketPriceList[i].value == market_price) {
  				priceAllIsActive = false;
  				this.marketPriceList[i]['isCur'] = true;
  				selectedObj['priceOpt']['text'] = this.marketPriceList[i].content;
  			}
  		}
  		for (var i = 0; i < this.levelList.length; i++) {
  			if (this.levelList[i].value == level) {
  				levelAllIsActive = false;
  				this.levelList[i]['isCur'] = true;
  				selectedObj['levelOpt']['text'] = this.levelList[i].content;
  			}
  		}
  		for (var i = 0; i < this.tagList.length; i++) {
  			if (this.tagList[i].id == tag_id) {
  				tagAllIsActive = false;
  				this.tagList[i]['isCur'] = true;
  				selectedObj['tagOpt']['text'] = this.tagList[i].name;
  			}
  		}
  		return {
  			'keywordOpt': {
  				'data': keyword,
  				'allIsActive': false,
  				'cgiKey': 'keyword'
  			},
  			'brandOpt': {
  				'data': this.hotBrandList,
  				'allIsActive': brandAllIsActive,
  				'cgiKey': 'brand_id'
  			},
  			'priceOpt': {
  				'data': this.marketPriceList,
  				'allIsActive': priceAllIsActive,
  				'cgiKey': 'market_price'
  			},
  			'levelOpt': {
  				'data': this.levelList,
  				'allIsActive': levelAllIsActive,
  				'cgiKey': 'level'
  			},
  			'tagOpt': {
  				'data': this.tagList,
  				'allIsActive': tagAllIsActive,
  				'cgiKey': 'tag_id'
  			},
  			'postData': {
  				'keyword': keyword,
  				'brand_id': brand_id,
  				'level': level,
  				'market_price': market_price,
  				'tag_id': tag_id,
  				'order': '',
  				'sort': '',
  				'p': '1',
  				'page_size': '12'
  			},
  			'selectedObj': selectedObj,
  			'noneSelected': noneSelected,
  			'priceMin': '',
  			'priceMax': '',
  			'sortActive': 'weight',
  			'isClickItem': false
  		};
  	},
  	created: function created() {
  		console.log('comp onload');
  	},
  	methods: {
  		// 点击筛选条件
  		clickItem: function clickItem(dataFlag, index, value, text) {
  			var _this = this;
  			var data = this._data;
  			var postData = data.postData;
  			var selectedObj = data.selectedObj;
  			var cgiKey = data[dataFlag]['cgiKey'];
  			var dataObj = data[dataFlag];
  			data['noneSelected'] = false;
  			// 置空关键字
  			postData['keyword'] = '';
  			data['isClickItem'] = true;
  			// 置空面包屑关键字
  			selectedObj['keywordOpt'] = {
  				text: '',
  				value: ''
  			};
  			// 清空page
  			postData['p'] = 1;
  			if (index == -1) {
  				// 点击不限
  				postData[cgiKey] = '';
  				if (dataFlag == 'priceOpt') {
  					this._data.priceMax = '';
  					this._data.priceMin = '';
  				}
  				dataObj['allIsActive'] = true;
  				dataObj['data'].map(function (val, key) {
  					var newArr = dataObj['data'][key];
  					newArr['isCur'] = false;
  					dataObj['data'].splice(key, 1, newArr);
  				});
  			} else {
  				// 点击非不限
  				postData[cgiKey] = value;
  				dataObj['allIsActive'] = false;
  				dataObj['data'].map(function (val, key) {
  					var newArr = dataObj['data'][key];
  					if (key == index) {
  						newArr['isCur'] = true;
  					} else {
  						newArr['isCur'] = false;
  					}
  					dataObj['data'].splice(key, 1, newArr);
  				});
  			}
  			// 面包屑添加已选条件
  			selectedObj[dataFlag] = {
  				text: text,
  				value: value
  			};
  
  			this.$emit('get-search-list', postData);
  		},
  		// 自定义价格区间
  		selePriceDuring: function selePriceDuring() {
  			var priceMax = this.priceMax;
  			var priceMin = this.priceMin;
  			if (priceMin == '' && priceMax == '') {
  				return;
  			}
  			if (priceMin < 0 || priceMin == '') {
  				priceMin = 0;
  			}
  			if (priceMax < 0 || priceMax == '') {
  				priceMax = 10000;
  			}
  			var text = priceMin + '-' + priceMax + '万';
  			var value = priceMin + '-' + priceMax;
  			// 更新面包屑
  			this.noneSelected = false;
  			var oldSelectedObj = this.selectedObj;
  			oldSelectedObj['priceOpt'] = {
  				text: text,
  				value: value
  			};
  			this.selectedObj = Object.assign({}, oldSelectedObj);
  			// 更新筛选项
  			this.priceOpt.allIsActive = false;
  			var dataObj = this.priceOpt;
  			dataObj.data.map(function (val, key) {
  				var newArr = dataObj['data'][key];
  				newArr['isCur'] = false;
  				dataObj['data'].splice(key, 1, newArr);
  			});
  
  			// 更新搜索条件
  			var postData = this.postData;
  			postData['market_price'] = value;
  			this.$emit('get-search-list', postData);
  		},
  		// 删除所选条件
  		delSelected: function delSelected(key, flag) {
  			// flag用来表示是否进行接口请求，默认为true,false表示不进行数据请求
  			var data = this._data;
  			var selectedObj = data.selectedObj;
  			var postData = data.postData;
  			var delData = data[key];
  			selectedObj[key] = null;
  			// 更新面包屑
  			selectedObj = Object.assign({}, selectedObj);
  			// 更新筛选条件
  			delData['allIsActive'] = true;
  			delData = Object.assign({}, delData);
  			if (key !== 'keywordOpt') {
  				delData['data'].map(function (val, key) {
  					var newArr = delData['data'][key];
  					newArr['isCur'] = false;
  					delData['data'].splice(key, 1, newArr);
  				});
  			}
  
  			data.priceMax = '';
  			data.priceMin = '';
  			// 更新筛选结果
  			var cgiKey = delData['cgiKey'];
  			postData[cgiKey] = '';
  			// 更新page
  			postData['p'] = 1;
  			if (typeof flag == 'undefined' || flag) {
  				this.$emit('get-search-list', postData);
  			}
  
  			if (postData.keyword == '' && postData.brand_id == '' & postData.level == '' & postData.market_price == '' & postData.tag_id == '') {
  				this.noneSelected = true;
  			}
  		},
  		// 重置所有条件
  		resetSelected: function resetSelected() {
  			this._data.noneSelected = true;
  			this._data.priceMax = '';
  			this._data.priceMin = '';
  			// 删除关键字
  			this['selectedObj']['keywordOpt']['text'] = '';
  
  			// 删除所选条件
  			this.delSelected('brandOpt', false);
  			this.delSelected('priceOpt', false);
  			this.delSelected('levelOpt', false);
  			this.delSelected('tagOpt', false);
  			this.$emit('get-search-list', { page_size: 12, p: 1 });
  		},
  		// 排序
  		sortResult: function sortResult(type) {
  			this.sortActive = type;
  			var keyword = this.selectedItems.keywordOpt.value;
  			var postData = this._data.postData;
  			if (this.isClickItem) {
  				postData['keyword'] = '';
  			} else {
  				postData['keyword'] = keyword;
  			}
  			postData['order'] = type;
  			postData['p'] = 1;
  			if (type == 'market_price') {
  				postData['sort'] = 'asc';
  			} else if (type == 'create_time') {
  				postData['sort'] = 'desc';
  			}
  			postData = Object.assign({}, postData);
  			this.$emit('get-search-list', postData);
  		},
  		getParams: function getParams(name) {
  			var reg = new RegExp("[^|&\?]?" + name + "=([^(&|#)]*)(&|$)");
  			var r = arguments[1] ? arguments[1].match(reg) : window.location.search.match(reg);
  			if (r != null) return unescape(r[1]);return null;
  		}
  	}
  }, 'created', function created() {
  	var postData = this.postData;
  	this.$emit('get-search-list', postData);
  });
  var _vueTemplateString = "<div class=\"search-item\">\n\t<div class=\"selected-box\">\n\t\t<span class=\"\">搜索结果<em class=\"icon-arrow\"></em></span>\n\t\t<span class=\"selected-items\">\n\t\t\t<span class=\"selected\" v-for=\"(selected,key) in selectedObj\" v-if=\"selected != null &amp;&amp; !!selected.text\">\n\t\t\t\t<span class=\"text\">\n\t\t\t\t\t{{selected.text}}\n\t\t\t\t</span>\n\t\t\t\t<em class=\"search-delete\" @click=\"delSelected(key)\">\n\t\t\t\t</em>\n\t\t\t</span>\n\t\t</span>\n\t\t<a href=\"javascript:void(0);\" class=\"reset\" @click=\"resetSelected\" v-if=\"!noneSelected\">重置条件</a>\n\t\t<span class=\"reset\" v-else=\"\">全部结果</span>\n\t</div>\n\t<div class=\"search-box\">\n\t\t<ul>\n\t\t\t<li v-if=\"brandOpt.data.length>0\" class=\"clearfix\">\n\t\t\t\t<span class=\"label\">品牌</span>\n\t\t\t\t<div class=\"item-box\">\n\t\t\t\t\t<a href=\"javascript:void(0);\" class=\"item all\" :class=\"{on:brandOpt.allIsActive}\" @click=\"clickItem('brandOpt','-1','')\">不限</a>\n\t\t\t\t\t<a bosszone=\"brand\" :brand=\"brand.id\" href=\"javascript:void(0);\" class=\"item\" :class=\"{on:brand.isCur}\" v-for=\"(brand,index) in brandOpt.data\" @click=\"clickItem('brandOpt',index,brand.id,brand.name)\">{{brand.name}}</a>\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t\t<li v-if=\"priceOpt.data.length>0\" class=\"clearfix\">\n\t\t\t\t<span class=\"label\">价格</span>\n\t\t\t\t<div class=\"item-box\">\n\t\t\t\t\t<a href=\"javascript:void(0);\" class=\"item all\" :class=\"{on:priceOpt.allIsActive}\" @click=\"clickItem('priceOpt','-1','')\">不限</a>\n\t\t\t\t\t<a bosszone=\"price\" :price=\"index+1\" href=\"javascript:void(0);\" class=\"item\" :class=\"{on:price.isCur}\" v-for=\"(price,index) in priceOpt.data\" @click=\"clickItem('priceOpt',index,price.value,price.content)\">{{price.content}}</a>\n\t\t\t\t\t<span class=\"price-duiring\">\n\t\t\t\t\t\t<input class=\"input\" type=\"number\" v-model=\"priceMin\"><span class=\"text\">-</span><input class=\"input\" type=\"number\" v-model=\"priceMax\"><span class=\"text\">万</span>\n\t\t\t\t\t\t<a href=\"javascript:void(0);\" class=\"do-search\" @click=\"selePriceDuring\">筛选</a>\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t\t<li v-if=\"levelOpt.data.length>0\" class=\"clearfix\">\n\t\t\t\t<span class=\"label\">级别</span>\n\t\t\t\t<div class=\"item-box\">\n\t\t\t\t\t<a href=\"javascript:void(0);\" class=\"item all\" :class=\"{on:levelOpt.allIsActive}\" @click=\"clickItem('levelOpt','-1','')\">不限</a>\n\t\t\t\t\t<a bosszone=\"level\" :level=\"index+1\" href=\"javascript:void(0);\" class=\"item\" :class=\"{on:level.isCur}\" v-for=\"(level,index) in levelOpt.data\" @click=\"clickItem('levelOpt',index,level.value,level.content)\">{{level.content}}</a>\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t\t<li v-if=\"tagOpt.data.length>0\" class=\"clearfix\">\n\t\t\t\t<span class=\"label\">标签</span>\n\t\t\t\t<div class=\"item-box\">\n\t\t\t\t\t<a href=\"javascript:void(0);\" class=\"item all\" :class=\"{on:tagOpt.allIsActive}\" @click=\"clickItem('tagOpt','-1','')\">不限</a>\n\t\t\t\t\t<a href=\"javascript:void(0);\" class=\"item\" :class=\"{on:tag.isCur}\" v-for=\"(tag,index) in tagOpt.data\" @click=\"clickItem('tagOpt',index,tag.id,tag.name)\">{{tag.name}}</a>\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n\t<div class=\"sort-types clearfix\">\n\t\t<div class=\"sort\" :class=\"sortActive=='weight'?'on':''\" @click=\"sortResult('weight')\">默认排序</div>\n\t\t<div class=\"sort\" :class=\"sortActive=='market_price'?'on':''\" @click=\"sortResult('market_price')\">价格<em class=\"icon-search-up\"></em></div>\n\t\t<div class=\"sort\" :class=\"sortActive=='create_time'?'on':''\" @click=\"sortResult('create_time')\">上架时间<em class=\"icon-search-up\"></em></div>\n\t</div>\n\t<!-- <sort-item :post-data=\"postData\"></sort-item> -->\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports["default"] && (exports["default"].template = _vueTemplateString);

});
