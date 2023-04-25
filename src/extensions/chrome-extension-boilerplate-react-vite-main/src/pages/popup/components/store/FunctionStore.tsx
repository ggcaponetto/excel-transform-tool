import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import Store from "./store";

const store = new Store("ett-plugin", "ett-functions", {
  keyPath: "name",
});
const FunctionStore = () => {
  useEffect(() => {
    console.log("FunctionStore initialized.", store);
  }, []);
  const onLoad = async () => {
    await store.open();
  };
  const onAdd = () => {
    store.write([
      {
        name: "Pippo" + Math.random(),
        value: Math.random(),
      },
    ]);
  };
  const onGetAll = () => {
    const all = store.getAll((result) => {
      console.log("onGetAll", result);
    });
  };
  return (
    <div className="FunctionStore">
      <div>
        <Button onClick={onLoad}>load</Button>
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
