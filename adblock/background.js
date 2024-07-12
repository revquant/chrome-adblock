let adBlockingEnabled = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ adBlockingEnabled });
  updateRules();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getAdBlockingStatus") {
    chrome.storage.local.get("adBlockingEnabled", (data) => {
      sendResponse({ adBlockingEnabled: data.adBlockingEnabled });
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
