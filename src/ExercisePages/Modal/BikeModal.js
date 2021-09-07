import React from 'react';
import './Modal.css';
import { useRef } from 'react';

function Modal(props) {
	const dateRef = useRef();
	const distanceRef = useRef();
	const notesRef = useRef();

	const CRUD_BIKE_URL = 'http://localhost:8000/bikes/' + props.bikeId;
	const BIKE_DEL_URL = 'http://localhost:8000/bikes';

	function handleUpdate() {
		const updateBikeObj = {
			userID: props.userId,
			distance: distanceRef.current.value,
			notes: notesRef.current.value,
			date: dateRef.current.value,
		};

		const updateRequestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updateBikeObj),
		};

		fetch(CRUD_BIKE_URL, updateRequestOptions)
			.then((res) => res.json())
			.then((result) => {
				let bikeData = props.userBikes;
				let updateBike = bikeData.findIndex((e) => e._id === props.bikeId);
				bikeData[updateBike] = {
					_id: props.bikeId,
					userID: props.userId,
					date: dateRef.current.value,
					distance: distanceRef.current.value,
					notes: notesRef.current.value,
				};

				bikeData.sort((a, b) => {
					var dateA = new Date(a.date),
						dateB = new Date(b.date);
					return dateB - dateA;
				});

				props.setUserBikes(bikeData);
				props.closeModal();
			});
	}

	function handleDelete() {
		const deleteBikeObj = {
			_id: props.bikeId,
		};

		const deleteRequestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(deleteBikeObj),
		};

		fetch(BIKE_DEL_URL, deleteRequestOptions)
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				let bikeData = props.userBikes;
				let index = bikeData.findIndex((e) => e._id === props.bikeId);
				bikeData.splice(index, 1);
				props.setUserBikes(bikeData);
				props.closeModal();
			});
	}

	return (
		<div className='background'>
			<div className='modal'>
				<h2 className='title'>UPDATE EXERCISE: </h2>
				Date (yyyy-mm-dd):{' '}
				<input
					type='text'
					ref={dateRef}
					defaultValue={props.dateFormatter(props.date)}
				/>
				Distance (km):{' '}
				<input ref={distanceRef} type='text' defaultValue={props.distance} />
				<p>Notes: </p>
				<textarea
					defaultValue={props.notes}
					ref={notesRef}
					rows='4'
					cols='40'
				/>
				<div className='buttons'>
					<button onClick={handleUpdate}>Update</button>
					<button onClick={handleDelete}>Delete</button>
					<button onClick={props.closeModal}>Cancel</button>
				</div>
			</div>
		</div>
	);
}

export default Modal;
