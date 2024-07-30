'use client'
import React, {useEffect, useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import {database} from '../_lip/firebase/firebaseConfig'
import {collection, getDocs} from 'firebase/firestore'
import HomeQuizzCard from '@/components/quizz/HomeQuizzCard'
import Image from 'next/image'
import NewGameSecondPage from '@/components/newGame/NewGameSecondPage'

const NewGame = () => {
    const [quizzCollection, setQuizzCollection] = useState([])
    const [chosenQuizzList, setChosenQuizzList] = useState([])

	const [isSecondStep, setIsSecondStep] = useState(true)

    // fetch quizz list
    useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(collection(database, "questions"));
            let quizzs = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                quizzs.push({id: doc.id, quizz: doc.data()})
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
                if (chosenQuizzList.find(el => el.id === quizz.id)) {
                    setChosenQuizzList(prev => {
                        return prev.filter(el => el.id !== quizz.id)
                    })
                    return;
                }
                // add the quizz to the list
                setChosenQuizzList(prev => [
                    ...prev,
                    quizz
                ])
            }}
            className='w-fit h-fit rounded relative z-0'>
            {
                chosenQuizzList.find(el => el.id === quizz.id)
                    ? <div className='absolute w-full h-full top-0 flex-col-center z-10 bg-black/50'>
                            <Image
                                src={"/images/icons/check-mark.png"}
                                width={50}
                                height={50}
                                alt='checked'
                                className='w-14 h-14'/>
                        </div>
                    : null
            }
            <HomeQuizzCard quizz={quizz.quizz}/></div>
    )

		if (isSecondStep) {
			return <NewGameSecondPage choosenQuizList={chosenQuizzList} />
		}

    return (
        <main className="w-screen flex-col-center gap-5 px-5">
            <div className='w-full py-5 border-b-2 border-gray-700 flex-col-center gap-3'>
                <h2 className='gradientText text-lg'>Choose a list of 6 subjects</h2>
                <div className='h-3 w-[50dvw] bg-white rounded-full'>
                    <div
							className='h-full bg-green-400 rounded-full'
                        style={{
                            width: `${chosenQuizzList.length < 6
                                ? (100 / 6) * chosenQuizzList.length
                                : (100 / 6) * 6}%`
                        }}></div>
                </div>
            </div>
            {
                chosenQuizzList.length === 6
                    ? <div className='w-full py-5 flex-center'>
                            <button className='border px-3 py-2 rounded bg-green-500 text-white'
														onClick={e => setIsSecondStep(true)}>Accept & Continue</button>
                        </div>
                    : ""
            }
            <div className="w-full grid grid-cols-3 grid-rows-auto gap-5  px-10">
                {quizzList}

            </div>
        </main>
    )
}

export default NewGame