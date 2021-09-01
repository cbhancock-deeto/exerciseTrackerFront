// import LoginPage from './LoginPage/LoginPage';
import Dashboard from './Dashboard/Dashboard';
// import CreateUser from './CreateUser/CreateUser';
import React, { useState, useRef } from 'react';
import './App.css';

function App() {
	// const [loggedIn, setLoggedIn] = useState(false);
	// const [createUser, setCreateUser] = useState(false);
	const [user, setUser] = useState('Turtle');

	// function loginHandler(userLogin) {
	// 	setLoggedIn(true);
	// 	setUser(userLogin);
	// }

	// function initiateCreateUserHandler() {
	// 	setCreateUser(true);
	// }

	// function dismissCreateUserHandler() {
	// 	setCreateUser(false);
	// }

	return (
		<>
			<Dashboard user={user} />
			{/* {createUser ? (
				<CreateUser
					login={loginHandler}
					userCreated={dismissCreateUserHandler}
				/>
			) : (
				<></>
			)}
			{loggedIn ? (
				<Dashboard />
			) : (
				<LoginPage
					creatingUser={createUser}
					login={loginHandler}
					createUser={initiateCreateUserHandler}
				/>
			)}
			<p>{user}</p> */}
		</>
	);
}

export default App;
