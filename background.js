chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "executeScript") {
    chrome.tabs.executeScript(null, { file: "content.js" });
  }
});
