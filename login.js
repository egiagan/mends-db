import { getAuth, signInWithPopup, GoogleAuthProvider , signInWithEmailAndPassword , onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
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
const provider = new GoogleAuthProvider();
auth.languageCode = 'en';
const database = getDatabase(app);


let registered = false; // Define the 'registered' variable at a broader scope

const google = document.getElementById("google");
google.addEventListener("click", function (event) {
  event.preventDefault();

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      window.location.href = "./register.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      const credential = GoogleAuthProvider.credentialFromError(error);
      alert(errorMessage);
    });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);

    function checkIfRecordExists(uid) {
      const userRef = ref(database, "users/" + uid);

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log("Already Registered:", uid);
            registered = true;
          } else {
            console.log("Not Registered", uid);
            registered = false;
          }
        })
        .catch((error) => {
          console.error("Error checking record:", error);
        });
    }

    const targetUID = uid;
    checkIfRecordExists(targetUID);
  } else {
    // User is signed out
  }
});

const login = document.getElementById("login");
login.addEventListener("click", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      if (registered) {
        alert("Already Registered");
        window.location.href = "./financials.html";
        
      } else {
        window.location.href = "./register.html";
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});