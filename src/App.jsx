import React from 'react'

// import {
// 	useLocalStorageState,
// 	useSessionStorageState,
// 	usePageVisibility,
// } from './hooks'

import {
	useLocalStorageState,
	useSessionStorageState,
	usePageVisibility,
} from './hooks'

import './App.css'

import { ReactComponent as ProfileIcon } from './icons/profile-circle.svg'
import { ReactComponent as UserIcon } from './icons/profile.svg'

function App() {
	const [sessions, setSessions] = useLocalStorageState('sessions', [])
	const [user, setUser] = useSessionStorageState('user', null)
	const isVisible = usePageVisibility()

	// Change the title based on page visibility

	// if (isVisible) {
	// 	document.title = 'Active'
	// } else {
	// 	document.title = 'Inactive'
	// }

	// const refresh = () => {
	// 	setSessions([...sessions])
	// 	setUser(user)
	// }

	// if (isVisible) {
	// 	refresh()
	// }

	React.useEffect(() => {
		if (!user) return
		if (!sessions.find((session) => session.id === user.id)) {
			console.log('running')
			setUser(null)
		}
		// console.log('running')
	}, [sessions, setUser, user])

	const handleLogout = () => {
		removeSession(user.id)
		setUser(null)
	}

	const handleLogin = (event) => {
		event.preventDefault()
		const username = event.target.username.value

		// creat user object
		const id = Math.floor(Math.random() * 10000) + 1
		const newUser = {
			id,
			username,
			status: 'active',
		}

		// add user to session
		setUser(newUser)

		// add user session to list of sessions
		setSessions([...sessions, newUser])
	}

	// remove user session from list of sessions
	const removeSession = (userId) => {
		setSessions(sessions.filter(({ id }) => id !== userId))
	}

	return (
		<div>
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
									<button className="delete" onClick={() => removeSession(id)}>
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
