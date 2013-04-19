/**
 * AM.controller.Device
 * Device.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.controller.Device', {
	extend: 'AM.controller.Base',
	CLASS_NAME: "AM.controller.Device",
	views: [
		'device.List',
		'device.Edit',
	],
	stores: ['Devices'],
	init: function() {
		this.control({
			'devicelist': {
				selectionchange: this.modelListSelectionChange,
//				beforeitemdblclick: this.updateModel
			},
			'devicelist button[action=create]': {
				click: this.createModel
			},
			'devicelist button[action=delete]': {
				click: this.removeModel
			},
			'deviceedit button[action=create]': {
				click: this.createModelValidate
			},
			'deviceedit button[action=save]': {
				click: this.updateModelValidate
			},
		});
	},
	getTargetStore: function(){
		return this.getDevicesStore();
	},
	getEditWiget: function(){
		return 'AM.view.device.Edit';
	},
	getDialogName: function(){
		return 'Devices';
	},
});