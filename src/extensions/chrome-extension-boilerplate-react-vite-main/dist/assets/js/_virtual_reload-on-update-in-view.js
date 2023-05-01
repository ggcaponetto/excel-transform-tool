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
function addHmrIntoView(watchPath) {
  let pendingReload = false;
  initReloadClient({
    watchPath,
    onUpdate: () => {
      if (document.hidden) {
        pendingReload = true;
        return;
      }
      reload();
    }
  });
  function reload() {
    pendingReload = false;
    window.location.reload();
  }
  function reloadWhenTabIsVisible() {
    !document.hidden && pendingReload && reload();
  }
  document.addEventListener("visibilitychange", reloadWhenTabIsVisible);
}
export {
  addHmrIntoView as a
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX3ZpcnR1YWxfcmVsb2FkLW9uLXVwZGF0ZS1pbi12aWV3LmpzIiwic291cmNlcyI6W10sInNvdXJjZXNDb250ZW50IjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
