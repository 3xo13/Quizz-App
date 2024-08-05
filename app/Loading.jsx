import React from 'react'
import Image from 'next/image'

const Loading = () => {
	return (
		<div className='screen flex-col-center'>
			<Image src={"/images/icons/loading.png"} width={50} height={50} alt='loading' className=' animate-spin' />
		</div>
	)
}

export default Loading