import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";

import { getDatabase, ref, push, get, update,set } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDAlth1sxiP-S3r3fVDXhwadVVnEvpdO6s",
  authDomain: "login-egi-agan.firebaseapp.com",
  databaseURL: "https://login-egi-agan-default-rtdb.firebaseio.com",
  projectId: "login-egi-agan",
  storageBucket: "login-egi-agan.firebasestorage.app",
  messagingSenderId: "395059466114",
  appId: "1:395059466114:web:5c6b0621e9739df6b5c99b"
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
     window.location.href ="/p/3create-account.html"
   }
 });





 });
});
