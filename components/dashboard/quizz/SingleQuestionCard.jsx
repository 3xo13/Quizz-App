import React from 'react'
import Image from 'next/image'
import {v4 as uuidv4} from 'uuid';
import {removeItemFromArrayState} from '@/utils/stateFunctions/removeItemFromArrayState';

const SingleQuestionCard = ({questionObject, index, setQuestions, questions}) => {
    const {
        question,
        type,
        answer,
        media,
        level,
        points
    } = questionObject;
    return (
        <div key={uuidv4()} className='col w-[40dvw] h-fit bg-gray-100 p-3 rounded-lg'>
            <div className=' flex justify-between border-b border-gray-300 pb-1'>
                <p className='text-lg gradientText'>{index}</p>
                <button
                    className=''
                    onClick={e => removeItemFromArrayState(index, setQuestions, questions.length)}>
                    <Image
                        src={"/images/icons/x.png"}
                        width={25}
                        height={25}
                        alt='delete'
                        className='w-4 h-4'/>
                </button>

            </div>
            <div>
                <div className='row justify-between gap-3 w-full border-b '>
                    <p className='text-nowrap'>Question :</p>
                    <p>{question}</p>
                </div>
								<div className='row justify-between gap-3 w-full border-b  '>
                    <p className='text-nowrap'>Answer :</p>
                    <p>{answer}</p>
                </div>
                <div className='row justify-between w-full border-b  '>
                    <p>level :</p>
                    <p>{level}</p>
                </div>
                <div className='row justify-between w-full border-b  '>
                    <p>Points :</p>
                    <p>{points}</p>
                </div>
                <div className='row justify-between w-full border-b  '>
                    <p>Type :</p>
                    <p>{type}</p>
                </div>
                <div className='col gap-3 w-full'>
                    <p>Media :</p>
                    {
                        type === "image"
								? <Image src={media} width={200} height={200} alt='question image' className=' w-full h-auto'/>
                            : ""
                    }
                    {
                        type === "audio"
                            ? <audio controls="controls" className='bg-slate-600 rounded'>
                                    <source src={media}/>
                                    Your browser does not support the audio tag.
                                </audio>
                            : ""
                    }
                    {
                        type === "video"
                            ? <video controls="controls" className='bg-slate-600 rounded'>
                                    <source src={media}/>
                                    Your browser does not support the video tag.
                                </video>
                            : ""
                    }
                    {
                        type === "text" || !media
                            ? "No Files"
                            : ""
                    }
                </div>
            </div>
        </div>
    )
}

export default SingleQuestionCard