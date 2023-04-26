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
        console.log(`db load: onupgradeneeded`, {
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
        console.log(`db load: onsuccedd`, {
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
    console.log("writing to db", this.db);
    return new Promise((res, rej) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      // Do something when all the data is added to the database.
      transaction.oncomplete = (event) => {
        console.log("write done.", event);
        res(event);
      };
      transaction.onerror = (event) => {
        // Don't forget to handle errors!
        rej("could not write to database");
      };
      const objectStore = transaction.objectStore(this.storeName);
      data.forEach((customer) => {
        const request = objectStore.add(customer);
        request.onsuccess = (event) => {
          // event.target.result === customer.ssn;
          console.log("added element", event.target.result);
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
    return Promise.all(
      allElements.map((element) => remove(element[this.options.keyPath]))
    );
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
        console.log("database is blocked... forcing close: ", event);
        if (this.db) {
          this.db.close();
          destroy();
        }
      };
    });
  };
  const getAll = () => {
    return new Promise((res, rej) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      let getAllRequest = transaction.objectStore(this.storeName).getAll();
      getAllRequest.onsuccess = (event) => {
        console.log(`got all db elements`, event.target.result);
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
        console.log("retrieved element", request.result);
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
