let register_btn = document.querySelector(".Register-btn");
let login_btn = document.querySelector(".Login-btn");
let form = document.querySelector(".Form-box");
register_btn.addEventListener("click", () => {
  form.classList.add("change-form");
});
login_btn.addEventListener("click", () => {
  form.classList.remove("change-form");
});

  
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

  
  const firebaseConfig = {
    apiKey: "AIzaSyDU1pfKcZwWo-7XVcKGo7y4-5N-3B8pWMA",
    authDomain: "diseases-0160.firebaseapp.com",
    databaseURL: "https://diseases-0160-default-rtdb.firebaseio.com",
    projectId: "diseases-0160",
    storageBucket: "diseases-0160.appspot.com",
    messagingSenderId: "161261773551",
    appId: "1:161261773551:web:473bee6dfbcbae2a3cb11a",
    measurementId: "G-WHXLLRYBDX"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth=getAuth(app);

 
  const submit=document.getElementById('submit');
  submit.addEventListener("click",function(event){
    event.preventDefault()
    const name=document.getElementById('Username').value;
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
   
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      alert("creating Account")
     
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // ..
    });
  })

  