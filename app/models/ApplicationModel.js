/**
 * ApplicationModel.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
module.exports = function (app, config) {
	return app.getModel('Base', true).extend(function() {
		this.mongo = require('mongodb');
		this.mongoose = require('mongoose');
		this.Schema = this.mongoose.Schema;
		this.mongoose.connect(config.database);
	})
	.methods({
		create: function (doc, callback) {
			var model = new this.DBModel(doc)
			model.save(callback)
		}
	  , findById: function (id, callback) {
			this.DBModel.findById(id, callback)
		}
	  , find: function (query,callback) {
			this.DBModel.find(query,callback);
		}
	})
}
