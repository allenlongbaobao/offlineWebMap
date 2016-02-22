	window.onload = init();

	var map; //complex object of type OpenLayers.Map
	//Initialise the 'map' object
	function init() {
		//地图服务器的地址 
		var city_tiles_url = "http://localhost/city_tiles/";
		var geo_tiles_url = "http://localhost/geo_tiles/";
		var layer_city, layer_geo;

		map = new OpenLayers.Map("map", {
			maxExtent : new OpenLayers.Bounds(-20037508.3427892,
					-20037508.3427892, 20037508.3427892, 20037508.3427892),
			numZoomLevels : 18,
			maxResolution : 156543.0339,
			units : 'm',
			projection : "EPSG:900913",
			zoom: 0,
			displayProjection : new OpenLayers.Projection("EPSG:4326")
		});

		layer_city = new OpenLayers.Layer.TMS("城市地图",
				city_tiles_url, {
					'type' : 'png',
					'getURL' : get_my_url
				});
		layer_geo = new OpenLayers.Layer.TMS("地理信息图",
				geo_tiles_url, {
					'type' : 'jpg',
					'getURL' : get_my_url
				});
		map.addLayer(layer_city);
		map.addLayer(layer_geo);

		map.addControl(new OpenLayers.Control.KeyboardDefaults());
		map.addControl(new OpenLayers.Control.Permalink());
		map.addControl(new OpenLayers.Control.Scale());
		map.addControl(new OpenLayers.Control.MousePosition());
		map.addControl(new OpenLayers.Control.LayerSwitcher());
		/* 
			鹰眼功能有 bug
		*/
		//map.addControl(new OpenLayers.Control.OverviewMap());

		var lonLat = new OpenLayers.LonLat(105.62519, 34.52329);
		lonLat.transform(map.displayProjection, map.getProjectionObject());
		map.setCenter(lonLat, 5);
	}

	function get_my_url(bounds) {
		var res = this.map.getResolution();
		var x = Math.round((bounds.left - this.maxExtent.left)/ (res * this.tileSize.w));
		var y = Math.round((this.maxExtent.top - bounds.top)/ (res * this.tileSize.h));
		var z = this.map.getZoom();

		var path = "" + z + "/" + x + "/" + y +  "." + this.type;
		var url = this.url;
		if (url instanceof Array) {
			url = this.selectUrl(path, url);
		}
		return url + path;
	}