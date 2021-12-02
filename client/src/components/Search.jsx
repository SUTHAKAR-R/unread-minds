import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { debounce } from 'lodash'
import axios from 'axios'

const Search = ({ setIsSearchOpen }) => {

	useEffect(() => {
		document.addEventListener('keyup', (e) => {
			if (e.key === 'Escape') setIsSearchOpen(false)
		})
		return () => document.removeEventListener('keyup', () => {})
	}, [])

	const [searchTerm, setSearchTerm] = useState('')
	const [searchResults, setSearchResults] = useState([])
	const [show, setShow] = useState('neither')

	const handleChange = debounce(text => setSearchTerm(text), 1000) 

	useEffect(async () => {
		if (searchTerm.trim()) {
			setShow('loading')
			try {
				const { data } = await axios.post('http://localhost:5000/search', { searchTerm })
				setSearchResults(data)
				setShow('results')
			} catch (e) {
				console.log('An error occurred while searching.')
			}
		} else setShow('neither')
	}, [searchTerm])

	
	return (
		<div className="search-overlay">
			<div className="search-overlay-top shadow-sm">
				<div className="container container--narrow">
					<label htmlFor="live-search-field" className="search-overlay-icon">
						<i className="fas fa-search"></i>
					</label>
					<input onChange={e => handleChange(e.target.value)} autoFocus type="text" autoComplete="off" id="live-search-field" className="live-search-field" placeholder="What are you interested in?" />
					<span onClick={() => setIsSearchOpen(false)} className="close-live-search">
						<i className="fas fa-times-circle"></i>
					</span>
				</div>
			</div>

			<div className="search-overlay-bottom">
				<div className="container container--narrow py-3">
					<div className={`circle-loader ${show === 'loading' ? 'circle-loader--visible' : ''}` }></div>
					<div className={`live-search-results ${show === 'results' ? 'live-search-results--visible' : ''}`}>
						{Boolean(searchResults.length) ? (
							<div className="list-group shadow-sm">
								<div className="list-group-item active"><strong>Search Results</strong> ({searchResults.length} items found)</div>
								{searchResults.map((post, id) =>
									<Link key={id} to={`/post/${post._id}`} onClick={() => setIsSearchOpen(false)} className="list-group-item list-group-item-action">
										<img className="avatar-tiny" src={post.author.avatar} /> <strong>{post.title}</strong>
										{" "}
										<span className="text-muted small"> on {post.createdDate}</span>
									</Link>
								)}
							</div>
						) : (
							<p className='alert alert-danger text-center shadow-sm'>Sorry, no results found.</p>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Search