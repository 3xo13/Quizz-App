import HomeQuizzCard from '@/components/quizz/HomeQuizzCard'
import Image from 'next/image'
import React from 'react'
import {v4 as uuidv4} from 'uuid'

const NewGameCategories = (
    {categoriesArray, choosenCategories, setChoosenCategories}
) => {
    const categories = categoriesArray.map(
        (cateogory, index) => <div
            key={uuidv4()}
            onClick={e => {
                // if cateogory (id) already exist remove it
                if (choosenCategories.find(el => el.id === cateogory.id)) {
                    setChoosenCategories(prev => {
                        return prev.filter(el => el.id !== cateogory.id)
                    })
                    return;
                }
                // add the cateogory to the list
                setChoosenCategories(prev => [
                    ...prev,
                    cateogory
                ])
            }}
            className='w-fit h-fit rounded relative z-0'>
            {
                choosenCategories.find(el => el.id === cateogory.id)
                    ? <div className='absolute w-full h-full top-0 flex-col-center z-10 bg-black/50'>
                            <Image
                                src={"/images/icons/check-mark.png"}
                                width={50}
                                height={50}
                                alt='checked'
                                className='w-14 h-14'/>
                        </div>
                    : null
            }
            <HomeQuizzCard quizz={cateogory.quizz}/></div>
    )
    return (<> {
        categories
    }</>)
}

export default NewGameCategories