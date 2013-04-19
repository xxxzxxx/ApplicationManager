/**
 * AM.view.user.List
 * List.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.view.user.List' ,{
	extend: 'Ext.grid.Panel',
	alias : 'widget.userlist',
	layout: 'fit',
	store: 'Users',
	title: 'Users',
	multiSelect: false,
	initComponent: function() {
		this.columns = [
			{text: 'email',flex: 1,dataIndex: 'email'},
			{text: 'first_name',flex: 1,dataIndex: 'first_name'},
			{text: 'last_name',flex: 1,dataIndex: 'last_name'},
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
