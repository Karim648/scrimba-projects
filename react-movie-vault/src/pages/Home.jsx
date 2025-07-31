import { MovieCard } from "../components/MovieCard";
import { useState, useEffect } from "react";
import { getPopularMovies, searchMovies } from "../services/api";
import "../css/Home.css"

export function Home() {

    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPopularMovies() {
            try {
               const popularMovies = await getPopularMovies();
               setMovies(popularMovies);
            } catch (error) {
                console.log(error);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);  // no longer loading
            }
        }
        loadPopularMovies();
    }, [])

    async function handleSearch(formData) {

        try {
            console.log(await searchMovies(formData.get("search")));
            const searchResult = await searchMovies(formData.get("search"));
            setMovies(searchResult);
            setError(null);

        } catch (error) {

            console.log(error);
            setError(error);

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="home">
            <form action={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search for movies..." 
                    className="search-input"
                    name="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-btn">Search</button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                    {movies.map(movie => (
                        <MovieCard movie={movie} key={movie.id}/>
                    ))}
                </div>
            )}
        </div>
    )
}