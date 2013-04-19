/**
 * PackageTypesModel.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
module.exports = function (app, config) {
	return app.getModel('Application', true)
	.extend(
		function () {
			this.DBModel = this.mongoose.model(
				'package_types',
				new this.Schema({
					 application: String
					,value	: String
					,updateAt: { type: Date, default: Date.now }
					,createAt: { type: Date, default: Date.now }
				})
			);
		}
	);
}