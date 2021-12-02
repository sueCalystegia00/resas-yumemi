import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeWc0S56fCOLtwHg2XdYxSt9gaRBr34Qo",
  authDomain: "resas-yumemi.firebaseapp.com",
  projectId: "resas-yumemi",
  storageBucket: "resas-yumemi.appspot.com",
  messagingSenderId: "500762833016",
  appId: "1:500762833016:web:26b24550b3568c4afb7d8d",
};
// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App).use(store).use(router).mount("#app");
