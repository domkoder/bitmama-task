import React from 'react'

import { useLocalStorageState, useSessionStorageState } from './hooks'

import './App.css'

import { ReactComponent as ProfileIcon } from './icons/profile-circle.svg'
import { ReactComponent as UserIcon } from './icons/profile.svg'

function App() {
	const [sessions, setSessions] = useLocalStorageState('sessions', [])
	const [user, setUser] = useSessionStorageState('user', null)

	const handleLogout = () => {
		setSessions(sessions.filter(({ username }) => username !== user))
		setUser(null)
	}

	const handleLogin = (event) => {
		event.preventDefault()
		const username = event.target.username.value

		// Login the user

		setUser(username)
		// save user session to local storage
		setSessions([
			...sessions,
			{
				username,
				status: 'active',
				isRemoved: false,
			},
		])
	}

	console.log({ sessions })
	console.log(JSON.parse(localStorage.getItem('sessions')))

	return (
		<div>
			{user ? (
				<div className="card">
					<header className="header">
						<div className="profile__info ">
							<ProfileIcon className="profile__icon" />
							<p>{user}</p>
						</div>
						<button className="button button-secondary" onClick={handleLogout}>
							Logout
						</button>
					</header>

					<ul className="list">
						{sessions
							.filter(
								({ username, isRemoved }) => username !== user && !isRemoved
							)
							.map(({ username, status }) => (
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
									<button class="delete">×</button>
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
