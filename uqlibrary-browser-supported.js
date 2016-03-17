(function (name, def) {
  this[name] = def();
})('browserSupported', function () {
  "use strict";

  var supportedBrowserVersions = {
    chrome: 48,
    firefox: 15,
    opera: 15,
    safari: 7,
    ie: 11,
    edge: 13
  };

  return function () {
    var browser;
    var version;
    var userAgent = navigator.userAgent.toLowerCase();

    // First check for EDGE. It supplies both "edge", "safari" and "chrome" as user agents
    var browserParts = /(edge)(?:.*version)?(?:[ \/])?([\w.]+)/.exec(userAgent);
    if (!browserParts || browserParts.length <= 2) {
      browserParts = /(ie|firefox|chrome|safari|opera)(?:.*version)?(?:[ \/])?([\w.]+)/.exec(userAgent);
    }

    // Parse browser parts
    if (browserParts && browserParts.length > 2) {
      browser = browserParts[1];
      version = browserParts[2];
    } else if (!! userAgent.match(/trident\/7\./)) {
      browser = 'ie';
      version = 11;
    }

    return (supportedBrowserVersions[browser] <= parseInt(version));
  }
});