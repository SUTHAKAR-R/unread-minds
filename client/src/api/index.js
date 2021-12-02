export const createPost = async ({ title, body, token }) => {
	try {
		const response = await fetch('http://localhost:5000/create-post', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ title, body, token })
		})
		const post = await response.json()
		return post
	} catch (e) {
		console.log(e)
	}
}

export const fetchProfileData = async ({ queryKey }) => {
	const { username, token } = queryKey[1]
	try {
		const response = await fetch(`http://localhost:5000/profile/${username}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ token })
		})
		const profilData = await response.json()
		return profilData
	} catch (e) {
		console.log(e)
	}
}

export const editPost = async ({ title, body, token, id }) => {
	try {
		const response = await fetch(`http://localhost:5000/post/${id}/edit`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ title, body, token })
		})
		const editedPost = await response.json()
		return editedPost
	} catch (e) {
		console.log(e)
	}
}