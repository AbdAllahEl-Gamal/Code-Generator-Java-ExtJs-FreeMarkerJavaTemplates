<%@ page import="java.util.Hashtable"%>
<%
String contextRoot = request.getContextPath();
if ( session.getAttribute("privilege") != null ) {
	Hashtable privilege = ( Hashtable ) session.getAttribute("privilege");

	String username = "";
	if ( privilege.get("USERNAME") != null ) {
		username = ( ( String ) privilege.get("USERNAME") ).trim().toUpperCase();
	}
	String userid = "";
	if ( privilege.get("USERID") != null ) {
		userid = ( ( String ) privilege.get("USERID") ).trim().toUpperCase();
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>EZDKJavaGenerator [ Home ]</title>
	</head>
	<body>
		<link type="text/css" href="<%=contextRoot%>/resources/css/fontawesome-all.css" rel="stylesheet"/>
		<link type="text/css" href="<%=contextRoot%>/extjs/theme-neptune/resources/theme-neptune-all.css" rel="stylesheet"/>
		<link type="text/css" href="<%=contextRoot%>/extjs/packages/charts/classic/neptune/resources/charts-all.css" rel="stylesheet">
		<link type="text/css" href="<%=contextRoot%>/resources/css/app.css" rel="stylesheet"/>
		<script type="text/javascript">
			var contextRoot = '<%=contextRoot%>';
			var username= '<%=username%>';
			var userid= '<%=userid%>';
		</script>
		<script type="text/javascript" src="<%=contextRoot%>/extjs/ext-all.js"></script>
		<script type="text/javascript" src="<%=contextRoot%>/extjs/packages/ux/classic/ux.js"></script>
		<script type="text/javascript" src="<%=contextRoot%>/extjs/theme-neptune/theme-neptune.js"></script>
		<script type="text/javascript" src="<%=contextRoot%>/extjs/ext-util.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.js"></script>
		<script type="text/javascript" src="<%=contextRoot%>/app.js"></script>
	</body>
</html>
<%
} else {
	response.sendRedirect( contextRoot + "/login.jsp" );
}
%>