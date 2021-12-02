import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import ReactTooltip from 'react-tooltip'
import axios from 'axios'

import Search from './Search'
import Toaster from './Toaster'
import { useDispatchContext, useStateContext } from '../context/store'
import { useToaster } from '../hooks'

const Header = () => {

	const history = useHistory()
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const { register, handleSubmit } = useForm()
	const { loggedIn, user } = useStateContext()
	const dispatch = useDispatchContext()
	const toastRef = useRef()

	const onSubmit = async ({ username, password }) => {
		try {
			const { data } = await axios.post('http://localhost:5000/login', { username, password })

			if (data) dispatch({ type: 'LOGIN', payload: data })
			else console.log('Invalid username/password.')

		} catch (e) {
			console.log(e)
		}
	}

	const onClick = e => {
		e.preventDefault()
		setIsSearchOpen(true)
	}

	const handleLogout = () => {
		dispatch({ type: 'LOGOUT' })
		history.push('/')
	}

	return (
		<>
			<header className="header-bar bg-primary mb-3">
				<div className="container d-flex flex-column flex-md-row align-items-center p-3">
					<button className="btn btn-success btn-sm" onClick={() => toastRef.current.addToast('hello there')}>Log In</button>
					<h4 className="my-0 mr-md-auto font-weight-normal">
						<Link to="/" className="text-white">
							Unread Minds
						</Link>
					</h4>
					{loggedIn ? (
						<div className="flex-row my-3 my-md-0">
							<a onClick={onClick} data-for="search" data-tip="Search" href="#" className="text-white mr-2 header-search-icon">
								<i className="fas fa-search"></i>
							</a>
							<ReactTooltip id="search" className="custom-tooltip" />
							{" "}
							<span data-for="chat" data-tip="Chat" className="mr-2 header-chat-icon text-white">
								<i className="fas fa-comment"></i>
								<span className="chat-count-badge text-white"> </span>
							</span>
							<ReactTooltip id="chat" className="custom-tooltip" />
							{" "}
							<Link to={`/profile/${user.username}`} className="mr-2">
								<img className="small-header-avatar" src={user.avatar} />
							</Link>
							{" "}
							<Link className="btn btn-sm btn-success mr-2" to="/create-post">
								Create Post
							</Link>
							{" "}
							<button onClick={handleLogout} className="btn btn-sm btn-secondary">
								Log Out
							</button>
						</div>) : (
						<form onSubmit={handleSubmit(onSubmit)} className="mb-0 pt-2 pt-md-0">
							<div className="row align-items-center">
								<div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
									<input {...register('username')} name="username" className="form-control form-control-sm input-dark" type="text"
										placeholder="Username" autoComplete="off" />
								</div>
								<div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
									<input {...register('password')} name="password" className="form-control form-control-sm input-dark" type="password"
										placeholder="Password" />
								</div>
								<div className="col-md-auto">
									<button className="btn btn-success btn-sm" >Log In</button>
								</div>
							</div>
						</form>
					)}
				</div>
			</header>
			<Toaster  ref={toastRef} />
			{isSearchOpen && <Search setIsSearchOpen={setIsSearchOpen} />}
		</>
	)
}

export default Header