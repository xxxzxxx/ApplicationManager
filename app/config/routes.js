/**
 * routes.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
module.exports = function (app) {
  return {
	'/': {'get': 'Home.index'},
	'/admin': {'get': 'Admin.home'},
	'/login': {'post': 'Login.login'},
	'/logout': {'get': 'Login.logout'},

	'/api/application': {'post': 'API.application'},
	'/api/packages': {'post': 'API.packages'},
	'/api/timestamp': {'post': 'API.timestamp'},
	'/api/download': {'post': 'API.download'},

	'/admin/applications': {'post': 'Applications.all',},
	'/admin/applications/read': {'post': 'Applications.read',},
	'/admin/applications/navi': {'post': 'Applications.navi',},
	'/admin/applications/get': {'post': 'Applications.get'},
	'/admin/applications/create': {'post': 'Applications.create'},
	'/admin/applications/update': {'post': 'Applications.update'},
	'/admin/applications/destroy': {'post': 'Applications.destroy'},

	'/admin/packages': {'post': 'Packages.all',},
	'/admin/packages/:application': {'post': 'Packages.find',},
	'/admin/packages/get': {'post': 'Packages.get'},
	'/admin/packages/create': {'post': 'Packages.create'},
	'/admin/packages/update': {'post': 'Packages.update'},
	'/admin/packages/upload': {'post': 'Packages.upload'},
	'/admin/packages/thumbnail': {'post': 'Packages.thumbnail'},
	'/admin/packages/destroy': {'post': 'Packages.destroy'},

	'/admin/devices': {'post': 'Devices.all',},
	'/admin/devices/get': {'post': 'Devices.get'},
	'/admin/devices/create': {'post': 'Devices.create'},
	'/admin/devices/update': {'post': 'Devices.update'},
	'/admin/devices/destroy': {'post': 'Devices.destroy'},

	'/admin/languages': {'post': 'Languages.all',},
	'/admin/languages/get': {'post': 'Languages.get'},
	'/admin/languages/create': {'post': 'Languages.create'},
	'/admin/languages/update': {'post': 'Languages.update'},
	'/admin/languages/destroy': {'post': 'Languages.destroy'},

	'/admin/packagetypes': {'post': 'PackageTypes.all',},
	'/admin/packagetypes/:application': {'post': 'PackageTypes.find',},
	'/admin/packagetypes/create': {'post': 'PackageTypes.create'},
	'/admin/packagetypes/update': {'post': 'PackageTypes.update'},
	'/admin/packagetypes/destroy': {'post': 'PackageTypes.destroy'},

	'/admin/regions': {'post': 'Regions.all',},
	'/admin/regions/get': {'post': 'Regions.get'},
	'/admin/regions/create': {'post': 'Regions.create'},
	'/admin/regions/update': {'post': 'Regions.update'},
	'/admin/regions/destroy': {'post': 'Regions.destroy'},

	'/admin/users': {'post': 'Users.all',},
	'/admin/users/get': {'post': 'Users.get'},
	'/admin/users/create': {'post': 'Users.create'},
	'/admin/users/update': {'post': 'Users.update'},
	'/admin/users/destroy': {'post': 'Users.destroy'},
  }
}
