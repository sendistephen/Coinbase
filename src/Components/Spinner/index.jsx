import React, { useEffect, useState } from 'react';

// This component is used to delay the rendering of its children by the specified amount of time
function Delayed({ children, wait = 500 }) {
	// State to track whether the delay has passed
	const [show, setShow] = useState(false);

	// Use effect hook to set a timeout after the specified delay
	// The timeout will set the show state to true, which will cause the children to be rendered
	useEffect(() => {
		const timeOut = window.setTimeout(() => {
			setShow(true);
		}, wait);

		// Clean up the timeout when the component unmounts
		return () => window.clearTimeout(timeOut);
	});

	// If the delay has passed, render the children, otherwise return null
	return show === true ? children : null;
}

// This component is a spinner that will be shown while the delay specified in the Delayed component is still ongoing
function Spinner() {
	// The spinner is wrapped in the Delayed component, so it will only be shown after the specified delay has passed
	return (
		<Delayed>
			<div className='flex items-center justify-center w-full h-1/2 '>
				<div className='w-0 h-0 p-4 border-2 rounded-full animate-spin border-r-blue-600' />
			</div>
		</Delayed>
	);
}

export default Spinner;
