import Link from 'next/link'
import React from 'react'

const Profile = () => {
	return (
		<div className='screen col items-center	'>
			<Link href={"/newGame"}>
			<p className='border p-2 '>create game</p>
			</Link>
		</div>
	)
}

export default Profile