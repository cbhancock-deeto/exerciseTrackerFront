import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';

export const NavBarData = [
	{
		title: 'Home',
		path: '/',
		icon: <AiIcons.AiFillHome />,
		cName: 'nav-text',
	},
	{
		title: 'Runs',
		path: '/runs',
		icon: <FaIcons.FaRunning />,
		cName: 'nav-text',
	},
	{
		title: 'Swims',
		path: '/swims',
		icon: <FaIcons.FaSwimmer />,
		cName: 'nav-text',
	},
	{
		title: 'Bikes',
		path: '/bikes',
		icon: <MdIcons.MdDirectionsBike />,
		cName: 'nav-text',
	},
];
