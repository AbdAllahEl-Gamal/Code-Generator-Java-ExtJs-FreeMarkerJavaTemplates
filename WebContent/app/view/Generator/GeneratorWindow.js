Ext.define('ezdk-generator.view.Generator.GeneratorWindow' , {
	extend:'Ext.window.Window',
	title:'Step 1',
	id:'grid-window',
	width:1300,
	height:400,
    maxWidth:1300,
    maxHeight:400,
    minWidth:1300,
    minHeight:400,
    iconCls:'fas fa-address-book',
    layout:'fit',
    autoShow:true,
    modal:true,
    items:[{
        xtype:'form',
        items:[{
            xtype:'panel',
            layout:'fit',
            bodyPadding:10,
            height:50,
            items:[
     	    	{
     	   			fieldLabel:'<span style="color:#371D7F; font-weight: bold;">Choose</span>',
     	   			fieldStyle:'background-color: #ffff66; background-image: none; font-weight: bold; color: #000080',
     	   			labelWidth:50,
     	   			xtype:'combobox',
     	   			name:'Type',
     	   			id:'Type',
     	   			queryMode:'local',
     	   			typeAhead:true,
     	   			displayField:'Type',
     	   			valueField:'Type',
     	   			allowBlank:false,
     	   			forceSelection:false,
     	   			multiSelect:false,
     	   			listeners:
     	   			{
     	   				'select': function( t )
     	   				{
     	   					if( t.value == 'All' )
     	   					{
     	   						Ext.getCmp('J').enable();
     	   						Ext.getCmp('ExtJs').enable();
     	   					}
     	   					else if( t.value == 'Java' )
     	   					{
     	   						Ext.getCmp('J').enable();
     	   						Ext.getCmp('ExtJs').disable();
     	   					}
     	   					else if( t.value == 'ExtJs' )
     	   					{
     	   						Ext.getCmp('J').disable();
     	   						Ext.getCmp('ExtJs').enable();
     	   					} 
     	   				}
     	   			},
     	   			store:Ext.create('ezdk-generator.store.CodeGenerationType')
     	    	}]
        } , {
        	xtype:'panel',
            id:'J',
            bodyPadding:10,
            height:135,
            title:'Java',
            disabled:true,
     	    items:[
     	    	{
     	   			fieldLabel:'<span style="color:#371D7F; font-weight: bold;">Java Type</span>',
     	   			fieldStyle:'background-color: #ffff66; background-image: none; font-weight: bold; color: #000080',
     	   			xtype:'combobox',
     	   			name:'JavaType',
     	   			id:'JavaType',
     	   			queryMode:'local',
     	   			typeAhead:true,
     	   			displayField:'JavaType',
     	   			valueField:'JavaType',
     	   			forceSelection:false,
     	   			multiSelect:false,
     	   			listeners:
     	   			{
     	   				'select': function( t )
     	   				{ 
     	   					if( t.value == 'Basic Java' )
     	   					{
     	   						Ext.getCmp('checkbox1').enable();
     	   						Ext.getCmp('checkbox2').enable();
     	   						Ext.getCmp('checkbox3').enable();
     	   						Ext.getCmp('checkbox4').disable();
     	   						Ext.getCmp('checkbox5').disable();
     	   						Ext.getCmp('checkbox6').disable();
     	   						Ext.getCmp('checkbox7').disable();
     	   					}
     	   					else if( t.value == 'Spring Boot' )
     	   					{
     	   						Ext.getCmp('checkbox1').enable();
     	   						Ext.getCmp('checkbox2').disable();
     	   						Ext.getCmp('checkbox3').disable();
     	   						Ext.getCmp('checkbox4').enable();
     	   						Ext.getCmp('checkbox5').enable();
     	   						Ext.getCmp('checkbox6').enable();
     	   						Ext.getCmp('checkbox7').enable();
     	   					} 
     	   				}
     	   			},
     	   		    store:Ext.create('ezdk-generator.store.JavaType')
     	    	},
     	        {
     	            xtype:'fieldcontainer',
     	            defaultType:'checkboxfield',
     	            id:'mycheckboxgroup',
     	            layout:'hbox',
     	            items:[
     	                {
     	                    boxLabel:'<span style="font-weight: bold;">Bean</span>',
     	                    name:'Java',
     	                    inputValue:'1',
     	                    padding:'10 10 10 10',
     	                    id:'checkbox1',
     	                    disabled:true
     	                } , {
     	                    boxLabel:'<span style="font-weight: bold;">DAO</span>',
     	                    name:'Java',
     	                    inputValue:'2',
     	                    padding:'10 10 10 10',
     	                    id:'checkbox2',
     	                    disabled:true
     	                } , {
     	                    boxLabel:'<span style="font-weight: bold;">Servlet</span>',
     	                    name:'Java',
     	                    inputValue:'3',
     	                    padding:'10 10 10 10',
     	                    id:'checkbox3',
     	                    disabled:true
     	                } , {
     	                    boxLabel:'<span style="font-weight: bold;">Repository</span>',
     	                    name:'Java',
     	                    inputValue:'4',
     	                    padding:'10 10 10 10',
     	                    id:'checkbox4',
     	                    disabled:true
     	                } , {
     	                    boxLabel:'<span style="font-weight: bold;">Service</span>',
     	                    name:'Java',
     	                    inputValue:'5',
     	                    padding:'10 10 10 10',
     	                    id:'checkbox5',
     	                    disabled:true
     	                } , {
     	                    boxLabel:'<span style="font-weight: bold;">Interface</span>',
     	                    name:'Java',
     	                    inputValue:'6',
     	                    padding:'10 10 10 10',
     	                    id:'checkbox6',
     	                    disabled:true
     	                } , {
     	                    boxLabel:'<span style="font-weight: bold;">Controller</span>',
     	                    name:'Java',
     	                    inputValue:'7',
     	                    padding:'10 10 10 10',
     	                    id:'checkbox7',
     	                    disabled:true
     	                }    	                
     	            ]
     	        }
     	    ],
        } , {
            xtype:'panel',
            layout:'fit',
            id:'ExtJs',
            bodyPadding:10,
            height:135,
            title:'ExtJs',
            disabled:true,
     	    items:[
     	        {
     	            xtype:'fieldcontainer',
     	            defaultType:'checkboxfield',
     	            layout:'hbox',
     	            items:[
     	                {
     	                    boxLabel:'<span style="font-weight: bold;">Form</span>',
     	                    name:'ExtJs',
     	                    inputValue:'8',
     	                    padding:'10 10 10 10',     	                    
     	                    id:'checkbox8'
     	                } , {
     	                    boxLabel:'<span style="font-weight: bold;">Store</span>',
     	                    name:'ExtJs',
     	                    inputValue:'9',
     	                    padding:'10 10 10 10',     	                    
     	                    id:'checkbox9'
     	                } , {
     	                    boxLabel:'<span style="font-weight: bold;">Grid</span>',
     	                    name:'ExtJs',
     	                    inputValue:'10',
     	                    padding:'10 10 10 10',     	                    
     	                    id:'checkbox10'
     	                } , {
     	                    boxLabel:'<span style="font-weight: bold;">Window</span>',
     	                    name:'ExtJs',
     	                    inputValue:'11',
     	                    padding:'10 10 10 10',     	                    
     	                    id:'checkbox11'
     	                }
     	            ]
     	        }
     	    ],
        }],
        buttons:[{    	        			
     		text:'Generate',
     		id:'generate',
     		iconCls:'fas fa-code-branch',
     		iconAlign:'right',
     		formBind:true,
     		handler: function() 
     		{
     			var JavaType = Ext.getCmp('JavaType').getValue();
     			var Type = Ext.getCmp('Type').getValue();
    	        var Bean =  Ext.getCmp('checkbox1').checked;
    	        var DAO =  Ext.getCmp('checkbox2').checked;
    	        var Servlet =  Ext.getCmp('checkbox3').checked;
    	        var Repository =  Ext.getCmp('checkbox4').checked;
    	        var Service =  Ext.getCmp('checkbox5').checked;
    	        var Interface =  Ext.getCmp('checkbox6').checked;
    	        var Controller =  Ext.getCmp('checkbox7').checked;
    	        var Form =  Ext.getCmp('checkbox8').checked;
    	        var Grid =  Ext.getCmp('checkbox10').checked;
     			if( Bean === true || DAO === true || Servlet === true || Repository === true || Service === true || Interface === true || Controller === true || Form === true || Grid === true )
     			{
     				Ext.Ajax.request({
     					url:contextRoot+'/metadata?action=getCode',
     					autoAbort:true,
     					disableCaching:true,
     					params:
     					{
     						JavaType:JavaType,
     						Type:Type,
     						Bean:Bean,
     						DAO:DAO,
     						Servlet:Servlet,
     						Repository:Repository,
     						Service:Service,
     						Interface:Interface,
     						Controller:Controller,
     						Form:Form,
     						Grid:Grid
     					},
     					success: function( response, opts )
     					{
    	        			        		
     					},
     					failure: function( response, opts )
     					{
     					}
     				});
     				this.up('window').destroy();
     				Ext.create('ezdk-generator.view.Generator.GeneratorForm' , {
     					params:
     					{
     						JavaType:JavaType,
     						Type:Type,
     						Bean:Bean,
     						DAO:DAO,
     						Servlet:Servlet,
     						Repository:Repository,
     						Service:Service,
     						Interface:Interface,
     						Controller:Controller,
     						Form:Form,
    		            	Grid:Grid
     					}
     				});
     			}
    	        else
  	            {
  	            	Ext.Msg.alert({
  	            			title:'Warning',
  	            			iconCls:'fas fa-exclamation-circle',
  	            			message:'<span style="font-weight: bold;">Please choose what do you want to generate</span>',
  	            			buttons:Ext.MessageBox.OK
  	            	});
  	            }
     		}
     	}]
    }],	
});