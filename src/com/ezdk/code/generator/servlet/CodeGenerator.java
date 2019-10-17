package com.ezdk.code.generator.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import net.sf.json.JSONObject;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.ezdk.code.generator.beans.JavaObject;


public class CodeGenerator
{ 
	private static final String TEMPLATE_FOLDER_PATH = "/com/ezdk/code/template/java/";
	private static final String TEMPLATE_FOLDER_PATH1 = "/com/ezdk/code/template/extjs/";

	public static void GetCode(HttpServletRequest request, HttpServletResponse response) throws SQLException, IOException, ServletException, TemplateException 
	{		
		String Type = request.getParameter("Type");
		switch(Type) {
			case"All":
				getAll(request, response);
				break;
			case"Java":
				getJava(request, response);
				break;
			case"ExtJs":
				getExtJs(request, response);
				break;
		}
	}
	
	@SuppressWarnings("deprecation")
	public static void getAll(HttpServletRequest request, HttpServletResponse response) throws SQLException, IOException, ServletException, TemplateException  {
		Template template=null;
		Writer file=null;
		String filePath=null;
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> dataMap = new HashMap<String, Object>();

		Configuration cfg = new Configuration();
		cfg.setClassForTemplateLoading(CodeGenerator.class, TEMPLATE_FOLDER_PATH);
		cfg.setDefaultEncoding("UTF-8");
		
		Configuration cfg1 = new Configuration();
		cfg1.setClassForTemplateLoading(CodeGenerator.class, TEMPLATE_FOLDER_PATH1);
		cfg1.setDefaultEncoding("UTF-8");
		
		String JavaType = request.getParameter("JavaType");
		String Bean = request.getParameter("Bean");
		String DAO = request.getParameter("DAO");
		String Servlet = request.getParameter("Servlet");
		
		String Repository = request.getParameter("Repository");
		String Service = request.getParameter("Service");
	    String Interface = request.getParameter("Interface");
	    String Controller = request.getParameter("Controller");
	    
	    String Form = request.getParameter("Form");
	    String Grid = request.getParameter("Grid");

	    String jsonData = request.getParameter("json");
		String className = request.getParameter("className");
		String appName = request.getParameter("appName");
		
		final String zipFilePath = "C:\\Temp\\Generator.zip";
		
		FileOutputStream fileOutputStream = new FileOutputStream(zipFilePath);
        ZipOutputStream zipOutputStream = new ZipOutputStream(fileOutputStream);
		
		if (!jsonData.isEmpty()) {
			List<JavaObject> myObjects = mapper.readValue(jsonData, new TypeReference<List<JavaObject>>() {
			});
			List<JavaObject> objects = new ArrayList<JavaObject>();
			
			dataMap.put("package", CodeGenerator.class.getPackage() + ";");
			dataMap.put("name", className);
			dataMap.put("app", appName);
			dataMap.put("tableName",myObjects.get(0).getTableName());
			for (int i = 0; i < myObjects.size(); i++) {
				objects.add(new JavaObject(myObjects.get(i).getColumnName(), myObjects.get(i).getDataType(), myObjects.get(i).getVariableName(), myObjects.get(i).getVariableType(), myObjects.get(i).getNullable(), myObjects.get(i).getxType(), myObjects.get(i).getAllowB()));
			}

			dataMap.put("objects", objects);
			switch(JavaType) {
			case"Basic Java":
				if(Bean.equals("true")) {
					template = cfg.getTemplate("JavaBean.ftl");
					file = new FileWriter(new File("C:\\Temp\\" + className + "Bean" + ".java"));
					filePath = "C:\\Temp\\" + className + "Bean" + ".java";
					template.process(dataMap, file);
					file.flush();
					zipFile(filePath, zipOutputStream);
				}
				if(DAO.equals("true")){
					template = cfg.getTemplate("JavaDao.ftl");
					file = new FileWriter(new File("C:\\Temp\\" + className + "DAO" + ".java"));
					filePath = "C:\\Temp\\" + className + "DAO" + ".java";
					template.process(dataMap, file);
					file.flush();
					zipFile(filePath, zipOutputStream);
				}
				if(Servlet.equals("true")) {
					template = cfg.getTemplate("JavaServlet.ftl");
					file = new FileWriter(new File("C:\\Temp\\" + className + ".java"));
					filePath = "C:\\Temp\\" + className + ".java";
					template.process(dataMap, file);
					file.flush();
					zipFile(filePath, zipOutputStream);
				}
				break;
			case"Spring Boot":
				if(Bean.equals("true")) {
					template = cfg.getTemplate("SpringBootBean.ftl");
					file = new FileWriter(new File("C:\\Temp\\" + className + ".java"));
					filePath = "C:\\Temp\\" + className + ".java";
					template.process(dataMap, file);
					file.flush();
					zipFile(filePath, zipOutputStream);
				}
				if(Repository.equals("true")){
					template = cfg.getTemplate("SpringBootRepository.ftl");
					file = new FileWriter(new File("C:\\Temp\\" + className + "Repository" + ".java"));
					filePath = "C:\\Temp\\" + className + "Repository" + ".java";
					template.process(dataMap, file);
					file.flush();
					zipFile(filePath, zipOutputStream);
				}
				if(Service.equals("true")) {
					template = cfg.getTemplate("SpringBootService.ftl");
					file = new FileWriter(new File("C:\\Temp\\" + className + "Service" + ".java"));
					filePath = "C:\\Temp\\" + className + "Service" + ".java";
					template.process(dataMap, file);
					file.flush();
					zipFile(filePath, zipOutputStream);
				}
				if(Interface.equals("true")) {
					template = cfg.getTemplate("SpringBootInterface.ftl");
					file = new FileWriter(new File("C:\\Temp\\" + className + "ServiceInterface" + ".java"));
					filePath = "C:\\Temp\\" + className + "ServiceInterface" + ".java";
					template.process(dataMap, file);
					file.flush();
					zipFile(filePath, zipOutputStream);
				}
				if(Controller.equals("true")) {
					template = cfg.getTemplate("SpringBootController.ftl");
					file = new FileWriter(new File("C:\\Temp\\" + className + "Controller" + ".java"));
					filePath = "C:\\Temp\\" + className + "Controller" + ".java";
					template.process(dataMap, file);
					file.flush();
					zipFile(filePath, zipOutputStream);
				}
				break;
			case"Struts":
				break;
		   }
			
			if(Form.equals("true")) 
			{
				template = cfg1.getTemplate("ExtJsForm.ftl");
				file = new FileWriter(new File("C:\\Temp\\" + "EZDK" + className + "FormWin" + ".js"));
				filePath = "C:\\Temp\\" + "EZDK" + className + "FormWin" + ".js";
				template.process(dataMap, file);
				file.flush();
				zipFile(filePath, zipOutputStream);
			}
			
			if(Grid.equals("true")) 
			{
				template = cfg1.getTemplate("ExtJsGrid.ftl");
				file = new FileWriter(new File("C:\\Temp\\" + "EZDK" + className + "GridWin" + ".js"));
				filePath = "C:\\Temp\\" + "EZDK" + className + "GridWin" + ".js";
				template.process(dataMap, file);
				file.flush();
				zipFile(filePath, zipOutputStream);
			}
			
			            
            zipOutputStream.close();
            fileOutputStream.close();
            
			
			PrintWriter out = response.getWriter();
			response.setContentType("application/json");	
			
			JSONObject myObj = new JSONObject();			
			myObj.put("success", true);
			myObj.put("filePath", zipFilePath);
			out.println(myObj.toString());
		} else {

		}
	}
	
	@SuppressWarnings("deprecation")
	public static void getJava(HttpServletRequest request, HttpServletResponse response) throws SQLException, IOException, ServletException, TemplateException  {
		Template template=null;
		Writer file=null;
		String filePath=null;
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> dataMap = new HashMap<String, Object>();
		
		Configuration cfg = new Configuration();
		cfg.setClassForTemplateLoading(CodeGenerator.class, TEMPLATE_FOLDER_PATH);
		cfg.setDefaultEncoding("UTF-8");
		
		String JavaType = request.getParameter("JavaType");
		String Bean = request.getParameter("Bean");
		String DAO = request.getParameter("DAO");
		String Servlet = request.getParameter("Servlet");
		
		String Repository = request.getParameter("Repository");
		String Service = request.getParameter("Service");
	    String Interface = request.getParameter("Interface");
	    String Controller = request.getParameter("Controller");
	    
	    String jsonData = request.getParameter("json");
		String className = request.getParameter("className");
		
		final String zipFilePath = "C:\\Temp\\Generator.zip";
		
		FileOutputStream fileOutputStream = new FileOutputStream(zipFilePath);
        ZipOutputStream zipOutputStream = new ZipOutputStream(fileOutputStream);
		
		if (!jsonData.isEmpty()) {
			List<JavaObject> myObjects = mapper.readValue(jsonData, new TypeReference<List<JavaObject>>() {
			});
			List<JavaObject> objects = new ArrayList<JavaObject>();
			
			dataMap.put("package", CodeGenerator.class.getPackage() + ";");
			dataMap.put("name", className);
			dataMap.put("tableName",myObjects.get(0).getTableName());
			for (int i = 0; i < myObjects.size(); i++) {
				objects.add(new JavaObject(myObjects.get(i).getColumnName(), myObjects.get(i).getDataType(), myObjects.get(i).getVariableName(), myObjects.get(i).getVariableType(), myObjects.get(i).getNullable(), myObjects.get(i).getxType(), myObjects.get(i).getAllowB()));
			}

			dataMap.put("objects", objects);
			switch(JavaType) {
			case"Basic Java":
				if(Bean.equals("true")) {
					template = cfg.getTemplate("JavaBean.ftl");
					file = new FileWriter(new File("C:\\Temp\\" + className + "Bean" + ".java"));
					filePath = "C:\\Temp\\" + className + "Bean" + ".java";
					template.process(dataMap, file);
					file.flush();
					zipFile(filePath, zipOutputStream);
				}
				if(DAO.equals("true")){
					template = cfg.getTemplate("JavaDao.ftl");
					file = new FileWriter(new File("C:\\Temp\\" + className + "DAO" + ".java"));
					filePath = "C:\\Temp\\" + className + "DAO" + ".java";
					template.process(dataMap, file);
					file.flush();
					zipFile(filePath, zipOutputStream);
				}
				if(Servlet.equals("true")) {
					template = cfg.getTemplate("JavaServlet.ftl");
					file = new FileWriter(new File("C:\\Temp\\" + className + ".java"));
					filePath = "C:\\Temp\\" + className + ".java";
					template.process(dataMap, file);
					file.flush();
					zipFile(filePath, zipOutputStream);
				}
				break;
			case"Spring Boot":
				if(Bean.equals("true")) {
					template = cfg.getTemplate("SpringBootBean.ftl");
					file = new FileWriter(new File("C:\\Temp\\" + className + ".java"));
					filePath = "C:\\Temp\\" + className + ".java";
					template.process(dataMap, file);
					file.flush();
					zipFile(filePath, zipOutputStream);
				}
				if(Repository.equals("true")){
					template = cfg.getTemplate("SpringBootRepository.ftl");
					file = new FileWriter(new File("C:\\Temp\\" + className + "Repository" + ".java"));
					filePath = "C:\\Temp\\" + className + "Repository" + ".java";
					template.process(dataMap, file);
					file.flush();
					zipFile(filePath, zipOutputStream);
				}
				if(Service.equals("true")) {
					template = cfg.getTemplate("SpringBootService.ftl");
					file = new FileWriter(new File("C:\\Temp\\" + className + "Service" + ".java"));
					filePath = "C:\\Temp\\" + className + "Service" + ".java";
					template.process(dataMap, file);
					file.flush();
					zipFile(filePath, zipOutputStream);
				}
				if(Interface.equals("true")) {
					template = cfg.getTemplate("SpringBootInterface.ftl");
					file = new FileWriter(new File("C:\\Temp\\" + className + "ServiceInterface" + ".java"));
					filePath = "C:\\Temp\\" + className + "ServiceInterface" + ".java";
					template.process(dataMap, file);
					file.flush();
					zipFile(filePath, zipOutputStream);
				}
				if(Controller.equals("true")) {
					template = cfg.getTemplate("SpringBootController.ftl");
					file = new FileWriter(new File("C:\\Temp\\" + className + "Controller" + ".java"));
					filePath = "C:\\Temp\\" + className + "Controller" + ".java";
					template.process(dataMap, file);
					file.flush();
					zipFile(filePath, zipOutputStream);
				}
				break;
			case"Struts":
				break;
		   }
			
			            
            zipOutputStream.close();
            fileOutputStream.close();
            
			
			PrintWriter out = response.getWriter();
			response.setContentType("application/json");	
			
			JSONObject myObj = new JSONObject();			
			myObj.put("success", true);
			myObj.put("filePath", zipFilePath);
			out.println(myObj.toString());
		} else {

		}
		
	}
	
	@SuppressWarnings("deprecation")
	public static void getExtJs(HttpServletRequest request, HttpServletResponse response) throws SQLException, IOException, ServletException, TemplateException  {
		Template template=null;
		Writer file=null;
		String filePath=null;
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> dataMap = new HashMap<String, Object>();
		
		Configuration cfg = new Configuration();
		cfg.setClassForTemplateLoading(CodeGenerator.class, TEMPLATE_FOLDER_PATH1);
		cfg.setDefaultEncoding("UTF-8");
		
		String Form = request.getParameter("Form");
	    String Grid = request.getParameter("Grid");

	    String jsonData = request.getParameter("json");
		String className = request.getParameter("className");
		String appName = request.getParameter("appName");
		
		final String zipFilePath = "C:\\Temp\\Generator.zip";
		
		FileOutputStream fileOutputStream = new FileOutputStream(zipFilePath);
        ZipOutputStream zipOutputStream = new ZipOutputStream(fileOutputStream);
        
        if (!jsonData.isEmpty()) {
			List<JavaObject> myObjects = mapper.readValue(jsonData, new TypeReference<List<JavaObject>>() {
			});
			List<JavaObject> objects = new ArrayList<JavaObject>();
			
			dataMap.put("package", CodeGenerator.class.getPackage() + ";");
			dataMap.put("name", className);
			dataMap.put("app", appName);
			dataMap.put("tableName",myObjects.get(0).getTableName());
			for (int i = 0; i < myObjects.size(); i++) {
				objects.add(new JavaObject(myObjects.get(i).getColumnName(), myObjects.get(i).getDataType(), myObjects.get(i).getVariableName(), myObjects.get(i).getVariableType(), myObjects.get(i).getNullable(), myObjects.get(i).getxType(), myObjects.get(i).getAllowB()));
			}

			dataMap.put("objects", objects);
			
			if(Form.equals("true")) 
			{
				template = cfg.getTemplate("ExtJsForm.ftl");
				file = new FileWriter(new File("C:\\Temp\\" + "EZDK" + className + "FormWin" + ".js"));
				filePath = "C:\\Temp\\" + "EZDK" + className + "FormWin" + ".js";
				template.process(dataMap, file);
				file.flush();
				zipFile(filePath, zipOutputStream);
			}
			
			if(Grid.equals("true")) 
			{
				template = cfg.getTemplate("ExtJsGrid.ftl");
				file = new FileWriter(new File("C:\\Temp\\" + "EZDK" + className + "GridWin" + ".js"));
				filePath = "C:\\Temp\\" + "EZDK" + className + "GridWin" + ".js";
				template.process(dataMap, file);
				file.flush();
				zipFile(filePath, zipOutputStream);
			}
			
			            
            zipOutputStream.close();
            fileOutputStream.close();
            
			
			PrintWriter out = response.getWriter();
			response.setContentType("application/json");	
			
			JSONObject myObj = new JSONObject();			
			myObj.put("success", true);
			myObj.put("filePath", zipFilePath);
			out.println(myObj.toString());
		} else {

		}
	}
	
	public static void zipFile(String filePath, ZipOutputStream zipOutputStream) throws IOException 
	{
		File srcFile = new File(filePath);
		
		FileInputStream fileInputStream = new FileInputStream(filePath);
        zipOutputStream.putNextEntry(new ZipEntry(srcFile.getName()));
        
        byte[] buf = new byte[1024];
        int bytesRead;

        while ((bytesRead = fileInputStream.read(buf)) > 0) 
        {
            zipOutputStream.write(buf, 0, bytesRead);
        }
        fileInputStream.close();
        zipOutputStream.closeEntry();
	}
	
}