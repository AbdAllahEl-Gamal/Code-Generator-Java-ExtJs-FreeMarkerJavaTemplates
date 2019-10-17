${package}

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletContext;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.StringTokenizer;
import com.jworx.jrat.common.PublicObject;
import com.jworx.util.StringUtil;

/**
 **/
public class ${name} extends HttpServlet {	// Open Class

	public void init( ServletConfig config )
	throws ServletException
	{
		super.init( config );
	}
	
	/* getSession  [ S t a r t ] */
	private PublicObject getSession ( HttpServletRequest request , HttpServletResponse response )
	throws ServletException, IOException
	{
		PublicObject publicObject = new PublicObject();
		HttpSession session = request.getSession();
		if ( session == null ) {
			publicObject.setInvalid();
			publicObject.setMessage("Error cannot create session");
		} else {
			publicObject.setObject( session );
		}
		return publicObject;
	}
	/* getSession  [ E n d ] */
	
	/**
	* create the JSON object response for the ArchCategory list
	*/
	private static StringBuffer createJSONObjectResponse ( int start , int limit , ArrayList ${name?uncap_first}List , String isForm  ) 
	{
		StringBuffer responseText = new StringBuffer ( "({\"success\":\"true\",\"totalCount\":\"" + ${name?uncap_first}List.size() + "\",\"${name?uncap_first}List\":[" );
		if( isForm.equalsIgnoreCase("true") ) {
			responseText = new StringBuffer ("({success:true,data: "); 
		}
		for ( int j = start ; ( j < start + limit || limit == -1 ) && j < ${name?uncap_first}List.size()  ; j ++ ) {
			${name}Bean ${name?uncap_first}Bean = new ${name}Bean();
			${name?uncap_first}Bean = ( ${name}Bean ) ${name?uncap_first}List.get( j );
			responseText.append ( "{" );
			<#list objects as object>
			String ${object.variableName} = "";
			if ( ${name?uncap_first}Bean.get${object.variableName?cap_first}( ) != null ) {
				${object.variableName} = ${name?uncap_first}Bean.get${object.variableName?cap_first}( ).toString();
			} else {
				${object.variableName} = "";
			}
			${object.variableName} = StringUtil.decodeASCIIEntryString( ${object.variableName} );
			responseText.append ( "\"${object.variableName}\":\"" + ${object.variableName} + "\"" );
			<#if !(object_has_next)>responseText.append ( "}" );<#else>responseText.append ( "," );</#if>
			</#list>
			if ( j != start + limit - 1 && j != ${name?uncap_first}List.size() - 1 ) {
				responseText.append ( "," );
			}
		}
		if( isForm.equalsIgnoreCase("true") ) {
			responseText.append ( "})" );
		} else {
			responseText.append ( "]})" );
		}
		return responseText;
	}
	
	/* refresh  [ S t a r t ] */
	public void refresh ( HttpServletRequest request , HttpServletResponse response )
	throws ServletException, IOException
	{
		String responseText ="";
		/* C o n s t r u c t   W h e r e   C o n d i t i o n   &   P a s s  e d    P a r a m e t e r s [ S t a r t ] */
		String whereCondition = "";
		// retrieved where condition depends on object members - Parameter Flag
		<#list objects as object>
			 String ${object.variableName} = "";
		</#list>
		if ( request.getParameter("whereCondition") == null ) {
		<#list objects as object>
		<#if '${object.variableType}' = "String">
		${object.variableName} = request.getParameter("${object.variableName}");
			if ( ${object.variableName} != null && ! ${object.variableName}.trim().equals("") ) {
				if ( whereCondition.trim().equals("") )
					whereCondition = "${object.columnName} LIKE '%" + ${object.variableName} + "%'" ;
				else
					whereCondition =  whereCondition + " AND ${object.columnName} LIKE '%" + ${object.variableName} + "%'" ;
			}
		<#else>
		${object.variableName} = request.getParameter("${object.variableName}");
			if ( ${object.variableName} != null && ! ${object.variableName}.trim().equals("") ) {
				if ( whereCondition.trim().equals("") )
					whereCondition = "${object.columnName} = " + ${object.variableName} ;
				else
					whereCondition = whereCondition + " AND ${object.columnName} = " + ${object.variableName} ;
			}
		</#if>
		</#list>
		}
			else {
			whereCondition = request.getParameter("whereCondition");
		}
		whereCondition = whereCondition.replace(';','%');
		/* C o n s t r u c t   W h e r e   C o n d i t i o n   &   P a s s  e d    P a r a m e t e r s [ E n d ] */
		PublicObject publicObject = new PublicObject();
		publicObject = ${name}DAO.retrieve( whereCondition );
		if ( publicObject.isValid() ) {
			String startParam = request.getParameter("start");
			String limitParam = request.getParameter("limit");
			int start = 0;
			if ( startParam != null &&  ! startParam.trim().equals("") ) {
				start = Integer.parseInt( startParam );
			}
			int limit = -1;
			if ( limitParam != null &&  ! limitParam.trim().equals("") ) {
				limit = Integer.parseInt( limitParam );
			}
			ArrayList ${name?uncap_first}List = ( ArrayList ) publicObject.getObject();
			String isForm = request.getParameter("isForm");
			if ( isForm == null || isForm.trim().equals("") ) {
				isForm = "false"; // grid is the default operation
			}
			responseText = createJSONObjectResponse( start , limit , ${name?uncap_first}List , isForm ).toString();
		} else {
			responseText = "({\"success\":\"false\",\"message\":\"" + publicObject.getMessage() + "\"})";
		}
		response.getWriter().write( responseText );
	}
	/* refresh  [ E n d ] */

	/*retrieve  [ S t a r t ] */
	private void retrieve ( HttpServletRequest request , HttpServletResponse response )
	throws ServletException, IOException
	{
		refresh( request , response );
		return;
	}
	/*retrieve  [ E n d ] */
	
	/* insert  [ S t a r t ] */
	public void insert ( HttpServletRequest request , HttpServletResponse response ) 
	throws ServletException, IOException
	{
		<#list objects as object>
			 String ${object.variableName} = "";
		</#list>
		<#list objects as object>
		${object.variableName} = request.getParameter( "${object.variableName}" );
		if  (${object.variableName} != null ) {
			${object.variableName} = ${object.variableName}.trim();
		}
		</#list>
		
		
		${name}Bean ${name?uncap_first}Bean = new ${name}Bean();
		<#list objects as object>
		<#if '${object.variableType}' = "String">
		if (  ${object.variableName} != null ) {
			${name?uncap_first}Bean.set${object.variableName?cap_first}( ${object.variableName} );
		} else {
			${name?uncap_first}Bean.set${object.variableName?cap_first}( null );
		}
		<#else>
		if ( ${object.variableName} != null && ! ${object.variableName}.equals("") ) {
			${name?uncap_first}Bean.set${object.variableName?cap_first}( new ${object.variableType}( ${object.variableName} ) );
		} else {
			${name?uncap_first}Bean.set${object.variableName?cap_first}( null );
		}
		</#if>
		</#list>
		PublicObject publicObject = new PublicObject();
		publicObject = ${name}DAO.insert( ${name?uncap_first}Bean );
		String responseText = "";
		if ( publicObject.isValid() ) {
			responseText = "({\"success\":\"true\",\"message\":\"new record inserted.\"})";
		} else {
			responseText = "({\"success\":\"false\",\"message\":\"" + publicObject.getMessage() + "\"})";
		}
		response.getWriter().write( responseText );
	}
	/* insert  [ E n d ] */
	
	/* update  [ S t a r t ] */
	public void update ( HttpServletRequest request , HttpServletResponse response )
	throws ServletException, IOException
	{
		<#list objects as object>
			 String ${object.variableName} = "";
		</#list>
		<#list objects as object>
			 ${object.variableName} = request.getParameter( "${object.variableName}" );
			 if  (${object.variableName} != null ) {
			${object.variableName} = ${object.variableName}.trim();
		}
		</#list>
		${name}Bean ${name?uncap_first}Bean = new ${name}Bean();
		<#list objects as object>
		if ( ${object.variableName} != null && ! ${object.variableName}.equals("") ) {
			${name?uncap_first}Bean.set${object.variableName?cap_first}( new ${object.variableType}( ${object.variableName} ) );
		} else {
			${name?uncap_first}Bean.set${object.variableName?cap_first}( null );
		}
		</#list>
		PublicObject publicObject = new PublicObject();
		if ( request.getParameter("updateOne") != null && request.getParameter("updateOne").trim().equalsIgnoreCase("N") ) {
			publicObject = ${name}DAO.update( ${name?uncap_first}Bean );
		} else {
			publicObject = ${name}DAO.updateOne( ${name?uncap_first}Bean );
		}
		String responseText = "";
		if ( publicObject.isValid() ) {
			responseText = "({\"success\":\"true\",\"message\":\"record updated successfully.\"})";
			WebBean.reload();
		} else {
			responseText = "({\"success\":\"false\",\"message\":\"" + publicObject.getMessage() + "\"})";
		}
		response.getWriter().write( responseText );
	}
	/* update  [ E n d ] */
	
	/* updateBatch  [ S t a r t ] */
	public void updateBatch ( HttpServletRequest request , HttpServletResponse response )
	throws ServletException, IOException
	{
		String responseText = "";
		int totalRecords = 0;
		int updatedRecords = 0;
		if ( request.getParameter("recordCount") != null && ! request.getParameter("recordCount").trim().equals("") ) {
			totalRecords = Integer.parseInt( request.getParameter("recordCount").trim() );
			for ( int currentRowId = 0 ; currentRowId < totalRecords ; currentRowId++ ) {
				<#assign item = objects[0]>
				<#list objects as object>
					String ${object.variableName} = "";
				</#list>
				<#list objects as object>
				${object.variableName} = request.getParameter( "{object.variableName}_" + currentRowId );
				if  ({object.variableName} != null ) {
					{object.variableName} = {object.variableName}.trim();
				}
				</#list>
				${name}Bean ${name?uncap_first}Bean = new ${name}Bean();
				<#list objects as object>
				if ( ${object.variableName} != null && ! ${object.variableName}.equals("") ) {
					${name?uncap_first}Bean.set${object.variableName?cap_first}( new ${object.variableType}( ${object.variableName} ) );
				} else {
					${name?uncap_first}Bean.set${object.variableName?cap_first}( null );
				}
				</#list>
				PublicObject publicObject = new PublicObject();
				publicObject = ${name}DAO.update( ${name?uncap_first}Bean );
				if ( publicObject.isValid() )
					updatedRecords ++;
			}
		}
		if ( updatedRecords == totalRecords ) {
			responseText = "({\"success\":\"true\",\"message\":\"" + updatedRecords + " record(s) updated.\"})";
		} else {
			responseText = "({\"success\":\"false\",\"message\":\"only " + updatedRecords + " of " + totalRecords + " record(s) updated.\"})";
		}
		response.getWriter().write( responseText );
	}
	/* updateBatch  [ E n d ] */
	
	/* delete  [ S t a r t ] */
	public void delete ( HttpServletRequest request , HttpServletResponse response ) 
	throws ServletException, IOException
	{
		String responseText = "";
		<#assign item = objects[0]>
		String deletedId = request.getParameter("${item.variableName}");
		if ( deletedId != null && ! deletedId.trim().equals("") ) {
			PublicObject publicObject = new PublicObject();
			publicObject = ${name}DAO.delete( "${item.columnName} = " + deletedId );
			if ( publicObject.isValid() ) {
				responseText = "({\"success\":\"true\",\"message\":\"record deleted successfully.\"})";
				WebBean.reload();
			} else {
				responseText = "({\"success\":\"false\",\"message\":\"" + publicObject.getMessage() + "\"})";
			}
		} else {
			responseText = "({\"success\":\"false\",\"message\":\"invalid passed parameters\"})";
		}
		response.getWriter().write( responseText );
	}
	/* delete  [ E n d ] */
	
	public void process ( HttpServletRequest request , HttpServletResponse response )
	throws ServletException , IOException
	{
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=UTF-8");
		String operationType = request.getParameter("operationType");
		if ( operationType == null || operationType.trim().equals("") ) {
			operationType = "R"; //Retrieve is the default operation
		}
		boolean accessRight = false;
		// Security Privilege Check [ Note: LoginUser @ Session ]
		PublicObject sessionObject = getSession( request , response );
		if ( sessionObject.isValid() ) {
			HttpSession session = ( HttpSession ) sessionObject.getObject();
			if ( session.getAttribute("privilege") != null ) {
				JRATSecurity checker = new JRATSecurity();
				accessRight = checker.checkPrivilege ( ( Hashtable ) session.getAttribute("privilege") , "${name}", operationType );
			}
		}
		if ( accessRight ) { // User Authorized to do this operation
			if ( operationType.length() > 0 ) {
				switch ( operationType.charAt( 0 ) ) {
				case 'R': //retrieve
					retrieve( request , response );
					break;
				case 'I': // insert
					insert( request , response );
					break;
				case 'U': // update
					update( request , response );
					break;
				case 'B': // update block
					updateBatch( request , response );
					break;
				case 'D': // delete
					delete( request , response );
					break;
				}
			}
		} else { //In case of security enabled and user has no authontication to do the given operation for this table
			String responseText = "({\"success\":\"false\",\"message\":\"authorization failed.\"})";
			response.getWriter().write( responseText );
		}
	}
	
	
	public void doGet( HttpServletRequest request , HttpServletResponse response )
	throws ServletException , IOException
	{
		process ( request , response );
	}

	public void doPost ( HttpServletRequest request , HttpServletResponse response )
	throws ServletException , IOException
	{
		process ( request , response );
	}

	public void doPut ( HttpServletRequest request , HttpServletResponse response )
	throws ServletException , IOException
	{
		// No Action Defined
	}

	public void doDelete ( HttpServletRequest request , HttpServletResponse response )
	throws ServletException , IOException
	{
		// No Action Defined
	}
} // Class Close