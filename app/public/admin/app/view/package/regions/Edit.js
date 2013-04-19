/**
 * AM.view.package.regions.Edit
 * Edit.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.view.package.regions.Edit', {
	extend: 'Ext.window.Window',
	xtype: 'packageregionsedit',
	alias: 'widget.packageregionsedit',
//	layout: 'fit',
	modal: true,
	autoShow: true,
	bodyStyle: {
		padding: '8px',
	},
	monitorValid:true,
	width:600,
	labelWidth: 180,
	initComponent: function() {
		console.log('initComponent');
		console.log(this);
		var regions_combo = new Ext.form.ComboBox({
			name:'region',
			store: 'Regions',
			fieldLabel: "region",
			displayField: "value",
			valueField: "value",
			editable: false,
			queryMode: "local",
			forceSelection: true,
			triggerAction: "all",
			emptyText: "please select Region",
			allowBlank:false,
			anchor: '100%',
		});
		this.items = [
			{
				xtype: 'form',
				items: [
					regions_combo,
				]
			}
		];
		if(this.create){
			this.title = 'New Disable Region',
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
			this.title = 'Edit Region',
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