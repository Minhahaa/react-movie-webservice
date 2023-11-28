import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import styles from "./Detail.module.css";

function Detail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState({});
    const [genres, setGenres] = useState([]);
    const getMovie = useCallback(async () => {
        const json = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
        setLoading(false);
        setMovie(json.data.movie);
        setGenres(json.data.movie.genres); // TODO setGenres(movie.genres) 로는 세팅이 안됨
        // console.log(json);
    }, [id]);
    useEffect(() => {
        if (id !== "" && id.length > 1) {
            getMovie();
        }
    }, [getMovie, id]); //  React Hook useEffect has missing dependencies: 'getMovie' and 'id'. Either include them or remove the dependency array  react-hooks/exhaustive-deps
    return (
        <div className={styles.container}>
            {loading ? (
                <div className={styles.loader}>
                    <span>Loading...</span>
                </div>
            ) : (
                <div className={styles.movie}>
                    <img
                        src={movie.background_image_original}
                        alt={movie.background_image_original}
                        className={styles.movie__bg_img}
                    />
                    <div className={styles.movie__header}>
                        <div className={styles.movie__big__title}>
                            <img
                                src={movie.medium_cover_image}
                                alt={movie.medium_cover_image}
                                className={styles.movie__img}
                            />
                            <div>
                                <h1 className={styles.movie__title}>{movie.title}</h1>
                                <div className={styles.movie__year}>
                                    <span>{movie.year}년 • </span>
                                    <span>{movie.runtime}분</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.movie__rate__row}>
                            <div className={styles.movie__rate}>rate: {movie.rating} </div>
                            <div className={styles.movie__rate}>downloed: {movie.download_count}</div>
                            <div className={styles.movie__rate}>like: {movie.like_count} </div>
                        </div>
                    </div>
                    <div className={styles.movie__content}>
                        <div>{movie.description_full}</div>
                        <div className={styles.movie__genres}>
                            {genres.map((g) => (
                                <span key={g}>#{g} </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Detail;
