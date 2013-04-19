/**
 * PackagesController.js
 * 
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
module.exports = function (app, config) {
	CLASS_NAME="PackagesController";
	return app.getController("ExtJSMaster", true)
	.extend(function () {
		this.CLASS_NAME="PackagesController";
		this.Model = app.getModel("Packages",true);
		this.sortOrder = function (a,b){
			if(a.preference > b.preference)	return -1;
			if(a.preference < b.preference)	return 1;
			return 0;
		};
		this.createEditParams = [
			 {field:'name',type:"String"},
			 {field:'type',type:"String"},
			 {field:'application',type:"String"},
			 {field:'preference',type:"String"},
			 {field:'password',type:"String"},
			 {field:'sale',type:"String"},
			 {field:'enableDate',type:"Date"},
			 {field:'expirationDate',type:"Date"},
			 {field:'enableDevices',type:"Array",trimming:function(data){
				 	var modify = {
				 			device:data.device,
				 	};
				 	return modify;
			 	}
		 	 },
			 {field:'disableRegions',type:"Array",trimming:function(data){
				 	var modify = {
				 			region:data.region,
				 	};
				 	return modify;
			 	}
		 	 },
			 {field:'resources',type:"Array",trimming:function(data){
				 	var modify = {
					 		locale:data.locale,
					 		title:data.title,
					 		description:data.description,
					 		copyright:data.copyright,
				 	};
				 	return modify;
			 	}
		 	 },
			 {field:'debug',type:"Boolean"},
			 {field:'public',type:"Boolean"},
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
		thumbnail: function (req,res) {
			var fs = require('fs')
				, body = req.body
				, self = this
				, Model = this.Model
				, model = new Model()
				, callback = function(err,doc){
					var files = req.files
						, file = files.file
						, data = fs.readFileSync(file.path,"base64")
						;
					doc['thumbnail'] = data;
					doc.save();
					var result = {
						success:true,
						result: doc,
					};
					self.json(res,result);
				}
				;

			model.findById(body['_id'],callback);
		},
		upload: function (req,res) {
			var self = this
				, body = req.body
				, password = req.body['password']
				, files = req.files
				, file = files.file
				;
			try {
				var ext_dir = this.extract(file.path);
				var pack = this.compression(ext_dir,'*',password);
			}catch(std){
			}

			var callback = function(err,doc){
				var result = {
					success:true,
					result: doc,
				};
				self.json(res,result);
			}

			var Model = this.Model;
			var model = new Model();
			model.findById(body['_id'],callback);
		},
	});
}