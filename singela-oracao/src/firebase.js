import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGwoaoZjcvWX1kXvYOouHHr2P6aFS9y84",
  authDomain: "singela-oracao.firebaseapp.com",
  projectId: "singela-oracao",
  storageBucket: "singela-oracao.firebasestorage.app",
  messagingSenderId: "205266123929",
  appId: "1:205266123929:web:8513a5765aad47c5644c08",
  measurementId: "G-G91Q62QSMK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);