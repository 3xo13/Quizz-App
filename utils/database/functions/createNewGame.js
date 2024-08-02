import { database } from "@/utils/database/firebase/firebaseConfig"
import { collection, addDoc } from "firebase/firestore"

const createNewGame = async (gameInfo, categories) => {
	const gameObject = {
		title: gameInfo.name,
		team1: gameInfo.team1,
		team2: gameInfo.team2,
		userId: "1",
		categories
	};

	try {
		const newGame = await addDoc(collection(database, 'games'), gameObject);
		return newGame.id
	} catch (error) {
		return error
	}
}

export { createNewGame }