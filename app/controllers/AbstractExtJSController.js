/**
 * AbstractExtJSController.js
 * 
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
module.exports = function (app, config) {
	var CLASS_NAME="AbstractExtJSController";
	return app.getController("Admin", true)
	.extend()
	.methods({
		all: function (req,res) {
			var Model = this.Model
			  , model = new Model()
			  , self = this
			  , recive = this.allCallback
			  , sortOrder = this.sortOrder
			  , callback = function(err,docs){
				if(sortOrder){
					docs.sort(sortOrder);
				}
				err ? self.json_error(err,res) : recive(self,docs,req,res);
			  }
			  ;
			model.find({},callback);
		},
		read: function (req,res) {
			var Model = this.Model
			  , model = new Model()
			  , id = req.body["id"]
			  , self = this
			  , recive = this.readCallback
			  , sortOrder = this.sortOrder
			  , callback = function(err,doc){
				err ? self.json_error(err,res) : recive(self,doc,req,res);
			  }
			  ;
			model.findById(id,callback);
		},
		get: function (req,res) {
			var Model = this.Model
			  , model = new Model()
			  , id = req.params["id"]
			  , self = this
			  , recive = this.getCallback
			  , callback = function(err,doc){
				  err ? self.json_error(err,res) : recive(self,doc,req,res);
			  }
			  ;
			id ? model.findById(id,callback) : this.error(req,res);
		},
		create: function (req,res) {
			var Model = this.Model
			  , model = new Model()
			  , self = this
			  , recive = this.createCallback
			  , callback = function(err,doc){
				  err ? self.json_error(err,res) : recive(self,doc,req,res);
			  }
			  ;
			model.create({},callback);
		},
		update: function (req,res) {
			var Model = this.Model
			  , model = new Model()
			  , self = this
			  , body = req.body
			  , id = body['_id']
			  , recive = this.updateCallback
			  , callback = function(err,doc){
				  err ? self.json_error(err,res) : recive(self,doc,req,res);
			  }
			  ;
			id ? model.findById(id,callback) : this.error(req,res);
		},
		destroy: function (req,res) {
			var Model = this.Model
			  , model = new Model()
			  , self = this
			  , body = req.body
			  , id = body['_id']
			  , recive = this.destroyCallback
			  , callback = function(err,doc){
				  err ? self.json_error(err,res) : recive(self,doc,req,res);
			  }
			  ;
			id ? model.findById(id,callback) : this.error(req,res);
		},
	})
}