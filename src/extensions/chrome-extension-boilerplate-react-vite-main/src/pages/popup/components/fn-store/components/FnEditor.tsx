import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { JSHINT } from "jshint";

const isLogsEnabled = true;
if (process.env.VITE_ENV === "development" && isLogsEnabled) {
  ll.setLevel(log.levels.DEBUG);
} else {
  ll.setLevel(log.levels.WARN);
}

const FnEditor = (props) => {
  const [excelFunctions, setExcelFunctions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editorView, setEditorView] = useState(null);
  const [jshintData, setJshintData] = useState(null);
  const editorRef = useRef(null);
  const [editedContent, setEditedContent] = useState(props.currentRow);

  useEffect(() => {
    ll.debug("currentRow changes in editor", {
      row: props.row,
      currentRow: props.currentRow,
    });
  }, [props.currentRow]);
  const getJsHintData = (code) => {
    const jshintData = getJshintData(code);
    return jshintData;
  };
  const initEditor = () => {
    const newEditorView = new EditorView({
      doc: props.row.data,
      extensions: [
        history(),
        javascript(),
        syntaxHighlighting(defaultHighlightStyle),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        lineNumbers(),
        EditorView.lineWrapping,
        gutter({ class: "cm-mygutter" }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            // Handle the event here
            const editedContent = newEditorView.state.doc.toString();
            const newJshintData = getJsHintData(editedContent);
            props.onJsHint(newJshintData);
            setJshintData(newJshintData);
            ll.debug("document changed", {
              editedContent,
              update,
              currentRow: props.currentRow,
              newRow: {
                ...props.currentRow,
                data: editedContent,
              },
            });
            const oldRow = props.row;
            props.onEdit(oldRow, {
              ...props.currentRow,
              data: editedContent,
            });
            setEditedContent(editedContent);
          }
        }),
      ],
      parent: editorRef.current,
    });
    ll.debug("initialized codemirror editor view", newEditorView);
    setEditorView(newEditorView);
  };
  useEffect(() => {
    if (isLoading === false && editorView === null) {
      initEditor();
    }
  }, [isLoading, editorView]);
  const getJshintData = (code) => {
    const source = [code];
    const options = {
      esversion: 11,
    };
    const predef = {};
    JSHINT(source, options, predef);
    const data = JSHINT.data();
    return data;
  };
  return (
    <div>
      <div
        ref={(r) => {
          editorRef.current = r;
          setIsLoading(false);
        }}
        className="FnEditor"
      />
      <div>
        {(() => {
          if (jshintData?.errors) {
            const listItems = jshintData.errors.map((error, i) => {
              return (
                <li key={JSON.stringify(i)}>
                  {error.raw} at line {error.line}:{error.character}
                </li>
              );
            });
            return <ul>{listItems}</ul>;
          }
        })()}
      </div>
    </div>
  );
};

export default FnEditor;
