import React, {useEffect, useState} from 'react'
import DoublePoints from './DoublePoints';
import CallAFriend from './CallAFriend';
import AnswerTwice from './AnswerTwice';
import SubtractPoints from './SubtractPoints';
import {v4 as uuidv4} from 'uuid';
import { useStore } from '@/components/stateManager/DataStore';

const LifeLines = ({team}) => {
    const gameRecord = useStore(state => state.gameRecord)
    const [currentTeam, setCurrentTeam] = useState({})
    
    // const { lifeLines, usingRecord } = currentTeam?.gameLifeLines;
    const [lifeLinesComponents, setLifeLinesComponents] = useState([])

    // get current team
    useEffect(() => {
        if (Object.keys(gameRecord).length) {
            const current = gameRecord.team1.name == team ? gameRecord.team1 : gameRecord.team2
            setCurrentTeam(current)
        }
    },[gameRecord])

    useEffect(() => {
        let currentLifeLines = [];
        if (Object.keys(currentTeam).length) {
            currentTeam.gameLifeLines.lifeLines.forEach((lifeLine, index) => {
                switch (lifeLine) {
                    case "double":
                        currentLifeLines.push(
                            <DoublePoints key={uuidv4()} team={team} index={index}/>
                        )
                        break;
                    case "call":
                        currentLifeLines.push(
                            <CallAFriend key={uuidv4()} team={team} index={index}/>
                        )
                        break;
                    case "answer2":
                        currentLifeLines.push(
                            <AnswerTwice key={uuidv4()} team={team} index={index}/>
                        )
                        break;
                    case "subtract":
                        currentLifeLines.push(
                            <SubtractPoints key={uuidv4()} team={team} index={index}/>
                        )
                        break;
    
                    default:
                                    // currentLifeLines.push(
                                    //     <SubtractPoints key={uuidv4()} index={index} />
                                    // )
                                    // currentLifeLines.push(
                                    //     <AnswerTwice key={uuidv4()} index={index} />
                                    // )
                                    // currentLifeLines.push(
                                    //     <DoublePoints key={uuidv4()} index={index} />
                                    // )
                        break;
                }
            });
            setLifeLinesComponents(currentLifeLines)
            
        }
    }, [currentTeam])
    return (
        <div className='w-full h-1/2 row items-center justify-evenly'>
            {lifeLinesComponents}
        </div>
    )
}

export default LifeLines