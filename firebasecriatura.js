  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

  console.log("HI! (before error)");

  // Your Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyCIU-q88QGBqNmydsvnB_HaoONK1SNEAzE",
    authDomain: "blehology.firebaseapp.com",
    databaseURL: "https://blehology-default-rtdb.firebaseio.com",
    projectId: "blehology",
    storageBucket: "blehology.firebasestorage.app",
    messagingSenderId: "166464430045",
    appId: "1:166464430045:web:77566d918ba41c43c86034",
    measurementId: "G-T2T1QWYQ2"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Get reference to Realtime Database
  const database = getDatabase(app);
  const rootRef = ref(database);

  console.log("Firebase initialized!", rootRef);

//Create a reference to any node (e.g. "items")
  const itemsRef = ref(database, 'items');

  //Push data to your new database
  const newItemRef = push(itemsRef);
  set(newItemRef, {
    name: "First test item",
    createdAt: new Date().toISOString()
  })
  .then(() => console.log("✅ Data pushed to new DB!"))
  .catch((err) => console.error("❌ Error:", err));