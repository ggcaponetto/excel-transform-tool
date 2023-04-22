console.log("loaded PageBride.js for DOM manipulations");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "PageBride.js got message from a content script: " + sender.tab.url
      : "PageBride.js got message from the extension",
    {
      request,
      sender,
      sendResponse,
    }
  );
  if (request.greeting === "hello")
    sendResponse({
      type: "processed_by_page_bridge",
      data: request,
    });
});
export default {};
