### ETT Functions Quickstart

ETT Functions allow you to define a JavaScript function that runs on every cell of the spreadsheet.

These functions will run in a special context where you will have access to the following variables:

**Please note that all functions need to be async arrow-functions.**

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