Ext.define('ezdk-generator.store.Columns', {
	extend: 'Ext.data.Store',
    autoLoad:true,
    proxy: {
        type: 'ajax',
        url: contextRoot+'/metadata?action=getColumns',
        actionMethods: {create: "GET", read: "GET", update: "GET", destroy: "GET"},
        reader: {
            type: 'json',
            rootProperty: 'tables',
            successProperty: 'success'           	            
        }
    },
    sorters: [{
        property: 'start',
        direction: 'DESC'
    }]
});