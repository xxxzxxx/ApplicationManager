/**
 * AM.controller.Region
 * Region.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.controller.Region', {
	extend: 'AM.controller.Base',
	CLASS_NAME: "AM.controller.Region",
	views: [
		'region.List',
		'region.Edit',
	],
	stores: ['Regions'],
	init: function() {
		this.control({
			'regionlist': {
				selectionchange: this.modelListSelectionChange,
//				beforeitemdblclick: this.updateModel
			},
			'regionlist button[action=create]': {
				click: this.createModel
			},
			'regionlist button[action=delete]': {
				click: this.removeModel
			},
			'regionedit button[action=create]': {
				click: this.createModelValidate
			},
			'regionedit button[action=save]': {
				click: this.updateModelValidate
			},
		});
	},
	getTargetStore: function(){
		return this.getRegionsStore();
	},
	getEditWiget: function(){
		return 'AM.view.region.Edit';
	},
	getDialogName: function(){
		return 'Regions';
	},
});