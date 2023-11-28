import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";

/**
 * 목표
 * Link: 새로고침이 없이 페이지 이동을 할 수 있게 해준다. 전환?
 * <a> 태그와 비교하여 알아둘것
 *
 * TIPS
 * url에 props를 덧붙일때 $를 덧붙여줘야 한다.
 * props를 인자로 받을 때 순서는 의미가 없다.
 */

function Movie({ id, coverImg, url, year, title, summary, genres }) {
    return (
        <div className={styles.movie}>
            <img src={coverImg} alt={title} className={styles.movie__img} />
            <div>
                <h2 className={styles.movie__title}>
                    <Link to={`/movie/${id}`}>{title}</Link>
                    {/* <a href="/movie">{title}</a> 로 변환이 되지만 새로고침은 일어나지 않는다. */}
                </h2>
                <h3 className={styles.movie__year}>{year}</h3>
                <p>{summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}</p>
                <ul className={styles.movie__genres}>
                    {genres.map((g) => (
                        <li key={g}>#{g}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    coverImg: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string.isRequired),
};
export default Movie;
