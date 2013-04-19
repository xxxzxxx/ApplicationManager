/**
 * AdminController.js
 * 
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
module.exports = function (app, config) {
	var CLASS_NAME="AdminController";
	return app.getController("Application", true)
	.extend(function() {
		this.addBeforeFilter(this.requireAuth);
	})
	.methods({
		home: function (req, res) {
			var user = req.session.authed;
			this.render(res, 'admin/home')
		}
	})
}
