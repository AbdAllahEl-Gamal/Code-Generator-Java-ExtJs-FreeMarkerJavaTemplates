Ext.define( 'ezdk-generator.view.Window', {
		extend : 'Ext.window.Window',
		id : '',
		title : '<i class=""></i><span style="font-size:20px;">&emsp;</span>',
		layout : 'fit',
		autoShow : true,
		modal : true,
		initComponent : function() {
			this.mainPanel = this.createMainPanel();
			this.items = [ this.mainPanel ];
			this.on('afterrender', this.adjustWin);
			this.callParent();
		},
		createMainPanel : function() {
			let	panels = this.panels();
			let	mainPanel = {
				xtype : 'panel',
				layout : 'fit',
				items : [  panels  ]
			};
			return mainPanel;
		},
		panels : function() {
			let	panels = {
					xtype : 'panel',
					layout : 'hbox',
					id : '',
					title : '',
					iconCls : '',
					collapsible : false,
					items : [ {
						layout : 'vbox',
						border : false,
						bodyStyle : 'text-align: left',
						defaults : {
							labelStyle : 'font-size:12px; font-weight:bold; color:#000080;'
						},
						items : [ {
							xtype : 'panel',
							border : true,
							height : 50,
							width : 670,
							layout : 'fit',
							padding : '5 5 5 5',
							items : [ {
								xtype : 'displayfield',
								fieldLabel : '<span style="color:#800000; font-weight: bold;">User Name</span>',
								labelWidth : 75,
								value : '<span style="color:#371D7F; font-weight: bold;">ABDALLAH OSAMA MOHAMED GOMAA ELGAMAL</span>',
								padding : '5 5 5 5'
							} ]
						} , {
							xtype : 'panel',
							border : true,
							height : 100,
							width : 670,
							layout : 'fit',
							padding : '5 5 5 5',
							items : [ {
								xtype : 'form',
								padding : '5 5 5 5',
								items : [ {
									xtype : 'label',
									html : '<span style="color:#000000; font-weight: bold;">E-Purchasing System developed by EZDK-ITD-MIS.</span>'
								} , {
									xtype : 'displayfield',
									fieldLabel : '<span style="color:#800000; font-weight: bold;">Issued Date</span>',
									labelWidth : 120,
									value : '<span style="color:#371D7F; font-weight: bold;">09/12/2018</span>'
								} , {
									xtype : 'displayfield',
									fieldLabel : '<span style="color:#800000; font-weight: bold;">Last Updated Date</span>',
									labelWidth : 120,
									value : '<span style="color:#371D7F; font-weight: bold;">09/12/2018</span>'
								} ]
							} ]
						} , {
							xtype : 'panel',
							border : false,
							height : 110,
							width : 670,
							layout : 'fit',
							draggable : true,
							padding : '5 5 5 5',
							listeners : {
								move : function( thi, x, y, eOpts ) {
								    if( x!=0 && y!=0 )
								    {
								        var cont = thi.getBubbleParent();
								        var xNew = thi.getPosition()[0];
								        var yNew = thi.getPosition()[1];
								        thi.setPagePosition([(xNew-x),(yNew-y)]);
								        cont.insert(thi);
								    }
								}
							},
							items : [ {
								layout : 'fit',
								title : 'About',
								iconCls : 'fab fa-audible',
								collapsible : true,
								closable : true,
								border : true,
								items : [ {
									xtype : 'form',
									padding : '5 5 5 5',
									items : [ {
										xtype : 'label',
										html : '<span style="color:#000000; font-weight: bold;">EPS (Electronic Purchasing System) is the system responsible for handling purchase order starting from budget, financing, requisition, inquiry, contracting, delivery, inspection, receiving and ending at consumption stage.</span>'
									} ]
								} ]
							} ]
						} , {
							xtype : 'panel',
							border : false,
							height : 360,
							width : 670,
							layout : 'fit',
							draggable : true,
							padding : '5 5 5 5',
							listeners : {
								move : function( thi, x, y, eOpts ) {
								    if( x!=0 && y!=0 )
								    {
								        var cont = thi.getBubbleParent();
								        var xNew = thi.getPosition()[0];
								        var yNew = thi.getPosition()[1];
								        thi.setPagePosition([(xNew-x),(yNew-y)]);
								        cont.insert(thi);
								    }
								}
							},
							items : [ {
								layout : 'fit',
								title : 'News',
								iconCls : 'far fa-newspaper',
								collapsible : true,
								closable : true,
								border : true,
								items : [ ]
							} ]
						} ]
					} , 
					{
						layout : 'vbox',
						border : false,
						bodyStyle : 'text-align: left',
						defaults : {
							labelStyle : 'font-size:12px; font-weight:bold; color:#000080;'
						},
						items : [ {
							xtype : 'panel',
							border : false,
							height : 210,
							width : 889,
							layout : 'fit',
							draggable : true,
							padding : '5 5 5 5',
							listeners : {
								move : function( thi, x, y, eOpts ) {
								    if( x!=0 && y!=0 )
								    {
								        var cont = thi.getBubbleParent();
								        var xNew = thi.getPosition()[0];
								        var yNew = thi.getPosition()[1];
								        thi.setPagePosition([(xNew-x),(yNew-y)]);
								        cont.insert(thi);
								    }
								}
							},
							items : [ {
								layout : 'fit',
								title : 'Budget Status',
								iconCls : 'far fa-money-bill-alt',
								collapsible : true,
								closable : true,
								border : true,
								items : [ {
											xtype : 'gridpanel',
											layout : 'fit',
											tbar : [ '-', {
												xtype : 'button',
												text : 'EMPTY',
												width : 100,
												iconCls : 'fas fa-battery-empty greenIcon',
												handler : function () {
												}
											}, '-', {
												xtype : 'button',
												text : 'FULL',
												width : 100,
												iconCls : 'fas fa-battery-full yellowIcon',
												handler : function () {
												}
											}, '-', '->', '-', {
				                                  xtype:'fieldcontainer',
				                                  fieldLabel: 'Year',
				                                  name: 'year',
				                                  labelWidth : 30,
				                                  layout: 'hbox',
				                                  items: [ {
				                                         xtype : 'combobox',
				                                         id : '',
				                                         width : 100,
				                                         displayField : '',
				 										 valueField : '',
				 										 queryMode : 'local',
				                                  } , {
				                                         xtype: 'combobox',
				                                         id : '',
				                                         width : 230,
				                                         displayField : '',
				 										 valueField : '',
				 										 queryMode : 'local',
				                                  } ]
				                           }, '-', {
												xtype : 'button',
												iconCls : 'fas fa-sync-alt grayIcon',
												handler : function () {
												}
											}, '-' ],
											columns : [ {
												header : 'Header#',
												dataIndex : '',
												sortable : true,
												hidden : false,
												align : 'center',
												flex : 1,
												renderer : function(value, metaData, record, rowIndex, colIndex, store) {
													return '<span style="font-weight: bold; color: #000080;">' + value + '</span>';
												}
											}, {
												header : 'Name',
												dataIndex : '',
												sortable : true,
												hidden : false,
												align : 'center',
												width : 250,
												renderer : function(value, metaData, record, rowIndex, colIndex, store) {
													return '<span style="font-weight: bold; color: #000080;">' + value + '</span>';
												}
											}, {
												header : 'Content',
												dataIndex : '',
												sortable : true,
												hidden : false,
												align : 'center',
												flex : 1,
												renderer : function(value, metaData, record, rowIndex, colIndex, store) {
													return '<span style="font-weight: bold; color: #000080;">' + value + '</span>';
												}
											}, {
												header : 'Total',
												dataIndex : '',
												sortable : true,
												hidden : false,
												align : 'center',
												flex : 1,
												renderer : function(value, metaData, record, rowIndex, colIndex, store) {
													return '<span style="font-weight: bold; color: #000080;">' + value + '</span>';
												}
											}, {
												header : 'Total(LE)',
												dataIndex : '',
												sortable : true,
												hidden : false,
												align : 'center',
												flex : 1,
												renderer : function(value, metaData, record, rowIndex, colIndex, store) {
													return '<span style="font-weight: bold; color: #cc3300;">' + value + '</span>';
												}
											}, {
												header : 'Req.Amt',
												dataIndex : '',
												sortable : true,
												hidden : false,
												align : 'center',
												flex : 1,
												renderer : function(value, metaData, record, rowIndex, colIndex, store) {
													return '<span style="font-weight: bold; color: #000080;">' + value + '</span>';
												}
											}, {
												header : 'Remaining',
												dataIndex : '',
												sortable : true,
												hidden : false,
												align : 'center',
												flex : 1,
												renderer : function(value, metaData, record, rowIndex, colIndex, store) {
													return '<span style="color: #000080;">' + value + '</span>';
												}
											} ],
									} ]
							} ]
						}, {
							xtype : 'panel',
							border : false,
							height : 210,
							width : 889,
							layout : 'fit',
							draggable : true,
							padding : '5 5 5 5',
							listeners : {
								move : function( thi, x, y, eOpts ) {
								    if( x!=0 && y!=0 )
								    {
								        var cont = thi.getBubbleParent();
								        var xNew = thi.getPosition()[0];
								        var yNew = thi.getPosition()[1];
								        thi.setPagePosition([(xNew-x),(yNew-y)]);
								        cont.insert(thi);
								    }
								}
							},
							items : [ {
								layout : 'fit',
								title : 'Requisition Status',
								iconCls : 'fab fa-ethereum',
								collapsible : true,
								closable : true,
								border : true,
								items : [ {
									xtype : 'gridpanel',
									layout : 'fit',
									tbar : [ '-', {
										xtype : 'combobox',
										id : '',
										fieldLabel : 'Status',
										width : 150,
										labelWidth : 38,
										displayField : '',
										valueField : '',
										queryMode : 'local',
										handler : function () {
										}
									}, '-', '->', '-', {
										xtype:'combobox',
										id : '',
		                                fieldLabel: 'Year',
		                                width: 120,
		                                labelWidth : 30,
		                                displayField : '',
										valueField : '',
										queryMode : 'local',
										handler : function () {
										}
		                           }, '-', {
		                        	   	xtype:'combobox',
		                        	   	id : '',
		                                fieldLabel: 'MCG',
		                                width: 180,
		                                labelWidth : 33,
		                                displayField : '',
										valueField : '',
										queryMode : 'local',
										handler : function () {
										}
		                           } , '-', {
		                        	   iconCls : 'fas fa-code blueIcon'
		                           } , {
		                        	   iconCls : 'fas fa-file-pdf blueIcon'
		                           } , {
		                        	   iconCls : 'fas fa-file-excel blueIcon'
		                           } , '-', {
		                        	   xtype:'combobox',
		                        	   id : '',
		                        	   width: 70,
		                        	   displayField : '',
		                        	   valueField : '',
		                        	   queryMode : 'local',
		                        	   handler : function () {
		                        	   }
		                           } , '-', {
		                        	   xtype : 'button',
		                        	   iconCls : 'fas fa-sync-alt grayIcon',
		                        	   handler : function () {
		                        	   }
		                           } , '-' ] ,
		                           columns : [ {
		                        	   header : 'U',
		                        	   dataIndex : '',
		                        	   sortable : true,
		                        	   hidden : false,
		                        	   align : 'center',
		                        	   width : 50,
		                        	   renderer : function(value, metaData, record, rowIndex, colIndex, store) {
		                        		   return '<span style="font-weight: bold; color: #000080;">' + value + '</span>';
		                        	   }
									} , {
									   header : 'C',
									   dataIndex : '',
									   sortable : true,
									   hidden : false,
									   align : 'center',
									   width : 50,
									   renderer : function(value, metaData, record, rowIndex, colIndex, store) {
											return '<span style="font-weight: bold; color: #000080;">' + value + '</span>';
										}
									} , {
									   header : 'P',
									   dataIndex : '',
									   sortable : true,
									   hidden : false,
									   align : 'center',
									   width : 50,
									   renderer : function(value, metaData, record, rowIndex, colIndex, store) {
										   return '<span style="font-weight: bold; color: #000080;">' + value + '</span>';
									   }
									} , {
									   header : 'Req.#',
									   dataIndex : '',
									   sortable : true,
									   hidden : false,
									   align : 'center',
									   flex : 1,
									   renderer : function(value, metaData, record, rowIndex, colIndex, store) {
										   return '<span style="font-weight: bold; color: #000080;">' + value + '</span>';
									   }
									} , {
									   header : 'Description',
									   dataIndex : '',
									   sortable : true,
									   hidden : false,
									   align : 'center',
									   width : 250,
									   renderer : function(value, metaData, record, rowIndex, colIndex, store) {
										   return '<span style="font-weight: bold; color: #cc3300;">' + value + '</span>';
									   }
									} , {
									   header : 'Amount',
									   dataIndex : '',
									   sortable : true,
									   hidden : false,
									   align : 'center',
									   flex : 1,
									   renderer : function(value, metaData, record, rowIndex, colIndex, store) {
										   return '<span style="font-weight: bold; color: #000080;">' + value + '</span>';
									   }
									} , {
									   header : 'Item',
									   dataIndex : '',
									   sortable : true,
									   hidden : false,
									   align : 'center',
									   flex : 1,
									   renderer : function(value, metaData, record, rowIndex, colIndex, store) {
										   return '<span style="color: #000080;">' + value + '</span>';
									   }
									} , {
									   header : 'Status',
									   dataIndex : '',
									   sortable : true,
									   hidden : false,
									   align : 'center',
									   flex : 1,
									   renderer : function(value, metaData, record, rowIndex, colIndex, store) {
										   return '<span style="color: #000080;">' + value + '</span>';
									   }
									} ],
							} ]
							} ]
						} , {
							xtype : 'panel',
							border : false,
							height : 200,
							width : 889,
							layout : 'fit',
							draggable : true,
							padding : '5 5 5 5',
							listeners : {
								move : function( thi, x, y, eOpts ) {
								    if( x!=0 && y!=0 )
								    {
								        var cont = thi.getBubbleParent();
								        var xNew = thi.getPosition()[0];
								        var yNew = thi.getPosition()[1];
								        thi.setPagePosition([(xNew-x),(yNew-y)]);
								        cont.insert(thi);
								    }
								}
							},
							items : [ {
								layout : 'fit',
								title : 'Contract Status',
								iconCls : 'fab fa-contao',
								collapsible : true,
								closable : true,
								border : true,
								items : [ ]
							} ]
						} ]
				} ] ,
				buttons : [ ]
			};
			return panels;
		},
					
		adjustWin : function() {
			var viewportMain = Ext.getCmp('viewport-main');
			var pageWidth = viewportMain.getSize().width;
			var pageHeight = viewportMain.getSize().height;
			var leftMargin = 0.01 * pageWidth;
			var topMargin = 0.05 * pageHeight;
			this.setPosition(leftMargin, topMargin);
			var windowWidth = pageWidth - (2 * leftMargin);
			var windowHeight = pageHeight - (2 * topMargin);
			this.setSize(windowWidth, windowHeight);
		}
	} );