import React, { memo } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import Page from '../Container/Page'
import { useStateContext } from '../context/store'

const Home = () => {

	console.log('home rerendered.')

	const { loggedIn, user } = useStateContext()
	const { register, handleSubmit } = useForm()

	const onSubmit = async ({ username, email, password }) => {
		try {
			await axios.post('http://localhost:5000/register', { username, email, password })
		} catch (e) {
			console.log(e)
		}
	}
	
	return (
		loggedIn ? (
			<Page title={user.username}>
				<h2 className="text-center">Hello <strong>{user.username}</strong>, your feed is empty.</h2>
				<p className="lead text-muted text-center">Your feed displays the latest posts from the people you follow. If you don&rsquo;t have any friends to follow that&rsquo;s okay; you can use the &ldquo;Search&rdquo; feature in the top menu bar to find content written by people with similar interests and then follow them.</p>
			</Page>
		) : (
			<Page wide title='Home' >
				<div className="row align-items-center">
					<div className="col-lg-7 py-3 py-md-5">
						<h1 className="display-3">Remember Writing?</h1>
						<p className="lead text-muted">
							Are you sick of short tweets and impersonal &ldquo;shared&rdquo; posts that
							are reminiscent of the late 90&rsquo;s email forwards? We believe getting back to actually writing
							is the key to enjoying the internet again.
						</p>
					</div>
					<div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="form-group">
								<label htmlFor="username-register" className="text-muted mb-1">
									<small>Username</small>
								</label>
								<input  
									id="username-register" 
									name="username" 
									className="form-control" 
									type="text"
									placeholder="Pick a username" 
									autoComplete="off"
									{...register('username')}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="email-register" className="text-muted mb-1">
									<small>Email</small>
								</label>
								<input  
									id="email-register" 
									name="email" 
									className="form-control" 
									type="text"
									placeholder="you@example.com" 
									autoComplete="off" 
									{...register('email')}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="password-register" className="text-muted mb-1">
									<small>Password</small>
								</label>
								<input 
									id="password-register" 
									name="password" 
									className="form-control" 
									type="password"
									placeholder="Create a password" 
									{...register('password')}
								/>
							</div>
							<button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
								Sign up for Unread Minds
							</button>
						</form>
					</div>
				</div>
			</Page>
		)
	)
}

export default memo(Home)