// background.js

// Initialize ad blocking
let adBlockingEnabled = false;

// Listener to toggle ad blocking and cookie notice blocking
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    // Check if ad blocking or cookie notice blocking should be applied
    if (adBlockingEnabled) {
      return { cancel: true };
    } else {
      return { cancel: false };
    }
  },
  {
    urls: [
        "*://*.doubleclick.net/*",               // Google ad network
        "*://*.googleadservices.com/*",          // Google ad network
        "*://*.zedo.com/*",                      // Zedo ad network
        "*://*.adservice.google.com/*",          // Google ad network
        "*://*.googlesyndication.com/*",         // Google ad network
        "*://*.analytics.google.com/*",          // Google Analytics
        "*://*.google-analytics.com/*",          // Google Analytics
        "*://*.hotjar.com/*",                    // Hotjar tracking
        "*://*.ads.youtube.com/*",               // Google ad network
        "*://*.ad.youtube.com/*",                // Google ad network
        "*://*/*cookie_notice*",                 // Common cookie notice URLs
        "*://*/*cookie-policy*",                 // Common cookie policy URLs
        "*://*.amazon-adsystem.com/*",           // Amazon ad network
        "*://*.aaxads.com/*",                    // Amazon ad network
        "*://*.mads.amazon-adsystem.com/*",      // Amazon ad network
        "*://*.ads-twitter.com/*",               // Twitter ad network
        "*://*.ads-api.reddit.com/*",            // Reddit ad network
        "*://*.ads.linkedin.com/*",              // LinkedIn ad network
        "*://*.ads.reddit.com/*",                // Reddit ad network
        "*://*.connect.facebook.net/*",          // Facebook tracking
        "*://*.adtechus.com/*",                  // Common ad network
        "*://*.bidswitch.net/*",                 // Common ad network
        "*://*.pubmatic.com/*",                  // Common ad network
        "*://*.rubiconproject.com/*",            // Common ad network
        "*://*.openx.net/*",                     // Common ad network
        "*://*.adnxs.com/*",                     // Common ad network
        "*://*.taboola.com/*",                   // Common ad network
        "*://*.criteo.com/*",                    // Criteo ad network
        "*://*.quantserve.com/*",                // Quantcast ad network
        "*://*.scorecardresearch.com/*",         // Scorecard Research tracking
        "*://*.mathtag.com/*",                   // MediaMath ad network
        "*://*.rlcdn.com/*",                     // Rocket Fuel ad network
        "*://*.ib.adnxs.com/*",                  // AppNexus ad network
        "*://*.contextweb.com/*",                // PulsePoint ad network
        "*://*.advertising.com/*",               // AOL ad network
        "*://*.yldbt.com/*",                     // Yieldbot ad network
        "*://*.tracking.klick2contact.com/*",    // Klick2Contact tracking
        "*://*.tealium.com/*",                   // Tealium tracking
        "*://*.webtrends.com/*",                 // Webtrends tracking
        "*://*.krxd.net/*",                      // Krux Digital tracking
        "*://*.bizographics.com/*",              // LinkedIn tracking
        "*://*.bizographicscdn.com/*",
        "*://*.outbrain.com/*"
    ]
  },
  ["blocking"]
);

// Message listener from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getAdBlockingStatus") {
    sendResponse({ adBlockingEnabled });
  } else if (request.action === "toggleAdBlocking") {
    adBlockingEnabled = !adBlockingEnabled;
    sendResponse({ adBlockingEnabled });
  }
});
