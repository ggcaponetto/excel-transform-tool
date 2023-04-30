import ExtPay from "extpay";
import process from "process";
const extpay = ExtPay(process.env.VITE_EXTENSIONPAY_ID);
console.log("loaded ExtPay.js for payment callbacks");
