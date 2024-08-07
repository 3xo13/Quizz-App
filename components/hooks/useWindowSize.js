import React, {useState, useEffect} from 'react'

function useWindowSize() {
	const [size, setSize] = useState([0,0]);
	useEffect(() => {
		if (typeof window) {
			setSize([window.innerHeight, window.innerWidth]);
		}
		const handleResize = () => {
			setSize([window.innerHeight, window.innerWidth]);
		};
		window.addEventListener('resize', handleResize);
		// Clean up!
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	return size;
}

export default useWindowSize