Ext.define('ezdk-generator.view.Generator.GeneratorForm' , {
	extend:'Ext.window.Window',
    title:'Step 2',
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
    	JavaType:'',
    	Type:'',
		Bean:'',
		DAO:'',
		Servlet:'',
		Repository:'',
		Service:'',
        Interface:'',
        Controller:'',
        Form:'',
        Grid:''
    },
    items:[{
    	xtype:'form',
	    bodyPadding:15,
		items:[{
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
    		fieldLabel:'<span style="color:#371D7F; font-weight: bold;">Database Name</span>',
			fieldStyle:'background-color: #ffff66; background-image: none; font-weight: bold; color: #000080',
			labelWidth:101,
			xtype:'combobox',
			name:'DBname',
			id:'DBname',
			queryMode:'local',
			typeAhead:true,
			displayField:'databaseName',
			valueField:'databaseName',
			allowBlank:false,
			forceSelection:false,
			multiSelect:false,
			listeners:
			{
				'select':
				{
					fn: function( combo, value ) 
					{
						var databaseName = Ext.getCmp('DBname').getValue();			            
			            Ext.getCmp('DBtables').clearValue();
			            Ext.getCmp('DBtables').enable();
			            Ext.getCmp('DBtables').getStore().load({
			            	params: 
			            	{
			                    databaseName:databaseName
			                }
			            });
			        }
			    }
			},
			store:Ext.create('ezdk-generator.store.Databases')
    } , {
			fieldLabel:'<span style="color:#371D7F; font-weight: bold;">Tables</span>',
			fieldStyle:'background-color: #ffff66; background-image: none; font-weight: bold; color: #000080',
			labelWidth:101,
			xtype:'combobox',
			name:'DBtables',
			id:'DBtables',
			queryMode:'local',
			typeAhead:true,
			displayField:'tableName',
			valueField:'tableName',
			allowBlank:false,
			forceSelection:false,
			multiSelect:false,
			disabled:true,
			store:Ext.create('ezdk-generator.store.Tables')
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
            	this.up('window').destroy();
            	Ext.create('ezdk-generator.view.Generator.GeneratorWindow');
            }
		},
		{
			text:'Next',
			iconCls:'fas fa-forward',
			iconAlign:'right',
			formBind:true,
			handler: function( button ) 
			{
				var form = button.up('form').getForm();
				var formwindow = Ext.getCmp('form-window');
				var tableName = form.findField('DBtables').getValue();
				var databaseName = form.findField('DBname').getValue();
				var databaseType = form.findField('databaseType').getValue();
				Ext.create('ezdk-generator.view.Generator.GeneratorGrid' , {
					params:
					{
						tableName:tableName,
						databaseName:databaseName,
						JavaType:formwindow.params.JavaType,
						Type:formwindow.params.Type,
						Bean:formwindow.params.Bean,
						DAO:formwindow.params.DAO,
						Servlet:formwindow.params.Servlet,
						Repository:formwindow.params.Repository,
					    Service:formwindow.params.Service,
					    Interface:formwindow.params.Interface,
					    Controller:formwindow.params.Controller,
					    Form:formwindow.params.Form,
					    Grid:formwindow.params.Grid
					}
				 });
				button.up('window').destroy();
			}
		}]
    }]
});