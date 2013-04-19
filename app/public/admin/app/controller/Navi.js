/**
 * AM.controller.Navi
 * Navi.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.controller.Navi', {
	extend: 'Ext.app.Controller',
	CLASS_NAME: 'AM.controller.Navi',
	refs: [{
		ref: 'navi', selector: 'am-navi',
		ref: 'center', selector: 'am-center',
	}],
	views: [
			'Navi',
			'Center',
			'application.Edit',
			'application.permissions.Field',
	],
	stores: [
			 'Navis',
			 'Applications',
			 'Devices',
			 'Languages',
			 'Packages',
			 'PackageTypes',
			 'Regions',
			 'Users',
	],
	init: function() {
		var me = this;
		me.control({
			'am-navi': {
				itemclick: this.naviItemClickListener,
				beforeitemdblclick: this.updateApplication,
			},
			'am-navi button[action=create]': {
				click: this.createApplication
			},
			'am-navi button[action=delete]': {
				click: this.removeApplication
			},
			'am-header': {
				doReloadNavi: me.onReload
			},
			'applicationedit button[action=create]': {
				click: this.createApplicationValidate
			},
			'applicationedit button[action=save]': {
				click: this.updateApplicationValidate
			},
			'applicationpermissionsfield': {
				selectionchange: this.permissionListSelectionChange,
				beforeitemdblclick: this.updatePermission,
			},
			'applicationpermissionsfield button[action=permissions_create]': {
				click: this.createPermission,
			},
			'applicationpermissionsfield button[action=permissions_delete]': {
				click: this.removePermission,
			},
			'applicationpermissionsedit button[action=create]': {
				click: this.createPermissionValidate,
			},
			'applicationpermissionsedit button[action=save]': {
				click: this.updatePermissionValidate,
			},

		});
	},
	onReload: function() {
		this.getNavi().getStore().load();
	},
	naviItemClickListener: function(view,record){
		console.log('navi-clickListener');
		console.log(this);

		var application = record.internalId;
		var app = this.getApplicationsStore();
		var r = app.findRecord('_id',record.internalId);
		var view = this.getCenter();
		if(r){
			var stores = [
					this.getPackagesStore(),
					this.getPackageTypesStore(),
			];
			for (var i=0; i<stores.length; i++){
				var store = stores[i];
				store.proxy.api.read = store.proxy.url + "/" + application;
				store.load();
			}
			view.setApplication();
		}else{
			view.setRoot();
		}
	},
	setStore: function(mode,record){
		console.log(this.CLASS_NAME,'setStore');
		console.log(this.CLASS_NAME,'setStore',record);
		var tag = 'application.edit.permissionsStore';
		var model = 'AM.model.application.Permission';
		if(mode == "create"){
			Ext.data.StoreManager.add(
					tag,
					new Ext.data.Store({
						model: model,
					})
				);
		}else{
			Ext.data.StoreManager.add(
					tag,
					record.permissionsStore ?
							record.permissionsStore :
							new Ext.data.Store({
								model: model,
							})
				);
		}
	},
	doCustomSubmit: function(mode,window,recode,store,values){
		console.log(this.CLASS_NAME,'doCustomSubmit:',mode);
		if(mode == "create"){
			Ext.Ajax.request({
				url:'/admin/applications/create',
				waitMsg: 'create...',
				headers: { 'Content-Type': 'application/json' },
				params: Ext.encode(values),
				success: function(response){
					store.sync();
					store.load();
					window.close();
				},
				failure: function(response){
				}
			});
		}else{
			if(mode == "update"){
				values._id = recode.data['_id'];
			}
			Ext.Ajax.request({
				url:'/admin/applications/update',
				waitMsg: 'update...',
				headers: { 'Content-Type': 'application/json' },
				params: Ext.encode(values),
				success: function(response){
					recode.set(values);
					store.sync();
					store.load();
					window.close();
				},
				failure: function(response){}
			});
		}
	},
	varidateModel: function(mode,window,form,values){
		console.log(this.CLASS_NAME,'varidateModel:',mode);
		var permissionsArry =[],
			permissions = window.down('applicationpermissionsfield'),
			items = permissions.store.data.items
			;
		for (var i=0; i < items.length; i++){
			var permission = items[i];
			permissionsArry.push(permission.data);
		}
		values.permissions = permissionsArry;
		values['admin'] = (values['admin']) ? true :false;
		return values;
	},
	createApplication: function(button) {
		console.log(this.CLASS_NAME,'createApplication');
		this.setStore('create');
		var view = Ext.create('AM.view.application.Edit', {
			create:true
		});
	},
	createApplicationValidate: function(button) {
		console.log(this.CLASS_NAME,'createApplicationValidate');
		var window = button.up('window'),
			form = window.down('form'),
			recode = form.getRecord(),
			values = form.getValues(),
			mode = "create";

		if (!form.getForm().isValid()) {
			return;
		}
		values = this.varidateModel(mode,window,form,values);
		console.log(values);
		var store = this.getApplicationsStore();

		var items = store.data.items;
		var duplication = false;
		for(var ite = 0; ite < items.length; ite++)
		{
			var item = items[ite].data;
			if(item['name'] == values['name']){
				duplication = true;
				break;
			}
		}
		if(duplication){
			Ext.MessageBox.alert('Application','This Application is duplicated');
		}else{
			this.doCustomSubmit(mode,window,recode,store,values);
		}
	},
	updateApplication: function(view, record) {
		console.log(this.CLASS_NAME,'updateApplicationValidate');
		var store = this.getApplicationsStore();
		var r = store.findRecord('_id',record.internalId);
		if(r){
			this.setStore('update',r);
			var view = Ext.widget('applicationedit');
			view.down('form').loadRecord(r);
		}
	},
	updateApplicationValidate: function(button) {
		console.log(this.CLASS_NAME,'updateApplicationValidate');
		var window = button.up('window'),
			form = window.down('form'),
			recode = form.getRecord(),
			values = form.getValues(),
			mode = "update";
		if (!form.getForm().isValid()) {
			return;
		}
		values = this.varidateModel(mode,window,form,values);

		console.log(values);

		var store = this.getApplicationsStore();
		store.load();
		var items = store.data.items;
		var duplication = false;

		for(var ite = 0; ite < items.length; ite++)
		{
			var item = items[ite].data;
			if(item['_id'] == recode.raw['_id']){
				continue;
			}
			if(item['name'] == values['name']){
				duplication = true;
				break;
			}
		}
		if(duplication){
			Ext.MessageBox.alert('Application','This Application is duplicated');
		}else{
			this.doCustomSubmit(mode,window,recode,store,values);
		}
	},
	removeApplication: function(button) {
		console.log(this.CLASS_NAME,'removeApplication');
		var store = this.getApplicationsStore();
		var p = button.up('panel');
		console.log(this.CLASS_NAME,'panel',p);
		var s = p.selModel.selected.items[0];
		var r = store.findRecord('_id',s.internalId);
		if (r) {
			store.remove(r);
			store.sync();
			this.getNavisStore().load();
		}
	},
	/***************************************
	 * Permission
	 ***************************************/
	permissionListSelectionChange: function(grid, selections, options) {
		console.log(this.CLASS_NAME,'permissionListSelectionChange');
		var panel = grid.view.up('panel'),
			deletebtn = panel.down('button[action=delete]');
		deletebtn.setDisabled(selections.length === 0);
	},
	createPermission: function(button) {
		console.log(this.CLASS_NAME,'createPermission');
		var view = Ext.create('AM.view.application.permissions.Edit', {
			create:true
		});
	},
	createPermissionValidate: function(button) {
		console.log(this.CLASS_NAME,'createPermissionValidate');
		var w = button.up('window'),
			f = w.down('form'),
			r = f.getRecord(),
			v = f.getValues();
		console.log(v);
		if (!f.getForm().isValid()) {
			return;
		}

		var store = Ext.data.StoreManager.get("application.edit.permissionsStore");
		var items = store.data.items;
		var duplication = false;
		for(var ite = 0; ite < items.length; ite++)
		{
			var item = items[ite].data;
			if(item['user'] == v['user']){
				duplication = true;
				break;
			}
		}
		if(duplication){
			Ext.MessageBox.alert('Permissions','This permission is duplicated');
		}else{
			store.add(v);
			w.close();
		}
	},
	updatePermission: function(grid, record) {
		console.log(this.CLASS_NAME,'updatePermission');
		var view = Ext.create('AM.view.application.permissions.Edit', {
		});
		view.down('form').loadRecord(record);
	},
	updatePermissionValidate: function(button) {
		console.log(this.CLASS_NAME,'updatePermissionValidate');
		var w = button.up('window'),
			f = w.down('form'),
			r = f.getRecord(),
			v = f.getValues();

		if (!f.getForm().isValid()) {
			return;
		}

		var store = Ext.data.StoreManager.get("application.edit.permissionsStore");
		var items = store.data.items;
		var duplication = false;
		for(var ite = 0; ite < items.length; ite++)
		{
			var item = items[ite].data;
			if(typeof v['_id'] !== undefined){
				continue;
			}
			else if(item['_id'] == v['_id']){
				continue;
			}
			else if(item['user'] == v['user']){
				duplication = true;
				break;
			}
		}
		if(duplication){
			Ext.MessageBox.alert('Permissions','This permission is duplicated');
		}else{
			r.set(v);
			w.close();
		}
	},
	removePermission: function(button) {
		console.log(this.CLASS_NAME,'removePermission');
		var p = button.up('panel').up('panel');
		var s = p.selModel.selected.items[0];
		var self = this;
		if (s) {
			Ext.MessageBox.confirm(
				'Confirm'
				, 'Are you sure you want to do delete this record?',
				function (btn, text){
					if (btn != 'no') {
						var store = Ext.data.StoreManager.get("application.edit.permissionsStore");
						store.remove(s);
					}
				});
		}
	},
});
