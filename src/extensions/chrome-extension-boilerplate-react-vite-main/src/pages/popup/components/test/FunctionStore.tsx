import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import Store from "./../store/store";
import TextField from "@mui/material/TextField";
import * as log from "loglevel";
const ll = log.getLogger("FunctionStore");
import process from "process";

const isLogsEnabled = false;
if (process.env.VITE_ENV === "development" && isLogsEnabled) {
  ll.setLevel(log.levels.DEBUG);
} else {
  ll.setLevel(log.levels.WARN);
}

const store = new Store("transform-sample", "transform-sample", {
  keyPath: "id",
});
const FunctionStore = () => {
  const [getValue, setGetValue] = useState("hello");
  useEffect(() => {
    ll.debug("FunctionStore initialized.", store);
  }, []);
  const onOpen = async () => {
    const db = await store.open((objectStore) => {
      ll.debug("creating index 'value'");
      objectStore.createIndex("value", "value", { unique: false });
    });
  };
  const onAdd = async () => {
    await store.write([
      {
        id: Math.random().toString(),
        value: Math.random().toString(),
      },
    ]);
  };
  const onGetAll = async () => {
    const all = await store.getAll();
    ll.debug("all elements", all);
  };
  const onPrune = async () => {
    const all = await store.prune();
    ll.debug("pruned database");
  };
  const onDestroy = async () => {
    await store
      .destroy()
      .then((res) => {
        ll.debug("destroyed database", res);
      })
      .catch((e) => {
        ll.debug("could not destroy database", e);
      });
  };
  const onGet = async () => {
    const element = await store.get(getValue);
    ll.debug("got element", element);
  };
  return (
    <div className="FunctionStore">
      <div>
        <Button onClick={onDestroy}>destroy</Button>
      </div>
      <div>
        <Button onClick={onPrune}>prune</Button>
      </div>
      <div>
        <Button onClick={onOpen}>open</Button>
      </div>
      <div>
        <Button onClick={onAdd}>add</Button>
      </div>
      <div>
        <Button onClick={onGetAll}>getall</Button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button onClick={onGet}>onGet</Button>
        <TextField
          value={getValue}
          onChange={(event) => {
            setGetValue(event.target.value);
          }}
        />
      </div>

      <Button
        onClick={async () => {
          chrome.runtime.sendMessage({ greeting: "hello" }, (response) => {
            ll.debug("got message back", response);
          });
        }}
      >
        SEND TASK TO BG
      </Button>
      <Button
        onClick={() => {
          (async () => {
            const [tab] = await chrome.tabs.query({
              active: true,
              lastFocusedWindow: true,
            });
            if (tab?.id !== undefined) {
              const response = await chrome.tabs.sendMessage(tab.id, {
                greeting: "hello",
              });
              // do something with response here, not outside the function
              ll.debug("got back response from content script: ", response);
            }
          })();
        }}
      >
        SEND TASK TO CONTENT SCRIPT
      </Button>
      <Button
        onClick={() => {
          (async () => {
            const iframe = document.getElementById("sanbdox-bridge");
            const message = {
              command: "eval",
              code: `
                async function run() {
                    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
                    const data = await response.json();
                    return data;
                  }
                run()
                  .then(data => { console.log(data); return data; })
                `,
            };
            /*const res = await processor.runInSandbox(iframe, message);
            ll.debug("got message from sandbox", res);*/
          })();
        }}
      >
        SEND TASK TO SANDBOX
      </Button>
    </div>
  );

  /*return (
    <div>
      <div>all good, you paid. here is your reward.</div>
      <Button
        onClick={async () => {
          chrome.runtime.sendMessage({ greeting: "hello" }, (response) => {
            ll.debug("got message back", response);
          });
        }}
      >
        SEND TASK TO BG
      </Button>
      <Button
        onClick={() => {
          (async () => {
            const [tab] = await chrome.tabs.query({
              active: true,
              lastFocusedWindow: true,
            });
            if (tab.id !== undefined) {
              const response = await chrome.tabs.sendMessage(tab.id, {
                greeting: "hello",
              });
              // do something with response here, not outside the function
              ll.debug(
                "got back response from content script: ",
                response
              );
            }
          })();
        }}
      >
        SEND TASK TO CONTENT SCRIPT
      </Button>
      <Button
        onClick={async () => {
          const myDataResponse = await API.makeRequest({ hello: "world" });
          ll.debug("got response form private endpoint", myDataResponse);
        }}
      >
        PRIVATE ENDPOINT
      </Button>
    </div>
  );*/
};

export default FunctionStore;
