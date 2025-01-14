Ext.define('ezdk-generator.view.main.Main' , {
	extend:'Ext.container.Viewport',
	id:'viewport-main',
	requires:[],
	layout:'card',
	maskMessage:{},
	activeItem:0, 
	buttonSize:'large',
	buttonMinWidth:100,
	menuMinWidth:200,
	initComponent: function()
	{
		this.maskMessage = new Ext.LoadMask( this , {
			msg:'Loading'
		});
		this.items = this.createItems();
		this.callParent();
	},
	createItems: function()
	{
		let items = [ {
			layout:'border',
			title:'EZDK Code Generator [ Home ]',
			iconCls:'fas fa-globe',
		    frame:true,
			defaults: 
			{
				border:true
			},
			items:[ {
				region:'north',
				items:[ {
					xtype:'panel',
					layout:'hbox',
					padding:1,
					tbar:
					{
						defaults: 
						{
							border:true
						},
			            defaults: 
			            {
			                rowspan:1, 
			                scale:this.buttonSize,
			                iconAlign:'top',
			                cls:''
			            },
			            tbarCfg:
			            {
							xtype:'buttongroup',
							buttonAlign:'left'
			           },
			           items: [{
			        	    xtype:'button',
			                text:'<span style="color:#000080; font-weight: bold;">Home</span>',
			                iconCls:'fas fa-home greenIcon',
			                minWidth:this.buttonMinWidth
			           },{
			        	   xtype:'button',
			        	   text:'<span style="color:#000080; font-weight: bold;">Generator</span>',
			        	   iconCls:'fas fa-plus redIcon',
			        	   minWidth:this.buttonMinWidth,
			        	   handler: function() 
			        	   {
			        		   Ext.create('ezdk-generator.view.Generator.GeneratorWindow');
			               }
			           },{
			        	   xtype:'button',
			        	   text:'<span style="color:#000080; font-weight: bold;">Window</span>',
			        	   iconCls:'fas fa-plus redIcon',
			        	   minWidth:this.buttonMinWidth,
			        	   handler: function() 
			        	   {
			        		   Ext.create('ezdk-generator.view.Window');
			               }
			           } , '-' , '->' , '-' , 
			           {
			        	   	xtype:'splitbutton',
			                text:'<span style="color:#000080; font-weight: bold;">Administrator</span>',
			                iconCls:'fas fa-archive blueIcon',
			                minWidth:this.buttonMinWidth,
			                menu: 
			                {
			                	minWidth:this.menuMinWidth,
			                	items:[{
			                		iconCls:'fas fa-users',
				                	text:'<span style="font-size:13px; font-weight: bold; color: #000099;">Database</span>',
				                	hidden:false,
				                	disabled:false,
				                	handler: function () 
				                	{
				                		Ext.create('ezdk-generator.view.admin.AdminForm');
				                	}
			                	}]
			                }
			           },
			        	   {
			            	xtype:'splitbutton',
			                text:'<span style="color:#000080; font-weight: bold;">Setting</span>',
			                iconCls:'fas fa-cogs orangeIcon',
			                minWidth:this.buttonMinWidth,
			                menu: 
			                {
			                	minWidth:this.menuMinWidth,
			                	items:[{
			                        text:'<span style="font-size:14px; font-weight: bold; color: #ffffff;">Setting</span>',
			                        style:'background: #336699; padding-top: 2px; padding-bottom: 2px'
					            } , '-' , {
				                	iconCls:'fas fa-users',
				                	text:'<span style="font-size:13px; font-weight: bold; color: #000099;">Online User(s)</span>',
				                	hidden:false,
				                	disabled:false,
				                	handler: function () 
				                	{
				                		Ext.create('ezdk-generator.view.settings.OnlineUsersGridWin' , 
				                		{
						            	});
				                	}
				                } , '-' , {
				                	iconCls:'fas fa-key',
				                	text:'<span style="font-size:13px; font-weight: bold; color: #000099;">Change Password</span>',
				                	hidden:false,
				                	disabled:false,
				                	handler: function () 
				                	{
				                		Ext.create('ezdk-generator.view.settings.ChangePasswordWin' , 
				                		{
				                			username:username
						            	});
				                	}
					            } , '-' , {
				                	iconCls:'fas fa-sign-out-alt',
				                	text:'<span style="font-size:13px; font-weight: bold; color: #000099;">Logout</span>',
				                	hidden:false,
				                	handler: function () 
				                	{
				                		Ext.MessageBox.confirm(
				                			'Confirmation', 
				                			'Are you sure you want to logout?', 
				                			function ( btn ) 
				                			{
				                				if ( btn == 'yes' ) 
				                				{
							                		var url = contextRoot + '/jlogin?operationType=O&logoutURL=/login.jsp'; 
							                		location.assign( url );
				                				}
				                			}
				                		);
				                	}
				                } ] 			                	
			                }
			            } ]
					}
				} ]
			} , {
				region:'south',
				layout:'fit',
	            split:false,
	            collapsible:false,
	            heght:30,
	            html:'<span style="color: #cc3300; font-weight: bold; text-transform: uppercase; padding: 5px;">Copyright<sup>&copy;</sup> Abdallah Elgamal (Intern at Ezz Steel Company) 18/11/2018-17/2/2019. All rights reserved.</span>'
			} , {
				layout:'fit',
				region:'center',
				id:'centerRegion',
	    		html:'<img src="'+ contextRoot +'/resources/bg/img.jpg" position="absolute" z-index="-1" width="100%" height="100%" />'
			}]
		}];
		return items;
	}
});