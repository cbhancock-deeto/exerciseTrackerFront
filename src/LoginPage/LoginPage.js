import React, { useState, useRef } from 'react';

export default function LoginPage(props) {
	const usernameRef = useRef();
	const passwordRef = useRef();

	const LOGIN_API_URL = 'http://localhost:8000/user/login';

	function handleLogin() {
		const loginInformation = {
			username: usernameRef.current.value,
			password: passwordRef.current.value,
		};

		const loginRequestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(loginInformation),
		};

		fetch(LOGIN_API_URL, loginRequestOptions)
			.then((res) => res.json())
			.then((result) => {
				if (result.status === 'success') {
					props.login(usernameRef.current.value);
					// console.log(result);
				} else {
					console.log(result.message);
				}
			});
	}

	function showLoginPage() {
		if (!props.creatingUser) {
			console.log(props.creatingUser);
			return (
				<>
					<div>
						Username: <input ref={usernameRef} type='text' />
					</div>
					<br />
					<div>
						Password: <input ref={passwordRef} type='text' />
					</div>
					<br />
					<button onClick={handleLogin}>Login</button>
					<br />
					<br />
					<button onClick={props.createUser}>Create New User</button>
					<p>{props.loggedIn ? `${props.user} successfully logged in` : ''}</p>
				</>
			);
		}
	}

	return <div>{showLoginPage()}</div>;
}
