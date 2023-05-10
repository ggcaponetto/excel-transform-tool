import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

console.log("generating the functions-repo");

const f_create_new_column = async () => {
  /* https://docs.sheetjs.com/docs/csf/book */
  const workbook = this.workbook;
  /* e.g. { row: 15, column: "A" } */
  const cell = this.cell;
  /* e.g. "A15" */
  const cellName = this.cellName;
  /* e.g. "MySheet" */
  const sheetName = this.sheetName;
  /* e.g. "Hello World!" */
  const cellValue = this.cellValue;
  /*
   * row count --> range.e.r
   * column count --> range.e.c
   * */
  const range = this.range;
  console.log("Available in your function: ", this);
  if (cell.column === "A") {
    this.util.write("J" + cell.row, "sometincool", this);
  } else {
    this.util.write(cellName, cellValue, this);
  }
  /* all functions must return an object containing the processed workbook */
  return { workbook: this.workbook };
};
const f_simple_http_request = async () => {
  /* https://docs.sheetjs.com/docs/csf/book */
  const workbook = this.workbook;
  /* e.g. { row: 15, column: "A" } */
  const cell = this.cell;
  /* e.g. "A15" */
  const cellName = this.cellName;
  /* e.g. "MySheet" */
  const sheetName = this.sheetName;
  /* e.g. "Hello World!" */
  const cellValue = this.cellValue;
  /*
   * row count --> range.e.r
   * column count --> range.e.c
   * */
  const range = this.range;
  console.log("Available in your function: ", this);
  if (cell.column === "A") {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    const data = await response.json();
    this.util.write("J" + cell.row, `${cellValue} + ${data.title}`, this);
  } else {
    this.util.write(cellName, cellValue, this);
  }
  /* all functions must return an object containing the processed workbook */
  return { workbook: this.workbook };
};
const f_cell_counter = async () => {
  /* https://docs.sheetjs.com/docs/csf/book */
  const workbook = this.workbook;
  /* e.g. { row: 15, column: "A" } */
  const cell = this.cell;
  /* e.g. "A15" */
  const cellName = this.cellName;
  /* e.g. "MySheet" */
  const sheetName = this.sheetName;
  /* e.g. "Hello World!" */
  const cellValue = this.cellValue;
  /*
   * row count --> range.e.r
   * column count --> range.e.c
   * */
  const range = this.range;
  /* the scratch object is an "accumulator" that stores values between cell processings */
  this.scratch.counter =
    this.scratch.counter === undefined ? 0 : this.scratch.counter;
  this.scratch.counter++;
  console.log("Available in your function: ", this);
  if (cell.column === "A") {
    this.util.write(
      "J" + cell.row,
      `cell counter:${this.scratch.counter}`,
      this
    );
  } else {
    this.util.write(cellName, cellValue, this);
  }
  /* all functions must return an object containing the processed workbook and the scratch object */
  return { workbook: this.workbook, scratch: this.scratch };
};

const f_openai = async () => {
  if (this.cell.column === "A" && this.cell.row <= 3) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer YOUR_OPENAI_API_KEY");
    const raw = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Say this is a test on cell  ${this.cellName}`,
        },
      ],
      temperature: 0.7,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    let oaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      requestOptions
    );
    const json = await oaiRes.json();
    console.log("openai responded", json);
    this.util.write(
      "J" + this.cell.row,
      `openai response: ${json.choices[0]?.message?.content}`,
      this
    );
  } else {
    this.util.write(this.cellName, this.cellValue, this);
  }
  /* all functions must return an object containing the processed workbook and the scratch object */
  return { workbook: this.workbook };
};
let functions = [
  {
    name: "Query OpenAI (ChatGPT) for the the cells A1 to A3",
    comment:
      "Query OpenAI (ChatGPT) for the the cells A1 to A3 and writes the OpenAI result to column J.",
    data: f_openai,
  },
  {
    name: "Create new column",
    comment:
      "Create a new cell on column J each time a cell of column A is red.",
    data: f_create_new_column,
  },
  {
    name: "Simple HTTP-GET request",
    comment:
      "Create a new cell with the content of a HTTP-GET request on column J each time a cell of column A is red.",
    data: f_simple_http_request,
  },
  {
    name: "Cell counter",
    comment: "Counts all processed cells and writes them to column J.",
    data: f_cell_counter,
  },
];

functions = functions.map((myFunctionObject) => {
  let fnString = `const runOnCell = ${myFunctionObject.data.toString()};
runOnCell().then(result => result);`;
  return {
    ...myFunctionObject,
    data: fnString.trim(),
  };
});
console.log("generating the functions-repo... done.", functions);
console.log("generating the final json output", JSON.stringify(functions));
await fs.promises.writeFile(
  `${path.resolve(__dirname)}/../0.1.2/basic.json`,
  JSON.stringify(functions, null, 4)
);
