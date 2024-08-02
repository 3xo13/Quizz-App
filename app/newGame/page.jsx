'use client'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { database } from '../../utils/database/firebase/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import HomeQuizzCard from '@/components/quizz/HomeQuizzCard'
import Image from 'next/image'
import NewGameSecondPage from '@/components/newGame/NewGameSecondPage'

const NewGame = () => {
    const [quizzCollection, setQuizzCollection] = useState([])

    const [gameInfo, setGameInfo] = useState({ name: "", team1: "", team2: "" })
    const [choosenCategories, setChoosenCategories] = useState([])

    const [isSecondStep, setIsSecondStep] = useState(false)

    const [errorMessage, setErrorMessage] = useState("")

    // const [approvedQuizzList, setApprovedQuizzList] = useState([])

    // fetch quizz list
    useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(collection(database, "categories"));
            let quizzs = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                quizzs.push({ id: doc.id, quizz: doc.data() })
            });
            setQuizzCollection(quizzs)

        })()
    }, [])

    // generate a list of clickable subject cards
    const quizzList = quizzCollection.map(
        (quizz, index) => <div
            key={uuidv4()}
            onClick={e => {
                // if quizz (id) already exist remove it
                if (choosenCategories.find(el => el.id === quizz.id)) {
                    setChoosenCategories(prev => {
                        return prev.filter(el => el.id !== quizz.id)
                    })
                    return;
                }
                // add the quizz to the list
                setChoosenCategories(prev => [
                    ...prev,
                    quizz
                ])
            }}
            className='w-fit h-fit rounded relative z-0'>
            {
                choosenCategories.find(el => el.id === quizz.id)
                    ? <div className='absolute w-full h-full top-0 flex-col-center z-10 bg-black/50'>
                        <Image
                            src={"/images/icons/check-mark.png"}
                            width={50}
                            height={50}
                            alt='checked'
                            className='w-14 h-14' />
                    </div>
                    : null
            }
            <HomeQuizzCard quizz={quizz.quizz} /></div>
    )

    const handleContinue = () => {
        if (!gameInfo.name || !gameInfo.team1 || !gameInfo.team2 ) {
            setErrorMessage("Pleas fill the game name and team names to continue")
            return;
        }
        setIsSecondStep(true)
    }

    if (isSecondStep) {
        return <NewGameSecondPage
            choosenCategories={choosenCategories}
            // setApprovedList={setApprovedQuizzList}
            setOpenSelf={setIsSecondStep}
            gameInfo={gameInfo} />
    }

    return (
        <main className="w-screen flex-col-center gap-5 px-10">
            <div className='w-full py-5 border-b-2 border-gray-700 flex-col-center gap-3'>
                {errorMessage && <p className='text-red-500'>{errorMessage}</p> }
                <div className='w-full col gap-5'>
                    <div className='row gap-5 w-full'>
                        <label htmlFor='gameName' className='w-2/12 text-nowrap'>Game Name</label>
                        <input
                            type="text"
                            id='gameName'
                            className='w-[35dvw] textInput'
                            placeholder='Please add a name'
                            value={gameInfo.name}
                            onChange={e => setGameInfo(prev => ({
                                ...prev,
                                name: e.target.value
                            }))} />
                    </div>
                    <div className='row gap-5 w-full'>
                        <label htmlFor='team1' className='w-2/12 text-nowrap'>Team 1</label>
                        <input
                            type="text"
                            id='team1'
                            className='w-[35dvw] textInput'
                            placeholder='Please add a team name'
                            value={gameInfo.team1}
                            onChange={e => setGameInfo(prev => ({
                                ...prev,
                                team1: e.target.value
                            }))} />
                    </div>
                    <div className='row gap-5 w-full'>
                        <label htmlFor='team2' className='w-2/12 text-nowrap'>Team 2</label>
                        <input
                            type="text"
                            id='team2'
                            className='w-[35dvw] textInput'
                            placeholder='Please add a team name'
                            value={gameInfo.team2}
                            onChange={e => setGameInfo(prev => ({
                                ...prev,
                                team2: e.target.value
                            }))} />
                    </div>
                </div>

            </div>
            <div className='w-full py-5 flex-col-center gap-3'>
                <h2 className='gradientText text-lg'>Choose a list of 6 subjects</h2>
                <div className='h-3 w-[50dvw] bg-white rounded-full'>
                    <div
                        className='h-full rounded-full'
                        style={{
                            width: `${choosenCategories.length < 6
                                ? (100 / 6) * choosenCategories.length
                                : (100 / 6) * 6}%`,
                            backgroundColor: `${choosenCategories.length <= 6 ? "green" : "red"}`
                        }}></div>
                </div>
            </div>
            {
                choosenCategories.length === 6
                    ? <div className='w-full py-5 flex-center'>
                        <button
                            className='border px-3 py-2 rounded bg-green-500 text-white'
                            onClick={handleContinue}>Accept & Continue</button>
                    </div>
                    : choosenCategories.length > 6 ? <p className='text-red-400'>{`please remove ${choosenCategories.length - 6} categories to continue`}</p> : ""
            }
            <div className="w-full grid grid-cols-3 grid-rows-auto gap-5  px-10">
                {quizzList}

            </div>
        </main>
    )
}

export default NewGame