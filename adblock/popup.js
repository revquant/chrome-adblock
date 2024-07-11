// popup.js

// Function to update UI based on ad blocking status
function updateUI(adBlockingEnabled) {
  const toggleButton = document.getElementById('toggleButton');
  const status = document.getElementById('status');
  const adsBlockedCount = document.getElementById('adsBlockedCount'); // New line

  if (adBlockingEnabled) {
    toggleButton.textContent = 'Disable Content Blocking';
    toggleButton.classList.remove('disabled');
    toggleButton.classList.add('enabled');
    status.textContent = 'Content blocking is enabled.';
  } else {
    toggleButton.textContent = 'Enable Content Blocking';
    toggleButton.classList.remove('enabled');
    toggleButton.classList.add('disabled');
    status.textContent = 'Content blocking is disabled.';
  }

  // Update ads blocked count
  let count = localStorage.getItem('adsBlocked') || 0;
  adsBlockedCount.textContent = `Total Ads & Trackers Blocked: ${count}`;
}

// Initialize ad blocking status
let adBlockingEnabled = false;

// Function to toggle ad blocking status
function toggleAdBlocking() {
  adBlockingEnabled = !adBlockingEnabled;
  updateUI(adBlockingEnabled);
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.reload(tabs[0].id);
  });
  // Send message to background script to toggle ad blocking
  chrome.runtime.sendMessage({ action: 'toggleAdBlocking' });
}

// Event listener for button click
document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggleButton');
  toggleButton.addEventListener('click', toggleAdBlocking);

  // Fetch initial ad blocking status from background script
  chrome.runtime.sendMessage({ action: 'getAdBlockingStatus' }, function(response) {
    adBlockingEnabled = response.adBlockingEnabled;
    updateUI(adBlockingEnabled);
  });
});

