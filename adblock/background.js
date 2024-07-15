let adBlockingEnabled = false;
let adsBlockedCount = 0;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ adBlockingEnabled, adsBlockedCount });
  updateRules();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getAdBlockingStatus") {
    chrome.storage.local.get(["adBlockingEnabled", "adsBlockedCount"], (data) => {
      sendResponse({ 
        adBlockingEnabled: data.adBlockingEnabled,
        adsBlockedCount: data.adsBlockedCount 
      });
    });
    return true;
  } else if (request.action === "toggleAdBlocking") {
    chrome.storage.local.get("adBlockingEnabled", (data) => {
      adBlockingEnabled = !data.adBlockingEnabled;
      chrome.storage.local.set({ adBlockingEnabled }, () => {
        updateRules();
        sendResponse({ adBlockingEnabled });
      });
    });
    return true;
  }
});

function updateRules() {
  chrome.storage.local.get("adBlockingEnabled", (data) => {
    if (data.adBlockingEnabled) {
      chrome.declarativeNetRequest.updateEnabledRulesets({
        enableRulesetIds: ["ruleset_1"],
        disableRulesetIds: [],
      });
    } else {
      chrome.declarativeNetRequest.updateEnabledRulesets({
        enableRulesetIds: [],
        disableRulesetIds: ["ruleset_1"],
      });
    }
  });
}

// Listen for blocked requests and update the count
chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(() => {
  chrome.storage.local.get("adsBlockedCount", (data) => {
    adsBlockedCount = data.adsBlockedCount + 1;
    chrome.storage.local.set({ adsBlockedCount });
  });
});
