import { useRef, useEffect, useState } from 'react';
// import 'intersection-observer';

export default function useIntersectionObserver(callback, threshold) {
	const observer = useRef(null);

	useEffect(() => {
		observer.current = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					console.log(entry.isIntersecting, 'entries');

					if (entry.isIntersecting) {
						callback();
					}
				});
			},
			{ threshold: threshold }
		);

		return () => {
			if (!observer.current) {
				observer.current.disconnect();
			}
		};
	}, [callback]);

	const observe = (element) => {
		observer.current.observe(element);
	};

	const unobserve = (element) => {
		observer.current.unobserve(element);
	};

	const disconnect = (element) => {
		observer.current.disconnect(element);
	};

	return [observe, unobserve, disconnect];
}
