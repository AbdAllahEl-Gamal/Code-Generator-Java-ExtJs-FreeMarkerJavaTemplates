package com.ezdk.code.generator.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ezdk.code.generator.beans.Database;
import com.ezdk.code.generator.beans.JavaObject;
import com.ezdk.code.generator.dao.MySQLDao;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

 
public class MySQLServlet 
{ 
    
    public static void GetTables(HttpServletRequest request, HttpServletResponse response) throws SQLException, IOException 
    {
    	try {
    		
    		PrintWriter out = response.getWriter();
			response.setContentType("application/json");	
    		
    		JSONArray arrayObj = new JSONArray();

			ArrayList<Database> Db = MySQLDao.getList(request, response);
			
			for(int i=0;i<Db.size();i++){
				Database d = Db.get(i);
				JSONObject Obj = JSONObject.fromObject(d);
				arrayObj.add(Obj);
				}
			
			JSONObject myObj = new JSONObject();			
			myObj.put("success", true);
			myObj.put("tables", arrayObj);
			out.println(myObj.toString());
	        out.close();			
    	
    	} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
    
    public static void GetDatabases(HttpServletRequest request, HttpServletResponse response) throws SQLException, IOException 
    {
    	try {
    		
    		PrintWriter out = response.getWriter();
			response.setContentType("application/json");	
    		
    		JSONArray arrayObj = new JSONArray();

			ArrayList<JavaObject> Db = MySQLDao.getList3();
			
			for(int i=0;i<Db.size();i++){
				JavaObject d = Db.get(i);
				JSONObject Obj = JSONObject.fromObject(d);
				arrayObj.add(Obj);
				}
			
			JSONObject myObj = new JSONObject();			
			myObj.put("success", true);
			myObj.put("databases", arrayObj);
			out.println(myObj.toString());
	        out.close();			
    	
    	} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
    
    public static void GetColumns(HttpServletRequest request, HttpServletResponse response) throws SQLException, IOException
    {
    	try {
    		
    		PrintWriter out = response.getWriter();
    		response.setContentType("application/json");	     
        
    		JSONArray arrayObj = new JSONArray();
		
		
    		ArrayList<Database> Db = MySQLDao.getList2(request, response);
		
    		for(int i=0;i<Db.size();i++){                                
    			Database d = Db.get(i);
    			JSONObject Obj = JSONObject.fromObject(d);
    			arrayObj.add(Obj);
    		}
    		JSONObject myObj = new JSONObject();                                

    		myObj.put("success", true);
    		myObj.put("tables", arrayObj);
    		out.println(myObj.toString());
    		out.close();
    		
    	} catch (ClassNotFoundException | SQLException e) {
		e.printStackTrace();
		}
    }
}
