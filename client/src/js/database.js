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
  console.error('putDb not implemented');
  //create connection to db and specify version
  const jateDb = await openDB('jate', 1);
  //create new transaction and specify the db
  const tx = jateDb.transaction('jate', 'readwrite');
  //open up the specific object store
  const store = tx.objectStore('jate');
  //use .add() method to the store and pass in content
  const request = store.add({ todo: content});
  //confirm request
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('getDb not implemented');
  //create connection
  const jateDb = await openDB('jate', 1);
  //new transaction specify read only
  const tx = jateDb.transaction('jate', 'readonly');
  //open desired object store
  const store = tx.objectStore('jate');
  //use get all method to get all data
  const request = store.getAll();
  //confirm reauest
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
