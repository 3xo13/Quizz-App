"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import {useStore} from '../stateManager/DataStore';
import {useRouter} from 'next/navigation';
import Link from 'next/link';

const GameHeader = ({game, setShowEndScreen}) => {
    const router = useRouter()
    const gameRecord = useStore(state => state.gameRecord);
    // current team
    const currentPlayingTeam = useStore(state => state.currentPlayingTeam);
    const setCurrentPlayingTeam = useStore(state => state.setCurrentPlayingTeam);

    const changeCurrentTeam = useStore(state => state.changeCurrentTeam);
    const setChangeCurrentTeam = useStore(state => state.setChangeCurrentTeam);

    // question
    const setCurrentQuestion = useStore(state => state.setCurrentQuestion);
    const setShowQuestion = useStore(state => state.setShowQuestion);

    // lifelines
    const setIsCallAFriend = useStore(state => state.setIsCallAFriend);
    const setIsAnswereTwice = useStore(state => state.setIsAnswereTwice);

    useEffect(() => {
        if (Object.keys(gameRecord).length) {
            const teamNumber = Math.floor(Math.random() * 2) + 1;
            console.log("🚀 ~ useEffect ~ teamNumber:", teamNumber)
            if (teamNumber == 1) {
                setCurrentPlayingTeam(gameRecord.team1.name)
            }else{
                setCurrentPlayingTeam(gameRecord.team2.name) 
            }
        }
    },[gameRecord])

    useEffect(() => {
        if (Object.keys(gameRecord).length) {
        if (currentPlayingTeam == gameRecord.team1.name) {
            setCurrentPlayingTeam(gameRecord.team2.name)
        }
        if (currentPlayingTeam == gameRecord.team2.name) {
            setCurrentPlayingTeam(gameRecord.team1.name)
        }
    }
    },[changeCurrentTeam])

    const handleBackToBoard = () => {
        setShowQuestion(false);
        setCurrentQuestion({});
        setIsCallAFriend(false);
        setIsAnswereTwice(false);
    };

    return (
        <div className={`w-full h-full flex`}>
            <div className='w-1/3 h-full row items-center gap-5 px-10 '>
					{/* exit to main page */}
                <Link href={'/'}>
                    <Image
                        src={"/images/icons/exit(1).png"}
                        width={50}
                        height={50}
                        alt='back to board'
                        className='w-8 h-8 '/>
                </Link>
								{/* end the game */}
                <button
                    className=''
                    onClick={e => {
                        setShowEndScreen(true)
                    }}>
                    <Image
                        src={"/images/icons/game/finishline.png"}
                        width={50}
                        height={50}
                        alt='back to board'
                        className='w-8 h-8 '/>
                </button>
								{/* back to question board */}
                <button
                    className=''
                    onClick={handleBackToBoard}>
                    <Image
                        src={"/images/icons/game/squares.png"}
                        width={50}
                        height={50}
                        alt='back to board'
                        className='w-8 h-8 '/>
                </button>
            </div>
            {/* game title */}
            <div className='w-1/3 h-full flex-center text-4xl font-bold gradientText'>
                <p>{game.gameObj.title}</p>
            </div>
            {/* current team */}
            <div className='w-1/3 h-full flex-row-center px-5'>
                <div
                    className='w-full border px-3 py-2 border rounded-xl bg-white row items-center justify-between'>
                    <button className='' onClick={e => setChangeCurrentTeam(!changeCurrentTeam)}>
                        <Image
                            src={"/images/icons/others/shuffle.png"}
                            width={50}
                            height={50}
                            alt='back to board'
                            className='w-6 h-6 ' />
                    </button>
                    <p>{currentPlayingTeam}</p>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default GameHeader