import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, OAuthProvider, updateProfile } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";


const firebaseConfig = {
  apiKey: "AIzaSyAMx2WJkdBs5_dj6OENln0m5NJvHBgFLno",
  authDomain: "test-e6e38.firebaseapp.com",
  projectId: "test-e6e38",
  storageBucket: "test-e6e38.appspot.com",
  messagingSenderId: "122722000519",
  appId: "1:122722000519:web:1782f493afe455cf33a222"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');
auth.languageCode = 'en';

const register = document.getElementById("register")
register.addEventListener("click", function (event) {
  event.preventDefault()


  const email = document.getElementById("email").value;
  const displayName = document.getElementById("fullName").value;
  const phoneNumber = document.getElementById('phoneNumber').value
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Email validation using a simple regular expression
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Invalid email address!");
    return;
  }

  const phoneNumberPattern = /^\d{10}$/; // Assuming 10-digit phone numbers
  if (!phoneNumberPattern.test(phoneNumber)) {
    alert("Invalid phone number!");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password, displayName, phoneNumber)
    .then((userCredential) => {
      const user = userCredential.user;
      const seed = displayName;
      updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: "https://api.dicebear.com/6.x/adventurer/svg?" + seed,
        phoneNumber: phoneNumber,
      }).then(() => {
        // Profile updated!
        // ...
      }).catch((error) => {
        // An error occurred
        // ...
      });
      alert("Account Created , login and apply!")
      window.location.href = "./login.html"
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });
})



const google = document.getElementById("google")
google.addEventListener("click", function (event) {
  event.preventDefault()

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      window.location.href = "./register.html";
    }).catch((error) => {

      const errorCode = error.code;
      const errorMessage = error.message;

      const credential = GoogleAuthProvider.credentialFromError(error);
      alert(errorMessage)
    });
})
 /*
const microsoft = document.getElementById("microsoft")
microsoft.addEventListener("click", function(){


signInWithPopup(auth, microsoftProvider)
 .then((result) => {
   // User is signed in.
   // IdP data available in result.additionalUserInfo.profile.

   // Get the OAuth access token and ID Token
   const credential = OAuthProvider.credentialFromResult(result);
   const accessToken = credential.accessToken;
   const idToken = credential.idToken;
 })
 .catch((error) => {
   // Handle error.
 });

})*/