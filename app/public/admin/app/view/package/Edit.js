/**
 * AM.view.package.Edit
 * Edit.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.view.package.Edit', {
	extend: 'Ext.window.Window',
	alias: 'widget.packageedit',
	layout: 'fit',
	modal: true,
	collapsible : true,
	autoShow: true,
	bodyStyle: {
		padding: '8px',
	},
	requires: [
		'AM.view.package.devices.Field',
		'AM.view.package.resources.Field',
		'AM.view.package.regions.Field',
	],
	monitorValid:true,
	width:600,
	labelWidth: 180,
	initComponent: function() {
		var package_types_combo = Ext.create('Ext.form.field.ComboBox', {
			name:'type',
			store: 'PackageTypes',
			fieldLabel: "type",
			displayField: "value",
			valueField: "_id",
			editable: false,
			queryMode: "remote",
			forceSelection: true,
			triggerAction: "all",
			emptyText: "please select package type",
			allowBlank:false,
			anchor:'100%',
			disabled: this.create ? false : true,
		});
		var application_combo = new Ext.form.ComboBox({
			name:'application',
			store: 'Applications',
			fieldLabel: "application",
			displayField: "name",
			valueField: "_id",
			editable: false,
			queryMode: "remote",
			forceSelection: true,
			triggerAction: "all",
			emptyText: "please select application",
			allowBlank:false,
			anchor:'100%',
			disabled: this.create ? false : true,
		});
		var sale_combo = new Ext.form.ComboBox({
			name:'sale',
			store: 'Sales',
			fieldLabel: "sale",
			displayField: "name",
			valueField: "id",
			editable: false,
			queryMode: "remote",
			forceSelection: true,
			triggerAction: "all",
			emptyText: "please select sale type",
			allowBlank:false,
			anchor:'100%',
		});

		this.items = [
			{
				xtype: 'form',
				items: [
					{xtype: 'textfield'		,name: 'name'		,fieldLabel: 'name',		anchor:'100%', msgTarget:'under', allowBlank:false,
					disabled: this.create ? false : true,},
					sale_combo,//sale_radio,
					application_combo,
					package_types_combo,
					{xtype: 'numberfield'	 ,name: 'preference' ,fieldLabel: 'preference', anchor:'100%', msgTarget:'under', allowBlank:false, allowDecimals:false,},

					{xtype: 'textfield'		,name: 'password'	,fieldLabel: 'password', anchor:'100%', msgTarget:'under', allowBlank:false, allowDecimals:false,
					disabled: this.create ? false : true,},

					{xtype: 'datefield'		,name: 'enableDate' ,fieldLabel: 'enableDate', anchor:'100%', msgTarget:'under'},
					{xtype: 'datefield'		,name: 'expirationDate' ,fieldLabel: 'expirationDate', anchor:'100%', msgTarget:'under'},

					{xtype: 'checkbox'		,name: 'public'	 ,fieldLabel: 'public',	 anchor:'100%', msgTarget:'under',
					disabled: this.create ? true : false,},

					{xtype: 'checkbox'		,name: 'debug'	  ,fieldLabel: 'debug',	  anchor:'100%', msgTarget:'under',
					disabled: this.create ? true : false,},

					{xtype: 'devicesfield'	,name: 'enableDevices'	 ,fieldLabel: 'enableDevices',	 msgTarget:'under'},
					{xtype: 'regionsfield'	,name: 'disableRegions'	,fieldLabel: 'disableRegions',	msgTarget:'under'},
					{xtype: 'resourcesfield'  ,name: 'resources'  ,fieldLabel: 'resources',  msgTarget:'under'},
				]
			}
		];
		if(this.create){
			this.title = 'New Package',
			this.buttons = [
				{
					text: 'Create',
					action: 'create'
				},
				{
					text: 'Cancel',
					scope: this,
					handler: this.close
				}
			];
		}else{
			this.title = 'Edit Package',
			this.buttons = [
				{
					text: 'Save',
					action: 'save'
				},
				{
					text: 'Cancel',
					scope: this,
					handler: this.close
				}
			];
		}
		this.callParent(arguments);
	}
});