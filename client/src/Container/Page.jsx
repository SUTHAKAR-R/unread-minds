import React, { useEffect } from 'react'

const Page = ({ title, children, wide }) => {

	useEffect(() => {
		document.title = `${title} | Unread Minds`
		window.scrollTo(0, 0)
	}, [title])

	return (
		<div className={`container ${wide ? '' : 'container--narrow'} py-md-5`}>
			{ children }
		</div>
	)
}

export default Page