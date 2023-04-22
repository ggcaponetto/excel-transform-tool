import {loadQAMapReduceChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";

async function queryOpenAI(options = {
    docs: [],
    question: ""
}){
    const model = new ChatOpenAI({ temperature: 0 });
    const chain = loadQAMapReduceChain(model);
    const response = await chain.call({
        input_documents: options.docs,
        question: options.question
    });
    return response;
}
export default {
    queryOpenAI
}