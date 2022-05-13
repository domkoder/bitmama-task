import React from 'react'
import AppContext from '../contexts/app-context'

function Footer() {
	const { handleClear } = React.useContext(AppContext)

	return (
		<footer className="footer">
			<button className="button button-danger" onClick={handleClear}>
				Clear all sessions
			</button>
		</footer>
	)
}

export default Footer
