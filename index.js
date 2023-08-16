import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";

import { getDatabase, ref, push, get, update,set } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAMx2WJkdBs5_dj6OENln0m5NJvHBgFLno",
  authDomain: "test-e6e38.firebaseapp.com",
  projectId: "test-e6e38",
  storageBucket: "test-e6e38.appspot.com",
  messagingSenderId: "122722000519",
  appId: "1:122722000519:web:1782f493afe455cf33a222",
  databaseURL: "https://test-e6e38-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const user = auth.currentUser;


const apply = document.querySelectorAll(".apply")

apply.forEach(apply => {
 // Add your logic here for each button
 apply.addEventListener('click', () => {
  onAuthStateChanged(auth, (user) => {
   if (user) {
 //user -logged in
     const uid = user.uid;

     //check if uid is registered.
     function checkIfRecordExists(uid) {
      const userRef = ref(database, "users/" + uid);
      
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log("Record exists for UID:", uid);
            window.location.href = "./financials.html"
          } else {
            // Record doesn't exist, execute your code here
            console.log("No record found for UID:", uid);
            // Example: Redirect to a different page
           window.location.href = "./create-account.html";
          }
        })
        .catch((error) => {
          console.error("Error checking record:", error);
        });
    }
    
    // Call the function with the UID you want to check
    const targetUID =  uid;// Replace with theu actual UID
    checkIfRecordExists(targetUID);
    


     
   } else {
     window.location.href ="./create-account.html"
   }
 });





 });
});