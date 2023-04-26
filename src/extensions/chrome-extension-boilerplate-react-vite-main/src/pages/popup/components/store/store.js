import * as log from "loglevel";
import process from "process";

const isLogsEnabled = false;
if (process.env.VITE_ENV === "development" && isLogsEnabled) {
  log.setLevel(log.levels.DEBUG);
} else {
  log.setLevel(log.levels.WARN);
}

function Store(dbName, storeName, options) {
  this.dbName = dbName;
  this.storeName = storeName;
  this.options = options;
  this.db = null;

  const open = (onIndexCreation) => {
    // Let us open our database
    return new Promise((res, rej) => {
      const request = window.indexedDB.open(this.dbName, 2);
      request.onupgradeneeded = (event) => {
        log.debug(`db load: onupgradeneeded`, {
          event,
        });
        // Save the IDBDatabase interface
        const db = event.target.result;
        // Create an objectStore for this database
        const objectStore = db.createObjectStore(this.storeName, this.options);
        onIndexCreation(objectStore);
      };
      request.onsuccess = (event) => {
        this.db = event.target.result;
        log.debug(`db load: onsuccedd`, {
          db: this.db,
        });
        res(this.db);
      };
      request.onerror = (event) => {
        rej("We need to use IndexedDB.");
      };
    });
  };
  const write = (data) => {
    log.debug("writing to db", {
      storeName: this.storeName,
      dbName: this.dbName,
      data,
    });
    return new Promise((res, rej) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      // Do something when all the data is added to the database.
      transaction.oncomplete = (event) => {
        log.debug("write done.", event);
        res(event);
      };
      transaction.onerror = (event) => {
        // Don't forget to handle errors!
        console.error("could not write to database", event);
        rej("could not write to database");
      };
      const objectStore = transaction.objectStore(this.storeName);
      data.forEach((customer) => {
        const request = objectStore.put(customer);
        request.onsuccess = (event) => {
          // event.target.result === customer.ssn;
          log.debug("added element", event.target.result);
        };
      });
    });
  };
  const remove = async (query) => {
    return new Promise((res, rej) => {
      const request = this.db
        .transaction([this.storeName], "readwrite")
        .objectStore([this.storeName])
        .delete(query);
      request.onsuccess = (event) => {
        // It's gone!
        res(event);
      };
      request.onerror = (event) => {
        rej("could not delete element from db", event);
      };
    });
  };
  const prune = async () => {
    let allElements = await getAll();
    if (allElements) {
      return Promise.all(
        allElements.map((element) => remove(element[this.options.keyPath]))
      );
    }
  };
  const destroy = async () => {
    return new Promise((res, rej) => {
      const req = window.indexedDB.deleteDatabase(this.dbName);
      req.onsuccess = () => {
        res(this.dbName);
      };
      req.onerror = () => {
        rej("couldn't delete database");
      };
      req.onblocked = (event) => {
        log.debug("database is blocked... forcing close: ", event);
        if (this.db) {
          this.db.close();
          destroy();
        }
      };
    });
  };
  const getAll = () => {
    return new Promise((res, rej) => {
      if (this.db === null) {
        rej("no indexed db available");
      }
      const transaction = this.db.transaction([this.storeName], "readwrite");
      let getAllRequest = transaction.objectStore(this.storeName).getAll();
      getAllRequest.onsuccess = (event) => {
        log.debug(`got all db elements`, event.target.result);
        res(event.target.result);
      };
      getAllRequest.onerror = (event) => {
        rej("could not retrieve all elements");
      };
    });
  };
  const get = (query) => {
    return new Promise((res, rej) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.get(query);
      request.onerror = (event) => {
        // Handle errors!
        console.error("could not retrieve element", request.result);
        rej("could not get element via query", query);
      };
      request.onsuccess = (event) => {
        log.debug("retrieved element", request.result);
        res(request.result);
      };
    });
  };
  return {
    open,
    write,
    getAll,
    prune,
    destroy,
    get,
  };
}

export default Store;
