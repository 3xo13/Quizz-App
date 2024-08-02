import Image from 'next/image';
import React from 'react'
import {v4 as uuidv4} from 'uuid';

const HomeQuizzCard = ({quizz}) => {
    return (
        <button
            key={uuidv4()}
            className="w-60 h-60 rounded bg-gray-200 col items-center justify-end p-5 relative shadow-lg shadow-black/60"
            onClick={e => "console.log(quizz)"}>
            <Image
                src={quizz.image}
                width={300}
                height={300}
                alt='quizz image'
                className='absolute top-0 z-0 w-full h-full rounded object-cover object-norepaeat'/>
            <p
                className="text-gray-700 z-10 bg-white/90 py-2 px-3 rounded capitalize border border-gray-400">{quizz.title}</p>

        </button>
    )
}

export default HomeQuizzCard