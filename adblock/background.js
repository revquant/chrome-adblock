// background.js

// Initialize ad blocking
let adBlockingEnabled = false;
let adsBlockedCount = 0; // New line

// Listener to toggle ad blocking and cookie notice blocking
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    // Check if ad blocking or cookie notice blocking should be applied
    if (adBlockingEnabled) {
      adsBlockedCount++;
      localStorage.setItem('adsBlocked', adsBlockedCount);
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
        "*://*.outbrain.com/*",
        "*://*.adcolony.com/*",
        "*://*.media.net/*",
        "*://*.googleanalytics.com/*",
        "*://*.mouseflow.com/*",
        "*://*.freshmarketer.com/*",
        "*://*.luckyorange.com/*",
        "*://pixel.facebook.com/*",
        "*://an.facebook.com/*",
        "*://analytics.pointdrive.linkedin.com/*",
        "*://ads.pinterest.com/*",
        "*://analytics.pinterest.com/*",
        "*://ads.tiktok.com/*",
        "*://analytics.tiktok.com/*",
        "*://ads-api.tiktok.com/*",
        "*://events.reddit.com/*",
        "*://events.redditmedia.com/*",
        "*://ads.yahoo.com/*",
        "*://analytics.yahoo.com/*",
        "*://samsungads.com/*",
        "*://adtago.s3.amazonaws.com/*",
        "*://analyticsengine.s3.amazonaws.com/*",
        "*://analytics.s3.amazonaws.com/*",
        "*://advice-ads.s3.amazonaws.com/*",
        "*://*.luckyorange.net/*",
        "*://stats.wp.com/*",
        "*://notify.bugsnag.com/*",
        "*://sessions.bugsnag.com/*",
        "*://api.bugsnag.com/*",
        "*://app.bugsnag.com/*",
        "*://browser.sentry-cdn.com/*",
        "*://app.getsentry.com/*",
        "*://extmaps-api.yandex.net/*",
        "*://appmetrica.yandex.ru/*",
        "*://adfstat.yandex.ru/*",
        "*://metrika.yandex.ru/*",
        "*://offerwall.yandex.net/*",
        "*://adfox.yandex.ru/*",
        "*://auction.unityads.unity3d.com/*",
        "*://webview.unityads.unity3d.com/*",
        "*://config.unityads.unity3d.com/*",
        "*://adserver.unityads.unity3d.com/*",
        "*://iot-eu-logser.realme.com/*",
        "*://iot-logser.realme.com/*",
        "*://bdapi-ads.realmemobile.com/*",
        "*://bdapi-in-ads.realmemobile.com/*",
        "*://api.ad.xiaomi.com/*",
        "*://data.mistat.xiaomi.com/*",
        "*://data.mistat.india.xiaomi.com/*",
        "*://data.mistat.rus.xiaomi.com/*",
        "*://sdkconfig.ad.xiaomi.com/*",
        "*://sdkconfig.ad.intl.xiaomi.com/*",
        "*://tracking.rus.miui.com/*",
        "*://adsfs.oppomobile.com/*",
        "*://adx.ads.oppomobile.com/*",
        "*://ck.ads.oppomobile.com/*",
        "*://data.ads.oppomobile.com/*",
        "*://metrics.data.hicloud.com/*",
        "*://metrics2.data.hicloud.com/*",
        "*://grs.hicloud.com/*",
        "*://logservice.hicloud.com/*",
        "*://logservice1.hicloud.com/*",
        "*://logbak.hicloud.com/*",
        "*://click.oneplus.cn/*",
        "*://open.oneplus.net/*",
        "*://samsungads.com/*",
        "*://smetrics.samsung.com/*",
        "*://nmetrics.samsung.com/*",
        "*://samsung-com.112.2o7.net/*",
        "*://analytics-api.samsunghealthcn.com/*",
        "*://iadsdk.apple.com/*",
        "*://metrics.icloud.com/*",
        "*://metrics.mzstatic.com/*",
        "*://api-adservices.apple.com/*",
        "*://books-analytics-events.apple.com/*",
        "*://weather-analytics-events.apple.com/*",
        "*://notes-analytics-events.apple.com/*",
        "*://ads-api.twitter.com/*",
        "*://log.pinterest.com/*",
        "*://trk.pinterest.com/*",
        "*://ads-sg.tiktok.com/*",
        "*://analytics-sg.tiktok.com/*",
        "*://business-api.tiktok.com/*",
        "*://ads.tiktok.com/*",
        "*://log.byteoversea.com/*",
        "*://geo.yahoo.com/*",
        "*://udc.yahoo.com/*",
        "*://udcm.yahoo.com/*",
        "*://analytics.query.yahoo.com/*",
        "*://partnerads.ysm.yahoo.com/*",
        "*://log.fc.yahoo.com/*",
        "*://gemini.yahoo.com/*",
        "*://adtech.yahooinc.com/*",
        "*://ads.facebook.com/*",
        "*://advertising.twitter.com/*",
        "*://ads-dev.pinterest.com/*",
        "*://d.reddit.com/*",
        "*://affiliationjs.s3.amazonaws.com/*",
        "*://advertising-api-eu.amazon.com/*",
        "*://securemetrics.apple.com/*",
        "*://supportmetrics.apple.com/*",
        "*://config.samsungads.com/*"
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
