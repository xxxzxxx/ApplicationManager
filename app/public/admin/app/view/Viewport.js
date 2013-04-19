/**
 * AM.view.Viewport
 * Viewport.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.view.Viewport', {
	extend: 'Ext.container.Viewport',
	layout: {
		type: 'border',
		padding: 5
	},
	items: [{
		xtype: 'am-header',
		height: 35,
		region: 'north'
	}, {
		xtype: 'am-navi',
		region: 'west',
		collapsible: true,
		split: true,
		width: 240
	}, {
		xtype: 'am-center',
		region: 'center'
	}]
});