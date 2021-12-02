import React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

import Page from '../Container/Page'
import NotFound from '../Container/NotFound'
import { useDispatchContext, useStateContext } from '../context/store'
import  { postFormOptions } from '../validators/validators'
import { editPost } from '../api'

const EditPost = () => {

	const history = useHistory()
	
	const { id } = useParams()
	
	const { user: { token } } = useStateContext()
	const dispatch = useDispatchContext()
	
	const { register, handleSubmit, formState: { errors } } = useForm(postFormOptions)
	
	const queryClient = useQueryClient()
	const post = queryClient.getQueryData(['singlePost', id])
	// dispatch({ type: 'FLASH_MESSAGE', payload: 'You do not have permission to edit this post' })
	// history.push('/')
	
	const { isLoading, mutate } = useMutation(editPost, {
		onMutate: async editedPost => {
			console.log(editedPost)
			await queryClient.cancelQueries(['singlePost', editedPost.id])
			queryClient.setQueryData(['singlePost', editedPost.id], editedPost)
			dispatch({ type: 'FLASH_MESSAGE', payload: 'Your post has been edited successfully.' })
			history.goBack()
		}
	})
	
	const onSubmit = ({ title, body }) => mutate({ title, body, token, id })

	if (!post) return <NotFound />

	return (
		<Page title='Edit Post'>
			<Link className="small font-weight-bold" to={`/post/${id}`}>&laquo; Back to post permalink</Link>
			<form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
				<div className="form-group">
					<label className="text-muted mb-1">
						<small>Title</small>
					</label>
					<input {...register('title')} autoFocus defaultValue={post.title} name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
					{errors.title && <div className="alert alert-danger small liveValidateMessage">{errors.title.message}</div>}
				</div>

				<div className="form-group">
					<label htmlFor="post-body" className="text-muted mb-1 d-block">
						<small>Body Content</small>
					</label>
					<textarea {...register('body')} defaultValue={post.body} name="body" id="post-body" className="body-content tall-textarea form-control" type="text" />
					{errors.body && <div className="alert alert-danger small liveValidateMessage">{errors.body.message}</div>}
				</div>

				<button className="btn btn-primary" disabled={isLoading}>Update Post</button>
			</form>
		</Page>
	)
}

export default EditPost