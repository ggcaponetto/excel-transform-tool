import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import {HNSWLib} from "langchain/vectorstores/hnswlib";
import {OpenAIEmbeddings} from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { TextLoader } from "langchain/document_loaders/fs/text";
import path from "path"
import * as url from 'url';
import fs from "fs";
import * as crypto from "crypto";
import openai from "../openai/openai.js";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

async function split(options = {
    text: "",
    recursiveSplitterOptions: null
}) {
    const splitter = new RecursiveCharacterTextSplitter(options.recursiveSplitterOptions);
    const output = await splitter.createDocuments([options.text]);
    return output;
}

async function loadText(options = {
    path: null
}) {
    const loader = new TextLoader(options.path);
    const docs = await loader.load();
    return docs;
}

function getRoughEmbeddingCost(text){
    // based on https://platform.openai.com/docs/guides/embeddings/what-are-embeddings
    const charsPerPage = 1800;
    let pages = text.length / charsPerPage;
    let dollarCost = pages/3000;
    return dollarCost;
}

async function createStore(options = {
    textArray: [],
    metadataArray: [],
    path: `${__dirname}/store`
}) {
    const defaultOptions = {
        textArray: [],
        metadataArray: [],
        path: options.path ? options.path : `${__dirname}/store`,
    }
    const opts = {
        ...options,
        textArray: options.textArray === undefined ? defaultOptions.textArray : options.textArray,
        metadataArray: options.metadataArray === undefined ? defaultOptions.metadataArray : options.metadataArray,
        path: options.path === undefined ? defaultOptions.path : options.path
    }
    // Create a vector store through any method, here from texts as an example
    const vectorStore = await HNSWLib.fromTexts(
        opts.textArray,
        opts.metadataArray,
        new OpenAIEmbeddings()
    );

    // Save the vector store to a directory
    const directory = path.resolve(opts.path);
    await vectorStore.save(directory);
    return opts;
}
async function loadStore(options = {
    path: `${__dirname}/store`
}) {
    const directory = path.resolve(options.path);
    // Load the vector store from the same directory
    const loadedVectorStore = await HNSWLib.load(
        directory,
        new OpenAIEmbeddings()
    );
    return loadedVectorStore;
}

async function clearStore(options = {
    path: `${__dirname}/store`
}) {
    const directory = path.resolve(options.path);
    // Load the vector store from the same directory
    if(fs.existsSync(directory)){
        for (const file of fs.readdirSync(directory)) {
            await fs.unlinkSync(path.join(directory, file));
            console.log(`cleared ${file}`)
        }
    }
    return options;
}

async function queryStore(options = {
    vectorStore: null,
    query: "",
    k: 10
}) {
    if(options.vectorStore === null){
        throw new Error("Please provide a vector store to perform the query.");
    }
    const result = await options.vectorStore.similaritySearch(options.query, options.k);
    return result;
}

async function embed(text, options = {
    relPathStore:"./../vectorstores",
    storeName: "mystore"
}){
    let dollarCost = getRoughEmbeddingCost(text);
    if(dollarCost > 1){
        throw new Error(`This operation is too pricey! ${dollarCost.toFixed(8)}$`)
    }
    let splittedDocs = await split({
        text: text,
        recursiveSplitterOptions: {
            chunkSize: 500,
            chunkOverlap: 50,
        }
    })
    const hash = crypto.createHash('sha256');
    // update the hash object with the data to be hashed
    hash.update(text);
    // generate the hash digest in hexadecimal format
    const digest = hash.digest('hex');

    // clear the store
    let storePath = path.resolve(`${options.relPathStore}/${options.storeName}`);
    await clearStore({
        path: storePath
    })
    // create the store
    await createStore({
        textArray: splittedDocs.map(splittedDoc => splittedDoc.pageContent),
        metadataArray: splittedDocs.map(splittedDoc => splittedDoc.metadata),
        path: storePath
    })
    return {
        digest: digest,
        dollarCost: dollarCost,
        options
    };
}

async function queryOpenAIWithVectorStore(options = {
    path: null,
    vectorStoreQuery: "",
    openAIQuestion: "",
    k: 3
}){
    let loadedVectorStore = await loadStore({
        path: options.path
    })
    let relevantDocs = await queryStore({
        vectorStore: loadedVectorStore,
        query: options.vectorStoreQuery,
        k: options.k
    })

    let openAIResponse = 1; /*await openai.queryOpenAI({
        docs: relevantDocs,
        question: options.openAIQuestion
    })*/
    return openAIResponse;
}

export default {
    createStore,
    loadStore,
    clearStore,
    queryStore,
    embed,
    queryOpenAIWithVectorStore,
    split,
    loadText,
    getRoughEmbeddingCost
}