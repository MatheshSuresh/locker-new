import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAKN5RVEO7gAaZldB4qaU8NSeFeb512BMA",
    authDomain: "smart-locker-ea017.firebaseapp.com",
    projectId: "smart-locker-ea017",
    storageBucket: "smart-locker-ea017.appspot.com",
    messagingSenderId: "636337196688",
    appId: "1:636337196688:web:d5198c2c8588e73801d215"
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };