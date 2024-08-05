"use client"
import Image from 'next/image';
import React, {useEffect, useState} from 'react'
import {v4 as uuidv4} from 'uuid';
import { useStore } from '../stateManager/DataStore';

const CategoryAndQuestions = (
    {categoryObj}
) => {
    const {category, questions} = categoryObj;
    const [sortedQuestion, setSortedQuestions] = useState([])

	const setCurrentQuestion = useStore(state => state.setCurrentQuestion);
	const setShowQuestion = useStore(state => state.setShowQuestion);
    const gameRecord = useStore(state => state.gameRecord);

    const currentRecordCategory = gameRecord?.categories?.filter(cat => cat.category == category.title)?.[0];
    

    // sort questions by level
    // note: without using useEffect here the sorting operation is causing a
    // hydration error
    useEffect(() => {
        const sorted = questions.sort((a, b) => a.question.points > b.question.points)
        setSortedQuestions(sorted)
    }, [])

    const handleQuestionClick = (e, questionValue, index) => {
        const question = { ...questionValue, index }
			setCurrentQuestion(question)
			setShowQuestion(true)
    }

    const questionsList = sortedQuestion.map((questionObj, index) => {
        const isAvaliable = currentRecordCategory?.questions?.[index];
        return (
            <button
            disabled={!isAvaliable}
                key={uuidv4()}
                onClick={e => handleQuestionClick(e, questionObj.question, index)}
                className={`border-2 h-fit border-gray-400
						 hover:border-white  p-2 rounded-lg w-2/3 
                         ${isAvaliable ? 
                         "hover:bg-white hover:shadow-white hover:shadow bg-white/40" :
                         "bg-gray-500"}`}>
                <p className='text-2xl gradientText font-bold text-center'>
                    {questionObj.question.points}
                </p>
            </button>
        )
    });

    return (
        <div
            className='col relative min-h-48 rounded-xl shadow-lg shadow-gray-400 h-fit'>
            <div className='w-full h-fit z-10 flex-center pt-3 '>
                <p className='gradientText text-lg font-bold'>{category.title}</p>
            </div>
            <div className='w-full row h-fit z-10'>
                <div
                    className='w-full h-fit grid grid-cols-3 grid-rows-2
							 gap-3 place-content-center justify-items-center h-48 z-10 pb-3'>
                    {questionsList}
                </div>
            </div>

            {/* background image and white overlay */}
            <div className='w-full h-full absolute z-0 '>
                <div className='bg-white/80 absolute w-full h-full z-10 rounded-xl '></div>
                <Image
                    src={category.image}
                    width={400}
                    height={400}
                    alt='category image'
                    className='w-full h-full object-cover object-center z-0 rounded-xl border border-white/10 '/>
            </div>
        </div>
    )
}

export default CategoryAndQuestions