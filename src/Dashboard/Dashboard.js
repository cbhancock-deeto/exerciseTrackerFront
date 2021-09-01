import React, { useState, useRef } from 'react';
import NavBar from '../NavBar/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Swims from '../ExercisePages/Swim';
import Runs from '../ExercisePages/Run';
import Bikes from '../ExercisePages/Bike';
import Home from '../ExercisePages/Home';

export default function Dashboard({ user }) {
	return (
		<>
			<Router>
				<NavBar />
				<Switch>
					<Route path='/' exact>
						{' '}
						<Home user={user} />{' '}
					</Route>
					<Route path='/swims'>
						<Swims user={user} />
					</Route>
					<Route path='/runs'>
						<Runs user={user} />
					</Route>
					<Route path='/bikes'>
						<Bikes user={user} />
					</Route>
				</Switch>
			</Router>
		</>
	);
}
