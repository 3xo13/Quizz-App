import React from 'react'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid';
import { removeItemFromArrayState } from '@/utils/stateFunctions/removeItemFromArrayState';


const SingleQuestionCard = ({questionObject, index,  setQuestions, questions}) => {
	const {question, type, answer, media, level, points} = questionObject;
	return (
		<div key={uuidv4()} className='col w-[40dvw] h-fit bg-gray-100 p-3 rounded-lg'>
			<div className=' flex justify-between border-b border-gray-300 pb-1'>
				<p className='text-lg gradientText'>{index}</p>
				<button
					className=''
					onClick={e => removeItemFromArrayState(index, setQuestions, questions.length)}>
					<Image src={"/images/icons/x.png"} width={25} height={25} alt='delete' className='w-4 h-4' />
				</button>

			</div>
			<div>
				<div className='row gap-3'>
					<p>Question :</p>
					<p>{question}</p>
				</div>
				<div className='row gap-3'>
					<p>Answer :</p>
					<p>{answer}</p>
				</div>
				<div className='row gap-3'>
					<p>Type :</p>
					<p>{type}</p>
				</div>
				<div className='row gap-3'>
					<p>Media :</p>
					{type === "image" ? <Image src={media} width={100} height={100} alt='question image' /> : ""}
					{type === "audio" ? <audio controls>
						<source src={media}  />
						Your browser does not support the audio tag.
					</audio>
 : ""}
					{type === "video" ? <video controls>
						<source src={media} />
						Your browser does not support the video tag.
					</video> : ""}
					{type === "text" || !media ? "No Files" : ""}
				</div>
			</div>
		</div>
	)
}

export default SingleQuestionCard