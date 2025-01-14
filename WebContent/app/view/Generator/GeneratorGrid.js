Ext.define('ezdk-generator.view.Generator.GeneratorGrid' , {
	extend:'Ext.window.Window',
	title:'Step 3',
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
    	tableName:'',
    	databaseName:'',
    	databaseType:'',
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
    items:[
    {
    	xtype:'grid',
        id:'code-columns-grid',
        border:false,
        store:Ext.create('ezdk-generator.store.Columns'),
        reloadStore: function() 
        {
        	var resultGrid = Ext.getCmp('code-columns-grid');
			var resultStore = resultGrid.store;
			var gridWindow = Ext.getCmp('grid-window');
			resultStore.proxy.extraParams = 
			{
					tableName:gridWindow.params.tableName
			};
			resultStore.reload();
        },
	    listeners: 
	    {
	    	render: function ( sender, eOpts )
	    	{
	    		this.reloadStore();
	    	}
	    },
	    plugins: {
	        ptype:'cellediting',
	        clicksToEdit: 1
	    },
        columns:[
        {
        	header:'<span style="color:#FF5733; font-weight: bold;">Column Name</span>',
            dataIndex:'columnName',
            flex:1
        } , {
        	header:'<span style="color:#FF5733; font-weight: bold;">Column Type</span>',
            dataIndex:'dataType',
            flex:1
        } ,  {
            header:'<span style="color:#FF5733; font-weight: bold;">Variable Name</span>',
            dataIndex:'variableName',
            flex:1,
            editor: 
            {
                xtype:'textfield',
                allowBlank:false
            }
        } , {
        	header:'<span style="color:#FF5733; font-weight: bold;">XType</span>',
            dataIndex:'xType',
            id:'x',
            flex: 1,
            editor: 
            {
            	xtype:'combobox',
            	store: Ext.create('ezdk-generator.store.XType'),
                queryMode:'local',
                displayField:'xType',
                valueField:'xType',
                value:'textfield'
            },
            renderer: function( value ) 
            {
            	var gridWindow = Ext.getCmp('grid-window');
            	if( gridWindow.params.Type == 'Java' )
            	{
            		Ext.getCmp('xType').disable();
            	}
            	switch( value ) 
            	{
            		case 'textfield':
            			return 'textfield';
            			break;
            		case 'emailfield':
            			return 'emailfield';
            			break;
            		case 'passwordfield':
            			return 'passwordfield';
            			break;
            		case 'combobox':
            			return 'combobox';
            			break;
            		default:
            			Ext.getCmp('x').editor.defaultValue = "textfield";
                        return  Ext.getCmp('x').editor.value;
                    	break;
                }
            }
    } , {
            	header:'<span style="color:#FF5733; font-weight: bold;">Allow Blank</span>',
                dataIndex:'allowB',
                id:'a',
                flex: 1,
                editor: 
                {
                	xtype:'combobox',
                	store: Ext.create('ezdk-generator.store.AllowBlank'),
                    queryMode:'local',
                    displayField:'allowB',
                    valueField:'allowB',
                    value:'false'
                },
                renderer: function( value ) 
                {
                	var gridWindow = Ext.getCmp('grid-window');
                	if( gridWindow.params.Type == 'Java' )
                	{
                		Ext.getCmp('allowB').disable();
                	}
                	switch( value ) 
                	{
                		case 'true':
                			return 'true';
                			break;
                		case 'false':
                			return 'false';
                			break;
                		default:
                			Ext.getCmp('a').editor.defaultValue = "false";
                            return  Ext.getCmp('a').editor.value;
                        	break;
                    }
                }
        }],
    tbar:[
    {
    	xtype:'textfield',
        fieldLabel:'<span style="color:#371D7F; font-weight: bold;">Application Name</span>',
        labelWidth:120,
        id:'appName',
        name:'appName',
        allowBlank:false
    } , '->' ,
    {
    	xtype:'textfield',
        fieldLabel:'<span style="color:#371D7F; font-weight: bold;">Class Name</span>',
        id:'className',
        name:'className',
        allowBlank:false
     }],
     buttons:[
    	 {
    		 text:'Previous',
    		 iconCls:'fas fa-backward',
	         formBind:true,
	         handler: function() 
	         {
	        	 this.up('window').destroy();
	        	 Ext.create('ezdk-generator.view.Generator.GeneratorForm');
	         }
    	 } , 
    	 {
    		 text:'Next',
	         iconCls:'fas fa-forward',
	         iconAlign:'right',
	         formBind:true,
	         handler: function( button ) 
	         {
	        	 var resultGrid = Ext.getCmp('code-columns-grid');
	             var data = new Array();
      	         var records = resultGrid.store.getRange();
      	         for ( var i = 0; i < records.length; i++ )
      	         {
      	        	 data.push(records[i].data);
      	         }
      	         var json = Ext.util.JSON.encode(data);
      	         var className = Ext.getCmp('className').getValue();
      	         var appName = Ext.getCmp('appName').getValue();
      	         var gridWindow = Ext.getCmp('grid-window');
      	         var Type = gridWindow.params.Type;
      	         console.log(Type);
      	         if( Type === "Java" & (className.trim().length > 0) === false )
    	         {
      	        	Ext.Msg.alert({
	            			title:'Warning',
	            			iconCls:'fas fa-exclamation-circle',
	            			message:'<span style="font-weight: bold;">Please enter the class name</span>',
	            			buttons:Ext.MessageBox.OK
	            	});
    	         }
      	         else if( Type === "ExtJs" & (appName.trim().length > 0) === false )
    	         {
    	        	Ext.Msg.alert({
	            			title:'Warning',
	            			iconCls:'fas fa-exclamation-circle',
	            			message:'<span style="font-weight: bold;">Please enter the application name</span>',
	            			buttons:Ext.MessageBox.OK
	            	});
    	         }
      	         else if( Type === "ExtJs" & (className.trim().length > 0) === false )
      	         {
      	        	 Ext.Msg.alert({
            			title:'Warning',
            			iconCls:'fas fa-exclamation-circle',
            			message:'<span style="font-weight: bold;">Please enter the class name</span>',
            			buttons:Ext.MessageBox.OK
      	        	 });
      	         }
      	         else if( Type === "All" & (className.trim().length > 0) === false )
    	         {
    	        	 Ext.Msg.alert({
             			title:'Warning',
             			iconCls:'fas fa-exclamation-circle',
             			message:'<span style="font-weight: bold;">Please enter the class name</span>',
             			buttons:Ext.MessageBox.OK
       	        	 });
    	         }
      	         else if( Type === "All" & (appName.trim().length > 0) === false )
      	         {
      	        	 Ext.Msg.alert({
             			title:'Warning',
             			iconCls:'fas fa-exclamation-circle',
             			message:'<span style="font-weight: bold;">Please enter the application name</span>',
             			buttons:Ext.MessageBox.OK
       	        	 });
      	         }
      	         else
      	         {
      	        	 Ext.Ajax.request({
      	        		 url:contextRoot+'/metadata?action=getCode',
      	            	 success: function( r )
      	            	 {
      	            		 var resp = Ext.decode(r.responseText);
      	            		 Ext.DomHelper.append(Ext.getBody() , { 
    	            		      tag:'iframe', 
    	            		      frameBorder:0, 
    	            		      width:0, 
    	            		      height:0, 
    	            		      css:'display:none;visibility:hidden;height:0px;', 
    	            		      src:encodeURI(contextRoot+'/DownloadFileServlet?filePath='+resp.filePath)
    	            		 });
      	            		 button.up('window').destroy();
      	            	 },
      	            	 failure: function() 
      	            	 {
      	            			
      	            	 },
      	            	 params:
 	                     {
      	            		 json:json,
	        	             className:className,
	        	             appName:appName,
	        	             JavaType:gridWindow.params.JavaType,
	        	             Type:gridWindow.params.Type,
	   						 Bean:gridWindow.params.Bean,
	   						 DAO:gridWindow.params.DAO,
	   						 Servlet:gridWindow.params.Servlet,
	   						 Repository:gridWindow.params.Repository,
	   						 Service:gridWindow.params.Service,
	   						 Interface:gridWindow.params.Interface,
	   						 Controller:gridWindow.params.Controller,
	   						 Form:gridWindow.params.Form,
	   						 Grid:gridWindow.params.Grid
	   					 }
      	             });
      	         }
            }
	     }]
    }]
});