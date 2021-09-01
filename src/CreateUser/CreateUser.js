import React, { useState, useRef } from 'react';

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

	return (
		<>
			<div>
				New username: <input ref={newUsernameRef} type='text' />
			</div>
			<div>
				New password: <input ref={newPasswordRef} type='text' />
			</div>
			<div>
				Email address: <input ref={newEmailRef} type='text' />
			</div>
			<button onClick={handleCreateNewUser}>Create Account</button>
		</>
	);
}
