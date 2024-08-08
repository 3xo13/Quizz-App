import React from 'react'

const ErrorMessage = ({ stateArray, maxNum, unit }) => {
    const arrayLength = stateArray.length
    return (
        <div className='w-full flex-center'>
            {
                arrayLength > maxNum
                    ? <p className='text-red-400'>{`please remove ${arrayLength - maxNum} ${unit} to continue`}</p>
                    : null
            }
        </div>
    )
}

export default ErrorMessage