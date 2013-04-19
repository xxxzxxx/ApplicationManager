/**
 * AM.view.package.List
 * List.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.view.package.List' ,{
	extend: 'Ext.grid.Panel',
//	extend: 'MC.form.field.DataViewField',
	xtype: 'packagelist',
	alias : 'widget.packagelist',

	store: 'Packages',
	title: 'Packages',

	flex: 1,
	layout: 'fit',
	scroll: true,
	viewConfig: {
		forceFit: true,
	},
	multiSelect: false,
	defaults :{
		sortable: true,
	},
	initComponent: function() {
		this.columns = [
			{text: 'preference' ,dataIndex: 'preference', width: 45,resizable: false,},
			{text: 'name'		,dataIndex: 'name'	  , width: 300,resizable: false,},
			{text: 'sale'		,dataIndex: 'sale'		, width: 45,},
			{text: 'type'		,dataIndex: 'type'		, width: 45,},
			{header: 'public',  renderer: function(value, meta, rec) {
				var data = rec.data;
				if (data.public){
					return "◎";
				}else{
					return "×";
				}
			},width: 20,},
			{header: 'debug',  renderer: function(value, meta, rec) {
				var data = rec.data;
				if (data.debug){
					return "◎";
				}else{
					return "×";
				}
			},width: 20,},
			{text: 'enableDate' ,dataIndex: 'enableDate', renderer: Ext.util.Format.dateRenderer('Y/m/d'), width: 70,resizable: false,},
			{text: 'expirationDate' ,dataIndex: 'expirationDate', renderer: Ext.util.Format.dateRenderer('Y/m/d'), width: 70,resizable: false,},
			{flex: 1,header: 'enableDevices',  renderer: function(value, meta, rec) {
				var tpl = new Ext.XTemplate('<ol>','<tpl for="items">',
					'<li>{data.device}</li>',
					'</tpl>','</ol>');
				return tpl.apply(rec.enableDevices().data);
			}},
			{flex: 1,header: 'disableRegions',  renderer: function(value, meta, rec) {
				var tpl = new Ext.XTemplate('<ol>','<tpl for="items">',
					'<li>{data.region}</li>',
					'</tpl>','</ol>');
				return tpl.apply(rec.disableRegions().data);
			}},
			{flex: 1,header: 'locale',  renderer: function(value, meta, rec) {
				var tpl = new Ext.XTemplate('<ol>','<tpl for="items">',
					'<li>{data.locale}</li>',
					'</tpl>','</ol>');
				return tpl.apply(rec.resources().data);
			}},
			{flex: 1,header: 'title',  renderer: function(value, meta, rec) {
				var tpl = new Ext.XTemplate('<ol>','<tpl for="items">',
					'<li>{data.title}</li>',
					'</tpl>','</ol>');
				return tpl.apply(rec.resources().data);
			}},
			{flex: 1,header: 'description',  renderer: function(value, meta, rec) {
				var tpl = new Ext.XTemplate('<ol>','<tpl for="items">',
					'<li>{data.description}</li>',
					'</tpl>','</ol>');
				return tpl.apply(rec.resources().data);
			}},
			{flex: 1,header: 'copyright',  renderer: function(value, meta, rec) {
				var tpl = new Ext.XTemplate('<ol>','<tpl for="items">',
					'<li>{data.copyright}</li>',
					'</tpl>','</ol>');
				return tpl.apply(rec.resources().data);
			}},
			{text: 'updateAt'	  ,dataIndex: 'updateAt', renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s'),width: 120,resizable: false,},
			{text: 'createAt'	  ,dataIndex: 'createAt', renderer: Ext.util.Format.dateRenderer('Y/m/d H:i:s'),width: 120,resizable: false,},
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
					action: 'create'
				},
				 {
					text: 'delete',
					iconCls: 'icon-delete',
					action: 'delete'
				},
				/*
				{text: 'upload contents',iconCls: 'icon-accept',action: 'uploadcontents'},
				{text: 'upload thumbnail',iconCls: 'icon-accept',action: 'uploadthumbnail'},
				*/
				]
			}]
		}];
		this.callParent();
		this.columns[0].setSortState("DESC");
	 },
});
