var MenuFactory = function () {
	return {
		init: async function () {


       //2. Create date for model.
    var modelData = {
      children: [
        { text: 'Models', expanded: true, children: [] },
        { text: 'Controllers', expanded: false, children: [] },
        { text: 'Views', expanded: false, children: [] },
        { text: 'Sheduled Tasks', expanded: false, children: [] },
        { text: 'Reports', expanded: false, children: [] }
      ]
    }

      // Fetch models from server
      let modelPackage = await erpify.sendRequest("Server", "getModels", {})
      for (var model of modelPackage.response.data) {
        modelData.children[0].children.push({ text: model, leaf: true })
      }

      
      // Fetch controllers from server
      let controllerPackage = await erpify.sendRequest("Server", "getControllers", {})
      for (var controller of controllerPackage.response.data) {
        modelData.children[1].children.push({ text: controller, leaf: true })
      }

      // Create memory proxy store
      var store = Ext.create('Ext.data.TreeStore', {
        autoLoad: true,
        data: modelData,
        expanded: true,
        root: {
          text: 'root',
          expanded: false
        },
        proxy: {
          type: 'memory',
          reader: {
            type: 'json',
            rootProperty: 'children'
          }
        }
      });

      // Create Tree Panel
      var tree = Ext.create('Ext.tree.Panel', {
        title: 'Database',
        width: 200,
        height: 800,
        store: store,
        rootVisible: false,
        renderTo: Ext.getBody(),
        listeners: {
          //itemclick: function (s, r) {
          //},
          itemdblclick: function (tree, record, index) {
            const modelName = record.raw.text
            let win = new WindowFactory();
            const WinId = win.init(modelName);
            
            win.loadModel(WinId,modelName)
          }
        }
      });
      



    }
  }
}