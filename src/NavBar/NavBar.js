import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { NavBarData } from './NavBarData';
import './NavBar.css';

export default function NavBar({ logout }) {
	const [sidebar, setSidebar] = useState(false);

	const showSidebar = () => setSidebar(!sidebar);

	return (
		<>
			<IconContext.Provider value={{ color: '#fff' }}>
				<div className='navbar'>
					<Link to='#' className='menu-bars'>
						<FaIcons.FaBars onClick={showSidebar} />
					</Link>
				</div>
				<nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
					<ul className='nav-menu-items' onClick={showSidebar}>
						<li className='navbar-toggle'>
							<Link to='#' className='menu-bars'>
								<AiIcons.AiOutlineClose />
							</Link>
						</li>
						<li className={'nav-text'} onClick={logout}>
							<Link to={'/'}>
								<AiIcons.AiOutlineLogout />
								<span>Logout</span>{' '}
							</Link>
						</li>
						{NavBarData.map((item, index) => {
							return (
								<li key={index} className={item.cName}>
									<Link to={item.path}>
										{item.icon}
										<span>{item.title}</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</IconContext.Provider>
		</>
	);
}
