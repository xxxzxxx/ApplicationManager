/**
 * ApplicationsController.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
var Step = require('step');
module.exports = function (app, config) {
	CLASS_NAME="ApplicationsController";
	return app.getController("ExtJSMaster", true)
	.extend(function () {
		this.Model = app.getModel("Applications",true);
		this.CLASS_NAME="ApplicationsController";
		this.createEditParams = [
				 {field:'name',type:"String"},
				 {field:'homepage',type:"String"},
				 {field:'commonSecret',type:"String"},
				 {field:'secret',type:"String"},
				 {field:'version',type:"String"},
				 {field:'notices',type:"Array"},
				 {field:'permissions',type:"Array"
					 /*,trimming:function(data){
 				 	 var modify = {
 				 			user:data.user,
 				 	 };
 				 	 return modify;
				 	}*/
				 },
				 {field:'owner',type:"Session",trimming:function(req){
 				 	 return req.session.authed._id;
				 }},
			];
		this.updateEditParams = [
				 {field:'name',type:"String"},
				 {field:'homepage',type:"String"},
				 {field:'version',type:"String"},
				 {field:'notices',type:"Array"},
				 {field:'permissions',type:"Array",trimming:function(data){
 				 	 var modify = {
 				 			user:data.user,
 				 	 };
 				 	 return modify;
				 }},
				 {field:'owner',type:"Session",trimming:function(req){
 				 	 return req.session.authed._id;
				 }},
			 ];
	}).methods({
		navi: function (req,res) {
			var self = this
			,body = req.body
			,Model = this.Model
			,model = new Model()
			,longinUser = req.session.authed
			;
			Step(
				function (){
					if(longinUser.admin){
						model.find({},this);
					}else{
						var query = {
								$or: [
										{"permissions.user": longinUser._id}
									  ,{"owner": longinUser._id}
								]
						};
						model.find(query,this);
					}
				},
				function(err,docs){
					var applications = new Array();
					for (var i=0; i<docs.length; i++){
						var doc = docs[i];
						application = {};
						application.id=doc._id;
						application.text=doc.name;
						application._id=doc._id;
						application.name=doc.name;
						application.homepage=doc.homepage;
						application.version=doc.version;
						application.secret=doc.secret;
						application.permissions=doc.permissions;
						application.update_at=doc.update_at;
						application.create_at=doc.create_at;
						application.leaf=true;
						applications.push(application);
					}
					var result = {
						success:true,
						result:applications
					};
					self.json(res,result);
				}
			);
		},
	});
}