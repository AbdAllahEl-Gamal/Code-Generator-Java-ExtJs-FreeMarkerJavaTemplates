Ext.define('ezdk-generator.store.Databases', {
	extend: 'Ext.data.Store',
	        autoLoad:true,
	        proxy: {
	            type: 'ajax',
	            url: contextRoot+'/metadata?action=getDatabases',
	            actionMethods: {create: "GET", read: "GET", update: "GET", destroy: "GET"},
	            reader: {
 	            type: 'json',
 	            rootProperty: 'databases',
 	            successProperty: 'success'            	            
 	        },
 	        params:{
 	        	databaseName: "databaseName"
 	        }
	        },
	        sorters: [{
	            property: 'start',
	            direction: 'DESC'
	        }]
});