/**
 * RegionsController.js
 * 
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
module.exports = function (app, config) {
	return app.getController("ExtJSMaster", true)
	.extend(function () {
		this.CLASS_NAME="RegionsController";
		this.Model = app.getModel("Regions",true);
	})
}