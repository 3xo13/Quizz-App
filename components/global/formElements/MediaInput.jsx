import React, {useRef} from 'react'

const MediaInput = ({mediaType, setState}) => {
	const inputRef = useRef()
	return (
		<div className='col gap-2 border-b-2 pb-2 border-slate-100'>
			<label htmlFor="media" className='requiered'>Media</label>
			<input
			ref={inputRef}
				type="file"
				id='media'
				multiple={false}
				accept={`${mediaType}/*`}
				onChange={e => setState(e.target.files[0])} /></div>
	)
}

export default MediaInput