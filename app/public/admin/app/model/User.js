/**
 * AM.model.User
 * User.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.model.User', {
	extend: 'Ext.data.Model',
	fields: [
		{name: '_id', type: 'string'},
		{name: 'first_name', type: 'string'},
		{name: 'last_name', type: 'string'},
		{name: 'email', type: 'string'},
		{name: 'admin', type: 'boolean'},
		{name: 'password', type: 'string'},
		{name: 'updateAt', type: 'date'},
		{name: 'createAt', type: 'date'},
	],
});