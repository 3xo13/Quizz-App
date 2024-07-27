import React from 'react'
import Image from 'next/image'

const ImageWithText = ({ imgSrc, text, imgSize, imgRadius }) => {
    return (
        <div className='flex-row-center gap-3 w-full h-fit'>
            <Image
                src={imgSrc}
                width={50}
                height={50}
                alt='user profile image'
                className=""
                style={{
                    width: imgSize,
                    height: imgSize,
                    borderRadius: imgRadius
                }} />
            <h2 className='gradientText'>{text}</h2>
        </div>
    )
}

export default ImageWithText