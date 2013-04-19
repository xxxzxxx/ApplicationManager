/**
 * AM.store.Regions
 * Regions.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.store.Regions', {
	extend: 'Ext.data.Store',
	model: 'AM.model.Region',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		url: './regions',
		method: 'POST',
		api: {
			read: './regions',
			create: './regions/create',
			destroy: './regions/destroy',
			update: './regions/update',
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