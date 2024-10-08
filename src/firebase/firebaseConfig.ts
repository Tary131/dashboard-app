import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBulKFMJYT8MbGTxKCEM8Pdc7G8lZMSrvc',
  authDomain: 'dashboard-project-68306.firebaseapp.com',
  projectId: 'dashboard-project-68306',
  storageBucket: 'dashboard-project-68306.appspot.com',
  messagingSenderId: '376307678290',
  appId: '1:376307678290:web:40710fadf76c26f336f38b',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
