import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import {HNSWLib} from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import * as url from 'url';
import fs from "fs/promises"
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

function getCost(text){
    // based on https://platform.openai.com/docs/guides/embeddings/what-are-embeddings
    const charsPerPage = 1800;
    let pages = text.length / charsPerPage;
    let value = pages/3000;
    return {
        value: value,
        unit: "Dollars"
    };
}
async function createVectorStore(textArray, metadataArray, path, options = {}){
    // Create a vector store through any method, here from texts as an example
    const vectorStore = await HNSWLib.fromTexts(
        textArray,
        metadataArray,
        new OpenAIEmbeddings(options)
    );

    // Save the vector store to a directory
    await vectorStore.save(path);
    return vectorStore;
}

async function loadVectorStore(path, options={}) {
    return await HNSWLib.load(
        path,
        new OpenAIEmbeddings(options)
    );
}
async function writeFile(path, content){
    try {
        return await fs.writeFile(path, content);
    } catch (err) {
        console.log(err);
    }
}
export default {
    writeFile,
    getCost,
    createVectorStore,
    loadVectorStore
}