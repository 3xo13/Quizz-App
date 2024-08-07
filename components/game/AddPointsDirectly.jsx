import Image from 'next/image'
import React from 'react'

const AddPointsDirectly = ({callback}) => {
	const handleClick = () => {
		console.log("Add points clicked");
	}
	return (
		<button className='' onClick={e => callback(100, "add")}>
			<Image src={"/images/icons/game/plus.png"}
			width={30} height={30} alt='Add points' className='w-6 h-6' />
		</button>
	)
}

export default AddPointsDirectly