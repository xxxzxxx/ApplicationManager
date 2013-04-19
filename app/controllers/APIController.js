/**
 * APIPackageController.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
var Step = require('step');
/**
 * APIPackageControllers.js
 */
 module.exports = function (app, config) {
	var CLASS_NAME="APIPackageController";
	var ApplicationsModel = app.getModel('Applications',true);
	var PackageTypesModel = app.getModel('PackageTypes',true);
	var PackagesModel = app.getModel('Packages',true);
	return app.getController("APIBase", true).extend()
	.methods({
		application: function (req, res) {
			var params = req.params
			, body = req.body
			, id = body["id"]
			, self = this
			, applicationsModel = new ApplicationsModel()
			, packageTypessModel = new PackageTypesModel()
			, application
			, app
			;
			Step(
				function(){
					if(id){
						applicationsModel.findById(id,this);
					}else{
						self.error(res);
					}
				},
				function(err,doc){
					if (err){
						self.json_error(res,err);
					}else{
						app = doc;
						application = {
								homepage: doc.homepage,
								name: doc.name,
								version: doc.version,
								secret: doc.secret,
								_id: doc._id,
						};
						packageTypessModel.find({application: body['id']},this);
					}
				},
				function(err,docs){
					if (err){
						self.json_error(res,err);
					}else{

						application["packageTypes"] = docs;
						var encryptedData = self.encryptionDoc(
								application,
								app.commonSecret
						);
						var result = {
							sucess: true
							,hash:	encryptedData.hash
							,result: encryptedData.encryptedData
						};
						self.json(res,result);
					}
				}
			);
		},
		packages: function (req, res) {
			var body = req.body
			, self = this
			, params = req.params
			, application = body['application']
			, device = body['device']
			, region = body['region']
			, mode = body['mode']
			, packagesModel = new PackagesModel()
			, applicationsModel = new ApplicationsModel()
			, app
			;
			Step(
				function(){
					if(application && region && device){
						applicationsModel.findById(application,this);
					}else{
						this.error(res);
					}
				},
				function(err,doc){
					if(err || !doc){
						self.json_error(res,err);
					}
					else{
						app = doc;
						var find_params = {
							application: application
							,public: true
							,"enableDevices.device":device
							,"disableRegions.region":{$ne:region}
						};
						if(mode != "debug"){
							find_params.debug = false;
						}
						packagesModel.find(find_params,this);
					}
				},
				function(err,docs){
					if(err){
						self.json_error(res,err);
					}
					else{
						docs.sort(function (a,b){
							if(a.preference > b.preference)  return -1;
							if(a.preference < b.preference)  return 1;
							return 0;
						});
						var encryptedData = self.encryptionDoc(
								{packages:docs},
								app.secret
						);
						var result = {
							sucess: true
							,hash: encryptedData.hash
							,result: encryptedData.encryptedData
						};
						self.json(res,result);
					}
				}
			);
		},
		timestamp: function (req, res) {
			var time = require('time')
				, nowdate = new time.Date()
				, reslut = false
				nowdate.setTimezone('UTC');
			var result = {
					sucess: true,
					result: nowdate.toISOString()
				};
			this.json(res,result);
		},
		/**
		 * download
		 */
		download: function (req, res) {
		}
	})
}
