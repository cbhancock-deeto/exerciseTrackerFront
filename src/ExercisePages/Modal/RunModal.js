import React from 'react';
import './Modal.css';
import { useRef } from 'react';

function Modal(props) {
	const dateRef = useRef();
	const distanceRef = useRef();
	const notesRef = useRef();

	const CRUD_RUN_URL = 'http://localhost:8000/runs/' + props.runId;
	const RUN_DEL_URL = 'http://localhost:8000/runs';

	function handleUpdate() {
		const updateRunObj = {
			userID: props.userId,
			distance: distanceRef.current.value,
			notes: notesRef.current.value,
			date: dateRef.current.value,
		};

		const updateRequestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updateRunObj),
		};

		fetch(CRUD_RUN_URL, updateRequestOptions)
			.then((res) => res.json())
			.then((result) => {
				let runData = props.userRuns;
				let updateRun = runData.findIndex((e) => e._id === props.runId);
				runData[updateRun] = {
					_id: props.runId,
					userID: props.userId,
					date: dateRef.current.value,
					distance: distanceRef.current.value,
					notes: notesRef.current.value,
				};

				runData.sort((a, b) => {
					var dateA = new Date(a.date),
						dateB = new Date(b.date);
					return dateB - dateA;
				});

				props.setUserRuns(runData);
				props.closeModal();
			});
	}

	function handleDelete() {
		const deleteRunObj = {
			_id: props.runId,
		};

		const deleteRequestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(deleteRunObj),
		};

		fetch(RUN_DEL_URL, deleteRequestOptions)
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				let runData = props.userRuns;
				let index = runData.findIndex((e) => e._id === props.runId);
				runData.splice(index, 1);
				props.setUserRuns(runData);
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
