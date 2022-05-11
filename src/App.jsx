import './App.css'
import React from 'react'

import { useSessionStorageState, usePageVisibility } from './hooks'

import SessionsContext, { SessionsProvider } from './contexts/sessions-context'

import { ReactComponent as ProfileIcon } from './icons/profile-circle.svg'
import { ReactComponent as UserIcon } from './icons/profile.svg'

function App() {
	// const [sessions, setSessions] = useLocalStorageState('sessions', [])
	const [user, setUser] = useSessionStorageState('user', null)
	const { sessions, removeUserFromSessions, addUserToSessions, setSessions } =
		React.useContext(SessionsContext)

	const isVisible = usePageVisibility()
	const [state, setState] = React.useState({})

	// refresh the active active every 60 second.
	// React.useEffect(() => {
	// 	if (!user) return

	// 	let intervalId
	// 	if (isVisible) {
	// 		intervalId = setInterval(() => {
	// 			// setSessions([...sessions])
	// 			// setUser(user)
	// 			window.location.reload(false)
	// 			console.log('has reset')
	// 		}, 30000)
	// 	}

	// 	return () => {
	// 		clearInterval(intervalId)
	// 	}
	// }, [isVisible, user])

	// set user status to idle after 60s of the tab not being active
	// React.useEffect(() => {
	// 	if (!user) return

	// 	let timeOutId
	// 	if (!isVisible) {
	// 		setUser({ ...user, status: 'idle' })
	// 		timeOutId = setTimeout(() => {
	// 			setSessions(
	// 				sessions.map((session) =>
	// 					session.id === user.id ? { ...session, status: 'idle' } : session
	// 				)
	// 			)
	// 			setUser({ ...user, status: 'idle' })
	// 			console.log('changing status after 60 sec')
	// 		}, 60000)
	// 	}

	// 	return () => {
	// 		clearTimeout(timeOutId)
	// 	}
	// }, [isVisible])

	React.useEffect(() => {
		if (!user) return
		let intervalId
		if (isVisible) {
			intervalId = setInterval(() => {
				setSessions(JSON.parse(window.localStorage.getItem('sessions')) || [])
			}, 500)
		}
		return () => {
			clearInterval(intervalId)
		}
	}, [isVisible, sessions, setSessions, user])

	React.useEffect(() => {
		if (!user) return
		if (isVisible) {
			if (!sessions.find(({ id }) => id === user.id)) {
				setUser(null)
			}
		}
	}, [isVisible, sessions, setUser, user])

	const handleLogout = () => {
		window.location.reload()
		removeUserFromSessions(user.id)
		setUser(null)
		// window.close()
	}

	const handleLogin = (event) => {
		const username = event.target.username.value

		// creat user object
		const id = Math.floor(Math.random() * 10000) + 1
		const newUser = {
			id,
			username,
			status: 'active',
		}
		setUser(newUser)
		addUserToSessions(newUser)
		window.location.reload()
	}

	const clicked = () => {
		setState('clicked')
		console.log('clicked')
	}

	return (
		<div>
			{/* {`${console.log('render me')}`} */}
			<button onClick={clicked}>rerender</button>
			{user ? (
				<div className="card">
					<header className="header">
						<div className="profile__info ">
							<ProfileIcon className="profile__icon" />
							<p>{user.username}</p>
						</div>
						<a
							href="http://localhost:3000/"
							target="_blank"
							rel="noreferrer"
							className="button"
						>
							Login another account
						</a>
						<button className="button button-secondary" onClick={handleLogout}>
							Logout
						</button>
					</header>

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
													className={`
													user__status ${status === 'active' ? 'active' : ''}
												`}
												>
													{status}
												</span>
											</div>
											<div className="user__tab">Tab 1</div>
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
				</div>
			) : (
				<div className="card">
					<h3 className="card__title">Login</h3>
					<form className="form" onSubmit={handleLogin}>
						<div className="form__control">
							<label className="form__label" htmlFor="username">
								Username
							</label>
							<input
								className="form__input"
								id="username"
								autoComplete="off"
								required
							/>
						</div>

						<div className="form__control">
							<button className="button" type="submit">
								Login
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	)
}

export default App
