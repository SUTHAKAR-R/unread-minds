import React from 'react'
import { useQuery } from 'react-query'

import { Link, useParams } from 'react-router-dom'
import Loader from '../Container/Loader'

const ProfilePosts = () => {

	const { username } = useParams()
	
	const { isLoading, error, data: posts } = useQuery('profilePosts', () => fetch(`http://localhost:5000/profile/${username}/posts`).then(res => res.json()))

	if (error) return 'An error has occurred fetching profile posts...' + error.message

	return isLoading ? <Loader /> :
		<div className="list-group"> 
			{posts.map((post, i) => 
				<Link key={i} to={`/post/${post._id}`} className="list-group-item list-group-item-action">
					<img className="avatar-tiny" src={post.author.avatar} /> <strong>{ post.title }</strong>
					{" "}
					<span className="text-muted small"> on { post.createdDate }</span>
				</Link>
			)} 
		</div>
}

export default ProfilePosts