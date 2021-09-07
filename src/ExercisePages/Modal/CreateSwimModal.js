import React from 'react';
import './Modal.css';
import { useRef } from 'react';

function Modal(props) {
	const dateRef = useRef();
	const distanceRef = useRef();
	const notesRef = useRef();

	const CREATE_SWIM_URL = 'http://localhost:8000/swims';

	const createSwim = () => {
		const newSwimObj = {
			userID: props.user,
			distance: distanceRef.current.value,
			notes: notesRef.current.value,
			date: dateRef.current.value,
		};

		const createRequestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newSwimObj),
		};

		fetch(CREATE_SWIM_URL, createRequestOptions)
			.then((res) => res.json())
			.then((result) => {
				console.log(result.data.newSwim);
				let swimData = props.userSwims;

				swimData.push(result.data.newSwim);
				swimData.sort((a, b) => {
					var dateA = new Date(a.date),
						dateB = new Date(b.date);
					return dateB - dateA;
				});
				props.setUserSwims(swimData);
				props.closeModal();
				document.location.reload(true);
			});
	};

	return (
		<div className='background'>
			<div className='modal'>
				<h2 className='title'>CREATE EXERCISE: </h2>
				Date (yyyy-mm-dd):{' '}
				<input type='text' ref={dateRef} defaultValue={'yyyy-mm-dd'} />
				Distance (km): <input ref={distanceRef} type='text' />
				<p>Notes: </p>
				<textarea ref={notesRef} rows='4' cols='40' />
				<div className='buttons'>
					<button onClick={createSwim}>Create Swim</button>
					<button onClick={props.closeModal}>Cancel</button>
				</div>
			</div>
		</div>
	);
}

export default Modal;
