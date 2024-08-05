"use client"
import Image from 'next/image'
import React from 'react'
import { useStore } from '../stateManager/DataStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const GameHeader = ({ game }) => {
	const router = useRouter()
	const setCurrentQuestion = useStore(state => state.setCurrentQuestion);
	const setShowQuestion = useStore(state => state.setShowQuestion);
	return (
		<div className={`w-full h-full flex`}>
			<div className='w-1/3 h-full row items-center gap-5 px-10 '>
				<Link href={'/'}>
					<Image src={"/images/icons/exit(1).png"}
					width={50}
					height={50}
					alt='back to board'
					className='w-8 h-8 ' />
					</Link>
				{/* <button className='border p-2 rounded-full h-fit'>@</button> */}
				<button className='' onClick={e => {
					setShowQuestion(false)
					setCurrentQuestion({})
					}}>
					<Image src={"/images/icons/game/squares.png"} 
					width={50} 
					height={50} 
					alt='back to board'
					className='w-8 h-8 ' />
				</button>
			</div>
			<div className='w-1/3 h-full flex-center text-4xl font-bold gradientText'><p>{game.gameObj.title}</p></div>
			<div className='w-1/3 h-full flex-row-center px-5'>
				<div className='w-full border px-3 py-2 border rounded-xl bg-white row items-center justify-between'>
					<button className=''>change</button>
					<p>Current team</p>
				</div>
				<div></div>
			</div>
		</div>
	)
}

export default GameHeader