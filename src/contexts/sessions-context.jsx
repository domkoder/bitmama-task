import React from 'react'
import { useLocalStorageState } from '../hooks'

const SessionsContext = React.createContext()

export function SessionsProvider({ children }) {
	const [sessions, setSessions] = useLocalStorageState('sessions', [])

	// remove user from list of sessions
	const removeUserFromSessions = (userId) => {
		setSessions(sessions.filter(({ id }) => id !== userId))
	}

	// add user to list of sessions
	const addUserToSessions = (user) => {
		setSessions((prevState) => [...prevState, user])
	}

	return (
		<SessionsContext.Provider
			value={{
				test: 'test',
				sessions,
				removeUserFromSessions,
				addUserToSessions,
			}}
		>
			{children}
		</SessionsContext.Provider>
	)
}

export default SessionsContext
