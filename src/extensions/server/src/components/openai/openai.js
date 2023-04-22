import {loadQAMapReduceChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";

async function query(options = {
    docs: [],
    question: "",
    chatOpenAIOptions: { temperature: 0 }
}){
    const myOptions = {
        docs: [],
        question: "",
        chatOpenAIOptions: { temperature: 0 },
        ...options
    }
    const model = new ChatOpenAI(myOptions.chatOpenAIOptions);
    const chain = loadQAMapReduceChain(model);
    const response = await chain.call({
        input_documents: options.docs,
        question: options.question
    });
    return response;
}
export default {
    query
}