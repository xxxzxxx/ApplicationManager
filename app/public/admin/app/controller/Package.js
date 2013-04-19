/**
 * AM.controller.Package
 * Package.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.controller.Package', {
	extend: 'Ext.app.Controller',
	CLASS_NAME: "AM.controller.Language",
	views: [
		'package.List',
		'package.Edit',
		'package.Upload',
		'package.UploadThumbnail',
		'package.regions.Field',
		'package.resources.Field',
		'package.devices.Field',
	],
	stores: ['Packages'],
	init: function() {
		this.control({
			'packagelist': {
				selectionchange: this.packageListSelectionChange,
				beforeitemdblclick: this.updatePackage,
			},
			'packagelist actioncolumn': {
				click: this.onAction,
			},
			'packagelist button[action=create]': {
				click: this.createPackage
			},
			'packagelist button[action=delete]': {
				click: this.removePackage
			},
			'packageedit button[action=create]': {
				click: this.createPackageValidate
			},
			'packageedit button[action=save]': {
				click: this.updatePackageValidate
			},
/*
			'packagelist button[action=uploadcontents]': {
				click: this.uploadPackage
			},
			'packageupload button[action=upload]': {
				click: this.uploadPackageValidate
			},
			'packagelist button[action=uploadthumbnail]': {
				click: this.uploadThmbnail
			},
			'packageuploadthumbnail button[action=upload]': {
				click: this.uploadThmbnailValidate
			},
*/

			'devicesfield': {
				selectionchange: this.deviceListSelectionChange,
				beforeitemdblclick: this.updateDevice,
			},
			'devicesfield button[action=devices_create]': {
				click: this.createDevice,
			},
			'devicesfield button[action=devices_delete]': {
				click: this.removeDevice,
			},
			'packagedevicesedit button[action=create]': {
				click: this.createDeviceValidate,
			},
			'packagedevicesedit button[action=save]': {
				click: this.updateDeviceValidate,
			},

			'regionsfield': {
				selectionchange: this.regionListSelectionChange,
				beforeitemdblclick: this.updateRegion,
			},
			'regionsfield button[action=regions_create]': {
				click: this.createRegion,
			},
			'regionsfield button[action=regions_delete]': {
				click: this.removeRegion,
			},
			'packageregionsedit button[action=create]': {
				click: this.createRegionValidate,
			},
			'packageregionsedit button[action=save]': {
				click: this.updateRegionValidate,
			},

			'resourcesfield': {
				selectionchange: this.resourceListSelectionChange,
				beforeitemdblclick: this.updateResource,
			},
			'resourcesfield button[action=resources_create]': {
				click: this.createResource,
			},
			'resourcesfield button[action=resources_delete]': {
				click: this.removeResource,
			},
			'packageresourcesedit button[action=create]': {
				click: this.createResourceValidate,
			},
			'packageresourcesedit button[action=save]': {
				click: this.updateResourceValidate,
			},

		});
	},
	onAction: function(view,cell,row,col,e){
		console.log(this.CLASS_NAME,'onAction');
		var m = e.getTarget().className.match(/\bicon-(\w+)\b/);
		var rec = this.getPackagesStore().getAt(row);
		var self = this;
		if(m){
			switch(m[1]){
				case 'accept':
					Ext.MessageBox.confirm(
						'Confirm'
						, 'Are you sure you want to do enable this record?',
						function (btn, text){
							if (btn) {
							}
						});
					break;
				case 'delete':
					Ext.MessageBox.confirm(
						'Confirm'
						, 'Are you sure you want to do delete this record?',
						function (btn, text){
							if (btn != 'no') {
								var store = self.getPackagesStore();
								store.remove(rec);
								store.load();
								store.sync();
							}
						});
					break;
			}
		}
	},
	packageListSelectionChange: function(grid, selections, options) {
		console.log(this.CLASS_NAME,'packageListSelectionChange');
		var panel = grid.view.up('panel');
		var deletebtn = panel.down('button[action=delete]');
//		var uploadcontbtn = panel.down('button[action=uploadcontents]');
//		var uploadthumbtn = panel.down('button[action=uploadthumbnail]');
		console.log(this.CLASS_NAME,'packageListSelectionChange');
		deletebtn.setDisabled(selections.length == 0);
//		uploadcontbtn.setDisabled(selections.length == 0);
//		uploadthumbtn.setDisabled(selections.length == 0);
	},
	createPackage: function(button) {
		console.log(this.CLASS_NAME,'createPackage');
		Ext.data.StoreManager.add(
			"package.edit.devicesStore",
			new Ext.data.Store({
				model: 'AM.model.package.Device',
			})
		);
		Ext.data.StoreManager.add(
			"package.edit.resourcesStore",
			new Ext.data.Store({
				model: 'AM.model.package.Resource',
			})
		);
		Ext.data.StoreManager.add(
			"package.edit.regionsStore",
			new Ext.data.Store({
				model: 'AM.model.package.Region',
			})
		);

		var view = Ext.create(
			'AM.view.package.Edit', {
				create:true
			});
	},
	createPackageValidate: function(button) {
		console.log(this.CLASS_NAME,'createPackageValidate');
		var w = button.up('window'),
			g = button.up('grid'),
			f = w.down('form'),
			devices = w.down('devicesfield'),
			regions = w.down('regionsfield'),
			resources = w.down('resourcesfield'),
			r = f.getRecord(),
			v = f.getValues();

		if (!f.getForm().isValid()) {
			return;
		}
		var store = this.getPackagesStore();

		var data = [];
		console.log(v);

		var regionsArry =[];
		var items = regions.store.data.items;
		for (var i=0; i < items.length; i++){
			var region = items[i];
			regionsArry.push(region.data);
		}
		v.disableRegions = regionsArry;
		var devicesArry =[];
		var items = devices.store.data.items;
		for (var i=0; i < items.length; i++){
			var device = items[i];
			devicesArry.push(device.data);
		}
		v.enableDevices = devicesArry;
		var resourcesArry =[];
		var items = resources.store.data.items;
		for (var i=0; i < items.length; i++){
			var resource = items[i];
			resourcesArry.push(resource.data);
		}
		v.resources = resourcesArry;

		var store = this.getPackagesStore();
		store.load();
		var items = store.data.items;
		var duplication = false;
		for(var ite = 0; ite < items.length; ite++)
		{
			var item = items[ite].data;
			if(item['name'] == v['name']){
				duplication = true;
				break;
			}
		}
		if(duplication){
			Ext.MessageBox.alert('Package','This package is duplicated');
		}else{
			Ext.Ajax.request({
				url:'/admin/packages/create',
				waitMsg: 'create Package...',
				headers: { 'Content-Type': 'application/json' },
				params: Ext.encode(v),
				success: function(response){
					store.load();
					w.close();
				},
				failure: function(response){
				}
			});
		}
	},
	updatePackage: function(grid, record) {
		console.log(this.CLASS_NAME,'updatePackage');
		Ext.data.StoreManager.add(
			"package.edit.devicesStore",
			record.enableDevicesStore ? record.enableDevicesStore :
			new Ext.data.Store({
				model: 'AM.model.package.Device',
			})
		);
		Ext.data.StoreManager.add(
			"package.edit.resourcesStore",
			record.resourcesStore ? record.resourcesStore :
			new Ext.data.Store({
				model: 'AM.model.package.Resource',
			})
		);
		Ext.data.StoreManager.add(
			"package.edit.regionsStore",
			record.disableRegionsStore ? record.disableRegionsStore :
			new Ext.data.Store({
				model: 'AM.model.package.Region',
			})
		);
		var view = Ext.widget('packageedit');
		view.down('form').loadRecord(record);
	},
	updatePackageValidate: function(button) {
		console.log(this.CLASS_NAME,'updatePackageValidate');
		var w = button.up('window'),
			f = w.down('form'),
			devices = w.down('devicesfield'),
			regions = w.down('regionsfield'),
			resources = w.down('resourcesfield'),
			r = f.getRecord(),
			v = f.getValues();

		if (!f.getForm().isValid()) {
			return;
		}
		v['debug'] = (v['debug']) ? true :false;
		v['public'] = (v['public']) ? true :false;
		var regionsArry =[];
		var items = regions.store.data.items;
		for (var i=0; i < items.length; i++){
			var region = items[i];
			regionsArry.push(region.data);
		}
		v.disableRegions = regionsArry;
		var devicesArry =[];
		var items = devices.store.data.items;
		for (var i=0; i < items.length; i++){
			var device = items[i];
			devicesArry.push(device.data);
		}
		v.enableDevices = devicesArry;
		var resourcesArry =[];
		var items = resources.store.data.items;
		for (var i=0; i < items.length; i++){
			var resource = items[i];
			resourcesArry.push(resource.data);
		}
		v.resources = resourcesArry;
		v._id = r.data['_id'];
		v.resources = resourcesArry;
		var store = this.getPackagesStore();
		store.load();
		var items = store.data.items;
		var duplication = false;
		for(var ite = 0; ite < items.length; ite++)
		{
			var item = items[ite].data;
			if(item['_id'] == r.raw['_id']){
				continue;
			}
			if(item['name'] == v['name']){
				duplication = true;
				break;
			}
		}
		if(duplication){
			Ext.MessageBox.alert('Package','This package is duplicated');
		}else{
			Ext.Ajax.request({
				url:'/admin/packages/update',
				waitMsg: 'update Package...',
				headers: { 'Content-Type': 'application/json' },
				params: Ext.encode(v),
				success: function(response){
					r.set(v);
					store.sync();
					store.load();
					w.close();
				},
				failure: function(response){}
			});
		}
	},
	removePackage: function(button) {
		console.log(this.CLASS_NAME,'removePackage');
		var p = button.up('panel').up('panel');
		var s = p.selModel.selected.items[0];
		var self = this;
		if (s) {
			Ext.MessageBox.confirm(
				'Confirm'
				, 'Are you sure you want to do delete this record?',
				function (btn, text){
					if (btn != 'no') {
						var store = self.getPackagesStore();
						store.remove(s);
						store.sync();
					}
				});
		}
	},
	/*****************************************
	 * Upload Contents
	 ****************************************/
	uploadPackage: function(button) {
		console.log(this.CLASS_NAME,'uploadPackage');
		var p = button.up('panel').up('panel');
		var model = p.selModel;
		var record = model.selected.items[0];
		var view = Ext.widget('packageupload');
		view.down('form').loadRecord(record);
	},
	uploadPackageValidate: function(button) {
		console.log(this.CLASS_NAME,'uploadPackageValidate');
		var w = button.up('window'),
			f = w.down('form'),
			r = f.getRecord(),
			v = f.getValues();
		f.getForm().submit({
			url:'/admin/packages/upload',
			scope: this,
			waitMsg: 'ファイルを送信中です...',
			success:function(basicForm,action){
				var data = Ext.decode(action.response.responseText);
				if (action.result.success){
					w.close();
				}else{
					Ext.Msg.alert('エラー','ファイルのアップロードに失敗しました。').setIcon(Ext.Msg.ERROR);
					w.close();
				}
			},
			failure:function(basicForm,action){
				Ext.Msg.alert('エラー','サーバーへの接続に失敗しました。').setIcon(Ext.Msg.ERROR);
			}
		});
	},

	/*****************************************
	 * Upload Thmbnail
	 ****************************************/
	uploadThmbnail: function(button) {
		console.log(this.CLASS_NAME,'uploadThmbnail');
		var p = button.up('panel').up('panel');
		var model = p.selModel;
		var record = model.selected.items[0];
		var view = Ext.widget('packageuploadthumbnail');
		view.down('form').loadRecord(record);
	},
	uploadThmbnailValidate: function(button) {
		console.log(this.CLASS_NAME,'uploadThmbnailValidate');
		var w = button.up('window'),
			f = w.down('form'),
			r = f.getRecord(),
			v = f.getValues();
		console.log(f.getForm().submit);
		f.getForm().submit({
			url:'/admin/packages/thumbnail',
			scope: this,
			waitMsg: 'ファイルを送信中です...',
			success:function(basicForm,action){
				console.log(this.CLASS_NAME,'success:function');
				var data = Ext.decode(action.response.responseText);
				if (action.result.success){
					f.getForm().reset();
					w.close();
				}else{
					console.log(this.CLASS_NAME,'result.error');
					Ext.Msg.alert('エラー','ファイルのアップロードに失敗しました。').setIcon(Ext.Msg.ERROR);
				}
			},
			failure:function(basicForm,action){
				console.log(this.CLASS_NAME,'result.failure');
				Ext.Msg.alert('エラー','サーバーへの接続に失敗しました。').setIcon(Ext.Msg.ERROR);
			}
		});
	},

	/***************************************
	 * Devices
	 ***************************************/
	deviceListSelectionChange: function(grid, selections, options) {
		console.log(this.CLASS_NAME,'deviceListSelectionChange');
		var panel = grid.view.up('panel'),
			deletebtn = panel.down('button[action=delete]');
		deletebtn.setDisabled(selections.length === 0);
	},
	createDevice: function(button) {
		console.log(this.CLASS_NAME,'createDevice');
		var view = Ext.create('AM.view.package.devices.Edit', {
			create:true
		});
	},
	createDeviceValidate: function(button) {
		console.log(this.CLASS_NAME,'createDeviceValidate');
		var w = button.up('window'),
			f = w.down('form'),
			r = f.getRecord(),
			v = f.getValues();

		if (!f.getForm().isValid()) {
			return;
		}
		v.enable = v.enable == 'on' ? true : false;
		var store = Ext.data.StoreManager.get("package.edit.devicesStore");
		var items = store.data.items;
		var duplication = false;
		for(var ite = 0; ite < items.length; ite++)
		{
			var item = items[ite].data;
			if(item['device'] == v['device']){
				duplication = true;
				break;
			}
		}
		if(duplication){
			Ext.MessageBox.alert('Devices','This device is duplicated');
		}else{
			store.add(v);
			w.close();
		}
	},
	updateDevice: function(grid, record) {
		console.log(this.CLASS_NAME,'updateDevice');
		var view = Ext.create('AM.view.package.devices.Edit', {
		});
		view.down('form').loadRecord(record);
	},
	updateDeviceValidate: function(button) {
		console.log(this.CLASS_NAME,'updateDeviceValidate');
		var w = button.up('window'),
			f = w.down('form'),
			r = f.getRecord(),
			v = f.getValues();

		if (!f.getForm().isValid()) {
			return;
		}
		v.enable = v.enable == 'on' ? true : false;

		var store = Ext.data.StoreManager.get("package.edit.devicesStore");
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
			else if(item['device'] == v['device']){
				duplication = true;
				break;
			}
		}

		if(duplication){
			Ext.MessageBox.alert('Devices','This device is duplicated');
		}else{
			r.set(v);
			w.close();
		}
	},
	removeDevice: function(button) {
		var p = button.up('panel').up('panel');
		var s = p.selModel.selected.items[0];
		var self = this;
		if (s) {
			Ext.MessageBox.confirm(
				'Confirm'
				, 'Are you sure you want to do delete this record?',
				function (btn, text){
					if (btn != 'no') {
						var store = Ext.data.StoreManager.get("package.edit.devicesStore");
						store.remove(s);
						store.sync();
					}
				});
		}
	},

	/***************************************
	 * Region
	 ***************************************/
	regionListSelectionChange: function(grid, selections, options) {
		console.log(this.CLASS_NAME,'regionListSelectionChange');
		var panel = grid.view.up('panel'),
			deletebtn = panel.down('button[action=delete]');
		deletebtn.setDisabled(selections.length === 0);
	},
	createRegion: function(button) {
		console.log(this.CLASS_NAME,'createRegion');
		var view = Ext.create('AM.view.package.regions.Edit', {
			create:true
		});
	},
	createRegionValidate: function(button) {
		console.log(this.CLASS_NAME,'createRegionValidate');
		var w = button.up('window'),
			f = w.down('form'),
			r = f.getRecord(),
			v = f.getValues();

		if (!f.getForm().isValid()) {
			return;
		}

		v.enable = v.enable == 'on' ? true : false;

		var store = Ext.data.StoreManager.get("package.edit.regionsStore");
		var items = store.data.items;
		var duplication = false;
		for(var ite = 0; ite < items.length; ite++)
		{
			var item = items[ite].data;
			if(item['region'] == v['region']){
				duplication = true;
				break;
			}
		}
		if(duplication){
			Ext.MessageBox.alert('Regions','This region is duplicated');
		}else{
			store.add(v);
			w.close();
		}
	},
	updateRegion: function(grid, record) {
		console.info('updateRegion');
		var view = Ext.create('AM.view.package.regions.Edit', {
		});
		view.down('form').loadRecord(record);
	},
	updateRegionValidate: function(button) {
		console.info('updateRegionValidate');
		var w = button.up('window'),
			f = w.down('form'),
			r = f.getRecord(),
			v = f.getValues();

		if (!f.getForm().isValid()) {
			return;
		}

		v.enable = v.enable == 'on' ? true : false;

		var store = Ext.data.StoreManager.get("package.edit.regionsStore");
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
			else if(item['region'] == v['region']){
				duplication = true;
				break;
			}
		}
		if(duplication){
			Ext.MessageBox.alert('Regions','This region is duplicated');
		}else{
			r.set(v);
			w.close();
		}
	},
	removeRegion: function(button) {
		console.log(this.CLASS_NAME,'removeRegion');
		var p = button.up('panel').up('panel');
		var s = p.selModel.selected.items[0];
		var self = this;
		if (s) {
			Ext.MessageBox.confirm(
				'Confirm'
				, 'Are you sure you want to do delete this record?',
				function (btn, text){
					if (btn != 'no') {
						var store = Ext.data.StoreManager.get("package.edit.regionsStore");
						store.remove(s);
						store.sync();
					}
				});
		}
	},

	/***************************************
	 * Resouces
	 ***************************************/
	resourceListSelectionChange: function(grid, selections, options) {
		console.log(this.CLASS_NAME,'resourceListSelectionChange');
		var panel = grid.view.up('panel'),
			deletebtn = panel.down('button[action=delete]');
		deletebtn.setDisabled(selections.length === 0);
	},
	createResource: function(button) {
		console.log(this.CLASS_NAME,'createResource');
		var view = Ext.create('AM.view.package.resources.Edit', {
			create:true
		});
	},
	createResourceValidate: function(button) {
		console.log(this.CLASS_NAME,'createResourceValidate');
		var w = button.up('window'),
			f = w.down('form'),
			r = f.getRecord(),
			v = f.getValues();

		if (!f.getForm().isValid()) {
			return;
		}

		var store = Ext.data.StoreManager.get("package.edit.resourcesStore");
		var items = store.data.items;
		var duplication = false;
		for(var ite = 0; ite < items.length; ite++)
		{
			var item = items[ite].data;
			if(item['locale'] == v['locale']){
				duplication = true;
				break;
			}
		}
		if(duplication){
			Ext.MessageBox.alert('Resources','This resource is duplicated');
		}else{
			store.add(v);
			w.close();
		}
	},
	updateResource: function(grid, record) {
		console.log(this.CLASS_NAME,'updateResource');
		var view = Ext.create('AM.view.package.resources.Edit', {
		});
		view.down('form').loadRecord(record);
	},
	updateResourceValidate: function(button) {
		console.log(this.CLASS_NAME,'updateResourceValidate');
		var w = button.up('window'),
			f = w.down('form'),
			r = f.getRecord(),
			v = f.getValues();

		if (!f.getForm().isValid()) {
			return;
		}

		var store = Ext.data.StoreManager.get("package.edit.resourcesStore");
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
			else if(item['locale'] == v['locale']){
				duplication = true;
				break;
			}
		}
		if(duplication){
			Ext.MessageBox.alert('Resources','This resource is duplicated');
		}else{
			r.set(v);
			w.close();
		}
	},
	removeResource: function(button) {
		console.log(this.CLASS_NAME,'removeResource');
		var p = button.up('panel').up('panel');
		var s = p.selModel.selected.items[0];
		var self = this;
		if (s) {
			Ext.MessageBox.confirm(
				'Confirm'
				, 'Are you sure you want to do delete this record?',
				function (btn, text){
					if (btn != 'no') {
						var store = Ext.data.StoreManager.get("package.edit.resourcesStore");
						store.remove(s);
					}
				});
		}
	},

});