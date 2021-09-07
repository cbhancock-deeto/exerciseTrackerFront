import React, { useState, useRef } from 'react';
import './CreateUser.css';

export default function CreateUser(props) {
	const newUsernameRef = useRef();
	const newPasswordRef = useRef();
	const newEmailRef = useRef();

	const CREATE_USER_URL = 'http://localhost:8000/user';

	function handleCreateNewUser() {
		const user = newUsernameRef.current.value;
		const email = newEmailRef.current.value;
		const password = newPasswordRef.current.value;

		if (user.length == 0 || email.length == 0 || password.length == 0) {
			return alert('An input field is empty');
		}
		const newUser = {
			username: user,
			email: email,
			password: password,
		};

		const createUserRequestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newUser),
		};

		fetch(CREATE_USER_URL, createUserRequestOptions)
			.then((res) => res.json())
			.then((result) => {
				if (result.status === 'success') {
					alert('User successfully created');
					props.login(newUser.username);
					props.userCreated();
				} else {
					alert(result.status);
				}
			});
	}

	const cancelCreateUserHandler = () => {
		// user is not actually created - this is just to close the create user page
		props.userCreated();
	};

	return (
		<div className={'c-user-page'}>
			<div className={'c-user-box'}>
				<div className={'user-input'}>
					<label for='username'>New Username: </label>
					<input ref={newUsernameRef} type='text' />
				</div>
				<div className={'user-input'}>
					<label for='password'>New Password: </label>{' '}
					<input ref={newPasswordRef} type='text' />
				</div>
				<div className={'user-input'}>
					<label>Email Address: </label>
					<input ref={newEmailRef} type='text' />
				</div>
				<div className={'button-box'}>
					<button className={'create-button'} onClick={handleCreateNewUser}>
						Create Account
					</button>
					<button className={'create-button'} onClick={cancelCreateUserHandler}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}
