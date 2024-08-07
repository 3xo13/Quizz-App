import React, {useEffect, useState} from 'react'
import {jsx} from 'react/jsx-runtime';
import {useStore} from '../stateManager/DataStore';
import DoublePoints from './lifelines/DoublePoints';
import CallAFriend from './lifelines/CallAFriend';
import AnswerTwice from './lifelines/AnswerTwice';
import AddPointsDirectly from './AddPointsDirectly';
import SubtractPointsDirectly from './SubtractPointsDirectly';
import handlePoints from '@/utils/helpers/handlePoints';
import LifeLines from './lifelines/LifeLines';

const Team = ({name, isRight}) => {
    const [currentTeam, setCurrentTeam] = useState({})

    const {points: questionPoints} = useStore(state => state.currentQuestion);
    const setCurrentQuestion = useStore(state => state.setCurrentQuestion);
    const setShowQuestion = useStore(state => state.setShowQuestion);

    const gameRecord = useStore(state => state.gameRecord)
    const setTeam1Points = useStore(state => state.setTeam1Points)
    const setTeam2Points = useStore(state => state.setTeam2Points)
    
    const isAnswered = useStore(state => state.isAnswered)
    const setIsAnswered = useStore(state => state.setIsAnswered)
    
    const isDoublePoints = useStore(state => state.isDoublePoints);
    const setIsDoublePoints = useStore(state => state.setIsDoublePoints);
    const isSubtractPoints = useStore(state => state.isSubtractPoints);
    const setIsSubtractPoints = useStore(state => state.setIsSubtractPoints);
    const setIsCallAFriend = useStore(state => state.setIsCallAFriend);
    const setIsAnswereTwice = useStore(state => state.setIsAnswereTwice);

    // current team points
    const points = currentTeam?.points

    useEffect(() => {
        if (Object.keys(gameRecord).length) {
            const current = gameRecord.team1.name == name ? gameRecord.team1 : gameRecord.team2
            setCurrentTeam(current)
        }
    }, [gameRecord])

    const callHhandlePoints = (points, operation) => {
        handlePoints(
            points,
            operation,
            questionPoints,
            currentTeam,
            gameRecord,
            setTeam1Points,
            setTeam2Points,
            setIsAnswered,
            setCurrentQuestion,
            setShowQuestion,
            isAnswered,
            isDoublePoints,
            isSubtractPoints,
            setIsDoublePoints,
            setIsSubtractPoints
        );
        setIsCallAFriend(false);
        setIsAnswereTwice(false);
    }

    return (
        <div
            className={`w-full h-full flex text-center  ${isRight
                ? "flex-row"
                : "flex-row-reverse"}`}>
            {/* team name and points */}
            <div className='flex-col-center gap-3 px-3 w-1/2'>
                <button
                    onClick={e => callHhandlePoints(0, "")}
                    className='w-full rounded-xl bg-gray-500 hover:bg-green-600'>
                    <p className='w-full text-white text-lg '>{name}</p>
                </button>
                <div className='row h-1/2 items-center justify-evenly w-full gap-3'>
                    <AddPointsDirectly callback={callHhandlePoints}/>
                    <p className='text-lg font-bold gradientText'>{points}</p>
                    <SubtractPointsDirectly callback={callHhandlePoints}/>
                </div>
            </div>
            {/* lifelines */}
            <div className='flex-col-center gap-3 px-3 w-1/2'>
                <div className='w-full flex-col-center'>
                    <p
                        className='w-full border border-gray-400 rounded-xl bg-gray-500 text-white text-lg '>lifelines</p>
                </div>
                {
                    currentTeam
                        ?.gameLifeLines && <LifeLines team={currentTeam
                            ?.name}/>
                }
            </div>
        </div>
    )
}

export default Team