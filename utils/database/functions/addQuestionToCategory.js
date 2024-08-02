import { doc, arrayUnion, increment,updateDoc } from "firebase/firestore";
import { database } from "../firebase/firebaseConfig";

const addQuestionToCategory = async (categoryId, questionId, level) => {
	const docRef = doc(database, "categories", categoryId);
	switch (level) {
		case "easy":
			await updateDoc(docRef, {
		'easyQuestions': arrayUnion(questionId),
		"easyQuestionsCount": increment(1)
	});
			return true;
		case "medium":
			await updateDoc(docRef, {
				'medimQuestions': arrayUnion(questionId),
				"easyQuestionsCount": increment(1)
			});
			return true;
		case "hard":
			const docSnap = await updateDoc(docRef, {
				'hardQuestions': arrayUnion(questionId),
				"easyQuestionsCount": increment(1)
			});
			return true;
	
		default:
			return false;
	}
	
}

export default addQuestionToCategory