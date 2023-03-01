import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// let fbApiKey
// let fbAuthDomain
// let fbProjectId
// let fbStorageBucket
// let fbMessagingSenderId
// let fbAppId

// if (process.env.NODE_ENV !== 'production') {
//     fbApiKey = process.env.REACT_APP_API_KEY
//     fbAuthDomain = process.env.REACT_APP_AUTH_DOMAIN
//     fbProjectId = process.env.REACT_APP_PROJECT_ID
//     fbStorageBucket = process.env.REACT_APP_STORAGE_BUCKET
//     fbMessagingSenderId = process.env.REACT_APP_MESSAGING_SENDER_ID
//     fbAppId = process.env.REACT_APP_APP_ID
// } else {
//     fbApiKey = process.env.API_KEY
//     fbAuthDomain = process.env.AUTH_DOMAIN
//     fbProjectId = process.env.PROJECT_ID
//     fbStorageBucket = process.env.STORAGE_BUCKET
//     fbMessagingSenderId = process.env.MESSAGING_SENDER_ID
//     fbAppId = process.env.APP_ID
// }


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)