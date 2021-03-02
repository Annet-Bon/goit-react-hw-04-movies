import { NavLink } from 'react-router-dom';

import routes from '../../routes';

import styles from './NavBar.module.css';

export const NavBar = () => {
	return (
		<div>
			<ul className={styles.navList}>
				<li>
					<NavLink
						exact
						className={styles.link}
						activeClassName={styles.activeLink}
						to={routes.home}>
					Home
					</NavLink>
				</li>
				<li>
					<NavLink
						className={styles.link}
						activeClassName={styles.activeLink}
						to={routes.movies}>
					Movies
					</NavLink>
				</li>
			</ul>
		</div>
	);
};