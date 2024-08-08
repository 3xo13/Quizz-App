import Image from 'next/image'
import React from 'react'
import PacmanLoader from "react-spinners/PacmanLoader";

const LoadingOverlay = () => {
	return (
		<div className='absolute w-full h-full top-0 left-0 flex-col-center'>
			<PacmanLoader
				color={"#9b34f7"}
				loading={true}
				cssOverride={{marginRight: "100px"}}
				size={50}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
			{/* <Image src={"/images/icons/loading.png"} width={50} height={50} alt='loading' className=' animate-spin' /> */}
		</div>
	)
}

export default LoadingOverlay