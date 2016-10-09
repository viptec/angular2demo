(function(global) {
 
   // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    '@angular':                   'lib/@angular',
    'angular2-in-memory-web-api': 'lib/angular2-in-memory-web-api',
    'rxjs':                       'lib/rxjs'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'forms',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'upgrade',
  ];
  // Add package entries for angular packages
  ngPackageNames.forEach(function(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  });
  var config = {
    map: map,
    packages: packages
  }
  System.config(config);
 
})(this);
 
/*
// Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/router-deprecated',
 
  // Thirdparty barrels.
  'rxjs',
  'jquery',
  'bootstrap',
  // App specific barrels.
  'app',
  'app/shared',
 
  */