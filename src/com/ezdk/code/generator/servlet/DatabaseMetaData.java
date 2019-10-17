package com.ezdk.code.generator.servlet;

import java.io.IOException;
import java.sql.SQLException;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import freemarker.template.TemplateException;
@WebServlet("/metadata")
public class DatabaseMetaData extends HttpServlet {

	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			process(request, response);
		} catch (TemplateException e) {
			e.printStackTrace();
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			process(request, response);
		} catch (TemplateException e) {
			e.printStackTrace();
		}
	}

	private void process(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException, TemplateException {
		try {

			String action = request.getParameter("action");

			switch (action) {
			case "getTables":
				MySQLServlet.GetTables(request, response);
				break;
			case "getColumns":
				MySQLServlet.GetColumns(request, response);
				break;
			case "getDatabases":
				MySQLServlet.GetDatabases(request, response);
				break;
			case "getCode":
				CodeGenerator.GetCode(request, response);
				break;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

	}

}
