import assert from "assert";
import fs from "fs";
import path from "path";
import url from "url";
import serializer from "../src/components/serializer/serializer.js";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
describe('serializer', function () {
    it('get rough embedding cost in dollars', async function () {
        let dollarCost = serializer.getRoughEmbeddingCost("Hello, my name is Giuseppe.");
        console.log("cost: " + dollarCost)
        assert.notEqual(dollarCost, null);
    });
    it('embeds a text to a local vector store', async function () {
        let res = await serializer.embed("Hello, my name is Giuseppe and I am software developer.",{
            relPathStore:"./vectorstores",
            storeName: "mystore"
        });
        console.log("res: ", res)
        assert.notEqual(res.dollarCost, null);
    });

    it('queries openai with a custom vector store', async function () {
        this.timeout(1000*60)
        let response = await serializer.queryOpenAIWithVectorStore({
            path: path.resolve(`./vectorstores/mystore`),
            vectorStoreQuery: "oensingen",
            openAIQuestion: "What is oensingen?",
            k: 5
        });
        console.log("Got response form OpenAI", response)
        assert.notEqual(response, null);
    });
});