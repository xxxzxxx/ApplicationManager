/**
 * AM.view.application.permissions.Edit
 * Edit.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.view.application.permissions.Edit', {
	extend: 'Ext.window.Window',
	xtype: 'applicationpermissionsedit',
	alias: 'widget.applicationpermissionsedit',
	modal: true,
	autoShow: true,
	bodyStyle: {
		padding: '8px',
	},
	monitorValid:true,
	width:400,
	labelWidth: 180,
	initComponent: function() {
		var users_combo = new Ext.form.ComboBox({
			name:'user',
			store: 'Users',
			fieldLabel: "user",
			displayField: "email",
			valueField: "_id",
			editable: false,
			queryMode: "remote",
			forceSelection: true,
			triggerAction: "all",
			emptyText: "please select user",
			allowBlank:false,
			anchor:'100%',
			disabled: this.create ? false : true,
		});
		this.items = [
			{
				xtype: 'form',
				items: [
					users_combo,
				]
			}
		];
		if(this.create){
			this.title = 'Add User Permission',
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
			this.title = 'Edit User Permission',
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