import React from 'react'
import Link from 'next/link'
import {v4 as uuidv4} from 'uuid'
import { lifelines } from '@/utils/helpers/vars/lifelines'
import Image from 'next/image'

const GameCards = ({games}) => {
    const gameCards = games.length
        ? games.map(game => {
            const categories = game
                .game
                .categories
                .map(
                    cat => <div key={uuidv4()} className='bg-white rounded p-1'>
                        <p className='text-xs'>{cat.title}</p>
                    </div>
                )
            const lifelineIcons = game
                .game
                .lifelines
                .map(lifeline => {
                    const currentLifeline = lifelines.filter(el => el.codeName == lifeline)[0].imagePath
                    return (
                        <div  key={uuidv4()} className='bg-white rounded p-1'>
                            <Image src={currentLifeline} width={20} height={20} alt='lifeline icon' />
                        </div>
                    )
                })
            return (
                <Link key={uuidv4()} href={`/game?id=${game.id}`}>
                    <div
                        className="w-[20dvw] rounded overflow-hidden shadow-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-center px-6 py-4">
                        <div className="">
                            <div className="font-bold text-xl mb-2 text-white">{game.game.title}</div>
                            <div className='flex-row-center gap-5 w-full '>
                                <p className="text-gray-200 text-base">{`${game.game.team1}`}</p>
                                <p className="text-gray-200 text-base">{`${game.game.team2}`}</p>
                            </div>
                        </div>
                        <div className='w-full row flex-wrap justify-center gap-1 pt-3'>
                            {categories}
                        </div>
                        <div className='w-full row flex-wrap justify-center gap-1 pt-3'>
                            {lifelineIcons}
                        </div>
                    </div>
                </Link>
            )
        })
        : []

    return (<> {
        // [...gameCards,...gameCards,...gameCards]
        gameCards
    }</>)
}

export default GameCards