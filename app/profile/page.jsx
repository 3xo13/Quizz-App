"use client"
import Header from '@/components/header/Header'
import { database } from '@/utils/database/firebase/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const Profile = () => {
	const [games, setGames] = useState([]);

	useEffect(() => {
		(async () => {
			const querySnapshot = await getDocs(collection(database, "games"));
			let myGames = [];
			querySnapshot.forEach((doc) => {
				myGames.push({ id: doc.id, game: doc.data() })
			});
			setGames(myGames)
		})()
	}, [])

	const gameCards = games.length ? games.map(game => 
		<Link key={uuidv4()} href={`/game?id=${game.id}`}>
	<div className='bg-white rounded shadow shadow-gray-400 col p-5 w-fit'>
		<p>{`name : ${game.game.title}`}</p>
		<p>{`team1 : ${game.game.team1}`}</p>
		<p>{`team2 : ${game.game.team2}`}</p>
	</div></Link> ) : []
	
	return (
		<div className='screen col items-center	'>
			<div className='w-full flex-center pb-10'>
				<Header />
			</div>
			<Link href={"/newGame"}>
			<p className='border p-2 bg-green-500 text-white'>create game</p>
			</Link>
			<div className='p-5 w-full'>
			{gameCards}
			</div>
		</div>
	)
}

export default Profile