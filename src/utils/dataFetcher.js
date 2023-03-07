import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./fireBaseConfig";

const dataFetcher = {

    async getItemCategories(target) {
        const categoryIds = []
        const querySnapshot = await getDocs(collection(db, target));
        querySnapshot.forEach((doc) => {
            categoryIds.push(doc.id)
        })
        return categoryIds
    },

    async getItemSubCategories(collection, category) {
        let subCategoryList = []
        const docRef = doc(db, collection, category)
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const subCategoryObject = docSnap.data()
            for (const prop in subCategoryObject) {
                subCategoryList.push(prop)
            }
        } else {
            console.log("No such document!");
        }
        return subCategoryList.sort()
    },

    async getArticles(category) {
        let subCategoryList = []
        const docRef = doc(db, 'articles', category)
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            subCategoryList = docSnap.data().articles

        } else {
            console.log("No such document!");
        }
        return subCategoryList

    },

}

export default dataFetcher