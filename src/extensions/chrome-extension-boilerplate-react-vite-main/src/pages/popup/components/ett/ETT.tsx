import React, { useEffect, useRef, useState } from "react";
import ExtPay from "extpay";
import { Typography, Button } from "@mui/material";
import API from "../api/API";
import axios from "axios";
import Input from "@mui/material/Input";
import XLSX, { read, writeFileXLSX, set_cptable } from "xlsx";
/* load the codepage support library for extended support with older formats  */
/*import * as cptable from "xlsx/dist/cpexcel.full.mjs";
set_cptable(cptable);*/

const ETT = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [workbook, setWorkbook] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {}, []);

  /* set up drag-and-drop event */
  async function handleChange(e) {
    e.stopPropagation();
    e.preventDefault();
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = read(data, {});
    console.log("workbook ready", workbook);
    /* Iterate all sheets */
    Object.keys(workbook.Sheets).forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      console.log(`processing sheet ${sheetName}`, sheet);
      const range = XLSX.utils.decode_range(sheet["!ref"]);
      console.log("row count is", range.e.r);
      console.log("column count is", range.e.c);
    });
  }
  return (
    <div className="ETT">
      <Input
        onChange={handleChange}
        ref={inputRef}
        type="file"
        id="xlsx-input"
        name="xlsx-input"
      />
    </div>
  );
};

export default ETT;
