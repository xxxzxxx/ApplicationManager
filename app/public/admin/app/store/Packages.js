/**
 * AM.store.Packages
 * Packages.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.store.Packages', {
	extend: 'Ext.data.Store',
	model: 'AM.model.Package',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		url: './packages',
		method: 'POST',
		api: {
			read: './packages',
			create: './packages/create',
			destroy: './packages/destroy',
			update: './packages/update',
		},
		actionMethods:{
			read:"POST",
			create:"POST",
			destroy:"POST",
			update:"POST",
		},
		reader: {
			type: 'json',
			root: 'result',
			successProperty: 'success',
		}
	}
 });