import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import ExtPay from "extpay";
import process from "process";
const extpay = ExtPay(process.env.VITE_EXTENSIONPAY_ID);

import * as log from "loglevel";
const ll = log.getLogger("index.tsx");
const isLogsEnabled = true;
if (process.env.VITE_ENV === "development" && isLogsEnabled) {
  ll.setLevel(log.levels.DEBUG);
} else {
  ll.setLevel(log.levels.WARN);
}

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

ll.debug("background loaded.");

extpay.startBackground();
ll.debug("extpay started in background.");

extpay.onPaid.addListener((data) => {
  ll.debug("user paid.. reloading the page.", data);
  chrome.runtime.sendMessage({
    action: "reload_page",
    data: null,
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  ll.debug(
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
    data: {
      farewell: "goodbye",
    },
  });
});

ll.debug("registered event listener.");
