${package}
 
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.sql.Statement;
import java.sql.ResultSet;
import com.jworx.jlogger.Logger;
import com.jworx.jrat.common.PublicObject;
import com.jworx.util.StringUtil;

/**
 * <p> Data Access Object for ${name} </p>
**/

public class ${name}DAO extends Logger { // Open Class

 public ${name}DAO ( ) 
 {
 }
 
   // Function Code : 23-517-100
  /**
   * retrieve records from database
   * @param whereCondition is String describe the extra where condition for retrieve records
   * @return Public Object
  **/
 public static PublicObject retrieve ( String whereCondition )
 {
 	PublicObject publicObject = new PublicObject();
   	ArrayList ${name?uncap_first}List = new ArrayList();   	
   	String query = "SELECT  <#list objects as object><#if !(object_has_next)>${object.columnName}<#else>${object.columnName} , </#if></#list> FROM MYTEST.${tableName}";
   	if ( whereCondition != null && ! whereCondition.trim().equals("") ) {
    query = query + " WHERE " + whereCondition;
   }
   <#assign item = objects[0]>
   query = query + " ORDER BY ${item.columnName} ASC";
   query = JRATCommon.prepareSQL ( query );
   int maxRetrievedRows = -1;
   if ( ( JRATParameter.MAX_RETRIEVED_ROWS != null ) && ( ! JRATParameter.MAX_RETRIEVED_ROWS.trim().equals("") ) && ( ! JRATParameter.MAX_RETRIEVED_ROWS.trim().equals("-1") ) )
    maxRetrievedRows = new Integer ( JRATParameter.MAX_RETRIEVED_ROWS.trim() ).intValue();
   Connection cnRC = null;
   try {
    PublicObject connObject = JRATConnection.getConnection();
    if ( connObject.isValid() ) { 
     cnRC = ( Connection ) connObject.getObject();
    } else {
     return connObject;
    }
    Statement stmRC = cnRC.createStatement();
    if ( maxRetrievedRows != -1 )
     stmRC.setMaxRows( maxRetrievedRows );
    ResultSet rsRC;
    rsRC = stmRC.executeQuery( query );
    while ( rsRC.next() ) {
     ${name}Bean ${name?uncap_first}Bean = new ${name}Bean();
     <#list objects as object>
     <#if '${object.variableType}' = "String">
     String ${object.variableName} = rsRC.getString( ${object?index+1} );
     if ( ${object.variableName} != null )
      ${name?uncap_first}Bean.set${object.variableName?cap_first}( ${object.variableName}.trim() );
     <#else>
     String ${object.variableName} = rsRC.getString( ${object?index+1} );
     if ( ${object.variableName} != null )
      ${name?uncap_first}Bean.set${object.variableName?cap_first}( new ${object.variableType} ( ${object.variableName} ) );
     </#if>
     </#list>
     ${name?uncap_first}List.add( ${name?uncap_first}Bean );
    }
    rsRC.close();
    stmRC.close();
   } catch ( SQLException sqlex ) {
    showLog( "==> " + query );
    showLog( "SQL Exception ==> " + sqlex.toString() );
    publicObject.setMessage("SQL Execption: " + sqlex.toString() );
    publicObject.setException( sqlex );
    publicObject.setInvalid();
    return publicObject;
   } finally {
    try {
     if ( cnRC != null && ! cnRC.isClosed() )
      cnRC.close();
    } catch ( SQLException sqlex ) {
     showLog("Error cannot close connection");
     publicObject.setMessage("Cannot close connection");
     publicObject.setException( sqlex );
     publicObject.setInvalid();
     return publicObject;
    }
   }
   publicObject.setObject ( ${name?uncap_first}List );
   return  publicObject;  	
 }
 
 // Function Code : 23-517-900
  /**
   * insert a new record at database mapped table [ MYTEST.${tableName} ] for object [ ${name}Bean ]
   * @param ${name?uncap_first}List is a define ${name}Bean
   * @return Public Object
  **/
 public static PublicObject insert ( ${name}Bean ${name?uncap_first}Bean )
 {
 	PublicObject publicObject = new PublicObject();
   	String insertStat =  "";
   	insertStat =  "Insert Into MYTEST.${tableName}( ";
   	insertStat = insertStat + " <#list objects as object><#if !(object_has_next)>${object.columnName}<#else>${object.columnName} , </#if></#list> ";
   	insertStat = insertStat + " ) Values ( ";
   	${item.variableType} ${item.variableName} = new ${item.variableType}( -1 );
   	PublicObject categoryIdObject = JRATCommon.getNextId ( "MYTEST.${tableName}" , "${item.columnName}" );
   	
   	if ( categoryIdObject.isValid() ) {
    ${item.variableName} = ( ${item.variableType} ) ${item.variableName}Object.getObject();
    ${name?uncap_first}Bean.set${item.variableName?cap_first}( ${item.variableName} );
   }
   insertStat = insertStat +  ${item.variableName};
   	<#list objects as object>
   	<#if object?index == 0>
    	<#continue>
  	<#else>
     <#if '${object.variableType}' = "String">
     	if ( ${name?uncap_first}Bean.get${object.variableName?cap_first} () != null ) {
     		insertStat = insertStat + " , " + "'" + StringUtil.decodeDMLString( ${name?uncap_first}Bean.get${object.variableName?cap_first}() ) + "'";
   		} else {
    	insertStat = insertStat + " , " +  " null ";
   	 }
     <#else>
		if ( ${name?uncap_first}Bean.get${object.variableName?cap_first} () != null ) {
			insertStat = insertStat + " , " + ${name?uncap_first}Bean.get${object.variableName?cap_first}().toString();
   		} else {
    	insertStat = insertStat + " , " +  " null ";
     }
     </#if>
     </#if>
     </#list>
   	insertStat = insertStat + " )";
   	insertStat = JRATCommon.prepareSQL ( insertStat );
   	Connection cnRC = null;
   	try {
    	PublicObject connObject = JRATConnection.getConnection();
    	if ( connObject.isValid() ) { 
     	cnRC = ( Connection ) connObject.getObject();
    } else {
     return connObject;
    }
    Statement stmRC	= cnRC.createStatement();
    stmRC.executeUpdate( insertStat );
    stmRC.close();
    publicObject.setObject( ${name?uncap_first}Bean );
   } catch ( SQLException sqlex ) {
    showLog( "==> " + insertStat );
    showLog( "SQL Exception ==> " + sqlex.toString() );
    publicObject.setMessage("SQL Execption: " + sqlex.toString() );
    publicObject.setException( sqlex );
    publicObject.setInvalid();
    return publicObject;
   } finally {
    try {
     if ( cnRC != null && ! cnRC.isClosed() )
      cnRC.close();
    } catch ( SQLException sqlex ) {
     showLog("Error cannot close connection");
     publicObject.setMessage("Cannot close connection");
     publicObject.setException( sqlex );
     publicObject.setInvalid();
     return publicObject;
    }
   }
   return  publicObject;
 }
 
 // Function Code : 23-517-100
  /**
   * insert a block of records at mapped table [ MYTEST.${tableName} ] for object [ ${name}Bean ]
   * @param ${name?uncap_first}List is an array list of type ${name}Bean
   * @param autoIncrement is a boolean to indicate wheather incrementing for the auto increment members required or not
   * @return Public Object
  **/
  public static PublicObject insertBatch ( ArrayList ${name?uncap_first}List , boolean autoIncrement )
  {
  	PublicObject publicObject = new PublicObject();
   String insertStat =  "";
   Connection cnRC = null;
   try {
    PublicObject connObject = JRATConnection.getConnection();
    if ( connObject.isValid() ) { 
     cnRC = ( Connection ) connObject.getObject();
    } else {
     return connObject;
    }
    Statement stmRC	= cnRC.createStatement();
    ArrayList batchList = new ArrayList();
    for ( int i = 0 ; i < ${name?uncap_first}List.size() ; i ++ ) {
     ${name}Bean ${name?uncap_first}Bean = new ${name}Bean();
     ${name?uncap_first}Bean = ( ${name}Bean ) ${name?uncap_first}List.get( i );
     insertStat =  "Insert Into MYTEST.${tableName}( ";
     insertStat = insertStat + " <#list objects as object><#if !(object_has_next)>${object.columnName}<#else>${object.columnName} , </#if></#list> ";
     insertStat = insertStat + " ) Values ( ";
     ${item.variableType} ${item.variableName} = new ${item.variableType}( -1 );
     if ( autoIncrement ) {
      PublicObject categoryIdObject = JRATCommon.getNextId ( "MYTEST.${tableName}" , "${item.columnName}" );
      if ( categoryIdObject.isValid() ) {
       ${item.variableName} = ( ${item.variableType} ) categoryIdObject.getObject();
       ${name?uncap_first}Bean.set${item.variableName?cap_first}( ${item.variableName} );
      }
      insertStat = insertStat + ${item.variableName};
     } else {
      insertStat = insertStat + ${name?uncap_first}Bean.get${item.variableName?cap_first}();
     }
    <#list objects as object>
   	<#if object?index == 0>
    	<#continue>
  	<#else>
     <#if '${object.variableType}' = "String">
     	if ( ${name?uncap_first}Bean.get${object.variableName?cap_first} () != null ) {
     		insertStat = insertStat + " , " + "'" + StringUtil.decodeDMLString( ${name?uncap_first}Bean.get${object.variableName?cap_first}() ) + "'";
   		} else {
    	insertStat = insertStat + " , " +  " null ";
   	 }
     <#else>
		if ( ${name?uncap_first}Bean.get${object.variableName?cap_first} () != null ) {
			insertStat = insertStat + " , " + ${name?uncap_first}Bean.get${object.variableName?cap_first}().toString();
   		} else {
    	insertStat = insertStat + " , " +  " null ";
     }
     </#if>
     </#if>
     </#list>
     insertStat = insertStat + " )";
     insertStat = JRATCommon.prepareSQL ( insertStat );
     try {
      stmRC.executeUpdate( insertStat );
     } catch ( SQLException sqlex ) {
      showLog( "==> " + insertStat );
      showLog( "SQL Exception ==> " + sqlex.toString() );
      publicObject.setMessage("<center>Cannot Update<p> Insertion Error  [ Code : insertBlock - 4 ]</center>");
      publicObject.setException( sqlex );
      publicObject.setInvalid();
     }
     batchList.add( ${name?uncap_first}Bean );
    }
    publicObject.setObject( batchList );
    stmRC.close();
   } catch ( SQLException sqlex ) {
    showLog( "SQL Exception ==> " + sqlex.toString() );
    publicObject.setMessage("SQL Execption: " + sqlex.toString() );
    publicObject.setException( sqlex );
    publicObject.setInvalid();
    return publicObject;
   } finally {
    try {
     if ( cnRC != null && ! cnRC.isClosed() )
      cnRC.close();
    } catch ( SQLException sqlex ) {
     showLog("Error cannot close connection");
     publicObject.setMessage("Cannot close connection");
     publicObject.setException( sqlex );
     publicObject.setInvalid();
     return publicObject;
    }
   }
   return  publicObject;
  }
  
  
  
  // Function Code : 23-517-110
  /**
   * update one column at an existing records from mapped table [ MYTEST.${tableName} ] for object [ ${name}Bean ]
   * @param ${name?uncap_first}Bean is a define ${name}Bean
   * @return error of type JRADError if error occurs, null if successfully done
  **/
  public static PublicObject updateOne ( ${name}Bean ${name?uncap_first}Bean )
  {
  	 PublicObject publicObject = new PublicObject();
   	 String updateStat = "";
     updateStat =  "UPDATE MYTEST.${tableName} SET ";
     <#list objects as object>
     <#if '${object.variableType}' = "String">
     	if ( ${name?uncap_first}Bean.get${object.variableName?cap_first} () != null ) {
     		updateStat = updateStat + " , ${object.columnName} = '" + StringUtil.decodeDMLString( ${name?uncap_first}Bean.get${object.variableName?cap_first}() ) + "'";
   		}
     <#else>
		if ( ${name?uncap_first}Bean.get${object.variableName?cap_first} () != null ) {
			updateStat = updateStat + " , ${object.columnName} = " + ${name?uncap_first}Bean.get${object.variableName?cap_first}( );
   		}
     </#if>
     </#list>
     updateStat =  updateStat + " WHERE " + " ${item.columnName} = " + ${name?uncap_first}Bean.get${item.variableName?cap_first}();
     updateStat = JRATCommon.prepareSQL ( updateStat );
   	 Connection cnRC = null;
   	 try {
   	 PublicObject connObject = JRATConnection.getConnection();
   if ( connObject.isValid() ) { 
    cnRC = ( Connection ) connObject.getObject();
   } else {
    return connObject;
   }
    Statement stmRC	= cnRC.createStatement();
    stmRC.executeUpdate( updateStat );
    stmRC.close();
   } catch ( SQLException sqlex ) {
    showLog( "==> " + updateStat );
    showLog( "SQL Exception ==> " + sqlex.toString() );
    publicObject.setMessage("SQL Execption: " + sqlex.toString() );
    publicObject.setException( sqlex );
    publicObject.setInvalid();
    return publicObject;
   } finally {
    try {
     if ( cnRC != null && ! cnRC.isClosed() )
      cnRC.close();
    } catch ( SQLException sqlex ) {
     showLog("Error cannot close connection");
     publicObject.setMessage("Cannot close connection");
     publicObject.setException( sqlex );
     publicObject.setInvalid();
     return publicObject;
    }
   }
   return  publicObject;
  }
  
  // Function Code : 23-517-110
  /**
   * update an existing records from mapped table [ MYTEST.${tableName} ] for object [ ${name}Bean ]
   * @param ${name?uncap_first}Bean is a define ${name}Bean
   * @return error of type JRADError if error occurs, null if successfully done
  **/
  public static PublicObject update ( ${name}Bean ${name?uncap_first}Bean )
  {
  	PublicObject publicObject = new PublicObject();
   	String updateStat = "";
   	updateStat =  "UPDATE MYTEST.${tableName} SET ";
   	<#list objects as object>
     <#if '${object.variableType}' = "String">
     	if ( ${name?uncap_first}Bean.get${object.variableName?cap_first} () != null ) {
     		updateStat = updateStat + " , ${object.columnName} = '" + StringUtil.decodeDMLString( ${name?uncap_first}Bean.get${object.variableName?cap_first}() ) + "'";
   		}
     <#else>
		if ( ${name?uncap_first}Bean.get${object.variableName?cap_first} () != null ) {
			updateStat = updateStat + " , ${object.columnName} = " + ${name?uncap_first}Bean.get${object.variableName?cap_first}( );
   		} else {
    	updateStat = updateStat + " , ${object.columnName} = null ";
     }
     </#if>
     </#list>
   	
   updateStat =  updateStat + " WHERE " + " ${item.columnName} = " + ${name?uncap_first}Bean.get${item.variableName?cap_first}();
   updateStat = JRATCommon.prepareSQL ( updateStat );
   Connection cnRC = null;
   try {
   PublicObject connObject = JRATConnection.getConnection();
   if ( connObject.isValid() ) { 
    cnRC = ( Connection ) connObject.getObject();
   } else {
    return connObject;
   }
    Statement stmRC	= cnRC.createStatement();
    stmRC.executeUpdate( updateStat );
    stmRC.close();
   } catch ( SQLException sqlex ) {
    showLog( "==> " + updateStat );
    showLog( "SQL Exception ==> " + sqlex.toString() );
    publicObject.setMessage("SQL Execption: " + sqlex.toString() );
    publicObject.setException( sqlex );
    publicObject.setInvalid();
    return publicObject;
   } finally {
    try {
     if ( cnRC != null && ! cnRC.isClosed() )
      cnRC.close();
    } catch ( SQLException sqlex ) {
     showLog("Error cannot close connection");
     publicObject.setMessage("Cannot close connection");
     publicObject.setException( sqlex );
     publicObject.setInvalid();
     return publicObject;
    }
   }
   return  publicObject;
  }
  
  
  
  // Function Code : 23-517-120
  /**
   * update block for existing records at mapped table [ MYTEST.${tableName} ] for object [ ${name}Bean ]
   * @param ${name?uncap_first}List is a Array List for the defined object ${name}Bean
   * @return error of type JRADError if error occurs, null if successfully done
  **/
  public static PublicObject updateBlock ( ArrayList ${name?uncap_first}List )
  {
   PublicObject publicObject = new PublicObject();
   String updateStat =  "";
   Connection cnRC = null;
   try {
   PublicObject connObject = JRATConnection.getConnection();
   if ( connObject.isValid() ) { 
    cnRC = ( Connection ) connObject.getObject();
   } else {
    return connObject;
   }
    Statement stmRC	= cnRC.createStatement();
    for ( int i = 0 ; i < ${name?uncap_first}List.size() ; i++ ) {
     ${name}Bean ${name?uncap_first}Bean = new ${name}Bean ();
     ${name?uncap_first}Bean = ( ${name}Bean ) ${name?uncap_first}List.get( i );
     updateStat =  "UPDATE MYTEST.${tableName} SET ";
     <#list objects as object>
     <#if '${object.variableType}' = "String">
     	if ( ${name?uncap_first}Bean.get${object.variableName?cap_first} () != null ) {
     		updateStat = updateStat + " , ${object.columnName} = '" + StringUtil.decodeDMLString( ${name?uncap_first}Bean.get${object.variableName?cap_first}() ) + "'";
   		}
     <#else>
		if ( ${name?uncap_first}Bean.get${object.variableName?cap_first} () != null ) {
			updateStat = updateStat + " , ${object.columnName} = " + ${name?uncap_first}Bean.get${object.variableName?cap_first}( );
   		} else {
    	updateStat = updateStat + " , ${object.columnName} = null ";
     }
     </#if>
     </#list>
     updateStat =  updateStat + " WHERE " + " ${item.columnName} = " + ${name?uncap_first}Bean.get${item.variableName?cap_first}();
     updateStat = JRATCommon.prepareSQL ( updateStat );
     try {
      stmRC.executeUpdate( updateStat );
     } catch ( SQLException sqlex ) {
      System.out.println ( "Error while updating block - Error --> " + sqlex.toString() );
      System.out.println ( "Update Statement - " + updateStat );
     }
    }
    stmRC.close();
    } catch ( SQLException sqlex ) {
     showLog( "SQL Exception ==> " + sqlex.toString() );
     publicObject.setMessage("SQL Execption: " + sqlex.toString() );
     publicObject.setException( sqlex );
     publicObject.setInvalid();
     return publicObject;
    } finally {
     try {
      if ( cnRC != null && ! cnRC.isClosed() )
       cnRC.close();
     } catch ( SQLException sqlex ) {
      showLog("Error cannot close connection");
      publicObject.setMessage("Cannot close connection");
      publicObject.setException( sqlex );
      publicObject.setInvalid();
      return publicObject;
     }
    }
   return  publicObject;
  }
  
  // Function Code : 23-517-130
  /**
   * delete an existing records from mapped table [ MYTEST.${tableName} ] for object [ ${name}Bean ]
   * @param p_szWhereCondition is String containing where condition for delete process
   * @return error of type JRADError if error occurs, null if successfully done
  **/
 public static PublicObject delete ( String  whereCondition )
  {
   PublicObject publicObject = new PublicObject();
   String deleteStat =  "DELETE FROM MYTEST.${tableName}";
   if ( whereCondition != null && ! whereCondition.trim().equals("") ) {
    deleteStat = deleteStat + " Where " + whereCondition;
   }
   deleteStat = JRATCommon.prepareSQL ( deleteStat );
   Connection cnRC = null;
   try {
    PublicObject connObject = JRATConnection.getConnection();
    if ( connObject.isValid() ) { 
     cnRC = ( Connection ) connObject.getObject();
    } else {
     return connObject;
    }
    Statement stmRC = cnRC.createStatement();
    stmRC.executeUpdate( deleteStat );
    stmRC.close();
    } catch ( SQLException sqlex ) {
     showLog( "==> " + deleteStat );
     showLog( "SQL Exception ==> " + sqlex.toString() );
     publicObject.setMessage("SQL Execption: " + sqlex.toString() );
     publicObject.setException( sqlex );
     publicObject.setInvalid();
     return publicObject;
    } finally {
     try {
      if ( cnRC != null && ! cnRC.isClosed() )
       cnRC.close();
     } catch ( SQLException sqlex ) {
      showLog("Error cannot close connection");
      publicObject.setMessage("Cannot close connection");
      publicObject.setException( sqlex );
      publicObject.setInvalid();
      return publicObject;
     }
    }
   return  publicObject;
  }

}