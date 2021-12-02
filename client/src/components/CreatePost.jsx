import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'

import Page from '../Container/Page'
import { useDispatchContext, useStateContext } from '../context/store'
import { createPost } from '../api'

const CreatePost = () => {

	const history = useHistory()

	const { user: { token } } = useStateContext()
	const dispatch = useDispatchContext()

	const { register, handleSubmit } = useForm()

	const { mutate } = useMutation(createPost, {
		onSuccess: (data, _, __) => {
			dispatch({ type: 'FLASH_MESSAGE', payload: 'Successfully created a new post.' })
			history.push(`/post/${data}`)
		}
	})

	const onSubmit = ({ title, body }) => mutate({ title, body, token })

	return (
		<Page title='New Post'>
			<form onSubmit={handleSubmit(onSubmit)} >
				<div className="form-group">
					<label htmlFor="post-title" className="text-muted mb-1">
						<small>Title</small>
					</label>
					<input {...register('title')} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
				</div>

				<div className="form-group">
					<label htmlFor="post-body" className="text-muted mb-1 d-block">
						<small>Body Content</small>
					</label>
					<textarea {...register('body')} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
				</div>

				<button className="btn btn-primary">Create Post</button>
			</form>
		</Page>
	)
}

export default CreatePost