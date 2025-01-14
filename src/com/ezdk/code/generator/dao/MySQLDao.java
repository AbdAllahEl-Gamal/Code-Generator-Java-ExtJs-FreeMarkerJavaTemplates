package com.ezdk.code.generator.dao;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import com.ezdk.code.generator.beans.Database;
import com.ezdk.code.generator.beans.JavaObject;

public class MySQLDao extends HttpServlet {
	private static final long serialVersionUID = 1L;
	static Connection con = null;                      
	
	public static ArrayList<Database> getList(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException
	{
		try{

            con = connection();
			
			DatabaseMetaData databaseMetaData = con.getMetaData();
			
			String databaseName = request.getParameter("databaseName");
			
			ResultSet rs = databaseMetaData.getTables(databaseName, null, "%", null);
			System.out.println(databaseMetaData.getUserName());
			System.out.println(databaseMetaData.getDatabaseProductName());
			ArrayList<Database> Db = new ArrayList<>();
			
		    while(rs.next()) 
		    {
		    	String tableName = rs.getString(3);
				Database D = new Database(tableName);
		    	Db.add(D);
		    }
		    return Db;
		
		}
		
		catch (SQLException e){
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NamingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		finally {                                                       
                                                                

            if (con != null) {                                      
                try {                                                   
                    con.close();                                          
                } catch (SQLException sqlex) {                           
                }                                                       

                con = null;                                            
            }                                                        
        }
		
		return null;	
	}
	
	public static ArrayList<Database> getList2(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException
	{
		try{
			
			con = connection();
			
			DatabaseMetaData databaseMetaData = con.getMetaData();
			
			String table = request.getParameter("tableName");
			String databaseName = request.getParameter("databaseName");
			
			ResultSet rs = databaseMetaData.getColumns(databaseName, null, table, null);
			ArrayList<Database> Db = new ArrayList<>();
			
		    while(rs.next()) 
		    {
		    	String tableName = rs.getString(3);
		    	String columnName = rs.getString("COLUMN_NAME");
		    	String Nullable;
		    	int nullable = rs.getInt("NULLABLE");
		    	if (nullable == DatabaseMetaData.columnNullable) 
		    	{
		    		Nullable = "true";
		    	} 
		    	else 
		    	{
		    		Nullable = "false";
		        }
		    	String variableName = rs.getString("COLUMN_NAME");
		    	
		    	if( variableName.indexOf("_") == -1 )
		    	{
		    		StringBuffer s = new StringBuffer(); 
		    		char ch = ' '; 
		            for (int i = 0; i < rs.getString("COLUMN_NAME").length(); i++) { 
		                if (ch == ' ' && rs.getString("COLUMN_NAME").charAt(i) != ' ') 
		                    s.append(Character.toLowerCase(rs.getString("COLUMN_NAME").charAt(i))); 
		                else
		                    s.append(rs.getString("COLUMN_NAME").charAt(i)); 
		                ch = rs.getString("COLUMN_NAME").charAt(i); 
		            } 
		            variableName = s.toString().trim();
		    	}
		    	
		    	else 
		    	{
		    		variableName = rs.getString("COLUMN_NAME").toLowerCase();
	                StringBuilder sb = new StringBuilder();
	                boolean capitalizeNext = false;
	                for (char c :  variableName.toCharArray()) {
	                    if (c == '_') {
	                        capitalizeNext = true;
	                    } else {
	                        if (capitalizeNext) {
	                            sb.append(Character.toUpperCase(c));
	                            capitalizeNext = false;
	                        } else {
	                            sb.append(c);
	                        }
	                    }
	                }
	                variableName = sb.toString();
		    	}
                String dataType = rs.getString("TYPE_NAME");
                String variableType = null;
                switch(dataType) {
                case "CHARACTER":
                case "VARCHAR":
                case "LONGVARCHAR":
                case "CHAR":
                	variableType = "String";
                	break;
                case "INTEGER":
                case "INT":
                	variableType = "int";
                	break;
                case "DECIMAL":
                case "NUMERIC":
                	variableType = "long";
                	break;
                case "BINARY":
                case "VARBINARY":
                case "LONGVARBINARY":
                	variableType = "byte []";
                	break;
                case "FLOAT":
                case "DOUBLE":
                	variableType = "double";
                	break;
                case "DATE":
                	variableType = "Date";
                	break;
                case "TIME":
                	variableType = "Time";
                	break;
                case "TIMESTAMP":
                	variableType = "Timestamp";
                	break;
                case "REAL":
                	variableType = "float";
                	break;
                case "BIGINT":
                	variableType = "long";
                	break;
                case "BIT":
                	variableType = "boolean";
                	break;
                case "TINYINT":
                	variableType = "byte";
                	break;
                case "SMALLINT":
                	variableType = "short";
                	break;	
                }
				Database D = new Database(tableName, columnName, dataType, variableName, variableType, Nullable);
		    	Db.add(D);
		    }
		    return Db;
		    
		
		}
		
		catch (SQLException | NamingException e){
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		finally {                                                       
                                                                

            if (con != null) {                                      
                try {                                                   
                    con.close();                                          
                } catch (SQLException sqlex) {                           
                }                                                       

                con = null;                                            
            }                                                        
        }
		
		return null;	
	}
	
	public static ArrayList<JavaObject> getList3() throws ClassNotFoundException, SQLException
	{
		try{
			
			con = connection();
			
			DatabaseMetaData databaseMetaData = con.getMetaData();
			
			ResultSet rs = databaseMetaData.getCatalogs();
		
			ArrayList<JavaObject> Db = new ArrayList<>();
			
		    while(rs.next()) 
		    {
		    	String databaseName = rs.getString("TABLE_CAT");
				JavaObject D = new JavaObject(databaseName);
		    	Db.add(D);
		    }
		    return Db;
		
		}
		
		catch (SQLException e){
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NamingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		finally {                                                       
                                                                

            if (con != null) {                                      
                try {                                                   
                    con.close();                                          
                } catch (SQLException sqlex) {                           
                }                                                       

                con = null;                                            
            }                                                        
        }
		
		return null;	
	}
	
	public static Connection connection() throws NamingException, SQLException 
	{
		Context ctx = (Context) new InitialContext().lookup("java:comp/env");
        con = ((DataSource) ctx.lookup("jdbc/mysql")).getConnection(); 
		return con;		
	}
}