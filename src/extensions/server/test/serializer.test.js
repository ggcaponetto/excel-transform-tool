import assert from "assert";
import fs from "fs";
import path from "path";
import url from "url";
import serializer from "../src/components/serializer/serializer.js";
import openai from "../src/components/openai/openai.js";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
describe('serializer', function () {
    it('get rough embedding cost in dollars', async function () {
        let cost = serializer.getCost("Hello, my name is Giuseppe.");
        console.log("cost: " + cost.value)
        assert.equal(cost.value > 0, true);
    });
    it('embeds a text to a local vector store', async function () {
        this.timeout(1000*30)
        let vectorStore = await serializer.createVectorStore(
            ["Hello world", "Bye bye", "hello nice world"],
            [{ id: 2 }, { id: 1 }, { id: 3 }],
            path.resolve(`${__dirname}/../vectorstores/testvs`)
        );
        assert.notEqual(vectorStore, null);
    });

    it('queries openai', async function () {
        this.timeout(1000*60)
        let response = await openai.query({
            docs: [],
            question: "what day is it?",
            chatOpenAIOptions: { temperature: 0 }
        })
        console.log("Got response form OpenAI", response)
        assert.notEqual(response, null);
    });

    it('queries openai with documents from vector store', async function () {
        this.timeout(1000*60)
        await serializer.createVectorStore(
            [
                "My name is Giuseppe Caponetto",
                "Giuseppe is a software developer",
                "The most coded framework by software developers is React.js",
                "Alice likes bananas",
                "What a beatiful day!!"
            ],
            [{ id: 2 }, { id: 1 }, { id: 3 }],
            path.resolve(`${__dirname}/../vectorstores/whoami`)
        );
        let vectorStore = await serializer.loadVectorStore(
            path.resolve(`${__dirname}/../vectorstores/whoami`)
        )
        let docs = await vectorStore.similaritySearch(
            "does giuseppe know react?",
            3
        )
        let response = await openai.query({
            docs,
            question: "Who is Giuseppe and what does he do?",
            chatOpenAIOptions: { temperature: 0 }
        })
        console.log("Got response form OpenAI", response)
        assert.notEqual(response, null);
    });
});