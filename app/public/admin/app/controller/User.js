/**
 * AM.controller.User
 * Region.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.controller.User', {
	extend: 'AM.controller.Base',
	CLASS_NAME: "AM.controller.Region",
	views: [
		'user.List',
		'user.Edit',
	],
	stores: ['Users'],
	init: function() {
		this.control({
			'userlist': {
				selectionchange: this.modelListSelectionChange,
				beforeitemdblclick: this.updateModel
			},
			'userlist button[action=create]': {
				click: this.createModel
			},
			'userlist button[action=delete]': {
				click: this.removeModel
			},
			'useredit button[action=create]': {
				click: this.createModelValidate
			},
			'useredit button[action=save]': {
				click: this.updateModelValidate
			},
		});
	},
	varidateModel: function(mode,window,form,values){
		console.log(this.CLASS_NAME,'varidateModel:',mode);
		values['admin'] = (values['admin']) ? true :false;
		return values;
	},
	isDuplication: function(values,recode){
		console.log(this.CLASS_NAME,'isDuplication');
		var store = this.getTargetStore();
		var items = store.data.items;
		var duplication = false;
		for(var ite = 0; ite < items.length; ite++)
		{
			var item = items[ite].data;
			if (recode){
				if(item['_id'] == recode.raw['_id']){
					continue;
				}
			}
			if (item['email'] == values['email']){
				duplication = true;
				break;
			}
		}
		return duplication;
	},
	getTargetStore: function(){
		return this.getUsersStore();
	},
	getEditWiget: function(){
		return 'AM.view.user.Edit';
	},
	getDialogName: function(){
		return 'Users';
	},
});
