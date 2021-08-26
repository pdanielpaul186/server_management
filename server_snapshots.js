var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoDb = require('./mongoDb');
var multichain = require('./multichainConn');

//watcher excel files to get list of packages 
var watcherAndroidLinux = require('./watcher/packages/android');
var watcherArchLinux = require('./watcher/packages/archLinux');
var watcherCentOS = require('./watcher/packages/centos');
var watcherhpLinux = require('./watcher/packages/hpLinux');
var watcheropenBSDLinux = require('./watcher/packages/openBSD');
var watcherRedhatLinux = require('./watcher/packages/redHatLinux');
var watcherSuseLinux = require('./watcher/packages/suseLinux');
var watcherSolarisLinux = require('./watcher/packages/solaris');
var watcherUbuntu = require('./watcher/packages/ubuntu');
var watcherWindows = require('./watcher/packages/windows');
var watcherWindows2 = require('./watcher/packages/windows2');

//watcher text files to get ipaddresses
var ipUbuntuWatcher = require('./watcher/ip/ubuntu');

//Routers
var loginRouter = require('./routes/login');
var osRouter = require('./routes/OS');
var policyRouter = require('./routes/createPolicy');
var eventDashboardRouter = require('./routes/eventDashboard');
var ipAddressListRouter = require('./routes/ipAddressList');
var ipAddressPackagesRouter = require('./routes/listOfPackages');
var packagesRouter = require('./routes/packages');

var ubuntuPackagesView = require('./routes/OS/ubuntu');
var archlinuxPackagesView = require('./routes/OS/ArchLinux');
var centOSPackagesView = require('./routes/OS/CentOS');
var hpLinuxPackagesView = require('./routes/OS/hpLinux');
var windowsPackagesView = require('./routes/OS/Windows');
var susePackagesView = require('./routes/OS/SusLinux');
var redHatPackagesView = require('./routes/OS/redHatLinux');
var androidPackagesView = require('./routes/OS/Android');
var openBSDPackagesView = require('./routes/OS/openBSD');
var solarisPackagesView = require('./routes/OS/Solaris');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Methods","*");
  res.header("Access-Control-Allow-Headers", "*");
   next(); 
  });
//endpoints
app.use('/login',loginRouter);
app.use('/OS', osRouter);
app.use('/policy',policyRouter);
app.use('/dashboard',eventDashboardRouter);
app.use('/ipAddressList',ipAddressListRouter);
app.use('/ipAddressPackages',ipAddressPackagesRouter);
app.use('/packageDetails',packagesRouter);

app.use('/ubuntuView',ubuntuPackagesView);
app.use('/archLinuxView',archlinuxPackagesView);
app.use('/centOsView',centOSPackagesView);
app.use('/hpLinuxView',hpLinuxPackagesView);
app.use('/windowsView',windowsPackagesView);
app.use('/suseView',susePackagesView);
app.use('/redhatView',redHatPackagesView);
app.use('/androidView',androidPackagesView);
app.use('/openBSDView',openBSDPackagesView);
app.use('/solarisView',solarisPackagesView);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.listen('3500',(err)=>{
//   if(err){
//     console.log("APP NOT LISTENNING");
//     console.log(err)
//   }
//   else{
//     console.log("APP LISTENINNG AT PORT 3500");
//   }
// })

module.exports = app;
