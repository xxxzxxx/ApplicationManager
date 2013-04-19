/**
 * AM.controller.Header
 * Header.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.controller.Header', {
	extend: 'Ext.app.Controller',
	refs: [{
		ref: 'header', selector: 'am-header'
	}, {
		ref: 'navi', selector: 'am-navi'
	}],
	views: [
		'Center'
	],
	init: function() {
		var me = this;
		me.control({
			'am-header button[action=logout]': {
				click: function() {
					location.href="/logout";
				}
			}
		});
	}
});
