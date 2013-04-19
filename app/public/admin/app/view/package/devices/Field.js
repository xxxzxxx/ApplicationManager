/**
 * AM.view.package.devices.Field
 * Field.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.view.package.devices.Field' ,{
	extend: 'Ext.grid.Panel',
	xtype: 'devicesfield',
	alias : 'widget.devicesfield',
	height: 130,
	flex: 1,
	scroll: true,
	viewConfig: {
		forceFit: true,
	},
	title: 'Enable Devices',
	collapsible : true,
	multiSelect: false,
	beforeitemdblclick: function(grid, record) {
		console.log('AM.view.package.devices.Field.beforeitemdblclick');
		var view = Ext.widget('packagedevicesedit');
	},
	initComponent: function() {
		console.log('AM.view.package.devices.Field');
		this.store = Ext.data.StoreManager.lookup('package.edit.devicesStore');
		this.columns = [
			{flex: 1,text: 'device'	 ,dataIndex: 'device'},
		];
		this.dockedItems = [{
			dock: 'top',
			xtype: 'toolbar',
			items: [{
				xtype: 'buttongroup',
				items: [
				 {
					text: 'create',
					iconCls: 'icon-add',
					action: 'devices_create',
				},
				 {
					text: 'delete',
					iconCls: 'icon-delete',
					action: 'devices_delete',
				},
				]
			}]
		}];
		this.callParent();
	 },
});
