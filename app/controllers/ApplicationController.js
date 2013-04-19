/**
 * ApplicationController.js
 *
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
var crypto = require('crypto')
  , StringDecoder = require('string_decoder').StringDecoder
  , Step = require('step')
  ;
module.exports = function (app, config) {
	var CLASS_NAME = "ApplicationController";
	return app.controllers.Base.extend(function(){
	})
	.methods({
		/**
		 * requireAuth
		 *  check session defined authed object
		 * @param data
		 * @return binary
		 */
		requireAuth: function (req,res,callback) {
			var UsersModel = app.getModel('Users',true);
			var usersModel = new UsersModel();
			var self = this;
			Step(
				function(){
					if (req.session.authed){
						usersModel.findById(req.session.authed._id,this);
					}else{
						res.redirect('/');
					}
				},
				function(err,doc){
					if(err){
						req.session.authed = undefined;
						res.redirect('/');
					}else if (doc){
						req.session.authed = doc;
						return callback(null);
					}
				}
			);
		},
		/**
		 * create directory
		 * @param path
		 * @param status
		 * @return extract directory
		 */
		mkdir: function (path,status){
			var fs = require('fs')
				 ,s = path.split('/')
				 ,dir = ''
				 ;
			for (var i=0; i<s.length;i++){
				if (s[i] == ''){ continue; }
				dir += '/'+s[i];
				try{
					fs.statSync(dir);
				}catch(e){
					fs.mkdirSync(dir, status);
				}
			}
		},
		/**
		 * check the file or directory exist
		 * @param path
		 * @return extract directory
		 */
		isFileExist: function (path){
			var fs = require('fs')
				, result = true;
				;
			try{
				fs.statSync(path);
			}catch(e){
				result = false;
			}
			return result;
		},
		/**
		 * Unzip Zip format
		 * @param file
		 * @param password
		 * @throws std {stderr,stdout}
		 * @return extract directory
		 */
		extract: function(file,password){
			var exec = require('exec-sync')
				, util = require('util')
				, directory = config.extractZip.Directory
					? config.extractZip.Directory
					: '/tmp/applicaton_manager/extract'
				, fileHash = this.createHash(file)
				, extract_directory = util.format('%s/%s',directory,fileHash);
				;
			if(!this.isFileExist(directory)){
				this.mkdir(directory, 0777);
			}
			if(this.isFileExist(extract_directory)){
				fs.rmdir(extract_directory);
			}
			var command;
			if (password) {
				command =
					util.format('unzip -P \'%s\' \'%s\' -d \'%s\''
						,password
						,file
						,directory);
			} else {
				command =
					util.format('unzip \'%s\' -d \'%s\''
						,file
						,directory);
			}
			var std = exec(command,true);
			if(std.err != ''){
				throw(std);
			}
			return extract_directory;
		},
		/**
		 * Compression in Zip format the target directory
		 * @param target_directory
		 * @param filter
		 * @param password
		 * @throws std
		 * @return compression_file_path
		 */
		compression: function(target_directory,filter,password){
			var exec = require('exec-sync')
				, util = require('util')
				, command = ""
				, filter = filter ? filter : "*"
				, directory = config.packZip.Directory
				, file = util.format(
						'%s/%s.zip'
						,directory
						,'examples')
				;
			if (directory){
				directory = '/tmp/applicaton_manager/packing';
			}
			if(!this.isFileExist(directory)){
				mkdir(directory, 0777);
			}
			if (password) {
				command = util.format('zip -junk-paths -password %s %s -d %s/%s'
						,password
						,zip_file
						,target_directory
						,filter);
			} else {
				command = util.format('zip -junk-paths %s -d %s/%s'
						,zip_file
						,target_directory
						,filter);
			}
			var std = exec(command,true);
			if(std.err != ''){
				throw(std);
			}
			return file;
		},
		/**
		 * hash of the specified data
		 * @param data
		 * @param type default[binary]
		 * @param encoding default[base64]
		 * @return specified encoding type hash
		 */
		createHash: function (data,type,encoding,algorithm) {
			var  data_type = type ? type : "binary"
				, encoding = encoding ? encoding : "base64"
				, alg = algorithm ? algorithm : config.Hash.Algorithm
				;
			var hash = crypto.createHash(alg).update(data,data_type).digest(encoding);
			return hash;
		},
		/**
		 * HMAC of the specified data
		 * @param data
		 * @param secretKey default config.HMAC.SecretKey
		 * @param type default binary
		 * @param encoding default base64
		 * @param algorithm default config.HMAC.Algorithm
		 * @return specified encoding type HMAC
		 */
		createHMAC: function (data,secretKey,type,encoding,algorithm) {
			var  data_type = type ? type : "binary"
				, encoding = encoding	? encoding : "base64"
				, alg = algorithm ? algorithm : config.HMAC.Algorithm
				, secret = secretKey ? secretKey : config.HMAC.SecretKey
				;
			var hmac = crypto.createHmac(alg, secret)
							.update(data,data_type)
							.digest(encoding);
			return hmac;
		},
		/**
		 * encryption
		 * @param data
		 * @param secretKey default config.Cipher.SecretKey
		 * @param type default binary
		 * @param encoding default base64
		 * @param algorithm default config.Cipher.Algorithm
		 * @return specified encoding type Cipher
		 */
		encryption: function (data,secretKey,iv,type,encoding,algorithm) {
			var	data_type = type ? type : "utf8"
				, encoding = encoding  ? encoding  : "base64"
				, alg = algorithm ? algorithm : config.Cipher.Algorithm
				, secret = secretKey ? secretKey : config.Cipher.SecretKey
				, buffer = new Buffer(data);
				;
			var cipher = crypto.createCipheriv(alg, secret, iv);
			buffer = cipher.update(buffer, data_type, encoding);
			buffer += cipher.final(encoding);
			var encrypted = buffer.toString();
			return encrypted;
		},
		/**
		 * decryption
		 * @param data
		 * @param secretKey default config.Cipher.SecretKey
		 * @param type default binary
		 * @param encoding default base64
		 * @param algorithm default config.Cipher.Algorithm
		 * @return specified encoding type Cipher
		 */
		decryption: function (data,secretKey,iv,type,encoding,algorithm) {
			var  data_type		  = type ? type : "base64"
				, result_encoding = encoding ? encoding : "utf8"
				, alg			  = algorithm ? algorithm : config.Cipher.Algorithm
				, secret		  = secretKey  ? secretKey : config.Cipher.SecretKey
				, buffer		  = new Buffer(data);
				;
			var decipher = crypto.createDecipheriv(alg, secret, iv);
			buffer = decipher.update(buffer, data_type, result_encoding);
			buffer += decipher.final(result_encoding);
			var encrypted = buffer.toString();
			return buffer;
		},
		/**
		 * write_params
		 * @param doc
		 * @param body
		 * @param params
		 * @return doc
		 */
		write_params: function (req,doc,params){
			for(var i = 0; i < params.length; i++){
				var field = params[i].field;
				var type = params[i].type;
				var value = req.body[field];
				var trimming = params[i].trimming;
				if(type == "Session"){
					doc[field] = trimming(req);
				}else if(typeof value === "undefined"){

				}else{
					if(type == 'Hash'){
						if(doc[field] != value){
							doc[field] = this.createHash(value);
						}
					}else if(type == 'Array'){
						if(typeof trimming === "undefined"){
							doc[field] = value;
						}else{
							var modify = new Array();
							for (var vs=0; vs<value.length; vs++){
								modify.push(trimming(value[vs]));
							}
							doc[field] = modify;
						}
					}else{
						doc[field] = value;
					}
				}
			}
			return doc;
		},
		/**
		 * encryptionDoc
		 * @param doc
		 * @param body
		 * @param params
		 * @return doc
		 */
		encryptionDoc: function (doc,secret){
			var buffer,base64
				,self = this
				,decoder = new StringDecoder('utf8')
				,body = decoder.write(JSON.stringify(doc))
				,hash = self.createHash(body)
				,iv = hash.substring(0,16)
				,secretKey = self.createHMAC(hash,secret)
				,encryptedData = self.encryption(body,secretKey.substring(0,32),iv)
				;
			return {
				'hash': hash
				,'encryptedData': encryptedData
			};
		},
		json_error: function(res,err){
			console.error(err);
			var array = {
				success: false,
				error: err,
			}
			this.json(res,array);
		},
	})
}