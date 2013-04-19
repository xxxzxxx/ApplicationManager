/**
 * server.js
 * 
 * @license Dual licensed under the MIT or GPL Version 2 licenses.
 * @author xxxzxxx
 * Copyright 2013, Primitive, inc.
 * The MIT Licens (http://opensource.org/licenses/mit-license.php)
 * GPL Version 2 licenses (http://www.gnu.org/licenses/gpl-2.0.html)
 */
var matador = require('matador')
	, env = process.env.NODE_ENV || 'development'
	, argv = matador.argv
	, config = require('./app/config/' + env)
	, app = matador.createApp(__dirname, config, {})
	, port = argv.port || process.env.PORT || 3000
	, mongoStore = require('connect-mongodb')
	;

// Register the matador cache helper.
app.registerHelper('Cache', matador.helpers.CacheHelper)

app.configure(function () {
	app.set('view engine', 'html')
	app.set('mode',env)
	app.register('.html', matador.engine)

	app.use(app.getHelper('Cache').auditHeadersMiddleware)
	app.use(app.getHelper('Cache').noCacheMiddleware)

	app.use(matador.cookieParser())
	app.use(
		matador.session(
			{
				secret: config.secret,
				store: new mongoStore(
					{db: config.sessionDatabase}
				)
			}
		)
	);
	app.use(app.requestDecorator())
	app.use(app.preRouter())
	app.use(matador.bodyParser())
})

app.configure('development', function () {
	app.use(matador.errorHandler({ dumpExceptions: true, showStack: true }))
})

app.configure('production', function () {
	app.use(matador.errorHandler())
})

app.configure(function () {
	app.use(app.router({}))
})

app.prefetch()
app.mount()
app.listen(port)
console.log('matador running on port ' + port)
