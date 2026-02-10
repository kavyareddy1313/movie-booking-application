import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/movieApi";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const fetchMovies = async () => {
    const data = await getPopularMovies();
    setMovies(data.results);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleMovieClick = (movie) => {
    if (!city) {
      alert("Please select city first");
      return;
    }

    navigate(`/cinemas/${movie.id}`, {
      state: { movie, city },
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="left">
          <div className="logo">🎥</div>
          <h1>BookMyReel</h1>
        </div>

        <div className="right">
          <div className="user-box">
            <span className="avatar">👤</span>
            <span className="user">{user?.name}</span>
          </div>

          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Select City</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
          <option value="Punjab">Punjab</option>
          <option value="Mumbai">Mumbai</option>
        </select>
      </div>

      <div className="movie-grid">
        {filteredMovies.map((movie, index) => (
          <div
            className="movie-card"
            key={movie.id}
            style={{ animationDelay: `${index * 0.05}s` }}
            onClick={() => handleMovieClick(movie)}
          >
            <div className="poster-wrap">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="overlay">
                <button>Book Now</button>
              </div>
            </div>

            <h3>{movie.title}</h3>
            <div className="meta">
              <span>⭐ {movie.vote_average.toFixed(1)}</span>
              <span>📅 {movie.release_date?.slice(0, 4)}</span>
              <span>🌐 {movie.original_language.toUpperCase()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
