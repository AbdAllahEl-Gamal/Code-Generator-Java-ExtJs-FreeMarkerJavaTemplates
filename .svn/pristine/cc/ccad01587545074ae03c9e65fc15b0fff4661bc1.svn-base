Ext.define('${app}.view.feedback.EDMS${app}GridWin',{
	extend:'Ext.window.Window',
	title:'${app}',
	id: 'id_${name?lower_case}-grid-window',
	iconCls:'far fa-bell',
	width:650,
	height:500,
	layout: 'fit',
	autoShow:true,
	frame: true,
	defaults:{
		labelAlign:'top'
	},
	grid: undefined,
	params: {
	},
	initComponent:function(){
		this.params.refWin= this;
		this.grid = this.createGrid();
		this.items = [ this.grid ];
		this.buttons = this.createButtons();
		this.on('afterrender',this.adjustWin);
		this.callParent();
	},
	createGrid:function(){
		let grid = {
			extend: 'Ext.grid.Panel',
		    xtype: 'gridpanel',
		    id: 'id_${name?uncap_first}Grid',
		    titleBar: '{hidden:true;}',
		    store:  Ext.getStore('${name?lower_case}Store'),
		    stateful: true,
		    collapsible: false,
		    multiSelect: false,
		    headerBorders: false,
		    frame: false,
		    columnLines : true,
		    stripeRows: true,
		    params: this.params,
		    reloadStore: function() {
		    	var gridWindow = Ext.getCmp('id_${name?lower_case}-grid-window');
		    	this.store.proxy.extraParams = {
		    			eloId : gridWindow.params.eloId
				};
				this.store.reload();
		    },
		    listeners: {
		    	render: function ( sender, eOpts ){
		    		this.reloadStore();
		    	},
		    	store: {
			    	load: function ( store, records, successful, operation, eOpts ) {
		    			var _recordCount = document.getElementById('_numberofrecords${name}');
			    		_recordCount.innerHTML = store.getCount();		    		    
			    	}
		    	},
		    	itemcontextmenu: function( grid, record, item, index, e, eOpts ) {
                	var grid = Ext.getCmp ('id_${name?uncap_first}Grid');
 			        var menu_grid = new Ext.menu.Menu ( { 
			        	minWidth: 250,
			    		items: [ {
			    			iconCls: 'fas fa-edit',
			    			text: '<span style="font-weight: bold; color: #000080">Edit</span>',
			    			disabled: false,
			    			handler: function() {
			    				Ext.create('${app}.view..EDMS${name}FormWin', {
				            		params: {
				            			${name?uncap_first}Id : record.data.${name?uncap_first}Id,
				            			operationType : 'U'
				            		}
				            	});
			    			} 
			    		} ]
			        } );
			        var position = [e.getX()-20, e.getY()+ 5];
			        e.stopEvent();
			        menu_grid.showAt(position);
		    	}
		    },
			columns: [ 
			<#list objects as object>
			<#if !(object_has_next)>
			{
            	header: '<span style="font-weight: bold; color: #000080">${object.variableName}</span>', 
            	dataIndex: '${object.variableName?lower_case}',
            	tooltip: '',
            	align: 'left',
               	width: 100,
               	hidden: true,
               	sortable: true,
               	resizable: false,
               	css: 'white-space:normal;'
				renderer: function( value , metaData , record , rowIndex , colIndex , store ) {
				}
             }
			 <#else>
			 {
            	header: '<span style="font-weight: bold; color: #000080">${object.variableName}</span>', 
            	dataIndex: '${object.variableName?lower_case}',
            	tooltip: '',
            	align: 'left',
               	width: 100,
               	hidden: true,
               	sortable: true,
               	resizable: false,
               	css: 'white-space:normal;'
				renderer: function( value , metaData , record , rowIndex , colIndex , store ) {
				}
             },
			 </#if>
			 </#list> ],
			  tbar: [{
	        	xtype: 'button',
	        	iconCls:'fas fa-sync-alt',
	        	scope: this,
				handler: function () {
					this.grid.reloadStore();
				}
	        } , '-' ],
		    bbar: [ '->' , '-' , '<span style="font-size: 14px; font-weight: bold; color: #000080;">Number of Records(s)</span>' , '-' , '<span id="_numberofrecords${name}" style="font-size: 14px; font-weight: bold; color: #cc3300;">0</span>' , '-' ]
		};
		return grid;
	},
	createButtons:function (){
		var buttons = [ {
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
	}
});