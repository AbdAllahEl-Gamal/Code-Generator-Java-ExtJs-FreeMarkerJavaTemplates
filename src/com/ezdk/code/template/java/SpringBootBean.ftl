package com.ezdk.''.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(schema="mytest" , name = "${tableName}" )
@NoArgsConstructor
@Getter @Setter
public class ${name} extends AuditModel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	<#list objects as object>
	@Column(name="${object.columnName}" , nullable = ${object.nullable})
	private ${object.variableType} ${object.variableName};
	</#list>
}