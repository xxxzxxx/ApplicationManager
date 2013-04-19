/**
 * AM.view.package.devices.Edit
 * Edit.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.view.package.devices.Edit', {
	extend: 'Ext.window.Window',
	xtype: 'packagedevicesedit',
	alias: 'widget.packagedevicesedit',
//	layout: 'fit',
	modal: true,
	autoShow: true,
	bodyStyle: {
		padding: '8px',
	},
	monitorValid:true,
	width:400,
	labelWidth: 180,
	initComponent: function() {
		var devices_combo = new Ext.form.ComboBox({
			name:'device',
			store: 'Devices',
			fieldLabel: "device",
			displayField: "value",
			valueField: "value",
			editable: false,
			queryMode: "local",
			forceSelection: true,
			triggerAction: "all",
			emptyText: "please select Device",
			allowBlank:false,
			anchor: '100%',
		});
		this.items = [
			{
				xtype: 'form',
				items: [
					devices_combo,
				]
			}
		];
		if(this.create){
			this.title = 'New Device',
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
			this.title = 'Edit Device',
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