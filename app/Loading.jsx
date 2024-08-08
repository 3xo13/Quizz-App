import React from 'react'
import Image from 'next/image'
import PacmanLoader from "react-spinners/PacmanLoader";

const Loading = () => {
	return (
		<div className='screen flex-col-center'>
			<PacmanLoader
				color={"#9b34f7"}
				loading={true}
				size={50}
				cssOverride={{ marginRight: "100px" }}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
			{/* <Image src={"/images/icons/loading.png"} width={50} height={50} alt='loading' className=' animate-spin' /> */}
		</div>
	)
}

export default Loading