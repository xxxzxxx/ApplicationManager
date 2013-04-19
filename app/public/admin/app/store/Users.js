/**
 * AM.store.Users
 * Users.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.store.Users', {
	extend: 'Ext.data.Store',
	model: 'AM.model.User',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		url: './users',
		method: 'POST',
		api: {
			read: './users',
			create: './users/create',
			destroy: './users/destroy',
			update: './users/update',
		},
		actionMethods: {
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