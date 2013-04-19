/**
 * production.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
var mongodb = require('mongodb')
;
module.exports = {
	models: {
		ApplicationModel: {
			database: "mongodb://mongodb/applications",
		},
	}
	, services: {
	}
	, controllers: {
		HomeController: {
				basicAuth: {
						enable: false,
						username: "-- your environment settings --",
						password: "-- your environment settings --"
				}
		},
		ApplicationController: {
			extractZip: {
				Directory: "/tmp/application_manager/extract/",
			},
			packZip: {
				Directory: "/tmp/application_manager/extract/",
			},
			HMAC: {
				Algorithm: "sha256",
				SecretKey: "",
			},
			Hash: {
				Algorithm: "sha256",
			},
			Cipher: {
				Algorithm: "aes-256-cbc",
				SecretKey: "",
			},
		},
	},
	secret:"-- your environment settings --",
	sessionDatabase: new mongodb.Db('applications',
			new mongodb.Server('mongodb',
					27017,
					{auto_reconnect: true, native_parser: true}), {}),
}
