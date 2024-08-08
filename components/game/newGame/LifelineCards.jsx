import {lifelines} from '@/utils/helpers/vars/lifelines'
import Image from 'next/image'
import React from 'react'
import {v4 as uuidv4} from 'uuid'

const LifelineCards = ({choosenLifelines, setChoosenLifelines}) => {

    const handleClick = (e, codeName) => {
        // if lifeline codeName already exist remove it
        if (choosenLifelines.find(el => el == codeName)) {
            setChoosenLifelines(prev => {
                return prev.filter(el => el != codeName)
            })
            return;
        }
        // add the lifeline codeName to the list
        setChoosenLifelines(prev => [
            ...prev,
            codeName
        ])
    }

    const cards = lifelines.map(lifeline => {
        const {name, imagePath, description, howToUse, codeName} = lifeline
        const isChoosen = choosenLifelines.find(el => el === codeName);
        return (
            <button
                key={uuidv4()}
                onClick={e => handleClick(e, codeName)}
                className={` rounded-lg shadow-lg shadow-gray-400 hover:shadow-white p-6
								col items-center justify-between gap-3 capitalize 
								${isChoosen
                    ? "bg-white"
                    : "bg-white/50"}`}>
                <h2 className="text-xl font-bold text-center">{name}</h2>
                <p className="text-gray-700 text-center">
                    {description}
                </p>
                <div className="flex-center">
                    <Image
                        src={imagePath}
                        width={200}
                        height={200}
                        alt={`lifeline card (${name})`}
                        className='w-40 h-40'/>
                </div>
                <p className="w-full bg-orange-500 text-white p-5 rounded-lg text-center">
                    {howToUse}
                </p>
            </button>
        )
    })

    return (<> {
        cards
    }</>)
}

export default LifelineCards