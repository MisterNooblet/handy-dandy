import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./fireBaseConfig";
const fireBaseAuth = {
    signUp(email, password, firstName, lastName, country) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                this.updateUser(firstName, lastName, country)
                // ...
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // ..
            });

    },

    updateUser(firstName, lastName, country, photo) {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
            displayName: `${firstName} ${lastName}`
        }).then(() => {
            // Profile updated!
            this.addToolBox(country, auth.currentUser.uid)
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        });
    },
    async addToolBox(country, uid) {
        await setDoc(doc(db, `users`, uid), {
            country: country,
            toolbox: [],
        });
    },

    signIn(email, password) {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                // ...
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
            });
    },

    signUserOut(setUser) {
        const auth = getAuth();
        signOut(auth).then(() => {
            setUser(prev => null)
        }).catch((error) => {
            // An error happened.
        });
    }
}

export default fireBaseAuth