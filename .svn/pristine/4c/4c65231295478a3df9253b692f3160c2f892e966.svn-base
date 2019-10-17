Ext.define('ezdk-generator.view.admin.AdminForm' , {
	extend:'Ext.window.Window',
    title:'Administrator',
    id:'form-window',
    width:1300,
	height:400,
    maxWidth:1300,
    maxHeight:400,
    minWidth:1300,
    minHeight:400,
    layout:'fit',
    iconCls:'fas fa-address-book',
    autoShow:true,
    modal:true,
    params:
    {
    },
    items:[{
    	xtype:'form',
	    bodyPadding:15,
		items:[{
			fieldLabel:'<span style="color:#371D7F; font-weight: bold;">Database ID</span>',
			fieldStyle:'background-color: #ffff66; background-image: none; font-weight: bold; color: #000080',
			labelWidth:101,
			xtype:'textfield',
			name:'databaseId',
			id:'databaseId',
			allowBlank:false     	
    } , {
    		fieldLabel:'<span style="color:#371D7F; font-weight: bold;">Host</span>',
			fieldStyle:'background-color: #ffff66; background-image: none; font-weight: bold; color: #000080',
			labelWidth:101,
			xtype:'textfield',
			name:'host',
			id:'host',
			allowBlank:false
    } , {
			fieldLabel:'<span style="color:#371D7F; font-weight: bold;">Username</span>',
			fieldStyle:'background-color: #ffff66; background-image: none; font-weight: bold; color: #000080',
			labelWidth:101,
			xtype:'textfield',
			name:'uname',
			id:'uname',
			allowBlank:false
	} , {
			fieldLabel:'<span style="color:#371D7F; font-weight: bold;">Password</span>',
			fieldStyle:'background-color: #ffff66; background-image: none; font-weight: bold; color: #000080',
			labelWidth:101,
			xtype:'textfield',
			inputType:'password',
			name:'pw',
			id:'pw',
			allowBlank:false
	} , {
			fieldLabel:'<span style="color:#371D7F; font-weight: bold;">Port</span>',
			fieldStyle:'background-color: #ffff66; background-image: none; font-weight: bold; color: #000080',
			labelWidth:101,
			xtype:'textfield',
			name:'port',
			id:'port'
	} , {
			fieldLabel:'<span style="color:#371D7F; font-weight: bold;">Database Type</span>',
			fieldStyle:'background-color: #ffff66; background-image: none; font-weight: bold; color: #000080',
			labelWidth:101,
			xtype:'combobox',
			name:'databaseType',
			id:'databaseType',
			queryMode:'local',
			typeAhead:true,
			displayField:'databaseType',
			valueField:'databaseType',
			allowBlank:false,
			forceSelection:false,
			multiSelect:false,
			store:Ext.create('ezdk-generator.store.DatabaseTypes')        	
	} , {
			inputType:'hidden',
			id:'submitbutton',
			name:'myhiddenbutton',
			value:'hiddenvalue'
	}],
		buttons:[
		{
            text:'Previous',
            iconCls:'fas fa-backward',
            formBind:true,
            handler: function() 
            {
            	
            }
		},
		{
			text:'Next',
			iconCls:'fas fa-forward',
			iconAlign:'right',
			formBind:true,
			handler: function( button ) 
			{
				Ext.create('ezdk-generator.view.admin.AdminGrid');
				button.up('window').destroy();
			}
		}]
    }]
});