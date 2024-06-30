import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: <your apiKey>,
    authDomain: <your authDomain>,
    projectId: <your projectId>,
    storageBucket: <your storageBucket>,
    messagingSenderId: <your messagingSenderId>,
    appId: <your appId>
};

export const app = initializeApp(firebaseConfig);
