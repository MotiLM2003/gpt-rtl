// popup.js
window.onload = function () {
  const checkbox = document.getElementById("myCheckbox");

  checkbox.addEventListener("change", (event) => {
    const isChecked = event.currentTarget.checked;
    const direction = isChecked ? "rtl" : "ltr";

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { direction });
    });
  });

  const themeToggle = document.getElementById("themeToggle");
};
