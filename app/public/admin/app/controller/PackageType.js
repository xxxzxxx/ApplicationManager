/**
 * AM.controller.PackageType
 * PackageType.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.controller.PackageType', {
	extend: 'AM.controller.Base',
	CLASS_NAME: "AM.controller.PackageType",
	views: [
		'packagetype.List',
		'packagetype.Edit',
	],
	stores: ['PackageTypes'],
	init: function() {
		this.control({
			'packagetypelist': {
				selectionchange: this.modelListSelectionChange,
//				beforeitemdblclick: this.updateModel
			},
			'packagetypelist button[action=create]': {
				click: this.createModel
			},
			'packagetypelist button[action=delete]': {
				click: this.removeModel
			},
			'packagetypeedit button[action=create]': {
				click: this.createModelValidate
			},
			'packagetypeedit button[action=save]': {
				click: this.updateModelValidate
			},
		});
	},
	isDuplication: function(v,r){
		console.log('isDuplication');
		var store = this.getTargetStore();
		var items = store.data.items;
		var duplication = false;
		for(var ite = 0; ite < items.length; ite++)
		{
			var item = items[ite].data;
			if(r){
				if(item['_id'] == r.raw['_id']){
					continue;
				}
			}
			if(item['application'] == v['application'] &&
				item['value'] == v['value']){
				duplication = true;
				break;
			}
		}
		return duplication;
	},
	getTargetStore: function(){
		return this.getPackageTypesStore();
	},
	getEditWiget: function(){
		return 'AM.view.packagetype.Edit';
	},
	getDialogName: function(){
		return 'PackageTypes';
	},
});