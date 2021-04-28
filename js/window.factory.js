var WindowFactory = function () {
	return {


		id: null,
		init: function (view) {
			// do stuff


			//this.id = guid();


			//Create a panelwith som tabs on
			var pnl = Ext.create("Ext.tab.Panel", {
				bodyPadding: 5,
				resizable: true,
				layout: "fit",
				autoLoad: true, items: [
					/*
					{
						title: "General",
						html: "<h1>A simple tab</h1>",
						style: "background-color:#df0000; ",
					},
					{
						title: "Invoicing",
						html: "Another one",
					},
					*/
					{
						title: "REmote",
						loader: {  // Hmm vi kan lave noget loading stuff here
							autoLoad: true,
							useDefaultXhrHeader: true,
							url: "win.html"
						}
					}
					
				]
			});

			//Create the window
			Ext.define("window.Debug", {
				extend: "Ext.window.Window",
				title: "Hello",
				width: 500,
				height: 400,
				closable: true,
				maximizable: true,
				minimizable: true,
				bodyStyle: "background-color:#CCC",
				bodyPadding: 0,
				layout: "fit",
				scripts: true,
				ready: false,
				
				listeners: {
					boxready: async function (window, options) {
						window.boxready = true
						try {
							
							//window.onload();	
							
						} catch (error) {
							
							alert(error)
						}
						
						
					}
				},
				/*
				tbar: [
					{
						text: "asd",
						menu: []
					}
				],
				*/
				items: [pnl]
			});


			var w = Ext.create('window.Debug', { renderTo: Ext.getBody() }).show();

		


		}
	}
}

