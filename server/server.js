'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var Logger = require('./helpers/logger');

var app = module.exports = loopback();

var path = require('path');

//List here the paths you do not want to be redirected to the angular application (scripts, stylesheets, templates, loopback REST API, ...)
var ignoredPaths = ['/assets', '/styles', '/maps','/scripts','/app','/explorer','/status','/api','/explorer'];

app.all('/*', function(req, res, next) {
  //Redirecting to index only the requests that do not start with ignored paths
  if(!startsWith(req.url, ignoredPaths))
    res.sendFile('index.html', { root: path.resolve(__dirname, '..', 'client') });
  else
    next();
});

function startsWith(string, array) {
  for(var i = 0; i < array.length; i++)
    if(string.startsWith(array[i]))
      return true;
  return false;
}

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    Logger.debug('Web server listening at:'+baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      Logger.debug('REST API at '+baseUrl+ explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
