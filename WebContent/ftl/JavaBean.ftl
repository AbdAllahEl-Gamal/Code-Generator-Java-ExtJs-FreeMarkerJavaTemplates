${package}

public class ${name} {

<#list objects as object>
private ${object.variableType} ${object.variableName};
</#list>

public ${name}() {
}

<#list objects as object>
public ${object.variableType} get${object.variableName}() {
		return ${object.variableName};
	}
</#list>
	
<#list objects as object>	
public void set${object.variableName}(${object.variableType} ${object.variableName}) {
		this.${object.variableName} = ${object.variableName};
	}
</#list>	

}