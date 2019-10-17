<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
       "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>EZDKJavaGenerator [ Login ]</title>
	</head>
	<body>
		<link href="resources\css\fontawesome-all.css" rel="stylesheet" />
		<link href="extjs\theme-neptune\resources\theme-neptune-all.css" rel="stylesheet" />
		<link href="resources\css\app.css" rel="stylesheet" />
		<script src="extjs\ext-all.js"></script>
		<script src="extjs\theme-neptune\theme-neptune.js"></script>
		<script>
		Ext.application ( {
			name: 'ezdk-generator',
			mainView: {
				id: 'viewport-login',
				xtype: 'viewport',
				layout : 'border',
				border: false,
				frame: false,
				defaults : {
					border : true
				},
				items: [{
					region:'center',
					bodyStyle: "background-image:url('resources/images/ezdk-bg.jpg') !important; background-size: 100% auto; margin-left : 5;",
					items: [{
						xtype: 'image',
						src: 'resources/images/logo-ezdk.jpg',
						cls:'ezdkimage',
						width: 175,
						height: 175
					}]
				}]
			},
			launch: function () {
				Ext.create('ezdk-generator.view.login.Login');
			}
		 } );
		</script>	
	</body>
</html>