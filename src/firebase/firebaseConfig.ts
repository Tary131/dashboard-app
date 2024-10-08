import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBulKFMJYT8MbGTxKCEM8Pdc7G8lZMSrvc',
  authDomain: 'dashboard-project-68306.firebaseapp.com',
  databaseURL:
    'https://dashboard-project-68306-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'dashboard-project-68306',
  storageBucket: 'dashboard-project-68306.appspot.com',
  messagingSenderId: '376307678290',
  appId: '1:376307678290:web:40710fadf76c26f336f38b',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
