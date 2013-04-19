/**
 * AM.view.device.List
 * List.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.view.device.List' ,{
	extend: 'Ext.grid.Panel',
	alias : 'widget.devicelist',
	layout: 'fit',
	store: 'Devices',
	title: 'Devices',
	multiSelect: false,
	initComponent: function() {
		this.columns = [
			{text: 'Device',flex: 1,dataIndex: 'value'}
		];
		this.dockedItems = [{
			dock: 'top',
			xtype: 'toolbar',
			items: [{
				xtype: 'buttongroup',
				items: [{
					text: 'create',
					iconCls: 'icon-add',
					action: 'create'
				}, {
					text: 'delete',
					iconCls: 'icon-delete',
					action: 'delete'
				}]
			}]
		}];
		this.callParent();
	}
});
