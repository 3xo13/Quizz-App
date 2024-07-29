import Image from 'next/image';
import React from 'react'
import { v4 as uuidv4 } from 'uuid';

const DashQuizzCard = ({quizz}) => {
	const url = quizz.image instanceof File
		? URL.createObjectURL(quizz.image)
		: "/images/icons/x.png";
	return (
		<button key={uuidv4()} className="w-60 h-60 rounded bg-gray-200 col items-center justify-end p-5 relative shadow-lg shadow-black/60" onClick={e => console.log(quizz.questions)}>
			<Image src={url} width={100} height={100} alt='quizz image' className='absolute top-0 z-0 w-full h-full rounded object-cover object-norepaeat' />
			<p className="text-gray-700 z-10 bg-white/90 py-2 px-3 rounded capitalize border border-gray-400" >{quizz.title}</p>


		</button>
	)
}

export default DashQuizzCard