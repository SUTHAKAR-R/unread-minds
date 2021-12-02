import React from 'react'
import { Link } from 'react-router-dom'

import Page from './Page'

const NotFound = () => {
	return (
		<Page title='Page Not Found'>
			<div className='text-center'>
				<h2>Whoops, we cannot find that page.</h2>
				<p className="lead text-muted">Visit <Link to='/'>home</Link> for a fresh start.</p>
			</div>
		</Page>
	)
}

export default NotFound