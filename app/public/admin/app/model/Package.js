/**
 * AM.model.Package
 * Package.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.model.Package', {
	extend: 'Ext.data.Model',

	requires: [
		'AM.model.package.Device',
		'AM.model.package.Region',
		'AM.model.package.Resource',
	],
	fields: [
		{name: '_id'	, type: 'string'},
		{name: 'name'  , type: 'string'},
		{name: 'preference', type: 'number'},
		{name: 'application', type: 'string'},
//		{name: 'thumbnail', type: 'string'},
		{name: 'password', type: 'string'},
		{name: 'sale', type: 'string'},
		{name: 'type', type: 'string'},
		{name: 'enableDate', type: 'date'},
		{name: 'expirationDate', type: 'date'},
		{name: 'public', type: 'boolean'},
		{name: 'debug', type: 'boolean'},
		{name: 'updateAt', type: 'date'},
		{name: 'createAt', type: 'date'},
	],
	hasMany: [
		{model: 'AM.model.package.Device', name: 'enableDevices'},
		{model: 'AM.model.package.Region', name: 'disableRegions'},
		{model: 'AM.model.package.Resource', name: 'resources'},
	],

});