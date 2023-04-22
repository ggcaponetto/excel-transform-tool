import express from "express"
import cors from "cors"
import axios from "axios";
import Store from "./components/store/store.js";
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

app.post('/paid', async (req, res) => {
    res.set("Content-Type", "application/json");
    let apiKey = req.body.apiKey;
    let user = req.body.user;
    let hasPaid = await hasUserPaid("myfirstextension", apiKey.extensionpay_api_key);
    res.send(JSON.stringify({
        message: `Requested if user ${user.email} with API key ${apiKey.extensionpay_api_key} has a paid subscription.`,
        paid: hasPaid
    }))
})

app.post('/status', async (req, res) => {
    res.set("Content-Type", "application/json");
    try {
        let apiKey = req.body.apiKey;
        let user = req.body.user;
        let hasPaid = await hasUserPaid("myfirstextension", apiKey.extensionpay_api_key);
        res.send(JSON.stringify({
            message: `Requested store for user ${user.email}`,
            paid: hasPaid,
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