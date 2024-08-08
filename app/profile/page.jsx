"use client"
import GameCards from '@/components/game/GameCards'
import LoadingOverlay from '@/components/global/LoadingOverlay'
import Header from '@/components/header/Header'
import { database } from '@/utils/database/firebase/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const Profile = () => {
	const [games, setGames] = useState([]);
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		(async () => {
			setLoading(true)
			const querySnapshot = await getDocs(collection(database, "games"));
			let myGames = [];
			querySnapshot.forEach((doc) => {
				myGames.push({ id: doc.id, game: doc.data() })
			});
			setGames(myGames)
			setLoading(false)
		})()
	}, [])

	
	
	return (
		<div className='screen col items-center	'>
			{loading && <LoadingOverlay />}
			<div className='w-full flex-center pb-10'>
				<Header />
			</div>
			<Link href={"/newGame"}>
			<p className='border p-2 bg-green-500 text-white'>create game</p>
			</Link>
			<div className='p-5 w-full grid grid-cols-4 gap-5'>
			<GameCards games={games}/>
			</div>
		</div>
	)
}

export default Profile