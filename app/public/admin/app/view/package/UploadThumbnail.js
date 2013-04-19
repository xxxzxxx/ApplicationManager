/**
 * AM.view.package.UploadThumbnail
 * UploadThumbnail.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.define('AM.view.package.UploadThumbnail', {
	extend: 'Ext.window.Window',
	alias: 'widget.packageuploadthumbnail',
//	layout: 'fit',
	modal: true,
	autoShow: true,
	bodyStyle: {
		padding: '8px',
	},
	monitorValid:true,
	width:400,
	labelWidth: 180,

	initComponent: function() {
		this.items = [
			{
				xtype: 'form',
				fileUpload:true,
				monitorValid:true,
				items: [
					this.devices_combo,
					{xtype: 'hiddenfield'	,name : '_id' ,fieldLabel: '_id'},
					{xtype: 'fileuploadfield',id: 'form-file', emptyText: 'Please Select File',fieldLabel: 'File',name: 'file',buttonText: 'Select File..'},
				]
			}
		];
		this.title = 'Upload Thumbnail',
		this.buttons = [
			{
				text: 'Upload',
				action: 'upload'
			},
			{
				text: 'Cancel',
				scope: this,
				handler: this.close
			}
		];
		this.callParent(arguments);
	}
});