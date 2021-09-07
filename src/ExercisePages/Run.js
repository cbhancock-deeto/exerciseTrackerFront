import React, { useState, useEffect } from 'react';
import './exercise.css';
import Modal from './Modal/RunModal';
import CreateRunModal from './Modal/CreateRunModal';

let runData = [];

function Run({ user }) {
	const [userRuns, setUserRuns] = useState([]);
	const [modalActive, setModalActive] = useState(false);
	const [createModalActive, setCreateModalActive] = useState(false);
	const [updateRun, setUpdateRun] = useState();

	// API endpoint for CRUD operations
	const CRUD_RUN_URL = 'http://localhost:8000/runs';

	useEffect(() => {
		fetch(CRUD_RUN_URL + '/' + user)
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				if (result.status === 'success' && result.length > 0) {
					// sort runs by most recent at the beginning of array
					runData = result.data.runs;
					runData.sort((a, b) => {
						var dateA = new Date(a.date),
							dateB = new Date(b.date);
						return dateB - dateA;
					});
					console.log(runData);
					setUserRuns(runData);
				} else {
					//console.log(result.data.message);
				}
			});
	}, []);

	const dateFormatter = (inStr) => {
		if (inStr) return inStr.slice(0, 10);
	};

	const handleClick = (e, a) => {
		e.preventDefault();
		setUpdateRun(a);
		setModalActive(true);
	};

	const handleNewRun = () => {
		setModalActive(false);
		setCreateModalActive(true);
	};

	return (
		<div className='e-page'>
			<h1 className='exercise-title'>RUNS:</h1>
			{runData.map((a) => (
				<div
					className='exercise-card'
					onClick={(e) => handleClick(e, a)}
					key={a._id}
				>
					<h3 className='ecard-date'>Date: {dateFormatter(a.date)}</h3>
					<div>Distance: {a.distance}</div>
					<div>Notes: {a.notes}</div> <br />
				</div>
			))}
			<button onClick={handleNewRun} className='new-exercise-button'>
				New Run
			</button>
			{createModalActive && (
				<CreateRunModal
					closeModal={() => setCreateModalActive(!createModalActive)}
					user={user}
					userRuns={userRuns}
					setUserRuns={setUserRuns}
				/>
			)}
			{modalActive && (
				<Modal
					closeModal={() => setModalActive(!modalActive)}
					date={updateRun.date}
					distance={updateRun.distance}
					notes={updateRun.notes}
					userId={updateRun.userID}
					runId={updateRun._id}
					setUserRuns={setUserRuns}
					userRuns={userRuns}
					dateFormatter={dateFormatter}
				/>
			)}
		</div>
	);
}

export default Run;
