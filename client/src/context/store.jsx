import React, { createContext, useContext, useEffect, useMemo } from "react"
import { useImmerReducer } from "use-immer"

const StateContext = createContext()
const DispatchContext = createContext()

const initialState = {
	loggedIn: Boolean(localStorage.getItem('token')),
	flashMessages: [],
	user: {
		token: localStorage.getItem('token'),
		username: localStorage.getItem('username'),
		avatar: localStorage.getItem('avatar')
	}
}

const reducer = (draft, { type, payload }) => {
	switch (type) {
		case 'LOGIN':
			draft.loggedIn = true
			draft.user = payload
			return

		case 'LOGOUT':
			draft.loggedIn = false
			return

		case 'FLASH_MESSAGE':
			draft.flashMessages.push(payload)
			return
			
		default:
			break
	}
}

export const ContextProvider = ({ children }) => {

	const [state, dispatch] = useImmerReducer(reducer, initialState)

	useEffect(() => {
		if (state.loggedIn) {
			localStorage.setItem('token', state.user.token)
			localStorage.setItem('username', state.user.username)
			localStorage.setItem('avatar', state.user.avatar)
		} else {
			localStorage.removeItem('token')
			localStorage.removeItem('username')
			localStorage.removeItem('avatar')
		}
	}, [state.loggedIn])

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				{ children }
			</DispatchContext.Provider>
		</StateContext.Provider>
	)
}

export const useStateContext = () => {
	const { loggedIn, flashMessages, user } = useContext(StateContext)
	return useMemo(() => {
		return { loggedIn, flashMessages, user }
	}, [{ loggedIn, flashMessages, user }])
}

export const useDispatchContext = () => useContext(DispatchContext)