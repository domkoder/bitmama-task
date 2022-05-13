/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

import { ReactComponent as UserIcon } from '../assets/icons/profile.svg'

import { usePageVisibility } from '../hooks'

import empty from '../assets/images/add-user.png'

import AppContext from '../contexts/app-context'

function SessionsList() {
	const { sessions, setSessions, removeUserFromSessions, user } =
		React.useContext(AppContext)
	const isVisible = usePageVisibility()

	// set user status to idle after 60s of the tab not being active
	React.useEffect(() => {
		if (!user) return

		let timeOutId
		if (!isVisible) {
			timeOutId = setTimeout(() => {
				let newSessions =
					JSON.parse(window.localStorage.getItem('sessions')) || []

				setSessions(
					newSessions.map((session) =>
						session.id === user.id ? { ...session, status: 'idle' } : session
					)
				)
			}, 60000)
		}
		return () => {
			clearTimeout(timeOutId)
		}
	}, [isVisible, sessions, setSessions, user])

	// set the last active user
	React.useEffect(() => {
		if (!user) return
		if (!isVisible) {
			let newSessions =
				JSON.parse(window.localStorage.getItem('sessions')) || []

			setSessions(
				newSessions.map((session) =>
					session.id === user.id
						? { ...session, lastActive: true }
						: { ...session, lastActive: false }
				)
			)
		}
	}, [isVisible])

	// Refresh the app after 1 second
	React.useEffect(() => {
		let intervalId

		if (isVisible) {
			intervalId = setInterval(() => {
				let newSessions =
					JSON.parse(window.localStorage.getItem('sessions')) || []

				setSessions(
					newSessions.map((session) =>
						session.id === user.id ? { ...session, status: 'active' } : session
					)
				)
			}, 500)
		}
		return () => {
			clearInterval(intervalId)
		}
	}, [isVisible, setSessions])

	return (
		<>
			{sessions.length === 1 ? (
				<div className="image">
					<img src={empty} width="100px" alt="empty state" />
				</div>
			) : (
				<ul className="list">
					{sessions
						.filter(({ id }) => id !== user.id)
						.map(({ username, status, id }) => (
							<li className="list__item" key={username}>
								<div className="user__info">
									<span className="user__icon">
										<UserIcon />
									</span>
									<div>
										<div>
											{username}
											<span
												className={`user__status ${
													status === 'active' ? 'active' : ''
												}`}
											>
												{status}
											</span>
										</div>
									</div>
								</div>
								<button
									className="delete"
									onClick={() => removeUserFromSessions(id)}
								>
									×
								</button>
							</li>
						))}
				</ul>
			)}
		</>
	)
}

export default SessionsList
