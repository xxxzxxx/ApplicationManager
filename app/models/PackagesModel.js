/**
 * PackagesModel.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
module.exports = function (app, config) {
	return app.getModel('Application', true).extend(
		function () {
			var Device = new this.Schema({
				 device: {type: String}
			});
			var Region = new this.Schema({
				 region: { type: String}
			});
			var Resource = new this.Schema({
				 locale:		  { type: String }
				,title:			{ type: String }
				,description:	 { type: String }
				,copyright:		{ type: String }
			});
			this.DBModel = this.mongoose.model(
				'packages',
				new this.Schema({
					  name:		String
					, preference: { type: Number, default:0 }
					, application: String
					, password:	String
					, sale:		String
					, type:		String
					, enableDate: Date
					, expirationDate: Date

					, debug:	  { type: Boolean, default: true }
					, public:	 { type: Boolean, default: false }

					, disableRegions:	[Region]
					, enableDevices:	 [Device]
					, resources:  		 [Resource]

					, updateAt:	{ type: Date, default: Date.now }
					, createAt:	{ type: Date, default: Date.now }
				})
			);
		}
	);
}