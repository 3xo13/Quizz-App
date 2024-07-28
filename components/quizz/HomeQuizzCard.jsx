import Image from 'next/image';
import React from 'react'
import { v4 as uuidv4 } from 'uuid';

const HomeQuizzCard = ({quizz}) => {
	return (
		<button key={uuidv4()}  className="w-40 h-40 rounded bg-gray-200 flex-col-center" onClick={e => console.log(quizz.questions)}>
			<Image src={quizz.image} width={100} height={100} alt='quizz image'/>
			<p className="text-black" >{quizz.title}</p>

			
		</button>
	)
}

export default HomeQuizzCard