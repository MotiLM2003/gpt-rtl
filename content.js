// Hey there, let's have some fun and spice up this code with witty and funny comments!

// Define CSS styles, because who needs boring naked HTML?
chrome.runtime.sendMessage({ action: "executeScript" });
// content.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "apply_theme") {
    console.log("apply");
    applyTheme(message.theme);
  } else if (message.direction) {
    const body = document.body;
    body.style.direction = message.direction;
  }
});

window.onunload = function () {
  // Your script logic here
  console.log("Script executed on navigation");
};
// Let's wait for the content to load... patience is a virtue, you know!
document.addEventListener("DOMContentLoaded", () => {
  try {
    setTimeout(() => {
      console.log("loaded"); // Finally, we're loaded! Let's do some magic!
      init(); // Time to initiate the awesomeness!
      addButton();
      chrome.storage.sync.get("theme", function (data) {
        const theme = data.theme;

        applyTheme(theme); // Apply the theme on popup load
      });
    }, 1200);
  } catch (e) {
    console.log("error", e); // Oops, something went wrong... blame it on the gremlins!
  }
});

function init() {
  document.documentElement.setAttribute("dir", "rtl");
}
const addButton = () => {
  const button = document.createElement("button");
  button.id = "shareButton";

  // Apply CSS styles for the button
  button.style.position = "fixed";
  button.style.bottom = "20px"; // Adjust the distance from the bottom as needed
  button.style.left = "20px"; // Adjust the distance from the left as needed
  button.style.backgroundColor = "white";
  button.style.borderRadius = "50%";
  button.style.width = "48px";
  button.style.height = "48px";
  button.style.border = "none";
  button.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.1)";
  button.style.cursor = "pointer";
  button.style.display = "flex"; // Add display flex
  button.style.alignItems = "center"; // Center vertically
  button.style.justifyContent = "center"; // Center horizontally

  // Add the SVG icon for "Share"
  const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgIcon.setAttribute("width", "24");
  svgIcon.setAttribute("height", "24");
  svgIcon.setAttribute("fill", "currentColor");
  svgIcon.setAttribute("viewBox", "0 0 256 256");
  svgIcon.innerHTML =
    '<path d="M208.25,123.76a6,6,0,0,1,0,8.49l-82.06,82a54,54,0,0,1-76.36-76.39L149.1,37.14a38,38,0,1,1,53.77,53.72L103.59,191.54a22,22,0,1,1-31.15-31.09l83.28-84.67a6,6,0,0,1,8.56,8.42L81,168.91a10,10,0,1,0,14.11,14.18L194.35,82.4a26,26,0,1,0-36.74-36.8L58.33,146.28a42,42,0,1,0,59.37,59.44l82.06-82A6,6,0,0,1,208.25,123.76Z"></path>';

  button.appendChild(svgIcon);

  // Add the button to the document body

  // Add event listener for the button click (same as before)
  button.addEventListener("click", downloadActiveHTML);
};
const downloadActiveHTML = () => {
  // Get the HTML content of the current page
  const htmlContent = document.documentElement.outerHTML;

  // Get all external CSS links on the page
  const externalCssLinks = Array.from(
    document.querySelectorAll('link[rel="stylesheet"]')
  );

  // Fetch the CSS content from the links and replace them with inline style tags in the HTML
  Promise.all(
    externalCssLinks.map((link) =>
      fetch(link.href).then((response) => response.text())
    )
  )
    .then((cssContents) => {
      const modifiedHtmlContent = htmlContent.replace(
        /<link[^>]+rel="stylesheet"[^>]+>/gi,
        ""
      );
      const styleTags = cssContents
        .map((cssContent) => `<style>${cssContent}</style>`)
        .join("");
      const modifiedHtmlWithStyles = `${modifiedHtmlContent}<head>${styleTags}</head>`;

      // Create a Blob with the modified HTML content
      const blob = new Blob([modifiedHtmlWithStyles], { type: "text/html" });

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger the download
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "active_page.html"; // Set the desired filename
      anchor.style.display = "none";
      document.body.appendChild(anchor);

      // Trigger the download
      anchor.click();

      // Clean up by revoking the URL object
      URL.revokeObjectURL(url);

      // Remove the temporary anchor element from the document
      document.body.removeChild(anchor);
    })
    .catch((error) => {
      console.error("Error fetching external CSS:", error);
    });
};

function applyTheme(theme) {
  if (theme === "dark") {
    // Apply dark theme styles to the webpage
    document.body.style.backgroundColor = "#3A3C40";
  } else {
    // Remove dark theme styles from the webpage
    document.body.style.backgroundColor = ""; // Set the default background color for the light theme
  }
}
// Function to add the CSS file to the active tab
