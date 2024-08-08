import React from 'react'

const NewGameInput = ({state, setState, setErrMsg, labelText, val}) => {
	const handleInput = (e) => {
		setState(prev => {
			let newobject = {...prev};
			newobject[val] = e.target.value;
			return newobject
		})
		setErrMsg("")
	}
	return (
		<div className='col gap-5 flex-center'>
			<label htmlFor={labelText} className='text-nowrap text-xl font-bold gradientText'>{labelText}</label>
			<input
				type="text"
				id={labelText}
				className='w-[25dvw] textInput text-center'
				placeholder='Please add a name'
				value={state[val]}
				onChange={handleInput} />
		</div>
	)
}

export default NewGameInput