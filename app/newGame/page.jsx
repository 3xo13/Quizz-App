'use client'
import React, {useEffect, useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import {database} from '../../utils/database/firebase/firebaseConfig'
import {collection, getDocs} from 'firebase/firestore'
import HomeQuizzCard from '@/components/quizz/HomeQuizzCard'
import Image from 'next/image'
import NewGameSecondPage from '@/components/newGame/NewGameSecondPage'
import NewGameInput from '@/components/game/newGame/NewGameInput'
import ProgressBar from '@/components/game/newGame/ProgressBar'
import NewGameCategories from '@/components/game/newGame/NewGameCategories'
import {lifelines} from '@/utils/helpers/vars/lifelines'
import LifelineCards from '@/components/game/newGame/LifelineCards'
import AcceptBtn from '@/components/game/newGame/AcceptBtn'
import ErrorMessage from '@/components/game/newGame/ErrorMessage'

const NewGame = () => {
    const [quizzCollection, setQuizzCollection] = useState([])

    const [gameInfo, setGameInfo] = useState({name: "", team1: "", team2: ""})
    const [choosenCategories, setChoosenCategories] = useState([])

    const [choosenLifelines, setChoosenLifelines] = useState([])

    const [isSecondStep, setIsSecondStep] = useState(false)

    const [errorMessage, setErrorMessage] = useState("")

    // fetch categories list
    useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(collection(database, "categories"));
            let categories = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                categories.push({id: doc.id, quizz: doc.data()})
            });
            setQuizzCollection(categories)

        })()
    }, [])


    if (isSecondStep) {
        return <NewGameSecondPage choosenCategories={choosenCategories}
            setOpenSelf={setIsSecondStep} gameInfo={gameInfo} choosenLifelines={choosenLifelines}/>
    }

    return (
        <main className="w-screen flex-col-center gap-5 px-10 ">
            <div className='w-full py-5 border-b-2 border-gray-400 flex-col-center'>
                <div className='w-full col gap-5'>
                    <div className='flex-center w-full '>
                        <NewGameInput
                            setState={setGameInfo}
                            state={gameInfo}
                            setErrMsg={setErrorMessage}
                            labelText={"New Game"} val={"name"}/>
                    </div>
                    <div className='flex-row-center gap-10'>
                        <NewGameInput
                            setState={setGameInfo}
                            state={gameInfo}
                            setErrMsg={setErrorMessage}
                            labelText={"Team 1"} val={"team1"}/>
                        <NewGameInput
                            setState={setGameInfo}
                            state={gameInfo}
                            setErrMsg={setErrorMessage}
                            labelText={"Team 2"} val={"team2"}/>
                    </div>
                </div>
                {/* accept button and error message */}
                {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
                <AcceptBtn
                    gameInfo={gameInfo}
                    setErrorMessage={setErrorMessage}
                    setIsSecondStep={setIsSecondStep}
                    maxNum={6}
                    choosenCategories={choosenCategories}
                    choosenLifelines={choosenLifelines}/>
            </div>
            {/* lifelines */}
            <div>
                <div className='w-full py-5 flex-col-center gap-3'>
                    <h2 className='gradientText text-2xl'>Select 3 liflines</h2>
                    <ErrorMessage stateArray={choosenLifelines} maxNum={3} unit={"lifeline"}/>
                    <ProgressBar stateArray={choosenLifelines} maxNum={3}/>
                </div>
                <div className="w-full grid grid-cols-3 grid-rows-auto gap-5  px-10">
                    <LifelineCards
                        choosenLifelines={choosenLifelines}
                        setChoosenLifelines={setChoosenLifelines}/>
                </div>
            </div>

            {/* categories header (progress bar and error message) */}
            <div
                className='w-full py-5 flex-col-center gap-3 border-t-2 border-gray-400 mt-10'>
                <h2 className='gradientText text-2xl'>Select a list of 6 subjects</h2>
                <ErrorMessage stateArray={choosenCategories} maxNum={6} unit={"category"}/>
                <ProgressBar stateArray={choosenCategories} maxNum={6}/>
            </div>
            {/* category cards */}
            <div className="w-full grid grid-cols-5 grid-rows-auto gap-5  px-10 pb-10">
                <NewGameCategories
                    categoriesArray={quizzCollection}
                    choosenCategories={choosenCategories}
                    setChoosenCategories={setChoosenCategories}/>
            </div>

        </main>
    )
}

export default NewGame