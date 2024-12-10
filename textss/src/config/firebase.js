
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";



const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_FIREBASE_APPID,
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const signUp = async ({username, email, password}) => {
    try {
        const  res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid), {
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey, There I am using text app",
            lastSeen:Date.now()
        })
        await setDoc(doc(db, "chat", user.uid), {
            chatData: []
        })
    } catch (error) {
        console.error("Error creating user:", error.code, error.message);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


const login = async ({email, password}) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);

    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = async() => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const resetPass = async (email) => {
    if (!email) {
        toast.error("Enter your email");
        return null;
    } else {
        try {
            const userRef = collection(db, 'users');
            const q = query(userRef, where("email", "==", email));
            const querySnap = await getDocs(q);
            if(!querySnap.empty) {
                await sendPasswordResetEmail(auth, email);
                toast.success("Reset email sent")
            } else {
                toast.error("Email doesn't exist")
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }
}

export {signUp, login, logout, auth, db, resetPass};
