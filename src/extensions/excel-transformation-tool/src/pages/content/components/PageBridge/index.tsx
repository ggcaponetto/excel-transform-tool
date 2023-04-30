console.log("loaded PageBridge.js for DOM manipulations");

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
  const evalResult = eval("function run(){return 99} run()");
  if (request.greeting === "hello")
    sendResponse({
      type: "processed_by_page_bridge",
      data: request,
      evalResult,
    });
});
export default {};
