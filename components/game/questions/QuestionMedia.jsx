import React from 'react'
import Image from 'next/image'

const QuestionMedia = ({type, media}) => {
	return (
		<div className='full flex-center p-2 sm:p-5'>
					{
						type == "video"
					? <div className='full flex-center'>
						<video controls="controls" className='bg-slate-600 rounded h-full w-auto'>
									<source src={media} />
									Your browser does not support the video tag.
								</video>
							</div>
							: ""
					}
					{
						type == "audio"
					? <div className='full flex-center'>
						<audio controls="controls" className='bg-slate-600 rounded h-full w-auto'>
									<source src={media} />
									Your browser does not support the audio tag.
								</audio>
							</div>
							: ""
					}
					{
						type == "image"
							? <Image
								src={media}
								width={200}
								height={200}
								alt='question image'
								className='h-full w-auto' />
							: ""
					}
				</div>
	)
}

export default QuestionMedia