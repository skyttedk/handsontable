//https://blog.csdn.net/kui5656/article/details/84238117


var MenuFactory = function () {
  return {
    menuStore: null,
    modelData: [],
    init: async function () {


      //2. Create date for model.
      this.modelData = {
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
        this.modelData.children[0].children.push({ text: model, leaf: true })
      }


      // Fetch controllers from server
      let controllerPackage = await erpify.sendRequest("Server", "getControllers", {})
      for (var controller of controllerPackage.response.data) {
        this.modelData.children[1].children.push({ text: controller, leaf: true })
      }

      // Create memory proxy store
      this.menuStore = Ext.create('Ext.data.TreeStore', {
        id: 'menu_store',
        name: 'menu_store',
        autoLoad: true,
        data: this.modelData,
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



      //Create filter Toolbar
      var searchBar = new Ext.Toolbar({
        buttonAlign: 'center',
        items: [{ xtype: 'textfield', emptyText: 'Type to filter...', id: 'filter_input', width: 193 }]
      });


      // Create Tree Panel
      var tree = Ext.create('Ext.tree.Panel', {
        title: 'Database',
        width: 200,
        height: 800,
        region : 'west',
        tbar: searchBar,
        store: this.menuStore,
        rootVisible: false,
        renderTo: Ext.getBody(),

        listeners: {
          //itemclick: function (s, r) {
          //},
          itemdblclick: function (tree, record, index) {
            const modelName = record.raw.text
            let viewFactory = new ViewFactory();
            let view = viewFactory.init(modelName);
            
            https://stackoverflow.com/questions/6063896/extjs-dynamically-add-item-to-viewport-region/8395375
            
            window.viewPort.add(view);

            //view.loadModel(view.id, modelName)//TODO...shomethis is wroong here
            viewFactory.loadModel(view.id, modelName)//TODO...shomethis is wroong here
            

          }
        }
      });



      // Create filter functionality for input


      var field = Ext.get('filter_input');

      // Create filter for store
      var filter = Ext.create('Ext.util.Filter', {
        filterFn: function (item) {
          console.log(item.data.text.toLowerCase())
          var field = Ext.get('filter_input');
          var filterText = field.component.value;
          if (filterText == "") {
            return true;
          } else {
            //console.log(item)
            //console.log(item.data.text.toLowerCase())
            //TODO: Only leaf nodes should filtered
            if (!item.data.leaf) {
              item.data.expanded=true;
              return true;
            } else if (item.data.text.toLowerCase().indexOf(filterText.toLowerCase()) > -1) {
              return true
            }
          }
        }
      });
      this.menuStore.filters.add(filter);


      //Key controller for search input
      field.on('keyup', (e) => {
        //console.log(this.modelData)
        this.menuStore.reload(true);
        //console.log(this.modelData)
      });

      //this.menuStore.reload();
      return tree
    }
  }

}



