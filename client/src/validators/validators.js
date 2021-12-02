import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const postValidationSchema = yup.object().shape({
	title: yup.string().required('title is required boy'),
	body: yup.string().required('body is required boy')
})

export const postFormOptions = { mode: 'onBlur', resolver: yupResolver(postValidationSchema) }