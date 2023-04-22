import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from "express"
import cors from "cors"
import axios from "axios";
import Store from "./components/store/store.js";
import openai from "./components/openai/openai.js";
const app = express()
const port = process.env.PORT || 4000

async function hasUserPaid(extensionId, apiKey){
    const HOST = `https://extensionpay.com`;
    const EXTENSION_URL = `${HOST}/extension/${extensionId}`
    const url = `${EXTENSION_URL}/api/user?api_key=${apiKey}`;
    const res = await axios({
        url,
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch(e => {
        console.error("could not check if user paid", e.message);
        return e.response;
    })
    return res.data;
}

/* Initialize the app */
const store = new Store();
store.loadFromDisk();

app.use(cors())
app.use(express.json(
    {
        limit: "50mb"
    }
));

app.post('/query', async (req, res) => {
    res.set("Content-Type", "application/json");
    let apiKey = req.body.apiKey;
    let paidResponse = await hasUserPaid("myfirstextension", apiKey.extensionpay_api_key);
    let query = req.body.query;
    let context = req.body.context;
    if(paidResponse.paid){
        let response = await openai.query({
            docs: [],
            question: query,
            chatOpenAIOptions: {
                modelName: "gpt-3.5-turbo"
            }
        })
        res.send(JSON.stringify({
            query: req.body.query,
            context: req.body.context,
            response
        }))
    } else {
        res.status(402).send({
            message: "A payment is required for this feature"
        })
    }
})

app.post('/paid', async (req, res) => {
    res.set("Content-Type", "application/json");
    let apiKey = req.body.apiKey;
    let user = req.body.user;
    let paidResponse = await hasUserPaid("myfirstextension", apiKey.extensionpay_api_key);
    res.send(JSON.stringify({
        message: `Requested if user ${user.email} with API key ${apiKey.extensionpay_api_key} has a paid subscription.`,
        paid: paidResponse
    }))
})

app.post('/status', async (req, res) => {
    res.set("Content-Type", "application/json");
    try {
        let apiKey = req.body.apiKey;
        let user = req.body.user;
        let paidResponse = await hasUserPaid("myfirstextension", apiKey.extensionpay_api_key);
        res.send(JSON.stringify({
            message: `Requested store for user ${user.email}`,
            paid: paidResponse,
            store: store.getStore(user.email)
        }))
    } catch (e){
        res.status(500).send({
            message: "An unexpected error occurred.",
            error: e.message
        })
    }
})

app.listen(port, () => {
    console.log(`user validator listening on port ${port}`)
})