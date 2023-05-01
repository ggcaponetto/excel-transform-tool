import { E as ExtPay } from "../../../assets/js/ExtPay.module.js";
import { l as loglevel } from "../../../assets/js/loglevel.js";
import "../../../assets/js/_commonjsHelpers.js";
const LOCAL_RELOAD_SOCKET_PORT = 8081;
const LOCAL_RELOAD_SOCKET_URL = `ws://localhost:${LOCAL_RELOAD_SOCKET_PORT}`;
const UPDATE_PENDING_MESSAGE = "wait_update";
const UPDATE_REQUEST_MESSAGE = "do_update";
const UPDATE_COMPLETE_MESSAGE = "done_update";
class MessageInterpreter {
  constructor() {
  }
  static send(message) {
    return JSON.stringify(message);
  }
  static receive(serializedMessage) {
    return JSON.parse(serializedMessage);
  }
}
let needToUpdate = false;
function initReloadClient({ watchPath, onUpdate }) {
  const socket = new WebSocket(LOCAL_RELOAD_SOCKET_URL);
  function sendUpdateCompleteMessage() {
    socket.send(MessageInterpreter.send({ type: UPDATE_COMPLETE_MESSAGE }));
  }
  socket.addEventListener("message", (event) => {
    const message = MessageInterpreter.receive(String(event.data));
    switch (message.type) {
      case UPDATE_REQUEST_MESSAGE: {
        if (needToUpdate) {
          sendUpdateCompleteMessage();
          needToUpdate = false;
          onUpdate();
        }
        return;
      }
      case UPDATE_PENDING_MESSAGE: {
        if (!needToUpdate) {
          needToUpdate = message.path.includes(watchPath);
        }
        return;
      }
    }
  });
  socket.addEventListener("close", () => {
    console.log("Reload server disconnected.");
  });
  return socket;
}
function addHmrIntoScript(watchPath) {
  initReloadClient({
    watchPath,
    onUpdate: () => {
      chrome.runtime.reload();
    }
  });
}
const extpay = ExtPay({ "VITE_ENV": "development", "VITE_EXTENSIONPAY_ID": "myfirstextension", "VITE_SERVER_BASE_URL": "http://localhost:4000" }.VITE_EXTENSIONPAY_ID);
const ll = loglevel.exports.getLogger("index.tsx");
{
  ll.setLevel(loglevel.exports.levels.DEBUG);
}
addHmrIntoScript("pages/background");
addHmrIntoScript("pages/content/style.scss");
ll.debug("background loaded.");
extpay.startBackground();
ll.debug("extpay started in background.");
extpay.onPaid.addListener((data) => {
  ll.debug("user paid.. reloading the page.", data);
  chrome.runtime.sendMessage({
    action: "reload_page",
    data: null
  });
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  ll.debug(
    sender.tab ? "background/index.js got message from a content script: " + sender.tab.url : "background/index.js got message from the extension",
    {
      request,
      sender,
      sendResponse
    }
  );
  sendResponse({
    type: "processed_by_background",
    data: {
      farewell: "goodbye"
    }
  });
});
ll.debug("registered event listener.");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wYWdlcy9iYWNrZ3JvdW5kL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZWxvYWRPblVwZGF0ZSBmcm9tIFwidmlydHVhbDpyZWxvYWQtb24tdXBkYXRlLWluLWJhY2tncm91bmQtc2NyaXB0XCI7XHJcbmltcG9ydCBFeHRQYXkgZnJvbSBcImV4dHBheVwiO1xyXG5pbXBvcnQgcHJvY2VzcyBmcm9tIFwicHJvY2Vzc1wiO1xyXG5jb25zdCBleHRwYXkgPSBFeHRQYXkocHJvY2Vzcy5lbnYuVklURV9FWFRFTlNJT05QQVlfSUQpO1xyXG5cclxuaW1wb3J0ICogYXMgbG9nIGZyb20gXCJsb2dsZXZlbFwiO1xyXG5jb25zdCBsbCA9IGxvZy5nZXRMb2dnZXIoXCJpbmRleC50c3hcIik7XHJcbmNvbnN0IGlzTG9nc0VuYWJsZWQgPSB0cnVlO1xyXG5pZiAocHJvY2Vzcy5lbnYuVklURV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIiAmJiBpc0xvZ3NFbmFibGVkKSB7XHJcbiAgbGwuc2V0TGV2ZWwobG9nLmxldmVscy5ERUJVRyk7XHJcbn0gZWxzZSB7XHJcbiAgbGwuc2V0TGV2ZWwobG9nLmxldmVscy5XQVJOKTtcclxufVxyXG5cclxucmVsb2FkT25VcGRhdGUoXCJwYWdlcy9iYWNrZ3JvdW5kXCIpO1xyXG5cclxuLyoqXHJcbiAqIEV4dGVuc2lvbiByZWxvYWRpbmcgaXMgbmVjZXNzYXJ5IGJlY2F1c2UgdGhlIGJyb3dzZXIgYXV0b21hdGljYWxseSBjYWNoZXMgdGhlIGNzcy5cclxuICogSWYgeW91IGRvIG5vdCB1c2UgdGhlIGNzcyBvZiB0aGUgY29udGVudCBzY3JpcHQsIHBsZWFzZSBkZWxldGUgaXQuXHJcbiAqL1xyXG5yZWxvYWRPblVwZGF0ZShcInBhZ2VzL2NvbnRlbnQvc3R5bGUuc2Nzc1wiKTtcclxuXHJcbmxsLmRlYnVnKFwiYmFja2dyb3VuZCBsb2FkZWQuXCIpO1xyXG5cclxuZXh0cGF5LnN0YXJ0QmFja2dyb3VuZCgpO1xyXG5sbC5kZWJ1ZyhcImV4dHBheSBzdGFydGVkIGluIGJhY2tncm91bmQuXCIpO1xyXG5cclxuZXh0cGF5Lm9uUGFpZC5hZGRMaXN0ZW5lcigoZGF0YSkgPT4ge1xyXG4gIGxsLmRlYnVnKFwidXNlciBwYWlkLi4gcmVsb2FkaW5nIHRoZSBwYWdlLlwiLCBkYXRhKTtcclxuICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XHJcbiAgICBhY3Rpb246IFwicmVsb2FkX3BhZ2VcIixcclxuICAgIGRhdGE6IG51bGwsXHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xyXG4gIGxsLmRlYnVnKFxyXG4gICAgc2VuZGVyLnRhYlxyXG4gICAgICA/IFwiYmFja2dyb3VuZC9pbmRleC5qcyBnb3QgbWVzc2FnZSBmcm9tIGEgY29udGVudCBzY3JpcHQ6IFwiICtcclxuICAgICAgICAgIHNlbmRlci50YWIudXJsXHJcbiAgICAgIDogXCJiYWNrZ3JvdW5kL2luZGV4LmpzIGdvdCBtZXNzYWdlIGZyb20gdGhlIGV4dGVuc2lvblwiLFxyXG4gICAge1xyXG4gICAgICByZXF1ZXN0LFxyXG4gICAgICBzZW5kZXIsXHJcbiAgICAgIHNlbmRSZXNwb25zZSxcclxuICAgIH1cclxuICApO1xyXG4gIHNlbmRSZXNwb25zZSh7XHJcbiAgICB0eXBlOiBcInByb2Nlc3NlZF9ieV9iYWNrZ3JvdW5kXCIsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIGZhcmV3ZWxsOiBcImdvb2RieWVcIixcclxuICAgIH0sXHJcbiAgfSk7XHJcbn0pO1xyXG5cclxubGwuZGVidWcoXCJyZWdpc3RlcmVkIGV2ZW50IGxpc3RlbmVyLlwiKTtcclxuIl0sIm5hbWVzIjpbImxvZy5nZXRMb2dnZXIiLCJsb2cubGV2ZWxzIiwicmVsb2FkT25VcGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsTUFBTSxTQUFTLE9BQU8sRUFBQSxZQUFBLGVBQUEsd0JBQUEsb0JBQUEsd0JBQUEsd0JBQUEsRUFBWSxvQkFBb0I7QUFHdEQsTUFBTSxLQUFLQSxTQUFBQSxRQUFBQSxVQUFjLFdBQVc7QUFFeUI7QUFDeEQsS0FBQSxTQUFTQyx3QkFBVyxLQUFLO0FBQzlCO0FBSUFDLGlCQUFlLGtCQUFrQjtBQU1qQ0EsaUJBQWUsMEJBQTBCO0FBRXpDLEdBQUcsTUFBTSxvQkFBb0I7QUFFN0IsT0FBTyxnQkFBZ0I7QUFDdkIsR0FBRyxNQUFNLCtCQUErQjtBQUV4QyxPQUFPLE9BQU8sWUFBWSxDQUFDLFNBQVM7QUFDL0IsS0FBQSxNQUFNLG1DQUFtQyxJQUFJO0FBQ2hELFNBQU8sUUFBUSxZQUFZO0FBQUEsSUFDekIsUUFBUTtBQUFBLElBQ1IsTUFBTTtBQUFBLEVBQUEsQ0FDUDtBQUNILENBQUM7QUFFRCxPQUFPLFFBQVEsVUFBVSxZQUFZLFNBQVUsU0FBUyxRQUFRLGNBQWM7QUFDekUsS0FBQTtBQUFBLElBQ0QsT0FBTyxNQUNILDREQUNFLE9BQU8sSUFBSSxNQUNiO0FBQUEsSUFDSjtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUFBO0FBRVcsZUFBQTtBQUFBLElBQ1gsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLE1BQ0osVUFBVTtBQUFBLElBQ1o7QUFBQSxFQUFBLENBQ0Q7QUFDSCxDQUFDO0FBRUQsR0FBRyxNQUFNLDRCQUE0QjsifQ==
