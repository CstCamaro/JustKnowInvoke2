define('automall.qq.com_h5:static/comp/active-dialog/active-dialog.vue', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _vue = require('automall.qq.com_h5:node_modules/vue/dist/vue');
  
  var _vue2 = _interopRequireDefault(_vue);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  exports["default"] = {
    props: {
      href: {
        type: String
      },
      imgurl: {
        type: String
      }
    },
    data: function data() {
      return {};
    },
  
    computed: {},
    methods: {
      closeTip: function closeTip() {
        this.$emit('close');
      },
      goActive: function goActive() {
  
        if (this.href == '' || this.href == undefined) {
          return false;
        } else {
          window.location.href = this.href;
        }
      }
    }
  };
  
  var _vueTemplateString = "<transition name=\"zoom\" mode=\"out-in\" appear=\"\">\n  <div class=\"active-dialog-container\" @touchmove.prevent=\"\" @scroll.prevent=\"\">\n      <div class=\"active-dialog\">\n        <div class=\"content-container\">\n          <div class=\"active-content-container\">\n            <slot name=\"head\"></slot>\n            <img :src=\"imgurl\" :jurl=\"href\" class=\"active-img\" @click=\"goActive\" bosszone=\"popuph5\">\n            <slot name=\"foot\"></slot>\n          </div>\n          <div class=\"active-close\" @click=\"closeTip\">\n            <img src=\"/static/automall.qq.com_h5/static/comp/active-dialog/img/close_e748bad.svg\" alt=\"\">\n          </div>\n        </div>\n      </div>\n  </div>\n</transition>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports["default"] && (exports["default"].template = _vueTemplateString);

});
