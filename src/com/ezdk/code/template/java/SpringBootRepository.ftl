package com.ezdk..repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ${name}Repository extends JpaRepository<${name}, Long> {
	<#assign item = objects[0]>
	List<${name}> findBy${item.variableName?cap_first}(${item.variableType} ${item.variableName});
}