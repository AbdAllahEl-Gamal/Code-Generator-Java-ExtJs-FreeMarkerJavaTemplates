Ext.define('ezdk-generator.view.login.Login' , {
	extend:'Ext.window.Window',
	title:'EZDK Code Generator [ Login ]',
	xtype:'loginwin',
	autoShow:true,
	iconCls:'fas fa-unlock-alt',
	controller:'login',
	requires:[ 'ezdk-generator.view.login.LoginController' ],
	layout:'form',
	closable:false,
	bodyStyle:'text-align: center;',
	padding:3,
	width:410,
	height:275,
	defaults:
	{
		labelAlign:'top'
	},
	initComponent: function()
	{
		this.items = this.createItems();
		this.buttons = this.createButtons();
		this.on( 'afterrender' , this.adjustWin , this );
		this.callParent();
	},
	createItems: function()
	{
		let items = [ {
			url:'jlogin',
			xtype:'form',
			width:400,
			height:175,
			items:[ 
			{
				xtype:'image',
				src:'resources/images/logo-as400.png',
				height:70
			} , {
				xtype:'textfield',
				id:'loginUserId',
				name:'userName',
				reference:'loginUser',
				iconCls:'',
				emptyText:'Username',
				fieldStyle:"height:35px;",
				width:350,
				maxHeight:60,
				value:'',
				listeners: 
				{
				}
			} , {
				xtype:'textfield',
				inputType:'password',
				name:'password',
				fieldStyle:"height:35px;",
				emptyText:'Password',
				width:350,
				listeners: 
				{
					specialkey:'onPasswordClick'
				},
				value:''
			} ]
		} ];
		return items;
	},
	createButtons: function()
	{
		var buttons = [ 
		{
			text:'<span style="align:center">Login</center>',
			scale:'large',
			buttonAlign:'center',
			width:'100%',
			handler:'onClick'
		}];
		return buttons;
	},
	adjustWin: function() 
	{
		var viewportMain = Ext.getCmp('viewport-login');
		var pageWidth = viewportMain.getSize().width;
		var pageHeight = viewportMain.getSize().height;
		var leftMargin = ( pageWidth - this.width ) / 2;
		var topMargin = ( pageHeight - this.height ) / 2;
		this.setPosition ( leftMargin , topMargin );
	}
});