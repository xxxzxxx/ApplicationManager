/**
 * AM.app
 * app.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
Ext.Loader.setConfig({
	enabled : true,
	paths	: {
		Ext : '/ext/src',
	}
});
Ext.application({
  name: 'AM',
  autoCreateViewport: true,

	models: [
		'Application',
		'Device',
		'Language',
		'Package',
		'PackageType',
		'Region',
		'User',
	],
	stores: [
		'Navis',
		'Applications',
		'Devices',
		'Languages',
		'Packages',
		'PackageTypes',
		'Regions',
		'Users',
		'Sales',
	],
	controllers: [
		'Main', 'Header', 'Navi', 'Center',
//		'Application',
		'Device',
		'Language',
		'Package',
		'PackageType',
		'Region',
		'User',
	],
});
