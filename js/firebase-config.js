/* Firebase client bootstrap.
   The web config is public Firebase project metadata. Secrets stay server-side. */
(function initFirebaseClient() {
  const firebaseConfig = {
    apiKey: "AIzaSyCifIOX5__M2u5JAaY5i1gMeTFWZnUnkoA",
    authDomain: "lernio-b4c65.firebaseapp.com",
    projectId: "lernio-b4c65",
    storageBucket: "lernio-b4c65.firebasestorage.app",
    messagingSenderId: "855648556832",
    appId: "1:855648556832:web:d5f5a182ed89360aefe945",
    measurementId: "G-QPTZZBH7H0"
  };

  window.firebaseReady = false;
  window.firebaseInitError = null;

  try {
    if (!window.firebase || !firebase.initializeApp) {
      throw new Error('Firebase SDK did not load.');
    }

    const app = firebase.apps && firebase.apps.length
      ? firebase.app()
      : firebase.initializeApp(firebaseConfig);

    window.firebaseAuth = firebase.auth(app);
    window.googleProvider = new firebase.auth.GoogleAuthProvider();
    window.firestoreDb = firebase.firestore(app);
    window.firebaseStorage = firebase.storage(app);
    window.firebaseReady = true;
  } catch (error) {
    window.firebaseInitError = error;
    window.firebaseAuth = null;
    window.googleProvider = null;
    window.firestoreDb = null;
    window.firebaseStorage = null;
    console.warn('Firebase is unavailable. Auth and cloud notes will use graceful error states.', error.message);
  }
})();
