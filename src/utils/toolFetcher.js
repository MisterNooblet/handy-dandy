import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./fireBaseConfig";

const toolFetcher = {

    async getTools(category, subcategory, tool) {
        let subCategoryList = []
        const docRef = doc(db, `${category}`, subcategory)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const subCategoryObject = docSnap.data()
            const ordered = Object.keys(subCategoryObject).sort().reduce(
                (obj, key) => {
                    obj[key] = subCategoryObject[key];
                    return obj;
                },
                {}
            );
            for (const prop in ordered) {
                if (prop === tool) {
                    ordered[`${prop}`].forEach(element => {
                        if (element.type !== 'categoryInfo') {
                            subCategoryList.push(element)
                        }

                    })
                }
            }
            return subCategoryList
        } else {
            console.log("No such document!");
        }
        // setResults(subCategoryList)

    },

    async getItemSubCategories(category, subcategory) {
        let subCategoryList = []
        const docRef = doc(db, `${category}`, subcategory)
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const subCategoryObject = docSnap.data()
            const ordered = Object.keys(subCategoryObject).sort().reduce(
                (obj, key) => {
                    obj[key] = subCategoryObject[key];
                    return obj;
                },
                {}
            );
            for (const prop in ordered) {
                if (prop !== 'categoryInfo') {
                    ordered[`${prop}`].forEach(element => {
                        if (element.type === 'categoryInfo') {
                            subCategoryList.push({ ...element, id: prop })
                        }
                    })
                }
            }
        } else {
            console.log("No such document!");
        }
        return subCategoryList

    },

    async fetchCategories(location) {
        const categories = []

        const querySnapshot = await getDocs(collection(db, location));
        querySnapshot.forEach((doc) => {
            let id = doc.id
            let info = doc.get('categoryInfo')
            categories.push({ ...info, id: id })
        })
        return categories

    }
}

export default toolFetcher