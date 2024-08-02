import {getQuestionsCollection} from '@/utils/database/functions/getQuestionsCollection';
import {getRandomQuestion} from '@/utils/helpers/getRandomQuestion';
import { handleLevelChange } from '@/utils/stateFunctions/handleLevelChange';
import React, {useEffect, useState} from 'react'
import {v4 as uuidv4} from 'uuid';

const QuestionsOptions = (
    {numberOfQuestions, parentIndex, setQuizzList, quizz, setGameObject}
) => {
    const [currentValue, setCurrentValue] = useState([])
    const [currentQuestions, setCurrentQuestions] = useState([])
    const [allQuestions, setAllQuestions] = useState([])
    const [easyQuestions, setEasyQuestions] = useState([])
    const [mediumQuestions, setMediumQuestions] = useState([])
    const [hardQuestions, setHardQuestions] = useState([])

    const [optionsList, setOptionsList] = useState([])

		// fetch questions of current category
    useEffect(() => {
        if (quizz) {
            setCurrentValue(quizz.quizz.questionLevels)
        };
        (async () => {
            const questions = await getQuestionsCollection(quizz.id)
            setAllQuestions(questions)
        })()
    }, [])

		// filter the category's questions by level
    useEffect(() => {
        if (allQuestions.length) {
            const easy = allQuestions.filter(quest => quest.question.level == "easy")
            const medium = allQuestions.filter(quest => quest.question.level == "medium")
            const hard = allQuestions.filter(quest => quest.question.level == "hard")
            setEasyQuestions(easy)
            setMediumQuestions(medium)
            setHardQuestions(hard)
        };
    }, [allQuestions]);

		// add random questions to the parent category
		useEffect(() => {
			if (currentQuestions.length === 6) {
				setGameObject(prev => {
					return prev.map((obj, i) => {
						if (i === parentIndex) {
							return {
								...obj,
								questions: currentQuestions
							}
						}
						return obj
					})
				})
			}
		},[currentQuestions])

		// create oprtions and assign questions based on level
		useEffect(() => {
        if (easyQuestions.length && mediumQuestions.length && hardQuestions.length) {
            const getRandomEasy = getRandomQuestion(easyQuestions)
            const getRandomMedium = getRandomQuestion(mediumQuestions)
            const getRandomHard = getRandomQuestion(hardQuestions)

            for (let i = 0; i < numberOfQuestions; i++) {
                const currentRandomQuestion = currentValue[i] == "easy"
								? getRandomEasy()
								: currentValue[i] == "medium"
								? getRandomMedium()
								: currentValue[i] == "hard"
								? getRandomHard()
								: {}

                let questionId = "";
                let question = "";
                let answer = "";
                if (Object.keys(currentRandomQuestion).length) {
									questionId = currentRandomQuestion.questionsId;
                    question = currentRandomQuestion.question.question;
                    answer = currentRandomQuestion.question.answer;

                    setCurrentQuestions(prev => [
                        ...prev,
                        questionId
                    ])
                }

                const levelOptions = <div className=''>
                    <select
                        value={currentValue[i]}
                        onChange={e => handleLevelChange(e, i, parentIndex, setCurrentValue, setQuizzList)}
                        className='py-1 px-2 rounded bg-white shadow shadow-black/50'>
                        <option value={"easy"}>Easy</option>
                        <option value={"medium"}>Medium</option>
                        <option value={"hard"}>Hard</option>
                    </select>
                </div>
                const questionOption = <div key={uuidv4()} className='row w-full'>
                    <div className='row gap-3 w-4/12'>
                        <h5 className='text-gray-700'>{`Question ${i + 1} : `}</h5>
                        {levelOptions}
                    </div>
                    <div className='w-8/12 col'>
                        <p>{`Question: ${question}`}</p>
                        <p>{`Answer: ${answer}`}</p>
                    </div>

                </div>;
                setOptionsList(prev => [
                    ...prev,
                    questionOption
                ])
            }
        }
    }, [easyQuestions, mediumQuestions, hardQuestions, quizz])

    return (<div className='col gap-3 w-full'>{optionsList}</div>)
}

export default QuestionsOptions