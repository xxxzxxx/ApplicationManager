/**
 * AM.view.package.regions.Field
 * Field.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.view.package.regions.Field' ,{
	extend: 'Ext.grid.Panel',
	xtype: 'regionsfield',
	alias : 'widget.regionsfield',
	height: 130,
	flex: 1,
	scroll: true,
	viewConfig: {
		forceFit: true,
	},
	collapsible : true,
	title: 'Disable Regions',
	multiSelect: false,
	initComponent: function() {
		console.log('AM.view.package.regions.Field');
		this.store = Ext.data.StoreManager.lookup('package.edit.regionsStore');
		console.log(this.store);
		this.columns = [
			{flex: 1,text: 'region'	 ,dataIndex: 'region'},
//			{flex: 1,text: 'disable'	,dataIndex: 'disable'},
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
						action: 'regions_create'
					},
					 {
						text: 'delete',
						iconCls: 'icon-delete',
						action: 'regions_delete'
					},
				]
			}]
		}];
		this.callParent();
	 },
});
