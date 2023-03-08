import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('GET all from the database');
  //might not need this
  //console.error('putDb not implemented');

  //create a connection to the db and version we want to use.
  const todosDb = await openDB('jate', 1);

  //create new transaction and specify the db and data "privileges"
  const tx = todosDb.transaction('jate', 'readwrite');

  //open up the desired object store
  const store = tx.objectStore('jate');

  const request = store.put({ id: 1, value: content })

  //get confirmation of the request
  const result = await request;
  console.log('result.value', result);

}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  //create a connection to the db and version we want
  const todosDb = await openDB('jate', 1);

  //create a new transaction and specify the db and data "privileges".
  const tx = todosDb.transaction('jate', 'readonly');

  //open desired object store.
  const store = tx.objectStore('jate');

  //.get() method to get a all of data from the db 
  const request = store.getAll();

  //get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result?.value;
}

console.error('getDb not implemented');


initdb();
