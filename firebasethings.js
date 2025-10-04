// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

console.log("HI! (before error)")

// Your Firebase config (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyCIU-q88QGBqNmydsvnB_HaoONKlSNEAzE",
  authDomain: "blehology.firebaseapp.com",
  databaseURL: "https://blehology-default-rtdb.firebaseio.com",
  projectId: "blehology",
  storageBucket: "blehology.firebasestorage.app",
  messagingSenderId: "166464430045",
  appId: "1:166464430045:web:77566d918ba41c43c86034",
  measurementId: "G-T2T1QWYQ02"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get reference to Realtime Database
const database = firebase.database();   
const rootRef = database.ref();  // Points to root of the database

// Example: Write data to the database
rootRef.set({
  message: "Hello, Firebase!"
}).then(() => {
  console.log("Data written successfully.");
}).catch((error) => {
  console.error("Error writing to database:", error);
});

// Example: Read data from the database
rootRef.on('value', (snapshot) => {
  const data = snapshot.val();
  console.log("Received data:", data);
});