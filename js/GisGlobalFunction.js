/**
 * 
 * 全局函数
 * 
 * @ProjectName : GISMap
 * @Package : js
 * @ClassName :
 * @Description : 全局函数
 * @Author : TimTsang
 * @CreateDate : 2014年11月25日
 * @Version : [v1.0]
 * 
 */
//信息推送定位函数
var newsLocation;
//主页操作定位函数
var toLocation;

var arrayFlag = false;

//外部传来的JSON值
var globalJson = "{[]}";

//arcgis里面的函数触发的标记
var globalJsonFlag = false;

//电话响应触发的标记
var globalPhoneFlag = false;

//外部传来的电话号码
var thisPhone;

//触发群打电话函数
function globalCallPhoneNumberArray(diaoDuPhoneArrayObj){
	console.dir(diaoDuPhoneArrayObj);
	if(diaoDuPhoneArrayObj.length == 0){
		Ext.MessageBox.show({
	           title: '温馨提示',
	           msg: '您需要调度的资源不存在电话号码或者您并未勾选，请重新选择！',
	           buttons: Ext.MessageBox.OK,
	           icon: Ext.MessageBox.INFO
	       });
	}else{
		Ext.Ajax.request({
			method : "POST",
			url:'/HKCS/meeting.action',
			params : {
				phoneNumList : diaoDuPhoneArrayObj
			},
			success : function(response, options){
				//console.dir(response);
				Ext.MessageBox.show({
			        title: '请稍后',
			        msg: '正在群拨号码...',
			        progressText: '拨号中...',
			        width:300,
			        progress:true,
			        closable:false,
			        modal: false
			        //animateTarget: 'mb6'
			    });
			    // this hideous block creates the bogus progress
			    var f = function(v){
			         return function(){
			             if(v == 12){
			                 Ext.MessageBox.hide();
			             }else{
			                 var i = v/11;
			                 //Ext.MessageBox.updateProgress(i, Math.round(100*i)+'% completed');
			                 Ext.MessageBox.updateProgress(i, '拨号中...');
			                 
			             }
			        };
			    };
			    for(var i = 1; i < 13; i++){
			        setTimeout(f(i), i*200);
			    }
			},
			failure : function(response, options) {
				//console.dir(response);
				Ext.Msg.show({
							title : '错误提示',
							msg : '群拨号码失败！',
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.ERROR
						});
			}
		});
	}
}
// alert(window.parent.zjx);
// window.parent.KX.globalFunction.sendMessageToMail();


//获取单个调度时的单个电话号码
// function globalGetPhoneNumber(phoneNumber){
// 	alert(phoneNumber);
// }

//获取单个调度时的任务JSON数据
//function globalGetTaskJson(sentTaskJson){
//	console.dir(sentTaskJson);
//}

// //获取群集调度时的电话数组
// function globalGetPhoneArray(qunDiaoDuPhoneArrayToString){
// 	//arrayFlag = true;
// 	//var qunDiaoDuPhoneArray = qunDiaoDuPhoneArrayToString.split("+");  
// 	alert(qunDiaoDuPhoneArrayToString);
// 	console.dir(qunDiaoDuPhoneArrayToString);
// }

// Ext.onReady(function(){
// 		Ext.Ajax.request({
// 		method : "POST",
// 		url : 'resources/data/testGlobalJson.json',
// 		success : function(response, options) {
// 			jsonObj = Ext.decode(response.responseText);
// 			console.dir(jsonObj.result);
// 			if(jsonObj.result){

// 				newTitle = jsonObj.list[0].eventName;
// 				console.dir(jsonObj.list[0]);
// 				newPictureUrl = "../GISMap/images/che.png";
// 				newParentLayer = "001";
// 				newLongitude = jsonObj.list[0].longitude;

// 				newLatitude = jsonObj.list[0].latitude;
// 				newFuntionButtonDiv = "<div>" + jsonObj.list[0].text + "</div>";
// 				newDomID = jsonObj.list[0].id;
// 				childrenData = jsonObj.list[0].list;
// 				globalCreatIcon(newTitle,newPictureUrl,newParentLayer,
// 					newLongitude,newLatitude,newFuntionButtonDiv,newDomID,childrenData);
// 				window.opener.document.getElementById("HKljxfeedback_JSON").value = [{"result":false}];
// 			} else {
// 				Ext.Msg.show({
// 							title : '错误提示',
// 							msg : '数据加载失败！',
// 							buttons : Ext.Msg.OK,
// 							icon : Ext.Msg.ERROR
// 						});
// 			}
// 		},
// 		failure : function() {
// 			Ext.Msg.show({
// 						title : '错误提示',
// 						msg : '数据加载失败！',
// 						buttons : Ext.Msg.OK,
// 						icon : Ext.Msg.ERROR
// 					});
// 		}
// 	});
// });

//外部调用的函数，向globalJson赋值
function getGlobalJson(jsonValue){
	globalJsonFlag = true;
	globalJson = jsonValue;
}

//监听电话事件
function phoneResponse(outPhone){
	thisPhone = outPhone;
	globalPhoneFlag = true;
	alert(globalPhoneFlag);
}
