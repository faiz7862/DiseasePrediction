

  
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

  
  const firebaseConfig = {
    apiKey: "AIzaSyDJNMtSZrVHM_v3rN3-d0N6nVX4cuad6CI",
    authDomain: "neww-ca8dd.firebaseapp.com",
    projectId: "neww-ca8dd",
    storageBucket: "neww-ca8dd.appspot.com",
    messagingSenderId: "548993380911",
    appId: "1:548993380911:web:449dc222ddf56c40c34cda"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth=getAuth(app);


  const login=document.getElementById('login');
  submit.addEventListener("click",function(event){
    event.preventDefault()
    
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      alert("Login Account") 
      window.location.href="About.html";
     
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // ..
    });
  })

  