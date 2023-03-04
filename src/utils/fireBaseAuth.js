import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./fireBaseConfig";



const fireBaseAuth = {
    // signUp(email, password, firstName, lastName, country) {
    //     const auth = getAuth();
    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             // Signed in 
    //             this.updateUser(firstName, lastName, country)
    //             // ...
    //         })
    //         .catch((error) => {
    //             // const errorCode = error.code;
    //             // const errorMessage = error.message;
    //             // ..
    //         });

    // },

    async signUp(email, password, firstName, lastName, country) {
        const auth = getAuth();
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            const result = response.user
            return result
        } catch (error) {
            const code = error.code
            const message = error.message
            return { code, message }
        }

    },

    updateUser(firstName, lastName, country, photo) {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
            displayName: `${firstName} ${lastName}`
        }).then(() => {
            // Profile updated!
            this.addExtraInfo(country, auth.currentUser.uid)

            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        });
    },
    async addExtraInfo(country, uid) {
        await setDoc(doc(db, `users`, uid), {
            country: country,
            toolbox: [],
            isAdmin: false
        });
        this.signUserOut()

    },
    async updateExtraInfo(uid, toolbox, country) {
        if (country && toolbox) {
            await updateDoc(doc(db, `users`, uid), {
                country: country,
                toolbox: toolbox,

            });
        } else if (country) {
            await updateDoc(doc(db, `users`, uid), {
                country: country,
            });
        } else if (toolbox) {
            await updateDoc(doc(db, `users`, uid), {
                toolbox: toolbox,
            });
        }
    },

    async signIn(email, password) {
        const auth = getAuth();
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            const result = response.user
            return result


        } catch (error) {
            const code = error.code
            const message = error.message
            return { code, message }
        }
    },

    signUserOut() {
        const auth = getAuth();
        signOut(auth).then(() => {
            //userLogged out
        }).catch((error) => {
            // An error happened.
        });
    }
}

export default fireBaseAuth