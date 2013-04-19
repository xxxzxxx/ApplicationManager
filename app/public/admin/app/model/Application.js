/**
 * AM.model.Application
 * Application.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.model.Application', {
	extend: 'Ext.data.Model',
	requires: [
				'AM.model.application.Permission',
	],
	fields: [
		{name: '_id', type: 'string'},
		{name: 'name', type: 'string'},
		{name: 'homepage', type: 'string'},
		{name: 'commonSecret', type: 'string'},
		{name: 'secret', type: 'string'},
		{name: 'version', type: 'string'},
		{name: 'updateAt', type: 'date'},
		{name: 'createAt', type: 'date'},
	],
	hasMany: [
		{model: 'AM.model.application.Permission', name: 'permissions'},
	],
 });