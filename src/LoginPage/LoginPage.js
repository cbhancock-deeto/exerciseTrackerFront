import React, { useState, useRef } from 'react';
import './LoginPage.css';

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
				} else {
					console.log(result.message);
				}
			});
	}

	function showLoginPage() {
		if (!props.creatingUser) {
			console.log(props.creatingUser);
			return (
				<div className={'l-page'}>
					<div className={'login-box'}>
						<div>
							<label className={'l-label'} for='username'>
								Username:{' '}
							</label>{' '}
							<input ref={usernameRef} type='text' />
						</div>
						<br />
						<div>
							<label className={'l-label'} for='password'>
								Password:{' '}
							</label>{' '}
							<input ref={passwordRef} type='text' />
						</div>
						<br />
						<div className={'button-box'}>
							<button className={'l-button'} onClick={handleLogin}>
								Login
							</button>
							<button className={'l-button'} onClick={props.createUser}>
								Create New User
							</button>
						</div>
						<p>
							{props.loggedIn ? `${props.user} successfully logged in` : ''}
						</p>
					</div>
				</div>
			);
		}
	}

	return <div>{showLoginPage()}</div>;
}
