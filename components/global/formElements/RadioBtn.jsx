import React from 'react'

const RadioBtn = ({state, setState, value}) => {
	return (
		<div className="form-check">
			<label className='capitalize'>
				<input
					type="radio"
					name={value}
					value={value}
					checked={state === value}
					onChange={e => setState(e.target.value, )}
					className="mx-2"
				/>
				{value}
			</label>
		</div>
	)
}

export default RadioBtn