Ext.define('ezdk-generator.store.Tables', {
	extend: 'Ext.data.Store',
	        autoLoad:true,
	        proxy: {
	            type: 'ajax',
	            url: contextRoot+'/metadata?action=getTables',
	            actionMethods: {create: "GET", read: "GET", update: "GET", destroy: "GET"},
	            reader: {
 	            type: 'json',
 	            rootProperty: 'tables',
 	            successProperty: 'success'            	            
 	        },
 	        params:{
 	        	tableName: "tableName",
 	        	databaseName: "databaseName"
 	        }
	        },
	        sorters: [{
	            property: 'start',
	            direction: 'DESC'
	        }]
});