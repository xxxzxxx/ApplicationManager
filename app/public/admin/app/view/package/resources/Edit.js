/**
 * AM.view.package.resources.Edit
 * Edit.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.view.package.resources.Edit', {
	extend: 'Ext.window.Window',
	xtype: 'packageresourcesedit',
	alias: 'widget.packageresourcesedit',
	modal: true,
	autoShow: true,
	bodyStyle: {
		padding: '8px',
	},
	monitorValid:true,
	width:600,
	labelWidth: 100,
	initComponent: function() {
		var regions_combo = new Ext.form.ComboBox({
			name:'locale',
			store: 'Languages',
			fieldLabel: "locale",
			displayField: "value",
			valueField: "value",
			editable: false,
			queryMode: "remote",
			forceSelection: true,
			triggerAction: "all",
			emptyText: "please select Langruage",
			allowBlank:false,
		});
		this.items = [
			{
				xtype: 'form',
				items: [
					regions_combo,
					{xtype: 'textfield'	 ,name: 'title'		,allowBlank:false,fieldLabel: 'title',anchor: '100%',},
					{xtype: 'textareafield' ,name: 'description' ,allowBlank:false,fieldLabel: 'description',anchor: '100%',},
					{xtype: 'textfield'	 ,name: 'extra'	,fieldLabel: 'extra',anchor: '100%',},
				]
			}
		];
		if(this.create){
			this.title = 'New Resource',
			this.buttons = [
				{
					text: 'Create',
					action: 'create',
				},
				{
					text: 'Cancel',
					scope: this,
					handler: this.close
				}
			];
		}else{
			this.title = 'Edit Resource',
			this.buttons = [
				{
					text: 'Save',
					action: 'save',
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