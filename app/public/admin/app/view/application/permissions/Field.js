/**
 * AM.view.application.permissions.Field
 * Field.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.view.application.permissions.Field' ,{
	extend: 'Ext.grid.Panel',
	xtype: 'applicationpermissionsfield',
	alias : 'widget.applicationpermissionsfield',
	height: 130,
	flex: 1,
	scroll: true,
	viewConfig: {
		forceFit: true,
	},
	title: 'Permited Application',
	collapsible : true,
	multiSelect: false,
	beforeitemdblclick: function(grid, record) {
		var view = Ext.widget('applicationpermissionsedit');
	},
	initComponent: function() {
		this.store = Ext.data.StoreManager.lookup('application.edit.permissionsStore');
		this.columns = [
			{flex: 1,text: 'user'	 ,dataIndex: 'user'},
//			{flex: 1,text: 'permission'	 ,dataIndex: 'permission'},
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
					action: 'permissions_create',
				},
				 {
					text: 'delete',
					iconCls: 'icon-delete',
					action: 'permissions_delete',
				},
				]
			}]
		}];
		this.callParent();
	 },
});
