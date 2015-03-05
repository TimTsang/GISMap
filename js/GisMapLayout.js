/**   
 *  
 * ArgGis地图主面板  
 * @ProjectName : GISMap
 * @Package     : js  
 * @ClassName   : viewport
 * @Description : ArgGis地图主面板
 * @Author      : TimTsang
 * @CreateDate  : 2014年11月25日  
 * @Version     : [v1.0] 
 *    
 */ 

Ext.require(['*']);

    Ext.onReady(function() {

        Ext.QuickTips.init();
        
        Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
        //启动页面是收起侧边工具栏
        //Ext.getCmp("west-panel").collapsed();
        //总布局框架
        /*alert(window.location.href.split('#')[1]);*/
        
        var viewport = Ext.create('Ext.Viewport', {
            id: 'border-example',
            layout: 'border',
            border :false,
            items: [{
                region: 'east',
                stateId: 'navigation-panel',
                id: 'west-panel', // see Ext.getCmp() below
                title: '资源管理',
                split: true,
                collapsible: true,
                collapsed:true,//启动页面是收起侧边工具栏
                width: 240,
                minWidth: 175,
                maxWidth: 240,
                margins: '0 0 0 5',
                border :false,
                items: [Ext.create('js.resourceManagePanel')]
            },
            Ext.create('Ext.Panel', {
                region: 'center', // a center region is ALWAYS required for border layout
                deferredRender: false,
                border :false,
                items: [{
                    contentEl: 'map',
                    height:'100%',
                    width: '100%',
                    autoScroll: false,
                    enableTabScroll:true,
                }]
            })
            
           ]
        });
    });