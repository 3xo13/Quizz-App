import { collection, query, where, getDocs } from "firebase/firestore"
import { database } from "../firebase/firebaseConfig"

const getQuestionsCollection = async (categoryId) => {
	try {
		const q = query(collection(database, "questions"), where("categoryId" ,"==", categoryId))
		const querySnapshot = await getDocs(q);
		const questions = []
		querySnapshot.forEach((doc) => {
			questions.push({questionsId: doc.id, question: doc.data()})
		});
		return questions
	} catch (error) {
		return error
	}
}

export {getQuestionsCollection}