Ext.define('${app}.view.template.EZDK${name}FormWin',{
	extend:'Ext.window.Window',
	xtype:'ezdk_${name}_form_win',
	id: 'id_ezdk_${name?lower_case}_form_win',
	title:'EZDK ${name} Form',
	layout: 'form',
	autoShow:true,
	autoScroll: true,
	maximizable: false,
	modal: true,
	closable: true,
	iconCls:'fas fa-adjust',
	bodyStyle: 'text-align: center;',
	height : 800,
	defaults: {
		labelAlign: 'top'
	},
	initComponent:function(){
		this.items = this.createItems();
		this.buttons = this.createButtons();
		this.on('afterrender',this.adjustWin );
		this.callParent();
	},
	createItems:function(){
		
		
		let as400OracleStore = new Ext.data.Store ( {
			proxy: {
			    type: 'ajax',
				url :contextRoot + '',
				reader: {
				    type: 'json',
					root: '${name?uncap_first}',
					rootProperty: '${name?uncap_first}',
					totalProperty: 'totalCount',
					successProperty: 'success',
				    id: 'node1'
		        }
		    }
		} );
		as400OracleStore.load();
		
		let oracleComboBox = Ext.create ( {
			xtype: 'combobox',
			name: 'oracleComboBox',
            queryMode: 'local',
			valueField: 'node1',
			displayField: 'node2',
			emptyText: 'select ..',
			allowBlank: true,
			selectOnFocus: true,
			enableKeyEvents : true,
			typeAhead: true,
            store: '',
            editable: false,
            width: 300,
            scope: this,
            value: ''
        } );
		
		
		let items = [ {
              url:'',
              id : 'ezdk-${name?lower_case}-form',
              width: '100%',
              xtype:'form',
              items:[ {
                  layout: 'column',
                  height: 40,
                  labelWidth: 150,
                  border: false,
                  bodyStyle: 'text-align: left',
                  items: [ {
                        columnWidth: .20,
                        border: false,
                        layout: 'form',
                        items : [ 
						<#list objects as object>
							<#if !(object_has_next)>
						{
							xtype: 'label',
                            html: '<span style="color:#000080; font-weight: bold;">${object.variableName}</span>'
						}
							<#else>
						{
                            xtype: 'label',
                            html: '<span style="color:#000080; font-weight: bold;">${object.variableName}</span>'
                        },
							</#if>
						</#list> ]
                  } , {
                        columnWidth: .75,
                        border: false,
                        layout: 'form',
                        items : [ 
						<#list objects as object>
							<#if !(object_has_next)>
						{
                			xtype: '${object.xType}',
                			name: '${object.variableName?cap_first}',
                			tooltip: '${object.variableName?uncap_first}',
                			emptyText: '',
                			allowBlank: ${object.allowB},
                			msgTarget: 'side',
                			enableKeyEvents : true,
                			width: 300
                        }
							<#else>
						{
                			xtype: '${object.xType}',
                			name: '${object.variableName?cap_first}',
                			tooltip: '${object.variableName?uncap_first}',
                			emptyText: '',
                			allowBlank: ${object.allowB},
                			msgTarget: 'side',
                			enableKeyEvents : true,
                			width: 300
                        },
							</#if>
						</#list>
						]
                  } ]
            } ]
        } ];
        return items;
      },
		
		 createButtons:function (){
    	  var buttons = [  {
  			text : '<span style="align:center">Close</center>',
  			scale: 'large',
  			buttonAlign: 'left',
  			scope: this,
  			handler : function () {
  				this.close();
  			}
  		} ];
		return buttons;
      },
      adjustWin: function () {
            var viewportMain = Ext.getCmp('viewport-main');
            var pageWidth = viewportMain.getSize().width;
            var pageHeight = viewportMain.getSize().height;
            var leftMargin = 0.15 * pageWidth;
            var topMargin = 0.1 * pageHeight;
            this.setPosition ( leftMargin , topMargin );
            var windowWidth = pageWidth - ( 2 * leftMargin );
            var windowHeight = pageHeight - ( 2 * topMargin );
            this.setSize( windowWidth , windowHeight );
            
      },
      onShow: function ( win , eOpts ) {
   	   this.callParent();
      },
      onClose : function ( win , eOpts ){
   	   this.callParent();
      }
});