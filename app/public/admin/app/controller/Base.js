/**
 * AM.controller.Base
 * Base.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.controller.Base', {
	extend: 'Ext.app.Controller',
	CLASS_NAME: "AM.controller.Base",
	init: function(){
	},
	getTargetStore: function(){
		console.log(this.CLASS_NAME,'getTargetStore');
		throw "Unimplemented getStore method.";
	},
	getEditWiget: function(){
		console.log(this.CLASS_NAME,'getEditWiget');
		throw "Unimplemented getEditWiget method.";
	},
	getDialogName: function(){
		console.log(this.CLASS_NAME,'getDialogName');
		throw "Unimplemented getDialogName method.";
	},
	isDuplication: function(values,recode){
		console.log(this.CLASS_NAME,'isDuplication');
		var store = this.getTargetStore();
		var items = store.data.items;
		var duplication = false;
		for(var ite = 0; ite < items.length; ite++)
		{
			var item = items[ite].data;
			if(recode){
				if(item['_id'] == recode.raw['_id']){
					continue;
				}
			}
			if(item['value'] == values['value']){
				duplication = true;
				break;
			}
		}
		return duplication;
	},
	modelListSelectionChange: function(grid, selections, options) {
		console.log(this.CLASS_NAME,'modelListSelectionChange');
		var panel = grid.view.up('panel'),
			button = panel.down('button[action=delete]');
		button.setDisabled(selections.length === 0);
	},
	setStore: function(mode,record){
		console.log(this.CLASS_NAME,'setStore');
	},
	createModel: function(button) {
		console.log(this.CLASS_NAME,'createModel');
		var mode = 'create';
		this.setStore(mode);
		var view = Ext.create(this.getEditWiget(), {
			create:true
		});
	},
	varidateModel: function(mode,window,form,values){
		console.log(this.CLASS_NAME,'varidateModel');
		return values;
	},
	doCustomSubmit: function(mode,window,recode,store,values){
		console.log(this.CLASS_NAME,'doCustomSubmit');
		if(mode == 'create'){
			store.add(values);
			store.sync();
			window.close();
		}else{
			recode.set(values);
			store.sync();
			store.load();
			window.close();
		}
	},
	createModelValidate: function(button) {
		console.log(this.CLASS_NAME,'createModelValidate');
		var window = button.up('window'),
			form = window.down('form'),
			recode = form.getRecord(),
			values = form.getValues(),
			mode = "create"
			;
		if (!form.getForm().isValid()) {
			return;
		}
		values = this.varidateModel(mode,window,form,values);
		var store = this.getTargetStore();
		var duplication = this.isDuplication(values);
		if(duplication){
			Ext.MessageBox.alert(this.getDialogName(),'This is duplicated');
		}else{
			this.doCustomSubmit(mode,window,recode,store,values);
		}
	},
	updateModel: function(grid, record) {
		console.log(this.CLASS_NAME,'updateModel');
		var mode = 'update';
		this.setStore(mode,record);
		var view = Ext.create(this.getEditWiget(), {
		});
		view.down('form').loadRecord(record);
	},
	updateModelValidate: function(button) {
		console.log(this.CLASS_NAME,'updateModelValidate');
		var window = button.up('window'),
			form = window.down('form'),
			recode = form.getRecord(),
			values = form.getValues(),
			mode = "update"
			;
		if (!form.getForm().isValid()) {
			return;
		}
		values = this.varidateModel(mode,window,form,values);
		var store = this.getTargetStore();
		store.load();
		var items = store.data.items;
		var duplication = this.isDuplication(values,recode);
		if(duplication){
			Ext.MessageBox.alert(this.getDialogName(),'This is duplicated');
		}else{
			if(typeof this.doCustomSubmit === undefined){
				recode.set(values);
				store.load();
				store.sync();
				window.close();
			}else{
				this.doCustomSubmit(mode,window,recode,store,values);
			}
		}
	},
	removeModel: function(button) {
		console.log(this.CLASS_NAME,'removeModel');
		var p = button.up('panel').up('panel');
		var s = p.selModel.selected.items[0];
		if (s) {
			var store = this.getTargetStore();
			store.remove(s);
			store.sync();
		}
	},
});