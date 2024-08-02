"use client"
import { database } from '@/utils/database/firebase/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const Profile = () => {
	const [games, setGames] = useState([]);
	console.log("🚀 ~ Profile ~ games:", games)

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
	<div key={uuidv4()} className='bg-white rounded shadow shadow-gray-400 col p-5 w-fit'>
		<p>{`name : ${game.game.title}`}</p>
		<p>{`team1 : ${game.game.team1}`}</p>
		<p>{`team2 : ${game.game.team2}`}</p>
	</div> ) : []
	
	return (
		<div className='screen col items-center	'>
			<Link href={"/newGame"}>
			<p className='border p-2 '>create game</p>
			</Link>
			<div className='p-5 w-full'>
			{gameCards}
			</div>
		</div>
	)
}

export default Profile