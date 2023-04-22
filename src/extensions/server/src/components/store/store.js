import fs from "fs"
import * as path from "path";
import urlLib from "url";
const __filename = urlLib.fileURLToPath(import.meta.url);
const __dirname = urlLib.fileURLToPath(new URL('.', import.meta.url));
function Store(){
    this.users = {};
    this.getStore = (email) => {
        return this.users[Object.keys(this.users).filter(k => k === email)[0]]
    }
    this.loadFromDisk = (relPath = "./store.json") => {
        return new Promise((res, rej) => {
            let filePath = `${__dirname}${relPath}`;
            fs.readFile(filePath, (err, data) => {
                if (err) rej(err.message);
                let store = JSON.parse(data);
                this.users = store;
                console.log('Store loaded from ' + filePath);
            });
        })
    }
    this.saveToDisk = async (relPath = "./store.json") => {
        return new Promise((res, rej) => {
            let filePath = `${__dirname}${relPath}`;
            fs.writeFile(path.resolve(filePath), JSON.stringify(this.users, null, 2), (err) => {
                if (err) rej(err.message);
                console.log('Data written to ' + filePath);
                res(filePath)
            });
        })
    }
    return {
        users: this.users,
        getStore: this.getStore,
        loadFromDisk: this.loadFromDisk,
        saveToDisk: this.saveToDisk
    }
}
export default Store