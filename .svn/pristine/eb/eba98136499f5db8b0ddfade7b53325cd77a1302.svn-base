package com.ezdk.security.service;

import java.util.List;

import com.ezdk.security.model.${name};


public interface ${name}ServiceInterface {
	<#assign item = objects[0]>
	${name} create${name}(${name} ${name?uncap_first});

	${name} edit${name}(${name} ${name?uncap_first});

	void delete${name}(${name} ${name?uncap_first});

	void delete${name}ById(${item.variableType} ${item.variableName});

	List getAll${name}s(int pageNumber, int pageSize);

	List getAll${name}s();

	long count${name}s();
	
	List<${name}> get${name}ById(${item.variableType} ${item.variableName});
}
