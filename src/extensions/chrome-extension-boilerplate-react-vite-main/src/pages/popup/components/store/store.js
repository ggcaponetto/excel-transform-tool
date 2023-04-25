function Store(dbName, storeName, options) {
  this.dbName = dbName;
  this.storeName = storeName;
  this.options = options;
  this.db = null;

  const open = () => {
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
    const transaction = this.db.transaction([this.storeName], "readwrite");
    // Do something when all the data is added to the database.
    transaction.oncomplete = (event) => {
      console.log("All done!", event);
    };

    transaction.onerror = (event) => {
      // Don't forget to handle errors!
    };
    const objectStore = transaction.objectStore(this.storeName);
    data.forEach((customer) => {
      const request = objectStore.add(customer);
      request.onsuccess = (event) => {
        // event.target.result === customer.ssn;
        console.log("added " + JSON.stringify(event.target.result));
      };
    });
  };
  const getAll = (cb) => {
    const transaction = this.db.transaction([this.storeName], "readwrite");
    return (transaction.objectStore(this.storeName).getAll().onsuccess = (
      event
    ) => {
      console.log(`Got all results`, event.target.result);
      cb(event.target.result);
    });
  };
  return {
    open,
    write,
    getAll,
  };
}
export default Store;
