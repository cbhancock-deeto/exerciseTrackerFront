import React from 'react';
import './Modal.css';
import { useRef } from 'react';

function Modal(props) {
	const dateRef = useRef();
	const distanceRef = useRef();
	const notesRef = useRef();

	const CRUD_SWIM_URL = 'http://localhost:8000/swims/' + props.swimId;
	const SWIM_DEL_URL = 'http://localhost:8000/swims';

	function handleUpdate() {
		const updateSwimObj = {
			userID: props.userId,
			distance: distanceRef.current.value,
			notes: notesRef.current.value,
			date: dateRef.current.value,
		};

		const updateRequestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updateSwimObj),
		};

		fetch(CRUD_SWIM_URL, updateRequestOptions)
			.then((res) => res.json())
			.then((result) => {
				let swimData = props.userSwims;
				let updateSwim = swimData.findIndex((e) => e._id === props.swimId);
				swimData[updateSwim] = {
					_id: props.swimId,
					userID: props.userId,
					date: dateRef.current.value,
					distance: distanceRef.current.value,
					notes: notesRef.current.value,
				};

				swimData.sort((a, b) => {
					var dateA = new Date(a.date),
						dateB = new Date(b.date);
					return dateB - dateA;
				});

				props.setUserSwims(swimData);
				props.closeModal();
			});
	}

	function handleDelete() {
		const deleteSwimObj = {
			_id: props.swimId,
		};

		const deleteRequestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(deleteSwimObj),
		};

		fetch(SWIM_DEL_URL, deleteRequestOptions)
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				let swimData = props.userSwims;
				let index = swimData.findIndex((e) => e._id === props.swimId);
				swimData.splice(index, 1);
				props.setUserSwims(swimData);
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
