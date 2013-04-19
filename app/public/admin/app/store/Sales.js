/**
 * AM.store.Sales
 * Sales.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.store.Sales', {
	extend: 'Ext.data.SimpleStore',
	fields: ["id","name"],
	data: [
		["free","free"],
		["pay","pay"],
	],
});
