/**
 * AM.view.user.Edit
 * Edit.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.view.user.Edit', {
	extend: 'Ext.window.Window',
	alias : 'widget.useredit',
	layout: 'fit',
	modal: true,
	collapsible : true,
	autoShow: true,
	bodyStyle: {
		padding: '8px',
	},
	monitorValid:true,
	width:480,
	labelWidth: 180,
	initComponent: function() {
		if(this.create){
			this.items = [{
				xtype: 'form',
				items: [
					{xtype: 'textfield',name: 'first_name',fieldLabel: 'first_name',anchor:'100%', msgTarget:'under', allowBlank:false,},
					{xtype: 'textfield',name: 'last_name' ,fieldLabel: 'last_name' ,anchor:'100%', msgTarget:'under', allowBlank:false,},
					{xtype: 'textfield',name: 'email'	 ,fieldLabel: 'email'	 ,vtype: 'email', anchor:'100%', msgTarget:'under', allowBlank:false,},
					{xtype: 'textfield',name: 'password'  ,fieldLabel: 'password'  ,inputType: 'password' ,anchor:'100%', msgTarget:'under', allowBlank:false,},
					{xtype: 'checkbox',name: 'admin' ,fieldLabel: 'admin' ,anchor:'100%', msgTarget:'under', allowBlank:false,},
				]
			}];
		}else{
			this.items = [{
				xtype: 'form',
				items: [
					{xtype: 'textfield',name: 'first_name',fieldLabel: 'first_name',anchor:'100%', msgTarget:'under', allowBlank:false,},
					{xtype: 'textfield',name: 'last_name' ,fieldLabel: 'last_name' ,anchor:'100%', msgTarget:'under', allowBlank:false,},
					{xtype: 'textfield',name: 'email'	 ,fieldLabel: 'email'	 ,vtype: 'email', anchor:'100%', msgTarget:'under', allowBlank:false,},
					{xtype: 'textfield',name: 'password'  ,fieldLabel: 'password'  ,inputType: 'password' ,anchor:'100%', msgTarget:'under', },
					{xtype: 'checkbox',name: 'admin' ,fieldLabel: 'admin' ,anchor:'100%', msgTarget:'under', allowBlank:false,},
				]
			}];
		}
		if(this.create){
			this.title = 'New User',
			this.buttons = [
				{text: 'Create',action: 'create',},
				{text: 'Cancel',scope: this,handler: this.close,},
			];
		}else{
			this.title = 'Edit User',
			this.buttons = [
				{text: 'Save',action: 'save',},
				{text: 'Cancel',scope: this,handler: this.close,},
			];
		}
		this.callParent(arguments);
	}
});