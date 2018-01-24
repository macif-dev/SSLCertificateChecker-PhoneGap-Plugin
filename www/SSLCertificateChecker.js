"use strict";
var exec = require('cordova/exec');

function SSLCertificateChecker() {
}

SSLCertificateChecker.prototype.check = function (successCallback, errorCallback, serverURL, allowedSHA1FingerprintOrArray, allowedSHA1FingerprintAlt, headerHttpArgs, timeout) {
  if (typeof errorCallback != "function") {
    console.log("SSLCertificateChecker.find failure: errorCallback parameter must be a function");
    return
  }

  if (typeof successCallback != "function") {
    console.log("SSLCertificateChecker.find failure: successCallback parameter must be a function");
    return
  }

  // if an array is not passed, transform the input into one
  var fpArr = [];

  // if a json is not passed, transform the input into one
  var headerArr = {};

  if (allowedSHA1FingerprintOrArray !== undefined) {
      if (typeof allowedSHA1FingerprintOrArray == "string") {
          fpArr.push(allowedSHA1FingerprintOrArray);
      } else {
          fpArr = allowedSHA1FingerprintOrArray.slice(0);
      }
  }

  if (allowedSHA1FingerprintAlt !== undefined) {
      fpArr.push(allowedSHA1FingerprintAlt);
  }

  if(headerHttpArgs !== undefined){
      if (typeof headerHttpArgs == "string") {
          headerArr = JSON.stringify(headerHttpArgs);
      }else{
          headerArr = headerHttpArgs;
      }
  }

  if(timeout == null){
    timeout = 60;
  }

  exec(successCallback, errorCallback, "SSLCertificateChecker", "check", [serverURL, false, fpArr, headerArr, timeout]);
};

SSLCertificateChecker.prototype.checkInCertChain = function (successCallback, errorCallback, serverURL, allowedSHA1FingerprintOrArray, allowedSHA1FingerprintAlt) {
  if (typeof errorCallback != "function") {
    console.log("SSLCertificateChecker.find failure: errorCallback parameter must be a function");
    return
  }
  errorCallback("This function has been removed in versions higher than 4.0.0 because it's considered too insecure.");
};

var sslCertificateChecker = new SSLCertificateChecker();
module.exports = sslCertificateChecker;
