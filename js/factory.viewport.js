var ViewPortFactory = function () {
    return {
        init: async function () {

            const vp = Ext.create('Ext.container.Viewport', {
                layout: 'border',
                rtl: true,
                //requires: ['erpify.view.table'],
                items: [{
                    region: 'north',
                    title: 'Top',
                    height: 100,
                    html: "<h1>ay</h1>",
                    scrollable: true,
                    collapsible: true,
                    split: true
                }, {
                    region: 'west',
                    id: 'west-region',
                    xtype: 'container',
                    title: 'Left',
                    width: 200,
                    collapsible: true,
                    split: true,
                    tbar: {},
                }, {
                    region: 'center',
                    html: '<h1>ASS</h1>',
                    title: 'Body',
                }, {
                    region: 'east',
                    //xtype:'table',
                    title: 'Right',
                    width: 200,
                    collapsible: true,
                    split: true
                }, {
                    region: 'south',
                    title: 'Bottom',
                    height: 100,
                    collapsible: true,
                    split: true
                }]
            });
            //var w = Ext.create('erpify.view.table', { renderTo: Ext.getBody() }).show();

            //vp.items.add(w)
            return vp
            
        }
    }

}



