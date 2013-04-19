/**
 * AM.view.packagetype.Edit
 * Edit.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.view.packagetype.Edit', {
	extend: 'Ext.window.Window',
	alias : 'widget.packagetypeedit',
	layout: 'fit',
	autoShow: true,
	labelWidth: 180,
	width:600,

	initComponent: function() {
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
		this.items = [
			{
				xtype: 'form',
				items: [
					application_combo,
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
			this.title = 'New Package Type',
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
			this.title = 'Edit Package Type',
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