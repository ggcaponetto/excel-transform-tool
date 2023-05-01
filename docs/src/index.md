### ETT Functions Quickstart

### Simple override of all cells

ETT Functions allow you to define a JavaScript function that runs on every cell of the spreadsheet.

These functions will run in a special context where you will have access to the following variables:

Please note that all functions **must** be async arrow-functions.

````javascript
const runOnCell = async () => {
    /* https://docs.sheetjs.com/docs/csf/book */
    const workbook = this.wb;
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
    console.log("Available in your function: ", {
        workbook,
        cell,
        cellName,
        sheetName,
        cellValue,
        range
    });
    /* Whatever is returned inside this object in the res attribute, will be written to the current cell. */
    return { res: "some value" };
};
runOnCell().then(result => result);
````

### Memorizing data between cell processing steps
To memorize values, ETT provided a ``scratch`` object, that can accumulate values between processings steps.
In the following example we simply count the processed cells and append this value to the original cell value.
````javascript
const runOnCell = async () => {
    const cellName = this.cellName;
    const column = this.cell.column;
    this.scratch.counter = this.scratch.counter === undefined ? 0 : this.scratch.counter;
    this.scratch.counter++;
    if(column === "C"){
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = await response.json();
        return {
            res:  this.cellValue + " " + data.title + " " + this.scratch.counter,
           scratch: this.scratch
        }
    }
    return {
      res:  this.cellValue + " " + this.scratch.counter,
      scratch: this.scratch
    }
  };
runOnCell().then(data => data);
````

### Make a HTTP call and append the result to column C
In the following example we perform a HTTP-GET request and append the result to the original cell values of colum C.
````javascript
const runOnCell = async () => {
    const cellName = this.cellName;
    const column = this.cell.column;
    if(column === "C"){
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = await response.json();
        return { res:  this.cellValue + " " + data.title }
    }
    return {
        res: this.cellValue
    };
};
runOnCell().then(data => data);
````