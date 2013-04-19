/**
 * AM.controller.Language
 * Language.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.controller.Language', {
	extend: 'AM.controller.Base',
	CLASS_NAME: "AM.controller.Language",
	views: [
		'language.List',
		'language.Edit',
	],
	stores: ['Languages'],
	init: function() {
		this.control({
			'languagelist': {
				selectionchange: this.modelListSelectionChange,
//				beforeitemdblclick: this.updateModel
			},
			'languagelist button[action=create]': {
				click: this.createModel
			},
			'languagelist button[action=delete]': {
				click: this.removeModel
			},
			'languageedit button[action=create]': {
				click: this.createModelValidate
			},
			'languageedit button[action=save]': {
				click: this.updateModelValidate
			},
		});
	},
	getTargetStore: function(){
		return this.getLanguagesStore();
	},
	getEditWiget: function(){
		return 'AM.view.language.Edit';
	},
	getDialogName: function(){
		return 'Languages';
	},
});