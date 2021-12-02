import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePortLoaded } from '../hooks'

const Toaster = forwardRef((props, ref) => {

	const portLoaded = usePortLoaded()
	const [toasts, setToasts] = useState([])

	useImperativeHandle(ref, () => ({
		addToast: toast => setToasts([...toasts, toast])
	}))

	return portLoaded && createPortal(
		<>
			{toasts?.map((toast, i) =>
				<div key={i} className='alert alert-success text-center floating-alert shadow-sm'>
					{toast}
				</div>
			)}
		</>,
		document.getElementById('flash')
	)
})

export default Toaster