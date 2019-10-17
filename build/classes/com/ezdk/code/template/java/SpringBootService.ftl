package com.ezdk.security.service;

import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.ezdk.security.model.${name};
import com.ezdk.security.repository.${name}Repository;
<#assign item = objects[0]>

@Service
public class ${name}Service implements ${name}ServiceInterface{
	@Autowired
    private ${name}Repository ${name?uncap_first}Repository;
	
	@Override
	public ${name} create${name}(${name} ${name?uncap_first}) {
		return ${name?uncap_first}Repository.save(${name?uncap_first});
	}

	@Override
	public ${name} edit${name}(${name} ${name?uncap_first}) {
		return ${name?uncap_first}Repository.save(${name?uncap_first});
	}

	@Override
	public ${name} delete${name}(${name} ${name?uncap_first}) {
		return ${name?uncap_first}Repository.save(${name?uncap_first});
	}
	
	@Override
	public void delete${name}ById(${item.variableType} ${item.variableName}) {
		${name?uncap_first}Repository.deleteById(${item.variableName});
	}

	@Override
	public List getAll${name}s(int pageNumber, int pageSize) {
		return ${name?uncap_first}Repository.findAll(new PageRequest(pageNumber, pageSize)).getContent();
	}

	@Override
	public List getAll${name}s() {
		return ${name?uncap_first}Repository.findAll();
	}

	@Override
	public long count${name}s() {
		return ${name?uncap_first}Repository.count();
	}

	@Override
	public List<${name}> get${name}ById(${item.variableType} ${item.variableName}) {
		return ${name?uncap_first}Repository.findBy${item.variableName?cap_first}(${item.variableName});
	}

}