/**
 * AM.view.package.resources.Field
 * Field.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.view.package.resources.Field' ,{
	extend: 'Ext.grid.Panel',
	xtype: 'resourcesfield',
	alias : 'widget.resourcesfield',
	height: 130,
	flex: 1,
	scroll: true,
	viewConfig: {
		forceFit: true,
	},
	collapsible : true,
	title: 'Resources',
	multiSelect: false,
	initComponent: function() {
		this.store = Ext.data.StoreManager.lookup('package.edit.resourcesStore');
		this.columns = [
			{text: 'locale' ,dataIndex: 'locale', width: 30,},
			{flex: 1,text: 'title'	  ,dataIndex: 'title'},
			{flex: 1,text: 'description',dataIndex: 'description'},
			{flex: 1,text: 'copyright'  ,dataIndex: 'copyright'},
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
					action: 'resources_create'
				},
				 {
					text: 'delete',
					iconCls: 'icon-delete',
					action: 'resources_delete'
				},
				]
			}]
		}];
		this.callParent();
	 },
});
