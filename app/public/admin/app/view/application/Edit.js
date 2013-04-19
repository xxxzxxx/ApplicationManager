/**
 * AM.view.application.Edit
 * Edit.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.view.application.Edit', {
	extend: 'Ext.window.Window',
	alias : 'widget.applicationedit',
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
					{xtype: 'textfield',name: 'name',fieldLabel: 'name',anchor:'100%', msgTarget:'under', allowBlank:false,
					disabled: this.create ? false : true,},
					{xtype: 'textfield',name: 'homepage',fieldLabel: 'homepage',anchor:'100%', msgTarget:'under', allowBlank:false,},
					{xtype: 'textfield',name: 'commonSecret',fieldLabel: 'commonSecret',anchor:'100%', msgTarget:'under', allowBlank:false,
					disabled: this.create ? false : true,},
					{xtype: 'textfield',name: 'secret',fieldLabel: 'secret',anchor:'100%', msgTarget:'under', allowBlank:false,
					disabled: this.create ? false : true,},
					{xtype: 'textfield',name: 'version',fieldLabel: 'version',anchor:'100%', msgTarget:'under', allowBlank:false,},
					{xtype: 'applicationpermissionsfield'	,name: 'parmissions'	 ,fieldLabel: 'parmissions',	 msgTarget:'under'},
				]
			}
		];
		if(this.create){
			this.title = 'New Application',
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
			this.title = 'Edit Application',
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