/**
 * UsersController.js
 * 
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
module.exports = function (app, config) {
	CLASS_NAME="UsersController";
	return app.getController("ExtJSMaster", true)
	.extend(function () {
		this.CLASS_NAME="UsersController";
		this.Model = app.getModel("Users",true);
		var self = this;
		this.createEditParams = [
			 {field:'first_name',type:"String"},
			 {field:'last_name',type:"String"},
			 {field:'email',type:"String"},
			 {field:'password',type:"Hash"},
			 {field:'admin',type:"Boolean"},
		];
		this.updateEditParams = this.createEditParams;
	});
}