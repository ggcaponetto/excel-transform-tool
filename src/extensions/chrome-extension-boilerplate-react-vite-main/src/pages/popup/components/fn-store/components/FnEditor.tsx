import React, { useContext, useEffect, useRef, useState } from "react";
import * as log from "loglevel";
import "./FnEditor.css";

import { keymap, EditorView, gutter, lineNumbers } from "@codemirror/view";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import {
  syntaxHighlighting,
  defaultHighlightStyle,
} from "@codemirror/language";
import { HighlightStyle } from "@codemirror/language";
import { javascript } from "@codemirror/lang-javascript";

const ll = log.getLogger("FnEditor");
import process from "process";
import { EditorState, Transaction } from "@codemirror/state";

const isLogsEnabled = true;
if (process.env.VITE_ENV === "development" && isLogsEnabled) {
  ll.setLevel(log.levels.DEBUG);
} else {
  ll.setLevel(log.levels.WARN);
}

const FnEditor = (props) => {
  const [excelFunctions, setExcelFunctions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const editorRef = useRef(null);
  useEffect(() => {
    if (isLoading === false) {
      const ediorView = new EditorView({
        doc: props.row.data,
        extensions: [
          history(),
          javascript(),
          syntaxHighlighting(defaultHighlightStyle),
          keymap.of([...defaultKeymap, ...historyKeymap]),
          lineNumbers(),
          gutter({ class: "cm-mygutter" }),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              // Handle the event here
              const editedContent = ediorView.state.doc.toString();
              ll.debug("document changed", {
                editedContent,
                update,
              });
              props.onEdit({
                row: props.row,
                editedContent,
              });
            }
          }),
        ],
        parent: editorRef.current,
      });
      ll.debug("initialized codemirror ediorView", ediorView);
    }
  }, [isLoading]);
  return (
    <div
      ref={(r) => {
        editorRef.current = r;
        setIsLoading(false);
      }}
      className="FnEditor"
    />
  );
};

export default FnEditor;
