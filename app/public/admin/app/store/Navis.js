/**
 * AM.store.Navis
 * Navis.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.store.Navis', {
	extend: 'Ext.data.TreeStore',
	model: 'AM.model.Application',
	constructor: function() {
		console.log('Constructor of MainMenu TreeStore');
		config = Ext.apply(this,{
			proxy: {
				type: 'ajax',
				url: './applications/navi',
				method: 'POST',
				reader: {
					type: 'json',
					root: 'result',
					successProperty: 'success',
				},
				api:{
					read: './applications/navi',
				},
				actionMethods:{
					read:"POST",
				},
			},
			root: {
				text: 'Applications',
				id: 'root',
				expanded: true
			}
		});
		this.callParent(arguments);
	}
});