import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link, useHistory, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import ReactTooltip from 'react-tooltip'

import Page from '../Container/Page'
import Loader from '../Container/Loader'
import NotFound from '../Container/NotFound'

import { useDispatchContext, useStateContext } from '../context/store'
import axios from 'axios'

const deletePost = async ({ id, token }) => {
	const { data } = await axios.delete(`http://localhost:5000/post/${id}`, { token })
	return data
}

const Post = () => {

	const history = useHistory()
	const { id } = useParams()
	const { loggedIn, user } = useStateContext()
	const dispatch = useDispatchContext()
	
	const { isLoading, data: post } = useQuery(['singlePost', id], () => fetch(`http://localhost:5000/post/${id}`).then(res => res.json()))
	
	const { mutate } = useMutation(deletePost, {
		onSuccess: (data, _, __) => {
			dispatch({ type: 'FLASH_MESSAGE', payload: 'Post has been deleted successfully.' })
			history.push(`/profile/${user.username}`)
		}
	})

	if (!post) return <NotFound />

	return isLoading ? <Page title='...'><Loader /></Page> : (
		<Page title={post.title}>
			<div className="d-flex justify-content-between">
				<h2>{post.title}</h2>
				{loggedIn && user.username === post.author.username && (
					<span className="pt-2">
						<Link to={`${post._id}/edit`} data-tip="Edit" data-for="edit" className="text-primary mr-2">
							<i className="fas fa-edit" />
						</Link>
						<ReactTooltip id="edit" className="custom-tooltip" />
						{" "}
						<a onClick={() => mutate({ id, token: user.token })} data-tip="Delete" data-for="delete" className="delete-post-button text-danger">
							<i className="fas fa-trash" />
						</a>
						<ReactTooltip id="delete" className="custom-tooltip" />
					</span>
				)}
			</div>

			<p className="text-muted small mb-4">
				<Link to={`/profile/${post.author.username}`} >
					<img className="avatar-tiny" src={post.author.avatar} />
				</Link>
				Posted by <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> on {post.createdDate}
			</p>

			<div className="body-content">
				<ReactMarkdown>
					{post.body}
				</ReactMarkdown>
			</div>
		</Page>
	)
}

export default Post