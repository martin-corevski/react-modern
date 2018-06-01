import idb from './idb'

// We give version number as a second argument when we open the database, the
// third argument is a function as a callback that gives access to the database.
var dbPromise = idb.open('numbers-store', 1, function (db) {
  // Create object store called 'numbers' if it's not already created.
  if (!db.objectStoreNames.contains('numbers')) {
    // keyPath option by the docs
    // https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/createObjectStore
    // The key path to be used by the new object store. If empty or not specified,
    // the object store is created without a key path and uses out-of-line keys.
    // You can also pass in an array as a keyPath.
    db.createObjectStore('numbers', { keyPath: 'id' })
  }
})

export const writeData = (st, data) => {
  return dbPromise.then(function (db) {
    // With transaction we open the store and set the action to readonly, write or
    // readwrite.
    var tx = db.transaction(st, 'readwrite')
    // Open the store
    var store = tx.objectStore(st)
    // In firebase for each number we have a json like structure:
    // "some-number": {"num": 13, "id": timestamp }
    // By setting the keyPath option on the store to 'id', we know
    // each data object (that we add to idb) to which number (from
    // our firebase) it's connected.
    store.put(data)
    // Close the transaction
    return tx.complete
  })
}

export const readAllData = st => {
  return dbPromise.then(function (db) {
    var tx = db.transaction(st, 'readonly')
    var store = tx.objectStore(st)
    return store.getAll()
  })
}

export const clearAllData = st => {
  return dbPromise.then(function (db) {
    var tx = db.transaction(st, 'readwrite')
    var store = tx.objectStore(st)
    // In order to delete everything, we use clear.
    store.clear()
    return tx.complete
  })
}

export const deleteItem = (st, id) => {
  dbPromise
    .then(function (db) {
      var tx = db.transaction(st, 'readwrite')
      var store = tx.objectStore(st)
      // For single item we need to delete by id.
      store.delete(id)
      return tx.complete
    })
    .then(function () {
      console.log('Deleted item with id: ', id)
    })
}

export const urlBase64ToUint8Array = base64String => {
  var padding = '='.repeat((4 - base64String.length % 4) % 4)
  var base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  var rawData = window.atob(base64)
  var outputArray = new Uint8Array(rawData.length)

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

// export const dataURItoBlob = dataURI => {
//   var byteString = atob(dataURI.split(',')[1])
//   var mimeString = dataURI
//     .split(',')[0]
//     .split(':')[1]
//     .split(';')[0]
//   var ab = new ArrayBuffer(byteString.length)
//   var ia = new Uint8Array(ab)
//   for (var i = 0; i < byteString.length; i++) {
//     ia[i] = byteString.charCodeAt(i)
//   }
//   var blob = new Blob([ab], { type: mimeString })
//   return blob
// }
