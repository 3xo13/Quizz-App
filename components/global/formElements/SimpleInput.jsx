import React from 'react'

const SimpleInput = ({state, setState, value}) => {
	
    return (
        <div className='col gap-2'>
            <label htmlFor={'value'} className='requiered'>Question</label>
            <input
                type="text"
                id={'value'}
                value={'value'}
                onChange={e => setCurrentQuestion(prev => ({
                    ...prev,
                    value: e.target.value
                }))}/>
        </div>
    )
}

export default SimpleInput