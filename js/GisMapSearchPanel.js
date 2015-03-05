Ext.define('js.GisMapSearchPanel', {
    extend: 'Ext.Container',
    xtype: 'basic-panels',
    width: 660,

    layout: {
        type: 'table',
        columns: 3,
        tdAttrs: { style: 'padding: 10px;' }
    },

    defaults: {
        xtype: 'panel',
        width: 200,
        height: 200,
        bodyPadding: 10
    },

    initComponent: function () {
        this.items = [
            {
                //html: KitchenSink.DummyText.mediumText
            },
            {
                title: 'Title',
                //html: KitchenSink.DummyText.mediumText
            },
            {
                title: 'Header Icons',
                tools: [
                    { type:'pin' },
                    { type:'refresh' },
                    { type:'search' },
                    { type:'save' }
                ],
                //html: KitchenSink.DummyText.mediumText
            },
            {
                title: 'Collapsed Panel',
                collapsed: true,
                collapsible: true,
                width: 640,
                //html: KitchenSink.DummyText.mediumText,
                colspan: 3
            }
        ];

        this.callParent();
    }
});