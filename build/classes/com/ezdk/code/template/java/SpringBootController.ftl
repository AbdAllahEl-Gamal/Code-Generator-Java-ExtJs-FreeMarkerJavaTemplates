package com.ezdk.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ezdk.exception.ResourceNotFoundException;
import com.ezdk.model.${name};
import com.ezdk.repository.${name}Repository;

import java.util.List;

import javax.validation.Valid;
<#assign item = objects[0]>

@RestController
@RequestMapping("/${name?uncap_first}")
public class ${name}Controller {
	
	@Autowired
    ${name}Repository ${name?uncap_first}Repository;
	
	@GetMapping("/all")
    public Page<${name}> getAll${name}s(Pageable pageable) {
        return ${name?uncap_first}Repository.findAll(pageable);
    }
    
    @GetMapping("/id")
    public ${name} get${name}ById(@RequestParam ${item.variableType} ${item.variableName}) {
        return ${name?uncap_first}Repository.findById(${item.variableName}).orElseThrow(() -> new ResourceNotFoundException("${name}Id " + ${item.variableName} + " not found"));
    }

    @PostMapping("/create")
    public ${name} create${name?cap_first}(@Valid @RequestBody ${name} ${name?uncap_first}) {
        return ${name?uncap_first}Repository.save(${name?uncap_first});
    }
    
    @PostMapping("/saveList")
    public List<${name}> create${name}List(@Valid @RequestBody List<${name}> ${name?uncap_first}s) {
        return ${name?uncap_first}Repository.saveAll(${name?uncap_first}s);
    }

    @PutMapping("/update")
    public ${name} update${name}(@Valid @RequestBody ${name} ${name?uncap_first}) {
        return ${name?uncap_first}Repository.findById(${name?uncap_first}.get${name}Id()).map(old${name}Data -> {
            return ${name?uncap_first}Repository.save(${name?uncap_first});
        }).orElseThrow(() -> new ResourceNotFoundException("${name}Id " + ${name?uncap_first}.get${name}Id() + " not found"));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete${name}(@RequestParam ${item.variableType} ${item.variableName}) {
        return ${name?uncap_first}Repository.findById(${item.variableName}).map(old${name}Data -> {
            ${name?uncap_first}Repository.deleteById(${item.variableName});
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("${name}Id " + ${item.variableName} + " not found"));
    }
    
    @DeleteMapping("/deleteList")
    public ResponseEntity<?> delete${name}List(@RequestBody List<${name}> ${name?uncap_first}s) {
         ${name?uncap_first}Repository.deleteAll(${name?uncap_first}s);
         return ResponseEntity.ok().build();
    }
}