package com.ezdk.code.generator.servlet;


import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.Hashtable;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ezdk.code.generator.beans.UserAccount;
import com.ezdk.code.generator.conn.ConnectionUtils;
import com.ezdk.code.generator.dao.UserAccountDao;
import com.ezdk.code.generator.utils.MyUtils;
 
@WebServlet(urlPatterns = { "/jlogin" })
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
	public LoginServlet() {
        super();
    }
 
    
	private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String jsonResponse = "";
		String operationType = request.getParameter("operationType");
		
		if(!operationType.isEmpty()) {
		
			switch(operationType) 
	    	{
	    	case "attemptLogin":
	    		login(request,response);
	    		break;
	    	case "getOnlineUsers":
	    		System.out.println("Inside get online users");
	    		break;
	    	case "logout":
	    		System.out.println("operation Logout");
	    		break;
	    	}
		}else {
			 jsonResponse = "({\"success\":\"false\",\"message\":\"Invalid Passed Parameters\"})";
			 response.setContentType("application/json");
	         response.getWriter().print(jsonResponse);
		}
	}
    
    
	private void login(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String userName = request.getParameter("userName");
        String password = request.getParameter("password");
        String jsonResponse = "";
        UserAccount user = null;
	        if (userName == null || password == null || userName.length() == 0 || password.length() == 0) {
	            jsonResponse = "({\"success\":\"false\",\"message\":\"Invalid Passed Parameters\"})";
	        } else {
	        	
	        	if (ConnectionUtils.databaseConnection == null) {
	        		try {
							ConnectionUtils.databaseConnection = ConnectionUtils.getConnection();
					} catch (ClassNotFoundException e) {
						e.printStackTrace();
					} catch (SQLException e) {
						e.printStackTrace();
					}
	        	}
	            try {
	                // Find the user in the DB.
	                user = UserAccountDao.findUser(ConnectionUtils.databaseConnection, userName, password);
	                if (user == null) {
	                	jsonResponse = "({\"success\":\"false\",\"message\":\"User Name or password invalid\"})";
	                }else {
	    	            if(userName.equalsIgnoreCase(user.getUserName())  && password.equalsIgnoreCase(user.getPassword())) {
	    	            	 
	    	            	 HttpSession session = request.getSession();
	    	                
	    	                 
	    	                 Hashtable<String, Object> privilege= new Hashtable<String, Object>();
	    	                 privilege.put("USERNAME", user.getUserName());
	    	                 privilege.put("USERID", ""+user.getUserId());
	    	                 
	    	                 session.setAttribute("privilege", privilege);
	    	                 
	    	                 MyUtils.storeLoginedUser(session, user);
	    	                 jsonResponse = "({\"success\":\"true\",\"message\":\"cannot initiate a new session.\"})";
	    	            }
	    	        }
	            } catch (SQLException e) {
	                e.printStackTrace();
	                jsonResponse = "({\"success\":\"false\",\"message\":\""+ e.getMessage()+"\"})";
	            }
	        }
	        response.setContentType("application/json");
            PrintWriter out = response.getWriter();
            out.print(jsonResponse);
	}


	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		process(request, response);
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		process(request, response);
	}
 
}