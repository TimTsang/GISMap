//定义一个PlayView类
Ext.define("PlayView",{
		extend:'Ext.panel.Panel',
	    title: '实时预览',
	    hideCollapseTool:false,
	    collapsible :true,
	    autoScroll:true,
	    closable:true,//运行客户关闭
	    closeAction:'destroy',//设置关闭动作[destroy|hide]
		bodyStyle: {
		    background: '#ffc',
		}
});