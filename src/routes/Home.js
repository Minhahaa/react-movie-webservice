import { useEffect, useState } from "react";
import Movie from "../components/Movie";

/*
Movie 컴포넌트는 medium_cover_image, title, summary, genres
-> 이 props를 모두 부모 컴포넌트로부터 받아옴

coverImg={movie.medium_cover_image}
자바스크립트에서는 medium_cover_image가 아닌mediumCoverImage로 쓰지만
내가 만든 컴포넌트라 아무렇게 써도 됨.
그러나 movie.medium_cover_image 에서는 API에서 가져오므로 API 정보와 똑같이 써야함
이미지 element들을 alt속성을 가짐 -> alt={title}


home 라우트(페이지)는 모든 영화를 보여주고
Movie 라우트는 영화 하나만 보여줌
이렇게 라우트 별로 생각해야함
home 라우트는 기본적으로 App 컴포넌트 전체를 가지고 있게 만듦

App에 있는 것을 모두 Home라우트로 옮겼으니
App.js는 라우터를 렌더한다.
*/
function Home() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const getMovies = async () => {
        const json = await (await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`)).json();
        //const json = await response.json();
        setMovies(json.data.movies);
        setLoading(false);
    };
    useEffect(() => {
        /*fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`)
            .then((response) => response.json())
            .then((json) => setMovies(json.data.movies);
            setLoading(false));*/
        getMovies();
    }, []);

    return (
        <div>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div>
                    {movies.map((movie) => (
                        <Movie
                            key={movie.id}
                            coverImg={movie.medium_cover_image}
                            title={movie.title}
                            summary={movie.summary}
                            genres={movie.genres}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
export default Home;
