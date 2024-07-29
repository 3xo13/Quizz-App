import Image from 'next/image'
import React from 'react'

const LoadingOverlay = () => {
	return (
		<div className='absolute w-full h-full top-0 left-0 flex-col-center'>
			<Image src={"/images/icons/loading.png"} width={50} height={50} alt='loading' className=' animate-spin' />
		</div>
	)
}

export default LoadingOverlay