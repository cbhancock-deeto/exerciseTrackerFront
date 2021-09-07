import React, { useState, useEffect } from 'react';
import './exercise.css';
import Modal from './Modal/SwimModal';
import CreateSwimModal from './Modal/CreateSwimModal';

let swimData = [];

function Swim({ user }) {
	const [userSwims, setUserSwims] = useState([]);
	const [modalActive, setModalActive] = useState(false);
	const [createModalActive, setCreateModalActive] = useState(false);
	const [updateSwim, setUpdateSwim] = useState();

	// API endpoint for CRUD operations
	const CRUD_SWIM_URL = 'http://localhost:8000/swims';

	useEffect(() => {
		fetch(CRUD_SWIM_URL + '/' + user)
			.then((res) => res.json())
			.then((result) => {
				if (result.status === 'success') {
					// sort swims by most recent at the beginning of array
					swimData = result.data.swims;
					console.log(result.data.swims);
					swimData.sort((a, b) => {
						var dateA = new Date(a.date),
							dateB = new Date(b.date);
						return dateB - dateA;
					});
					setUserSwims(swimData);
				} else {
					console.log(result.data.message);
				}
			});
		console.log(CRUD_SWIM_URL + '/' + user);
	}, []);

	const dateFormatter = (inStr) => {
		return inStr.slice(0, 10);
	};

	const handleClick = (e, a) => {
		e.preventDefault();
		setUpdateSwim(a);
		setModalActive(true);
	};

	const handleNewSwim = () => {
		setModalActive(false);
		setCreateModalActive(true);
	};

	return (
		<div className='e-page'>
			<h1 className='exercise-title'> SWIMS:</h1>

			{swimData.map((a) => (
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

			<button onClick={handleNewSwim} className='new-exercise-button'>
				New Swim
			</button>
			{createModalActive && (
				<CreateSwimModal
					closeModal={() => setCreateModalActive(!createModalActive)}
					user={user}
					userSwims={userSwims}
					setUserSwims={setUserSwims}
				/>
			)}
			{modalActive && (
				<Modal
					closeModal={() => setModalActive(!modalActive)}
					date={updateSwim.date}
					distance={updateSwim.distance}
					notes={updateSwim.notes}
					userId={updateSwim.userId}
					swimId={updateSwim._id}
					setUserSwims={setUserSwims}
					userSwims={userSwims}
					dateFormatter={dateFormatter}
				/>
			)}
		</div>
	);
}

export default Swim;
