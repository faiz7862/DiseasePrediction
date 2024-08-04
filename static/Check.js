
 
const firebaseConfig = {
    apiKey: "AIzaSyCwhsT7FW8x-UdWJEWHFveg9T3YKg4hjD0",
    authDomain: "precution-dccb7.firebaseapp.com",
    databaseURL: "https://precution-dccb7-default-rtdb.firebaseio.com",
    projectId: "precution-dccb7",
    storageBucket: "precution-dccb7.appspot.com",
    messagingSenderId: "729552669133",
    appId: "1:729552669133:web:6ac0732f134be7b099dc84",
    measurementId: "G-SDS54RYP5H"
  };
  
  
  
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  function getdata() {
      getPrecautions('AIDS');
  }

  function getPrecautions(diseaseName) {
      const databaseRef = database.ref(`symptom_precaution/${diseaseName}`);

      databaseRef.once('value', (snapshot) => {
          const data = snapshot.val();

          if (data) {
              // Update the HTML elements with the fetched data
              document.getElementById('Precaution_1').innerText = data.Precaution_1 || 'Not available';
              document.getElementById('Precaution_2').innerText = data.Precaution_2 || 'Not available';
              document.getElementById('Precaution_3').innerText = data.Precaution_3 || 'Not available';
              document.getElementById('Precaution_4').innerText = data.Precaution_4 || 'Not available';
          } else {
              console.error(`Data for ${diseaseName} not found in Firebase.`);
          }
      });
  }



  function getdata(){
    document.querySelector(".alert").style.display = "block";

    setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
      }, 30000000);
  }

//   function getdata(){
//     document.querySelector(".alert1").style.display = "block";

//     setTimeout(() => {
//         document.querySelector(".alert1").style.display = "none";
//       }, 3000);
//   }

//   function getdata(){
//     document.querySelector(".alert2").style.display = "block";

//     setTimeout(() => {
//         document.querySelector(".alert2").style.display = "none";
//       }, 3000);
//   }

//   function getdata(){
//     document.querySelector(".alert3").style.display = "block";

//     setTimeout(() => {
//         document.querySelector(".alert3").style.display = "none";
//       }, 3000);
//   }