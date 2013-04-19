/**
 * AM.view.application.List
 * List.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.view.application.List' ,{
	extend: 'Ext.grid.Panel',
	alias : 'widget.applicationlist',
	layout: 'fit',
	store: 'Applications',
	title: 'Applications',
	multiSelect: false,
	initComponent: function() {
		this.columns = [
			{text: 'name',flex: 1,dataIndex: 'name'},
			{text: 'version',flex: 1,dataIndex: 'version'},
			{text: 'home page',flex: 1,dataIndex: 'homepage'},
			{text: 'Common Secret Key',flex: 1,dataIndex: 'commonSecret'},
			{text: 'Secret Key',flex: 1,dataIndex: 'secret'},
		];
		this.dockedItems = [{
			dock: 'top',
			xtype: 'toolbar',
			items: [{
				text: 'create',
				iconCls: 'icon-add',
				action: 'create'
			}, {
				text: 'delete',
				iconCls: 'icon-delete',
				action: 'delete'
			}]
		}];
		this.callParent();
	}
});
