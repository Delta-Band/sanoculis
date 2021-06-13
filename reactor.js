import firebase from 'firebase/app';
import 'firebase/firestore';

const getStructuredData = (order, querySnapshot) => {
  const structuredData = [];
  order.forEach((itemId) => {
    const item = querySnapshot.docs.find((itm) => itm.id === itemId).data();
    if (item.published === 'Publish') {
      Object.keys(item).forEach(function (key) {
        if (item[key].seconds) {
          item[key] = item[key].toDate().toString();
        }
      });
      const structuredItem = Object.assign({}, { id: itemId }, item);
      structuredData.push(structuredItem);
    }
  });
  return structuredData;
};

const getCollection = async (collectionId) => {
  const ref = firebase.firestore().collection('collections').doc(collectionId);
  const collection = await ref.get();
  const order = collection.data().order;
  const items = await ref.collection('data').get();
  if (order === '') {
    return [];
  }
  return getStructuredData(order.split(' | '), items);
};

const getDoc = async (pageId) => {
  const ref = firebase.firestore().collection('pages').doc(pageId);
  const page = await ref.get();
  const data = page.data().data;
  Object.keys(data).forEach(function (key) {
    if (data[key].seconds) {
      data[key] = data[key].toDate().toString();
    }
  });
  return data;
};

const subscribeToCollection = async (
  collectionId,
  cb,
  options = {
    preLoad: []
  }
) => {
  let order = [];
  let querySnapshot = [];
  const ref = firebase.firestore().collection('collections').doc(collectionId);

  ref.onSnapshot((doc) => {
    order = doc.data().order.split(' | ');
    if (querySnapshot.length) {
      cb(getStructuredData(order, querySnapshot, options.preLoad));
    }
  });

  ref.collection('data').onSnapshot((_querySnapshot) => {
    querySnapshot = _querySnapshot;
    if (order.length) {
      cb(getStructuredData(order, querySnapshot, options.preLoad));
    }
  });
};

const subscribeToPage = async (pageId, cb) => {
  const ref = firebase.firestore().collection('pages').doc(pageId);

  ref.onSnapshot((doc) => {
    cb(doc.data().data);
  });
};

const init = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'AIzaSyCVoJ1fNik-brXSirPwXfzEzpK4HDJyIdE',
      authDomain: 'reactor-dam.firebaseapp.com',
      databaseURL: 'https://reactor-dam.firebaseio.com',
      projectId: 'reactor-dam',
      storageBucket: 'reactor-dam.appspot.com',
      messagingSenderId: '198256799515',
      appId: '1:198256799515:web:3cf8edc02e02434b466dbe'
    });
  }
};

export default {
  init,
  getCollection,
  getDoc,
  subscribeToCollection,
  subscribeToPage
};
