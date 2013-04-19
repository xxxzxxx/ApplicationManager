/**
 * HomeController.js
 * 
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
var matador = require('matador');
module.exports = function (app, config) {
	var CLASS_NAME="HomeController";
	return app.getController("Application", true).extend(
		 function () {
			this.basicAuth = matador.basicAuth(
				config.basicAuth.username,
				config.basicAuth.password);
			if(config.basicAuth.enable){
				this.addBeforeFilter(this.basicAuth);
			}
		}
	).methods({
		index: function (req, res) {
			if(req.session.authed){
				res.redirect('/admin');
			}else{
				this.render(res, 'home/login');
			}
		}
	})
}
