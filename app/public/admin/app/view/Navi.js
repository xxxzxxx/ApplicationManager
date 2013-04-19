/**
 * AM.view.Navi
 * Navi.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.view.Navi', {
	alias: 'widget.am-navi',
	extend: 'Ext.tree.Panel',
	store: 'Navis',
//	rootVisible: false,
	animate: false,
	initComponent: function() {
		this.dockedItems = [{
			dock: 'top',
			xtype: 'toolbar',
			items: [
				{
					text: 'create',
					iconCls: 'icon-add',
					action: 'create'
				}, {
					text: 'delete',
					iconCls: 'icon-delete',
					action: 'delete'
				},
			]
		}];
		this.callParent();
	}
});
