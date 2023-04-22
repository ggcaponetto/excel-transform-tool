import encoder from "gpt-3-encoder"

function getTokenCount(text){
    const encoded = encoder.encode(text);
    return encoded.length;
}
export default {
    getTokenCount
}