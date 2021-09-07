import React from 'react';
import './Modal.css';
import { useRef } from 'react';

function Modal(props) {
	const dateRef = useRef();
	const distanceRef = useRef();
	const notesRef = useRef();

	const CREATE_BIKE_URL = 'http://localhost:8000/bikes';

	const createBike = () => {
		const newBikeObj = {
			userID: props.user,
			distance: distanceRef.current.value,
			notes: notesRef.current.value,
			date: dateRef.current.value,
		};

		const createRequestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newBikeObj),
		};

		fetch(CREATE_BIKE_URL, createRequestOptions)
			.then((res) => res.json())
			.then((result) => {
				console.log(result.data.newBike);
				let bikeData = props.userBikes;

				bikeData.push(result.data.newBike);
				bikeData.sort((a, b) => {
					var dateA = new Date(a.date),
						dateB = new Date(b.date);
					return dateB - dateA;
				});
				props.setUserBikes(bikeData);
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
					<button onClick={createBike}>Create Bike</button>
					<button onClick={props.closeModal}>Cancel</button>
				</div>
			</div>
		</div>
	);
}

export default Modal;
