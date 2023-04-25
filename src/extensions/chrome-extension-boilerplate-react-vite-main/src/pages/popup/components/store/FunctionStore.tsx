import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import Store from "./store";

const store = new Store("ett-plugin", "ett-functions", {
  keyPath: "id",
});
const FunctionStore = () => {
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
        id: Math.random(),
        value: Math.random(),
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
    </div>
  );
};

export default FunctionStore;
