import React, { useState, useEffect } from 'react';
import './exercise.css';
import Modal from './Modal/BikeModal';
import CreateBikeModal from './Modal/CreateBikeModal';

let bikeData = [];

function Bike({ user }) {
	const [userBikes, setUserBikes] = useState([]);
	const [modalActive, setModalActive] = useState(false);
	const [createModalActive, setCreateModalActive] = useState(false);
	const [updateBike, setUpdateBike] = useState();

	// API endpoint for CRUD operations
	const CRUD_BIKE_URL = 'http://localhost:8000/bikes';

	useEffect(() => {
		fetch(CRUD_BIKE_URL + '/' + user)
			.then((res) => res.json())
			.then((result) => {
				if (result.status === 'success' && result.length > 0) {
					// sort bikes by most recent at the beginning of array
					console.log(result.data);
					bikeData = result.data.bikes;
					bikeData.sort((a, b) => {
						var dateA = new Date(a.date),
							dateB = new Date(b.date);
						return dateB - dateA;
					});
					setUserBikes(bikeData);
				} else {
					console.log(result.data.message);
				}
			});
	}, []);

	const dateFormatter = (inStr) => {
		return inStr.slice(0, 10);
	};

	const handleClick = (e, a) => {
		e.preventDefault();
		setUpdateBike(a);
		setModalActive(true);
	};

	const handleNewBike = () => {
		setModalActive(false);
		setCreateModalActive(true);
	};

	return (
		<div className='e-page'>
			<h1 className='exercise-title'>BIKES:</h1>
			{bikeData.map((a) => (
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
			<button onClick={handleNewBike} className='new-exercise-button'>
				New Bike
			</button>
			{createModalActive && (
				<CreateBikeModal
					closeModal={() => setCreateModalActive(!createModalActive)}
					user={user}
					userBikes={userBikes}
					setUserBikes={setUserBikes}
				/>
			)}
			{modalActive && (
				<Modal
					closeModal={() => setModalActive(!modalActive)}
					date={updateBike.date}
					distance={updateBike.distance}
					notes={updateBike.notes}
					userId={updateBike.userID}
					bikeId={updateBike._id}
					setUserBikes={setUserBikes}
					userBikes={userBikes}
					dateFormatter={dateFormatter}
				/>
			)}
		</div>
	);
}

export default Bike;
