document.getElementById('hideButton').addEventListener('click', async () => {
  const selector = document.getElementById('selectorInput').value;
  
  if (!selector) {
    alert('Please enter a CSS selector');
    return;
  }

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
