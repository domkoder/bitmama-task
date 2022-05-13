import './App.css'
import React from 'react'

import { usePageVisibility } from './hooks'

import AppContext from './contexts/app-context'
import { Footer, Header, SessionsList, LoginForm } from './components'

function App() {
	const isVisible = usePageVisibility()
	const { sessions, user, setUser } = React.useContext(AppContext)

	// check if user is in local storage if not logout the user.
	React.useEffect(() => {
		if (!user) return
		if (isVisible) {
			if (!sessions.find(({ id }) => id === user.id)) {
				setUser(null)
				return
			}
		}
	}, [isVisible, sessions, setUser, user])

	return (
		<div>
			{user ? (
				<div className="card">
					<Header />
					<SessionsList />
					<Footer />
				</div>
			) : (
				<div className="card">
					<h3 className="card__title">Login</h3>
					<LoginForm />
				</div>
			)}
		</div>
	)
}

export default App
