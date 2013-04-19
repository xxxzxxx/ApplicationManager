/**
 * UsersModel.js
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
			this.DBModel = this.mongoose.model(
				'users',
				new this.Schema({
					  first_name: String
					, last_name:  String
					, email:	  String
					, password:	String
					, admin:	  { type: Boolean,default: false }
					, updateAt:	{ type: Date, default: Date.now }
					, createAt:	{ type: Date, default: Date.now }
				})
			);
		}
	);
}