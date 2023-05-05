### ETT Functions Quickstart

### Ask OpenAI (ChatGPT) to read values form column A and insert the result in Column J
This operation will be executed only for the first 3 cells. Please note that you have to replace the
OpenAI api key.
````javascript
const runOnCell = async () => {
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
runOnCell().then(result => result);
````

### Simple override of all cells

ETT Functions allow you to define a JavaScript function that runs on every cell of the spreadsheet.

These functions will run in a special context where you will have access to the following variables:

Please note that all functions **must** be async arrow-functions.

````javascript
const runOnCell = async () => {
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
};
runOnCell().then(result => result);
````

### Memorizing data between cell processing steps
To memorize values, ETT provided a ``scratch`` object, that can accumulate values between processings steps.
In the following example we simply count the processed cells and append this value to the original cell value.
````javascript
const runOnCell = async () => {
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
    this.scratch.counter = this.scratch.counter === undefined ? 0 : this.scratch.counter;
    this.scratch.counter++;
    console.log("Available in your function: ", this);
    if (cell.column === "A") {
        this.util.write("J" + cell.row, `cell counter:${this.scratch.counter}`, this)
    } else {
        this.util.write(cellName, cellValue, this)
    }
    /* all functions must return an object containing the processed workbook and the scratch object */
    return {workbook: this.workbook, scratch: this.scratch};
}
runOnCell().then(result => result);
````

### Make a HTTP call and append the result to column C
In the following example we perform a HTTP-GET request each time a cell on column A is read. The function appends the http-get result to the column J, concatenated with the
cell value of column A.
````javascript
const runOnCell = async () => {
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
};
runOnCell().then(result => result);
````