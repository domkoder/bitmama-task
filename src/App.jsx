import React from 'react'
import './App.css'
import { ReactComponent as ProfileIcon } from './icons/profile-circle.svg'
import { ReactComponent as UserIcon } from './icons/profile.svg'

function App() {
	// const sessions = [
	// 	{
	// 		username: 'nandom',
	// 		status: 'active',
	// 		isRemoved: false,
	// 	},

	// 	{
	// 		username: 'levi',
	// 		status: 'active',
	// 		isRemoved: false,
	// 	},

	// 	{
	// 		username: 'robinson',
	// 		status: 'active',
	// 		isRemoved: false,
	// 	},
	// ]

	const [user, setUser] = React.useState(
		JSON.parse(sessionStorage.getItem('username')) || null
	)

	const [sessions, setSessions] = React.useState(
		JSON.parse(localStorage.getItem('sessions')) || []
	)

	const handleLogout = () => {
		localStorage.setItem(
			'sessions',
			JSON.stringify(sessions.filter(({ username }) => username !== user))
		)
		setSessions(JSON.parse(localStorage.getItem('sessions')))

		sessionStorage.setItem('username', JSON.stringify(null))
		setUser(JSON.parse(sessionStorage.getItem('username')))
	}

	const handleLogin = (event) => {
		event.preventDefault()
		const username = event.target.username.value

		// Login the user
		sessionStorage.setItem('username', JSON.stringify(username))
		setUser(JSON.parse(sessionStorage.getItem('username')))

		// save user session to local storage
		localStorage.setItem(
			'sessions',
			JSON.stringify([
				...sessions,
				{
					username,
					status: 'active',
					isRemoved: false,
				},
			])
		)
		setSessions(JSON.parse(localStorage.getItem('sessions')))
	}

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
								<li className="list__item">
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
