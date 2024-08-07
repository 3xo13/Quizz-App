"use client"
import CategoryAndQuestions from '@/components/game/CategoryAndQuestions';
import EndGame from '@/components/game/EndGame';
import GameFooter from '@/components/game/GameFooter';
import GameHeader from '@/components/game/GameHeader';
import Question from '@/components/game/questions/Question';
import LoadingOverlay from '@/components/global/LoadingOverlay';
import {useStore} from '@/components/stateManager/DataStore';
import {database} from '@/utils/database/firebase/firebaseConfig';
import getGameAssets from '@/utils/database/functions/getGameAssets';
import defaultGameRecord from '@/utils/helpers/defaultGameRecord';
import {doc, getDoc} from 'firebase/firestore';
import {useRouter, useSearchParams} from 'next/navigation'
import React, {useEffect, useMemo, useState} from 'react'
import {v4 as uuidv4} from 'uuid';


const GamePage = () => {
    const searchParams = useSearchParams();
    const gameId = searchParams.get("id")

		const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (!gameId) {
            router.push("/")
        }
    }, [])

    // game object containing team names, game name and categories with questions
    // use the categories that are directly inside the game object the categories
    // inside game.gameObj are refernces to fetch the documents
    const [game, setGame] = useState({});
    // chack if data is fetched
    const isGameReady = Object
        .keys(game)
        .length

    const gameRecord = useStore(state => state.gameRecord);
    const setgameRecord = useStore(state => state.setGameRecord);
    const showQuestion = useStore(state => state.showQuestion);

    const [showEndScreen, setShowEndScreen] = useState(false);
    const [teamResults, setTeamResults] = useState({});

    const memoBoard = useMemo(() => {
        return isGameReady
            ? game
                .categories
                .map(cat => <CategoryAndQuestions key={uuidv4()} categoryObj={cat} />)
            : []
    },[game])

    // don't delete get game and game assets (categories and questions)
    useEffect(() => {
        (async () => {
					setLoading(true)
            const docRef = doc(database, "games", gameId);
            const docSnap = await getDoc(docRef);
            const gameData = docSnap.data()
            const categories = await getGameAssets(gameData)
            setGame({id: docSnap.id, gameObj: gameData, categories})
						setLoading(false)
        })()
    }, [])

    // set the current game record in gloal state and local storage
    useEffect(() => {
        if (isGameReady) {
            // get old game record
            const oldRecord = JSON.parse(localStorage.getItem(`gameRecord${gameId}`))
            // if there's an old record set the local state to that
            if (oldRecord && Object.keys(oldRecord).length) {
                setgameRecord(oldRecord)
                return;
            }
            // create new game record and set global state and local storage
            const newGameRecord = defaultGameRecord(game)
            localStorage.setItem(`gameRecord${gameId}`, JSON.stringify(newGameRecord))
            setgameRecord(newGameRecord)
        }
    }, [game])

    // update the local storage game record when global state changes
    useEffect(() => {
        if (isGameReady && Object.keys(gameRecord).length) {
            localStorage.setItem(`gameRecord${gameId}`, JSON.stringify(gameRecord))
        }
    }, [gameRecord])



    if (showEndScreen) {
        return (
            <div className='screen pt-10 col '>
                <div className='w-full h-1/6 '>
                    {isGameReady ? <GameHeader game={game} setShowEndScreen={setShowEndScreen} /> : null}
                </div>
                <EndGame team1={gameRecord.team1} team2={gameRecord.team2} gameId={gameId}/>
            </div>
        )
    }

    return (
        <div className='screen pt-10 col '>
					{loading && <LoadingOverlay />}
            <div className='w-full h-1/6 '>
                {isGameReady ? <GameHeader game={game} setShowEndScreen={setShowEndScreen} /> : null}
            </div>
            {
                showQuestion
                    ? <Question/>
                    : null
            }
            {
                !showQuestion
                    ? <div className='w-full h-4/6 grid grid-cols-3 grid-rows-2 p-3 gap-5 '>
                            {memoBoard}
                        </div>
                    : null
            }
            <div className='w-full h-1/6 '>
                {isGameReady && <GameFooter game={game} />}
            </div>
        </div>
    )
}

export default GamePage