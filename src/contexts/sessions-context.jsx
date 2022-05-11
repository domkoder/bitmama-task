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

	// find user by id in list of sessions
	const findUserInSessions = React.useCallback(
		() => (userId) => {
			// setSessions(JSON.parse(window.localStorage.getItem('sessions')))
			return sessions.find(({ id }) => id === userId)
		},
		[sessions]
	)

	// find user by id in list of sessions
	// const syncTabWithSession = React.useCallback(() => {
	// 	setSessions(JSON.parse(window.localStorage.getItem('sessions')))
	// 	console.log({ sessions })
	// }, [setSessions])

	return (
		<SessionsContext.Provider
			value={{
				test: 'test',
				sessions,
				removeUserFromSessions,
				addUserToSessions,
				findUserInSessions,
				setSessions,
			}}
		>
			{children}
		</SessionsContext.Provider>
	)
}

export default SessionsContext
