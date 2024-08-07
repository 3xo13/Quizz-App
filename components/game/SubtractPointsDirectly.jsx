import Image from 'next/image'
import React from 'react'

const SubtractPointsDirectly = ({callback}) => {
	const handleClick = () => {
		console.log("Subtract Points clicked");
	}
	return (
		<button className='' onClick={e => callback(100, "subtract")}>
			<Image src={"/images/icons/game/minus.png"}
			width={30} height={30} alt='Subtract Points' className='w-6 h-6' />
		</button>
	)
}

export default SubtractPointsDirectly