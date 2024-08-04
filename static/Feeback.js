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
firebase.initializeApp(firebaseConfig);
var contactFormDB=firebase.database().ref('contactform');
document.getElementById('contactform').addEventListener('submit',submitForm);   

function submitForm(e){
    e.preventDefault();
    var name=getElementval("name");
    var emailid=getElementval("emailid");
    var contactno=getElementval("contact");
    var msgContent=getElementval("msgContent");
    saveMessage(name,emailid,contactno,msgContent);
    document.querySelector(".alert").style.display = "block";

    setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
      }, 3000);
      
      document.getElementById('contactform').reset();  
    // console.log(name,emailid,contactno,msgContent);
}

var saveMessage=(name,emailid,contactno,msgContent)=>{
    var newContactForm=contactFormDB.push();
    newContactForm.set({
        name:name,
        emailid:emailid,
        contactno:contactno,
        msgContent:msgContent,

    });

};

const getElementval=(id)=>{
    return document.getElementById(id).value;
};
