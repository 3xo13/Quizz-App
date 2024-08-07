"use client"
import Image from 'next/image';
import React, {useState} from 'react'
import QuestionMedia from './QuestionMedia';
import {useStore} from '@/components/stateManager/DataStore';
import CallAFriendScreen from '../lifelines/screens/CallAFriendScreen';
import AnswerTwiceScreen from '../lifelines/screens/AnswerTwiceScreen';

const Question = ({}) => {
    const {
        question,
        type,
        leve,
        answer,
        media,
        index,
        category
    } = useStore(state => state.currentQuestion);
    const [showAnser, setShowAnswer] = useState(false)

    const setIsAnswered = useStore(state => state.setIsAnswered)
    const setgameRecord = useStore(state => state.setGameRecord);
    const gameRecord = useStore(state => state.gameRecord);

    const isCallAFriend = useStore(state => state.isCallAFriend);
    const isAnswereTwice = useStore(state => state.isAnswereTwice);

    const handleAnswer = () => {
        setShowAnswer(true)
        setIsAnswered(true)
        const newGameRecord = {
            ...gameRecord,
            categories: gameRecord
                .categories
                .map(cat => {
                    if (cat.category != category) {
                        return cat;
                    }
                    return {
                        category: cat.category,
                        questions: cat
                            .questions
                            .map(
                                (quest, i) => index == i
                                    ? 0
                                    : quest
                            )
                    }
                })
        }
        setgameRecord(newGameRecord)
    }
    return (
        <div className='w-full h-4/6 relative'>
            
            <div className='full flex flex-col sm:flex-row items-center justify-center'>
                <div
                    className={`flex-col-center gap-5 p-5 
											${type == "text"
                        ? "full"
                        : "w-1/2 h-full"}
										`}>
                    <p className=' text-xl text-center'>{question}</p>
                    {
                        !showAnser && <button
                                className='border py-2 px-3 rounded bg-gray-200
										hover:bg-white hover:shadow hover:shadow-white'
                                onClick={handleAnswer}>Answer</button>
                    }
                    {showAnser && <p className='text-2xl text-center gradientText'>{`The answer is : ${answer}`}</p>}
                    {isCallAFriend && <CallAFriendScreen />}
                    {isAnswereTwice && <AnswerTwiceScreen />}
                </div>
                <div
                    className={`${type == "text"
                        ? "w-0 h-0 hidden"
                        : "w-1/2 h-full"} flex-center`}>
                    <QuestionMedia type={type} media={media}/>
                </div>

            </div>
        </div>
    )
}

export default Question