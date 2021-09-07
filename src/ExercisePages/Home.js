import React from 'react';
import './home.css';

function Home({ user }) {
	return (
		<div className='home-page'>
			<h1 className='home-title'> Welcome to the Exercise Tracker, {user}!</h1>
		</div>
	);
}

export default Home;
