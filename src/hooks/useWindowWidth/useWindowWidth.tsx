import React, { useEffect, useState } from 'react';

const useWindowWidth = () => {
	//* State
	/**
	 * 윈도우 너비
	 */
	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	});

	//* Hooks
	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		window.addEventListener('resize', handleResize);

		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowSize;
};

export default useWindowWidth;
