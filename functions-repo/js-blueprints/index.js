import fs from "fs";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
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
        this.util.write("J" + cell.row, "sometincool", this)
    } else {
        this.util.write(cellName, cellValue, this)
    }
    /* all functions must return an object containing the processed workbook */
    return {workbook: this.workbook};
}
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
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = await response.json();
        this.util.write("J" + cell.row, `${cellValue} + ${data.title}`, this)
    } else {
        this.util.write(cellName, cellValue, this)
    }
    /* all functions must return an object containing the processed workbook */
    return {workbook: this.workbook};
}

let functions = [
    {
        name: "Create new column",
        comment: "Create a new cell on column J each time a cell of column A is read.",
        data: f_create_new_column
    },
    {
        name: "Simple HTTP-GET request",
        comment: "Create a new cell with the content of a HTTP-GET request on column J each time a cell of column A is read.",
        data: f_simple_http_request
    }
]

functions = functions.map(myFunctionObject => {
    let fnString = `const runOnCell = ${myFunctionObject.data.toString()};
runOnCell().then(result => result);`;
    return {
        ...myFunctionObject,
        data: fnString.trim()
    }
})
console.log("generating the functions-repo... done.", functions);
console.log("generating the final json output", JSON.stringify(functions));
await fs.promises.writeFile(`${path.resolve(__dirname)}/../0.1.2/basic.json`, JSON.stringify(functions, null, 4))