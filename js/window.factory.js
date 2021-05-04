var WindowFactory = function () {
	return {


		id: null,
		init: function (view) {
			// do stuff


			//this.id = guid();


			//Create a panelwith som tabs on
			var pnl = Ext.create("Ext.tab.Panel", {
				id : "bob",
				bodyPadding: 0,
				bodyStyle: "margin:0px",
				resizable: true,
				layout: "fit",
				monitorResize: true,
				autoLoad: true, 
			});

			//Create the window
			Ext.define("window.Debug", {
				extend: "Ext.window.Window",
				id  :"bob2",
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
					},
					resize : (parentWindow) => {
						//alert("mk")
						//TODO: Resize panel content here
						$('#dataGrid').width(parentWindow.width-20); //virker.. men find paretny
						$('#dataGrid').height(parentWindow.height-20); //virker.. men find paretny

					}
				},
				//C:\Users\kss\Skrivebord\Nørd Ting\erpify\erpify.desktop\ext js\ext-5.1.0-gpl\ext-5.1.0\examples\kitchensink
				//file:///C:/Users/kss/Skrivebord/N%C3%B8rd%20Ting/erpify/erpify.desktop/ext%20js/ext-5.1.0-gpl/ext-5.1.0/examples/menu/menus.js
				tbar: [
					{
						text: "Window",
						
						menu: [
							{
								text:"Open File", 
								icon: 'css/images/menu/default-checked.gif',
								cls: 'x-btn-text-icon',
								tooltip: '<b>Quick Tips</b><br/>Icon only button with tooltip<br><b>Activated on mousedown</b>',
								handler: onMenuClick
							},							{
								text:"Calendar", 
								icon: 'css/images/shared/calendar.gif',
								cls: 'x-btn-text-icon',
								tooltip: '<b>Quick Tips</b><br/>Icon only button with tooltip<br><b>Activated on mousedown</b>',
								handler: onMenuClick
							}
						]
					} , {
						text: "Edit",
						menu: ["Cut","Copy","Paste"]
					}, {
						//file:///C:/Users/kss/Skrivebord/N%C3%B8rd%20Ting/erpify/erpify.desktop/ext%20js/ext-5.1.0-gpl/ext-5.1.0/build/examples/simple-widgets/editor.html?theme=crisp-touch
						text: "View",
						menu: ["Form  View","",""]
					}, {
						text: "Data",
						menu: ["Refresh","Import","Export"]
					}, {
						text: "Help",
						menu: ["Help","About Erpify",]
					}
				],
			
				//items: [pnl]
			});

	
			var w = Ext.create('window.Debug', { renderTo: Ext.getBody() }).show();

		


		}
	}
}

function onMenuClick() {
	alert("Click")				
}

