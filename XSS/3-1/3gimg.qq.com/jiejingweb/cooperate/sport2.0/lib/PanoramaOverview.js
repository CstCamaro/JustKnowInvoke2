(function() {
/**
 * Created by qiangliu on 2014/9/28.
 */
     function mix(dest, src) {
        for (var k in src) {
            if (src.hasOwnProperty(k)) {
                dest[k] = src[k];
            }
        }
        return dest;
    }
/**
 * 小人（相机）实例
 * @param model 对应的PanoramaOverview实例
 * @constructor
 */
    var keyAttr = [ 'map', 'pov', 'position'];

    function Scout(model) {
        this.maskMarker = new qq.maps.Marker({
            icon: this.getMaskIcon(),
            clickable: false,
            draggable: true
        });

        this.marker = new qq.maps.Marker({
            icon: this.getMaskIcon(),
            clickable: false,
            draggable: false
        });
        this.model = model;
        this.bindsTo(keyAttr, model);
        this.initMarkListener();
    }

    Scout.prototype = new qq.maps.MVCObject();
    var sp = Scout.prototype;

    sp.initMarkListener = function () {
        var event = qq.maps.event;
        var t = this;
        event.addListener(this.maskMarker, 'dragging', function (evt) {
            t.marker.setPosition(evt.latLng);
        });
        event.addListener(this.maskMarker, 'dragend', function (evt) {
            t.model.goTo(evt.latLng);
        });
    }
    /**
     * pov 改变的时候设置小人（相机）的方向
     */
    sp.pov_changed = function () {
        var pov = this.get('pov') || {};
        if (this.get('pov')) {
            var heading = pov.heading;
            var icon = this.getScoutIconByHeading(heading);
            if (icon !== this.get('icon')) {
                this.set('icon', icon);
            }
        }
    };
    /**
     *  图标改变重新渲染marker
     */
    sp.icon_changed = function () {
        var icon = this.get('icon');
        if (icon && this.marker) {
            this.marker.setIcon(icon);
            if (icon.shape) {
                this.marker.setShape(icon.shape);
            }
        }
    };
    /**
     * 位置改变的时候设置marker的位置
     */
    sp.position_changed = function () {
        var position = this.get('position') || null;
        var map = this.get('map');
        if (map && map.__convertor) {  //如果此时地图类型是平面图，需要地图的__convertor类转一下坐标
            position = map.__convertor.to(position, 0);
        }
        this.marker.setPosition(position);
        this.maskMarker.setPosition(position);
    }

    sp.map_changed = function () {
        var map = this.get('map') || null;
        this.marker.setMap(map);
        this.maskMarker.setMap(map);
    }
    /**
     * 绑定marker上的一些信息
     * @param model
     */
    sp.setModel = function (model) {
        this.unbindAll(keyAttr);
        if (model) {
            this.bindsTo(keyAttr, model);
        } else {
            this.marker.setMap(null);
            this.maskMarker.setMap(null);
        }
    }
    /**
     * 根据heading设置marker的图标
     */
    sp.getScoutIconByHeading = (function () {
        var url_ = 'http://s.map.soso.com/themes/default/img/street/3D_People.png?v=v3.3.916';
        var size_ = new qq.maps.Size(138, 138 - 42);
        var point_ = new qq.maps.Point(69, 69 - 42);
        var icons = null;
        return function (heading) {
            if (icons == null) {
                icons = [];
                for (var i = 0; i < 12; i++) {
                    var shape = new qq.maps.MarkerShape([58, 0, 80, 36], "rect");
                    var icon = new qq.maps.MarkerImage(url_, size_,
                        new qq.maps.Point(0, i * 138 + 42),
                        point_
                    );
                    icon.shape = shape;
                    icons.push(icon);
                }
            }
            if (!heading) {
                heading = 0;
            }
            var map = this.get('map');
            if (map && map.__convertor) {
                heading = map.__convertor.headingTo(heading);
            }
            var idx = Math.round(heading / 30) % 12;
            return icons[idx];
        };
    })();

    /**
     * 生成遮罩层marker
     * @returns {qq.maps.MarkerImage}
     */
    sp.getMaskIcon = function () {
        var url_ = 'http://s.map.soso.com/themes/blank.gif?v=v3.3.916';
        var shape = new qq.maps.MarkerShape([0, 0, 22, 36], "rect");
        var size_ = new qq.maps.Size(22, 36);
        var anchor = new qq.maps.Point(11, 27);
        var icon = new qq.maps.MarkerImage(url_, size_,
            new qq.maps.Point(0, 0),
            anchor
        );
        icon.shape = shape;
        return icon;
    };
/**
 * Created by qiangliu on 2014/10/10.
 */


    var stat = {
        fromProduct: document.location.href,
        fromChannel: '',
        appId: 'PanoramaOverview',
        os: ''
    };
    /**
     * 设置cookie
     * @param name
     * @param value
     */
    stat.setCookie = function (name, value) {
        var expire = 1800,
            exp = new Date();
        exp.setTime(exp.getTime() + expire * 24 * 60 * 60 * 1000);
        var arrStr = [name + "=" + escape(value)];
        document.cookie = arrStr.join(';');
    };
    /**
     * 获取cookie
     * @param name
     * @returns {*}
     */
    stat.getCookie = function (name) {
        if (!document.cookie) {
            return null;
        }
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            return unescape(arr[2]);
        } else {
            return null;
        }
    };

    function createSuid () {
        var o = new Date().getUTCMilliseconds();
        var suid = (Math.round(Math.random() * 2147483647) * o) % 10000000000;
        stat.setCookie('suid', suid);
        return suid;
    }

    function encodeUrlParams (obj) {
        var urlEncoded = [];
        for(var k in obj) {
            urlEncoded.push(k + '=' + encodeURIComponent(obj[k]));
        }
        return urlEncoded.join('&');
    }

    stat.report = function(logid, extraParam) {
        var suid = this.getCookie('suid') || createSuid();
        var img = new Image(1, 1);
        var urlParams = {
            appid: this.appId,
            suid: suid,
            logid: logid,
            rand: Math.random(),
            from: this.fromProduct,
            ch: this.fromChannel
            //os: this.os // use useragent
        };
        if (extraParam) {
            for(var k in extraParam) {
                urlParams[k] = extraParam[k];
            }
        }
        img.src = "http://pr.map.qq.com/pingd?" + encodeUrlParams(urlParams);
    }

    stat.report('PanoramaOverview2.0')

/**
 * Created by qiangliu on 2014/9/28.
 */

    var XF_RADIUS = [200, 200, 200, 200, 300, 400, 500, 600, 1000, 3000, 6000, 12000, 25000, 50000, 100000]; //点击地图时候的吸附半径
    /**
     * 小地图主类
     * @param container
     * @param opts
     * @constructor
     */
    function PanoOverview(opts) {
        opts = opts || {};
        var Options = {
            panorama: null,
            map: null,
            visible: true
        };
        opts = mix(Options, opts);
        this.setValues(opts);
    }

    PanoOverview.prototype = new qq.maps.MVCObject();

    PanoOverview.prototype.notifyResize = function () {
        qq.maps.event.trigger(this, 'resize');
    }
    /**
     * 获得街景小地图中的地图对象
     * @returns {*}
     */
    PanoOverview.prototype.getMap = function () {
        return this.get('map');
    }
    /**
     * 设置小地图的容器
     * @param con  容器节点
     */
    PanoOverview.prototype.setContainer = function (con) {
        this.set('container', con);
        this.draw();

    };
    /**
     * 设置小地图要关联的街景实例对象
     * @param panorama   街景实例对象
     */
    PanoOverview.prototype.setPanorama = function (panorama) {
        this.set('panorama', panorama);
        this.draw();
    }

    PanoOverview.prototype.setMap = function (map) {
        this.set('map', map);
        this.draw();
    }
    /**
     * 小地图渲染接口
     */
    PanoOverview.prototype.draw = function () {
        var map = this.get('map');
        var panorama = this.get('panorama');
        if (map && panorama) {
            this._createScout();         //创建小人
            this._bindsToPanorama();     //绑定街景
        } else {
            this.destroy();
        }
    }
    /**
     * 创建小人实例
     * @private
     */
    PanoOverview.prototype._createScout = function () {
        if (!this.scout) {
            this.scout = new Scout(this);
        }
    };
    /**
     * 销毁小地图
     */
    PanoOverview.prototype.destroy = function () {
        var keys = ['pov', 'position'];
        this.unbindAll(keys);
        if (this.scout) {
            this.scout.setModel(null);
            delete this.scout;
        }
        var mapCon = this.get('mapCon');
        this.set('mapCon', null);
        this.set('map', null);
    }
    //绑定到街景对象
    PanoOverview.prototype._bindsToPanorama = function () {
        var panorama = this.get('panorama');
        var keys = ['pov', 'position', 'planeInfo'];
        this.unbindAll(keys);
        if (panorama) {
            this.bindsTo(keys, panorama)
        }
    };

    PanoOverview.prototype.position_changed = function () {
        var position = this.get('position');
        var map = this.get('map');
        if (position && position.lat && position.lng && map) {
            if (map && map.__convertor) {  //如果此时地图类型是平面图，需要地图的__convertor类转一下坐标
                position = map.__convertor.to(position, 0);
            }
            map.setCenter(position);
        }
    }

  qq.maps.PanoOverview = PanoOverview;

   var map =  new qq.maps.Map(document.getElementById('innerCon'), {
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        zoom: 15,
        zoomControlOptions: {
            position: qq.maps.ControlPosition.RIGHT_TOP,
            style: qq.maps.ZoomControlStyle.SMALL
        }
    });

   this.panoOverview = new qq.maps.PanoOverview({
       panorama: pano,
       map: map
   });

   function showMap() {
       $('#mapCon').css('display', 'block');
   }

   function hideMap() {
       $('#mapCon').css('display', 'none');
   }

   $('#mapIcon').bind('click', function () {
        if ($('#mapIcon').hasClass('mapIconSelect')) {
            $('#mapIcon').removeClass('mapIconSelect');
            hideMap();
        } else {
            $('#mapIcon').addClass('mapIconSelect')
            showMap();
        }
   });
})();