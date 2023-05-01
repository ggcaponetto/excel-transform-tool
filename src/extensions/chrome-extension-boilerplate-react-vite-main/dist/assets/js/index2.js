console.log("loaded PageBridge.js for DOM manipulations");
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(sender.tab ? "PageBride.js got message from a content script: " + sender.tab.url : "PageBride.js got message from the extension", {
    request,
    sender,
    sendResponse
  });
  const evalResult = eval("function run(){return 99} run()");
  if (request.greeting === "hello")
    sendResponse({
      type: "processed_by_page_bridge",
      data: request,
      evalResult
    });
});
const index = {};
export {
  index as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvY29udGVudC9jb21wb25lbnRzL1BhZ2VCcmlkZ2UvaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnNvbGUubG9nKFwibG9hZGVkIFBhZ2VCcmlkZ2UuanMgZm9yIERPTSBtYW5pcHVsYXRpb25zXCIpO1xyXG5cclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xyXG4gIGNvbnNvbGUubG9nKFxyXG4gICAgc2VuZGVyLnRhYlxyXG4gICAgICA/IFwiUGFnZUJyaWRlLmpzIGdvdCBtZXNzYWdlIGZyb20gYSBjb250ZW50IHNjcmlwdDogXCIgKyBzZW5kZXIudGFiLnVybFxyXG4gICAgICA6IFwiUGFnZUJyaWRlLmpzIGdvdCBtZXNzYWdlIGZyb20gdGhlIGV4dGVuc2lvblwiLFxyXG4gICAge1xyXG4gICAgICByZXF1ZXN0LFxyXG4gICAgICBzZW5kZXIsXHJcbiAgICAgIHNlbmRSZXNwb25zZSxcclxuICAgIH1cclxuICApO1xyXG4gIGNvbnN0IGV2YWxSZXN1bHQgPSBldmFsKFwiZnVuY3Rpb24gcnVuKCl7cmV0dXJuIDk5fSBydW4oKVwiKTtcclxuICBpZiAocmVxdWVzdC5ncmVldGluZyA9PT0gXCJoZWxsb1wiKVxyXG4gICAgc2VuZFJlc3BvbnNlKHtcclxuICAgICAgdHlwZTogXCJwcm9jZXNzZWRfYnlfcGFnZV9icmlkZ2VcIixcclxuICAgICAgZGF0YTogcmVxdWVzdCxcclxuICAgICAgZXZhbFJlc3VsdCxcclxuICAgIH0pO1xyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQge307XHJcbiJdLCJuYW1lcyI6WyJjb25zb2xlIiwibG9nIiwiY2hyb21lIiwicnVudGltZSIsIm9uTWVzc2FnZSIsImFkZExpc3RlbmVyIiwicmVxdWVzdCIsInNlbmRlciIsInNlbmRSZXNwb25zZSIsInRhYiIsInVybCIsImV2YWxSZXN1bHQiLCJldmFsIiwiZ3JlZXRpbmciLCJ0eXBlIiwiZGF0YSJdLCJtYXBwaW5ncyI6IkFBQUFBLFFBQVFDLElBQUksNENBQTRDO0FBRXhEQyxPQUFPQyxRQUFRQyxVQUFVQyxZQUFZLFNBQVVDLFNBQVNDLFFBQVFDLGNBQWM7QUFDNUVSLFVBQVFDLElBQ05NLE9BQU9FLE1BQ0gscURBQXFERixPQUFPRSxJQUFJQyxNQUNoRSwrQ0FDSjtBQUFBLElBQ0VKO0FBQUFBLElBQ0FDO0FBQUFBLElBQ0FDO0FBQUFBLEVBQUFBLENBQ0Q7QUFFR0csUUFBQUEsYUFBYUMsS0FBSyxpQ0FBaUM7QUFDekQsTUFBSU4sUUFBUU8sYUFBYTtBQUNWLGlCQUFBO0FBQUEsTUFDWEMsTUFBTTtBQUFBLE1BQ05DLE1BQU1UO0FBQUFBLE1BQ05LO0FBQUFBLElBQUFBLENBQ0Q7QUFDTCxDQUFDO0FBQ0QsTUFBQSxRQUFlLENBQUM7In0=