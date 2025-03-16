// Function to get the current domain from active tab
async function getCurrentDomain() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url);
  return url.hostname;
}

// Function to save the selector for the current domain
async function saveSelector(selector) {
  const domain = await getCurrentDomain();
  
  // Get existing saved selectors
  const result = await chrome.storage.local.get('domainSelectors');
  const domainSelectors = result.domainSelectors || {};
  
  // Update selector for current domain
  domainSelectors[domain] = selector;
  
  // Save back to storage
  await chrome.storage.local.set({ domainSelectors });
}

// Function to load the selector for the current domain
async function loadSelector() {
  const domain = await getCurrentDomain();
  
  // Get saved selectors
  const result = await chrome.storage.local.get('domainSelectors');
  const domainSelectors = result.domainSelectors || {};
  
  // Get selector for current domain or empty string if not found
  const selector = domainSelectors[domain] || '';
  
  // Set the input value
  document.getElementById('selectorInput').value = selector;
}

// Load saved selector when popup opens
document.addEventListener('DOMContentLoaded', loadSelector);

document.getElementById('hideButton').addEventListener('click', async () => {
  const selector = document.getElementById('selectorInput').value;
  
  if (!selector) {
    alert('Please enter a CSS selector');
    return;
  }

  // Save the selector for this domain
  await saveSelector(selector);

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: hideElements,
    args: [selector]
  });
});

function hideElements(selector) {
  const selectors = selector.split(',').map(s => s.trim());
  selectors.forEach(sel => {
    const elements = document.querySelectorAll(sel);
    elements.forEach(element => {
      element.style.display = 'none';
    });
  });
  return `Hidden elements`;
}
