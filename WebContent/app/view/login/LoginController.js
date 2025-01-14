Ext.define('ezdk-generator.view.login.LoginController' , {
	extend:'Ext.app.ViewController',
	alias:'controller.login',
	onClick: function()
	{
		this.validateLogin();
	},
	onPasswordClick: function( field, e )
	{
		if( e.getKey() == e.ENTER )
		{
			this.validateLogin();
		}
	},
	validateLogin: function()
	{
		var me = this;
		var form = this.getView().items.items[0].getForm();
		var mainport = this.getView().up('viewport');
		Ext.getDoc().on('contextmenu', function(ev) 
		{
			ev.preventDefault();
		});
        if (form.isValid()) 
        {
            form.submit({
            	waitMsg:'Login ...',
                success: function( form, action ) 
                {
                	var responseText = action.response.responseText;
                	var json = eval(responseText);
                	if ( json.changePassword != undefined && json.changePassword == 'Y' ) 
                	{
                		var userName = Ext.getCmp('loginUserId').getValue();
                		Ext.create('ezdk-generator.view.settings.ChangePasswordWin' , 
                		{
                			userName:userName 
		            	});
                	} else 
                	{
	                	var url = 'index.jsp';
	                	location.assign( url );
                	}
                },
                failure: function( form, action ) 
                {
                	var responseText = action.response.responseText;
                	var json = eval ( responseText );
                	if ( json.changePassword != undefined && json.changePassword == 'Y' ) 
                	{
                		var userName = Ext.getCmp('loginUserId').getValue();
                		Ext.create('ezdk-generator.view.settings.ChangePasswordWin', 
                		{
                			userName:userName 
		            	});
                	} else 
                	{
	                	if ( json.message != undefined ) 
	                	{
	                		Ext.Msg.alert('Failed', json.message);
	                	} else {
	                		Ext.Msg.alert('Failed', 'Login Failed - Server Response Error');
	                	}
                	}
                },
                params:
                {
                	operationType:'attemptLogin'
                }
            });
        }
	}
});