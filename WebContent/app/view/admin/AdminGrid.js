Ext.define('ezdk-generator.view.admin.AdminGrid' , {
	extend:'Ext.window.Window',
	title:'Administrator',
	id:'grid-window',
    width:1300,
	height:400,
    maxWidth:1300,
    maxHeight:400,
    minWidth:1300,
    minHeight:400,
    layout:'fit',
    iconCls:'fas fa-address-book',
    autoShow:true,
    closeAction:'destroy',
    modal:true,
    params:
    {
	},
    items:[
    {
    	xtype:'grid',
        id:'code-columns-grid',
        border:false,
        store:Ext.create('ezdk-generator.store.Tables'),        
	    plugins: 
	    {
	        ptype:'cellediting',
	        clicksToEdit:1
	    },
        columns:[{
        	header:'<span style="color:#FF5733; font-weight: bold;">Table Name</span>',
            dataIndex:'tableName',
            flex:1
        }],
    tbar:[
    {
        xtype: 'button',
        text: '<span style="color:#371D7F; font-weight: bold;">ADD</span>',
        id: 'add',
        name: 'add',
        width: 110,
        iconCls: 'fas fa-plus greenIcon',
        handler: function()
        {
      		var addform = Ext.create('Ext.form.FormPanel', {
     			standardSubmit: true,
     		    bodyPadding: 10,
     		    //url: context+'EmployeeQueries?action=insert',
     		    reference: 'form',
     	        defaultType: 'textfield',
     			items: [{
     					fieldLabel:'<span style="color:#371D7F; font-weight: bold;">Table</span>',
     					fieldStyle:'background-color: #ffff66; background-image: none; font-weight: bold; color: #000080',
     					xtype:'textfield',
     					name:'table',
     					id:'table'
     			}],
     	        buttons: [{
     	            text: 'Submit',
     	            formBind: true,
     	           handler: function() 
     	           {
     	        	   var form = this.up('form');
     	        	   if (form.getForm().isValid()) 
     	        	   {
     	        		   	var resultGrid = Ext.getCmp('code-columns-grid');
     	       				resultGrid.store.load(); 
     	       				resultGrid.getView().refresh();
     	        	   }
     	           }
     	        }]
     	 
         	});
     		var win4 = Ext.getCmp('Window4');

     	    if (!win4) {
     	        win4 = new Ext.Window({
     	            id: 'Window4',
     	            width: 300,
         	        height: 170,
         	        title: 'Add Table',
         	        items: addform,
         	        layout: 'fit',
                    animCollapse:false,
                    constrainHeader:true,
         	        maxWidth: 300,
         	        maxHeight: 170,
         	        minWidth: 300,
         	        minHeight: 170
     	        });
     	    }
     	    win4.show();
      		 }
    },
    {
        xtype: 'button',
        text: '<span style="color:#371D7F; font-weight: bold;">DELETE</span>',
        id: 'delete',
        name: 'delete',
        width: 110,
        iconCls: 'fas fa-trash-alt redIcon'
    }],
     buttons:[
    	 {
    		 text:'Previous',
    		 iconCls:'fas fa-backward',
	         formBind:true,
	         handler: function( button ) 
	         {
	        	 Ext.create('ezdk-generator.view.admin.AdminForm');	 
	        	 button.up('window').destroy();
	         }
    	 }, 
    	 {
    		 text:'Next',
	         iconCls:'fas fa-forward',
	         iconAlign:'right',
	         formBind:true,
	         handler: function( button ) 
	         {
	         }
	     }]
    }]
});