import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import Store from "./store";
import TextField from "@mui/material/TextField";

const store = new Store("ett-sample", "ett-sample", {
  keyPath: "id",
});
const FunctionStore = () => {
  const [getValue, setGetValue] = useState("hello");
  useEffect(() => {
    console.log("FunctionStore initialized.", store);
  }, []);
  const onOpen = async () => {
    const db = await store.open((objectStore) => {
      console.log("creating index 'value'");
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
    console.log("all elements", all);
  };
  const onPrune = async () => {
    const all = await store.prune();
    console.log("pruned database");
  };
  const onDestroy = async () => {
    await store
      .destroy()
      .then((res) => {
        console.log("destroyed database", res);
      })
      .catch((e) => {
        console.log("could not destroy database", e);
      });
  };
  const onGet = async () => {
    const element = await store.get(getValue);
    console.log("got element", element);
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
    </div>
  );
};

export default FunctionStore;
