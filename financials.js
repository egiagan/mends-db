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
      window.location.href = "/login.html";
   }).catch((error) => {
      console.error("Logout error:", error);
      // Handle error if necessary
   });
});