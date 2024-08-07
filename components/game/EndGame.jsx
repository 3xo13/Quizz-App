"use client"
import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import useWindowSize from '../hooks/useWindowSize';

const EndGame = ({ team1, team2, gameId }) => {
	const [height, width] = useWindowSize();
	const [winingTeam, setWiningTeam] = useState({})
	const [losingTeam, setLosingTeam] = useState({})
	const [isDraw, setIsDraw] = useState(false)

	useEffect(() => {
		if (team1.points > team2.points) {
			setWiningTeam(team1)
			setLosingTeam(team2)
		} 
		if (team1.points < team2.points) {
			setWiningTeam(team2)
			setLosingTeam(team1)
		}
		
		if (team1.points == team2.points) {
			setIsDraw(true)
		}
		localStorage.removeItem(`gameRecord${gameId}`)
	}, [])

	if (isDraw) {
		return (
			<div className='w-full h-5/6 col p-3 gap-5 '>
				<div className='1/3 w-full flex-center pt-10'>
					<h2 className='text-3xl gradientText'>It's a Draw!!</h2>
				</div>
				<div className='h-1/3 w-full flex-col-center gap-3'>
					<h3 className='text-3xl'>Both teams got the same Points</h3>
				</div>
				<div className='h-1/3 w-full col gap-5 items-center'>
					<div className='text-lg'><p>Reslults</p></div>
					<div className='row gap-10'>
						<div className='col gap-3 items-center rounded border-2 border-gray-600 py-3 px-5 w-fit min-w-20 h-fit'>
							<p>{team1.name}</p>
							<p>{team1.points}</p>
						</div>
						<div className='col gap-3 items-center rounded border-2 border-gray-600 py-3 px-5 w-fit min-w-20 h-fit'>
							<p>{team2.name}</p>
							<p>{team2.points}</p>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='w-full h-5/6 col p-3 gap-5 '>
			<Confetti
				width={width}
				height={height}
			/>
			<div className='1/3 w-full flex-center pt-10'>
				<h2 className='text-3xl gradientText'>congratulations</h2>
			</div>
			<div className='h-1/3 w-full flex-col-center gap-3'>
				<h3 className='text-3xl'>The WiningTeam is</h3>
				<p className='text-4xl text-green-600'>{`Team ${winingTeam.name}`}</p>
				<p className='text-2xl'>{`${winingTeam.points - losingTeam.points} More Points than team ${losingTeam.name}`}</p>
			</div>
			<div className='h-1/3 w-full col gap-5 items-center'>
				<div className='text-lg'><p>Reslults</p></div>
				<div className='row gap-10'>
					<div className='col gap-3 items-center rounded border-2 border-green-600 py-3 px-5 w-fit min-w-20 h-fit'>
						<p>{winingTeam.name}</p>
						<p>{winingTeam.points}</p>
					</div>
					<div className='col gap-3 items-center rounded border-2 border-red-600 py-3 px-5 w-fit min-w-20 h-fit'>
						<p>{losingTeam.name}</p>
						<p>{losingTeam.points}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EndGame