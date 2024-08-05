import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where
} from "firebase/firestore";
import {database} from "../firebase/firebaseConfig";

const getGameAssets = async (gameObject) => {
    const categories = gameObject
        .categories
        .map(cat => cat.category)

    // get categories
    const q = query(
        collection(database, "categories"),
        where('__name__', 'in', categories)
    );
    const categoryDocSnaps = await getDocs(q);
    const cats = []
    categoryDocSnaps.forEach(
        doc => cats.push({categoryId: doc.id, category: doc.data(), questions: []})
    )

    // get questions
    for (let i = 0; i < cats.length; i++) {
        const currentCat = cats[i];
        const catId = currentCat.categoryId;
        const questionsList = gameObject
            .categories
            .filter(cat => cat.category == catId)
        const q = query(
            collection(database, "questions"),
            where("categoryId", "==", catId),
            where('__name__', 'in', questionsList[0].questions)
        );
        const questions = await getDocs(q)
        questions.forEach(doc => {
            currentCat
                .questions
                .push({id: doc.id, question: doc.data()})
        })
    }

    return cats
}

export default getGameAssets