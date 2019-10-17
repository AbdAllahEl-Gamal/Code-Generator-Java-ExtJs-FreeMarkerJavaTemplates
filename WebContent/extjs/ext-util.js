var messageBox = Ext.create('Ext.window.MessageBox', {
    // set closeAction to 'destroy' if this instance is not
    // intended to be reused by the application
	minWidth :300,
    closeAction: 'method-destroy'
});

showErrorMessage = function ( message ) {
	var msg = '';
	msg = msg + '<center>';
	msg = msg + '<span style="color: #cc3300; font-weight: bold; font-size: 14px;">' + message.toUpperCase() + '</span>';
	msg = msg + '</center>';
	messageBox.alert('Error Alarm!', msg );
};

showWaitMessage = function ( msg ) {
	var msgContent = '';
	msgContent = msgContent + '<div width="100%">';
	msgContent = msgContent + '<table width="100%" cellpadding="2">';
	msgContent = msgContent + '<tr>';
	msgContent = msgContent + '<td align="left";>';
	msgContent = msgContent + '<span style="color: #802000; font-weight: bold;">' + msg + '</span>';
	msgContent = msgContent + '</td>';
	msgContent = msgContent + '<td width="50" align="right">';
	msgContent = msgContent + '<img height="80" width="80" src="' + contextRoot + '/resources/images/load03.gif">'; //bigrotation2
	msgContent = msgContent + '</td>';
	msgContent = msgContent + '</tr>';
	msgContent = msgContent + '</table>';
	msgContent = msgContent + '</div>';
	messageBox.show ( {
		title: 'Please wait...',
		msg: msgContent, 
		width: 400,
		modal:true,
		closable: true
	} );
};

showWarningMessage = function ( message , details) {
	debugger;
	var msg = '';
	msg = msg + '<left>';
	msg = msg + '<span style="color: black; font-weight: bold; font-size: 14px;">' + message + '</span> ';
	if(details!=undefined){
		msg = msg + '<span style="color: red; font-weight: bold; font-size: 14px;">' + details + '</span>';
	}
	msg = msg + '</left>';
	messageBox.minWidth = 500;
	messageBox.alert('Error Alarm!', msg );
};

showStatusMessage = function ( message ) {
	var msg = '';
	msg = msg + '<center>';
	msg = msg + '<span style="color: #000080; font-weight: bold; font-size: 14px;">' + message.toUpperCase() + '</span>';
	msg = msg + '</center>';
	messageBox.alert('Status Info.', msg );
};

showStatusTitleMessage = function ( title , message ) {
	var msg = '';
	msg = msg + '<center>';
	msg = msg + '<span style="color: #000080; font-weight: bold; font-size: 14px;">' + message.toUpperCase() + '</span>';
	msg = msg + '</center>';
	messageBox.alert( title , msg );
};

showInfoMessage = function ( title , message , func , scope ) {
	var msg = '';
	msg = msg + '<center>';
	msg = msg + '<span style="color: #000080; font-weight: bold; font-size: 14px;">' + message.toUpperCase() + '</span>';
	msg = msg + '</center>';
	messageBox.show({
		title: title,
		msg: msg,
		buttons: [
		            { text: 'OK' }
		            ],
		fn: func,
		scope: scope
		// , icon: messageBox.INFO
	});
};

closeMessage = function () {
	messageBox.hide();
};

openNewWindow = function ( url ) {
	if (document.all) {
		var xMax = screen.width, yMax = screen.height
	} else if (document.layers) {
		var xMax = window.outerWidth, yMax = window.outerHeight
	} else {
		var xMax = 640, yMax=480
	}
	window.open( url , '' , 'scrollbars=yes,width='+xMax+',height='+yMax+',top=0,left=0,resizable=yes' ); 
};

messageBox.YESNO = {
    yes: '<span style="font-weight: bold; color: #000080">OK</span>', 
    no: '<span style="font-weight: bold; color: #cc3300">Cancel</span>'
};
confirmMessage = function ( msg , retFunc , objScope ) {
	messageBox.confirm( 'Confirm' , msg , retFunc , objScope );
};

closeMessage = function () {
  messageBox.hide();
};

reloadCaptcha = function () {
    var current_date = new Date();
    imgObj = document.getElementById('jcaptcha');
    imgObj.src = contextRoot + '/jcaptcha?date=' + current_date ;
};

getRadioGroupValue = function ( rg ) {
  if ( rg.items.length > 0 ) {
    return rg.items.items[0].getGroupValue()
  }
  return '';
};

changeObjectStatus = function ( object , objectLabel , status  ) {
	if ( status === 0 ) { // disabled
		object.disable();
		if(object.container.up('div.x-form-item') != null){
			document.getElementById(object.container.up('div.x-form-item').id).childNodes[0].innerHTML = '<span class="x-form-label-readonly">' + objectLabel + '</span>';;
		}
	} else if ( status === 1 ) { // enable
		object.enable();
		if(object.container.up('div.x-form-item') != null){
			document.getElementById(object.container.up('div.x-form-item').id).childNodes[0].innerHTML = objectLabel;
		}
	}
};

Ext.grid.YesNOCheckColumn = function( config ) {
	Ext.apply(this, config);
	if(!this.id){
		this.id = Ext.id();
	}
	this.renderer = this.renderer.createDelegate(this);
};
Ext.grid.YesNOCheckColumn.prototype ={
	init : function(grid){
		this.grid = grid;
		this.grid.on('render', function(){
			var view = this.grid.getView();
			view.mainBody.on('mousedown', this.onMouseDown, this);
		}, this);
	},
	onMouseDown : function(e, t){
		if(t.className && t.className.indexOf('x-grid3-cc-'+this.id) != -1){
			e.stopEvent();
			var index = this.grid.getView().findRowIndex(t);
			var record = this.grid.store.getAt(index);
			var newValue = 'Y';
			var oldValue = record.data[this.dataIndex];
			if(oldValue == 'Y'){
				newValue = 'N';
			}
			record.set(this.dataIndex, newValue);
		}
	},
	renderer : function(v, p, record){
		p.css += ' x-grid3-check-col-td'; 
		return '<div class="x-grid3-check-col'+((v == 'Y')?'-on':'')+' x-grid3-cc-'+this.id+'">&#160;</div>';
	}
};



Ext.grid.SelectColumnAutoSave = function( config ) {
	Ext.apply(this, config);
	if(!this.id){
		this.id = Ext.id();
	}
	this.renderer = this.renderer.createDelegate(this);
};

Ext.grid.SelectColumnAutoSave.prototype ={
	selectedIndex: 0,
	autoSaveURL: '',
	init : function(grid){
		this.grid = grid;
		this.grid.on('render', function(){
			var view = this.grid.getView();
			view.mainBody.on('mousedown', this.onMouseDown, this);
		}, this);
	},
	autoSaveSelectionSuccess : function(response, options) {
		var respText = response.responseText;
		if ( respText.length > 0 ) { 
			var json = eval( respText );
			isSuccess = eval ( json.success );
			if ( isSuccess ) {
				closeMessage();
				//var record = this.grid.store.getAt(this.selectedIndex);
			} else {
				//var record = this.grid.store.getAt(this.selectedIndex);
				//record.reject();
				showMessageAfterCheckValidSession ( json );
			}
		} ;
	},
	autoSaveSelectionFailed : function(response, options) {
		closeMessage();
		var respText = response.responseText;
		showErrorMessage ( 'Failed' , respText );
	},
	autoSaveSelection: function ( index, selected ) {
    if(this.autoSaveURL != ''){
      showWaitMessage('Saving...');
      Ext.Ajax.request({
        url: this.autoSaveURL,
        autoAbort: true,
        disableCaching: true,
        method: "POST",
        success: this.autoSaveSelectionSuccess,
        failure: this.autoSaveSelectionFailed,
        scope: this,
        method: "POST",
        params:{
          index: index ,
          selected: selected
        }
      });
    }
	},
	onMouseDown : function(e, t){
		if(t.className && t.className.indexOf('x-grid3-cc-'+this.id) != -1){
			e.stopEvent();
			var index = this.grid.getView().findRowIndex(t);
			var record = this.grid.store.getAt(index);
			record.set(this.dataIndex, !record.data[this.dataIndex]);
			var index = record.get('node1');
			var selected = record.data[this.dataIndex];
			this.autoSaveSelection(index, selected);
		}
	},
	renderer : function(v, p, record){
		p.css += ' x-grid3-check-col-td'; 
		return '<div class="x-grid3-check-col'+(v?'-on':'')+' x-grid3-cc-'+this.id+'">&#160;</div>';
	}
};

findInvalid = function(basicForm) {
  var result = [], it = basicForm.items.items, l = it.length, i, f;
  for (i = 0; i < l; i++) {
	try{
		if(!(f = it[i]).disabled && f.el.hasClass(f.invalidClass)){
	      result.push(f);
	    }
	}catch(e){
		if( !((f = it[i]).allowBlank) ){
	      result.push(f);
		}
	}
  }
  return result;
}


getInvalidFormMessage = function(basicForm) {
  var invalidFields = findInvalid(basicForm);
  var errorMessage = '<span style="color:#CC3300; font-weight: bold; ">The following fields are invalid:</span>';
  errorMessage = errorMessage + '<br/>';
  errorMessage = errorMessage + '<br/>';
  for( i = 0; i < invalidFields.length; i ++){
    var field = invalidFields[i];
    if( field.fieldLabel != undefined ){
      errorMessage = errorMessage + '<span style="font-style: italic; margin-left: 24px; margin-top: 6px; margin-bottom: 6px;"><span style="color:#cc3300; font-weight: bold;">*</span> ' + field.fieldLabel + '</span></br>';
    }
  }
  return errorMessage;
}


getInvalidFormsMessage = function(basicFormsArray) {
	var invalidFields = [];
	for( j = 0; j < basicFormsArray.length; j ++){
		var basicForm = basicFormsArray[j];
		var invalidFormFields = findInvalid(basicForm);
		invalidFields = invalidFields.concat(invalidFormFields);
	}
	var errorMessage = '<span style="color:#CC3300; font-weight: bold; ">The following fields are invalid:</span>';
	errorMessage = errorMessage + '<br/>';
	errorMessage = errorMessage + '<br/>';
	for( i = 0; i < invalidFields.length; i ++){
		var field = invalidFields[i];
		if( field.fieldLabel != undefined ){
			errorMessage = errorMessage + '<span style="font-style: italic; margin-left: 24px; margin-top: 6px; margin-bottom: 6px;"><span style="color:#cc3300; font-weight: bold;">*</span> ' + field.fieldLabel + '</span></br>';
		}
	}
	return errorMessage;
}

joinObjects = function( arrayOfObjects ){
	var finalObject = {};
	for(i = 0 ; i < arrayOfObjects.length ; i ++){
		var object = arrayOfObjects[i];
		for(propertyName in object){
			finalObject[propertyName] = object[propertyName];
		}
	}	
	return finalObject;
};

//Function that take String and format first letter of each word to be Capital and red
function getTextStyle ( myString , firstCharSize , restWordSize ) {
	//splitting according to space
	var text = myString.split(" ");
	var firstCharSize1 = 0;
	var size = 0;
	for(var i =0; i < text.length; i++){
		var formateText = text[i];
		var firstLetter = formateText.substr( 0 , 1 );
		var restLetters = formateText.substr( 1 , formateText.length );
		if (formateText.charCodeAt(0) > 1000) {
			// Arabic
			size = restWordSize;
			firstCharSize1 = firstCharSize;
		} else {
			size = restWordSize;
			firstCharSize1 = firstCharSize;
		}
		text[i] = firstLetter.toUpperCase().fontcolor("red").fontsize( firstCharSize1 ).bold() + restLetters.fontcolor("navy").fontsize( restWordSize );
	}
	return text;
	//return(text.join("&nbsp;&nbsp;&nbsp;"));
};