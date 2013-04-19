/**
 * AM.model.package.Resource
 * Resource.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.model.package.Resource', {
	extend: 'Ext.data.Model',
	fields: [
		{name: '_id', type: 'string'},
		{name: 'locale', type: 'string'},
		{name: 'title', type: 'string'},
		{name: 'description', type: 'string'},
		{name: 'copyright', type: 'string'},
	],
})
