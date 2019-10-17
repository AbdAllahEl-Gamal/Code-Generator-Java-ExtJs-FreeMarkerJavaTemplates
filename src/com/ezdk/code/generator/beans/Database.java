package com.ezdk.code.generator.beans;

public class Database {
	private String tableName;
	private String columnName;
	private String variableName;
	private String variableType;
	private String dataType;
	private String Nullable;

	public Database(String tableName, String columnName, String dataType, String variableName, String variableType, String Nullable) {
		this.tableName = tableName;
		this.columnName = columnName;
		this.dataType = dataType;
		this.variableName = variableName;
		this.variableType = variableType;
		this.Nullable = Nullable;
	}

	public Database(String tableName) {
		this.tableName = tableName;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	
	public String getColumnName() {
		return columnName;
	}

	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}
	
	public String getDataType() {
		return dataType;
	}

	public void setDataType(String dataType) {
		this.dataType = dataType;
	}
	
	public String getVariableName() {
		return variableName;
	}

	public void setVariableName(String variableName) {
		this.variableName = variableName;
	}
	
	public String getVariableType() {
		return variableType;
	}

	public void setVariableType(String variableType) {
		this.variableType = variableType;
	}
	
	public String getNullable() {
		return Nullable;
	}

	public void setNullable(String nullable) {
		this.Nullable = nullable;
	}

}