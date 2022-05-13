import React from 'react'
import { useLocalStorageState } from '../hooks'
import { useSessionStorageState } from '../hooks'

const AppContext = React.createContext()

export function AppProvider({ children }) {
	const [sessions, setSessions] = useLocalStorageState('sessions', [])
	const [user, setUser] = useSessionStorageState('user', null)

	// remove user from list of sessions
	const removeUserFromSessions = (userId) => {
		setSessions(sessions.filter(({ id }) => id !== userId))
	}

	// add user to list of sessions
	const addUserToSessions = (user) => {
		let newSessions = JSON.parse(window.localStorage.getItem('sessions')) || []
		setSessions([user, ...newSessions])
	}

	const handleLogin = (event) => {
		event.preventDefault()
		const username = event.target.username.value

		// check if user is already already in session
		let newSessions = JSON.parse(window.localStorage.getItem('sessions')) || []
		const foundUser = newSessions.find(
			(session) => session.username === username
		)
		if (foundUser) {
			alert(`user with this username ${username} already exist`)
			return
		}

		// creat user object
		const id = Math.floor(Math.random() * 10000) + 1
		const newUser = {
			id,
			username,
			status: 'active',
			lastActive: false,
		}
		setUser(newUser)
		addUserToSessions(newUser)
		// window.location.reload()
	}

	const handleLogout = () => {
		window.location.reload()
		removeUserFromSessions(user.id)
		setUser(null)
		// window.close()
	}

	const handleClear = () => {
		var clicked = window.confirm(
			`Please click 'OK' if you are sure you want to clear all sessions`
		)
		if (clicked === true) {
			setSessions([])
		}
	}

	return (
		<AppContext.Provider
			value={{
				test: 'test',
				sessions,
				removeUserFromSessions,
				addUserToSessions,
				setSessions,
				handleLogin,
				handleLogout,
				handleClear,
				user,
				setUser,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export default AppContext
