package com.ezdk.code.generator.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ezdk.code.generator.beans.UserAccount;

public class UserAccountDao {
	public static UserAccount findUser(Connection conn, String userName, String password) throws SQLException 
    {
    	String sql = "Select a.USRACN, a.USRPSW, a.USRID from app_users a " + " where a.USRACN = ? and a.USRPSW= ?";
 
        PreparedStatement pstm = conn.prepareStatement(sql);
        
        pstm.setString(1, userName);
        pstm.setString(2, password);
        ResultSet rs = pstm.executeQuery();
 
        if (rs.next()) 
        {
        	  String UN = rs.getString("USRACN");
        	  String ps = rs.getString("USRPSW");
        	  int id = rs.getInt("USRID");
        	  UserAccount user = new UserAccount(UN, ps, id);
        	  return user;
        }
        return null;
    }
}
