import React from 'react'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid';
import { removeItemFromArrayState } from '@/utils/stateFunctions/removeItemFromArrayState';


const SingleQuestionCard = ({question, index,  setQuestions, questions}) => {
	return (
		<div key={uuidv4()} className='col w-[40dvw] bg-gray-100 p-3 rounded-lg'>
			<div className='h-5 flex justify-end'>
				<button
					className=''
					onClick={e => removeItemFromArrayState(index, setQuestions, questions.length)}>
					<Image src={"/images/icons/x.png"} width={25} height={25} alt='delete' className='w-4 h-4' />
				</button>

			</div>
			<div>
				<div className='row gap-3'>
					<p>Question :</p>
					<p>{question.question}</p>
				</div>
				<div className='row gap-3'>
					<p>Answer :</p>
					<p>{question.answer}</p>
				</div>
				<div className='row gap-3'>
					<p>Type :</p>
					<p>{question.type}</p>
				</div>
				<div className='row gap-3'>
					<p>Media :</p>
					<p>{question.media}</p>
				</div>
			</div>
		</div>
	)
}

export default SingleQuestionCard