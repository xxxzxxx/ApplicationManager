/**
 * LoginController.js
 * 
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
module.exports = function (app, config) {
	var CLASS_NAME="LoginController";
	return app.getController("Application", true).extend(function () {
	})
	.methods({
		login: function (req, res) {
			var body = req.body;
			var Model = app.getModel('Users',true);
			var user = new Model();
			var self = this;
			var callback = function(err,docs){
				if(err || docs.length == 0){
					res.redirect('/');
				}else{
					var doc = docs[0];
					var pass = body['Password'];
					var password = self.createHash(pass);
					if (typeof doc.password === undefined){
						console.warn(CLASS_NAME,":login:callback:noerr:date password undefined");
						res.redirect('/');
					}
					else if (doc.password == password){
						req.session.authed = doc;
						res.redirect('/admin');
					}else{
						console.warn(CLASS_NAME,":login:callback:noerr:password unmatch");
						res.redirect('/');
					}
				}
			};
			user.find({email: body['UserID']},callback);
		},
		logout: function(req,res){
			req.session.authed = undefined;
			res.redirect('/');
		},
	})
}