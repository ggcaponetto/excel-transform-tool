import refreshOnUpdate from "virtual:reload-on-update-in-view";

import * as log from "loglevel";

const ll = log.getLogger("index.tsx");
import process from "process";
import XLSX from "xlsx";

const isLogsEnabled = false;
if (process.env.VITE_ENV === "development" && isLogsEnabled) {
  ll.setLevel(log.levels.DEBUG);
} else {
  ll.setLevel(log.levels.WARN);
}

refreshOnUpdate("pages/sandbox");

const util = {
  write: function (cellName, value, ctx) {
    ctx.XLSX.utils.sheet_add_aoa(ctx.workbook.Sheets["Sheet1"], [[value]], {
      origin: cellName,
    });
  },
};

function evalInContext(js, context) {
  //# Return the results of the in-line anonymous function we .call with the passed context
  return function () {
    return eval(js);
  }.call(context);
}

window.onload = () => {
  console.log("the sandbox has been loaded.");
};
window.addEventListener("message", async function (event) {
  console.log("the sandbox got a message", event);
  if (event.data.command === "eval") {
    console.log("the sandbox is evaluating code...", {
      code: event.data.code,
      context: event.data.context,
    });
    const result = await evalInContext(event.data.code, {
      ...event.data.context,
      util,
      XLSX,
    }).catch((e) => {
      console.warn(
        "the sandbox encountered a problem evaluating the js: ",
        e.message
      );
      return { error: e };
    });
    console.log("the sandbox is sending back the evaluated result: ", result);
    event.source.postMessage(
      {
        e: result.error,
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
