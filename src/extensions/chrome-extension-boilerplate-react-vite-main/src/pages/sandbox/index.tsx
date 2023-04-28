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
  console.log("the sandbox has been loaded.");
};
window.addEventListener("message", async function (event) {
  console.log("the sandbox got a message", event);
  if (event.data.command === "eval") {
    console.log("the sandbox is evaluating code...", event.data.code);
    const result = await eval(event.data.code);
    console.log("the sandbox is sending back the evaluated result", result);
    event.source.postMessage(
      {
        result: result,
        originalData: event.data,
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      event.origin
    );
  }
});
console.log("the sandbox is now listening to events");
