import React, { useContext, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const NavBar = () => {
	const { user, logout } = useContext(AuthContext);
	const pathname = window.location.pathname;

	const path = pathname === '/' ? 'home' : pathname.substr(1);
	const [activeItem, setActiveItem] = useState(path);

	const handleItemClick = (e, { name }) => setActiveItem(name);

	const navbar = user ? (
		<Menu pointing secondary size='massive' color='teal'>
			<Menu.Item as={Link} to='/' name={user.username} active />
			<Menu.Menu position='right'>
				<Menu.Item
					as={Link}
					to='/login'
					name='logout'
					active={activeItem === 'logout'}
					onClick={logout}
				/>
			</Menu.Menu>
		</Menu>
	) : (
		<Menu pointing secondary size='massive' color='teal'>
			<Menu.Item
				as={Link}
				to='/'
				name='home'
				active={activeItem === 'home'}
				onClick={handleItemClick}
			/>
			<Menu.Menu position='right'>
				<Menu.Item
					as={Link}
					to='/login'
					name='login'
					active={activeItem === 'login'}
					onClick={handleItemClick}
				/>
				<Menu.Item
					as={Link}
					to='/register'
					name='register'
					active={activeItem === 'register'}
					onClick={handleItemClick}
				/>
			</Menu.Menu>
		</Menu>
	);

	return navbar;
};

export default NavBar;
