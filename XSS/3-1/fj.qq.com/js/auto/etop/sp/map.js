/*
 ### jQuery Google Maps V3 Plugin v3.01 ###
 * Home: 
 * Code: 
 * Date: 2011-06-01
 * <script type="text/javascript" src="http://maps.google.com/maps/api/js?v=3.1&sensor=false">
 * Dual licensed under the MIT and GPL licenses.
 *   http://www.gnu.org/licenses/gpl.html
 *   http://www.opensource.org/licenses/mit-license.php
 ###
*/
(function ($) {	
	var geocoder = new google.maps.Geocoder(); 
	$.googleMaps = {
		init:function(options){
			var opts = $.extend({}, $.googleMaps.defaults, options);
			return this.each(function() {
						// Create Map
						var center = opts.center,
							centerlatlng = $.googleMaps.getLatlng( opts.center);
						var mapOptions = {
								zoom: opts.zoom,
								center: centerlatlng,
								mapTypeControl: opts.mapTypeControl,
								zoomControl: opts.zoomControl,
								panControl : opts.panControl,
								scaleControl : opts.scaleControl,
								streetViewControl: opts.streetViewControl,
								scrollwheel: opts.scrollwheel,
								mapTypeId: opts.mapType
							};
						var $this = $(this),
							$gmap = new google.maps.Map(this, mapOptions);
							$this.data("$gmap", $gmap);
							$this.data('gmap', {
							   'opts': opts,
							   'gmap': $gmap,
							   'markers': [],
							   'infoWindow': null
							});
						if (opts.markers.length !== 0) {
							// Loop through marker array
							for (var i = 0; i < opts.markers.length; i+= 1) {
								$.googleMaps.addMarker.apply($this,[opts.markers[i]]);
							}
						}
						if(typeof opts.onComplete=='function'){
							opts.onComplete(centerlatlng);
						}
					});
		},
		geocode : function(address,callback){
			var $gmap = $(this).data("$gmap"),
				$data = this.data('gmap');
			geocoder.geocode( { 'address': address}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var location = results[0].geometry.location;
					$gmap.setCenter(location);
					if($data.markers.length>0) $data.markers[0].setPosition(location);
					if(typeof callback=='function'){
						callback(location)
					}
				} else {
					alert("Geocode was not successful for the following reason: " + status);
				}
			});
		},
		addMarker: function (options) {
			var $gmap = $(this).data("$gmap"),
				$data = this.data('gmap');
					
			var position = (options.latlng&&options.latlng!=',')?$.googleMaps.getLatlng(options.latlng):$gmap.getCenter()
			if(options.draggable){$gmap.setCenter(position)}
			
			var markerOptions = $.extend({},{
				position : position,
				draggable:false,
				animation: google.maps.Animation.DROP,
				map:$gmap
				},options);
				
		//var marker = new LabelMarker(markerOptions);
			var marker = new google.maps.Marker (markerOptions)
			$data.markers.push(marker);
			if(typeof options.callback=='function'){
				google.maps.event.addListener(marker, 'dragend', options.callback);
			}
			return marker;
		},
		addLabelMarker:function (options) {
			var $gmap = $(this).data("$gmap");
			var position = (options.latlng&&options.latlng!=',')?$.googleMaps.getLatlng(options.latlng):$gmap.getCenter();
			var markerOptions = $.extend({},{
				position : position,
				draggable:false,
				text:'所在位置',
				map:$gmap
				},options);
				
			var marker = new LabelMarker(markerOptions);
			return marker;
		},
		addLabelMarkers: function(markers){
			for (var i = 0; i < markers.length; i+= 1) {
				$.googleMaps.addLabelMarker.apply(this,[markers[i]]);
			}
		},
		getLatlng : function(s){
			return new google.maps.LatLng(s.split(',')[0], s.split(',')[1])
		},
		getMapCenter : function(){
			var $gmap = $(this).data("$gmap")
			return {lat:$gmap.getCenter().lat(),lng:$gmap.getCenter().lng()};
		},
		defaults: {
		// Default Map Options
			center:					'26.06875393605304,119.3123659650879',
			markers:                [],
			zoom: 					13,
			scroll: 				true,
			mapTypeControl:         true,
			zoomControl:            true,
			panControl :			true,
			streetViewControl:		false,
			scrollwheel : 			true,
			mapType : 				google.maps.MapTypeId.ROADMAP,
			controls: {
				hide: false,
				localSearch: false
			},
			icon: {
				image:               "http://www.google.com/mapfiles/marker.png",
				iconsize:            [20, 34],
				iconanchor:          [9, 34],
				infowindowanchor:    [9, 2],
				shadow:              "http://www.google.com/mapfiles/shadow50.png",
				shadowsize:          [37, 34]
			},
			onComplete:					null
		}
	}

	//创建标识
	function LabelMarker(opts){
	 this.label_ = opts.text;
	 this.latLng_ = opts.position;
	 this.div_ = null;
	 this.map_ = opts.map;
	 this.setMap(opts.map);
	}  
	// 继承自  google.maps.OverlayView
	LabelMarker.prototype = new google.maps.OverlayView();
	
	// 当准备将 悬浮层 添加到地图上时 调用
	LabelMarker.prototype.onAdd = function(){
		var div = this.div_ = document.createElement('div');
		div.className = 'markersilder';
		div.innerHTML='<div class="markercontent">'+this.label_+'</div>';
/*      google.maps.event.addDomListener(div, "click", function(event) {
        google.maps.event.trigger(me, "click");
      });*/

      // Then add the overlay to the DOM
		var panes = this.getPanes();
		panes.overlayLayer.appendChild(div);

	};
		
	// 当第一次在地图上显示时 调用
	LabelMarker.prototype.draw = function(){
		
		var overlayProjection = this.getProjection();
		var latLng = overlayProjection.fromLatLngToDivPixel(this.latLng_);
		// 设置层的大小 和 位置
		var div = this.div_;
		var size = new google.maps.Size(-26, -42); // 修正坐标的值;
		div.style.left = (latLng.x + size.width) + 'px';
		div.style.top = (latLng.y + size.height) + 'px';
	};
	// 当设置 悬浮层的 setMap(null) 会自动调用 
	LabelMarker.prototype.onRemove = function(){
		alert('onRemove');
    if (this.div_) {
      this.div_.parentNode.removeChild(this.div_);
      this.div_ = null;
    }
	};

  USGSOverlay.prototype = new google.maps.OverlayView();
	
  function USGSOverlay(bounds, image, map) {

    // Now initialize all properties.
    this.bounds_ = bounds;
    this.image_ = image;
    this.map_ = map;

    // We define a property to hold the image's div. We'll 
    // actually create this div upon receipt of the onAdd() 
    // method so we'll leave it null for now.
    this.div_ = null;

    // Explicitly call setMap on this overlay
    this.setMap(map);
  }

  USGSOverlay.prototype.onAdd = function() {

    // Note: an overlay's receipt of onAdd() indicates that
    // the map's panes are now available for attaching
    // the overlay to the map via the DOM.

    // Create the DIV and set some basic attributes.
    var div = document.createElement('DIV');
    div.style.borderStyle = "none";
    div.style.borderWidth = "0px";
    div.style.position = "absolute";

    // Create an IMG element and attach it to the DIV.
    var img = document.createElement("img");
    img.src = this.image_;
    img.style.width = "100%";
    img.style.height = "100%";
    div.appendChild(img);

    // Set the overlay's div_ property to this DIV
    this.div_ = div;

    // We add an overlay to a map via one of the map's panes.
    // We'll add this overlay to the overlayImage pane.
    var panes = this.getPanes();
    panes.overlayImage.appendChild(div);
  }

  USGSOverlay.prototype.draw = function() {

    // Size and position the overlay. We use a southwest and northeast
    // position of the overlay to peg it to the correct position and size.
    // We need to retrieve the projection from this overlay to do this.
    var overlayProjection = this.getProjection();

    // Retrieve the southwest and northeast coordinates of this overlay
    // in latlngs and convert them to pixels coordinates.
    // We'll use these coordinates to resize the DIV.
    var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
    var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

    // Resize the image's DIV to fit the indicated dimensions.
    var div = this.div_;
    div.style.left = sw.x + 'px';
    div.style.top = ne.y + 'px';
    div.style.width = (ne.x - sw.x) + 'px';
    div.style.height = (sw.y - ne.y) + 'px';
  }

  USGSOverlay.prototype.onRemove = function() {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  }


	// Main plugin function
	$.fn.googleMaps = function (options) {
			// Method calling logic
			if ($.googleMaps[options]) {
					return $.googleMaps[options].apply(this,Array.prototype.slice.call(arguments,1));
			} else if (typeof options === 'object' || !options) {
					return $.googleMaps.init.apply(this,arguments);
			} else {
					$.error('Method ' +  options + ' does not exist on jQuery.gmap');
			}
	};
})(jQuery);
/*  |xGv00|786b49a39fce01330a66d3717314cf9e */