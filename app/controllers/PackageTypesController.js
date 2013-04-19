/**
 * PackageTypesController.js
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
		this.CLASS_NAME="PackageTypesController";
		this.Model = app.getModel("PackageTypes",true);
		this.createEditParams = [
			 {field:'application',type:"String"},
			 {field:'value',type:"String"},
		];
		this.updateEditParams = this.createEditParams;
	}).methods({
		find: function (req,res) {
			var Model = this.Model
				, model = new Model()
				, application = req.params["application"]
				, self = this
				, callback = function(err,docs){
				if(err){
					self.json_error(res,err);
				}else{
					var result = {
							success:true,
							result: docs,
					};
					self.json(res,result);
				}
			}
			;
			model.find({application:application},callback);
		},
	})
}