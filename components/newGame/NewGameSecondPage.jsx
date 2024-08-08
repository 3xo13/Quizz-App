import Image from 'next/image'
import React, {useEffect, useMemo, useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import HomeQuizzCard from '../quizz/HomeQuizzCard'
import QuestionsOptions from './QuestionsOptions'
import {createNewGame} from '@/utils/database/functions/createNewGame'
import CategoryReviewCard from './CategoryReviewCard'
import { useRouter } from 'next/navigation'
import LoadingOverlay from '../global/LoadingOverlay'


const defaultQuestionLevels = [
    "easy",
    "easy",
    "medium",
    "medium",
    "hard",
    "hard"
]

const defaultQuestions = [
    "",
    "",
    "",
    "",
    "",
    ""
]

const NewGameSecondPage = ({ choosenCategories, choosenLifelines, setOpenSelf, gameInfo }) => {
    const router = useRouter()
    const [categoryList, setCategoryList] = useState([])
    const [gameObject, setGameObject] = useState([])
    const [loading, setLoading] = useState(false)

    // add levels to the question set
    useEffect(() => {
        if (!choosenCategories.length) {
            setOpenSelf(false)
        }
        const listWithQuestionLevels = choosenCategories.map(quizzObj => ({
            ...quizzObj,
            quizz: {
                ...quizzObj.quizz,
                questionLevels: defaultQuestionLevels,
            }
        }))
        setCategoryList(listWithQuestionLevels)
    }, [])

    // create game objects
    useEffect(() => {
        if (categoryList.length && categoryList[0].quizz.questionLevels) {
            const gameCategories = categoryList.map(cat => ({
                category: cat.id,
                title: cat.quizz.title,
                levels: categoryList[0].quizz.questionLevels,
                questions: defaultQuestions,
            }))
           setGameObject(gameCategories) 
        }
    },[categoryList])

    const categoryReviewCards = useMemo(() => {
        return categoryList.length
        ? categoryList.map(
            (category, index) => <CategoryReviewCard
                key={uuidv4()}
                setCategoryList={setCategoryList}
                category={category}
                index={index}
                setGameObject={setGameObject}/>
        )
        : []
    }, [categoryList])
    

    const handleAccept = async () => {
        setLoading(true)
        const newGameResult = await createNewGame(gameInfo, gameObject, choosenLifelines)
        if (newGameResult) {
            // todo: handle new game confirmation 
            // add loading state
            router.push("/profile")
            console.log("🚀 ~ handleAccept ~ newGameResult:", newGameResult)
        }else{
            console.error(newGameResult)
        }
        setLoading(false)
    }

    return (
        <div className='w-screen min-h-screen col items-center gap-5 p-10'>
            {loading && <LoadingOverlay /> }
            <div className='w-full flex-center border-b-2 pb-5 border-gray-400'>
                <button
                    className='bg-green-500 rounded py-2 px-3 text-white'
                    onClick={handleAccept}>Accept & Continue</button>
            </div>
            <div className='w-[80dvw] col gap-5 '>{categoryReviewCards}</div>
        </div>
    )
}

export default NewGameSecondPage