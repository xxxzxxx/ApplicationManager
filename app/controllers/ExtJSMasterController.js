/**
 * ExtJSMasterController.js
 * 
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
module.exports = function (app, config) {
	var CLASS_NAME="ExtJSMasterController";
	return app.getController("AbstractExtJS", true)
	.extend(function () {
		this.createEditParams = [
			 {field:'value',type:"String"},
		];
		this.updateEditParams = this.createEditParams;
		this.sortOrder = undefined;
		this.allCallback = function (self,docs,req,res){
			var result = {
				success: true,
				result: docs,
			};
			self.json(res,result);
		};
		this.readCallback = function (self,docs,req,res){
			var result = {
				success: true,
				result: docs,
			};
			self.json(res,result);
		};
		this.getCallback = function (self,doc,req,res){
			var array = {
				success: true,
				model: doc,
			};
			self.json(res,array);
		};
		this.createCallback = function (self,doc,req,res){
			doc = self.write_params(req,doc,self.createEditParams);
			doc['updateAt'] = new Date();
			doc['createAt'] = new Date();
			doc.save();
			var array = {
				success: true,
				result: doc,
			}
			self.json(res,array);
		};
		this.updateCallback = function (self,doc,req,res){
			doc = self.write_params(req,doc,self.updateEditParams);
			doc['updateAt'] = new Date();
			doc.save();
			var array = {
				success: true,
				result: doc,
			}
			self.json(res,array);
		};
		this.destroyCallback = function (self,doc,req,res){
			doc.remove();
			var result = {
				success: true,
			}
			self.json(res,result);
		};
	})
}