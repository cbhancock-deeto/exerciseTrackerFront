import React, { useState, useEffect } from 'react';
import './exercise.css';

let runData = [];

function Run({ user }) {
	const [userRuns, setUserRuns] = useState([]);
	const [updateId, setUpdateId] = useState();

	// API endpoint for CRUD operations
	const CRUD_RUN_URL = 'http://localhost:8000/runs';

	// API endpoint for getting one run by id
	const GET_BY_ID_RUN_URL = 'http://localhost:8000/runById';

	console.log(CRUD_RUN_URL + '/' + user);
	useEffect(() => {
		fetch(CRUD_RUN_URL + '/' + user)
			.then((res) => res.json())
			.then((result) => {
				if (result.status === 'success') {
					// sort runs by most recent at the beginning of array
					let runData = result.data.runs;
					runData.sort((a, b) => {
						var dateA = new Date(a.date),
							dateB = new Date(b.date);
						return dateB - dateA;
					});
					setUserRuns(runData);
				} else {
					console.log(result.data.message);
				}
			});
	}, [runData]);

	const dateFormatter = (inStr) => {
		return inStr.slice(0, 10);
	};

	const handleClick = (e) => {
		// console.log(e.target.id);
		setUpdateId(e.target.id);
		console.log(updateId);
	};

	return (
		<div className='run-page'>
			{userRuns.map((a) => (
				<div
					className='exercise-card'
					id={a._id}
					onClick={handleClick}
					key={a._id}
				>
					{console.log(a._id)}
					<h3 className='ecard-date'>Date: {dateFormatter(a.date)}</h3>
					<div>Distance: {a.distance}</div>
					<div>Notes: {a.notes}</div> <br />
				</div>
			))}
		</div>
	);
}

export default Run;
