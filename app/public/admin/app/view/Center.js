/**
 * AM.view.Center
 * Center.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.view.Center', {
	alias: 'widget.am-center',
	extend: 'Ext.TabPanel',
	flex: 1,
	viewConfig: {
		forceFit: true,
	},
	activeTab: 0,
	initComponent: function() {
		this.items = [
			{title: 'Device'	 ,xtype: 'devicelist'},
			{title: 'Language'	,xtype: 'languagelist'},
			{title: 'Region'	 ,xtype: 'regionlist'},
			{title: 'User'		,xtype: 'userlist'},
		];
		this.callParent();
	},
	setRoot: function(){
		console.log("setRoot");
		this.removeAll();
		this.add([
			{title: 'Device'	 ,xtype: 'devicelist'},
			{title: 'Language'	,xtype: 'languagelist'},
			{title: 'Region'	 ,xtype: 'regionlist'},
			{title: 'User'		,xtype: 'userlist'}]
		);
		this.update();
	},
	setApplication: function(){
		console.log("setApplication");
		this.removeAll();
		this.add([
			{title: 'Package'	,xtype: 'packagelist'},
  			{title: 'PackageType',xtype: 'packagetypelist'},
  			]
		);
		this.update();
	},

});
