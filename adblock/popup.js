document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleButton");
  const status = document.getElementById("status");
  const adsBlockedCount = document.getElementById("adsBlockedCount");

  function updateUI(adBlockingEnabled, count) {
    if (adBlockingEnabled) {
      toggleButton.textContent = "Disable Content Blocking";
      toggleButton.classList.remove("disabled");
      toggleButton.classList.add("enabled");
      status.textContent = "Content blocking is ";
      status.innerHTML += '<span class="enabled-text">enabled</span>.';
    } else {
      toggleButton.textContent = "Enable Content Blocking";
      toggleButton.classList.remove("enabled");
      toggleButton.classList.add("disabled");
      status.textContent = "Content blocking is ";
      status.innerHTML += '<span class="disabled-text">disabled</span>.';
    }

    // Update ads blocked count
    adsBlockedCount.textContent = `Total Ads & Trackers Blocked: ${count}`;
  }

  chrome.runtime.sendMessage(
    { action: "getAdBlockingStatus" },
    function (response) {
      updateUI(response.adBlockingEnabled, response.adsBlockedCount);
    },
  );

  toggleButton.addEventListener("click", function () {
    chrome.runtime.sendMessage(
      { action: "toggleAdBlocking" },
      function (response) {
        chrome.storage.local.get("adsBlockedCount", (data) => {
          updateUI(response.adBlockingEnabled, data.adsBlockedCount);
        });
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.reload(tabs[0].id);
          },
        );
      },
    );
  });
});
