/**
 * AM.view.device.Edit
 * Edit.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.view.device.Edit', {
	extend: 'Ext.window.Window',
	alias : 'widget.deviceedit',
	layout: 'fit',
	modal: true,
	autoShow: true,
	labelWidth: 180,
	width:600,

	initComponent: function() {
		this.items = [
			{
				xtype: 'form',
				items: [
					{
						xtype: 'textfield',
						name : 'value',
						fieldLabel: 'Value',
						anchor:'100%',
						msgTarget:'under',
						allowBlank:false,
					},
				]
			}
		];
		if(this.create){
			this.title = 'New Device',
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
			this.title = 'Edit Device',
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