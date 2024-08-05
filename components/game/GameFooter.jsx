import React from 'react'
import Team from './Team';


const GameFooter = ({game }) => {
    const team1 = game.gameObj.team1;
    const team2 = game.gameObj.team2;
    return (
        <div className='w-full h-full row'>
            <div className='w-1/3'>
                <Team name={team1} isRight={true}/>
            </div>
            <div className='w-1/3'></div>
            <div className='w-1/3'>
                <Team name={team2} isRight={false}/>
            </div>
        </div>
    )
}

export default GameFooter