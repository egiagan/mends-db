import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";

import { getDatabase, ref, push, get, update, set } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

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

//id validation functin
function isValidSAID(id) {
  const regex = /^[0-9]{13}$/;
  if (!regex.test(id)) {
    return false;
  }

  const year = parseInt(id.substr(0, 2));
  const month = parseInt(id.substr(2, 2));
  const day = parseInt(id.substr(4, 2));

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  // Additional validation logic can be added here, such as checking the birth date against today's date.

  return true;
}



onAuthStateChanged(auth, (user) => {
  if (user) {
    //check if registered
    const uid = user.uid;
    function checkIfRecordExists(uid) {
      const userRef = ref(database, "users/" + uid);

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log("Record exists for UID:", uid);
            alert("Already Registed , Login")
            window.location.href = "./login.html"
          } else {
            // Record doesn't exist, execute your code here
            console.log("Not Yet Registered", uid);
          }
        })
        .catch((error) => {
          console.error("Error checking record:", error);
        });
    }

    // Call the function with the UID you want to check
    const targetUID = uid;// Replace with theu actual UID
    checkIfRecordExists(targetUID);





    const emailInput = document.getElementById("email");
    const fullName = document.getElementById("fullName");
    const phoneNumberInput = document.getElementById("phoneNumber");

    // Set input values with user data
    emailInput.value = user.email;
    fullName.value = user.displayName;
    phoneNumberInput.value = user.phoneNumber;

    const applicationForm = document.getElementById("applicationForm");

    // Course costs map
    const courseCosts = {
      "Forestry": 13050.00,
      "Funiture Making": 13050.00,
      "Clothing": 13050.00,
      "Textile": 13050.00,
      "Footware": 13050.00,
      "Leather Manufacturing Processes": 13050.00,
      "General Forestry": 13050.00,
      "Clothing Manufacturing Proccesses": 13050.00,
      "Information Technology (System Development)": 13050.00,
      "Information Technology (Technical Support)": 13050.00,
      "Business Analysis": 20250.00,
      "Information And Communication Technology": 20250.00,
      "Film and Television Production": 20250.00,
      "Animal Production": 10650.00,
      "Farming": 10650.00,
      "Plant Production": 10650.00,
      "HortiCulture": 10650.00,
      // Add more courses and their costs here
    };

    // Add a submit event listener to the form
    applicationForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent the default form submission

      // Get the form values
      const fullNameValue = document.getElementById("fullName").value;
      const nationalID = document.getElementById("nationalID").value;
      const emailValue = emailInput.value;
      const phoneNumberValue = phoneNumberInput.value;
      const selectedCourses = document.getElementById("selectedCourses").value;


      if (!isValidSAID(nationalID)) {
        alert("Please enter a valid South African ID.");
        return;
      }

      // Calculate total cost based on selected courses
      const selectedCourseList = selectedCourses.split(",");
      let totalCost = 0;
      selectedCourseList.forEach(course => {
        const trimmedCourse = course.trim();
        if (courseCosts[trimmedCourse]) {
          totalCost += courseCosts[trimmedCourse];
        }
      });



      // Create an object with student details and total cost
      const studentDetails = {
        fullName: fullNameValue,
        nationalID,
        email: emailValue,
        phoneNumber: phoneNumberValue,
        selectedCourses,
        totalCost,
      };

      // Set the student details to the database under the user's UID
      const userRef = ref(database, "users/" + uid);
      set(userRef, studentDetails)
        .then(() => {
          console.log("Student details uploaded successfully!");
          window.location.href = "/financials.html"
        })
        .catch((error) => {
          console.error("Error uploading student details:", error);
          // Handle the error
        });
    });
  } else {
    // User is signed out
    alert("Create Account Or Login To Apply!");
    window.location.href = "/login.html";
  }
});


