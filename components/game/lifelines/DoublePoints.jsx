import {useStore} from '@/components/stateManager/DataStore'
import getTeam from '@/utils/helpers/getTeam'
import Image from 'next/image'
import React, {useEffect, useState} from 'react'

const DoublePoints = ({team, index}) => {
    const gameRecord = useStore(state => state.gameRecord);
    const setIsDoublePoints = useStore(state => state.setIsDoublePoints);
    const showQuestion = useStore(state => state.showQuestion)
    const setTeam1LifelineUsingRecord = useStore(
        state => state.setTeam1LifelineUsingRecord
    )
    const setTeam2LifelineUsingRecord = useStore(
        state => state.setTeam2LifelineUsingRecord
    )

    const [disabled, setDisabled] = useState(false)

    // set disable state based on gameRecord
    useEffect(() => {
        if (Object.keys(gameRecord).length) {
            const currentTeam = gameRecord.team1.name == team ? gameRecord.team1 : gameRecord.team2;
            if (!currentTeam.gameLifeLines.usingRecord[index]) {
                setDisabled(true)
            }
        }
    }, [gameRecord])

    const handleClick = () => {
        if (showQuestion) {
            return;
        }
        setIsDoublePoints(true)
        if (gameRecord.team1.name == team) {
            setTeam1LifelineUsingRecord(index)
        }
        if (gameRecord.team2.name == team) {
            setTeam2LifelineUsingRecord(index)
        }
    }
    return (
        <button className='' onClick={handleClick} disabled={disabled}>
            <Image
                src={"/images/icons/lifelines/star.png"}
                width={30}
                height={30}
                alt='double points'
                className='w-8 h-8'
                style={{
                    opacity: disabled
                        ? "0.2"
                        : 1
                }}/>
        </button>
    )
}

export default DoublePoints