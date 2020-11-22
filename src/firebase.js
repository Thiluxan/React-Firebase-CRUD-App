import firebase from 'firebase'

var firebaseConfig = {
    /*
        Firebase Credentials

    */
  };
  // Initialize Firebase
  var fireDb = firebase.initializeApp(firebaseConfig);

  export default fireDb.database().ref()