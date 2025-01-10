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

onAuthStateChanged(auth, (user) => {
 if (user) {
const targetUID = user.uid;

function populateFinancialInfo(data) {
    const fullNameElement = document.getElementById("fullName");
    const nationalIDElement = document.getElementById("nationalID");
    const emailElement = document.getElementById("email");
    const phoneNumberElement = document.getElementById("phoneNumber");
    const selectedCoursesElement = document.getElementById("selectedCourses");
    const courseCostsElement = document.getElementById("courseCosts");
    const paymentsAndBalancesElement = document.getElementById("paymentsAndBalances");

    fullNameElement.innerText =  data.fullName;
    nationalIDElement.textContent =  data.nationalID;
    emailElement.textContent =  data.email;
    phoneNumberElement.textContent =   data.phoneNumber;
    selectedCoursesElement.textContent =  data.selectedCourses;

    // Clear existing content
    courseCostsElement.innerText ="Total Costs : R" +data.totalCost;
    paymentsAndBalancesElement.innerHTML = "";

   

    
}

// Fetch data from Firebase and populate the UI
const userRef = ref(database, "users/" + targetUID);
get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
        const userData = snapshot.val();
        populateFinancialInfo(userData);
    } else {
        console.log("No data found for the user.");
    }
}).catch((error) => {
    console.error("Error fetching user data:", error);
});
 }
else {
 // User is signed out
 
}
});



// Logout button functionality
const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", () => {
   auth.signOut().then(() => {
      // Sign-out successful, redirect to login page or desired location
      window.location.href = "/p/3login.html";
   }).catch((error) => {
      console.error("Logout error:", error);
      // Handle error if necessary
   });
});
