/**
 * APIBaseController.js
 * 
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
module.exports = function (app, config) {
	var CLASS_NAME="APIBaseController";
	return app.getController("Application", true).extend(
	function() {
		this.addBeforeFilter(this.checkAgentFilter)
	})
	.methods({
		checkAgentFilter: function (req,res,next) {
			if (req.cookies.authed) return next(null);
			return next(null);
		},
	})
}
