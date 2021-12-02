import { useEffect, useRef, useState } from 'react'

export const usePortLoaded = () => {

	const [portLoaded, setPortLoaded] = useState(false)

	useEffect(() => {
		const div = document.createElement('div')
		div.id = 'toast'
		div.className = 'floating-alerts'
		document.getElementsByTagName('body')[0].prepend(div)
		setPortLoaded(true)
		return () => document.getElementsByTagName('body')[0].removeChild(div)
	}, [])

	return portLoaded
}

export const useToaster = () => {
	const ref = useRef()
	return { ref }
}