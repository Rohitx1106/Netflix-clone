import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAJ_mgawcphQiQsaLZ6O5m8M0HNwf5b5jY",
  authDomain: "netflix-clone-41af2.firebaseapp.com",
  projectId: "netflix-clone-41af2",
  storageBucket: "netflix-clone-41af2.appspot.com",
  messagingSenderId: "1023012200906",
  appId: "1:1023012200906:web:3528afc4ae8584cb8d6f33"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password );
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name, 
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const login = async (email, password)=>{
    try {
        signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};
