// Import the functions you need from the SDKs you need
import {initializeApp, getApps} from 'firebase/app'
import {getAuth, initializeAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const API_KEY = process.env.API_KEY;
console.log("🚀 ~ API_KEY:", API_KEY)
const AUTH_DOMAIN = process.env.AUTH_DOMAIN;
const PROJECT_ID = process.env.PROJECT_ID;
const STORAGE_BUCKET = process.env.STORAGE_BUCKET;
const MESSAGING_SENDER_ID = process.env.MESSAGING_SENDER_ID;
const APP_ID = process.env.APP_ID;
const DATABASE_URL = process.env.DATABASE_URL;

const firebaseConfig = {
    apiKey: API_KEY,

    authDomain: AUTH_DOMAIN,

    databaseURL: DATABASE_URL,

    projectId: PROJECT_ID,

    storageBucket: STORAGE_BUCKET,

    messagingSenderId: MESSAGING_SENDER_ID,

    appId: APP_ID
}




// initialize the app if it doesn't already exist
let app = initializeApp(firebaseConfig);
// if (
//     !getApps()
//         ?.length
// ) {
//     app = initializeApp(firebaseConfig)
//     initializeAuth(app)
// } else {
//     app = getApps()[0]
// }
const auth = getAuth(app)

const database = getFirestore(app)

const storage = getStorage(app)

export {
    database,
    auth,
    storage
}
