import refreshOnUpdate from "virtual:reload-on-update-in-view";

import * as log from "loglevel";
const ll = log.getLogger("index.tsx");
import process from "process";

const isLogsEnabled = false;
if (process.env.VITE_ENV === "development" && isLogsEnabled) {
  ll.setLevel(log.levels.DEBUG);
} else {
  ll.setLevel(log.levels.WARN);
}

refreshOnUpdate("pages/sandbox");

window.onload = () => {
  console.log("loaded sandbox...");
};
window.addEventListener("message", function (event) {
  console.log("got message inside the sandbox", event);
  if (event.data.command === "eval") {
    console.log("evaluating code...", event.data.code);
    const res = eval(event.data.code);
    console.log("sending back eval result", res);
    event.source.postMessage(
      {
        result: res,
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      event.origin
    );
  }
});
console.log("the sandbox is listening to events ");
