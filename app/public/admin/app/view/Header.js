/**
 * AM.view.Header
 * Header.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.view.Header', {
	alias: 'widget.am-header',
	extend: 'Ext.container.Container',
	defaults: {
		xtype: 'container'
	},
	layout: 'hbox',
	items: [{
		html: {
			tag: 'h1',
			html: 'Application Manager'
		},
		flex: 1
	}, {
		xtype: 'toolbar',
		width: 50,
		items: [{
			text: 'logout',
			action: 'logout'
		}]
	}]
});
