import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import ExtPay from "extpay";
import process from "process";
const extpay = ExtPay(process.env.VITE_EXTENSIONPAY_ID);

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

console.log("background loaded.");

extpay.startBackground();
console.log("extpay started in background.");

extpay.onPaid.addListener((data) => {
  console.log("user paid.. reloading the page.", data);
  chrome.runtime.sendMessage({
    action: "reload_page",
    data: null,
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "background/index.js got message from a content script: " +
          sender.tab.url
      : "background/index.js got message from the extension",
    {
      request,
      sender,
      sendResponse,
    }
  );
  sendResponse({
    type: "processed_by_background",
    data: { farewell: "goodbye" },
  });
});

console.log("registered event listener.");
