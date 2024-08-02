import {Timestamp} from "firebase/firestore";

const QuizzModel = (title, imageUrl) => {
    return {
        title: title.trim(),
        image: imageUrl,
        gamesCreated: 0,
        createdAt: Timestamp.now(),
        easyQuestions: [],
        easyQuestionsCount: 0,
        mediumQuestions: [],
        mediumQuestionsCount: 0,
        hardQuestions: [],
        hardQuestionsCount: 0
    }
}

export default QuizzModel