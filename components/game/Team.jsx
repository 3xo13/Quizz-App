import React, {useEffect, useState} from 'react'
import {jsx} from 'react/jsx-runtime';
import {useStore} from '../stateManager/DataStore';

const Team = ({name, isRight}) => {
	const { points: questionPoints } = useStore(state => state.currentQuestion);
	const setCurrentQuestion = useStore(state => state.setCurrentQuestion);
	const setShowQuestion = useStore(state => state.setShowQuestion);

    const gameRecord = useStore(state => state.gameRecord)
    const setTeam1 = useStore(state => state.setTeam1)
    const setTeam2 = useStore(state => state.setTeam2)

	const isAnswered = useStore(state => state.isAnswered)
	const setIsAnswered = useStore(state => state.setIsAnswered)

    const points = gameRecord?.teams?.[0]?.name == name
            ? gameRecord?.teams?.[0]?.points
            : gameRecord?.teams?.[1]?.points

    const handleAddPoints = () => {
        if (isAnswered) {
            if (gameRecord.teams[0].name == name) {
                setTeam1({
                    name,
                    points: +gameRecord
                        .teams[0]
                        .points + +questionPoints
                })
            } else {
                setTeam2({
                    name,
                    points: +gameRecord
                        .teams[1]
                        .points + +questionPoints
                })
            }
						setIsAnswered(false)
						setCurrentQuestion({})
					setShowQuestion(false)
        }
    }

    return (
        <div
            className={`w-full h-full flex text-center  ${isRight
                ? "flex-row"
                : "flex-row-reverse"}`}>
            {/* team name and points */}
            <div className='flex-col-center gap-3 px-3 w-1/2'>
                <button
                    onClick={handleAddPoints}
                    className='w-full rounded-xl bg-gray-500 hover:bg-green-600'>
                    <p className='w-full text-white text-lg '>{name}</p>
                </button>
                <div className='row h-1/2 items-center justify-evenly w-full gap-3'>
                    <button>+</button>
                    <p>{points}</p>
                    <button>-</button>
                </div>
            </div>
            {/* help */}
            <div className='flex-col-center gap-3 px-3 w-1/2'>
                <div className='w-full flex-col-center'>
                    <p
                        className='w-full border border-gray-400 rounded-xl bg-gray-500 text-white text-lg '>Help</p>
                </div>
                <div className='w-full h-1/2 row items-center justify-evenly'>
                    <button className='border rounded-full p-2'>@</button>
                    <button className='border rounded-full p-2'>@</button>
                    <button className='border rounded-full p-2'>@</button>
                </div>
            </div>
        </div>
    )
}

export default Team