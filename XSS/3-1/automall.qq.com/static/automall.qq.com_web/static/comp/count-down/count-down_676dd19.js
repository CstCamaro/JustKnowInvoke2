define('automall.qq.com_web:static/comp/count-down/count-down.vue', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
  var prefixCls = 'wii-countdown';
  exports["default"] = {
    name: 'wiiCountdown',
    props: {
      time: {
        type: Number,
        required: true
      },
      showIcon: {
        type: Boolean,
        "default": function _default() {
          return false;
        }
      },
      mode: {
        type: String,
        "default": function _default() {
          return 'start';
        }
      },
      ispc: {
        type: Boolean,
        "default": function _default() {
          return false;
        }
      }
    },
    data: function data() {
      return {
        distanceTime: this.time,
        closed: false,
        isMode: this.mode,
        isFinal: false
      };
    },
  
    computed: {
      wrapClasses: function wrapClasses() {
        return ['' + prefixCls, _defineProperty({}, prefixCls + '-with-icon', this.showIcon)];
      },
      iconClasses: function iconClasses() {
        return prefixCls + '-icon';
      },
      "final": function final() {
        var result = this.format(this.distanceTime);
        return result["final"];
      },
      dStr: function dStr() {
        var result = this.format(this.distanceTime);
        return result.d || '00';
      },
      hStr: function hStr() {
        var result = this.format(this.distanceTime);
        return result.h || '00';
      },
      mStr: function mStr() {
        var result = this.format(this.distanceTime);
        return result.m || '00';
      },
      sStr: function sStr() {
        var result = this.format(this.distanceTime);
        return result.s || '00';
      }
    },
    methods: {
      remainingTime: function remainingTime() {
        var _this = this;
  
        clearInterval(this.timer);
        this.timer = setInterval(function () {
          if (_this.distanceTime > 0) {
            _this.distanceTime--;
            console.log('当前时间' + _this.distanceTime);
          } else {
            _this.isFinal = true;
            _this.closed = true;
            clearInterval(_this.timer);
          }
        }, 1000);
      },
      format: function format(remain) {
        var title = '';
        var obj = {};
        if (this.isMode == 'start') {
          title = '开始';
        } else if (this.isMode == 'end') {
          title = '结束';
        }
        if (remain > 0) {
          var d = parseInt(remain / 60 / 60 / 24, 10); //天数
          var h = parseInt(remain / 60 / 60 % 24, 10); //小时数
          var m = parseInt(remain / 60 % 60, 10);
          var s = parseInt(remain % 60, 10);
  
          d = this.twoDigits(d) ? this.twoDigits(d) : '00';
          h = this.twoDigits(h) ? this.twoDigits(h) : '00';
          m = this.twoDigits(m) ? this.twoDigits(m) : '00';
          s = this.twoDigits(s) ? this.twoDigits(s) : '00';
  
          obj = {
            d: d,
            h: h,
            m: m,
            s: s,
            "final": ''
          };
        } else {
          var finalStr = '活动已' + title;
          obj = {
            "final": finalStr
          };
        }
        return obj;
      },
      twoDigits: function twoDigits(num) {
        return ('0' + num).slice(-2);
      }
    },
    mounted: function mounted() {
      this.remainingTime();
    }
  };
  
  var _vueTemplateString = "<transition name=\"fade\" mode=\"out-in\" appear=\"\">\n  <div v-if=\"!closed\" :class=\"wrapClasses\">\n    <span :class=\"iconClasses\" v-if=\"showIcon\">\n      <slot name=\"icon\">  \n      </slot>\n    </span>\n    <span v-if=\"isFinal\">{{final}}</span>\n    <div class=\"time-container\" v-else=\"\"><span>{{dStr}}</span><span class=\"divide\">天</span><span>{{hStr}}</span><span class=\"divide\">:</span><span>{{mStr}}</span><span class=\"divide\">:</span><span>{{sStr}}</span><span class=\"letter\" v-if=\"ispc\">距开始</span></div>\n  </div>\n</transition>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports["default"] && (exports["default"].template = _vueTemplateString);

});
