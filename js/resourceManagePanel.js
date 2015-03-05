/**
 * ArcGis地图
 */
/**
 * 全局变量
 */
// 地图对象
var map;

//图钉函数触发的标记
var globalTuDingDingWeiFlag = false;

globalTuDingDingWeiFlag = location.search.substring(1);

// 大图层数组
var layerArray = new Array();
require(["esri/map", "esri/dijit/HomeButton", "esri/dijit/BasemapToggle",
				"esri/layers/FeatureLayer", "esri/dijit/Legend",
				"dojo/_base/array", "esri/dijit/LocateButton",
				"esri/dijit/OverviewMap", "esri/dijit/Scalebar",

				"dojo/dom-construct", "esri/Color", "esri/dijit/Geocoder",
				"esri/dijit/Popup", "esri/InfoTemplate",
				"esri/layers/ArcGISDynamicMapServiceLayer",

				"esri/symbols/SimpleFillSymbol",
				"esri/symbols/SimpleLineSymbol",

				"esri/SpatialReference", "esri/geometry/Point",
				"dojo/_base/array", "dojo/promise/all", "esri/geometry/Extent",
				"esri/tasks/query", "esri/tasks/QueryTask",

				"esri/layers/FeatureLayer", "esri/tasks/query",
				"esri/geometry/Circle", "esri/graphic", "esri/InfoTemplate",
				"esri/symbols/SimpleMarkerSymbol",
				"esri/symbols/SimpleLineSymbol",
				"esri/symbols/SimpleFillSymbol",
				"esri/renderers/SimpleRenderer", "esri/config", "esri/Color",
				"dojo/dom", "esri/symbols/PictureMarkerSymbol",

				"esri/toolbars/draw", "dojo/parser", "dijit/registry",
				"dijit/layout/BorderContainer", "dijit/layout/ContentPane",
				"dijit/WidgetSet",

				"dojo/domReady!"], function(Map, HomeButton, BasemapToggle,
				FeatureLayer, Legend, arrayUtils, LocateButton, OverviewMap,
				Scalebar,

				domConstruct, Color, Geocoder, Popup, InfoTemplate,
				ArcGISDynamicMapServiceLayer, SimpleFillSymbol,
				SimpleLineSymbol,

				SpatialReference, Point, arrayUtils, all, Extent, Query,
				QueryTask,

				FeatureLayer, Query, Circle, Graphic, InfoTemplate,
				SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
				SimpleRenderer, esriConfig, Color, dom, PictureMarkerSymbol,

				Draw, parser, registry

		) {
			// 全局变量
			var xmax;
			var xmin;
			var ymax;
			var ymin;
			/** *****************************************主页按钮类***************************************************** */
			function MyHomeButton(domName, map, homeButton) {
				this.domName = domName;
				this.map = map;
				this.homeButton = homeButton;
			}
			/**
			 * 指定该主页按钮所要注入的html的dom节点。必要！
			 */
			MyHomeButton.prototype.setDomName = function(domName) {
				this.domName = domName;
			}
			MyHomeButton.prototype.getDomName = function() {
				return this.domName;
			}
			/**
			 * 指定该按钮附属的map对象。必要！
			 */
			MyHomeButton.prototype.setMap = function(map) {
				this.map = map;
			}
			/**
			 * 获得该按钮附属的map对象
			 */
			MyHomeButton.prototype.getMap = function() {
				return this.map;
			}
			MyHomeButton.prototype.setHomeButton = function(homeButton) {
				this.homeButton = homeButton;
			}
			/**
			 * 获取arcgis按钮对象
			 */
			MyHomeButton.prototype.getHomeButton = function() {
				return this.homeButton;
			}
			/**
			 * 创建一个主页按钮
			 */
			MyHomeButton.prototype.addAHomeButton = function() {
				var home = new HomeButton({
							map : this.map
						}, this.domName);
				home.startup();
				this.homeButton = home;
			}
			/** *****************************************主页按钮类***************************************************** */
			/** *****************************************比例尺类****************************************************** */
			function MyScalebar(map, scalebar) {
				this.map = map;
				this.scalebar = scalebar;
			}
			/**
			 * 设置该比例尺附属的map对象。必要！
			 */
			MyScalebar.prototype.setMap = function(map) {
				this.map = map;
			}
			/**
			 * 获得该比例尺附属的map对象
			 */
			MyScalebar.prototype.getMap = function() {
				return this.map;
			}
			MyScalebar.prototype.setScalebar = function(scalebar) {
				this.scalebar = scalebar;
			}
			/**
			 * 获得arcgis比例尺对象
			 */
			MyScalebar.prototype.getScalebar = function() {
				return this.scalebar;
			}
			/**
			 * 创建一个比例尺在指定的map上。调用该方法前需先调用setMap指定map。
			 */
			MyScalebar.prototype.createAScalebar = function() {
				var scalebar = new Scalebar({
							map : this.map,
							scalebarUnit : "dual"
						});
				this.scalebar = scalebar;
			}
			/** *****************************************比例尺类****************************************************** */
			/** *****************************************动态图层类**************************************************** */
			function MyDynamicMapServiceLayer(url, id, opacity,
					dynamicMapServiceLayerOptions, infoTemplate,
					infoTemplateTitle, infoTemplateContent, visibleLayers,
					arcGISDynamicMapServiceLayer, ifWantToHaveAInfoTemplate,
					map) {
				this.url = url;
				this.id = id;
				this.opacity = opacity;
				this.dynamicMapServiceLayerOptions = dynamicMapServiceLayerOptions;
				this.infoTemplate = infoTemplate;
				this.infoTemplateTitle = infoTemplateTitle;
				this.infoTemplateContent = infoTemplateContent;
				this.visibleLayers = visibleLayers;
				this.arcGISDynamicMapServiceLayer = arcGISDynamicMapServiceLayer;
				this.ifWantToHaveAInfoTemplate = ifWantToHaveAInfoTemplate;
				this.map = map;
			}
			/**
			 * 设置图层的url。必要！
			 * 
			 * @param url
			 *            String类型
			 */
			MyDynamicMapServiceLayer.prototype.setUrl = function(url) {
				this.url = url;
			}
			/**
			 * 获取图层的url。
			 */
			MyDynamicMapServiceLayer.prototype.getUrl = function() {
				return this.url;
			}
			/**
			 * 设置图层的id，可以不设。设置了ID后，可以的通过map.getLyaer(id)快速获取该图层。
			 * 
			 * @param id
			 *            String类型
			 */
			MyDynamicMapServiceLayer.prototype.setId = function(id) {
				this.id = id;
			}
			/**
			 * 获取该图层的ID。前提是有设置ID。
			 * 
			 * @returns
			 */
			MyDynamicMapServiceLayer.prototype.getId = function() {
				return this.id;
			}
			/**
			 * 设置图层的透明度，值越高越不透明。
			 * 
			 * @param opacity
			 *            float类型。
			 */
			MyDynamicMapServiceLayer.prototype.setOpacity = function(opacity) {
				this.opacity = opacity;
			}
			/**
			 * 获取图层的透明度。默认为1。
			 */
			MyDynamicMapServiceLayer.prototype.getOpacity = function() {
				return this.opacity;
			}
			/**
			 * 设置该的图层对象的参数数组。如不设置，有默认值。
			 * 
			 * @param dynamicMapServiceLayerOptions
			 *            参数数组。
			 */
			MyDynamicMapServiceLayer.prototype.setDynamicMapServiceLayerOptions = function(
					dynamicMapServiceLayerOptions) {
				this.dynamicMapServiceLayerOptions = dynamicMapServiceLayerOptions;
			}
			/**
			 * 获取该的图层对象的参数数组。
			 */
			MyDynamicMapServiceLayer.prototype.getDynamicMapServiceLayerOptions = function() {
				return this.dynamicMapServiceLayerOptions;
			}
			/**
			 * 设置信息窗口，可以不设，该类有自动设置默认的信息窗口。
			 * 
			 * @param infoTemplate
			 *            InfoTemplate类型
			 */
			MyDynamicMapServiceLayer.prototype.setInfoTemplate = function(
					infoTemplate) {
				this.infoTemplate = infoTemplate;
			}
			/**
			 * 获取该图层的信息窗口。
			 */
			MyDynamicMapServiceLayer.prototype.getInfoTemplate = function() {
				return this.infoTemplate;
			}
			/**
			 * 设置信息窗口的标题。若不设则用默认的标题——“请设置标题。”几个字。
			 * 
			 * @param infoTemplateTitle
			 *            String类型
			 */
			MyDynamicMapServiceLayer.prototype.setInfoTemplateTitle = function(
					infoTemplateTitle) {
				this.infoTemplateTitle = infoTemplateTitle;
			}
			/**
			 * 获取个图层信息窗口的标题。
			 */
			MyDynamicMapServiceLayer.prototype.getInfoTemplateTitle = function() {
				return this.infoTemplateTitle;
			}
			/**
			 * 设置信息窗口的内容。若不设，则用默认的内容——“请设置内容。"几个字。
			 * 
			 * @param infoTemplateContent
			 *            String类型
			 */
			MyDynamicMapServiceLayer.prototype.setInfoTemplateContent = function(
					infoTemplateContent) {
				this.infoTemplateContent = infoTemplateContent;
			}
			/**
			 * 获取该图层信息窗口的内容。
			 */
			MyDynamicMapServiceLayer.prototype.getInfoTemplateContent = function() {
				return this.infoTemplateContent;
			}
			/**
			 * 设置该图层的可见子图层数组。默认全部显示。例如：[3,4,5]
			 * 
			 * @param visibleLayers
			 *            int型数组。
			 */
			MyDynamicMapServiceLayer.prototype.setVisibleLayers = function(
					visibleLayers) {
				this.visibleLayers = visibleLayers;
			}
			/**
			 * 获取该图层的可见子图层数组。
			 */
			MyDynamicMapServiceLayer.prototype.getVisibleLayers = function() {
				return this.visibleLayers;
			}
			/**
			 * 获取该最后生成的图层。
			 * 
			 * @param arcGISDynamicMapServiceLayer
			 */
			MyDynamicMapServiceLayer.prototype.getArcGISDynamicMapServiceLayer = function() {
				return this.arcGISDynamicMapServiceLayer;
			}
			/**
			 * 设置是否要显示信息窗口，默认不显示。
			 * 
			 * @param ifWantToHaveAInfoTemplate
			 *            boolean类型。
			 */
			MyDynamicMapServiceLayer.prototype.setIfWantToHaveAInfoTemplate = function(
					ifWantToHaveAInfoTemplate) {
				this.visibleLayers = ifWantToHaveAInfoTemplate;
			}
			/**
			 * 设置要添加到的map，如果有设置，则自动注入。
			 */
			MyDynamicMapServiceLayer.prototype.setMap = function(map) {
				this.map = map;
			}
			/**
			 * 获取map。
			 */
			MyDynamicMapServiceLayer.prototype.getMap = function() {
				return this.arcGISDynamicMapServiceLayer.getMap();
			}
			/**
			 * 生成一个图层
			 * 
			 * @returns 生成的图层对象。
			 */
			MyDynamicMapServiceLayer.prototype.createALayer = function() {
				// var
				// url,id,opacity,dynamicMapServiceLayerOptions,infoTemplate,infoTemplateTitle,infoTemplateContent,visibleLayers,arcGISDynamicMapServiceLayer;
				// new出图层对象。
				if (this.url == undefined) {
					console.info("【MyDynamicMapServiceLayer】url未设置。");
					return;
				}
				// 设置透明度的默认值。
				if (this.opacity == undefined) {
					this.opacity = 1;
				}
				// 设置属性数组
				if (this.id == undefined) {
					this.dynamicMapServiceLayerOptions = {
						"opacity" : this.opacity
					};
				} else {
					this.dynamicMapServiceLayerOptions = {
						"id" : this.id,
						"opacity" : this.opacity
					};
				}
				// new出图层对象
				this.arcGISDynamicMapServiceLayer = new ArcGISDynamicMapServiceLayer(
						this.url, this.dynamicMapServiceLayerOptions);
				// 如果有设置可见图层
				if (this.visibleLayers != undefined) {
					this.arcGISDynamicMapServiceLayer
							.setVisibleLayers(this.visibleLayers);
				}
				// 如果要求设置信息窗口
				if (this.ifWantToHaveAInfoTemplate == true) {
					// 如果自己传日信息窗口对象
					if (this.infoTemplate != undefined) {
						// 为图层添加信息窗口
						this.arcGISDynamicMapServiceLayer.setInfoTemplates({
									1 : {
										infoTemplate : this.infoTemplate
									}
								});
					} else {
						// 如果没有自己设定标题
						if (this.infoTemplateTitle == undefined) {
							this.infoTemplateTitle = "请设置标题。";
						}
						// 如果没有自己设定的内容。
						if (this.infoTemplateContent == undefined) {
							this.infoTemplateContent = "请设定内容。";
						}
						// new出信息窗口类
						this.infoTemplate = new InfoTemplate();
						// 设置标题
						this.infoTemplate.setTitle(this.infoTemplateTitle);
						// 设置内容
						this.infoTemplate.setContent(this.infoTemplateContent);
						// 为图层添加信息窗口
						this.arcGISDynamicMapServiceLayer.setInfoTemplates({
									1 : {
										infoTemplate : this.infoTemplate
									}
								});
					}
				}
				// 如果有设置map
				if (this.map != undefined) {
					this.map.addLayer(this.arcGISDynamicMapServiceLayer);
				}
				return this.arcGISDynamicMapServiceLayer;
			}

			/** *****************************************动态图层类**************************************************** */
			/** *****************************************MyMap类******************************************************** */
			function MyMap(domName,center,homeButtonDomName,ifShowScalebar,map,homeButton,scalebar,overviewMapDomName,overviewMap,toggle,toggleDomName,toggleLayerURL){
				this.domName = domName;
				this.center = center;
				this.homeButtonDomName = homeButtonDomName;
				this.ifShowScalebar = ifShowScalebar;
				this.map = map;
				this.homeButton = homeButton;
				this.scalebar = scalebar;
				this.overviewMapDomName = overviewMapDomName;
				this.overviewMap = overviewMap;
				// TODO
				this.toggle = toggle;
				this.toggleDomName = toggleDomName;
				this.toggleLayerURL = toggleLayerURL;
			}
			/**
			 * 设置HTML的dom节点。该map将主图到此节点。必要！
			 * 
			 * @param domName
			 *            String类型。
			 */
			MyMap.prototype.setDomName = function(domName) {
				this.domName = domName;
			}
			/**
			 * 获取HTML的dom节点。
			 */
			MyMap.prototype.getDomName = function() {
				return this.domName;
			}
			/**
			 * 设置中心点坐标数组。如：[113.39, 23.053]
			 * 
			 * @param center
			 *            flaot数组。
			 */
			MyMap.prototype.setCenter = function(center) {
				this.center = center;
			}
			MyMap.prototype.getCenter = function() {
				return this.center;
			}
			/**
			 * 设置是否要显示主页按钮，默认显示。
			 * 
			 * @param ifShowHomeButton
			 *            boolean类型。
			 */
			MyMap.prototype.setHomeButtonDomName = function(homeButtonDomName) {
				this.homeButtonDomName = homeButtonDomName;
			}
			/**
			 * 获取是否要显示主页按钮的值。
			 */
			MyMap.prototype.getHomeButtonDomName = function() {
				return this.homeButtonDomName;
			}
			/**
			 * 设置是否要显示比例尺。
			 * 
			 * @param ifShowScalebar
			 *            boolean类型。
			 */
			MyMap.prototype.setIfShowScalebar = function(ifShowScalebar) {
				this.ifShowScalebar = ifShowScalebar;
			}
			/**
			 * 获取是否要显示比例尺的值。
			 */
			MyMap.prototype.getIfShowScalebar = function() {
				return this.ifShowScalebar;
			}
			/**
			 * 获取生成的mao对象
			 * 
			 * @param map
			 */
			MyMap.prototype.getMap = function() {
				return this.map;
			}
			/**
			 * 获得默认的主页按钮对象
			 */
			MyMap.prototype.getHomeButton = function() {
				return this.homeButton;
			}
			/**
			 * 获得默认的比例尺对象。
			 */
			MyMap.prototype.getScalebar = function() {
				return this.scalebar;
			}
			/**
			 * 设置鸟瞰图的dom名称。
			 * 
			 * @param overviewMapDomName
			 *            String类型。
			 */
			MyMap.prototype.setOverviewMapDomName = function(overviewMapDomName) {
				this.overviewMapDomName = overviewMapDomName;
			}
			/**
			 * 获得鸟瞰图的dom名称。
			 */
			MyMap.prototype.getOverviewMapDomName = function() {
				return this.overviewMapDomName;
			}
			/**
			 * 获得鸟瞰图对象。
			 */
			MyMap.prototype.getOverviewMap = function() {
				return this.oOverviewMap;
			}
			/**
			 * 设置卫星图的节点名称
			 */
			MyMap.prototype.setToggleDomName = function(toggleDomName){
				this.toggleDomName = toggleDomName;
			}
			/**
			 * 获取卫星图的节点的名称
			 * @returns
			 */
			MyMap.prototype.getToggleDomName = function(){
				return this.toggleDomName;
			}
			
			/**
			 * 设置卫星图层的URL
			 * @param toggleLayerURL
			 */
			MyMap.prototype.setToggleLayerURL = function(toggleLayerURL){
				this.toggleLayerURL = toggleLayerURL;
			}
			/**
			 * 获取卫星图层的URL
			 * @returns
			 */
			MyMap.prototype.getToggleLayerURL = function(){
				return this.toggleLayerURL;
			}
			
			/**
			 * 获取卫星图对象
			 * @returns
			 */
			MyMap.prototype.getToggle = function(){
				return this.toggle;
			}

			/**
			 * 创建一个map对象。
			 */
			MyMap.prototype.createAMap = function() {
				// 如果没写domName
				if (this.domName == undefined) {
					console.info("请填写map所要注入的dom节点。");
					return;
				}
				// 如果没有填写中心点
				if (this.center == undefined) {
					this.map = new Map(this.domName);
				}
				// 如果有填写中心点
				else {
					this.map = new Map(this.domName, {
								center : this.center
							});
				}
				// 如果有填主页domName
				if (this.homeButtonDomName != undefined
						&& this.map != undefined) {
					var myHomeButton = new MyHomeButton();
					myHomeButton.setDomName(this.homeButtonDomName);
					myHomeButton.setMap(this.map);
					myHomeButton.addAHomeButton();
					this.homeButton = myHomeButton;
				}
				// 如果有填比例尺domName
				if (this.map != undefined && this.ifShowScalebar != false) {
					var myScalebar = new MyScalebar();
					myScalebar.setMap(this.map);
					myScalebar.createAScalebar();
					this.scalebar = myScalebar;
				}
				// 如果有填鸟瞰图domName
				if (this.overviewMapDomName != undefined
						&& this.map != undefined) {
					var overviewMapDijit = new OverviewMap({
								map : this.map,
								visible : true
							}, this.overviewMapDomName);
					overviewMapDijit.startup();
					this.overviewMap = overviewMapDijit;
				}
				// 如果有卫星图
				if(this.toggleDomName != undefined && this.toggleLayerURL != undefined){
					var toggle = new BasemapToggle({
						map : this.map,
						basemap : toggleLayerURL
					}, toggleDomName);
					toggle.startup();
					this.toggle = toggle;
				}

				// 绑定点击打印经纬度事件
				this.map.isShiftDoubleClickZoom = false;
				this.map.disableDoubleClickZoom();
				var myMap = this.map;

				return this.map;
			}
			/** *****************************************MyMap类******************************************************** */
			/** *****************************************MyFeatureLayer类************************************************* */
			function MyFeatureLayer(className, layers, map, visableDistance) {
				this.className = className;
				this.layers = layers;
				this.map = map;
				this.visableDistance = visableDistance;
			}
			/**
			 * 要被扫描的html节点的class属性名。只要set该属性。则会自动得扫描所有className的dom节点，把其value值作为id，生成多层FeatureLayer图层。
			 * 
			 * @param className
			 */
			MyFeatureLayer.prototype.setClassName = function(className) {
				this.className = className;
			}
			/**
			 * 获取要被扫描的html节点的class属性名
			 */
			MyFeatureLayer.prototype.getClassName = function() {
				return this.className;
			}
			/**
			 * 获取自动生成的图层。
			 */
			MyFeatureLayer.prototype.getLayers = function() {
				return this.layers;
			}
			/**
			 * 设置生成的图层所有注入的map
			 */
			MyFeatureLayer.prototype.setMap = function(map) {
				this.map = map;
			}
			/**
			 * 获取该图层所属于的map对象。
			 */
			MyFeatureLayer.prototype.getMap = function() {
				return this.map;
			}
			/**
			 * 设置子节点的className
			 * 
			 * @param childClassName
			 *            Stirng 类型
			 */
			MyFeatureLayer.prototype.setChildClassName = function(
					childClassName) {
				this.childClassName = childClassName;
			}
			/**
			 * 设置可见范围，地图的经度差超过此范围，所有图层将不可见
			 * 
			 * @param visableDistance
			 */
			MyFeatureLayer.prototype.setVisableDistance = function(
					visableDistance) {
				this.visableDistance = visableDistance;
			}
			MyFeatureLayer.prototype.getVisableDistance = function() {
				return this.visableDistance;
			}
			/**
			 * 创建图层
			 */
			var recordLayersIfSelected = [];
			MyFeatureLayer.prototype.createLayers = function() {
				if (this.className == undefined) {
					console.info("请先setClassName");
					return;
				}
				if (this.map == undefined) {
					console.info("请先setMap");
					return;
				} else {
					// 鼠标点击事件。
					function clickMethod2() {
						// alert(this.id);
						console.info(this.id);
						var o;
						var i;
						for (i = 0; i < recordLayersIfSelected.length; i++) {
							if (recordLayersIfSelected[i].id == this.id) {
								o = recordLayersIfSelected[i].trueOrFalse;
								// alert(o);
								console.info(o);
								break;
							}
						}
						if (o == false) {
							// 改变选中状态
							recordLayersIfSelected[i].trueOrFalse = true;
							myMap.getLayer(this.id).show();
							// alert("show");
							console.info("show");
							console.info("----------")
							console.info(myMap.getLayer(this.id));
						} else {
							// 改变选中状态
							recordLayersIfSelected[i].trueOrFalse = false;
							myMap.getLayer(this.id).hide();
							// alert("hide");
							console.info("hide");
							console.info("----------")
							console.info(myMap.getLayer(this.id));
						}
					}
					// 先new出数组
					if (this.layers == undefined) {
						this.layers = [];
					}
					// 遍历所有className
					var myLayers = this.layers;
					var myMap = this.map;
					dojo.forEach(this.className, function(item, i) {
						var clazzs = dojo.query("." + item);
						// 遍历所有class名一样的节点。
						dojo.forEach(clazzs, function(item, i) {
									// 绑定点击事件。
									// dojo.connect(item,"onclick",clickMethod2);
									// 获取html节点的id
									var myId = item.id;
									// 图层定义
									layerDefinition = {
										"geometryType" : "esriGeometryPoint",
										"fields" : [{
													"name" : "id",
													"type" : "esriFieldTypeInteger",
													"alias" : "id"
												}],
										"capabilities" : "Map,Query,Data",
										"displayField" : "id",
										"objectIdField" : "id"
										,
									}
									// 元素集合
									featureCollection = {
										layerDefinition : layerDefinition
									};
									// 新建FeatureLayer
									var myFeatureLayer = new FeatureLayer(
											featureCollection, {
												mode : FeatureLayer.MODE_SNAPSHOT,
												id : myId
											});
									myFeatureLayer.spatialReference.wkid = "WGS84";
									// 设置缩放到那个级别就不能显示
									// myFeatureLayer.setScaleRange(10);
									// myFeatureLayer.setMinScale(5);
									// 默认隐藏图层。
									myFeatureLayer.show();
									myMap.addLayer(myFeatureLayer);
									myLayers.push(myFeatureLayer);
									// 记录图层是否被选中
									var layerJson = {
										id : myId,
										trueOrFalse : true
									};
									recordLayersIfSelected.push(layerJson);
								});
					});
					this.layers = myLayers;
					// 以下代码是实现地图缩放太小时把地图隐藏起来的
					if (this.visableDistance != undefined) {
						var myVisableDistance = this.visableDistance;
						myMap.on("extent-change", function(extent) {
									// TODO

									console.info("经度差值:");
									var chaZhi = Math.abs(extent.extent.xmax
											- extent.extent.xmin);
									console.info(chaZhi);
									
									if (chaZhi > 0.3493048756558892) {
										for (var i = 0; i < myLayers.length; i++) {
											myLayers[i].hide();
										}
									} else {
										for (var i = 0; i < myLayers.length; i++) {
											myLayers[i].show();
										}
									}
								});
					}

				}
			}
			/** *****************************************MyFeatureLayer类************************************************* */
			/** *****************************************MyGraphic类****************************************************** */
			function MyGraphic(pictureUrl, beyondLayer, x, y, domID,
					infoTemplateTitle, infoTemplateContent, graphic) {
				this.pictureUrl = pictureUrl;
				this.beyondLayer = beyondLayer;
				this.x = x;
				this.y = y;
				this.domID = domID;
				this.infoTemplateTitle = infoTemplateTitle;
				this.infoTemplateContent = infoTemplateContent;
				this.graphic = graphic;
			}
			/**
			 * 设置该图形的图片URL
			 * 
			 * @param url
			 *            String类型。
			 */
			MyGraphic.prototype.setPictureUrl = function(pictureUrl) {
				this.pictureUrl = pictureUrl;
			}
			/**
			 * 获取该图形的图片URL
			 * 
			 * @param url
			 */
			MyGraphic.prototype.getPictureUrl = function() {
				return this.pictureUrl;
			}
			/**
			 * 设置该图形所属的图层
			 */
			MyGraphic.prototype.setBeyondLayer = function(beyondLayer) {
				this.beyondLayer = beyondLayer;
			}
			/**
			 * 获得该图形所属的图层
			 */
			MyGraphic.prototype.getBeyondLayer = function() {
				return this.beyondLayer;
			}
			/**
			 * 设置该图形的x坐标
			 */
			MyGraphic.prototype.setX = function(x) {
				this.x = x;
			}
			/**
			 * 获得该图形的x坐标
			 */
			MyGraphic.prototype.getX = function() {
				return this.x;
			}
			/**
			 * 设置该图形的y坐标
			 */
			MyGraphic.prototype.setY = function(y) {
				this.y = y;
			}
			/**
			 * 获得该图形的y坐标
			 */
			MyGraphic.prototype.getY = function() {
				return this.y;
			}
			/**
			 * 设置该图形的HTML节点的ID，设置了此ID后，将自动为其绑定点击事件，实现点击消失与隐藏。
			 */
			MyGraphic.prototype.setDomID = function(domID) {
				this.domID = domID;
			}
			/**
			 * 获取该图形的HTML节点的ID
			 */
			MyGraphic.prototype.getDomID = function() {
				return this.domID;
			}
			/**
			 * 设置该图形信息窗口的标题
			 */
			MyGraphic.prototype.setInfoTemplateTitle = function(
					infoTemplateTitle) {
				this.infoTemplateTitle = infoTemplateTitle;
			}
			/**
			 * 获得该图形信息窗口的标题
			 */
			MyGraphic.prototype.getInfoTemplateTitle = function() {
				return this.infoTemplateTitle;
			}
			/**
			 * 设置该图形的信息窗口内容
			 */
			MyGraphic.prototype.setInfoTemplateContent = function(
					infoTemplateContent) {
				this.infoTemplateContent = infoTemplateContent;
			}
			/**
			 * 获得该图形的信息窗口内容
			 */
			MyGraphic.prototype.getInfoTemplateContent = function() {
				return this.infoTemplateContent;
			}
			/**
			 * 获取最后生成的graphic
			 */
			MyGraphic.prototype.getGraphic = function() {
				return this.graphic;
			}
			/**
			 * 创建图形
			 */
			MyGraphic.prototype.createGraphic = function() {
				// pictureUrl,beyondLayer,x,y,domID,infoTemplateTitle,infoTemplateContent
				if (this.pictureUrl == undefined) {
					console.info("请设置图片url。");
					return;
				}
				if (this.beyondLayer == undefined) {
					console.info("请设置所属图层layer。");
					return;
				}
				if (this.x == undefined) {
					console.info("请设置x坐标。");
					return;
				}
				if (this.y == undefined) {
					console.info("请设置y坐标。");
					return;
				}
				// 创建一个点。
				var pt = new Point(this.x, this.y,
						this.beyondLayer.spatialReference);
				// 创建图标样式
				var pictureSymbol = new PictureMarkerSymbol(this.pictureUrl,
						40, 40);
				// 设置信息窗口
				var template = new InfoTemplate();
				var title;
				var content;
				if (this.infoTemplateTitle == undefined) {
					title = "请设置标题。";
				} else {
					title = this.infoTemplateTitle;
				}
				if (this.infoTemplateContent == undefined) {
					content = "请设置内容。";
				} else {
					content = this.infoTemplateContent;
				}
				template.setTitle(title);
				template.setContent(content);
				var attr = {"id":this.domID};
				this.graphic = new Graphic(pt, pictureSymbol, attr, template);
				// this.graphic.hide();
				this.beyondLayer.add(this.graphic);
				// 绑定事件
				var myDomId = this.domID;
				var myGraphic = this.graphic;
				function graphicOnClick() {
					// var dom = dojo.byId(myDomId);
					console.log("被选中的单选框的ID值：");
					console.info(myDomId);
					console.log("当前被选中的单选框的结果：");
					console.info(document.getElementById(myDomId).checked);
					if (document.getElementById(myDomId).checked == true) {
						// alert("show");
						// console.info("show");
						myGraphic.show();
					} else {
						// alert("hide");
						// console.info("hide");
						myGraphic.hide();
					}
				}
				// if (myDomId != undefined) {
				// 	dojo.connect(dojo.byId(myDomId), "onclick", graphicOnClick);
				// }

				return this.graphic;
			}

			/** *****************************************MyGraphic类**************************************************** */
			/** *****************************************MyToolbar类**************************************************** */
			var bangDingShuBiaoDianJiShiJian;
			var clickState = [false, false, false, false, false, false, false];// 0垃圾桶，1圆面，2多边线面，3多边行面，4多边线，5箭头，6手
			function MyToolbar(polygonDomName, freeHandPolylineDomName,
					freehandPolygonDomName, arrowDomName, circleDomName,
					layers, map, clearDomName, pointerDomName) {
				this.clearDomName = clearDomName;// 0垃圾桶
				this.circleDomName = circleDomName;// 1圆面
				this.polygonDomName = polygonDomName;// 2多边线面
				this.freehandPolygonDomName = freehandPolygonDomName;// 3多边行面
				this.freeHandPolylineDomName = freeHandPolylineDomName;// 4多边线
				this.arrowDomName = arrowDomName;// 5箭头
				this.pointerDomName = pointerDomName;// 6手

				this.layers = layers;
				this.map = map;
			}
			/**
			 * 设置多边线形按钮要注入的节点名称。
			 * 
			 * @param polygonDonName
			 *            String
			 */
			MyToolbar.prototype.setPolygonDomName = function(polygonDomName) {
				this.polygonDomName = polygonDomName;
			}
			/**
			 * 获取多边线形工具按钮要注入的节点名称。
			 */
			MyToolbar.prototype.getPolygonDomName = function() {
				return this.polygonDomName;
			}
			/**
			 * 设置铅笔工具按钮要注入的节点名称。
			 * 
			 * @param freeHandPolylineDomName
			 *            String
			 */
			MyToolbar.prototype.setFreeHandPolylineDomName = function(
					freeHandPolylineDomName) {
				this.freeHandPolylineDomName = freeHandPolylineDomName;
			}
			/**
			 * 获取铅笔工具按钮要注入的节点名称。
			 */
			MyToolbar.prototype.getFreeHandPolylineDomName = function() {
				return this.freeHandPolylineDomName;
			}
			/**
			 * 设置多边曲形工具按钮要注入的节点名称。
			 * 
			 * @param freehandPolygonDomName
			 *            String
			 */
			MyToolbar.prototype.setFreehandPolygonDomName = function(
					freehandPolygonDomName) {
				this.freehandPolygonDomName = freehandPolygonDomName;
			}
			/**
			 * 获取多边曲形工具按钮要注入的节点名称。
			 */
			MyToolbar.prototype.getFreehandPolygonDomName = function() {
				return this.freehandPolygonDomName;
			}
			/**
			 * 设置箭头工具按钮要注入的节点名称。
			 * 
			 * @param arrowDomName
			 *            String
			 */
			MyToolbar.prototype.setArrowDomName = function(arrowDomName) {
				this.arrowDomName = arrowDomName;
			}
			/**
			 * 获取箭头工具按钮要注入的节点名称。
			 */
			MyToolbar.prototype.getArrowDomName = function() {
				return this.arrowDomName;
			}
			/**
			 * 设置圆形工具按钮要注入的节点名称。
			 * 
			 * @param circleDomName
			 *            String
			 */
			MyToolbar.prototype.setCircleDomName = function(circleDomName) {
				this.circleDomName = circleDomName;
			}
			/**
			 * 获取圆形工具按钮要注入的节点名称。
			 */
			MyToolbar.prototype.getCircleDomName = function() {
				return this.circleDomName;
			}
			/**
			 * 设置要查询的图层
			 * 
			 * @param layers
			 *            图层数组
			 */
			MyToolbar.prototype.setLayers = function(layers) {
				this.layers = layers;
			}
			/**
			 * 获取要查询的图层
			 */
			MyToolbar.prototype.getLayers = function() {
				return this.layers;
			}
			/**
			 * 设置要注入的地图
			 * 
			 * @param map
			 */
			MyToolbar.prototype.setMap = function(map) {
				this.map = map;
			}
			/**
			 * 获取注入的地图
			 */
			MyToolbar.prototype.getMap = function() {
				return this.map;
			}
			/**
			 * 设置清除按钮要注入的节点名称。
			 * 
			 * @param clearDomName
			 *            String
			 */
			MyToolbar.prototype.setClearDomName = function(clearDomName) {
				this.clearDomName = clearDomName;
			}
			/**
			 * 获取清除按钮要注入的节点名称。
			 */
			MyToolbar.prototype.getClearDomName = function() {
				return this.clearDomName;
			}
			/**
			 * 设置点击工具的节点名称。
			 * 
			 * @param pointerDomName
			 */
			MyToolbar.prototype.setPointerDomName = function(pointerDomName) {
				this.pointerDomName = pointerDomName;
			}
			/**
			 * 获得点击工具的节点名称。
			 */
			MyToolbar.prototype.getPointerDomName = function() {
				return this.pointerDomName;
			}
			/**
			 * 创建工具条
			 */
			MyToolbar.prototype.createToolBar = function() {
				if (this.polygonDomName == undefined
						&& this.freeHandPolylineDomName == undefined
						&& this.freehandPolygonDomName == undefined
						&& this.arrowDomName == undefined
						&& this.circleDomName == undefined) {
					console.info("请至少设置一个dom节点。");
					return;
				}
				if (this.clearDomName == undefined) {
					console.info("请设置清除按钮的DOM节点。");
					return;
				}
				if (this.map == undefined) {
					console.info("请设置map。");
					return;
				}
				var myMap = this.map;
				var myLayers = this.layers;
				// 全局工具
				var toolBar = new Draw(this.map);
				// 绑定画完的事件
				toolBar.on("draw-end", addToMap);
				// 画完触发的函数
				function addToMap(evt) {
					var symbol;
					if (evt.target._geometryType == "circle"
						|| evt.target._geometryType == "freehandpolygon"
						|| evt.target._geometryType == "polygon") {
						myMap.graphics.clear();
					}
					
					switch (evt.geometry.type) {
						case "point" :
						case "multipoint" :
							symbol = new SimpleMarkerSymbol();
							break;
						case "polyline" :
							symbol = new SimpleLineSymbol(
									SimpleLineSymbol.STYLE_SOLID, new Color([
											255, 0, 0]), 2);
							break;
						default :
//							symbol = new SimpleFillSymbol();
							symbol = new SimpleLineSymbol(
									SimpleLineSymbol.STYLE_SOLID, new Color([
											255, 0, 0]), 2);
							break;
					}
					var graphic = new Graphic(evt.geometry, symbol);
					myMap.graphics.add(graphic);

					// 是否要使工具失效
					if (evt.target._geometryType == "circle"
							|| evt.target._geometryType == "freehandpolygon"
							|| evt.target._geometryType == "polygon") {
						// 工具失效
						setTimeout(function() {
									toolBar.deactivate();
								}, 200);
						// 取消选择
						if (document.getElementById("circleToolBar") != undefined) {
							clickState[1] = false;// 代表取消被选中。
							$("#circleToolBar")
									.replaceWith("<img id=\"circleToolBar\" title=\"选中该工具后，可在地图上画“圆”，在选区内的资源将会浮现。\" src=\"../GISMap/images/circle25X25.png\">");// 改变样式
							dojo.connect(dojo.byId("circleToolBar"), "onclick",
									huaYuan);
						}
						if (document.getElementById("polygonToolBar") != undefined) {
							clickState[2] = false;// 代表取消被选中。
							$("#polygonToolBar")
									.replaceWith("<img id=\"polygonToolBar\" title=\"选中该工具后，可在地图上“多边线面”。\" src=\"../GISMap/images/polygon25X25.png\">");// 改变样式
							dojo.connect(dojo.byId("polygonToolBar"),
									"onclick", duoBianMian);
						}
						if (document.getElementById("freehandPolygonToolBar") != undefined) {
							clickState[3] = false;// 代表被选中。
							$("#freehandPolygonToolBar")
									.replaceWith("<img id=\"freehandPolygonToolBar\" title=\"选中该工具后，可在地图上“多边型面”。\"src=\"../GISMap/images/freehandpolygon25X25.png\">");// 改变样式
							dojo.connect(dojo.byId("freehandPolygonToolBar"),
									"onclick", duoBianXingMian);
						}
					}

					// 可支持查询的图形有：circle、freehand_polygon、polygon
					if (evt.target._geometryType != "circle"
							&& evt.target._geometryType != "freehandpolygon"
							&& evt.target._geometryType != "polygon") {
						return;
					}
					var xmax_ = graphic.geometry._extent.xmax;
					var xmin_ = graphic.geometry._extent.xmin;
					var ymax_ = graphic.geometry._extent.ymax;
					var ymin_ = graphic.geometry._extent.ymin;
					circleGetResources(resourcesArray, xmax_, xmin_, ymax_,
							ymin_);
					// 新建查询任务
					/*
					 * var query; if (evt.geometry.type == "polygon" && myLayers !=
					 * undefined) { for (var i = 0; i < myLayers.length; i++) {
					 * query = new Query(); // 设置【查询的图形上的范围】 var xmax =
					 * graphic.geometry._extent.xmax; var xmin =
					 * graphic.geometry._extent.xmin; var ymax =
					 * graphic.geometry._extent.ymax; var ymin =
					 * graphic.geometry._extent.ymin; var extent = new
					 * Extent(xmin, ymin, xmax, ymax); query.geometry = extent;
					 * myLayers[i] .queryFeatures(query, selectFeatureLayer); } }
					 */
					// 搜索函数
					/*
					 * function selectFeatureLayer(response) { // 查询结果 var
					 * feature; var features = response.features; var inBuffer =
					 * []; // 遍历结果 for (var i = 0; i < features.length; i++) {
					 * feature = features[i]; if (feature != undefined &&
					 * feature._layer != undefined) { inBuffer
					 * .push(feature.attributes[feature._layer.objectIdField]);
					 * feature.show(); } } var query = new Query();
					 * query.objectIds = inBuffer; //
					 * 下面这话很重要，只有【featureLayer.selectFeatures】调用完之后，才会有显示图标 if
					 * (feature != undefined && feature._layer != undefined) {
					 * feature._layer.selectFeatures(query,
					 * feature._layer.SELECTION_NEW, function( results) {
					 * feature._layer.show(); }); } }
					 */
				}
				// （1）【圆】————支持查询
				if (this.circleDomName != undefined) {
					var circleDom = jQuery("#" + this.circleDomName);
					if (circleDom == undefined) {
						console.info("圆形工具所要注入的dom节点无效。");
					} else {
						// 创建图标
						jQuery("#" + this.circleDomName)
								.append("<img id=\"circleToolBar\" title=\"选中该工具后，可在地图上画“圆”，在选区内的资源将会浮现。\" src=\"../GISMap/images/circle25X25.png\">");
						// 点击按钮后触发的函数
						function huaYuan() {
							// 如果本来没被选中
							if (clickState[1] == false) {
								clickState[1] = true;// 代表被选中。
								$("#circleToolBar")
										.replaceWith("<img id=\"circleToolBar\" title=\"选中该工具后，可在地图上画“圆”，在选区内的资源将会浮现。\" src=\"../GISMap/images/circle25X25T.png\">");// 改变样式
								dojo.connect(dojo.byId("circleToolBar"),
										"onclick", huaYuan);
								quXiaoQiTaGongJu("circleToolBar");
								toolBar.activate(Draw["CIRCLE"]);
							}
						}
						// 绑定事件并激活工具
						dojo.connect(dojo.byId("circleToolBar"), "onclick",
								huaYuan);
					}
				}
				// （2）【垃圾桶】
				if (this.clearDomName != undefined) {
					var clearDom = jQuery("#" + this.clearDomName);
					if (clearDom == undefined) {
						console.info("垃圾桶工具所要注入的dom节点无效。");
					} else {
						// 创建图标
						jQuery("#" + this.clearDomName)
								.append("<img id=\"clearToolBar\" title=\"选中该工具后，地图上的所有资源和图形都会被清除。\"src=\"../GISMap/images/laJiTong25X25.png\">");
						// 点击按钮后触发的函数
						function qingChu() {
							if (clickState[0] == false) {
								clickState[0] = true;// 代表被选中。
								$("#clearToolBar")
										.replaceWith("<img id=\"clearToolBar\" title=\"选中该工具后，地图上的所有资源和图形都会被清除。\" src=\"../GISMap/images/laJiTong25X25T.png\">");// 改变样式
								dojo.connect(dojo.byId("clearToolBar"),
										"onclick", qingChu);
								myMap.graphics.clear();
								dResourcesArray = [];
								$("#replaceDom").replaceWith("<div id='replaceDom'></div>");
								for(var i = 0; i < myLayers.length ; i++){
		//							myLayers[i].hide();
									if(myLayers[i].graphics != undefined){ 
										var layerLength = myLayers[i].graphics.length;
										var layer = myLayers[i];
										for(var j = 0 ; j < layerLength ; j++){
		//									myLayers[i].graphics[j].hide();
											layer.remove(layer.graphics[0]);
										}
									}
								}

								setTimeout(function() {
									clickState[0] = false;// 代表取消被选中。
									$("#clearToolBar")
											.replaceWith("<img id=\"clearToolBar\" title=\"选中该工具后，地图上的所有资源和图形都会被清除。\" src=\"../GISMap/images/laJiTong25X25.png\">");// 改变样式
									dojo.connect(dojo.byId("clearToolBar"),
											"onclick", qingChu);
								}, 500);
							}
						}
						// 绑定事件并激活工具
						dojo.connect(dojo.byId("clearToolBar"), "onclick",
								qingChu);
					}
				}
				// （3）【多边线面polygonDomName】
				if (this.polygonDomName != undefined) {
					var polygonDom = jQuery("#" + this.polygonDomName);
					if (polygonDom == undefined) {
						console.info("多边线面polygonDomName工具所要注入的dom节点无效。");
					} else {
						// 创建图标
						jQuery("#" + this.polygonDomName)
								.append("<img id=\"polygonToolBar\" title=\"选中该工具后，可在地图上画“多边线面”，在选区内的资源将会浮现。\" src=\"../GISMap/images/polygon25X25.png\">");
						// 点击按钮后触发的函数
						function duoBianMian() {
							clickState[2] = true;// 代表被选中。
							$("#polygonToolBar")
									.replaceWith("<img id=\"polygonToolBar\" title=\"选中该工具后，可在地图上画“多边线面”，在选区内的资源将会浮现。\" src=\"../GISMap/images/polygon25X25T.png\">");// 改变样式
							dojo.connect(dojo.byId("polygonToolBar"),
									"onclick", duoBianMian);
							quXiaoQiTaGongJu("polygonToolBar");
							toolBar.activate(Draw["POLYGON"]);
						}
						// 绑定事件并激活工具
						dojo.connect(dojo.byId("polygonToolBar"), "onclick",
								duoBianMian);
					}
				}
				// （4）【多边型面freehandPolygonDomName】
				if (this.freehandPolygonDomName != undefined) {
					var freehandPolygonDom = jQuery("#"
							+ this.freehandPolygonDomName);
					if (freehandPolygonDom == undefined) {
						console
								.info("多边型面freehandPolygonDomName工具所要注入的dom节点无效。");
					} else {
						// 创建图标
						jQuery("#" + this.freehandPolygonDomName)
								.append("<img id=\"freehandPolygonToolBar\" title=\"选中该工具后，可在地图上画“多边型面”，在选区内的资源将会浮现。\"src=\"../GISMap/images/freehandpolygon25X25.png\">");
						// 点击按钮后触发的函数
						function duoBianXingMian() {
							clickState[3] = true;// 代表被选中。
							$("#freehandPolygonToolBar")
									.replaceWith("<img id=\"freehandPolygonToolBar\" title=\"选中该工具后，可在地图上画“多边型面”，在选区内的资源将会浮现。\"src=\"../GISMap/images/freehandpolygon25X25T.png\">");// 改变样式
							dojo.connect(dojo.byId("freehandPolygonToolBar"),
									"onclick", duoBianXingMian);
							quXiaoQiTaGongJu("freehandPolygonToolBar");
							toolBar.activate(Draw["FREEHAND_POLYGON"]);
						}
						// 绑定事件并激活工具
						dojo.connect(dojo.byId("freehandPolygonToolBar"),
								"onclick", duoBianXingMian);
					}
				}
				// （5）【多边线freeHandPolylineDomName】
				if (this.freeHandPolylineDomName != undefined) {
					var freeHandPolylineDom = jQuery("#"
							+ this.freeHandPolylineDomName);
					if (freeHandPolylineDom == undefined) {
						console
								.info("多边线freeHandPolylineDomName工具所要注入的dom节点无效。");
					} else {
						// 创建图标
						jQuery("#" + this.freeHandPolylineDomName)
								.append("<img id=\"freeHandPolylineToolBar\" title=\"选中该工具后，可在地图上随意画“线”。\"src=\"../GISMap/images/line25X25.png\">");
						// 点击按钮后触发的函数
						function duoBianXian() {
							if (clickState[4] == false) {
								clickState[4] = true;// 代表被选中。
								$("#freeHandPolylineToolBar")
										.replaceWith("<img id=\"freeHandPolylineToolBar\" title=\"选中该工具后，可在地图上随意画“线”。\"src=\"../GISMap/images/line25X25T.png\">");// 改变样式
								dojo.connect(
										dojo.byId("freeHandPolylineToolBar"),
										"onclick", duoBianXian);
								quXiaoQiTaGongJu("freeHandPolylineToolBar");
								toolBar.activate(Draw["FREEHAND_POLYLINE"]);
							} else {
								clickState[4] = false;// 代表被选中。
								$("#freeHandPolylineToolBar")
										.replaceWith("<img id=\"freeHandPolylineToolBar\" title=\"选中该工具后，可在地图上随意画“线”。\"src=\"../GISMap/images/line25X25.png\">");// 改变样式
								dojo.connect(
										dojo.byId("freeHandPolylineToolBar"),
										"onclick", duoBianXian);
								toolBar.deactivate();
							}
						}
						// 绑定事件并激活工具
						dojo.connect(dojo.byId("freeHandPolylineToolBar"),
								"onclick", duoBianXian);
					}
				}
				// （6）【箭头arrowDomName】
				if (this.arrowDomName != undefined) {
					var arrowDom = jQuery("#" + this.arrowDomName);
					if (arrowDom == undefined) {
						console.info("箭头arrowDomName工具所要注入的dom节点无效。");
					} else {
						// 创建图标
						jQuery("#" + this.arrowDomName)
								.append("<img id=\"arrowToolBar\" title=\"选中该工具后，可在地图上画“箭头”。\" src=\"../GISMap/images/arrow25X25.png\">");
						// 点击按钮后触发的函数
						function jianTou() {
							if (clickState[5] == false) {
								clickState[5] = true;// 代表被选中。
								$("#arrowToolBar")
										.replaceWith("<img id=\"arrowToolBar\" title=\"选中该工具后，可在地图上画“箭头”。\" src=\"../GISMap/images/arrow25X25T.png\">");// 改变样式
								dojo.connect(dojo.byId("arrowToolBar"),
										"onclick", jianTou);
								quXiaoQiTaGongJu("arrowToolBar");
								toolBar.activate(Draw["ARROW"]);
							} else {
								clickState[5] = false;// 代表被选中。
								$("#arrowToolBar")
										.replaceWith("<img id=\"arrowToolBar\" title=\"选中该工具后，可在地图上画“箭头”。\" src=\"../GISMap/images/arrow25X25.png\">");// 改变样式
								dojo.connect(dojo.byId("arrowToolBar"),
										"onclick", jianTou);
								toolBar.deactivate();
							}
						}
						// 绑定事件并激活工具
						dojo.connect(dojo.byId("arrowToolBar"), "onclick",
								jianTou);
					}
				}
				// （7）【点击工具pointerDomName】
				if (this.pointerDomName != undefined) {
					var pointerDom = jQuery("#" + this.pointerDomName);
					if (pointerDom == undefined) {
						console.info("箭头arrowDomName工具所要注入的dom节点无效。");
					} else {
						// 创建图标
						jQuery("#" + this.pointerDomName)
								.append("<img id=\"pointerToolBar\" title=\"选中该工具后，点击地图可生成经纬度。\"src=\"../GISMap/images/pointer25X25.png\">");
						// 点击按钮后触发的函数
						function dianJiGongJu() {
							if (clickState[6] == false) {
								clickState[6] = true;// 代表被选中。
								$("#pointerToolBar")
										.replaceWith("<img id=\"pointerToolBar\" title=\"选中该工具后，点击地图可生成经纬度。\"src=\"../GISMap/images/pointer25X25T.png\">");// 改变样式
								dojo.connect(dojo.byId("pointerToolBar"),
										"onclick", dianJiGongJu);
								quXiaoQiTaGongJu("pointerToolBar");
								document.getElementById("map_layers").style.cursor = "pointer";
								bangDingShuBiaoDianJiShiJian = dojo.connect(
										myMap, "onClick", function(evt) {
											// clientX: 428 clientY: 238
											var x = evt.clientX;
											var y = evt.clientY;
											var screenPointnew = new esri.geometry.ScreenPoint(
													x, y);
											var point = map
													.toMap(screenPointnew);
											console.info(jQuery("#xtText"));
											if (document
													.getElementById("xtText") != undefined) {
												jQuery("#xtText")
														.replaceWith("<div id=\"xtText\" style=\"position:absolute;top:48%;left:48%;text-align:center; height:55px; width:200px; background-color:white;border: solid black 1px;\">经度："
																+ point.x
																+ "<br>纬度："
																+ point.y
																+ "<br>请复制。</div>");
											} else {
												jQuery("body")
														.append("<div id=\"xtText\" style=\"position:absolute;top:48%;left:48%; text-align:center;height:55px; width:200px; background-color:white;border: solid black 1px;\">经度："
																+ point.x
																+ "<br>纬度："
																+ point.y
																+ "<br>请复制。</div>");
											}
										});
							} else {
								clickState[6] = false;// 代表取消被选中。
								$("#pointerToolBar")
										.replaceWith("<img id=\"pointerToolBar\" title=\"选中该工具后，点击地图可生成经纬度。\"src=\"../GISMap/images/pointer25X25.png\">");// 改变样式
								dojo.connect(dojo.byId("pointerToolBar"),
										"onclick", dianJiGongJu);
								document.getElementById("map_layers").style.cursor = "default";
								jQuery("#xtText").remove();
								if (bangDingShuBiaoDianJiShiJian != undefined) {
									dojo
											.disconnect(bangDingShuBiaoDianJiShiJian);
								}
							}
						}
						// 绑定事件并激活工具
						dojo.connect(dojo.byId("pointerToolBar"), "onclick",
								dianJiGongJu);
					}
				}
				// 取消其他工具的选择
				function quXiaoQiTaGongJu(selfToolName) {
					// 1圆
					if (selfToolName != "circleToolBar") {
						if (document.getElementById("circleToolBar") != undefined) {
							if (clickState[1] == true) {
								$("#circleToolBar")
										.replaceWith("<img id=\"circleToolBar\" title=\"选中该工具后，可在地图上画“圆”，在选区内的资源将会浮现。\" src=\"../GISMap/images/circle25X25.png\">");// 改变样式
								dojo.connect(dojo.byId("circleToolBar"),
										"onclick", huaYuan);
							}
						}
					}
					// 2多边线面polygonDomName
					if (selfToolName != "polygonToolBar") {
						if (document.getElementById("polygonToolBar") != undefined) {
							if (clickState[2] == true) {
								$("#polygonToolBar")
										.replaceWith("<img id=\"polygonToolBar\" title=\"选中该工具后，可在地图上“多边线面”。\" src=\"../GISMap/images/polygon25X25.png\">");// 改变样式
								dojo.connect(dojo.byId("polygonToolBar"),
										"onclick", duoBianMian);
							}
						}
					}
					// 3多边型面freehandPolygonDomName
					if (selfToolName != "freehandPolygonToolBar") {
						if (document.getElementById("freehandPolygonToolBar") != undefined) {
							if (clickState[3] == true) {
								$("#freehandPolygonToolBar")
										.replaceWith("<img id=\"freehandPolygonToolBar\" title=\"选中该工具后，可在地图上“多边型面”。\"src=\"../GISMap/images/freehandpolygon25X25.png\">");// 改变样式
								dojo.connect(
										dojo.byId("freehandPolygonToolBar"),
										"onclick", duoBianXingMian);
							}
						}
					}
					// 4多边线freeHandPolylineDomName
					if (selfToolName != "freeHandPolylineToolBar") {
						if (document.getElementById("freeHandPolylineToolBar") != undefined) {
							if (clickState[4] == true) {
								$("#freeHandPolylineToolBar")
										.replaceWith("<img id=\"freeHandPolylineToolBar\" title=\"选中该工具后，可在地图上随意画“线”。\"src=\"../GISMap/images/line25X25.png\">");// 改变样式
								dojo.connect(
										dojo.byId("freeHandPolylineToolBar"),
										"onclick", duoBianXian);
							}
						}
					}
					// 5箭头arrowDomName
					if (selfToolName != "arrowToolBar") {
						if (document.getElementById("arrowToolBar") != undefined) {
							if (clickState[5] == true) {
								$("#arrowToolBar")
										.replaceWith("<img id=\"arrowToolBar\" title=\"选中该工具后，可在地图上画“箭头”。\" src=\"../GISMap/images/arrow25X25.png\">");// 改变样式
								dojo.connect(dojo.byId("arrowToolBar"),
										"onclick", jianTou);
							}
						}
					}
					// 6手pointerDomName
					if (selfToolName != "pointerToolBar") {
						if (document.getElementById("pointerToolBar") != undefined) {
							if (clickState[6] == true) {
								$("#pointerToolBar")
										.replaceWith("<img id=\"pointerToolBar\" title=\"选中该工具后，点击地图可生成经纬度。\"src=\"../GISMap/images/pointer25X25.png\">");// 改变样式
								dojo.connect(dojo.byId("pointerToolBar"),
										"onclick", dianJiGongJu);
							}
						}
					}
				}
			}
			/** *****************************************MyToolbar类**************************************************** */
			
			/*******************************************查询类*****************************************************/	
			function MyFind(layerUrls,fileds,value,results){
				this.layerUrls = layerUrls;
				this.fileds = fileds;
				this.results = results;
				this.value = value;
			}
			/**
			 * 设置要查询的图层数组
			 * @param layers
			 */
			MyFind.prototype.setLayerUrls = function(layerUrls){
				this.layerUrls = layerUrls;
			}
			/**
			 * 获得查询的图层的数组
			 * @returns
			 */
			MyFind.prototype.getLayers = function(){
				return this.layers;
			}
			/**
			 * 设置查询数字段数组
			 * @param fileds
			 */
			MyFind.prototype.setFileds = function(fileds){
				this.fileds = fileds;
			}
			/**
			 * 获取查询字段数组
			 * @returns
			 */
			MyFind.prototype.getFileds = function(){
				return this.fileds;
			}
			/**
			 * 获得返回结果集
			 * @returns
			 */
			MyFind.prototype.getResults = function(){
				return this.results;
			}

			/**
			 * 设置根据什么查询
			 * @param value
			 */
			MyFind.prototype.setValue = function(value){
				this.value = value;
			}
			/**
			 * 获得根据什么查询
			 * @returns
			 */
			MyFind.prototype.getValue = function(){
				return this.value;
			}

			/**
			 * 定位切高亮
			 */
			MyFind.prototype.centerAtAndHighLight = function(featureAttributes,geometry,map) {
				
				map.graphics.clear();
				
				var x = geometry.x;
				var y = geometry.y;
				var p = new Point(x,y);
				map.centerAt(p);
				
				// 高亮样式
				var highLightSymbol = new SimpleFillSymbol(
						SimpleFillSymbol.STYLE_SOLID,
						new SimpleLineSymbol(
								SimpleLineSymbol.STYLE_SHORTDASHDOTDOT,
								new Color([225,0,0]),
								2
						),
						new Color([251,232,10,0.5])
				);

				// 画圆
				console.info(esri.units);
				var circle ;
				circle = new Circle({
					center:p,
					geodesic : true,
					radius:20,
				});
				
				var graphic = new Graphic(circle,highLightSymbol);
				
				// 设置弹出窗口
				var template = new InfoTemplate();
				template.setTitle(featureAttributes.NAME);
				template.setContent(featureAttributes.NAME);
				graphic.setInfoTemplate(template);
				map.graphics.add(graphic);
			}

			/**
			 * 获得高亮样色
			 * @returns {SimpleFillSymbol}
			 */
			MyFind.prototype.getHighLightSymbol = function(){
				var highLightSymbol = new SimpleFillSymbol(
						SimpleFillSymbol.STYLE_SOLID,
						new SimpleLineSymbol(
								SimpleLineSymbol.STYLE_SILID,
								new Color([255,0,0]),3
						),
						new Color([125,125,125,0.35])
				);
				return highLightSymbol;
			}
			/**
			 * 查找函数
			 */
			MyFind.prototype.find = function(){
				if(this.layerUrls == undefined){
					console.info("没设置layers");
					return ;
				}
				if(this.fileds == undefined){
					console.info("没设置 fileds");
					return ;
				}
				if(this.value == undefined){
					console.info("没设置 value");
					return ;
				}
				
				var layerUrls = this.layerUrls;
				var fileds = this.fileds;
				var value = this.value;
				var myRResults = [];
				for(var i = 0 ; i < layerUrls.length ; i++) {
					
					var queryTask = new QueryTask(layerUrls[i]);
					var query = new Query();
					query.returnGeometry = true;
					query.outFields = fileds;
					query.text = value;
					queryTask.execute(query,showResults);
					
					function showResults(results){
						var resultItems = [];
						var resultCount = results.features.length;
						for(var i = 0 ; i < resultCount ; i++){
							var featureAttributes = results.features[i].attributes;
							var geometry = results.features[i].geometry;
							var json = {"featureAttributes":featureAttributes,"geometry":geometry};
							myRResults.push(json);
						}
//						console.info(myRResults);
						this.results = myRResults;
					}
				}
			}

		/*******************************************查询类*****************************************************/

			/*******************************************************************
			 * API***************************************** 一：类总览
			 * 1、MyHomeButton（没什么用） 2、MyScalebar（没什么用）
			 * 3、MyDynamicMapServiceLayer 4、MyMap 5、MyFeatureLayer 6、MyGraphic类
			 * 7、MyToolbar类
			 * 
			 * 二：详细用法 1、MyHomeButton（没什么用） 2、MyScalebar（没什么用）
			 * 3、MyDynamicMapServiceLayer 1:setUrl: 描述： 设置图层的URL。 是否必须： 是。 例子：
			 * myDynamicMapServiceLayer.setUrl("http://localhost:6080/arcgis/rest/services/guangZhou/gz100000/MapServer");
			 * 
			 * 2:setId: 描述： 设置图层的ID。 是否必须： 否。
			 * 若设置了图层的ID，可以通过map对象的map.getLayer(id) 拿出该图层方便点。 例子：
			 * myDynamicMapServiceLayer.setId("myLayer");
			 * 
			 * 3:setOpacity: 描述： 设置图层的透明度。 是否必须： 否。 默认为1。 例子：
			 * myDynamicMapServiceLayer.setOpacity(0.5);
			 * 
			 * 4:setDynamicMapServiceLayerOptions: 描述： 设置图层的属性。 是否必须： 否。
			 * 不设置的话就以上面设置的那些属性为属性。否则以该属性为属性。option对象写法参照arcgis官方文档。
			 * 
			 * 5:setInfoTemplate: 描述: 设置信息窗口对象。 是否必须： 否
			 * 如果设置了要显示信息窗口，但是没设置这样，有默认的标题的内容。否则请通过下面设置。
			 * 
			 * 6:setInfoTemplateTitle: 描述： 设置信息窗口的标题 是否必须： 否。 默认标题为：“请设置标题” 例子：
			 * myDynamicMapServiceLayer.setInfoTemplateTitle("的的标题");
			 * 
			 * 7:setInfoTemplateContent: 描述： 设置信息窗口的内容 是否必须： 否。 默认标题为：“请设置内容”
			 * 例子： myDynamicMapServiceLayer.setInfoTemplateContent("我的内容");
			 * 
			 * 8:setVisibleLayers: 描述： 设置可见子图层。 是否必须： 否。 默认全显示。 例子：
			 * myDynamicMapServiceLayer.setVisibleLayers([3,4,5]);
			 * 
			 * 9:setIfWantToHaveAInfoTemplate: 描述： 设置是否要支持点击后显示信息窗口 是否必须： 否。
			 * 默认不显示。 例子：
			 * myDynamicMapServiceLayer.setIfWantToHaveAInfoTemplate(false);
			 * 
			 * 10:setMap: 描述： 如果有设置 map，则自动把生成的图层注入到该map上面。 是否必须： 否 例子：
			 * myDynamicMapServiceLayer.setMap(myMap);
			 * 
			 * 11:getArcGISDynamicMapServiceLayer: 描述： 获取生成的图层。 例子：
			 * myDynamicMapServiceLayer.getArcGISDynamicMapServiceLayer();
			 * 
			 * 12: createALayer: 描述： 根据上面的设置生成一个图层。 例子：
			 * myDynamicMapServiceLayer.createALayer()
			 * 
			 * 4、MyMap 1：setDomName: 描述： 设置map对象所要注入的HTML节点。 是否必须： 是。 例子： var
			 * myMap = new MyMap(); myMap.setDomName("map");
			 * 
			 * 2：setCenter： 描述： 设置map的中心点经纬度。 是否必须： 否。 若不设置，则默认中心点。 例子：
			 * myMap.setCenter([113.39, 23.053]);
			 * 
			 * 3：setHomeButtonDomName： 描述： 设置主页按钮要注入的HTML节点。 是否必须： 否。
			 * 若不设置，则没有主页按钮。 例子： <div id="HomeButton"></div>
			 * myMap.setHomeButtonDomName("HomeButton");
			 * 
			 * 4：setIfShowScalebar： 描述： 是否显示比例尺。 是否必须： 否。
			 * 默认为true，即显示比例尺。若不显示比例尺，则设置为false。 例子：
			 * myMap.setIfShowScalebar(true);
			 * 
			 * 5：setOverviewMapDomName： 描述： 设置应沿途要注入的HTML节点。 是否必须： 否。
			 * 若不设置，则默认不显示。 例子： myMap.setCenter([113.39, 23.053]);
			 * 
			 * 6：getMap： 描述： 获取最后生成的map对象。 例子： myMap.getMap();
			 * 
			 * 7：getHomeButton： 描述： 获取生成的HomeButton对象。。 例子：
			 * myMap.getHomeButton();
			 * 
			 * 8：getScalebar： 描述： 获取生成的Scalebar对象。。 例子： myMap.getScalebar();
			 * 
			 * 9：getOverviewMap： 描述： 获取生成的OverviewMap对象。。 例子：
			 * myMap.getOverviewMap();
			 * 
			 * 10: createAMap : 描述： 根据上面的设置，创建一个map对象。 返回 ： 返回生成的map对象 例子： var
			 * map = myMap.createAMap();
			 * 
			 * 5、MyFeatureLayer 6、MyGraphic类 7、MyToolbar类
			 * API*******************************************
			 ******************************************************************/

			/** *****************************************以下为开发代码************************************************* */
			Ext.require('Ext.*');
			// 创建map对象

			var myMap = new MyMap();
			myMap.setDomName("map");
			myMap.setIfShowScalebar(false);
			myMap.setHomeButtonDomName("HomeButton");
//			myMap.setOverviewMapDomName("yingYanTu");
			// myMap.setOverviewMapDomName("OverviewMap");
			var map = myMap.createAMap();

			var flagflag = false;
			
			// 拖动开始前触发的函数
//			map.on("mouse-drag-start", function() {
//				console.dir(6666666);
//			});
//			dojo.connect(map,"onZoomStart",deleteResourceName);
//			function deleteResourceName(){
//				console.dir(6666666);
//			}
			// 加入海南地图
			var myDynamicMapServiceLayer = new MyDynamicMapServiceLayer();
			//myDynamicMapServiceLayer.setUrl("http://localhost:6080/arcgis/rest/services/GuangZhou/gz100000/MapServer");
//			myDynamicMapServiceLayer.setUrl("http://59.50.104.72:6080/arcgis/rest/services/haiNan/haiNan/MapServer");
//			myDynamicMapServiceLayer.setUrl("http://10.110.110.112:6080/arcgis/rest/services/haiNan/haiNan/MapServer");
			myDynamicMapServiceLayer.setUrl("http://10.110.110.51:6080/arcgis/rest/services/haiNan/haiNan/MapServer");
			var dynamicMapServiceLayer = myDynamicMapServiceLayer.createALayer();
			map.addLayer(dynamicMapServiceLayer);
			
			// 地图加载时的蒙版
			var layersLoaded = 0;
			var loading = dojo.byId("loadingImg");
			dojo.connect(map,"onLoad",showLoading);
			dojo.connect(map,"onZoomStart",showLoading);
			dojo.connect(map,"onPanStart",showLoading);
			dojo.connect(dynamicMapServiceLayer,"onUpdate",hideLoading);
			function showLoading(){
				esri.show(loading);
				map.disableMapNavigation();
				map.hideZoomSlider();
			}
			function hideLoading(){
				layersLoaded ++;
				if(layersLoaded === map.layerIds.length){
					esri.hide(loading);
					map.enableMapNavigation();
					map.showZoomSlider();
					layersLoaded = 0;
				}
			}
			
			
			map.on("extent-change", function(extent) {
				// 这里根据extent的范围去数据库查找。
				// console.info("这里填根据extent的范围去数据库查找的代码:");
				// console.info(extent);
				xmax = extent.extent.xmax;
				xmin = extent.extent.xmin;
				ymax = extent.extent.ymax;
				ymin = extent.extent.ymin;
				
				
				// test over
				var chaZhi = xmax - xmin;
				if(chaZhi < 0.015932870895056794){
					dynamicMapServiceLayer.setVisibleLayers([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
				}
				else if(chaZhi < 0.06316245247674601){
					dynamicMapServiceLayer.setVisibleLayers([0,1,2,3,4,5,6,7,8,9,10,11,12,14,15,16]);
				}
				else if(chaZhi < 0.2549259343205108){
					dynamicMapServiceLayer.setVisibleLayers([10,2,15,16]);
				}
				
				else if(chaZhi < 0.5098518686410216){
					dynamicMapServiceLayer.setVisibleLayers([12,15,16]);
				}
				else {
					dynamicMapServiceLayer.setVisibleLayers([12,16]);
				}
				if(chaZhi > 0.06316245247674601){
					setTimeout(function(){
						$("#replaceDom").replaceWith("<div id='replaceDom'></div>");
					},100);
				}
				// test over
				if (flagflag) {
					getResources(resourcesArray, xmax, xmin, ymax, ymin);
					pCreatTitleOnMap();
				}
				flagflag = true;

			});
			
			// 鼠标点击start事件
			dojo.connect(dojo.byId("map"),"onmousedown",function(){
				// 清楚文字 
				$("#replaceDom").replaceWith("<div id='replaceDom'></div>");
			});
			
			// 鼠标点击结束事件
			dojo.connect(dojo.byId("map"),"onmouseup",function(){
				// 显示文字
				creatTitleOnMap();
			});
			
			// 鼠标点击事件，实现点击获取点击到的图标
			map.on("click", function(evt){
				var graphic = evt.graphic;
				if(graphic != undefined){
					console.info("graphic");
					console.dir(graphic);
					var x = graphic.geometry.x;
					var y = graphic.geometry.y;
					var point = new Point(x,y);
//					map.centerAt(point);
				}
				
				
				
				// 通过下面这个ID区查找出该资源的具体信息
				//var id = attributes.id;
				
				// 下面的图标可以改变图片，但要经过下面的刷新layer
				//graphic.symbol.url = "../images/home.png";
				//if(layers != undefined){
				//	for(var i = 0 ; i < layers.length ; i++){
				//		layers[i].refresh();
				//	}
				//}
				//else {
				//	console.info("点击图标改变图片的函数里，layers == undefined");
				//}
			});

			var myFeatureLayer = new MyFeatureLayer();

			// 画图工具
			var myToolbar = new MyToolbar();
			myToolbar.setCircleDomName("circle");
			myToolbar.setClearDomName("clear");
			myToolbar.setPolygonDomName("polygon");
			myToolbar.setFreehandPolygonDomName("freehandPolygon");
			myToolbar.setFreeHandPolylineDomName("freeHandPolyline");
			myToolbar.setArrowDomName("arrow");
			myToolbar.setPointerDomName("pointer");
			myToolbar.setMap(map);

			/**
			 * 
			 * ArgGis地图资源显示面板
			 * 
			 * @ProjectName : GISMap
			 * @Package : js
			 * @ClassName : resourceManagePanel
			 * @Description : ArgGis地图资源显示面板
			 * @Author : TimTsang
			 * @CreateDate : 2014年11月26日
			 * @Version : [v1.0]
			 * 
			 */

			// 记录每一次向后台获取的具体资源的数组
			var dResourcesArray = [];
			// 资源树的全局变量
			var resourcesArray = [];
			//定位时向后台获具体取资源的数组
			var pResourcesArray = [];
			// 事件id
			var eventId = null;
			// 定位点id
			var checkedId = null;
			//群调电话数组
			var qunDiaoDuPhoneArray = [];
			//全部资源种类编号
			var AllResArray = [];

			//电话数组对象
			var qunDiaoDuPhoneArrayObj;

			//标记选择框是否被修改过的标记
			var qunDiaoDuPhoneArrayObjAll = true;
			
			//信息推送定位函数
			function GisMapNewsLocation(autoMessage){
					//console.dir("autoMessage:");
					//console.dir(autoMessage);
					try{
						newLongitude = autoMessage.longitude;
						newLatitude = autoMessage.latitude;
						if(newLongitude > 0 && newLatitude > 0){
							newTitle = autoMessage.username;
							newPictureUrl = "../GISMap/images/tuDing.gif";
							newParentLayer = "001";
							newFuntionButtonDiv = "<div>" + autoMessage.text + "</div>";
							newDomID = autoMessage.id;
							childrenData = '';
							globalCreatIcon(newTitle,newPictureUrl,newParentLayer,
								newLongitude,newLatitude,newFuntionButtonDiv,newDomID,childrenData);
							// 生成定位坐标
							var point = new Point(newLongitude, newLatitude,
									new SpatialReference({
												wkid : 4326
											}));

							// 定位
							map.centerAt(point);
						}else{
							console.info("经纬度不完整，无法定位！");
						}
					}catch(e){
						console.info("信息推送定位出错！");
					}
			};
			//主页操作定位函数
			function GisMapLocation(toLocateLongitude,toLocateLatitude){
				document.getElementById("map_layers").style.cursor = "url('../../pages/GISMap/images/tuDing.cur'),pointer";
				bangDingShuBiaoDianJiShiJian =  dojo.connect(map, "onClick", function(evt){
					//clientX: 428  clientY: 238
					var x = evt.clientX;
					var y = evt.clientY;
					var screenPointnew = new esri.geometry.ScreenPoint(x, y);
					var point = map.toMap(screenPointnew);
					//经度
					var longitude = point.x;
					//纬度
					var latitude = point.y;

					Ext.Msg.confirm('温馨提示', '经度:' +  longitude +'<br/>'+  '纬度:' +  latitude , function(btn){
                        if (btn == 'yes') {
                            //确认点击后		
//							window.opener.Ext.getCmp("eventLongitude").setValue(longitude);
//							window.opener.Ext.getCmp("eventLatitude").setValue(latitude);
//                        	console.dir("console.dir(toLocateLongitude);");
//                        	console.dir(toLocateLongitude);
                        	toLocateLongitude.setValue(longitude);
                        	toLocateLatitude.setValue(latitude);
							dojo.disconnect(bangDingShuBiaoDianJiShiJian);
                        }
                    });

				});
			};
			//获取事件id
			function getEventId(currentEventId){
				eventId = currentEventId;
				eventId = Ext.encode(eventId);//将字符串转化为对象
				console.info("地图中-当前处理的事件id为：");
				console.info(eventId);
			}
			
			$(function(){
				toLocation = GisMapLocation;
				newsLocation = GisMapNewsLocation;
				getCurrentEventId = getEventId;
			});
			
			//获取电话数组
			function getPhoneArray() {
					qunDiaoDuPhoneArray = [];
						qunCheckedGroupItems = Ext.getCmp('qunCheckedGroup').items.items;
						//console.dir(qunCheckedGroupItems);
						for(var i in qunCheckedGroupItems){
							if(qunCheckedGroupItems[i].checked){
								if(qunCheckedGroupItems[i].telephone){
									qunDiaoDuPhoneArray.push(qunCheckedGroupItems[i].telephone);
								}
								
							}
						}
						console.dir(qunDiaoDuPhoneArray);
					
				}
			
			//在地图上生成图标信息
			function creatTitleOnMap(){
				var HTMLString = "<div  id='replaceDom'>";
				setTimeout(function(){
					var chaZhi = xmax - xmin;
					if(chaZhi >= 0.1174629671602554){
						$("#replaceDom").replaceWith("<div id='replaceDom'></div>");
					}
					else {
						for(var i = 0; i < dResourcesArray.length;i++){
							
							var info = dResourcesArray[i][2];
							var id  = info.id;
							var name = info.resourceName;
							var long = info.longitude;
							var lat = info.latitude;
							var point = new Point(long,lat);
							var screenPoint = map.toScreen(point);
							var x = screenPoint.x - 20;
							var y = screenPoint.y + 30;
							var width = name.length * 17;
							HTMLString += "<div class='resourceName' id='"+ id +"' style='z-index:1;position:absolute;left:" + x + "px;top:" + y +"px;height:30px;width:"+width+"px;'>"+ name + "</div>"
						}
						HTMLString += "</div>";
						$("#replaceDom").replaceWith(HTMLString);
					}
				},100);
				
			}
			
			//定位时在地图上生成图标信息
			function pCreatTitleOnMap(){
				var positionHTMLString = "<div  id='positionReplaceDom'>";
				setTimeout(function(){
					var chaZhi = xmax - xmin;
					if(chaZhi >= 0.1174629671602554){
						$("#positionReplaceDom").replaceWith("<div id='positionReplaceDom'></div>");
					}
					else {
						for(var i = 0; i < pResourcesArray.length;i++){
							var info = pResourcesArray[i][2];	
							var id  = info.id;
							var name = info.resourceName;
							var long = info.longitude;
							var lat = info.latitude;
							var point = new Point(long,lat);
							var screenPoint = map.toScreen(point);
							var x = screenPoint.x - 20;
							var y = screenPoint.y + 30;
							var width = name.length * 17;
							//console.dir(width);
							positionHTMLString += "<div class='resourceName' id='"+ id +"' style='z-index:1;position:absolute;left:" + x + "px;top:" + y +"px;height:30px;width:"+width+"px;'>"+ name + "</div>"
						}
						positionHTMLString += "</div>";
						$("#positionReplaceDom").replaceWith(positionHTMLString);
					}
				},100);
				
			}
			
			
			//创建虚拟节点的全局函数
			function globalCreatDom(DomType,id,className,type,LayerId){
				var xuNiDom = new XuNiDom();
				xuNiDom.setDomType(DomType);
				currentDomType = xuNiDom.getDomType();
				xuNiDom.setId(id);
				xuNiDom.setClassName(className);
				xuNiDom.setType(type);
				xuNiDom.creatDom(LayerId,currentDomType);
				//console.info("globalCreatDom()已被成功调用！");
			};
			
			//创建功能按钮div的函数
			function globalCreatButtonDiv(thisVideoId,indexCode,phoneNumber,sentTaskJson){
				
				var funButtonDiv;
//				qunDiaoDuPhoneArray = [];
//				qunDiaoDuPhoneArray.push(phoneNumber);
//				qunDiaoDuPhoneArrayObj = Ext.encode(qunDiaoDuPhoneArray);//将数组转化为对象
				//若有视频的id则窗口直接显示视频
				
				if (thisVideoId) {
					
					var videoIframeId = "../../../../../getVideoParam.action?cameraId=" + indexCode;
					//实现跨域请求
					funButtonDiv = "<iframe src='js/playView/index.html#" + videoIframeId + "' " + "id='videoIframe' frameborder=0 width=550px height=400px>"+"</iframe>";
		
				}else{
					funButtonDiv = "<div id='contain'>"+ "<ul class='tt-wrapper'>";
					//phoneNumber = 1238000;
					if(phoneNumber){
						funButtonDiv +=  "<li><a class='phone' id='phone' onclick='window.globalGetPhoneNumber(" + phoneNumber + ")'></a></li>";
					}
					funButtonDiv += "<li><a class='message'></a></li>";
					funButtonDiv += "<li><a class='sentTasks' onclick='window.opener.globalGetTaskJson(" + sentTaskJson + "," + eventId + ")'></a></li>";
					funButtonDiv += "<li><a class='apparatus'></a></li>";
					funButtonDiv += "</ul>" + "</div>";
				}
				return funButtonDiv;
			}

			//创建相应图标的全局函数
			function globalCreatIcon(newTitle,newPictureUrl,newParentLayer,newLongitude,newLatitude,newFuntionButtonDiv,newDomID,childrenData){
				var sResourcesArray = [];
				var myGraphic = new MyGraphic();
				var title = "<b>" + newTitle + "</b>";
				myGraphic.setPictureUrl(newPictureUrl);
				myGraphic.setBeyondLayer(map.getLayer(newParentLayer));
				myGraphic.setX(newLongitude);
				myGraphic.setY(newLatitude);
				myGraphic.setInfoTemplateTitle(title);
				myGraphic.setInfoTemplateContent(newFuntionButtonDiv);
				myGraphic.setDomID(newDomID);
				var orgGraphic = myGraphic.createGraphic();


				// 将单个图标的父图层id和图层对象装入数组
				sResourcesArray.push(newParentLayer);
				//console.dir("sResourcesArray");
				//console.dir(sResourcesArray);
				sResourcesArray.push(orgGraphic);
				sResourcesArray.push(childrenData);
				dResourcesArray.push(sResourcesArray);
				//console.info("globalCreatIcon()已被成功调用！");
			};

			// 删除虚拟节点函数
			function deleteXuNiDom() {
				var inputClass = document.getElementsByTagName("input");
				for (var i = 0; i < inputClass.length; ++i) {
					var className = inputClass[i].getAttribute('class');
					if (className == "graphic") {
						inputClass[i].parentNode.removeChild(inputClass[i]);
					}
				}
			};

			// 画圆时弹出窗口
			function alertQunDiaoDuWin(jsonObjData, xmax, ymax, ymin) {
				var items = [];
				for(var i in jsonObjData){
					for(var j in jsonObjData[i].children){
						var checkConfig = {boxLabel:jsonObjData[i].children[j].boxLabel,
								name:jsonObjData[i].children[j].name,
								inputValue:jsonObjData[i].children[j].inputValue,
								checked:false,telephone:jsonObjData[i].children[j].telephone};
						items.push(checkConfig);
						
					}
					
				}
//				var items = [];
//				for(var i in jsonObjData){
//					for(var j in jsonObjData[i].children){
//						items.push(jsonObjData[i].children[j]);
//						console.info(6666);
//						console.info(jsonObjData[i].children[j]);
//						
//					}
//					
//				}
				//var items = jsonObjData.children[0];
				var point = new Point(xmax, ((ymax - ymin) / 2),
						new SpatialReference({
									wkid : 4326
								}));

				var screenPoint = map.toScreen(point);

				var x = screenPoint.x;// 屏幕中的宽度
				var y = screenPoint.y;// 屏幕中的高度
				
				// 动态设置窗口的高度宽度和复选框的列数
				var winHeight = 330;

				var winWidth = 180;

				var columnsVaule = 0;

				for (var i = 0; i < items.length; i++) {
					if (i % 10 == 0) {
						winWidth += 150;
						columnsVaule++;
					}
				}

				var qunCheckedGroup = Ext.create('Ext.form.CheckboxGroup', {
							// extend : 'Ext.form.RadioGroup',
							id : 'qunCheckedGroup',
							name : 'qunCheckedGroup',
							//cls: 'x-check-group-alt',
							columns : columnsVaule,
							padding : 5,
							width : winWidth + 30,
							//layout: 'columns',
							items : items,
							listeners : {
									'change' : function(item, newValue,oldValue, eOpts) {
										getPhoneArray();
										qunDiaoDuPhoneArrayObj = Ext.encode(qunDiaoDuPhoneArray);//将数组转化为对象
										qunDiaoDuPhoneArrayObjAll = false;
										Ext.getCmp("qunDaoDuWinDiv").body.dom.innerHTML = "<span id='qunDaoDuWinDiv-outerCt' style='width: 100%; height: 100%; display: table; table-layout: fixed;'><div id='qunDaoDuWinDiv-innerCt' style='height: 100%; vertical-align: top; display: table-cell;'><div id='contain'><ul class='tt-wrapper'><li><a class='phone' id='phone' onclick='window.globalCallPhoneNumberArray(" + qunDiaoDuPhoneArrayObj + ")'></a></li><li><a class='message'></a></li><li><a class='sentTasks'></a></li><li><a class='apparatus'></a></li></ul></div></div></span>";
										
									}
								}
						});
				getPhoneArray();

				if(qunDiaoDuPhoneArrayObjAll == true){
					console.dir(qunDiaoDuPhoneArray);
					qunDiaoDuPhoneArrayObj = Ext.encode(qunDiaoDuPhoneArray);//将数组转化为对象
					//集群调度功能按钮div
					var qunFunButtonDiv = "<div id='contain'>"+ "<ul class='tt-wrapper'>"
					 + "<li><a class='phone' id='phone' onclick='window.globalCallPhoneNumberArray(" + qunDiaoDuPhoneArrayObj + ")'></a></li>"
					 + "<li><a class='message'></a></li>"
					 + "<li><a class='sentTasks'></a></li>"
					 + "<li><a class='apparatus'></a></li>"
					 + "</ul>" + "</div>";
				}

				//创建窗口
				var win = Ext.create('Ext.window.Window', {
					title : '集群调度',
					id : 'qunDaoDuWin',
					//closable : true,
					maximizable : false,
					width : winWidth,
					height : winHeight,
					resizable : false,
					modal : true,
					layout : {
						type : 'border',
						padding : 0
					},
					items : [{
						region : 'center',
						title : '请选择',
						xtype : 'panel',
						items : [qunCheckedGroup]
					}, {
						region : 'west',
						title : '调度',
						id : 'qunDaoDuWinDiv',
						width : 80,
						split : true,
						collapsible : false,
						//floatable : false,
						html:qunFunButtonDiv
					}]

				});
				win.show();
			}

			// 获取后台具体资源函数
			function getResources(resourcesArray, xmax, xmin, ymax, ymin) {
				// 标记是全部资源还是相关资源的变量
				var aboutResources = null;
				if (Ext.getCmp("allRes").checked) {
					aboutResources = Ext.getCmp("allRes").inputValue;
				} else if (Ext.getCmp("relativeRes").checked) {
					aboutResources = Ext.getCmp("relativeRes").inputValue;
				}

				// 标记是可用资源还是不可用资源的变量
				var able = null;
				if (Ext.getCmp("available").checked
						&& Ext.getCmp("unable").checked) {
					able = '2';
				} else if (!Ext.getCmp("available").checked 
						&& !Ext.getCmp("unable").checked) {
					able = '2';
				} else if (Ext.getCmp("available").checked) {
					able = Ext.getCmp("available").inputValue;
				} else if (Ext.getCmp("unable").checked) {
					able = Ext.getCmp("unable").inputValue;
				}
				// 向后台发请求具体资源
				Ext.Ajax.request({
					method : "POST",
					//url : 'resources/data/allSpecificResources.json',
					url:'../../../resource/gis_resource!getResourcePoints.action',
					params : {
						eventId : eventId,
						resourcesArray : resourcesArray,
						aboutResources : aboutResources,
						able : able,
						maxLongitude : xmax,
						minLongitude : xmin,
						maxLatitude : ymax,
						minLatitude : ymin
						,
					},
					success : function(response, options) {
						jsonObj = Ext.decode(response.responseText);
						if (jsonObj.result == true) {
								if(dResourcesArray){
									for (var i = 0; i < dResourcesArray.length; i++) {
										try{
											map.getLayer(dResourcesArray[i][0]).remove(dResourcesArray[i][1]);
										}catch(e){
											console.info("无法删除图标！");
										}
								}
							}
							
							//console.dir(jsonObj);
							dResourcesArray = [];
							
							for (var i in jsonObj.data) {
								for (var j in jsonObj.data[i].children) {
									//单个具体资源的具体信息
									var sentTaskJson = Ext.encode(jsonObj.data[i].children[j]);
									try{
										// 单个调度窗口的div
										var funtionButtonDiv = globalCreatButtonDiv(jsonObj.data[i].children[j].cameraId,
												jsonObj.data[i].children[j].resourceId,
												jsonObj.data[i].children[j].telephone,sentTaskJson);
									}catch(e){
										cosnoel.info("无法生成单个调度窗口的div！");
									}
									try{
										//生成对应的图标
										globalCreatIcon(jsonObj.data[i].children[j].resourceName,
												jsonObj.data[i].children[j].pictureUrl,
												jsonObj.data[i].children[j].LayerId,
												jsonObj.data[i].children[j].longitude,
												jsonObj.data[i].children[j].latitude,
												funtionButtonDiv,jsonObj.data[i].children[j].id,
												jsonObj.data[i].children[j]);
									}catch(e){
										console.info("获取资源时无法生成对应的图标！");
									}
								}

							}
							
							creatTitleOnMap();
							
							console.dir("图标资源数组：");
							console.dir(dResourcesArray);
						}
					},
					failure : function() {
						Ext.Msg.show({
									title : '错误提示',
									msg : '数据加载失败！',
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.ERROR
								});
					}
				});
				//console.info("getResources()函数已被调用,已获取后台资源");
			};

			// 画圈时向后台获取资源的函数
			function circleGetResources(resourcesArray, xmax, xmin, ymax, ymin) {
				// 标记是全部资源还是相关资源的变量
				var aboutResources = null;
				if (Ext.getCmp("allRes").checked) {
					aboutResources = Ext.getCmp("allRes").inputValue;
				} else if (Ext.getCmp("relativeRes").checked) {
					aboutResources = Ext.getCmp("relativeRes").inputValue;
				}

				// 标记是可用资源还是不可用资源的变量
				var able = null;
				if (Ext.getCmp("available").checked
						&& Ext.getCmp("unable").checked) {
					able = '2';
				} else if (!Ext.getCmp("available").checked
						&& !Ext.getCmp("unable").checked) {
					able = '2';
				} else if (Ext.getCmp("available").checked) {
					able = Ext.getCmp("available").inputValue;
				} else if (Ext.getCmp("unable").checked) {
					able = Ext.getCmp("unable").inputValue;
				}

				// 向后台发请求具体资源
				Ext.Ajax.request({
					method : "POST",
					//url : 'resources/data/allSpecificResources.json',
					url:'../../../resource/gis_resource!getResourcePoints.action',
					params : {
						resourcesArray : AllResArray,
						aboutResources : aboutResources,
						able : able,
						maxLongitude : xmax,
						minLongitude : xmin,
						maxLatitude : ymax,
						minLatitude : ymin
						,
					},
					success : function(response, options) {
						console.dir(response);
						jsonObj = Ext.decode(response.responseText);
						console.dir("画圈时获取的资源:");
						console.dir(jsonObj);
						if (jsonObj.result == true) {
							try{
								alertQunDiaoDuWin(jsonObj.data, xmax, ymax, ymin);
							}catch(e){
								console.info("无法弹出集群调度窗口！");
							}
							for (var i = 0; i < dResourcesArray.length; i++) {
								try{
									map.getLayer(dResourcesArray[i][0]).remove(dResourcesArray[i][1]);
								}catch(e){
									console.info("无法删除图标！");
								}
							}
							dResourcesArray = [];
							var flag = true;
							for (var i in jsonObj.data) {
								for (var j in jsonObj.data[i].children) {
									//具体资源的具体信息
									var sentTaskJson = Ext.encode(jsonObj.data[i].children[j]);
									// 集群调度窗口的div
									try{
										var funtionButtonDiv = globalCreatButtonDiv(jsonObj.data[i].children[j].cameraId,
												jsonObj.data[i].children[j].resourceId,
												jsonObj.data[i].children[j].telephone,sentTaskJson);
									}catch(e){
										console.info("无法生成集群调度窗口的div！");
									}
									try{
										//生成对应的图标
										globalCreatIcon(jsonObj.data[i].children[j].resourceName,
											jsonObj.data[i].children[j].pictureUrl,
											jsonObj.data[i].id,
											jsonObj.data[i].children[j].longitude,
											jsonObj.data[i].children[j].latitude,
											funtionButtonDiv,jsonObj.data[i].children[j].id,
											jsonObj.data[i].children[j]);
									}catch(e){
										console.info("画圈时无法生成对应的图标！");
									}
								}

							}
							try{
								creatTitleOnMap();
							}catch(e){
								console.info("画圈时无法生成对应图标的标题！");
							}
						} else {
							Ext.Msg.show({
										title : '错误提示',
										msg : '数据加载失败！',
										buttons : Ext.Msg.OK,
										icon : Ext.Msg.ERROR
									});
						}
					},
					failure : function(response, options) {
						console.dir(response);
						Ext.Msg.show({
									title : '错误提示',
									msg : '数据加载失败！',
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.ERROR
								});
					}
				});
				//console.info("circleGetResources()函数已被调用,已获取后台资源");
			};

			// 定位函数
			function searchPoint(jsonObj, checkedId) {
				for (var i in jsonObj.data) {
					if (jsonObj.data[i].resourceId == checkedId) {
						var searchLongitude = jsonObj.data[i].longitude;
						var searchLatitude = jsonObj.data[i].latitude;
						//单个具体资源的具体信息
						var sentTaskJson = Ext.encode(jsonObj.data[i]);
						try{
							// 单个调度窗口的div
							var funtionButtonDiv = globalCreatButtonDiv(jsonObj.data[i].cameraId,
									jsonObj.data[i].resourceId,
									jsonObj.data[i].telephone,sentTaskJson);

						}catch(e){
							console.info("单个调度窗口的div生成失败！");
						}
//						for(var j in jsonObj.data[i]){
//							var funtionButtonDiv = globalCreatButtonDiv(jsonObj.data[i].cameraId,
//									jsonObj.data[i].children[j].resourceId,
//									jsonObj.data[i].telephone,sentTaskJson);
//
//						}
						// 生成对应的图标
						try{
							var myGraphic = new MyGraphic();
							var title = "<b>" + jsonObj.data[i].boxLabel + "</b>";
							myGraphic.setPictureUrl(jsonObj.data[i].pictureUrl);
							myGraphic.setBeyondLayer(map.getLayer(jsonObj.data[i].LayerId));

							myGraphic.setX(searchLongitude);
							myGraphic.setY(searchLatitude);
							
							myGraphic.setInfoTemplateTitle(title);
							myGraphic.setInfoTemplateContent(funtionButtonDiv);
							myGraphic.setDomID(checkedId);
							var orgGraphic = myGraphic.createGraphic();
						}catch(e){
							console.info("定位时无法生成对应的图标！");
						}
						
						var sResourcesArray = [];
						// 将单个图标的父图层id和图层对象装入数组
						sResourcesArray.push(jsonObj.data[i].LayerId);
						console.dir("sResourcesArray");
						console.dir(sResourcesArray);
						sResourcesArray.push(orgGraphic);
						sResourcesArray.push(jsonObj.data[i]);
						pResourcesArray.push(sResourcesArray);
						console.dir("pResourcesArray");
						console.dir(pResourcesArray);
						try{
							pCreatTitleOnMap();
						}catch(e){
							console.info("无法生成定位时图标的标题！");
						}
						// 生成定位坐标
						var point = new Point(searchLongitude, searchLatitude,
								new SpatialReference({
											wkid : 4326
										}));

						// 定位
						map.centerAt(point);

					}
				}

			}

			// 模糊查询
			function searchResources(jsonObj) {
				// 动态创建radioGroup
				// var items = eval('(' + response.responseText + ')');
				var items = jsonObj.data;

				// 动态设置窗口的高度宽度和复选框的列数
				var winHeight = 330;

				var winWidth = 200;

				var columnsVaule = 0;

				for (var i = 0; i < items.length; i++) {
					if (i % 10 == 0) {
						winWidth += 150;
						columnsVaule++;
						// if(winHeight > 120){
						// 	winHeight = winHeight-100;
						// }
					}
				}

				var searchRadioGroup = Ext.create('Ext.form.RadioGroup', {
							// extend : 'Ext.form.RadioGroup',
							id : 'searchRadioGroup',
							name : 'searchRadioGroup',
							fieldLabel : '查询结果',
							width : winWidth,
							fieldDefaults : {
								labelWidth : 80,
								labelStyle : 'color:green;padding-left:10px'
							},
							// cls: 'x-check-group-alt',
							columns : columnsVaule,
							items : items
						});
				// 创建窗口
				var win = Ext.create('Ext.window.Window', {
					title : '查询结果',
					id : 'searchWin',
					closable : true,
					maximizable : false,
					width : winWidth,
					height : winHeight,
					resizable : false,
					modal : true,
					tools : [{
								type : 'pin'
							}],
					tbar : [{
						text : '定位到地图上',
						handler : function() {
							//console.info(Ext.getCmp("searchRadioGroup").getValue().name);
							try{
								// 获取被选中的radio选择框的值
								checkedId = Ext.getCmp("searchRadioGroup").getValue().name;
							}catch(e){
								console.info("无法获取radio选择框的值！");
							}
							// 关闭窗口
							if (checkedId != undefined) {
								Ext.getCmp("searchWin").close();
								// 向后台请求具体资源
								Ext.Ajax.request({
									method : "POST",
									//url : 'resources/data/testSearch.json',
									url:'../../../resource/gis_resource!getResourceById.action',
									params : {
										resourceId : checkedId
									},
									success : function(response, options) {
										jsonObj = Ext.decode(response.responseText);
										if (jsonObj.result == true) {
											try{
												searchPoint(jsonObj, checkedId);
											}catch(e){
												console.info("定位失败！");
											}
										} else {
											Ext.Msg.show({
														title : '错误提示',
														msg : '数据加载失败！',
														buttons : Ext.Msg.OK,
														icon : Ext.Msg.ERROR
													});
										}

									},
									failure : function(response, options) {
										Ext.Msg.show({
											title : '错误提示',
											msg : '数据加载失败！',
											buttons : Ext.Msg.OK,
											icon : Ext.Msg.ERROR
										});
//										alert('ERROR' + response.status + '\n'
//												+ resp.responseText);
									}
								});

							} else {
								Ext.Msg.show({
											title : '错误提示',
											msg : '请选择一个需要定位的资源！',
											buttons : Ext.Msg.OK,
											icon : Ext.Msg.ERROR
										});
							}
						}
					}],
					items : [searchRadioGroup]
				});
				win.show();
			};

			// 定义TreeStore
			Ext.define('js.GisTreeStore', {
						extend : 'Ext.data.TreeStore',
						proxy : {
							type : 'ajax',
							actionMethods : 'post',
							//url : 'resources/data/allResources.json',
							url:'../../../resource/resource_type!getAllGis.action',
							reader : {
								type : 'json'
							}
						},
						root : {
							id : 'root',
							expanded : true
						},
						listeners : {
							load : function(store, node, records, successful,eOpts) {
								var me = this;
								if (successful == true) {
									try{
										for (var i in node.childNodes) {
											AllResArray.push(node.childNodes[i].internalId);
											// 创建虚拟节点（父图层）
											globalCreatDom("input",node.childNodes[i].internalId,"featureLayer","checkbox","south");
										}
									}catch(e){
										console.info("无法创建父图层虚拟节点！");
									};
									try{
										// 智能创建FeatureLayer
										myFeatureLayer.setClassName(["featureLayer"]);
										myFeatureLayer.setMap(map);
										myFeatureLayer.setVisableDistance(1.3493048756558892);
										myFeatureLayer.createLayers();
										myToolbar.setLayers(myFeatureLayer.getLayers());
										myToolbar.createToolBar();
									}catch(e){
										console.info("无法智能创建FeatureLayer！");
									};
								}
							}

						}
					});
			//回车或点击查询图标向后台查询资源定位函数
			function toSearchResoure(){
				try{
					var searchValue = Ext.getCmp("searchValue").value;
				}catch(e){
					console.info(Ext.getCmp("searchValue").value);
					console.info("searchValue获取失败！");
				}
				if(searchValue){
					// 向后台发请求查询资源
						Ext.Ajax.request({
							method : "POST",
							//url : 'resources/data/testSearch.json',
							params : {
								searchValue : Ext.getCmp("searchValue").value
							},
							url:'../../../resource/gis_resource!fuzzySearch.action',
							success : function(response,options) {
								jsonObj = Ext.decode(response.responseText);
								if (jsonObj.result == true) {
									try{
										searchResources(jsonObj);
									}catch(e){
										console.info("查找资源失败！");
									}
								} else {
									Ext.Msg.show({
												title : '错误提示',
												msg : '后台返回false！',
												buttons : Ext.Msg.OK,
												icon : Ext.Msg.ERROR
											});
								}

							},
							failure : function(response,options) {
								Ext.Msg.show({
									title : '错误提示',
									msg : '数据请求失败！',
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.ERROR
								});
							}
						});
				}
			}
			// 定义treePanel
			Ext.define('js.resourceManageTree', {
				extend : 'Ext.tree.Panel',
				id : 'manageTreePanel',
				xtype : 'check-tree',
				store : Ext.create('js.GisTreeStore'), // 数据源
				rootVisible : false,
				animate : true,
				frame : false,
				width : '100%',
				height : '100%',
				reserveScrollbar : true,
				border : false,
				autoScroll : true,
				useArrows : true,
				tools : [{
							xtype : 'trigger',
							triggerCls : 'x-form-clear-trigger',
							width : '90%',
							id : "searchValue",
							emptyText : '请输入查询条件',
							enableKeyEvents:true,//允许键盘事件
							listeners:{
								'keydown' : function(e, eOpts){
									var ev = window.event;
									if(ev.keyCode == 13){
										toSearchResoure();
									}
								}
							}
						}, {
							id : 'search',
							qtip : '查询',
							handler : function() {
								toSearchResoure();
							}
						}],
				// 添加监听
				listeners : {
					checkchange : function(node, checked) {
						var me = this;
						if (checked) {
							me.onCheckedNodesClick();
						} else {
							//console.dir(node.internalId);
							var tmpArray = [] ;
							var tmp = [];
							for (var i = 0; i < dResourcesArray.length; i++) {
								if(node.internalId == dResourcesArray[i][0]){
									try{
										//删除图标
										map.getLayer(dResourcesArray[i][0]).remove(dResourcesArray[i][1]);
									}catch(e){
										console.info("无法删除图标！");
									}
								}else{
									tmpArray.push(dResourcesArray[i]);
									tmp.push(dResourcesArray[i][0]);
								}
							}
							dResourcesArray = tmpArray;
							resourcesArray = tmp;
							try{
								creatTitleOnMap();
							}catch(e){
								console.info("无法在地图上生成图标的标题！");
							}
						}
					}
				},

				// 勾选选择项时触发函数
				onCheckedNodesClick : function() {
					try{
						var records = this.getView().getChecked();
						// 获取勾选的大类资源的id
						Ext.Array.each(records, function(rec) {
									resourcesArray.push(rec.get('id'));
								});
					}catch(e){
						console.info("无法获取勾选的大类资源！");
					}
					var tmp = [];
					for(var i in resourcesArray){
						//该元素在tmp内部不存在才允许追加
		                 if(tmp.indexOf(resourcesArray[i])==-1){
		                       tmp.push(resourcesArray[i]);
		                 }
					}
					resourcesArray = tmp;
					try{
						getResources(resourcesArray, xmax, xmin, ymax, ymin);
					}catch(e){
						console.info("无法向后台获取资源！");
					}
				}

			});

			// 定义资源管理Panel
			Ext.define('js.resourceManagePanel', {
				extend : 'Ext.Panel',
				xtype : 'basic-tabs',
				//title:'资源管理',
				border : false,
				height : document.body.clientHeight,
				items : [{
					layout : 'anchor',
					items : [{
						// xtype: 'fieldset',
						layout : 'column',
						padding : 10,
						items : [{
							xtype : 'fieldset',
							defaultType : 'radio',
							layout : 'anchor',
							defaults : {
								anchor : '100%'
							},
							items : [{
								checked : true,
								id : 'allRes',
								boxLabel : '全部',
								name : 'resources',
								inputValue : '0',
								listeners : {
									'change' : function(item, newValue,oldValue, eOpts) {
										if (item.checked) {
											try{
												// 向后台获取资源
												getResources(resourcesArray, xmax,xmin, ymax, ymin);
											}catch(e){
												console.info("无法向后台获取资源！");
											}
										}
									}
								}
							}, {
								id : 'relativeRes',
								boxLabel : '相关',
								name : 'resources',
								inputValue : '1',
								listeners : {
									'change' : function(item, newValue,oldValue, eOpts) {
										if (item.checked) {
											try{
												// 向后台获取资源
												getResources(resourcesArray, xmax,xmin, ymax, ymin);
											}catch(e){
												console.info("无法向后台获取资源！");
											}
										}
									}
								}
							}]
							,

						}, {
							// xtype : 'fieldcontainer',
							xtype : 'fieldset',
							defaultType : 'checkboxfield',
							frame : true,
							items : [{
								boxLabel : '可用',
								name : 'available',
								inputValue : '0',
								checked : true,
								id : 'available',
								listeners : {
									'change' : function(item, newValue,oldValue, eOpts) {
										try{
											// 向后台获取资源
											getResources(resourcesArray, xmax,xmin, ymax, ymin);
										}catch(e){
											console.info("无法向后台获取资源！");
										}
									}
								}
							}, {
								boxLabel : '不可用',
								name : 'unable',
								inputValue : '1',
								id : 'unable',
								listeners : {
									'change' : function(item, newValue,oldValue, eOpts) {
										try{
											// 向后台获取资源
											getResources(resourcesArray, xmax,xmin, ymax, ymin);
										}catch(e){
											console.info("无法向后台获取资源！");
										}
									}
								}
							}]
						}, {
							xtype : 'fieldset',
							defaultType : 'radio',
							layout : 'anchor',
							defaults : {
								anchor : '100%'
							},
							items : [{

								id : 'dongTai',
								boxLabel : '动态',
								name : 'state',
								inputValue : 'dongTai',
								listeners : {
									'change' : function(item, newValue,oldValue, eOpts) {
										if (item.checked) {
											// 打开定时向后台获取资源函数
											// 创建一个任务管理对象
											taskMgr = new Ext.util.TaskRunner();
											// 创建一个任务
											getResourcesTask = {
												run : function() {
													try{
														// 向后台获取资源
														getResources(resourcesArray, xmax,xmin, ymax, ymin);
													}catch(e){
														console.info("无法向后台获取资源！");
													}
												},
												interval : 1000
											};
											// 开始执行任务getResourcesTask
											taskMgr.start(getResourcesTask);
										} else {
											// 停止定时器任务getResourcesTask
											taskMgr.stop(getResourcesTask);
										}
									}
								}
							}, {
								boxLabel : '静态',
								checked : true,
								id : 'jinTai',
								name : 'state',
								inputValue : 'jinTai',
								listeners : {
									'change' : function(item, newValue,
											oldValue, eOpts) {
										if (item.checked) {

										}
									}
								}
							}]
						}]
					}, Ext.create('js.resourceManageTree')]
				}]
			});
		});