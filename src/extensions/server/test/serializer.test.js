import assert from "assert";
import fs from "fs";
import path from "path";
import url from "url";
import serializer from "../src/components/serializer/serializer.js";
import openai from "../src/components/openai/openai.js";
import encoder from "../src/components/gpt-3-encoder/encoder.js";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
describe('serializer', function () {
    it('writes a log file', async function () {
        let jsonFilePath = `${__dirname}/../logs/${(new Date()).toJSON().replaceAll(":", "-")} - request.json`;
        let res = await serializer.writeFile(
            path.resolve(jsonFilePath),
            JSON.stringify({
                hello: "world"
            })
        )
        assert.equal(fs.existsSync(jsonFilePath), true);
    });
    it('get token count', async function () {
        let count = await encoder.getTokenCount("Hello, my name is Giuseppe.");
        console.log("tokens: " + count)
        assert.equal(count === 9, true);
    });
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
            path.resolve(`${__dirname}/../vectorstores/testvs`),
            {
                modelName: "text-embedding-ada-002"
            }
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

    it('loads a vector store from disk', async function(){
        // loads the vector store from disk. Every load costs "embedding tokens"
        let vectorStore = await serializer.loadVectorStore(
            path.resolve(`${__dirname}/../vectorstores/whoami`),
            {
                modelName: "text-embedding-ada-002"
            }
        )
        assert.notEqual(vectorStore, null);
    })

    it('queries openai with documents from vector store', async function () {
        this.timeout(1000*60)
        let textArray = [
            "My name is Giuseppe Caponetto",
            "Giuseppe is a software developer",
            "The most coded framework by software developers is React.js",
            "Alice likes bananas",
            "What a beatiful day!!"
        ]
        let text = textArray.join("");
        let tokenCountEmbedding = encoder.getTokenCount(text);
        let embeddingCost = tokenCountEmbedding * 0.0004; // https://platform.openai.com/docs/guides/embeddings/what-are-embeddings
        let vectorStore = await serializer.createVectorStore(
            textArray,
            [{ id: 2 }, { id: 1 }, { id: 3 }],
            path.resolve(`${__dirname}/../vectorstores/whoami`),
            {
                modelName: "text-embedding-ada-002"
            }
        );
        let docs = await vectorStore.similaritySearch(
            "does giuseppe know react?",
            3
        )
        let question = "Who is Giuseppe and what does he do? Give me a short description of his job.";
        let tokenCountQuestion = encoder.getTokenCount(question);
        let tokenCountDocuments = encoder.getTokenCount(docs.map(d => d.pageContent).join("\n"));

        let jsonFilePath = `${__dirname}/../logs/${(new Date()).toJSON().replaceAll(":", "-")} - openai-request.json`;
        await serializer.writeFile(
            path.resolve(jsonFilePath),
            JSON.stringify({
                question,
                tokenCountQuestion,
                tokenCountEmbedding,
                tokenCountDocuments
            })
        )

        let response = await openai.query({
            docs,
            question,
            chatOpenAIOptions: {
                modelName: "gpt-3.5-turbo"
            }
        })
        console.log("Got response form OpenAI", response)
        assert.notEqual(response, null);
    });
});