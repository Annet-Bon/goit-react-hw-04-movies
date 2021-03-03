import { Link } from 'react-router-dom';

import styles from './MoviesList.module.css';

export function MoviesList({ movies, state }) {
    return (
        <>
            <ul>
                {movies.map(({ id, title }) => (
                <li
                    key={id}
                    className={styles.movieItem}>
                        <Link to={{ pathname: `movies/${id}`, state: state }}>
                            {title}
                        </Link>
                </li>))}
            </ul>
        </>
    )
}