${package}

import java.io.Serializable;
import java.util.ArrayList;

/**
 * <p style="margin-top: 6; margin-bottom: 6">${name}Bean consider as a mapping class for the mapped reational database table <span style="font-weight:bold">PORTAL.ARCCTG</span>.
 * the mapping between dat bean and its mapped table is one-to-one, where columns of the
 * mapped table are represented by members of the data beans. Each instance of data bean 
 * is then stored in a row 'record' at the mapped table.</p>
 * <p style="margin-top: 6; margin-bottom: 6">Each member of data bean is defined in a protected scope, and has his own public 
 * accessor 'getter and setter' method to access it.
 * Data bean implements the Serializable interface, the serialization of instances of 
 * this class are handled by defaultWriteObject method of ObjectOutputSteam. This
 * method automatically writes out everything required to reconstuct an instance of the class. 
 * including class of the object, class signature and values of all non-static members, 
 * including members that refer to other objects.</p>
 * <p style="margin-top: 6; margin-bottom: 6">Data bean has two constuctor methods one with no-parameter (initiate members with its 
 * predefined initial values) and the other with passed parameter of type data bean to initiate 
 * the new inistatnce with the passed one.</p>
 * <p style="margin-top: 6; margin-bottom: 6">Data bean also contains getter for the mapped values, if exist, for its members which 
 * used for mapping static values for a specific member. For example Active flag has only
 * two available values 'Y'->'Yes' and 'N'->'No'. So through this we limit the values assigned for 
 * this member.</p>
 * <p style="margin-top: 6; margin-bottom: 6">Data bean has its own properties which identify as public members, as follows:</p>
 * <table width="90%">
 *  <tr>
 *   <td width="20%">
 *    <span style="font-weight:bold">Property Name</span>
 *   </td>
 *   <td width="20%">
 *    <span style="font-weight:bold">Property Type</span>
 *   </td>
 *   <td width="60%">
 *    <span style="font-weight:bold">Description</span>
 *   </td>
 *  </tr>
 *  <tr>
 *   <td width="20%">
 *    <span style="font-weight:bold">isVisible</span>
 *   </td>
 *   <td width="20%">
 *    <span style="font-weight:bold">boolean</span>
 *   </td>
 *   <td width="60%">
 *    <span style=" font-style:italic">Indicate whether the current record (instance of data bean) will be shown or not (this property is important for filtering the list of entity data bean without re-query the database)</span>
 *   </td>
 *  </tr>
 *  <tr>
 *   <td width="20%">
 *    <span style="font-weight:bold">isNotSaved</span>
 *   </td>
 *   <td width="20%">
 *    <span style="font-weight:bold">boolean</span>
 *   </td>
 *   <td width="60%">
 *    <span style=" font-style:italic">Indicate whether the current record (instance of data bean) is saved or not (for example, used in case of directly adding tree node)</span>
 *   </td>
 *  </tr>
 *  <tr>
 *   <td width="20%">
 *    <span style="font-weight:bold">hasChildren</span>
 *   </td>
 *   <td width="20%">
 *    <span style="font-weight:bold">boolean</span>
 *   </td>
 *   <td width="60%">
 *    <span style=" font-style:italic">Indicate whether the current record (instance of data bean) has children or not (used specially with recursive tree type)</span>
 *   </td>
 *  </tr>
 * </table>
**/

public class ${name}Bean implements Serializable { // Open Class

public boolean isVisible;
<#list objects as object>
public ${object.variableType} ${object.variableName};
</#list>

/**
   * constructor with no parameter
  **/
public ${name}Bean ( ) 
{
	isVisible = true; //will be used in filter option, when true means show the current record, when false means make it invisible
<#list objects as object>
	${object.variableName} = null;
</#list>
}

/**
   * constructor with  ${name} as a parameter
   * @param ${name?uncap_first}Bean is an object of type ${name}
  **/
public ${name}Bean ( ${name}Bean ${name?uncap_first}Bean ) 
{
	isVisible = ${name?uncap_first}Bean.isVisible;
<#list objects as object>
	${object.variableName} = ${name?uncap_first}Bean.get${object.variableName?cap_first}( );
</#list>	
}

<#list objects as object>
<#if '${object.variableType}' = "String">
/**
   * getter for member ${object.variableName} which is 
   * @return ${object.variableType} which holds the value for ${object.variableName}
  **/
public ${object.variableType} get${object.variableName?cap_first} ( ) 
{
		if ( ${object.variableName} == null )
    	 return null;
		return ${object.variableName};
}
<#else>
/**
   * getter for member ${object.variableName} which is 
   * @return ${object.variableType} which holds the value for ${object.variableName}
  **/
public ${object.variableType} get${object.variableName?cap_first} ( ) 
{
		return ${object.variableName};
}
</#if>
</#list>
	
<#list objects as object>
/**
   * setter for member ${object.variableName} which is 
   * @param ${object.variableName} as ${object.variableType}
  **/	
public void set${object.variableName?cap_first} ( ${object.variableType} ${object.variableName} ) 
{
		this.${object.variableName} = ${object.variableName};
}
</#list>	

} // Class Close