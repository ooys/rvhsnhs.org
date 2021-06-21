import firebase from "firebase/app";

const config = {
    apiKey: "AIzaSyBRCbuoZrKVyX7uaY4D6rhweyJe8c9eWd0",
    authDomain: "rvhnhs.firebaseapp.com",
    projectId: "rvhnhs",
    storageBucket: "rvhnhs.appspot.com",
    messagingSenderId: "1025703440662",
    appId: "1:1025703440662:web:8a87606c3d2e0a9a6ca037",
};

export default function initFirebase() {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
}
