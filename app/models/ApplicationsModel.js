/**
 * ApplicationsModel.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
module.exports = function (app, config) {
	return app.getModel('Application', true).extend(
		function () {
			var Permission = new this.Schema({
				 user: { type: String}
				,permission: { type: String}
			});
			this.DBModel = this.mongoose.model(
				'applications',
				new this.Schema({
					 name:	 String
					,homepage: String
					,commonSecret:	{ type: String, default: 'secretKey' }
					,secret:	{ type: String, default: 'secretKey' }
					,version:  String
					,permissions: [Permission]
					,owner:	String
					,updateAt: { type: Date, default: Date.now }
					,createAt: { type: Date, default: Date.now }
				})
			);
		}
	);
}