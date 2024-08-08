import React from 'react'

const ProgressBar = ({stateArray, maxNum}) => {

    const progressPercintage = stateArray.length < maxNum
        ? (100 / maxNum) * stateArray.length
        : (100 / maxNum) * maxNum

    return (
        <div className='h-3 w-[50dvw] bg-white rounded-full'>
            <div
                className='h-full rounded-full'
                style={{
                    width: `${progressPercintage}%`,
                    backgroundColor: `${stateArray.length <= maxNum
                        ? "green"
                        : "red"}`
                }}></div>
        </div>
    )
}

export default ProgressBar