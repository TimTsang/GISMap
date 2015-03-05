Ext.onReady(function() {
			$.ajax({
						type : 'POST',
						url : '../../../../../getTVParam.action',
						success : function(response, status, xhr) {
							var TVXML = response;
							console.dir(TVXML);
							SetTvwallInfo(TVXML);
							console.dir(TVXML);
						},
						error : function() {
							Ext.Msg.confirm('温馨提示', '上墙准备出现错误！', function(btn) {
										if (btn == 'yes') {

										}
									});
						}
					});
			window.setTimeout(function() {
						console.dir(window.location.href.split('#')[1]);
						var url = window.location.href.split('#')[1];
						init();
						// 获取浏览器窗体的大小，使视频界面充满窗体
						var h = getInner().height;
						document.getElementById("main").style.height = h + "px";
						getXML(url, "config");
					}, 1000);
		});

// 上墙准备
function SetTvwallInfo(wallXml) {
	var OCXobj = document.getElementById("PlayViewOCX");
	// var wallXml = document.getElementById("config1").value;
	var ret = OCXobj.SetTvwallInfo(wallXml);
}

function getXML(path, box) {
	$.ajax({
				type : 'POST',
				url : path,
				success : function(response, status, xhr) {
					document.getElementById(box).value = response;
					StartPlayView();
				},
				error : function() {
					alert('请求失败');
				}
			});
}

function init() {
	var OCXobj = document.getElementById("PlayViewOCX");
	try {
		OCXobj.SetOcxMode(0);
	} catch (e) {
		Ext.Msg.confirm('温馨提示', '您的浏览器缺少OCX控件，是否下载', function(btn) {
					if (btn == 'yes') {
						// 确认点击后
						location.href = "../../../../../map/map!getMapActiveX.action";
					}
				});
	}
}

function StartPlayView() {
	var OCXobj = document.getElementById("PlayViewOCX");

	// 设置一个窗口显示
	try {
		OCXobj.SetWndNum(1);
	} catch (e) {
		Ext.Msg.confirm('温馨提示', '您的浏览器缺少OCX控件，是否下载', function(btn) {
					if (btn == 'yes') {
						// 确认点击后
						location.href = "../../../../../map/map!getMapActiveX.action";
					}
				});
	}
	var previewXml = document.getElementById("config").value;
	var ret = OCXobj.StartTask_Preview_InWnd(previewXml, 0);

}

// 跨浏览器获取视口大小
function getInner() {
	if (typeof window.innerWidth != 'undefined') {
		return {
			width : window.innerWidth,
			height : window.innerHeight
		}
	} else {
		return {
			width : document.documentElement.clientWidth,
			height : document.documentElement.clientHeight
		}
	}
}
